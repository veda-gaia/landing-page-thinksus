import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddSupplierModalComponent } from '../add-supplier-modal/add-supplier-modal.component';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss']
})
export class SuppliersComponent {
  form: FormGroup
  list: any[] = []
  filteredList: any[] = []

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {
    this.form = fb.group({
      search: [''],
      orderBy: [''],
    })

    this.loadList()
  }

  loadList() {
    this.list = [
      {
        name: 'Matéria prima - Produção',
        buyValue: 550000,
        currency: 'USD',
        esgScore: 51,
        document: '000000000000'
      },
      {
        name: 'Material de Consumo',
        buyValue: 150000,
        currency: 'BRL',
        esgScore: 54.3,
        document: '11111111111'
      },
      {
        name: 'Serviços Operacionais',
        buyValue: 1000000,
        currency: 'BRL',
        esgScore: 65.3,
        document: '22222222222'
      },
      {
        name: 'Energia e Recursos',
        buyValue: 135000,
        currency: 'BRL',
        esgScore: 81.3,
        document: '33333333333'
      },
      {
        name: 'Frete e serviços externos',
        buyValue: 65000,
        currency: 'BRL',
        esgScore: 55.7,
        document: '444.444.444/44'
      },
    ]
    this.filteredList = this.list
  }

  openAddSupplier() {
    // Abre o modal do formulário
    const modalRef = this.modalService.open(AddSupplierModalComponent, {centered: true});

    // Se inscreve no status do modal
    modalRef.componentInstance.submitted.subscribe((closed: boolean) => {
      if (closed) {
        // Reload da lista
        this.loadList()
      }
    });
  }
}
