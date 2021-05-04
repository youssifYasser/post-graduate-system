import React, { useState } from 'react'
import Swal from 'sweetalert2'
import 'animate.css/animate.min.css'
import axios from 'axios'

import StudyTypeView from './studyType-view'

const StudyType = () => {
  const [validated, setValidated] = useState(false)
  const [study, setStudy] = useState({
    arabicName: '',
    englishName: '',
    academicCode: '',
    study_type: '',
    department: '',
    courses: [],
  })

  const [coursesCount, setCoursesCount] = useState(0)

  const handleChange = (event) => {
    const { name, value } = event.target
    setStudy({ ...study, [name]: value })
  }
  //COMP21022
  const handleChange2 = (event) => {
    let { name, value } = event.target

    let indexOfDash = name.lastIndexOf('-')
    let index = name.slice(indexOfDash + 1)
    name = name.slice(0, indexOfDash)
    console.log('name: ', name)
    console.log('index: ', index)
    study.courses[index] = {
      ...study.courses[index],
      [name]: value,
    }
    setStudy({ ...study, courses: study.courses })
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

  const handleDelete = (id) => {
    const newCourses = study.courses.filter((course) => {
      return course.id !== id
    })
    setStudy({
      ...study,
      courses: newCourses,
    })
  }
  const addCourse = () => {
    {
      setCoursesCount(coursesCount + 1)
      study.courses.push({ id: coursesCount })
      setStudy(study)
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
          timer: 2000,
        })
        console.log(JSON.stringify(study))

        const options = {
          url: 'http://localhost:8000/api/addStudentData',
          method: 'post',
          data: JSON.stringify(study),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
          },
        }
        axios(options)
          .then((response) => {
            console.log(response)
          })
          .catch((err) => {
            console.log(err)
          })

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
    <StudyTypeView
      validated={validated}
      handleChange={handleChange}
      handleChange2={handleChange2}
      handleSubmit={handleSubmit}
      handleDelete={handleDelete}
      addCourse={addCourse}
      study={study}
    />
  )
}

export default StudyType
