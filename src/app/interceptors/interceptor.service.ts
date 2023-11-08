import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler,HttpEvent,HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';
import { catchError} from 'rxjs/operators';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor( private usuarioService: UsuarioService, private toastController: ToastController) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if(this.usuarioService.token){
      console.log( 'paso por el inteceptor1');

      const headers = new HttpHeaders({
        'X-Token' : this.usuarioService.token
      });

      const reqClone = req.clone({
        headers
      });

      return next.handle( reqClone ).pipe(
        catchError(err => {
          console.log(err);
          let errorMessage = '';
          if (err.error instanceof ErrorEvent) {
            errorMessage = `Error, hacer una captura de pantalla: ${err.error.message}`;
          } else {
            errorMessage = `Error, hacer una captura de pantalla: ${err.status}\nMessage: ${err.message}`;
          }
          this.toastController.create({
            message: errorMessage,
            duration: 20000
          }).then(toast => toast.present());

          return throwError('Error personalizado');
        })

      );

    }else{
      //console.log( 'paso por el inteceptor2');
      return next.handle( req );
    }

  }

  manejarError( error: HttpErrorResponse ){
      console.log(error);
      //return throwError( 'Error personalizado');
  }


}