import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilterComponent } from './filter/filter.component';
import { HomeComponent } from './home/home.component';
import { ShadyTransactionsComponent } from './shady-transactions/shady-transactions.component';

const routes: Routes = [
  { 
    path:'', 
    component:HomeComponent 
  },
  { 
    path:'filter', 
    component:FilterComponent
  },
  {
    path:'screened-transactions',
    component:ShadyTransactionsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
