import { Component, OnInit } from '@angular/core';
import { VideoService } from '../../services/video.service';
import { Videos } from 'src/app/interfaces/video';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

const urlimg = environment.urlImagen;

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.page.html',
  styleUrls: ['./categorias.page.scss'],
})
export class CategoriasPage implements OnInit {

  videos: Videos[] = [];
  habilitado = true;
  urlImagen: string = '';

  constructor( private videoService: VideoService,
               private router: Router) { }

  ngOnInit() {
    this.urlImagen = urlimg;      
    this.siguientes(null, true);    
  }

  recargar( event?:any ){
    this.siguientes( event, true);
    this.habilitado = true;
    this.videos = [];
  }

  async siguientes( event?:any,pull: boolean = false ) {
    //await this.uiServiceService.spinerLoading('');
    this.videoService.getVideosRandom( pull,'random' )
      .subscribe( resp => {        
        if(resp.ok){
          console.log(resp.videos);
          const shuffledVideos = this.shuffleArray(resp.videos)
          this.videos.push( ...shuffledVideos );
          if( event ){
            event.target.complete();
            //bloquear que siga haciendo infinyscroll
            if(resp.videos.length === 0){
              this.habilitado = false;
            }
          }
        }else{
          //this.uiServiceService.presentToast('No hay mas paquetes','warning');
        }        
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
