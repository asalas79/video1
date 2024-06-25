import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VideoCreatePageRoutingModule } from './video-create-routing.module';

import { VideoCreatePage } from './video-create.page';

import { ReactiveFormsModule } from '@angular/forms';
import { ComponentesModule } from 'src/app/componentes/componentes.module';

@NgModule({
  imports: [
    ComponentesModule,
    CommonModule,
    FormsModule,
    IonicModule,
    VideoCreatePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [VideoCreatePage]
})
export class VideoCreatePageModule {}
