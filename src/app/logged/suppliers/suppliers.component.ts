import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AddSupplierModalComponent } from '../add-supplier-modal/add-supplier-modal.component';
import { UserService } from 'src/app/services/user.service';

export interface Supplier {
  name: string;
  buyValue: number;
  //currency: string;
  esgScore: number;
  document: string;
}

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss'],
})
export class SuppliersComponent implements OnInit {
  form: FormGroup;
  displayedColumns: string[] = [
    'seal',
    'name',
    'buyValue',
    'esgScore',
    'document',
    'actions',
  ];
  dataSource = new MatTableDataSource<Supplier>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private userService: UserService
  ) {
    this.form = fb.group({
      search: [''],
      orderBy: [''],
    });
  }

  ngOnInit(): void {
    this.loadList();
  }

  loadList() {
    this.userService.listUserSuppliers().subscribe({
      next: (data) => {
        this.dataSource = new MatTableDataSource<any>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openAddSupplier() {
    const modalRef = this.modalService.open(AddSupplierModalComponent, {
      centered: true,
    });
    modalRef.componentInstance.submitted.subscribe((closed: boolean) => {
      if (closed) {
        this.loadList();
      }
    });
  }

  openUserEditModal(userSupplerId: string): void {
    const dialogUser = this.modalService.open(AddSupplierModalComponent);
    dialogUser.componentInstance.userSupplerId = userSupplerId;
    dialogUser.result.then((result) => {
      console.log('openUserEditModal' + result);
      if (result === 'updated') {
        this.loadList();
      }
    });
  }
}
