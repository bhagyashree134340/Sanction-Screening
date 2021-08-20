import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatCardModule} from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button'
import { MatFormFieldModule} from '@angular/material/form-field'
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { MatIconModule} from '@angular/material/icon';
import { HomeComponent } from './home/home.component';
import { FilterComponent } from './filter/filter.component';
import { MatSelectModule } from '@angular/material/select';
import { ValidationPassComponent } from './validation-pass/validation-pass.component';
import { ValidationFailComponent } from './validation-fail/validation-fail.component';
import { ScreenPassComponent } from './screen-pass/screen-pass.component';
import { ScreenFailComponent } from './screen-fail/screen-fail.component';
import { AllTransactionsComponent } from './all-transactions/all-transactions.component';
import { HttpClientModule } from '@angular/common/http';
import { ShadyTransactionsComponent } from './shady-transactions/shady-transactions.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FilterComponent,
    ValidationPassComponent,
    ValidationFailComponent,
    ScreenPassComponent,
    ScreenFailComponent,
    AllTransactionsComponent,
    ShadyTransactionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MaterialFileInputModule,
    MatSelectModule,
    MatDatepickerModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
