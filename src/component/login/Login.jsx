import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Joi from "joi"
import axios from 'axios'

export default function Login() {
    const [user, setuser] = useState({
        Email: "",
        Password: ""
    })
    let navigate = useNavigate()
    const [error, seterror] = useState("")
    const [errorlist, seterrorlist] = useState([])

    function getValue(e) {
        console.log(e.target)
        let myUser = { ...user }
        myUser[e.target.name] = e.target.value
        setuser(myUser)
    }
    async function loginuser(e) {
        e.preventDefault()
        let result = signinvalidation()
        console.log(result)
        if (result.error) {
            seterrorlist(result.error.details)
        } else {
            await axios.post('https://olex99.herokuapp.com/api/v1/user/signin', user).then((result) => {
                localStorage.setItem("token", result.data.token)
                navigate("/home")
            }).catch((error) => {
                seterror(error.message)
                console.log(error)
            })
        }
    }
    function signinvalidation() {
        let schema = Joi.object({
            Email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
            Password: Joi.string().required().pattern(new RegExp(/^[a-z]{3,5}$/)),
        })
        return schema.validate(user, { abortEarly: false })
    }

    return (<>
        {errorlist.length ?
            errorlist.map((error, index) => {
                return <div key={index} className='alert alert-danger'>{error.message}</div>

            }) : ""
        }
        {error ? <div className='alert alert-danger'>{error}</div> : ""}

        <form onSubmit={loginuser} className='form-control'>
            <div className="mb-3">
                <label htmlFor="Email" className="form-label">Email</label>
                <input type="email" className="form-control" id="Email" name='Email' onBlur={getValue} />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">password</label>
                <input type="password" className="form-control" id="password" name='Password' onBlur={getValue} />
            </div>

            <button className="btn btn-info">submit</button>
        </form>
    </>
    )
}
