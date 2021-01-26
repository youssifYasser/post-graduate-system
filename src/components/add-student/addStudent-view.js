import React from 'react';
import { Container, Form, Button } from "react-bootstrap";

import './addStudent-style.css'

function AddStudent(props) {
    const state = props;
    return (
        <Container className="addStudent mt-5 mb-5">
            <div className="header">
                <p className="text-center">اضافة طالب</p>
            </div>
            <div className="main">
                <Form className="text-right m-5 mb-2 form">

                    <Form.Group className="mb-5">
                        <Form.Label>الاسم بالعربية</Form.Label>
                        <Form.Control 
                            name = "nameInArabic"
                            placeholder = "الاسم بالعربية" 
                            value = {state.nameInArabic}
                            onChange = {state.handleChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-5">
                        <Form.Label>البريد الإلكتروني</Form.Label>
                        <Form.Control 
                            type="email" 
                            name="email"
                            placeholder="example@email.com"
                            value = {state.email}
                            onChange = {state.handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="exampleForm.SelectCustom" className="mb-5">
                        <Form.Label>اختر نوع الدراسة</Form.Label>
                        <Form.Control 
                            as="select" 
                            name="type"
                            value={state.type}
                            onChange={state.handleChange} 
                            custom
                        >
                            <option>اختر</option>
                            <option>دبلومة</option>
                            <option>تمهيدي</option>
                            <option>ماجستير</option>
                            <option>دكتوراه</option>
                        </Form.Control>
                    </Form.Group>

                    <div className="text-center">
                        <Button variant="dark" className="regBtn">تسجيل</Button>
                    </div>

                </Form>
            </div>
        </Container>
    )
}

export default AddStudent;
