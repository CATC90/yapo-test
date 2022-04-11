import { TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormInputComponent } from './input-form.component';

describe('formComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormInputComponent],
      imports: [
        MatInputModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
      ],
    }).compileComponents();
  });
  it('should create the component', () => {
    const fixture = TestBed.createComponent(FormInputComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should return object with the value of the input on changes`, () => {
    const fixture = TestBed.createComponent(FormInputComponent);
    const formComponent = fixture.componentInstance;

    spyOn(formComponent.onChange, 'emit');

    formComponent.ngOnInit();

    formComponent.task.setValue('to do testing');
    formComponent.task.updateValueAndValidity();

    expect(formComponent.onChange.emit).toHaveBeenCalledWith('to do testing');
  });
});
