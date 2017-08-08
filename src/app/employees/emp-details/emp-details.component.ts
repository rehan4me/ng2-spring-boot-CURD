import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router}         from '@angular/router';
import {MdSnackBar} from '@angular/material';

import { HttpService }          from '../../services/http.service';

@Component({
  selector: 'app-emp-details',
  templateUrl: './emp-details.component.html',
  styleUrls: ['./emp-details.component.css']
})
export class EmpDetailsComponent implements OnInit {

  constructor(
  	private route: ActivatedRoute,
    private router:Router,
  	private httpService:HttpService,
    private snackBar:MdSnackBar
  ) {}

  empData: {};
  isNewDoc:boolean = false;
  departments = ['Admin','Delivery', 'Finance', 'IT', 'Marketing', 'Sales'];

  //Configuring init data
  ngOnInit() {
  	let id;
    this.route.params.subscribe(params => {
      id = params['id'];
           
    });
    
    if(id){
    	this.getEmpData(id);
    }else{
    	this.isNewDoc = true;
    	this.empData = {department:"Admin"};
    }
  }

  //Get employee details using document id
  getEmpData(id?:string){
  	return this.httpService
          .getEmpDetails('/api/emp-details/' + id)
          .subscribe(res =>{
            this.empData = res;
          },
          (err) => {});

  }

  //Save employee details
  saveEmp(){
  	if(this.isNewDoc){
  		return this.httpService
	        .createEmp('/api/new-emp',this.empData)
	        .subscribe(res =>{
	            this.isNewDoc = false;
              this.snackBar.open('Document was saved.','',{
                duration: 2000
              })
	        },
	        (err) => {}
	    );
  	}else{
  		return this.httpService
	        .updateEmp('/api/emp-details/' + this.empData['id'],this.empData)
	        .subscribe(res =>{
	            this.isNewDoc = false;
              this.snackBar.open('Document was saved.','',{
                duration: 2000
              })
	        },
	        (err) => {}
	    );
  	}
  }

  //Navigate to view page
  goBack(){
    this.router.navigate(['/emp-list']);
  }
}
