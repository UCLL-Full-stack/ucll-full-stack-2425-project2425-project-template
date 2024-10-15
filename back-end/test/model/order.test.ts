import { Order } from "../../model/order"
import { set } from 'date-fns';
const date = set(new Date(),{hours:15,minutes:30,seconds:20,milliseconds:200})
const cartId = 2 //Q&since cartId can be optional and undefined, do we use it create tests?
test("given: valid order input, when: placing an order, then: an order is created",()=>{
     const order = new Order({date,cartId})
     expect(order.getDate()).toEqual(date)//use toEqual for date validation
     expect(order.getCartId()).toBe(cartId)
})