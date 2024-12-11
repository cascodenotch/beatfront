import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MisSetsComponent } from './pages/mis-sets/mis-sets.component';
import { LandingComponent } from './pages/landing/landing.component';
import { EditarSetVaciaComponent } from './pages/editar-set-vacia/editar-set-vacia.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: "landing", component: LandingComponent },
  { path: "mis-sets", component: MisSetsComponent },
  { path: "editar-set-vacia", component: EditarSetVaciaComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
