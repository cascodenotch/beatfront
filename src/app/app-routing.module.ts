import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MisSetsComponent } from './pages/mis-sets/mis-sets.component';
import { LandingComponent } from './pages/landing/landing.component';
import { EditarSetComponent } from './pages/editar-set/editar-set.component';
import { AnalisisComponent } from './pages/analisis/analisis.component';
import { CancionComponent } from './models/cancion/cancion.component';
import { NostrosComponent } from './pages/nostros/nostros.component';
import { RecomendacionesComponent } from './pages/recomendaciones/recomendaciones.component';
import { EditarSetVaciaComponent } from './pages/editar-set-vacia/editar-set-vacia.component';

const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: "landing", component: LandingComponent },
  { path: "mis-sets", component: MisSetsComponent },
  { path: "edit-set", component:EditarSetComponent},
  { path: "analisis", component:AnalisisComponent},
  { path: "canciones", component:CancionComponent},
  { path: "nosotros", component:NostrosComponent},
  { path: "recomend", component:RecomendacionesComponent},
  { path: "editar-set-vacia", component: EditarSetVaciaComponent},
  { path: "editar-set", component: EditarSetComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
