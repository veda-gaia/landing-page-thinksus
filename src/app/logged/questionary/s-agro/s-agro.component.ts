import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-s-agro',
  templateUrl: './s-agro.component.html',
  styleUrls: ['./s-agro.component.scss']
})
export class SAgroComponent {
  actualStep = 1
  undefinedAnswers = 0
  keepReading = false
  
  questionaryData = [
    {
      question: 'Empresa possui Compliance Interno de Função Social?',
      description: 'Compliance interno de função social são regras e orientações de responsabilidade individual e coletiva da empresa que contemplam esferas da sociedade, como criação de empregos, pagamento de tributos, geração de riqueza, contribuição para o desenvolvimento econômico, social e cultural do entorno, adoção de práticas sustentáveis e respeito aos direitos dos consumidores.',
      documentNeeded: true,
      id: 'S1'
    },
    {
      question: 'Todos os Trabalhadores estão registrados, com salário condizente com a função?',
      description: 'A empresa segue a CLT para contratação de funcionários, com salários compatíveis com o mercado.',
      documentNeeded: true,
      id: 'S3'
    },
    {
      question: 'Processo seletivo para todas as vagas em aberto é feito de forma justa, sem diferenciação de credo, cor, raça ou opção sexual?',
      description: 'O processo de seleção de novos funcionários respeita a diversidade, sem classifica-los como forma eliminatória suas escolhas de religião, cor da pele, etnia e opção sexual, levando apenas em conta suas aptidões profissionais e capacidade de desenvolver o trabalho para que está sendo avaliado.',
      documentNeeded: true,
      id: 'S4'
    },
    {
      question: 'Houve algum acidente de trabalho com ferimento nos últimos 24 meses?',
      description: 'Ocorrência de acidentes de trabalho com funcionários durante o exercício de sua função, com ou sem perca de tempo de trabalho, no período anterior de 24 meses da data de respostas desse questionário.',
      documentNeeded: true,
      id: 'S5'
    },
    {
      question: 'Houve condenação em primeira instância na Justiça do Trabalho nos últimos 5 anos?',
      description: 'A empresa foi acionada e punida judicialmente por não cumprir com as leis de bases e diretrizes de trabalho.',
      documentNeeded: true,
      id: 'S6'
    },
    {
      question: 'Existe interação com outras organizações sociais/políticas na cidade do negócio?',
      description: 'A empresa possui vínculos com organizações sociais/ políticas na cidade que atua.',
      documentNeeded: true,
      id: 'S7'
    },
    {
      question: 'Compromissos sociais são reportados de forma consistente (últimos 48 meses)?',
      description: 'São documentados/relatados todos os compromissos sociais (criação, desenvolvimento e apoio e à  programas voltados para a comunidade, qualidade de vida e meio ambiente.)',
      documentNeeded: true,
      id: 'S8'
    },
    {
      question: 'Existe controle de informação sigilosa, de acordo com a Lei de Proteção de Dados?',
      description: 'As informações sigilosas são mantidas em segredo por meio de controles e diretrizes de acordo com a Lei Geral de Proteção de Dados',
      documentNeeded: true,
      id: 'S9'
    },
    {
      question: 'Existe Canal de Comunicação com clientes e fornecedores?',
      description: 'Ferramentas que viabilizam formas de comunicação entre clientes e fornecedores',
      documentNeeded: true,
      id: 'S10'
    },
    {
      question: 'Existe forma de denúncia anônima? Se sim, os casos são investigados e reportados com todos os funcionários ?',
      description: 'Canais para denúncia anônima, onde quem denuncia não será identificado, será mantido sigilo sobre quem fez a denúncia. Em caso afirmativo, o setor responsável por receber as denúncias analisa e toma medidas e providências com funcionários para sanar a questão. ',
      documentNeeded: true,
      id: 'S11'
    },
    {
      question: 'Código Interno de Combate a Corrupção é claro e comunicado para todos os funcionários?',
      description: 'O código interno de Combate à Corrupção foi escrito de forma clara, com informações objetivas, usando palavras de fácil compreensão.',
      documentNeeded: true,
      id: 'S12'
    },
    {
      question: 'A empresa pratica política de preços de forma a manipular a livre concorrência do mercado?',
      description: 'A forma de precificação dos produtos da empresa é feita de forma justa e leal para a livre concorrência do mercado.',
      documentNeeded: true,
      id: 'S13'
    },
    {
      question: 'Existe termo de conduta Social dos Fornecedores? Se sim, ele está de acordo com os valores de Compliances internos?',
      description: 'O manual de normas e condutas de como os fornecedores devem se comportar para se classificar fornecedor para a empresa está em conformidade  com as regras de normas e condutas da empresa que este estabeleceu relação comercial?  ',
      documentNeeded: true,
      id: 'S14'
    },
    {
      question: 'Existe report interno ou externo com os questionamentos dos clientes, de forma transparente, nos últimos 48 meses?',
      description: 'Todos os questionamentos vindos de clientes são relatados em documentos sem que haja censura.',
      documentNeeded: true,
      id: 'S15'
    },
    {
      question: 'Entre os benefícios oferecidos aos funcionários, existe algum incentivo à educação, cultura e/ou treinamento extra (além da função específica)?',
      description: 'Entre os benefícios podem ser parcerias de desconto para cursos extra-curriculares ou de educação continuada, programa de treinamento e estudo na própria empresa ou incentivo financeiro para ser gasto com educação',
      documentNeeded: true,
      id: 'S16'
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
