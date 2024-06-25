import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

const urlVideo  = environment.urlVideo;
const urlImagen = environment.urlImagen;

@Component({
  selector: 'app-video',
  templateUrl: './video.page.html',
  styleUrls: ['./video.page.scss'],
})
export class VideoPage implements OnInit {

  @ViewChild('myVideo') myVideo: any;

  video    : any;
  urlvideo : any;
  urlimagen: any;

  constructor( private activatedRoute: ActivatedRoute) { }

  ngOnInit() {   

    this.activatedRoute.queryParams.subscribe(params => {
      const encodedVideo = params['video'];
      if (encodedVideo) {        
        const decodedVideo = JSON.parse(atob(encodedVideo)); // Decodificar el objeto desde base64
        console.log(decodedVideo);
        this.video = decodedVideo;
        this.urlvideo  = urlVideo;
        this.urlimagen = urlImagen;   

        //reinicia el video cada vez que se vuelve a llamar
        if(this.myVideo){
          this.myVideo.nativeElement.load(); 
        }
      }
    });
    
  }

  ionViewDidEnter() {    
    if (this.myVideo.nativeElement.readyState >= 2) {
      // El valor 2 en readyState indica que el video está listo para reproducirse.
      this.myVideo.nativeElement.currentTime = this.video.startime;    
    } else {
      this.myVideo.nativeElement.addEventListener('canplay', () => {
        this.myVideo.nativeElement.currentTime = this.video.startime;
      });
    }
  }

}
