import { Injectable } from '@angular/core';
import { ToastrService, IndividualConfig } from 'ngx-toastr';
import { BootstrapToast, BootstrapToastConfig } from './bootstrap.toast'

@Injectable()
export class MessageService {
  private messages: string[] = [];
  private readonly toastrDefaults = {
    timeOut: 5000,
    closeButton: true,
    enableHtml: true,
    tapToDismiss: false,
    titleClass: '',
    positionClass: 'toast-bottom-right',
    context: undefined,
    extendedTimeOut: 0
  } as BootstrapToastConfig;

  private toastrConfig = {
    disableTimeOut: false,
    closeButton: true,
    positionClass: 'toast-bottom-right',
    toastComponent: BootstrapToast
  };

  constructor(private toastr: ToastrService) {}

  public add(message: string): void {
    // this.messages.push(message);
    // this.toastr.success(message, 'Сообщение:', this.toastrConfig);
  }

  public addError(message: string): void {
    // this.toastr.error(message, 'Сообщение:', this.toastrConfig);
  }

  public clear(): void {
    this.messages = [];
  }
}
