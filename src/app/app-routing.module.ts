import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SudokuComponent } from './sudoku/sudoku.component';

const routes: Routes = [
  { path: '', component: SudokuComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
