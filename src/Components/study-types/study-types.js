import React, { useState, useEffect } from 'react'
import './study-types.css'
import { FaSearch } from 'react-icons/fa'
import StudyType from './study-type'
import studytypes from './study-types-array'
import NoStudies from './no-studies'
import { Row, Col, Form, Button } from 'react-bootstrap'
import Swal from 'sweetalert2'
import axios from 'axios'
import Loading from './loading'

const StudyTypes = () => {
  const [studies, setStudies] = useState([])
  const [copyStudies, setCopyStudies] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [departments, setDepartments] = useState([])
  // const [filterValidated, setFilterValidated] = useState(false)

  const handleDelete = (stID) => {
    Swal.fire({
      icon: 'warning',
      title: 'هل أنت متأكد من إزالة الدراسة',
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: false,
      denyButtonText: `نعم ، امسح الدراسة`,
      cancelButtonText: 'لا ، عودة',
      cancelButtonColor: '#2f3944',
      denyButtonColor: '#be0707',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isDenied) {
        Swal.fire({
          icon: 'success',
          title: 'تمت إزالة الدراسة بنجاح',
          confirmButtonText: 'حسنــاً',
          confirmButtonColor: '#2f3944',
        })
        const sts = copyStudies.filter((item) => {
          return item.idStudyType !== stID
        })
        setCopyStudies(sts)

        const deleteStudiesAPI = {
          url: `http://localhost:8000/api/deletestudytype/${stID}`,
          method: 'delete',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
          },
        }
        axios(deleteStudiesAPI)
          .then((response) => {
            console.log(response)
          })
          .catch((err) => {
            console.log(err)
          })
      }
    })
  }

  const handleChange = (e) => {
    let { name, value } = e.target
    let indexOfDash = name.lastIndexOf('-')
    let index = name.slice(indexOfDash + 1)
    name = name.slice(0, indexOfDash)
    copyStudies[index] = { ...copyStudies[index], [name]: value }
    console.log(name, value, index)
    setCopyStudies([...copyStudies])
  }

  const handleSearch = (e) => {
    const value = e.target.value
    const newStudies = studies.filter((study) => {
      if (study.arabicName.includes(value)) {
        return study
      } else if (
        study.englishName.toLowerCase().includes(value.toLowerCase())
      ) {
        return study
      } else if (
        study.academicCode.toLowerCase().includes(value.toLowerCase())
      ) {
        return study
      }
    })
    setCopyStudies(newStudies)
  }

  const filterStudies = () => {
    const studyTypeFilter = document.getElementsByName('study-type-filter')[0]
      .value
    const departmentFilter = document.getElementsByName('department-filter')[0]
      .value
    const newStudies = studies.filter((study) => {
      if (studyTypeFilter === '' && departmentFilter === '') {
        return study
      } else if (studyTypeFilter === '' && departmentFilter !== '') {
        if (study.department === departmentFilter) {
          return study
        }
      } else if (studyTypeFilter !== '' && departmentFilter === '') {
        if (study.type === studyTypeFilter) {
          return study
        }
      } else {
        if (
          study.type === studyTypeFilter &&
          study.department === departmentFilter
        ) {
          return study
        }
      }
    })
    setCopyStudies(newStudies)
  }

  useEffect(() => {
    const studyTypesAPI = {
      url: 'http://localhost:8000/api/getallstudytype',
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
    }
    axios(studyTypesAPI)
      .then((response) => {
        // console.log(response.data)
        setStudies([...response.data])
        setCopyStudies([...response.data])
      })
      .catch((err) => {
        console.log(err)
      })
    setTimeout(() => {
      setIsLoading(false)
    }, 700)

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
        // console.log(response.data)
        setDepartments([...response.data])
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    for (let i = 0; i < studies.length; i++) {
      for (let j = 0; j < departments.length; j++) {
        if (studies[i].idDeptF === departments[j].idDept) {
          // console.log(departments[j].arabicName)
          studies[i] = {
            ...studies[i],
            ['department']: departments[j].arabicName,
          }
          setStudies([...studies])
          copyStudies[i] = {
            ...copyStudies[i],
            ['department']: departments[j].arabicName,
          }
          setCopyStudies([...copyStudies])
        }
      }
    }
  }, [departments])

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className='study-types-view'>
      <Row>
        <div className='header'>
          <h2>الدراسات العليا بكلية العلوم جامعة عين شمس</h2>
        </div>
      </Row>
      <Form className='studies-form'>
        <Form.Row className='search-row'>
          <Col md={2}>
            <section className='form-group' controlId='study-type-filter'>
              <Form.Control
                className='info'
                as='select'
                name='study-type-filter'
                custom
                required
              >
                <option value=''>نوع الدراسة</option>
                <option value='دبلومة الدراسات العليا'>
                  دبلومة الدراسات العليا
                </option>
                <option value='تمهيدي الماجيستير'>تمهيدي الماجستير</option>
                <option value='الماجستير في العلوم'>الماجستير في العلوم</option>
                <option value='دكتوراه الفلسفة في العلوم'>
                  دكتوراه الفلسفة في العلوم
                </option>
              </Form.Control>
              <article className='invalid-feedback' type='invalid'>
                من فضلك اختر نوع الدراسة
              </article>
            </section>
          </Col>
          <Col md={2}>
            <section className='form-group' controlId='department-filter'>
              <Form.Control
                className='info'
                as='select'
                name='department-filter'
                custom
                required
              >
                <option value=''>القسم</option>
                {departments.map((department) => {
                  return (
                    <option
                      key={department.idDept}
                      value={department.arabicName}
                    >
                      {department.arabicName}
                    </option>
                  )
                })}
              </Form.Control>
              <article className='invalid-feedback' type='invalid'>
                من فضلك اختر القسم
              </article>
            </section>
          </Col>
          <Col md={{ span: '1', offset: '4' }}>
            <Button
              className='filter-btn'
              type='button'
              onClick={filterStudies}
            >
              {' '}
              إعرض{' '}
            </Button>
          </Col>
          <Col md={3}>
            <Form.Control
              className='info'
              name='study-type-search'
              type='input'
              placeholder='ابحث عن الدراسة'
              onChange={handleSearch}
            />
            <span className='search-icon'>
              <FaSearch />
            </span>
          </Col>
        </Form.Row>
      </Form>

      {copyStudies.length !== 0 ? (
        copyStudies.map((studytype, index) => {
          return (
            <StudyType
              studytype={studytype}
              index={index}
              key={studytype.code}
              handleDelete={handleDelete}
              handleChange={handleChange}
              studies={studies}
              copyStudies={copyStudies}
              setCopyStudies={setCopyStudies}
              departments={departments}
            />
          )
        })
      ) : (
        <NoStudies />
      )}
    </div>
  )
}

export default StudyTypes
