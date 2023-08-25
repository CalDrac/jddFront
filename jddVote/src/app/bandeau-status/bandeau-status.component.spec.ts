import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BandeauStatusComponent } from './bandeau-status.component';

describe('BandeauStatusComponent', () => {
  let component: BandeauStatusComponent;
  let fixture: ComponentFixture<BandeauStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BandeauStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BandeauStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
