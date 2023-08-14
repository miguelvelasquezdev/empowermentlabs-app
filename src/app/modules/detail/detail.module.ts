import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DetailRoutingModule } from './detail-routing.module';
import { DetailComponent } from './detail.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DetailComponent],
  imports: [CommonModule, DetailRoutingModule, ReactiveFormsModule],
})
export class DetailModule {}
