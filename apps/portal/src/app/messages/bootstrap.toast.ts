import { Component } from '@angular/core';
import { GlobalConfig, Toast, ToastPackage, ToastrService } from 'ngx-toastr';

@Component({
  selector: '[bootstrap-toast-component]',
  template: `
    <div
      class="toast {{ containerClass }} show"
      role="alert"
      [style.display]="state.value === 'inactive' ? 'none' : ''"
    >
      <div class="toast-header" *ngIf="title">
        {{ title }}
        <button
          type="button"
          class="btn-close"
          aria-label="Close"
          *ngIf="options.closeButton"
          (click)="remove()"
        ></button>
      </div>
      <div class="d-flex" *ngIf="!title">
        <div class="toast-body">
          {{ message }}
        </div>
        <button
          type="button"
          class="btn-close btn-close-white me-2 m-auto"
          data-bs-dismiss="toast"
          aria-label="Close"
          *ngIf="options.closeButton"
          (click)="remove()"
        ></button>
      </div>
      <div class="toast-body" *ngIf="title">
        {{ message }}
        <div class="mt-2 pt-2 border-top" *ngIf="options.buttons.length !== 0">
          <button
            *ngFor="let btn of options.buttons"
            type="button"
            class="{{ btn.style }}"
            (click)="handleClick($event, btn.id)"
          >
            {{ btn.text }}
          </button>
        </div>
      </div>
    </div>
  `,
  preserveWhitespaces: false,
})
export class BootstrapToast extends Toast {
  override options!: BootstrapToastConfig;
  containerClass = '';

  constructor(
    override toastrService: ToastrService,
    override toastPackage: ToastPackage
  ) {
    super(toastrService, toastPackage);
    if (this.options.context) {
      this.toastClasses = ``;
      this.containerClass = `toast align-items-center text-white bg-${this.options.context} border-0`;
    }
  }

  handleClick(event: Event, id: string) {
    event.stopPropagation();
    this.toastPackage.triggerAction(id);
    return false;
  }
}

export interface BootstrapToastConfig extends GlobalConfig {
  context: any;
  buttons: {
    style: string;
    text: string;
    id: string;
  }[];
}