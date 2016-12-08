/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TechTorquesComponent } from './tech-torques.component';

describe('TechTorquesComponent', () => {
  let component: TechTorquesComponent;
  let fixture: ComponentFixture<TechTorquesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechTorquesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechTorquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
