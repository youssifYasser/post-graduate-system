import React, { useState, useEffect } from 'react'
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
    studyType: '',
    department: '',
    courses: [],
  })

  const [coursesCount, setCoursesCount] = useState(0)
  const [departments, setDepartments] = useState([])

  const handleChange = (event) => {
    const { name, value } = event.target
    setStudy({ ...study, [name]: value })
  }

  const handleChange2 = (event) => {
    let { name, value } = event.target

    let indexOfDash = name.lastIndexOf('-')
    let index = name.slice(indexOfDash + 1)
    name = name.slice(0, indexOfDash)
    if (name === 'maxDegreeOfCourse') {
      let creditHours = value / 50
      study.courses[index] = {
        ...study.courses[index],
        ['creditHours']: creditHours,
      }
      setStudy({ ...study, courses: study.courses })
    }
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
          url: 'http://localhost:8000/api/addstudytypeandcourse',
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
      // setStudy(study)
    }
  }

  useEffect(() => {
    const departmentsAPI = {
      url: 'http://localhost:8000/api/departments',
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
    }
    axios(departmentsAPI)
      .then((response) => {
        setDepartments([...response.data])
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  return (
    <StudyTypeView
      validated={validated}
      handleChange={handleChange}
      handleChange2={handleChange2}
      handleSubmit={handleSubmit}
      handleDelete={handleDelete}
      addCourse={addCourse}
      study={study}
      departments={departments}
    />
  )
}

export default StudyType
