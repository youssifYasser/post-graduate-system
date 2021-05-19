import React, { useState } from 'react'
import Swal from 'sweetalert2'
import 'animate.css/animate.min.css'
import axios from 'axios'

import AddSupervisorView from './addSupervisor-view'

const AddSupervisor = () => {
  const [validated, setValidated] = useState(false)
  const [supervisor, setSupervisor] = useState({
    arabicName: '',
    email: '',
    degree: '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setSupervisor({ ...supervisor, [name]: value })
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
      title: 'هل أنت متأكد من تسجيل المشرف ؟',
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
          title: 'تمت إضافة المشرف بنجاح',
          showConfirmButton: false,
          timer: 2000,
        })
        console.log(JSON.stringify(supervisor))

        // const options = {
        //   url: 'http://localhost:8000/api/addStudentData',
        //   method: 'post',
        //   data: JSON.stringify(supervisor),
        //   headers: {
        //     Accept: 'application/json',
        //     'Content-Type': 'application/json;charset=UTF-8',
        //   },
        // }
        // axios(options)
        //   .then((response) => {
        //     console.log(response)
        //   })
        //   .catch((err) => {
        //     console.log(err)
        //   })
        setValidated(false)
        setTimeout(() => {
          window.location.href =
            window.location.pathname +
            window.location.search +
            window.location.hash
        }, 2000)
      }
    })
  }
  return (
    <AddSupervisorView
      validated={validated}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  )
}

export default AddSupervisor
