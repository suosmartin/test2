import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UserEditorComponent } from './user-editor/user-editor.component';
import { UsersService } from './users.service';
import { UsersRoutingModule } from './users-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { UserEffects } from './reducer/users.effects';
import * as users from './reducer/users.reducer';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UserListComponent, UserEditorComponent],
  imports: [
    StoreModule.forRoot({ users: users.reducer }),
    EffectsModule.forRoot([UserEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }),
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [UsersService, UserEffects],
})
export class UsersModule {}
