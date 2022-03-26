import { Customer } from './customer.model';
import { DBBaseModel } from '../../../api/services/dynamodb.service'
import { CartQuery } from 'gql/types';
export class Order {
  public customer: Customer
  public items: CartQuery['cart']['cartItems']
  public total: number = 0
  public status?: string
  public id: string
  public number: string|number
  public date: string
  public shippingMethod: {value: string, fee: number}
  public paymentMethod: string
  constructor(order: Partial<Order>) {
    this.id = order.id || ''
    this.number = order.number || ''
    this.customer = new Customer({...order.customer}) || new Customer({})
    this.items = order.items || []
    this.total = order.total || 0
    this.status = order.status || 'init'
    this.date = order.date || new Date().toISOString().split('T')[0]
    this.shippingMethod = order.shippingMethod || {value: '', fee: 0}
    this.paymentMethod = order.paymentMethod || ''
  }
}