import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/shared/users.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-spotify-link',
  templateUrl: './spotify-link.component.html',
  styleUrls: ['./spotify-link.component.css'],
})
export class SpotifyLinkComponent  {
  user: User | null = null;

  constructor(private userService: UsersService) {}



  vincularSpotify() {
    window.location.href = 'http://localhost:3000/spotify/login';
  }
}
