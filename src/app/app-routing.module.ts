import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FeedComponent} from './feed/feed.component';
import {UserProfileComponent} from './profile/user-profile/user-profile.component';
import {LoginComponent} from './login/login.component';
import {RegistrationComponent} from './registration/registration.component';
import {ChatComponent} from './chat/chat.component';
import {ConfirmationComponent} from './registration/confirmation/confirmation.component';
import {ApplicationGuard} from './core/services/application.guard';
import {GuestUserComponent} from './profile/guest-user/guest-user.component';
import {RestorePasswordComponent} from './restore-password/restore-password.component';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'feed'
  },
  {
    path: 'confirm', component: ConfirmationComponent
  },
  {
    path: 'feed', component: FeedComponent, canActivate: [ApplicationGuard]
  },
  {
    path: 'profile', component: UserProfileComponent, canActivate: [ApplicationGuard]
  },
  {
    path: 'profile/:id', component: GuestUserComponent, canActivate: [ApplicationGuard]
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'registration', component: RegistrationComponent
  },
  {
    path: 'restore', component: RestorePasswordComponent
  },
  {
    path: 'chat/:id', component: ChatComponent, canActivate: [ApplicationGuard]
  },
  {
    path: 'chat', component: ChatComponent, canActivate: [ApplicationGuard]
  },
  {
    path: '**', redirectTo: 'feed'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
