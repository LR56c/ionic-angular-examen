import { enableProdMode } from '@angular/core'
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { defineCustomElements } from 'jeep-sqlite/loader'
import { environment } from 'src/environments/environment.prod'
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

if ( environment.production ) {
  enableProdMode()
}
defineCustomElements( window )

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});
