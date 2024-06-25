import { Component, OnInit } from '@angular/core';
import { VideoService } from '../../services/video.service';
import { Videos } from 'src/app/interfaces/video';
import { environment } from 'src/environments/environment';
import { Router,ActivatedRoute } from '@angular/router';
import { UiServiceService } from 'src/app/services/ui-service.service';


const urlimg = environment.urlImagen;

@Component({
  selector: 'app-random',
  templateUrl: './random.page.html',
  styleUrls: ['./random.page.scss'],
})
export class RandomPage implements OnInit {
  categoria: string = 'Random'; // Declarar la propiedad categoria aquí
  tipo: string = '';
  
  videos: Videos[] = [];
  habilitado = true;
  urlImagen: string = '';

  constructor( private videoService: VideoService,
               private router: Router,
               private ui:UiServiceService,
               private route: ActivatedRoute,
              ) { }

  ngOnInit() {

    this.route.params.subscribe(params => {
      this.tipo = params['tipo'];   
      const parametro1 = params['NombreCategoria'];
      this.categoria = parametro1 ? parametro1.split('-').join(' ').toUpperCase() : '';      
      console.log('info:',this.categoria)   ;
    });

    this.urlImagen = urlimg;      
    this.siguientes(null, true);    
  }

  

  recargar( event?:any ){
    this.siguientes( event, true);
    this.habilitado = true;
    this.videos = [];
  }

  async siguientes( event?:any,pull: boolean = false ) {
    await this.ui.spinerLoading('');
    this.videoService.getVideosRandom( pull,this.tipo )
      .subscribe( resp => {        
        
        if(resp.ok){
          console.log(resp);
          
          if( this.tipo === 'fecha'){
            var filtrados = this.shuffleArray(resp.videos)
          }else{
            var filtrados = this.shuffleArray(resp.videos)
          }

          this.videos.push( ...filtrados );
          /*if( event ){
            event.target.complete();
            //bloquear que siga haciendo infinyscroll
            if(resp.videos.length === 0){
              this.habilitado = false;
            }
          }*/
        }else{          
          //this.uiServiceService.presentToast('No hay mas paquetes','warning');
        }     
        this.ui.spinerCerrar();   
    });
  } 

  verVideo( video:any ){        
    //this.router.navigate(['/video'], { queryParams: { video: JSON.stringify(video) } });
    const encodedVideo = btoa(JSON.stringify(video)); // Codificar el objeto en base64
    this.router.navigate(['/video'], { queryParams: { video: encodedVideo } });
  }

  shuffleArray(array: any[]): any[] {
    let currentIndex = array.length, randomIndex, temporaryValue;
  
    // Mientras haya elementos que mezclar...
    while (currentIndex !== 0) {
  
      // Elegir un elemento restante...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // E intercambiarlo con el elemento actual.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

}
