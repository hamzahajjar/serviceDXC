import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UniquePipe } from './unique.pipe';



@NgModule({
  declarations: [UniquePipe],
  exports: [UniquePipe],
  imports: [
    CommonModule
  ]
 
})
export class PipeModule { }
