import { Routes } from '@angular/router';

export const DEFAULT_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'applications',
        pathMatch: 'full'
    },
   /* {
        path: 'search',
        loadChildren: () => import('../search/search.module').then(m => m.SearchModule)
    },*/
    {
        path: 'applications',
        loadChildren: () => import('../applications/applications.module').then(m => m.ApplicationsModule)
    }
]