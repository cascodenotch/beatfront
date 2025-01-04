import { Component } from '@angular/core';
import { UsersService } from 'src/app/shared/users.service';
import { Router } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  showValidation: boolean = false;

  constructor(public userService: UsersService, private router: Router) {}

  openValidation() {
    this.showValidation = true;
  }

  closeValidation() {
    this.showValidation = false;
  }

  confirmLogout() {
    this.userService.logueado = false;
    localStorage.removeItem('logueado');
    this.router.navigate(['/landing']);
    this.closeValidation();
  }

  get profilePicture(): string {
    return this.userService.user?.photo || '../../../assets/Img/default-profile.png'; // Imagen por defecto si no hay usuario
  }
}
