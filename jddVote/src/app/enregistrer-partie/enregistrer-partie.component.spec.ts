import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnregistrerPartieComponent } from './enregistrer-partie.component';

describe('EnregistrerPartieComponent', () => {
  let component: EnregistrerPartieComponent;
  let fixture: ComponentFixture<EnregistrerPartieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnregistrerPartieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnregistrerPartieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
