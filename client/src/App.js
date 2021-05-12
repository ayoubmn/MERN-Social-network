import {useEffect} from 'react'
import {BrowserRouter as Router , Route} from 'react-router-dom'
import PageRender from './customRouter/PageRender'
import PrivateRouter from './customRouter/PrivateRouter'

import Home from './pages/home'
import Login from './pages/login'
import Register from './pages/register'
import Alert from './components/alert/Alert'
import Header from './components/header/Header'
import StatusModal from './components/StatusModal'


import {refreshToken} from '../src/redux/actions/AuthAction'
import { getPosts } from './redux/actions/postAction'
import {useSelector,useDispatch} from 'react-redux'
function App() {
  const {auth, status, modal} = useSelector(state => state)
  const dispatch=useDispatch()

  useEffect(()=>{
    dispatch(refreshToken())
  },[dispatch])

  useEffect(()=>{
    if(auth.token)dispatch(getPosts(auth.token))
  },[dispatch, auth.token])

  return (
    <Router>
      <Alert/>
      <input type="checkbox" id="theme"/>
      <div className={`App ${(status || modal) && 'mode'}`}>
        <div className ="main"> 
          {auth.token && <Header />}
          {status && <StatusModal/>}
          <Route exact path="/" component={auth.token ? Home:Login}/>
          <Route exact path="/register" component={Register}/>


          <PrivateRouter exact path="/:page" component={PageRender}/>
          <PrivateRouter exact path="/:page/:id" component={PageRender}/>

        </div>
      </div>
    </Router>
  );
}

export default App;
