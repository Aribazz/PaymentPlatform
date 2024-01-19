import React, { useState } from 'react'
import CartItem from './CartItem'
import { useGlobalContext } from './context'
import { usePaystackPayment } from 'react-paystack';

const CartContainer = () => {
  const [email, setEmail] = useState("ariyoaribass68@gmail.com");
  const[amount, setAmount]=useState(10000);
  const config = {
    reference: (new Date()).getTime().toString(),
    email: email,
    amount: amount * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: 'pk_test_ff29a4071c6c8da0ad7cb03e0f001b5b79d6d288',
};
const onSuccess = (reference) => {
  // Implementation for whatever you want to do with reference and after success call.
  console.log(reference);
  alert("payment Successful");
};
const onClose = () => {
  // implementation for  whatever you want to do when the Paystack dialog closed.
  console.log('closed');
  alert("Payment Closed");
}
const initalizePayment = usePaystackPayment(config)
function handlePayment (){
  initalizePayment(onSuccess,onClose);
}

  const { cart, total, clearCart } = useGlobalContext()
  if (cart.length === 0) {
    return (
      <section className='cart'>
        {/* cart header */}
        <header>
          <h2>your bag</h2>
          <h4 className='empty-cart'>is currently empty</h4>
        </header>
      </section>
    )
  }
  return (
    <section className='cart'>
      {/* cart header */}
      <header>
        <h2>your bag</h2>
      </header>
      {/* cart items */}
      <div>
        {cart.map((item) => {
          return <CartItem key={item.id} {...item} />
        })}
      </div>
      {/* cart footer */}
      <footer>
        <hr />
        <div className='cart-total'>
          <h4>
            total <span>${total}</span>
          </h4>
        </div>
        <button className='btn clear-btn' onClick={handlePayment}      >
          clear cart
        </button>
      </footer>
    </section>
  )
}

export default CartContainer
