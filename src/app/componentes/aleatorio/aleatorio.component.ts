import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { VideoService } from '../../services/video.service';
import { Videos } from 'src/app/interfaces/video';
import { Router } from '@angular/router';

const urlimg = environment.urlImagen;

@Component({
  selector: 'app-aleatorio',
  templateUrl: './aleatorio.component.html',
  styleUrls: ['./aleatorio.component.scss'],
})
export class AleatorioComponent implements OnInit {

  videos: Videos[] = [];
  habilitado = true;
  urlImagen: string = '';

  constructor(private videoService: VideoService,
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
          //console.log(resp);
          this.videos.push( ...resp.videos );
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
    console.log(video);
    const encodedVideo = btoa(JSON.stringify(video)); // Codificar el objeto en base64
    this.router.navigate(['/video'], { queryParams: { video: encodedVideo } });


  }

}
