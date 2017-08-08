import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DataSource } from '@angular/cdk';
import { MdPaginator } from '@angular/material';
import {MdSnackBar} from '@angular/material';

import { HttpService } from '../../services/http.service';
import { Employee } from '../../model/employee';

import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/observable/fromEvent';

@Component({
  selector: 'emp-list',
  templateUrl: './emp-list.component.html',
  styleUrls: ['./emp-list.component.css']
})
export class EmpListComponent implements OnInit {

  constructor(private httpService: HttpService, private router:Router, private snackBar:MdSnackBar) {}

  displayedColumns = ['employeeName', 'employeeId', 'department', 'manager','actions'];

  dataSource: ExampleDataSource | null;

  @ViewChild('filter') filter: ElementRef;

  ngOnInit() {
  	this.getEmployees();
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
                .debounceTime(150)
                .distinctUntilChanged()
                .subscribe(() => {
                  if (!this.dataSource) { return; }
                  this.dataSource.filter = this.filter.nativeElement.value;
    });
  }

  getEmployees(){
  	return this.httpService
          .getEmployees('/api/emp-list')
          .subscribe(data =>{
            this.dataSource = new ExampleDataSource(data);
          },
          (err) => {
          });
  }

  openEmpDoc(id?:string){
    this.router.navigate(['/emp-details', id]);
  }

  createEmployee(){
    this.router.navigate(['/new-emp']);
  }

  deleteEmployee(id?:string){
    this.httpService
          .deleteEmployee('/api/emp-details/'+id)
          .subscribe(data =>{
          },
          (err) => {
          });
          this.snackBar.open('Document deleted.','',{
                duration: 2000
          })
          setTimeout(()=>{
            this.getEmployees();
          },300);
  }

  exportToExcel(){
    location.href = 'http://localhost:8080/api/excel-xls';
  }
}

/**
 * Data source to provide what data should be rendered in the table. Note that the data source
 * can retrieve its data in any way. In this case, the data source is provided a reference
 * to a common data base, ExampleDatabase. It is not the data source's responsibility to manage
 * the underlying data. Instead, it only needs to take the data and send the table exactly what
 * should be rendered.
 */
export class ExampleDataSource extends DataSource<any> {

  constructor(private _empData: Employee[]) {
    super();
  }

  _filterChange = new BehaviorSubject('');
  get filter(): string { return this._filterChange.value; }
  set filter(filter: string) { this._filterChange.next(filter); }


  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Employee[]> {
    const displayDataChanges = [
      this._empData,
      this._filterChange,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      return this._empData.filter((item: Employee) => {
        let searchStr = (item.employeeName).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) != -1;
      });
    });
  }

  disconnect() {}
}
