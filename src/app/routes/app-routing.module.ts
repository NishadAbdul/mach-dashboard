import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from '../layout/default/default.component';
import { DEFAULT_ROUTES } from './default-routing.module';
import { AUTH_ROUTES } from './auth-routing.module';
import { WelcomeComponent } from '../layout/login/welcome.component';
import { NotFoundComponent } from "../layout/not-found/not-found.component";

const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'home', component: DefaultComponent, children: DEFAULT_ROUTES
  },  
  {
    path: 'login', component: WelcomeComponent, children: AUTH_ROUTES   
  },
  {
    path: '404', component: NotFoundComponent
  },
  {
    path: '**', redirectTo: '404'
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules, scrollPositionRestoration: 'enabled'
  })],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
