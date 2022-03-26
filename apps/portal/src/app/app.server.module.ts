import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { CookieService, CookieBackendService } from '@gorniv/ngx-universal';
import { DeviceDetectorService } from 'ngx-device-detector';
import { UniversalDeviceDetectorService } from './shared/universal-device-detector.service';

@NgModule({
  providers: [
    {
      provide: DeviceDetectorService,
      useClass: UniversalDeviceDetectorService
    },
    { provide: CookieService, useClass: CookieBackendService },
  ],
  imports: [
    AppModule,
    ServerModule,
    ServerTransferStateModule
  ],
  bootstrap: [AppComponent]
})
export class AppServerModule {}
