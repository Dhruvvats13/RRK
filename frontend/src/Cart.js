import React from 'react'
import Delete from '@material-ui/icons/Delete'
import { useCart, useDispatchCart } from './ContextReducer'
import { useNavigate } from 'react-router-dom'

export default function Cart() {
  let data = useCart()
  let dispatch = useDispatchCart()
  const navigate = useNavigate()

  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
      </div>
    )
  }

  const handleCheckOut = async () => {
    let userEmail = localStorage.getItem("userEmail");
    let response = await fetch("http://localhost:3001/api/auth/orderData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString()
      })
    });
    if (response.status === 200) {
      dispatch({ type: "DROP" })
      navigate('/payment')
    }
  }

  let totalPrice = data.reduce((total, food) => total + food.price, 0)

  return (
    <div>
      <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
        <table className='table '>
          <thead className=' text-light fs-4'>
            <tr >
              <th scope='col' >#</th>
              <th scope='col' >Name</th>
              <th scope='col' >Quantity</th>
              <th scope='col' >Option</th>
              <th scope='col' >Amount</th>
              <th scope='col' ></th>
            </tr>
          </thead>
          <tbody className=' text-light fs-4'>
            {data.map((food, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button type="button" className="btn text-light p-0">
                    <Delete onClick={() => dispatch({ type: "REMOVE", index: index })} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div><h1 className=' text-light fs-2'>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn bg-light mt-5' onClick={handleCheckOut}>
            Check Out
          </button>
        </div>
      </div>
    </div>
  )
}
