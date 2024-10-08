import {
  Component,
  ViewChild
} from '@angular/core'
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms'
import { IonicModule } from '@ionic/angular'
import { PhotoInputComponent } from 'src/app/components/photo-input/photo-input.component'
import { Publication } from 'src/app/models/publication'
import { PublicationService } from 'src/app/services/publication/publication.service'
import {
  decodeTime,
  ulid
} from 'ulidx'

@Component( {
  selector   : 'app-new-publication',
  templateUrl: './new-publication.component.html',
  styleUrls  : [ './new-publication.component.scss' ],
  standalone : true,
  imports    : [
    IonicModule,
    ReactiveFormsModule,
    PhotoInputComponent
  ]
} )
export class NewPublicationComponent {

  @ViewChild( 'photoInput' ) photoInput !: PhotoInputComponent

  publicationForm = new FormGroup( {
    title      : new FormControl( '',
      [ Validators.required, Validators.minLength( 5 ) ] ),
    description: new FormControl( '',
      [ Validators.required, Validators.minLength( 20 ) ] ),
    photo      : new FormControl( '', [ Validators.required ] )
  } )

  constructor( private publicationService: PublicationService ) { }

  async addPublication(): Promise<void> {
    if ( !this.publicationForm.valid ) {
      this.publicationForm.markAllAsTouched()
      return
    }
    const id                       = ulid()
    const publication: Publication = {
      id,
      createdAt  : new Date( decodeTime( id ) ),
      title      : this.publicationForm.get( 'title' )!.value!,
      description: this.publicationForm.get( 'description' )!.value!,
      image      : this.publicationForm.get( 'photo' )!.value!
    }

    await this.publicationService.addPublication( publication )
    this.publicationForm.reset()
  }
}
