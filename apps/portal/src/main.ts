import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from '../src/environments/environment';

if (environment.production) {
  enableProdMode();
}

// document.addEventListener('DOMContentLoaded', () => {
function bootstrap() {
  platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.log(err));
}

if (document.readyState === 'complete') {
  bootstrap();
} else {
  document.addEventListener('DOMContentLoaded', bootstrap);
}