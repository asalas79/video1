import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VideoService } from 'src/app/services/video.service';
import { UiServiceService } from 'src/app/services/ui-service.service';
// @ts-ignore
@Component({
  selector: 'app-video-create',
  templateUrl: './video-create.page.html',
  styleUrls: ['./video-create.page.scss'],
})
export class VideoCreatePage implements OnInit {
 
  uploadForm: FormGroup;
  images: File[] = [];
  imagePreviews: string[] = [];

  constructor(private formBuilder: FormBuilder,
              private videoservice: VideoService,
              private ui: UiServiceService) {

    this.uploadForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      startime: [0],
      video: ['',Validators.required], 
      images: this.formBuilder.array([])

    });
  }

  ngOnInit() {
  }

  onFileSelected(event: any) {
    const videoFile = event.target.files[0];
    this.uploadForm.patchValue({ video: videoFile });
  }

  onImageSelected(event: any, imageIndex: number) {
    const imageFile = event.target.files[0];
    
    if (imageFile && imageFile.type.startsWith('image/')) {
      // Verifica si el archivo seleccionado es una imagen
      this.images[imageIndex] = imageFile;
  
      const reader = new FileReader();
  
      reader.onload = (e: any) => {
        this.imagePreviews[imageIndex] = e.target.result;
      };
  
      reader.readAsDataURL(imageFile);
  
      // Verifica la existencia de imageControl antes de establecer el valor
      const imageControl = this.uploadForm.get(`images.${imageIndex}`);
      if (imageControl) {
        imageControl.setValue(imageFile);
      }
  
    } else {
      // Muestra un mensaje de error si el archivo no es una imagen válida
      console.error('El archivo seleccionado no es una imagen válida.');
    }
  }
  

  submitForm() {
    this.ui.spinerLoading('');
    if (this.uploadForm.valid) {
      // Crea un objeto FormData para enviar datos y archivos
      
      const formData = new FormData();
      // @ts-ignore
      formData.append('title', this.uploadForm.get('title').value);
      // @ts-ignore
      formData.append('description', this.uploadForm.get('description').value);
      // @ts-ignore
      formData.append('category', this.uploadForm.get('category').value);
      // @ts-ignore
      formData.append('video', this.uploadForm.get('video').value);
  
      // Agrega las imágenes al FormData
      for (let i = 0; i < this.images.length; i++) {
        formData.append('image' + i, this.images[i]);    
      }
      console.log(formData);

      
      // Llama a la función del servicio para cargar los archivos
      this.videoservice.createVideo(formData).subscribe(response => {
        // Maneja la respuesta del servidor aquí    
        if(response.ok){          
          this.ui.presentToast('Multimedia subida con exito','success')
        }
      },      
      error => {
        console.error('Error al cargar el video:', error);
        this.ui.presentToast('Error al cargar el video', 'danger');
      },
      () => {        
        setTimeout(() => {
          this.ui.spinerCerrar();
        },2000);
      }
      
      );
    } else {
      this.ui.presentToast('Llenar los campos del formulario, un video y sus imagenes', 'danger');
      // Muestra un mensaje de error o realiza acciones apropiadas en caso de formulario no válido.
    }

  }

  openFileInput(inputId: string): void {
    const inputElement = document.getElementById(inputId) as HTMLInputElement;
    if (inputElement) {
      inputElement.click();
    }
  }
}
