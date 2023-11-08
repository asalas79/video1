import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VideoCreatePage } from './video-create.page';

const routes: Routes = [
  {
    path: '',
    component: VideoCreatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideoCreatePageRoutingModule {}
