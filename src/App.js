import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from './Components/home-page/homePage-container'
import Navbar from './Components/navbar/navbar-container'
import AddStudent from './Components/add-student/addStudent-container'
import StudentData from './Components/Student-data-registration/StudentDataRegisteration'
import StudyTypes from './Components/view-study-types/study-types'

const App = () => {
  return (
    // <BrowserRouter>
    //   <Navbar />
    //   <Switch>
    //     <Route exact path='/' component={Home} />
    //     <Route exact path='/AddStudent' component={AddStudent} />
    //     <Route exact path='/StudentData' component={StudentData} />
    //   </Switch>
    // </BrowserRouter>
    <StudyTypes />
  )
}

export default App
