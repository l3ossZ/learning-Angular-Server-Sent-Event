import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonRoutingModule } from './person-routing.module';
import {PersonComponent} from "./person.component";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [PersonComponent],
  imports: [
    CommonModule,
    PersonRoutingModule,
    ReactiveFormsModule
  ]
})
export class PersonModule { }
