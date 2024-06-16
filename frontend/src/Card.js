import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatchCart, useCart } from './ContextReducer'

export default function Card(props) {
  let data = useCart();

  let navigate = useNavigate()
  const [qty, setQty] = useState(1)
  const [size, setSize] = useState("")
  const priceRef = useRef();
  let options = props.options;
  let priceOptions = Object.keys(options);
  let foodItem = props.item;
  const dispatch = useDispatchCart();
  
  const handleQty = (e) => {
    setQty(e.target.value);
  }
  
  const handleOptions = (e) => {
    setSize(e.target.value);
  }
  
  const handleAddToCart = async () => {
    let food = null;
    for (const item of data) {
      if (item.id === foodItem._id && item.size === size) {
        food = item;
        break;
      }
    }
    
    if (food) {
      await dispatch({ type: "UPDATE", id: foodItem._id, size: size, qty: parseInt(food.qty) + parseInt(qty) })
    } else {
      await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: parseInt(options[size]), qty: qty, size: size, img: props.ImgSrc })
    }
  }
  
  const handleRemoveFromCart = async () => {
    await dispatch({ type: "REMOVE", id: foodItem._id, size: size })
  }

  useEffect(() => {
    setSize(priceRef.current.value)
  }, [])

  let finalPrice = qty * parseInt(options[size]);
  return (
    <div>
      <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
        <img src={props.ImgSrc} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} />
        <div className="card-body">
          <h5 className="card-title">{props.foodName}</h5>
          <div className='container w-100 p-0' style={{ height: "38px" }}>
            <select className="m-2 h-100 w-20 bg-success text-black rounded" style={{ select: "#FF0000" }} onChange={handleQty}>
              {Array.from(Array(6), (e, i) => {
                return (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>)
              })}
            </select>
            <select className="m-2 h-100 w-20 bg-success text-black rounded" style={{ select: "#FF0000" }} ref={priceRef} onChange={handleOptions}>
              {priceOptions.map((i) => {
                return <option key={i} value={i}>{i}</option>
              })}
            </select>
            <div className=' d-inline ms-2 h-100 w-20 fs-5' >
              ₹{finalPrice}/-
            </div>
          </div>
          <hr></hr>
          <div className="d-flex justify-content-center">
            <button className="btn btn-success me-1" style={{ fontSize: "0.9rem" }} onClick={handleAddToCart}>Add to Cart</button>
            <button className="btn btn-danger ms-1" style={{ fontSize: "0.9rem" }} onClick={handleRemoveFromCart}>Remove from Cart</button>
          </div>
        </div>
      </div>
    </div>
  )
}
