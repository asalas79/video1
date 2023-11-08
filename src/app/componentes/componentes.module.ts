import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { IonicModule } from '@ionic/angular';
import { FooterComponent } from './footer/footer.component';
import { AleatorioComponent } from './aleatorio/aleatorio.component';
import { MenuderechaComponent } from './menuderecha/menuderecha.component';
import { MenuizquierdaComponent } from './menuizquierda/menuizquierda.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    AleatorioComponent,
    MenuderechaComponent,
    MenuizquierdaComponent
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    AleatorioComponent,
    MenuderechaComponent,
    MenuizquierdaComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    RouterModule
  ]
})
export class ComponentesModule { }
