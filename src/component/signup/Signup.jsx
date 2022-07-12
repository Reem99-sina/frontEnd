import React, { useState } from 'react'
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Joi from 'joi'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export default function Signup() {
    let navigate = useNavigate()
    const [users, setusers] = useState({
        firstName: '',
        lastName: '',
        Email: '',
        Password: "",
        role: "user"
    })
    const [error, seterror] = useState("")
    const [errorsignup, seterrorsignup] = useState([])
    async function submitEvent(e) {
        e.preventDefault()
        let result = signupvalidation()
        console.log(result)
        if (result.error) {
            seterrorsignup(result.error.details)
        } else {
            seterrorsignup([])

            await axios.post('https://olex99.herokuapp.com/api/v1/user/signup', users).then((result) => {
                navigate('/login')
                console.log(result)
            }).catch((error) => {
                console.log(error)
                seterror(error.message)
            })
        }
    };
    function getValue(e) {
        console.log(e.target)
        let myUser = { ...users }
        myUser[e.target.name] = e.target.value
        setusers(myUser)
    }
    function signupvalidation() {
        let schema = Joi.object({
            firstName: Joi.string().required().pattern(new RegExp(/[a-z]{1,5}$/)),
            lastName: Joi.string().required().pattern(new RegExp(/[a-z]{1,5}$/)),
            Email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
            Password: Joi.string().required().pattern(new RegExp(/^[a-z]{3,5}$/)),
            cPassword: Joi.string().valid(Joi.ref("Password")).required(),
            role: Joi.string()
        })
        return schema.validate(users, { abortEarly: false })
    }

    return (<>
        {errorsignup.length ?
            errorsignup.map((error, index) => {
                if (index == 4) {
                    return <div key={index} className='alert alert-danger'>password invalid</div>
                } else {
                    return <div key={index} className='alert alert-danger'>{error.message}</div>
                }
            }) : ""
        }
        {error ? <div className='alert alert-danger'>{error}</div> : ""}
        <form onSubmit={submitEvent} className='form-control'>
            <div className="mb-3">
                <label htmlFor="first_name" className="form-label" >first Name</label>
                <input type="text" className="form-control" id="first_name" onBlur={getValue} name='firstName' />
            </div>
            <div className="mb-3">
                <label htmlFor="last_name" className="form-label" >last name</label>
                <input type="text" className="form-control" id="last_name" name='lastName' onBlur={getValue} />
            </div>
            <div className="mb-3">
                <label htmlFor="Email" className="form-label">Email</label>
                <input type="email" className="form-control" id="Email" name='Email' onBlur={getValue} />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">password</label>
                <input type="password" className="form-control" id="password" name='Password' onBlur={getValue} />
            </div>
            <div className="mb-3">
                <label htmlFor="cpassword" className="form-label">cpassword</label>
                <input type="password" className="form-control" id="cpassword" name='cPassword' onBlur={getValue} />
            </div>
            <div className="mb-3">
                <label htmlFor="role" className="form-label">role</label>
                <select name="role" id="role" defaultValue={"user"} onBlur={getValue} className="form-control">
                    <option value="admin">admin</option>
                    <option value="user">user</option>

                </select>

            </div>
            <button className="btn btn-info">submit</button>
        </form>
    </>
    )
}

