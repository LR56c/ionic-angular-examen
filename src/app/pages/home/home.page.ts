import { CommonModule } from '@angular/common'
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router'
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonFab,
  IonFabButton,
  IonIcon
} from '@ionic/angular/standalone'
import { addIcons } from 'ionicons'
import {
  add,
  settingsOutline
} from 'ionicons/icons'
import { PublicationsListComponent } from 'src/app/components/publications-list/publications-list.component'

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [ IonHeader, IonToolbar, IonTitle, IonContent, IonFab, IonFabButton,
    CommonModule,
    IonIcon, RouterLink, PublicationsListComponent ]
})
export class HomePage {
  constructor() {
    addIcons( {
      settingsOutline,
      add
    } )
  }
}
