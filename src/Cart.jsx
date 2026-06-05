import React from 'react'

function Cart({productname,productimage}) {
  return (
    <div>
        <div className="card">
            <img src={productimage} alt="" />
            <h1>product={productname}</h1>
        </div>
    </div>
  )
}

export default Cart