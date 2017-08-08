import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MdInputModule,MdDatepickerModule,
        MdNativeDateModule, MdToolbarModule,
        MdCardModule, MdButtonModule,
        MdTableModule, MdSelectModule,
        MdSnackBarModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk';

// Routing Module
import { AppRoutingModule }             from './app-routing.module';

import { AppComponent } from './app.component';
import { EmpListComponent } from './employees/emp-list/emp-list.component';
import { EmpDetailsComponent } from './employees/emp-details/emp-details.component';

import { HttpService } from './services/http.service';

@NgModule({
  declarations: [
    AppComponent,
    EmpListComponent,
    EmpDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MdToolbarModule,
    MdInputModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdCardModule,
    MdButtonModule,
    MdTableModule,
    CdkTableModule,
    MdSelectModule,
    MdSnackBarModule
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
