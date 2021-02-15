import React, { useState } from 'react';
import Swal from 'sweetalert2'
import 'animate.css/animate.min.css'

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
            swalReg()
        }
    }

    const swalReg = () => {
        Swal.fire({
            icon: 'info',
            title: 'هل أنت متأكد من تسجيل الطالب ؟',
            showCancelButton: true,
            showConfirmButton: true,
            confirmButtonColor: '#01ad01',
            confirmButtonText: 'نعم ، سجل',
            cancelButtonText: 'لا ، عودة',
            cancelButtonColor: '#2f3944',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    icon: 'success',
                    title: 'تمت إضافة الطالب بنجاح',
                    showConfirmButton: false,
                    timer: 2000
                })
                console.log(JSON.stringify(student))
                setTimeout(() => {
                    window.location.href = window.location.pathname + window.location.search + window.location.hash;
                }, 2000);
            }
        })
    }
    return (
        <AddStudentView
            validated={validated}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
        />
    )

}

export default AddStudent;
