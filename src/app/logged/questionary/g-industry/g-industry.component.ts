import { Component } from '@angular/core';
import { FormArray, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-g-industry',
  templateUrl: './g-industry.component.html',
  styleUrls: ['./g-industry.component.scss']
})
export class GIndustryComponent {
  actualStep = 1
  undefinedAnswers = 0
  keepReading = false
  
  questionaryData = [
    {
      question: 'Seu produto apresenta risco à saúde do consumidor se consumido em excesso?',
      description: 'O produto pode apresentar danos e riscos à saúde de quem o consome caso ele seja consumido em quantidades excessivas, além das recomendadas ',
      documentNeeded: true,
      id: 'G1'
    },
    {
      question: 'Seu produto apresenta riscos a sociedade em geral se consumido ou usado de forma equivocada?',
      description: 'O produto pode apresentar danos e riscos à saúde de quem o consome caso ele seja consumido de forma diferente a que a empresa sugere',
      documentNeeded: true,
      id: 'G2'
    },
    {
      question: 'Existe risco político, nacional ou internacional, que pode afetar o mercado do seu produto?',
      description: 'Há fatores políticos, internos ou externos aos território nacional que possam afetar a forma que seu produto é comercializado ?',
      documentNeeded: true,
      id: 'G3'
    },
    {
      question: 'Seu mercado de atuação é regulado através de instituições de classes e/ou corporativas?',
      description: 'O mercado o qual seu produto atua deve seguir leis e regras de algum tipo de instituição para que possa ser comercializado ?',
      documentNeeded: true,
      id: 'G4'
    },
    {
      question: 'Existe plano de mitigação/contingência contra riscos corporativos?',
      description: 'Planos para redução ou controle contra qualquer situação de risco dentro da empresa; situações que fogem aos escopo dos manuais de normas e condutas impostos pela empresa',
      documentNeeded: true,
      id: 'G5'
    },
    {
      question: 'A empresa passa anualmente por algum tipo de auditoria? (financeira e/ou qualidade)',
      description: 'Auditoria é uma análise cuidadosa, detalhada e sistemática das atividades desenvolvidas em determinada organização, cujo objetivo é averiguar se elas estão de acordo com as planejadas e/ou estabelecidas previamente, se foram implementadas com eficácia e adequadas (em conformidade) à consecução dos objetivos.',
      documentNeeded: true,
      id: 'G6'
    },
    {
      question: 'Existe separação entre quem toca o dia-a-dia do negócio e o Proprietário (a) da empresa?',
      description: 'Há funcionários específicos para o bom funcionamento da empresa que não seja a mesma pessoa que é a proprietária da empresa',
      documentNeeded: true,
      id: 'G7'
    },
    {
      question: 'Existe relação econômica/comercial com outras subsidiárias de mesma gestão?',
      description: 'Relações econômicas e comerciais com outras unidades da mesma empresa sob a mesma administração',
      documentNeeded: true,
      id: 'G8'
    },
    {
      question: 'Existe código interno sobre Conflito de Interesses?',
      description: 'Manual com regras e diretrizes relacionado a divergências de interesses',
      documentNeeded: true,
      id: 'G9'
    },
    {
      question: 'Existe publicação pública dos ingredientes do seu produto?',
      description: 'Publicação em meios de comunicação públicos dos ingredientes usados na composição dos produtos que a empresa oferece no mercado',
      documentNeeded: true,
      id: 'G10'
    },
    {
      question: 'A empresa já foi sancionada judicialmente nos últimos 3 anos por práticas contra a livre concorrência?',
      description: 'A empresa já foi acionada de forma judicial por ter praticado de forma desonesta e injusta contra a livre concorrência',
      documentNeeded: true,
      id: 'G11'
    },
    {
      question: 'Existe report mensal/anual financeiro para todos os funcionários?',
      description: 'Todos os funcionários têm acesso à documentos que relatam o desempenho financeiro da empresa',
      documentNeeded: true,
      id: 'G14'
    },
    {
      question: 'A lucratividade do negócio nos últimos 3 anos esteve em níveis saudáveis e na média ou acima do mercado?',
      description: 'Os lucros obtidos pela empresa esteve em níveis considerados aceitáveis, como positivos e dentro da média  comparado com os indicadores do mercado ?',
      documentNeeded: true,
      id: 'G15'
    },
    {
      question: 'A estrutura atual do negócio suporta um crescimento operacional e tendências de mercado futura, sem grande dispêndio de investimento adicional?',
      description: 'A empresa tem capacidade de investimentos para crescimento operacional, de acordo com seu faturamento, sem que haja necessidade de investimentos adicionais externos?',
      documentNeeded: true,
      id: 'G16'
    },
  ]

  formArray: FormArray<FormControl<any>>
  formArrayDocuments: FormArray<FormControl<any>>

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private modalService: NgbModal
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
      if(this.questionaryData[index].documentNeeded && control.value === 'yes') {
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
        this.router.navigate(['/logged/assesment'])
      }
    });
  }

  stepBack() {
    this.actualStep = this.actualStep - 1
    this.keepReading = false
  }

  checkDoesntApply() {
    this.undefinedAnswers = this.formArray.controls.reduce((acc: number, cur: FormControl) => {
      if(cur.value === 'undefined') {
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
