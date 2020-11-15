import { BrowserModule } from '@angular/platform-browser';
import { NgModule ,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { PromiseService } from './promise.service';

import { StoreModule } from '@ngrx/store'; 
import { reducers, metaReducers } from './reducers';
import { AppSandboxService } from 'app-sandbox.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, { 
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    })
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  providers: [PromiseService,AppSandboxService],
  bootstrap: [AppComponent]
})
export class AppModule { }
