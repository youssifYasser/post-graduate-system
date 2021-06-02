import React, { useState, useEffect } from 'react'
import Swal from 'sweetalert2'
import 'animate.css/animate.min.css'
import axios from 'axios'

import AddRefereeView from './addReferee-view'

const AddReferee = ({ modalShow, setModalShow }) => {
  const [validated, setValidated] = useState(false)
  const [universityPositions, setUniversityPositions] = useState([])

  const [referee, setReferee] = useState({
    arabicName: '',
    email: '',
    idDegreeF: '',
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setReferee({ ...referee, [name]: value })
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
      title: 'هل أنت متأكد من تسجيل المحكم ؟',
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
          title: 'تمت إضافة المحكم بنجاح',
          showConfirmButton: false,
          timer: 2000,
        })
        if (modalShow) {
          setModalShow(false)
        }
        const options = {
          url: 'http://localhost:8000/api/createrefress',
          method: 'post',
          data: JSON.stringify(referee),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
          },
        }
        axios(options)
          .then((response) => {
            console.log(response)
            setReferee({ arabicName: '', email: '', idDegreeF: '' })
          })
          .catch((err) => {
            console.log(err)
          })
        setValidated(false)
      }
    })
  }

  useEffect(() => {
    const universityPositionsAPI = {
      url: 'http://localhost:8000/api/uni-positions dobn',
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
    }
    axios(universityPositionsAPI)
      .then((response) => {
        setUniversityPositions([...response.data])
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  return (
    <AddRefereeView
      modalShow={modalShow}
      validated={validated}
      referee={referee}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      universityPositions={universityPositions}
    />
  )
}

export default AddReferee
