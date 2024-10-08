import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as path from "node:path";

const routes: Routes = [
  { path:'', loadChildren: () => import('./pages/person/person.module').then(m => m.PersonModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
