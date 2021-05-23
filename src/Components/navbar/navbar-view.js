import React from 'react'
import { Link, Switch } from 'react-router-dom'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'

import './navbar-style.css'
import logo from './logo.png'

function navbar() {
  return (
    <Navbar collapseOnSelect expand='lg' bg='dark' variant='dark'>
      <Container>
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav>
            <NavDropdown
              title='الطلاب'
              id='basic-nav-dropdown'
              className='link'
            >
              <Link to='/AddStudent' className='dropdown-item link'>
                إضافة طالب جديد{' '}
              </Link>

              <Link to='/StudentDataExcelReg' className='dropdown-item link'>
                تسجيل بيانات الطالب{' '}
              </Link>
            </NavDropdown>

            <NavDropdown
              title='الدراسات'
              id='basic-nav-dropdown'
              className='link'
            >
              <Link to='/addStudyType' className='dropdown-item link'>
                إضافة دراسة{' '}
              </Link>
              <Link to='/viewStudyTypes' className='dropdown-item link'>
                {' '}
                الدراسات العليا بجامعة عين شمس
              </Link>
            </NavDropdown>
            <NavDropdown
              title='الأقسام'
              id='basic-nav-dropdown'
              className='link'
            >
              <Link to='/addDepartment' className='dropdown-item link'>
                إضافة قسم{' '}
              </Link>
              <Link to='/viewDepartments' className='dropdown-item link'>
                {' '}
                عرض الأقسام
              </Link>
            </NavDropdown>

            <NavDropdown
              title='المشرفين'
              id='basic-nav-dropdown'
              className='link'
            >
              
                <Link to='/addSupervisor' className='dropdown-item link'>
                  إضافة مشرف{' '}
                </Link>
            
              <Link
                to='/SupervisorDataRegisteration'
                className='dropdown-item link'
              >
                {' '}
                تسجيل بيانات مشرف
              </Link>
              <Link to='/UploadSupervisorExcel' className='dropdown-item link'>
                {' '}
                تسجيل بيانات مشرف بالإكسل
              </Link>
              <Link to='/viewSupervisors' className='dropdown-item link'>
                {' '}
                عرض المشرفين
              </Link>
            </NavDropdown>
            <NavDropdown
              title='المحكمين'
              id='basic-nav-dropdown'
              className='link'
            >
                
                <Link to='/addReferee' className='dropdown-item link'>
                  إضافة مشرف{' '}
                </Link>
              
                <Link to='/UploadRefExcel' className='dropdown-item link'>
                  تسجيل محكم بالإكسل{' '}
                </Link>
            
              
                <Link to='/RefManualReg' className='dropdown-item link'>
                  تسجيل محكم يدويا{' '}
                </Link>
            
              
                <Link to='/Referees' className='dropdown-item link'>
                  عرض المحكمين{' '}
                </Link>
            
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>

        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Link to='/'>
          <Navbar.Brand>
            <img
              src={logo}
              width='250'
              className='d-inline-block align-top'
              alt='logo'
            />
          </Navbar.Brand>
        </Link>
      </Container>
    </Navbar>
  )
}

export default navbar
