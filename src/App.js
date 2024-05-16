import {Route, Switch} from 'react-router-dom'

import './App.css'

import Home from './Home'

import CourseDetail from './courseDetailData'

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/courses/:id" component={CourseDetail} />
  </Switch>
)

export default App
