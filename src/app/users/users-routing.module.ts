import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserEditorComponent } from './user-editor/user-editor.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  { path: '', component: UserListComponent },
  { path: 'adduser', component: UserEditorComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
