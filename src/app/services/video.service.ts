import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Video } from '../interfaces/video';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  paginaPost = 0;

  constructor( private https: HttpClient ) { }

  getVideosRandom( pull: boolean,sql:any ){

    if( pull ){
      this.paginaPost = 0;
    }

    const parametros = {
      pagina: this.paginaPost,
      sql   
    };

    this.paginaPost ++;
    return this.https.get<Video>(`${ URL  }/lsvideosramdon/`,{ params: parametros });

  }

  createVideo(formData: FormData) {
    return this.https.post<any>(`${ URL  }/subirvideo/`, formData);
  }




}
