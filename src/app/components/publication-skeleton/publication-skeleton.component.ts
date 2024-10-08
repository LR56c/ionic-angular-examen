import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular'

@Component( {
  selector   : 'app-publication-skeleton',
  templateUrl: './publication-skeleton.component.html',
  styleUrls  : [ './publication-skeleton.component.scss' ],
  standalone : true,
  imports    : [
    IonicModule
  ]
})
export class PublicationSkeletonComponent {

  constructor() { }

}
