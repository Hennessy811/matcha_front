import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import {AppComponent} from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import { HeaderComponent } from './shared/header/header.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { UserProfileComponent } from './profile/user-profile/user-profile.component';
import { FeedComponent } from './feed/feed.component';
import { ChatComponent } from './chat/chat.component';
import { NavComponent } from './shared/nav/nav.component';
import {
  MatButtonModule,
  MatCardModule, MatChipsModule, MatDividerModule, MatFormFieldModule, MatIconModule, MatInputModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatToolbarModule, MatCheckboxModule, MatSelectModule,
  MatSliderModule, MatRadioModule, MatListModule, MatSnackBarModule, MatTabsModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {StoreModule} from '@ngrx/store';
import { ConfirmationComponent } from './registration/confirmation/confirmation.component';
import { reducers, metaReducers } from './reducers';
import { environment } from '../environments/environment';
import { AppEffects } from './app.effects';
import * as fromUser from './user.reducer';
import * as fromRooms from './rooms.reducer';
import { UserEffects } from './user.effects';
import {ApplicationGuard} from './core/services/application.guard';
import { UserPofileItemComponent } from './profile/user-pofile-item/user-pofile-item.component';
import { GuestUserComponent } from './profile/guest-user/guest-user.component';
import {AgmDirectionModule} from 'agm-direction';
import { RestorePasswordComponent } from './restore-password/restore-password.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegistrationComponent,
    LoginComponent,
    UserProfileComponent,
    FeedComponent,
    ChatComponent,
    NavComponent,
    ConfirmationComponent,
    UserPofileItemComponent,
    GuestUserComponent,
    RestorePasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatDividerModule,
    MatSelectModule,
    MatSliderModule,
    MatRadioModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatCardModule,
    MatInputModule,
    MatChipsModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    StoreModule.forRoot({}),
    BrowserAnimationsModule,
    EffectsModule.forRoot([AppEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
    AgmDirectionModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreModule.forFeature('user', fromUser.reducer),
    StoreModule.forFeature('rooms', fromRooms.reducer),
    EffectsModule.forFeature([UserEffects]),
    MatDividerModule,
    MatListModule,
    MatTabsModule,
  ],
  providers: [ApplicationGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
