import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrajetPersoComponent } from './trajet-perso.component';

describe('TrajetPersoComponent', () => {
  let component: TrajetPersoComponent;
  let fixture: ComponentFixture<TrajetPersoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrajetPersoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrajetPersoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
