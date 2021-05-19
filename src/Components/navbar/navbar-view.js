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
              <NavDropdown.Item>
                <Link to='/AddStudent' className='link'>
                  إضافة طالب جديد{' '}
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to='/StudentDataExcelReg' className='link'>
                  تسجيل بيانات الطالب{' '}
                </Link>
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown
              title='الدراسات'
              id='basic-nav-dropdown'
              className='link'
            >
              <NavDropdown.Item to='/StudentData'>
                <Link to='/addStudyType' className='link'>
                  إضافة دراسة{' '}
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to='/viewStudyTypes' className='link'>
                  {' '}
                  الدراسات العليا بجامعة عين شمس
                </Link>
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title='الأقسام'
              id='basic-nav-dropdown'
              className='link'
            >
              <NavDropdown.Item>
                <Link to='/addDepartment' className='link'>
                  إضافة قسم{' '}
                </Link>
              </NavDropdown.Item>
              <NavDropdown.Item to='/StudentData'>
                <Link to='/viewDepartments' className='link'>
                  {' '}
                  عرض الأقسام
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
