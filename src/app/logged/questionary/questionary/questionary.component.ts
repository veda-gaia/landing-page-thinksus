import { Component } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormBuilder,
  Validators,
  FormGroup,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { EsgRatingService } from 'src/app/services/esg-rating.service';
import { CompanyService } from 'src/app/services/company.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { AwsService } from 'src/app/services/aws.service';
import { AwsS3FileInterface } from 'src/app/interfaces/aws/aws-s3-file.interface';
import { EsgFormService } from 'src/app/services/esg-form.service';
import { FormInterface } from 'src/app/forms/form.interface';
import { QuestionInterface } from 'src/app/forms/question.interface';

@Component({
  selector: 'app-questionary',
  templateUrl: './questionary.component.html',
  styleUrls: ['./questionary.component.scss'],
})
export class QuestionaryComponent {
  actualStep = 1;
  undefinedAnswers = 0;
  keepReading = false;
  esgSymbol = '';

  questionaryData: QuestionInterface[] = [];

  formArray: FormArray<FormGroup<any>>;
  formArrayDocuments: FormArray<FormArray<FormControl<File | null>>>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private modalService: NgbModal,
    private esgRatingService: EsgRatingService,
    private CompanyService: CompanyService,
    private toastr: ToastrService,
    private spinnerService: NgxSpinnerService,
    private awsService: AwsService,
    private esgFormService: EsgFormService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.formArray = new FormArray<FormGroup<any>>([]);
    this.formArrayDocuments = this.fb.array<
      FormArray<FormControl<File | null>>
    >([]);
  }

  ngOnInit() {
    this.scrollToTop();

    this.spinnerService.show();
    const sectionId = this.activatedRoute.snapshot.paramMap.get('sectionId');
    this.esgSymbol =
      this.activatedRoute.snapshot.paramMap.get('symbolId') ?? '';

    const segmentId = this.activatedRoute.snapshot.paramMap.get('segmentId');

    this.esgFormService
      .getbySectionSegment(sectionId ?? '', segmentId ?? '')
      .pipe(
        finalize(() => {
          this.spinnerService.hide();
        }),
      )
      .subscribe({
        next: (data: FormInterface) => {
          debugger;
          this.questionaryData = data.questions.filter(
            (x) => x.dimension == this.esgSymbol.toUpperCase(),
          );

          this.questionaryData.forEach((item) => {
            this.formArray.push(
              new FormGroup({
                questionId: new FormControl(item._id),
                answer: new FormControl('', Validators.required),
              }),
            );
          });
        },
      });

    this.CompanyService.getByUser()
      .pipe(
        finalize(() => {
          this.spinnerService.hide();
        }),
      )
      .subscribe({
        next: (data) => {
          this.getAnswersAndFill(data._id);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  getAnswersAndFill(companyId: string) {
    this.spinnerService.show();

    this.esgRatingService
      .getByCompany()
      .pipe(
        finalize(() => {
          this.spinnerService.hide();
        }),
      )
      .subscribe({
        next: (data) => {
          const questionaryAnswers = data[0].answers.filter(
            (y: any) =>
              y.questionId.dimension.toUpperCase() ==
              this.esgSymbol.toUpperCase(),
          );

          if (questionaryAnswers.length) {
            questionaryAnswers.forEach((answer: any) => {
              const index = this.formArray.value.findIndex(
                (item: any) => item.questionId === answer.questionId._id,
              );

              if (index !== -1) {
                this.formArray.at(index).get('answer')?.setValue(answer.answer);
              }
            });

            this.actualStep = questionaryAnswers.length + 1;
          }
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  getAnswerControl(i: number): FormControl {
    return this.formArray.at(i).get('answer') as FormControl;
  }

  onSubmitStep(step: number) {
    if (this.formArray.at(step).invalid) return;

    if (step + 1 === this.questionaryData.length) {
      this.submitRevision();
      return;
    }

    this.actualStep = step + 2;
  }

  onFilesSelected(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    const files = Array.from(input.files ?? []);
    const fileArray = this.formArrayDocuments.at(index) as FormArray;

    files
      .slice(0, 5 - fileArray.length)
      .forEach((file) => fileArray.push(new FormControl<File>(file)));

    input.value = '';
  }

  removeFile(questionIndex: number, fileIndex: number): void {
    const fileArray = this.formArrayDocuments.at(questionIndex) as FormArray;
    fileArray.removeAt(fileIndex);
  }

  submitRevision() {
    this.formArrayDocuments.clear();

    this.formArray.controls.forEach((control, index) => {
      const fileArray = new FormArray<FormControl<File | null>>([]);

      if (
        this.questionaryData[index].documentNeeded &&
        control.value.answer === this.questionaryData[index].type
      ) {
        fileArray.setValidators(Validators.required);
      }

      this.formArrayDocuments.push(fileArray);
    });

    this.actualStep = this.actualStep + 1;
  }

  submitDocuments() {
    if (this.formArrayDocuments.invalid) return;

    this.finish();
  }

  getDocumentsFile(): FormData {
    const formData = new FormData();

    this.formArrayDocuments.controls.forEach((fileArrayControl, i) => {
      const fileInputArray = fileArrayControl as FormArray;

      (fileInputArray.controls as FormControl[]).forEach(
        (fileInput, j: number) => {
          const fileControl = fileInput.value;
          if (fileControl instanceof File) {
            formData.append(
              this.questionaryData[i]._id,
              fileControl,
              fileControl.name,
            );
          }
        },
      );
    });

    return formData;
  }

  finish() {
    // Abre o modal de enviar formulário
    const modalRef = this.modalService.open(ConfirmModalComponent, {
      centered: true,
    });

    // Se inscreve na resposta do usuário
    modalRef.componentInstance.accepted.subscribe((closed: boolean) => {
      if (closed) {
        var documentsControl = this.getDocumentsFile();

        let filesDocuments: AwsS3FileInterface[] = [];

        this.awsService.uploadFilesS3(documentsControl).subscribe({
          next: (data) => {
            // Enviar forms para o backend
            const dto = {
              answers: this.formArray.controls.map((control, index) => {
                return {
                  questionId: this.questionaryData[index]._id,
                  answer: control.get('answer')?.value,
                  documentsPath: this.questionaryData[index].documentNeeded
                    ? data
                        .filter(
                          (item) =>
                            item.name == this.questionaryData[index]._id,
                        )
                        .map((item) => item.url)
                    : null,
                };
              }),
            };

            this.esgRatingService.register(dto).subscribe({
              next: (data) => {
                this.router.navigate(['/logged/assesment']);
              },
              error: (err) => {
                console.log(err);
              },
            });
          },
          error: (err) => {
            console.log('Error ao fazer o upload');
          },
        });
      }
    });
  }

  stepBack() {
    this.actualStep = this.actualStep - 1;
    this.keepReading = false;
  }

  continueLater() {
    // Preenche o dto com o formArray
    const dto: any = {
      answers: this.formArray.controls.map((control, index) => {
        if (control.value) {
          {
            return {
              questionId: control.get('questionId')?.value,
              answer: control.get('answer')?.value,
            };
          }
        } else return false;
      }),
    };

    // Filtra as que tem resposta
    dto.answers = dto.answers.filter((item: any) => {
      if (item.answer == '') return false;
      else return true;
    });
    this.spinnerService.show();

    this.esgRatingService
      .register(dto)
      .pipe(
        finalize(() => {
          this.spinnerService.hide();
        }),
      )
      .subscribe({
        next: (data) => {
          this.router.navigate(['/logged/assesment']);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  get documentsValid(): boolean {
    return this.formArrayDocuments.controls.every((fileArray, index) => {
      if (!this.questionaryData[index].documentNeeded) return true;
      return fileArray.length > 0;
    });
  }
}
