import { Routes } from '@angular/router';

export const AUTH_ROUTES: Routes = [
    {
        path: '',
        loadChildren: () => import('../login/login.module').then(m => m.LoginModule)
    }
]