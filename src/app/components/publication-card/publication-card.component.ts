import { DatePipe } from '@angular/common'
import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core'
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonModal,
  IonTitle,
  IonToolbar,
  ModalController
} from '@ionic/angular/standalone'
import { addIcons } from 'ionicons'
import {
  personCircle,
  trashOutline
} from 'ionicons/icons'
import { Publication } from 'src/app/models/publication'

@Component( {
  selector   : 'app-publication-card',
  templateUrl: './publication-card.component.html',
  styleUrls  : [ './publication-card.component.scss' ],
  standalone : true,
  imports: [
    IonIcon,
    DatePipe,
    IonButton,
    IonModal,
    IonList,
    IonItem,
    IonLabel,
    IonContent,
    IonTitle,
    IonToolbar,
    IonHeader,
    IonImg
  ]
})
export class PublicationCardComponent {

  @Input({required: true}) publication !: Publication
  @Output() deletePublication = new EventEmitter<string>()

  constructor() {
    addIcons({
      trashOutline,
    })
  }

  onDelete(): void {
    this.deletePublication.emit(this.publication.id)
  }
}
