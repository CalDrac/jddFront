import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAskToGoAdminPlacesComponent } from './dialog-ask-to-go-admin-places.component';

describe('DialogAskToGoAdminPlacesComponent', () => {
  let component: DialogAskToGoAdminPlacesComponent;
  let fixture: ComponentFixture<DialogAskToGoAdminPlacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAskToGoAdminPlacesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAskToGoAdminPlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
