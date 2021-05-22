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
              className='dropdown-item link'
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
              className='dropdown-item link'
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
              className='dropdown-item link'
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
              className='dropdown-item link'
            >
              {/* <NavDropdown.Item>
                <Link to='/addDepartment' className='dropdown-item link'>
                  إضافة قسم{' '}
                </Link>
              </NavDropdown.Item> */}
              <Link
                to='/SupervisorDataRegisteration'
                className='dropdown-item link'
              >
                {' '}
                تسجيل بيانات مشرف
              </Link>
              <Link to='/uploadExcel' className='dropdown-item link'>
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
              <NavDropdown.Item>
                <Link to='/UploadExcel' className='link'>
                  تسجيل محكم بالإكسل{' '}
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to='/RefManualReg' className='link'>
                  تسجيل محكم يدويا{' '}
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to='/Referees' className='link'>
                  عرض المحكمين{' '}
                </Link>
              </NavDropdown.Item>
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
