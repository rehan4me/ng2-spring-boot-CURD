import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

// import { GlobalsService }   from '../services/globals.service';
import { Employee } from '../model/Employee';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/toPromise';
import 'rxjs/Rx';

@Injectable()
export class HttpService {
  constructor (
    private http: Http
  ) {}

  private baseUrl = 'http://localhost:8080';
  private headers = new Headers({
    'Content-Type': 'application/json'
  });

  private options = new RequestOptions({ headers: this.headers, withCredentials: true});
  getEmployees (apiUrl: string): Observable<Employee[]> {
      return this.http
          .get(this.baseUrl + apiUrl, this.options)
          .map(this.extractData)
          .catch(this.handleError);
  }

  getEmpDetails (apiUrl: string): Observable<Employee> {
      return this.http
          .get(this.baseUrl + apiUrl, this.options)
          .map(this.extractData)
          .catch(this.handleError);
  }

  /*searchEmp (apiUrl: string): Observable<Employee[]> {
      return this.http
          .get(this.baseUrl + apiUrl, this.options)
          .map(this.extractData)
          .catch(this.handleError);
  }*/

  updateEmp(url: string, data: any): any {
      return this.http
          .put(this.baseUrl + url, JSON.stringify(data), this.options)
          .map(this.extractData)
          .catch(this.handleError);
  }

  createEmp(url: string, data: any): any {
      return this.http
          .post(this.baseUrl + url, JSON.stringify(data), this.options)
          .map(this.extractData)
          .catch(this.handleError);
  }

  deleteEmployee (apiUrl: string): any {
      return this.http
          .delete(this.baseUrl + apiUrl, this.options)
          .map(this.extractData)
          .catch(this.handleError);
  }

  private extractData(res: Response) {
    let data;
    if (res) {
      data = res.json();
    }
    return data || {};
  }

  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg;
    if (error.status !== 0) {
      const err = error.json()['message'];
      if (err === undefined || err === '') {
        errMsg = `${error.status} - ${error.statusText}`;
      }else {
        errMsg = err;
      }
    }else {
      errMsg = 'There was an unknown error, please try again in a few minutes.';
    }
    return Observable.throw(errMsg);
  }
}
