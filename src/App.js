import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from './Components/home-page/homePage-container'
import Navbar from './Components/navbar/navbar-container'

// students
import AddStudent from './Components/add-student/addStudent-container'
import StudentData from './Components/student-data/Student-data-registration/StudentDataRegisteration'
import UploadStudentExcel from './Components/student-data/Student-data-registration/FileUpload'

// departments
import viewDepartments from './Components/view-departments/ViewDepartments'
import AddDepartment from './Components/add-department/addDepartment-container'

// study types
import StudyType from './Components/add-study-type/studyType-container'
import StudyTypes from './Components/view-study-types/study-types'

// supervisors
import AddSupervisor from './Components/add-supervisor/addSupervisor-container'
import SupervisorDataRegisteration from './Components/supervisor-data/supervisor-data-registration/supervisor-data-registeration'
import UploadSupervisorExcel from './Components/supervisor-data/supervisor-data-registration/upload-excel'
import ViewSupervisors from './Components/supervisor-data/view-supervisors/view-supervisors'

// Referees
import AddReferee from './Components/add-referee/addReferee-container'
import UploadRefExcel from './Components/referee-data/registeration/excel-upload'
import RefManualReg from './Components/referee-data/registeration/ref-manual-reg'
import Referees from './Components/referee-data/view/view-refs'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />

        {/* students */}
        <Route exact path='/addStudent' component={AddStudent} />
        <Route exact path='/StudentDataReg' component={StudentData} />
        <Route
          exact
          path='/UploadStudentExcel'
          component={UploadStudentExcel}
        />

        {/* study types */}
        <Route exact path='/addStudyType' component={StudyType} />
        <Route exact path='/viewStudyTypes' component={StudyTypes} />

        {/* departments */}
        <Route exact path='/addDepartment' component={AddDepartment} />
        <Route exact path='/viewDepartments' component={viewDepartments} />

        {/* Referees */}
        <Route exact path='/addReferee' component={AddReferee} />
        <Route exact path='/UploadRefExcel' component={UploadRefExcel} />
        <Route exact path='/RefManualReg' component={RefManualReg} />
        <Route exact path='/Referees' component={Referees} />

        {/* supervisors */}
        <Route exact path='/addSupervisor' component={AddSupervisor} />
        <Route
          exact
          path='/UploadSupervisorExcel'
          component={UploadSupervisorExcel}
        />
        <Route exact path='/viewSupervisors' component={ViewSupervisors} />
        <Route
          exact
          path='/SupervisorDataRegisteration'
          component={SupervisorDataRegisteration}
        />
      </Switch>
    </BrowserRouter>
  )
}

export default App
