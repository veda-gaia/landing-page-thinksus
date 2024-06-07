import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { EsgRatingService } from 'src/app/services/esg-rating.service';

@Component({
  selector: 'app-e-agro',
  templateUrl: './e-agro.component.html',
  styleUrls: ['./e-agro.component.scss']
})
export class EAgroComponent {
  actualStep = 1
  undefinedAnswers = 0
  keepReading = false
  
  questionaryData = [
    {
      question: 'O nível atual de desmatamento está dentro do permitido legalmente?',
      description: 'A quantidade de desmatamento que a empresa causa está dentro dos limites aceitáveis dentro das leis ambientais',
      documentNeeded: true,
      id: 'E1'
    },
    {
      question: 'Existe Política e práticas de bem estar animal?',
      description: 'Regras e normas que a empresa deve seguir para o bem estar animal',
      documentNeeded: true,
      id: 'E2'
    },
    {
      question: 'Existe um compliance de responsabilidade ambiental divulgado para todos?',
      description: 'Compliance são regras e orientações de responsabilidade individual e coletiva da empresa, em termos de ações que impactam o meio ambiente (como reciclar materiais, reduzir consumo). E essas regras devem ser comunicadas e relembradas para todos os funcionários da empresa periodicamente.',
      documentNeeded: true,
      id: 'E4'
    },
    {
      question: 'Fonte de energia é através de fontes renováveis? (solar, eólica, outra)',
      description: 'Fontes de energias são o que alimenta as máquinas, prédios e operações. Em geral são água e luz da cidade. Fontes alternativas seriam captar e tratar água da chuva, ter geração de energia elétrica por painel solar ou de fonte eólica (ventos e turbinas)',
      documentNeeded: true,
      id: 'E5'
    },
    {
      question: 'Existe captação de água da chuva para reuso?',
      description: 'Formas e técnicas de captação de água da chuva que, após tratamentos, permitem a reutilização para reaproveitamento. Isso diminuiria a utilização da água proveniente da rede municipal regular',
      documentNeeded: true,
      id: 'E6'
    },
    {
      question: 'Os veículos utilizam combustível fóssil?',
      description: 'Combustíveis fósseis são: petróleo, carvão mineral e gás natural, provenientes da decomposição de seres vivos. No caso em geral gasolina e diesel são combustíveis fóssil. A alternativa seria veículos elétricos.',
      documentNeeded: true,
      id: 'E7'
    },
    {
      question: 'Existe acompanhamento de consumo de recursos naturais mensal e metas para redução?',
      description: 'Recursos naturais são elementos da natureza que são retirados para atender a demanda do homem (Ex.: energia solar, madeira, solo, água, vento, animais, vegetais).',
      documentNeeded: true,
      id: 'E8'
    },
    {
      question: 'Todos os dejetos da operação são tratados antes de descarte? (esgoto, material de descarte, tratamento de afluentes)',
      description: 'Dejetos apresentam riscos de poluição ao meio ambiente caso não sejam manejados e tratados corretamente. Materiais utilizados na produção precisam ser reciclados corretamente, esgoto tratado e qualquer outro material que resta descartado corretamente ',
      documentNeeded: true,
      id: 'E9'
    },
    {
      question: 'Existe um reporte mensal da gestão dos resíduos?',
      description: 'Detalhamento documentado sobre como os resíduos são tratados e geridos na empresa. Nesse caso a questão é se existe uma comunicação mensal/periodica para os funcionários em geral.',
      documentNeeded: true,
      id: 'E10'
    },
    {
      question: 'Existem alternativas atuais em execução para minimizar poluição?',
      description: 'Protocolos, regras e técnicas para a diminuição de poluição que estejam em curso. Um exemplo seria programa de conciencização de consumo de água, reciclagem de materiais e consumo consciente de energia elétrica.',
      documentNeeded: true,
      id: 'E11'
    },
    {
      question: 'Ocorre na atividade econômica o Uso de pesticida no solo e/ou contaminação do lençol freático?',
      description: 'O uso de pesticidas (substâncias químicas para controle de pragas e insetos) é presente no processo',
      documentNeeded: true,
      id: 'E12'
    },
    {
      question: 'Existe atualmente um Programa de Mitigação de mudanças climáticas?',
      description: 'Adoção de protocolos que diminuam impactos negativos que afetem mudanças climáticas.',
      documentNeeded: true,
      id: 'E14'
    },
    {
      question: 'Operação pode ser duramente afetada por mudanças climáticas? (secas, queimadas, tornados, etc.)',
      description: 'As atividades da empresa podem sofrer mudanças em sua produção por conta das mudanças climáticas, como chuvas acima do nível normal (alagamento), secas excessivas, local sujeito a furacão.',
      documentNeeded: true,
      id: 'E15'
    },
  ]

  formArray: FormArray<FormControl<any>>
  formArrayDocuments: FormArray<FormControl<any>>

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private modalService: NgbModal,
    private esgRatingService: EsgRatingService,
  ) {
    this.formArray = this.fb.array([])
    this.formArrayDocuments = this.fb.array([])

    this.questionaryData.forEach((item) => {
      this.formArray.push(new FormControl('', Validators.required))
    })

    this.formArray.valueChanges.subscribe({
      next: () => {
        this.checkDoesntApply()
      }
    })
  }

  ngOnInit() {
    this.scrollToTop()
  }

  onSubmitStep(step: number) {
    if(this.formArray.at(step).invalid) return

    this.actualStep = step + 2
    // this.checkDoesntApply()
  }

  submitRevision() {
    this.formArray.controls.forEach((control, index) => {
      if(this.questionaryData[index].documentNeeded && control.value === 'Yes') {
        this.formArrayDocuments.push(new FormControl('', Validators.required))
      } else {
        this.formArrayDocuments.push(new FormControl(''))
      }
    })
    
    this.actualStep = this.actualStep + 1
  }

  submitDocuments() {
    if(this.formArrayDocuments.invalid) return

    this.finish()
  }

  finish() {
    // Abre o modal de enviar formulário
    const modalRef = this.modalService.open(ConfirmModalComponent, {centered: true});

    // Se inscreve na resposta do usuário
    modalRef.componentInstance.accepted.subscribe((closed: boolean) => {
      if (closed) {
        // Enviar forms para o backend
        const dto = {
          answers: this.formArray.controls.map((control, index) => {
            return {
              esgNumber: this.questionaryData[index].id,
              answer: control.value,
            }
          })
        }

        this.esgRatingService.reister(dto).subscribe({
          next: (data) => {
            this.router.navigate(['/logged/assesment'])
          },
          error: (err) => {
            console.log(err)
          }
        })

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
    this.router.navigate(['/logged/assesment'])
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
