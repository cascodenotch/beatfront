import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './pages/landing/landing.component';
import { NostrosComponent } from './pages/nostros/nostros.component';
import { MisSetsComponent } from './pages/mis-sets/mis-sets.component';
import { EditarSetComponent } from './pages/editar-set/editar-set.component';
import { CancionesComponent } from './pages/canciones/canciones.component';
import { RecomendacionesComponent } from './pages/recomendaciones/recomendaciones.component';
import { AnalisisComponent } from './pages/analisis/analisis.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { TarjetaSetComponent } from './component/tarjeta-set/tarjeta-set.component';
import { TarjetaCancionSetComponent } from './component/tarjeta-cancion-set/tarjeta-cancion-set.component';
import { TarjetaCancionComponent } from './component/tarjeta-cancion/tarjeta-cancion.component';
import { ValidacionGuardarComponent } from './component/validacion-guardar/validacion-guardar.component';
import { ValidacionEliminarComponent } from './component/validacion-eliminar/validacion-eliminar.component';
import { ValidacionLogOutComponent } from './component/validacion-log-out/validacion-log-out.component';
import { CancionComponent } from './models/cancion/cancion.component';
import { SetComponent } from './models/set/set.component';
import { UserComponent } from './models/user/user.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    NostrosComponent,
    MisSetsComponent,
    EditarSetComponent,
    CancionesComponent,
    RecomendacionesComponent,
    AnalisisComponent,
    HeaderComponent,
    FooterComponent,
    TarjetaSetComponent,
    TarjetaCancionSetComponent,
    TarjetaCancionComponent,
    ValidacionGuardarComponent,
    ValidacionEliminarComponent,
    ValidacionLogOutComponent,
    CancionComponent,
    SetComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
