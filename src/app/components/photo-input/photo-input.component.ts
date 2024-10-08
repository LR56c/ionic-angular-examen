import { CommonModule } from '@angular/common'
import {
  booleanAttribute,
  Component,
  Input
} from '@angular/core'
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator
} from '@angular/forms'
import {
  Camera,
  CameraResultType
} from '@capacitor/camera'
import { IonicModule } from '@ionic/angular'
import { IonIcon } from '@ionic/angular/standalone'
import { addIcons } from 'ionicons'
import { cameraOutline } from 'ionicons/icons'

@Component( {
  selector   : 'app-photo-input',
  templateUrl: './photo-input.component.html',
  styleUrls  : [ './photo-input.component.scss' ],
  imports    : [
    IonicModule,
    IonIcon,
    CommonModule
  ],
  standalone : true,
  providers  : [
    {
      provide    : NG_VALUE_ACCESSOR,
      multi      : true,
      useExisting: PhotoInputComponent
    },
    {
      provide    : NG_VALIDATORS,
      multi      : true,
      useExisting: PhotoInputComponent
    }
  ]
} )
export class PhotoInputComponent implements ControlValueAccessor, Validator {
  // reference: https://blog.angular-university.io/angular-custom-form-controls/
  @Input( { transform: booleanAttribute } ) required: boolean = false
  @Input() label: string                                      = 'Foto'
  @Input() errorText: string                                  = 'Este campo es requerido'
  @Input() photo: string | undefined
  @Input() errors: ValidationErrors | undefined | null
  @Input() touched: boolean | undefined                       = false

  onChange  = ( photo: string ) => {}
  onTouched = () => {}
  disabled  = false

  constructor() {
    addIcons( {
      cameraOutline
    } )
  }

  validate( control: AbstractControl<any, any> ): ValidationErrors | null {
    return this.internalValidate()
  }

  private internalValidate(): ValidationErrors | null {
    this.errors = this.required && !this.photo ? { required: true } : null
    return this.errors
  }


  writeValue( photo: string ): void {
    this.photo = photo
  }

  registerOnChange( onChange: any ): void {
    this.onChange = onChange
  }

  registerOnTouched( onTouched: any ): void {
    this.onTouched = onTouched
  }

  setDisabledState?( disabled: boolean ): void {
    this.disabled = disabled
  }

  async onPhotoChange() {
    try {
      const image = await Camera.getPhoto( {
        quality     : 90,
        allowEditing: false,
        resultType  : CameraResultType.Base64
      } )

      this.photo = `data:image/jpeg;base64,${ image.base64String }`
      this.onChange( this.photo )
    }
    catch ( e ) {
    }
    finally {
      this.internalValidate()
      this.markAsTouched()
    }
  }

  markAsTouched() {
    if ( !this.touched ) {
      this.onTouched()
      this.touched = true
    }
  }
}
