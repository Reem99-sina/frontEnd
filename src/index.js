import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom'

// const productModel = require("./DB/models/porduct.model")
// import io from '../../clone exam/exam/app'
// let cartoona = ''
// const clintIo = io("https://olex99.herokuapp.com/")
// clintIo.emit("updateSocketId", "62c49b21fb6c2f78ca41cac8")
// clintIo.emit("destination", { deskId: "DuRHHCnFyZHbZUscAAAJ" })
// clintIo.on("reply", (data) => {
//   console.log(data)
//   display(data)
//   displayProduct()
// })
// function display(data) {
//   for (let i = 0; i < data.length; i++) {
//     console.log(typeof data)
//     const { Product_title, Product_desc, Product_price } = data[i]
//     console.log(Product_title, Product_price, Product_desc)
//     cartoona += `<div class="card" style="width: 18rem;">
//     <div class="card-body">
//       <h5 class="card-title">${Product_title}</h5>
//       <h6 class="card-subtitle mb-2 text-muted">${Product_desc}</h6>
//       <p class="card-text">${Product_price}</p>
//       <a href="#" class="card-link">Card link</a>
//       <a href="#" class="card-link">Another link</a>
//     </div>
//   </div>`
//   }
//   console.log(cartoona)
//   $("#Products").html(cartoona)
// }
// async function displayProduct() {
//   const products = await productModel.find({})
//   display(products)
// }

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
