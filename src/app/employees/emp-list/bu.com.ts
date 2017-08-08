import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataSource } from '@angular/cdk';
import { MdPaginator } from '@angular/material';

import { HttpService } from '../../services/http.service';
import { Employee } from '../../model/employee';

import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'emp-list',
  templateUrl: './emp-list.component.html',
  styleUrls: ['./emp-list.component.css']
})
export class EmpListComponent implements OnInit {

  constructor(private httpService: HttpService, private router:Router) {}

  employees = []; //= Employee[];
  displayedColumns = ['employeeId', 'employeeName', 'department', 'manager'];

 // @ViewChild(MdPaginator) paginator: MdPaginator;

  ngOnInit() {
  	this.getEmployees();
  }

  getEmployees(){
  	return this.httpService
          .getEmployees('/api/emp-list')
          .subscribe(data =>{
            this.employees = data;
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
    return this.httpService
          .deleteEmployee('/api/emp-details/'+id)
          .subscribe(data =>{
            this.getEmployees();
          },
          (err) => {
          });
  }

  connect() {
    return this.employees;
  }
  disconnect() {}

}

/*export class EmployeeDataSource extends DataSource<any> {
  constructor(private _empData: EmpListComponent, private _paginator: MdPaginator) {
    super();
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. 
  connect(): Observable<Employee[]> {
    const displayDataChanges = [
      this._empData.employees,
      this._paginator.page,
    ];

    return Observable.merge(...displayDataChanges).map(() => {
      const data = _empData.employees;

      // Grab the page's slice of data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      return data.splice(startIndex, this._paginator.pageSize);
    });
  }

  disconnect() {}
}*/
