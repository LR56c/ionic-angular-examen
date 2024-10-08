import {
  CommonModule,
  Location
} from '@angular/common'
import {
  Component,
  ViewChild
} from '@angular/core'
import { FormsModule } from '@angular/forms'
import { ViewDidEnter } from '@ionic/angular'
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone'
import { addIcons } from 'ionicons'
import { arrowBackOutline } from 'ionicons/icons'
import { NewPublicationComponent } from 'src/app/components/new-publication/new-publication.component'

@Component( {
  selector   : 'app-publication',
  templateUrl: './publication.page.html',
  styleUrls  : [ './publication.page.scss' ],
  standalone : true,
  imports    : [ IonContent, IonHeader, IonTitle, IonToolbar, CommonModule,
    FormsModule,
    IonIcon, NewPublicationComponent ]
} )
export class PublicationPage {

  constructor( private location: Location ) {
    addIcons( {
      arrowBackOutline
    } )
  }

  public navigateBack(): void {
    this.location.back()
  }
}
