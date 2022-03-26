import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { FeedbackService } from '../../shared/feedback.service';
import { Subject, takeUntil } from 'rxjs';
import { MessageService } from '../../messages/message.service';
import { environment } from '../../../../src/environments/environment'
const staticAssetsUrl = environment.staticAssetsUrl

@Component({
  selector: 'tribes-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactsComponent implements OnInit, OnDestroy {
  public staticAssetsUrl = staticAssetsUrl
  private readonly unsubscribe$ = new Subject();
  feedbackForm!: FormGroup; // Declaring a variable of type FormGroup
  morefeedbacksControls!: FormArray;
  customerNameChanged: boolean = false;
  customerNameControl: any;

  constructor(
    private formBuilder: FormBuilder, 
    private feedbackService: FeedbackService,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef
  ) { 
    this.buildFeedbackForm();
  }

  ngOnInit() {}

  buildFeedbackForm() {
    // Building the Feedback Form Group
    this.feedbackForm = this.formBuilder.group({
      // customerName: new FormControl() // arguments: val, validator
      customerName: this.formBuilder.control(null, [Validators.required, Validators.minLength(6)]), // same as above but expects null by default
      contactPurpose: this.formBuilder.control(null),
      suggestions: this.formBuilder.control(null),
      customerEmail: this.formBuilder.control(null)
    })
    // Creating customer name control
    this.customerNameControl = this.feedbackForm.get('customerName');
  }
  clearForm() {
    /*this.feedbackForm.reset({
      customerName: 'Kiran Kumar Dash' // Default name on clearing out form
    });*/
    this.feedbackForm.reset(); // Resets the formgroup
  }

  submitFeedbackForm() {
    this.feedbackService.sendFeedback(
      this.feedbackForm.value.customerName, 
      this.feedbackForm.value.contactPurpose, 
      this.feedbackForm.value.suggestions, 
      this.feedbackForm.value.customerEmail)
      .pipe(
        takeUntil(this.unsubscribe$),
      ).subscribe(data => {
        this.messageService.add('Благодарим. Ваше сообщение отправлено');
        this.feedbackForm.reset();
        this.cdr.markForCheck()
      })
  }
  ngOnDestroy() {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }
}
