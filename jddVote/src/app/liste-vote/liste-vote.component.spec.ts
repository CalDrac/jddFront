import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeVoteComponent } from './liste-vote.component';

describe('ListeVoteComponent', () => {
  let component: ListeVoteComponent;
  let fixture: ComponentFixture<ListeVoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeVoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeVoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
