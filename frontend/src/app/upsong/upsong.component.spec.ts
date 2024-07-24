import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpsongComponent } from './upsong.component';

describe('UpsongComponent', () => {
  let component: UpsongComponent;
  let fixture: ComponentFixture<UpsongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpsongComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpsongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
