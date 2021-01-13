import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../models';
import { AddUser, UpdateUser } from '../reducer/users.actions';
import { getSelectedUser, isEditorReadOnly } from '../reducer/users.index';
import { UsersState } from '../reducer/users.reducer';

@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.scss'],
})
export class UserEditorComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  readonly: Observable<boolean>;
  currentUser: Observable<User>;
  constructor(
    private fb: FormBuilder,
    private _store: Store<UsersState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUser = this._store.select(getSelectedUser);
    this.readonly = this._store.select(isEditorReadOnly);
    this.readonly.subscribe((r) => {
      if (r) this.form.disable();
      this.form = this.fb.group({
        id: [{ value: null, disabled: r }],
        name: [{ value: null, disabled: r }, Validators.required], // required for validation
        username: [{ value: null, disabled: r }],
        email: [{ value: null, disabled: r }],
        address: this.fb.group({
          street: [{ value: null, disabled: r }],
          suite: [{ value: null, disabled: r }],
          city: [{ value: null, disabled: r }],
          zipcode: [{ value: null, disabled: r }],
          geo: this.fb.group({
            lat: [{ value: null, disabled: r }],
            lng: [{ value: null, disabled: r }],
          }),
        }),
        phone: [{ value: null, disabled: r }],
        website: [{ value: null, disabled: r }],
        company: this.fb.group({
          name: [{ value: null, disabled: r }],
          catchPhrase: [{ value: null, disabled: r }],
          bs: [{ value: null, disabled: r }],
        }),
      });
    });
    this.currentUser.subscribe((val) => {
      if (val) {
        this.form.patchValue(val);
      }
    });
  }
  onSubmit() {
    if (this.form.valid) {
      this._store.dispatch(new AddUser(this.form.value));
      this.router.navigateByUrl('/users');
    } else {
      alert('"Name" field is required');
    }
  }
  back() {
    this.router.navigateByUrl('users');
  }
  updateUser() {
    if (this.form.valid) {
      this._store.dispatch(new UpdateUser(this.form.value));
      this.router.navigateByUrl('/users');
    } else {
      alert('"Name" field is required');
    }
  }
}
