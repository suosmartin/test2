import {
  ComponentFixture,
  TestBed,
  async,
  inject,
} from '@angular/core/testing';

import { UserEditorComponent } from './user-editor.component';
import { UsersService } from '../users.service';
import { FormBuilder } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from '../reducer/users.effects';
import * as users from './../reducer/users.reducer';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('UserEditorComponent', () => {
  let component: UserEditorComponent;
  let fixture: ComponentFixture<UserEditorComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [UserEditorComponent],
      imports: [
        StoreModule.forRoot({ users: users.reducer }),
        EffectsModule.forRoot([UserEffects]),
        RouterTestingModule,
      ],
      providers: [
        UsersService,
        FormBuilder,
        UserEffects,
        HttpClient,
        HttpHandler,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // For this test only the name field is required
  it('is invalid form valid', () => {
    let username = component.form.controls['username'];
    username.setValue('someone');
    expect(component.form.valid).toBeFalsy();
    expect(component.form.controls['name'].valid).toBeFalsy();
  });
  // For this test only the name field is required
  it('is form valid', () => {
    let username = component.form.controls['name'];
    username.setValue('someone');
    expect(component.form.controls['name'].valid).toBeTruthy();
    expect(component.form.valid).toBeTruthy();
  });
});
