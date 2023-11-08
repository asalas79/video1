import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { UsuarioGuard } from './guards/usuario.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canLoad:[ UsuarioGuard ]
  },
  {
    path: '',
    redirectTo: 'random/random',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'categorias',
    loadChildren: () => import('./pages/categorias/categorias.module').then( m => m.CategoriasPageModule),
    canLoad:[ UsuarioGuard ]
  },
  {
    path: 'random/:tipo',
    loadChildren: () => import('./pages/random/random.module').then( m => m.RandomPageModule),
    canLoad:[ UsuarioGuard ]
  },
  {
    path: 'video',
    loadChildren: () => import('./pages/video/video.module').then( m => m.VideoPageModule),
    canLoad:[ UsuarioGuard ]
  },
  {
    path: 'video-create',
    loadChildren: () => import('./modules/tvideo/video-create/video-create.module').then( m => m.VideoCreatePageModule),    
    canLoad:[ UsuarioGuard ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
