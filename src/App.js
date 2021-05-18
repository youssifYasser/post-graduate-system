import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from './Components/home-page/homePage-container'
import Navbar from './Components/navbar/navbar-container'
import AddStudent from './Components/add-student/addStudent-container'
import StudentData from './Components/Student-data-registration/StudentDataRegisteration'
import StudyTypes from './Components/view-study-types/study-types'
import viewDepartments from './Components/view-departments/ViewDepartments'
import AddDepartment from './Components/add-department/addDepartment-container'
import StudyType from './Components/add-study-type/studyType-container'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/AddStudent' component={AddStudent} />
        <Route exact path='/StudentData' component={StudentData} />
        <Route exact path='/StudyTypes' component={StudyTypes} />
        <Route exact path='/viewDepartments' component={viewDepartments} />
        <Route exact path='/AddDepartment' component={AddDepartment}/>
        <Route exact path='/StudyType' component={StudyType}/>
      </Switch>
    </BrowserRouter>
  )
}

export default App
