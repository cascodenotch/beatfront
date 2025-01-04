import { Component } from '@angular/core';
import { UsersService } from 'src/app/shared/users.service';

@Component({
  selector: 'app-spotify-link',
  templateUrl: './spotify-link.component.html',
  styleUrls: ['./spotify-link.component.css'],
})
export class SpotifyLinkComponent {
  constructor(private userService: UsersService) {}

  vincularSpotify() {
    // Cambiar el estado de logueado a true y guardarlo en localStorage
    this.userService.logueado = true;
    localStorage.setItem('logueado', 'true');

    // Redirigir al endpoint de autenticación de Spotify
    window.location.href = 'http://localhost:3000/spotify/login';
  }
}
