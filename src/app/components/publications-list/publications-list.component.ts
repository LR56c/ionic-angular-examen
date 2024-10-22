import {
  CommonModule,
} from '@angular/common'
import { Component, OnInit } from '@angular/core';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonModal,
  IonTitle,
  IonToolbar,
  ModalController
} from '@ionic/angular/standalone'
import { PublicationCardComponent } from 'src/app/components/publication-card/publication-card.component'
import { PublicationModalComponent } from 'src/app/components/publication-modal/publication-modal.component'
import { PublicationSkeletonComponent } from 'src/app/components/publication-skeleton/publication-skeleton.component'
import { Publication } from 'src/app/models/publication'
import { PublicationService } from 'src/app/services/publication/publication.service'

@Component( {
  selector   : 'app-publications-list',
  templateUrl: './publications-list.component.html',
  standalone : true,
  styleUrls  : [ './publications-list.component.scss' ],
  imports: [
    PublicationSkeletonComponent,
    CommonModule,
    PublicationCardComponent,
    IonButton,
    IonContent,
    IonHeader,
    IonModal,
    IonTitle,
    IonToolbar
  ]
})
export class PublicationsListComponent implements OnInit{

  loaded = false
  publications : Publication[] = []
  constructor(private publicationService : PublicationService,
    private modalController: ModalController
    ) { }

  async ngOnInit(): Promise<void> {
        this.publicationService.publications$.subscribe(async (publications) => {
          this.loaded = false
          this.publications = Array.from(publications.values())
          this.loaded = true
        })
    }

  async openModal(id : string) {
    const modal = await this.modalController.create({
      component: PublicationModalComponent,
      componentProps: {
        id: id
      },
      backdropDismiss: false,
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      console.log('confirmado')
    }
  }
}
