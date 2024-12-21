import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuRolComponent } from './menu-rol.component';

describe('MenuRolComponent', () => {
  let component: MenuRolComponent;
  let fixture: ComponentFixture<MenuRolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuRolComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MenuRolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
