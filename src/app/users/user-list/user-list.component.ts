import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { User, UserFilter } from '../models';
import {
  ClearUser,
  DeleteUser,
  FilterUser,
  GetUser,
  SelectUser,
} from '../reducer/users.actions';
import { isLoaded, selectUsersState } from '../reducer/users.index';
import { UsersState } from '../reducer/users.reducer';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, OnDestroy {
  users: Observable<User[]>;
  form: FormGroup = new FormGroup({});
  filter: UserFilter = { nameFilterDescending: true };
  showFilter = false;

  subscription$: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private _store: Store<UsersState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [],
      username: [],
      email: [],
      nameFilterDescending: true,
    });
    // Can be implemented with backend or
    // -filtered in the store if we save the original userlist and the filtered one separatedly
    this.subscription$.push(
      this.form.valueChanges.subscribe((filterval) =>
        this._store.dispatch(new FilterUser(filterval))
      )
    );
    this._store.dispatch(new ClearUser());
    this.users = this._store.select(selectUsersState);
    this.subscription$.push(
      this._store.select(isLoaded).subscribe((hasLoaded) => {
        if (!hasLoaded) this._store.dispatch(new GetUser(this.filter));
      })
    );
  }
  open(user) {
    this._store.dispatch(new SelectUser({ user: user, readonly: true }));
    this.router.navigate(['users/adduser']);
  }
  modify(user) {
    this._store.dispatch(new SelectUser({ user: user, readonly: false }));
    this.router.navigate(['users/adduser']);
  }
  add() {
    this.router.navigateByUrl('users/adduser');
  }
  delete(id) {
    // Maybe a confirm modal is neccesary if the data is important
    this._store.dispatch(new DeleteUser(id));
  }
  togleFilter() {
    this.showFilter = !this.showFilter;
  }
  sortByName() {
    this.form.controls['nameFilterDescending'].setValue(
      !this.form.controls['nameFilterDescending'].value,
      { emitEvent: false } // If its true the action will dispatch twice because of the subscription in line 42
    );
    this._store.dispatch(new FilterUser(this.form.value));
  }
  onSubmit() {}
  ngOnDestroy(): void {
    // subscription ending: could be used with takeuntil() method too
    this.subscription$.forEach((v) => v.unsubscribe());
  }
}
