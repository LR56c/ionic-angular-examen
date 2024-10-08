import {
	Component,
	Input
} from '@angular/core'
import {
	IonButton,
	IonContent,
	IonHeader,
	IonTitle,
	IonToolbar,
	ModalController
} from '@ionic/angular/standalone'
import { PublicationService } from 'src/app/services/publication/publication.service'

@Component( {
	selector   : 'app-publication-modal',
	templateUrl: './publication-modal.component.html',
	styleUrls  : [ './publication-modal.component.scss' ],
	imports    : [
		IonButton,
		IonContent,
		IonHeader,
		IonTitle,
		IonToolbar
	],
	standalone : true
} )
export class PublicationModalComponent {

	constructor(
		private modalController: ModalController,
		private publicationService: PublicationService )
	{ }

	@Input( { required: true } ) id !: string

	async confirmModal() {
		await this.publicationService.deletePublication( this.id )
		return this.modalController.dismiss( null, 'confirm' )
	}

	closeModal() {
		return this.modalController.dismiss( null, 'cancel' )
	}
}
