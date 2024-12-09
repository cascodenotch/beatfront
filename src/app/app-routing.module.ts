import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MisSetsComponent } from './pages/mis-sets/mis-sets.component';

const routes: Routes = [
  { path: "sets", component: MisSetsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
