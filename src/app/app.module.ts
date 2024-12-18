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
import { EditarSetVaciaComponent } from './pages/editar-set-vacia/editar-set-vacia.component';
import { ValidacionEliminarCancionComponent } from './component/validacion-eliminar-cancion/validacion-eliminar-cancion.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import{DragDropModule} from '@angular/cdk/drag-drop';
import { ValidacionAnadirComponent } from './component/validacion-anadir/validacion-anadir.component';
import { ValidacionCambiarTituloComponent } from './component/validacion-cambiar-titulo/validacion-cambiar-titulo.component';
import { ValidacionMoverCancionComponent } from './component/validacion-mover-cancion/validacion-mover-cancion.component';
import { HttpClientModule } from '@angular/common/http';
import { UsersService } from './shared/users.service';
import { SpotifyLinkComponent } from './component/spotify-link/spotify-link.component';

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
    EditarSetVaciaComponent,
    ValidacionEliminarCancionComponent,
    ValidacionAnadirComponent,
    ValidacionCambiarTituloComponent,
    ValidacionMoverCancionComponent,
    SpotifyLinkComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    DragDropModule,
    HttpClientModule,
  ],
  providers: [UsersService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
