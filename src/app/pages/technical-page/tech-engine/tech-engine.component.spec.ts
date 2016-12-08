/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TechEngineComponent } from './tech-engine.component';

describe('TechEngineComponent', () => {
  let component: TechEngineComponent;
  let fixture: ComponentFixture<TechEngineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechEngineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechEngineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
