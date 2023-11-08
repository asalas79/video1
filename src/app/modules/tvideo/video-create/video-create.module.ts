import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VideoCreatePageRoutingModule } from './video-create-routing.module';

import { VideoCreatePage } from './video-create.page';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VideoCreatePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [VideoCreatePage]
})
export class VideoCreatePageModule {}
