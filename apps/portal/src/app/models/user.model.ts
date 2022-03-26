import { Order } from './order.model';

export interface Roles {
  admin: boolean;
}

export class User {
  public email: string;
  public photoURL?: string;
  public roles?: Roles;
  public firstName?: string;
  public lastName?: string;
  public patronymic?: string
  public password?: string;
  public orders?: object;
  public confirmPassword?: string;
  public uid?: string;

  constructor(authData: any) {
    this.email = authData.email;
    this.firstName = authData.firstName || '';
    this.lastName = authData.lastName || '';
    this.patronymic = authData.patronymic || ''
    this.roles = {
      admin: false
    };
  }
}
