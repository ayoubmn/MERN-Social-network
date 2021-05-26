import React, { useState, useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import { login } from "../redux/actions/AuthAction"
import { useDispatch, useSelector } from "react-redux"
import ParticleBackground from "../ParticleBackground"
import logo from "./../../src/SN-logo.png";


const Login = () => {
  const initialState = { email: "", password: "" }
  const [userData, setUserData] = useState(initialState)
  const { email, password } = userData
  const [typePass, setTypePass] = useState(false)

  const dispatch = useDispatch()
  const { auth } = useSelector((state) => state)
  const history = useHistory()

  useEffect(() => {
    if (auth.token) history.push("/")
  }, [auth.token, history])

  const handleChangeInput = (e) => {
    const { name, value } = e.target
    setUserData({ ...userData, [name]: value })
  }
  const handleSubmit = e => {
    e.preventDefault()
/*     console.log(userData)
 */    dispatch(login(userData))
  }
  return (
    <div className="auth_page ">

      <div className="welcometonet">
        <div className="logow"><img
          className="logocatauth"
          src={logo}
          alt="logo"
        ></img>Garfieldo</div>
        <h1> Welcome to garfieldo</h1>
        <p className="w-50 p-3">  Garfieldo is network  where you can belong to a school club, a gaming group, or a worldwide art community. Where just you and a handful of friends can spend time together. A place that makes it easy to talk every day and hang out more often.
Tumblr is a place to express yourself, discover yourself, and bond over the stuff you love. It's where your interests connect you with your people.</p>
      </div>

      <ParticleBackground />
      <form onSubmit={handleSubmit}>
        <h3 className="text-uppercase text-center mb-4">Welcome back</h3>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Your email </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={handleChangeInput}
            value={email}
            name="email"
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Your password</label>
          <div className="pass">
            <input
              type={typePass ? "text" : "password"}
              className="form-control"
              id="exampleInputPassword1"
              onChange={handleChangeInput}
              value={password}
              name="password"
            />
            <small onClick={() => setTypePass(!typePass)}>
              {typePass ? "Hide" : "Show"}
            </small>
          </div>
        </div>
        {/*         <div  type="submit" className="wrap" disabled={email && password ? false : true}>
          <button class="button">Login</button>
        </div> */}

        {<button
          type="submit"
          className="btn btn-dark w-100"
          disabled={email && password ? false : true}
        >
          Login
        </button>}
        <p className="my-2">
          You don't have an account ?
          <Link to="/register" style={{ color: "crimson" }}>
            {" "}
            Register Now
          </Link>
        </p>
      </form>
    </div>
  )
}


export default Login
