import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './shared/helpers/page-not-found/page-not-found.component';
const appRoutes: Routes = [
    // Login and Register
    { path: '', redirectTo: '/user/login', pathMatch: 'full' },
    { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },

    // Leave Actions
    { path: 'leave', loadChildren: () => import('./leave/leave.module').then(m => m.LeaveModule) },

    //Account Actions
    { path: 'user/account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },

    //404
    { path: 'not-found', component: PageNotFoundComponent },
    { path: '**', redirectTo: '/not-found', pathMatch: 'full' },
  ];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes) //routes config
    ],
    exports: [RouterModule],
    declarations: []
})
export class AppRoutingModule {
}
