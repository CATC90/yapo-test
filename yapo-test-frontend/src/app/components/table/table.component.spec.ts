import { LayoutModule } from '@angular/cdk/layout';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { TableComponent } from './table.component';

describe('tableComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableComponent],
      imports: [
        MatCardModule,
        MatTableModule,
        MatDividerModule,
        LayoutModule,
        ReactiveFormsModule,
      ],
    }).compileComponents();
  });
  it('should create the component', () => {
    const fixture = TestBed.createComponent(TableComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
