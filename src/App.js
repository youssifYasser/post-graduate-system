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
import AddSupervisor from './Components/add-supervisor/addSupervisor-container'
import AddReferee from './Components/add-referee/addReferee-container'
import UploadRefExcel from './Components/referee-data/registeration/excel-upload'
import RefManualReg from './Components/referee-data/registeration/ref-manual-reg'
import Referees from './Components/referee-data/view/view-refs'
import SupervisorDataRegisteration from './Components/supervisor-data-registration/supervisor-data-registeration'
import UploadSupervisorExcel from './Components/supervisor-data-registration/upload-excel'
import ViewSupervisors from './Components/view-supervisors/view-supervisors'
import Footer from './Components/footer/footer-view'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/addStudent' component={AddStudent} />
        <Route exact path='/studentDataExcelReg' component={StudentData} />
        <Route exact path='/addStudyType' component={StudyType} />
        <Route exact path='/viewStudyTypes' component={StudyTypes} />
        <Route exact path='/addDepartment' component={AddDepartment} />
        <Route exact path='/viewDepartments' component={viewDepartments} />
        <Route exact path='/addSupervisor' component={AddSupervisor} />
        <Route exact path='/addReferee' component={AddReferee} />
        <Route exact path='/UploadRefExcel' component={UploadRefExcel} />
        <Route exact path='/RefManualReg' component={RefManualReg} />
        <Route exact path='/Referees' component={Referees} />
        <Route exact path='/UploadSupervisorExcel' component={UploadSupervisorExcel} />
        <Route exact path='/viewSupervisors' component={ViewSupervisors} />
        <Route
          exact
          path='/SupervisorDataRegisteration'
          component={SupervisorDataRegisteration}
          
        />
      </Switch>
      <Footer />
    </BrowserRouter>
  )
}

export default App
