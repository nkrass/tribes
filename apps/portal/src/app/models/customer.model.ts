export class Customer {
  public firstname: string
  public lastname: string
  public patronymic: string
  public address1: string
  public address2: string
  public zip: string
  public city: string
  public email: string
  public phone: string
  public company: string
  public country: string

  constructor(customer: Partial<Customer>) {
    this.firstname = customer.firstname || ''
    this.lastname = customer.lastname || ''
    this.patronymic = customer.patronymic || ''
    this.address1 = customer.address1 || ''
    this.address2 = customer.address2 || ''
    this.zip = customer.zip || ''
    this.city = customer.city || ''
    this.email = customer.email || ''
    this.phone = customer.phone?.replace( /^\D+/g, '') || ''
    this.company = customer.company || ''
    this.country = customer.country || ''
  }
  static FromCustomerForm(customer_form: Partial<Customer>){
    const customer = new Customer({})
    customer.firstname = customer_form.firstname || ''
    customer.lastname = customer_form.lastname || ''
    customer.patronymic = customer_form.patronymic || ''
    customer.address1 = customer_form.address1 || ''
    customer.address2 = customer_form.address2 || ''
    customer.zip = customer_form.zip || ''
    customer.city = customer_form.city || ''
    customer.email = customer_form.email || ''
    customer.phone = customer_form.phone? (customer_form.phone as any).e164Number.replace( /^\D+/g, '') : '';
    customer.company = customer_form.company || ''
    customer.country = customer_form.country || ''
    return customer;
  }
}
