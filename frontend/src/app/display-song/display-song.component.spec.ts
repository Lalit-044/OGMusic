import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaySongComponent } from './display-song.component';

describe('DisplaySongComponent', () => {
  let component: DisplaySongComponent;
  let fixture: ComponentFixture<DisplaySongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplaySongComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DisplaySongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
