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
        seal: '',
        name: 'Exemplo LTDA',
        buyValue: 1000000,
        currency: 'BRL',
        score: 55.4,
        document: '000000000000'
      },
      {
        seal: '',
        name: 'Exemplo LTDA',
        buyValue: 1000000,
        currency: 'BRL',
        score: 55.4,
        document: '000000000000'
      },
      {
        seal: '',
        name: 'Exemplo LTDA',
        buyValue: 1000000,
        currency: 'BRL',
        score: 55.4,
        document: '000000000000'
      },
      {
        seal: '',
        name: 'Exemplo LTDA',
        buyValue: 1000000,
        currency: 'BRL',
        score: 55.4,
        document: '000000000000'
      },
      {
        seal: '',
        name: 'Exemplo LTDA',
        buyValue: 1000000,
        currency: 'BRL',
        score: 55.4,
        document: '000000000000'
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
