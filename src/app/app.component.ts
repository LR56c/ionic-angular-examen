import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  OnInit
} from '@angular/core'
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { PublicationService } from 'src/app/services/publication/publication.service'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
  schemas    : [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppComponent implements OnInit{
  constructor(private publicationService : PublicationService) {}

  async ngOnInit(): Promise<void> {
        await this.publicationService.init()
    }

}
