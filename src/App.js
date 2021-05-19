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
import RefExcelReg from './Components/referee-data/registeration/ref-excel-reg'
import RefManualReg from './Components/referee-data/registeration/ref-manual-reg'
import Referees from './Components/referee-data/view/view-refs'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/addStudent' component={AddStudent} />
        <Route exact path='/StudentDataExcelReg' component={StudentData} />
        <Route exact path='/addStudyType' component={StudyType} />
        <Route exact path='/viewStudyTypes' component={StudyTypes} />
        <Route exact path='/addDepartment' component={AddDepartment} />
        <Route exact path='/viewDepartments' component={viewDepartments} />
        <Route exact path='/RefExcelReg' component={RefExcelReg} />
        <Route exact path='/RefManualReg' component={RefManualReg} />
        <Route exact path='/Referees' component={Referees} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
