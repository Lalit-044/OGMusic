import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SondaddComponent } from './sondadd.component';

describe('SondaddComponent', () => {
  let component: SondaddComponent;
  let fixture: ComponentFixture<SondaddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SondaddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SondaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
