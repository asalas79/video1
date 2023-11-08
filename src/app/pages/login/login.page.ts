import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UiServiceService } from 'src/app/services/ui-service.service';
import { NavController } from '@ionic/angular';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  loginUser = {
    email:'super',
    password: '123'
  };
  
  constructor(    
              private  ui: UiServiceService,
              private navCtrl: NavController,
              private usuarioService: UsuarioService) { }

  ngOnInit() {    
  }

  async login( fLogin: NgForm){
    
    if( fLogin.invalid){
      this.ui.presentToast('Por favor colocar un usuario o contraseña','danger');
      return;
    }
    await this.ui.spinerLoading('Iniciando sesión');
    const valido = await this.usuarioService.login ( this.loginUser.email, this.loginUser.password);   
    this.ui.spinerCerrar(); 
    if( valido ){
      this.navCtrl.navigateRoot( '/random/random',{ animated: true } );          
    }else{
      this.ui.alertaInformativo('Usuario o contraseña no son correctos!');
    }


  }

}
