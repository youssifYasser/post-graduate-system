import React from 'react'
import { Link, Switch } from 'react-router-dom';
import { Navbar, Nav, Container } from "react-bootstrap";

import './navbar-style.css'
import logo from './logo.png'

function navbar() {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav>
                        <Link to="/AddStudent" className="link"> تسجيل طالب</Link>
                        <Link to="/StudentData" className="link"> تسجيل بيانات الطالب</Link>
                    </Nav>
                </Navbar.Collapse>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Brand href="/">
                    <img
                        src={logo}
                        width="250"
                        className="d-inline-block align-top"
                        alt="logo"
                    />
                </Navbar.Brand>
            </Container>
        </Navbar>
    )
}

export default navbar;
