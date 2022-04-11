import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss'],
})
export class FormInputComponent implements OnDestroy, OnInit {
  @Output() onChange = new EventEmitter<string>();

  public task!: FormControl;
  @Input()
  public placeholder: string = '';

  private unsubscribe = new Subject<void>();

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  ngOnInit() {
    this.task = new FormControl();
    this.task.valueChanges
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((value) => this.onChange.emit(value));
  }
}
