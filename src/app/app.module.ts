import { CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './routes/app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultComponent } from './layout/default/default.component';
import { WelcomeComponent } from './layout/login/welcome.component';
import { HttpClientModule } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CoreModule } from './core/core.module';
import { HttpCancelService } from './core/helper/cancelpendingrequest.service';
import { interceptorProviders } from './core/interceptors/interceptors';
import { ErrorHandlerService } from './core/services/error-handler.service';
import { GlobalErrorHandlerService } from './core/services/global-error-handler.service';
import { RouteDataService } from './core/services/routedata.service';
import { AppState } from './app.service';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    DefaultComponent,
    WelcomeComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    CoreModule,
    SharedModule,
    AppRoutingModule,
    MatProgressSpinnerModule
  ],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService },
    interceptorProviders, AppState, HttpCancelService, RouteDataService, ErrorHandlerService
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
