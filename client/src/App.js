import {useEffect} from 'react'
import {BrowserRouter as Router , Route} from 'react-router-dom'
import PageRender from './PageRender'
import Home from './pages/home'
import Login from './pages/login'
import Alert from './components/alert/Alert'
import Header from './components/Header'

import {refreshToken} from '../src/redux/actions/AuthAction'
import {useSelector,useDispatch} from 'react-redux'
function App() {
  const {auth} = useSelector(state => state)
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(refreshToken())
  },[dispatch])
  return (
    <Router>
      <Alert/>
      <input type="checkbox" id="theme"/>
      <div className="App">
        <div className ="main"> 
        {auth.token && <Header/>}
          <Route exact path="/" component={auth.token ? Home:Login}/>
          <Route exact path="/:page" component={PageRender}/>
          <Route exact path="/:page/:id" component={PageRender}/>

        </div>
      </div>
    </Router>
  );
}

export default App;
