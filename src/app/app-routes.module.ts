import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './shared/helpers/page-not-found/page-not-found.component';
import { AuthGuard } from './shared/guards/auth.guard';

const appRoutes: Routes = [
    //Default Path
    {
      path: '',
      redirectTo: '/user/login',
      pathMatch: 'full'
    },

    //Login and Register
    { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },

    // Leave Actions
    { path: 'leave', loadChildren: () => import('./leave/leave.module').then(m => m.LeaveModule),
      canActivate: [AuthGuard]
    },

    //Account Actions
    { path: 'user/account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule),
      canActivate: [AuthGuard]
    },

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
