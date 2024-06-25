import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-menuizquierda',
  templateUrl: './menuizquierda.component.html',
  styleUrls: ['./menuizquierda.component.scss'],
})
export class MenuizquierdaComponent implements OnInit {
 

  constructor( private usuarioService: UsuarioService) { }

  ngOnInit() {}

  logout() {    
    this.usuarioService.logout();
    location.reload(); 
  }

  

  

}
