import { Component } from '@angular/core';
import { FormArray, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { EsgRatingService } from 'src/app/services/esg-rating.service';
import { CompanyService } from 'src/app/services/company.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';
import { AwsService } from 'src/app/services/aws.service';
import { AwsS3FileInterface } from 'src/app/interfaces/aws/aws-s3-file.interface'

@Component({
  selector: 'app-e-industry',
  templateUrl: './e-industry.component.html',
  styleUrls: ['./e-industry.component.scss']
})
export class EIndustryComponent {
  actualStep = 1
  undefinedAnswers = 0
  keepReading = false

  
  questionaryData = [
    {
      documentNeeded: true,
      id: 'E3'
    },
    {
      documentNeeded: true,
      id: 'E4'
    },
    {
      documentNeeded: true,
      id: 'E5'
    },
    {
      documentNeeded: true,
      id: 'E6'
    },
    {
      documentNeeded: true,
      id: 'E7'
    },
    {
      documentNeeded: true,
      id: 'E8'
    },
    {
      documentNeeded: true,
      id: 'E9'
    },
    {
      documentNeeded: true,
      id: 'E10'
    },
    {
      documentNeeded: true,
      id: 'E11'
    },
    {
      documentNeeded: true,
      id: 'E13'
    },
    {
      documentNeeded: true,
      id: 'E14'
    },
    {
      documentNeeded: true,
      id: 'E15'
    },
  ]

  formArray: FormArray<FormControl<any>>
  formArrayDocuments: FormArray<FormArray<FormControl<File | null>>>

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private modalService: NgbModal,
    private esgRatingService: EsgRatingService,
    private CompanyService: CompanyService,
    private toastr: ToastrService,
    private spinnerService: NgxSpinnerService,
    private awsService: AwsService 
  ) {
    this.formArray = this.fb.array([])
    this.formArrayDocuments = this.fb.array<FormArray<FormControl<File | null>>>([]);

    this.questionaryData.forEach((item) => {
      this.formArray.push(new FormControl('', Validators.required))
    })

    this.formArray.valueChanges.subscribe({
      next: () => {
        this.checkDoesntApply()
      }
    })
    this.spinnerService.show();

    this.CompanyService.getByUser().pipe(
      finalize(() => {
        this.spinnerService.hide()
      })
    ).subscribe({
      next: (data) => {
        if(data.section !== 'Industry') {
          this.toastr.error('Esta avaliação não corresponde ao setor da sua empresa', 'Erro', {progressBar: true});
          this.router.navigate(['/logged/dashboard'])
        }
        
        this.getAnswersAndFill(data._id)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  getAnswersAndFill(companyId: string) {
    this.spinnerService.show()

    this.esgRatingService.list().pipe(
      finalize(() => {
        this.spinnerService.hide()
      })
    ).subscribe({
      next: (data) => {
        // Pega o item que pertence a minha empresa
        let myCompanyInfo = data.filter(item => {
          return item?.company?._id === companyId
        })[0]
          
        const questionaryAnswers = myCompanyInfo.answers.filter((i: any) => {
          return i.questionNumber.startsWith("E")
        })

        if(questionaryAnswers.length) {
          questionaryAnswers.forEach((answer: any, index: number) => {
            this.formArray.at(index).setValue(answer.answer)
          });

          this.actualStep = questionaryAnswers.length + 1
        }
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  ngOnInit() {
    this.scrollToTop()
  }

  onSubmitStep(step: number) {
    if(this.formArray.at(step).invalid) return;

     if(step + 1 === this.questionaryData.length ){
       this.submitRevision();
      return;
    }

    this.actualStep = step + 2;   
   
  }

  onFileChange(event: Event, indexArrayDocument: number, indexFileInput: number) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      const fileInputArray = this.formArrayDocuments.at(indexArrayDocument) as FormArray;
      const control = fileInputArray.at(indexFileInput) as FormControl;

      control.setValue(file); 
    }
}


  submitRevision() {
    this.formArrayDocuments.clear();

    this.formArray.controls.forEach((control, index) => {
      const fileArray = new FormArray<FormControl<File | null>>([]);

      if(this.questionaryData[index].documentNeeded && control.value === 'Yes') {
        fileArray.push(new FormControl<File | null>(null, Validators.required));                
      } else {
        fileArray.push(new FormControl<File | null>(null));        
      }

      this.formArrayDocuments.push(fileArray);

    })
    
    this.actualStep = this.actualStep + 1
  }

  addFileInput(index: number) {
    const fileArray = this.formArrayDocuments.at(index) as FormArray;
    if (fileArray.length < 5) {
      fileArray.push(new FormControl<File | null>(null, Validators.required));
    }
  }

  removeFileInput(index: number) {
    const fileArray = this.formArrayDocuments.at(index) as FormArray;
    if (fileArray.length > 1) {
      fileArray.removeAt(fileArray.length - 1);
    }
  }

  submitDocuments() {
    if(this.formArrayDocuments.invalid) return

    this.finish()
  }

  


  getDocumentsFile(): FormData{
    const formData = new FormData();

  this.formArrayDocuments.controls.forEach((fileArrayControl, i) => {       
    
    const fileInputArray = fileArrayControl as FormArray;
    
    (fileInputArray.controls as FormControl[]).forEach((fileInput, j: number) => {      
      const fileControl = fileInput.value;
      if (fileControl instanceof File) {    
        formData.append(this.questionaryData[i].id, fileControl, fileControl.name);
      }
    });
  });


  return formData;
  }

  finish() {
    // Abre o modal de enviar formulário
    const modalRef = this.modalService.open(ConfirmModalComponent, {centered: true});

    // Se inscreve na resposta do usuário
    modalRef.componentInstance.accepted.subscribe((closed: boolean) => {
      if (closed) {
        var documentsControl = this.getDocumentsFile();

        let filesDocuments : AwsS3FileInterface[] = [];

       
        this.awsService.uploadFilesS3(documentsControl).subscribe({
          next:(data)=>{
            // Enviar forms para o backend
                const dto = {
                answers: this.formArray.controls.map((control, index) => {
                  return {
                    esgNumber: this.questionaryData[index].id,
                    answer: control.value,
                    documentsPath:this.questionaryData[index].documentNeeded ?
                    data.filter(item => item.name == this.questionaryData[index].id)
                    .map(item => item.url) :
                    null
                  }
                }),
              };

              
            this.esgRatingService.register(dto).subscribe({
                next: (data) => {
                  this.router.navigate(['/logged/assesment'])
                },
                error: (err) => {
                  console.log(err)
                }
              });
              
          },
          error:(err) =>{
            console.log('Error ao fazer o upload')
          }
        });
        
        
      }
    });
  }

  stepBack() {
    this.actualStep = this.actualStep - 1
    this.keepReading = false
  }

  checkDoesntApply() {
    this.undefinedAnswers = this.formArray.controls.reduce((acc: number, cur: FormControl) => {
      if(cur.value === 'Not apply') {
        return acc + 1
      } else {
        return acc
      }
    }, 0)

    // console.log(this.undefinedAnswers)
  }

  continueLater() {
    // Preenche o dto com o formArray
    const dto: any = {
      answers: this.formArray.controls.map((control, index) => {
        if(control.value) {{
          return {
            esgNumber: this.questionaryData[index].id,
            answer: control.value,
          }
        }}
        else return false
      }),
    }
    
    // Filtra as que tem resposta 
    dto.answers = dto.answers.filter((item: any) => {
      if(!item) return false
      else return true
    })
    this.spinnerService.show()
    
    this.esgRatingService.register(dto).pipe(
      finalize(() => {
        this.spinnerService.hide()
      })
    ).subscribe({
      next: (data) => {
        this.router.navigate(['/logged/assesment'])
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
