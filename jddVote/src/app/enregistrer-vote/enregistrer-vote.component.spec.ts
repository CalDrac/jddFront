import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnregistrerVoteComponent } from './enregistrer-vote.component';

describe('EnregistrerVoteComponent', () => {
  let component: EnregistrerVoteComponent;
  let fixture: ComponentFixture<EnregistrerVoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnregistrerVoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnregistrerVoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
