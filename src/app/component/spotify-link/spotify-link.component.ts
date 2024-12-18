import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/shared/users.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-spotify-link',
  templateUrl: './spotify-link.component.html',
  styleUrls: ['./spotify-link.component.css'],
})
export class SpotifyLinkComponent implements OnInit {
  user: User | null = null;

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    const params = new URLSearchParams(window.location.search);
    const spotifyId = params.get('spotifyId'); // Captura el Spotify ID desde la URL.

    if (spotifyId) {
      this.userService.getUser(spotifyId).subscribe(
        (data) => (this.user = data),
        (error) => console.error('Error al obtener datos del usuario:', error)
      );
    }
  }

  vincularSpotify() {
    window.location.href = 'http://localhost:3000/spotify/login';
  }
}
