import React, { useState } from 'react'
import axios from "axios"
export default function Home() {
    const [product, setproduct] = useState({
        Product_title: "",
        Product_desc: "",
        Product_price: ""
    })
    function getValue(e) {
        let productuser = { ...product }
        productuser[e.target.name] = e.target.value
        setproduct(productuser)
    }
    async function productadd(e) {
        e.preventDefault()
        if (localStorage.getItem("token")) {
            await axios.post('https://olex99.herokuapp.com/api/v1/product/addproduct', product, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            }).then((result) => {
                console.log(result)
            }).catch((error) => {
                console.log(error)

            })
            
        }
    }
    return (<>
        <form onSubmit={productadd} className='form-control'>
            <div className="mb-3">
                <label htmlFor="Product_title" className="form-label">Product_title</label>
                <input type="text" className="form-control" id="Product_title" name='Product_title' onBlur={getValue} />
            </div>
            <div className="mb-3">
                <label htmlFor="Product_desc" className="form-label">Product_desc</label>
                <input type="text" className="form-control" id="Product_desc" name='Product_desc' onBlur={getValue} />
            </div>
            <div className="mb-3">
                <label htmlFor="Product_price" className="form-label">Product_price</label>
                <input type="text" className="form-control" id="Product_price" name='Product_price' onBlur={getValue} />
            </div>
            <button className="btn btn-info">add</button>
        </form></>
    )
}
