import React, { useState } from 'react';

import AddStudentView from './addStudent-view';

const AddStudent = () => {
    const [validated, setValidated] = useState(false)
    const [student, setStudent] = useState({
        nameInArabic: '',
        email: '',
        type: ''
    })

    const handleChange = (event) => {
        const { name, value } = event.target;
        setStudent({ ...student, [name]: value });
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        const form = event.currentTarget

        if (form.checkValidity() === false) {
            setValidated(true)
            event.stopPropagation()
        } else {
            console.log(JSON.stringify(student))
        }
    }

    return (
        <AddStudentView
            validated = {validated}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
        />
    )

}

export default AddStudent;
