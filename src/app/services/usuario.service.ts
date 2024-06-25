/* eslint-disable @typescript-eslint/dot-notation */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';
import { UiServiceService } from './ui-service.service';
import { NavController } from '@ionic/angular';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token: string = '';
  private usuario: any = {};

  constructor( 
    private http: HttpClient,
    private storage: Storage,
    private ui: UiServiceService ,
    private navCtrl: NavController
    ) { storage.create();}

    /*
   * Para el login de usuario
   */
  async login( email: string, password: string ) {
    
    const data = { email, password };
    return new Promise( resolve => {
      this.http.post<any>(`${ URL }/login`,( data) ).
        subscribe( async resp => {            
            if(resp.ok){            
              await this.guardarToken( resp.token );
              resolve(true);
            }else{
              this.token = '';              
              resolve( false );
            }
        }).add(() => {
          
        });
    });
  }

  async guardarToken( token: string ) {
    this.token = token;
    await this.storage.set('token', token);
    await this.validaToken();
  }

  async cargarToken(){
   this.token = await this.storage.get('token') || null;
  }

  async validaToken(): Promise<boolean> {

    await this.cargarToken();
    
    if( !this.token ){
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }

    return new Promise<boolean>( resolve => {
      this.http.get<any>(`${ URL }/verificatoken/`).
        subscribe(resp => {
          //console.log( resp );          
          if(resp['ok']){ 
            resolve(true);
          }else{
            //1027: En el servidor la forma de recibir el token es diferente
            this.ui.presentToast('Problemas con el token de usuario, [1027]','danger');
            this.navCtrl.navigateRoot('/login');
            resolve(false);
          }
        });
    });
  }

  logout(){
    this.token   = '';
    this.usuario = '';
    this.storage.clear();
    this.navCtrl.navigateRoot('/', { animated: true, replaceUrl: true });
    this.navCtrl.navigateRoot('/login', { animated: true, replaceUrl: true });
  }


}
