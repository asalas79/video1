import { Component } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { UsuarioService } from './services/usuario.service';
import { MenuController } from '@ionic/angular';

register();
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor( private usuarioService: UsuarioService, private menuController: MenuController) {}

  logout() {    
    this.menuController.close('first'); // 'first' es el ID del menú que estás cerrando
    this.usuarioService.logout();    
    location.reload(); 
  }
  closeMenu() {
    this.menuController.close('first'); // 'first' es el ID del menú que estás cerrando
  }
}
