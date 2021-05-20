import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import { FaSearch } from 'react-icons/fa'
import { RiFileExcel2Fill } from 'react-icons/ri'
import Swal from 'sweetalert2'
import axios from 'axios'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import isEqual from 'lodash/isEqual'

import SupervisorRow from './supervisor-row'
import Loading from './loading'
import NoSupervisors from './no-supervisors'
import SupervisorDataRegisteration from '../supervisor-data-registration/supervisor-data-registeration'

import './view-supervisors-style.css'

const ViewSupervisors = () => {
  const [supervisors, setSupervisors] = useState([])
  const [copySupervisors, setCopySupervisors] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editIndex, setEditIndex] = useState(-1)
  const [showSave, setShowSave] = useState(false)

  const [universityPositions, setUniversityPositions] = useState([])
  const [departments, setDepartments] = useState([])
  const [specFilter, setSpecFilter] = useState([])
  const [nationFilter, setNationFilterr] = useState([])
  const [facultyFilter, setFacultyFilter] = useState([])
  const [univerFilter, setUniverFilter] = useState([])

  useEffect(() => {
    const filterItems = {
      url: 'http://localhost:8000/api/getdistinct',
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
    }
    axios(filterItems)
      .then((response) => {
        setSpecFilter([...response.data.specialization])
        setFacultyFilter([...response.data.faculty])
        setUniverFilter([...response.data.university])
        setNationFilterr([...response.data.nationality])
      })
      .catch((err) => {
        console.log(err)
      })

    const supervisorsAPI = {
      url: 'http://localhost:8000/api/supervisors',
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
    }
    axios(supervisorsAPI)
      .then((response) => {
        setSupervisors([...response.data])
        setCopySupervisors([...response.data])
      })
      .catch((err) => {
        console.log(err)
      })

    setTimeout(() => {
      setIsLoading(false)
    }, 500)

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

    const universityPositionsAPI = {
      url: 'http://localhost:8000/api/universityPositions',
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

  useEffect(() => {
    for (let i = 0; i < copySupervisors.length; i++) {
      for (let j = 0; j < universityPositions.length; j++) {
        if (
          copySupervisors[i].idDegreeF ===
          universityPositions[j].idUniversityPosition
        ) {
          copySupervisors[i] = {
            ...copySupervisors[i],
            ['sciDegree']: universityPositions[j].arabicDegreeName,
          }
          break
        }
      }
    }
    setSupervisors([...copySupervisors])
    setCopySupervisors([...copySupervisors])
  }, [universityPositions])

  const handleSearch = (e) => {
    const value = e.target.value
    const newSupervisors = supervisors.filter((supervisor) => {
      if (supervisor.arabicName.includes(value)) {
        return supervisor
      }
      //  else if (
      //   study.englishName.toLowerCase().includes(value.toLowerCase())
      // ) {
      //   return study
      // } else if (
      //   study.universityCode.toLowerCase().includes(value.toLowerCase())
      // ) {
      //   return study
      // }
    })
    setCopySupervisors(newSupervisors)
  }

  const filterChange = (e) => {
    const { name, value } = e.target
    const newSupervisors = supervisors.filter((supervisor) => {
      // console.log(supervisor[name])
      if (supervisor[name]) {
        if (value) {
          if (supervisor[name].includes(value)) {
            return supervisor
          }
        } else {
          return supervisor
        }
      }
    })
    setCopySupervisors(newSupervisors)
  }

  const handleFilter = () => {
    const sciDegreeFilter =
      document.getElementsByName('sci-degree-filter')[0].value
    const departmentFilter = document.getElementsByName('dept-filter')[0].value

    const specFilter = document.getElementsByName('spec-filter')[0].value

    const facultyFilter = document.getElementsByName('faculty-filter')[0].value

    const univerFilter =
      document.getElementsByName('university-filter')[0].value

    const nationFilter = document.getElementsByName('nation-filter')[0].value

    const genderFilter = document.getElementsByName('gender-filter')[0].value

    document.getElementsByName('supervisors-search')[0].value = ''

    const newSupervisors = supervisors.filter((supervisor) => {
      if (
        sciDegreeFilter === '' &&
        departmentFilter === '' &&
        specFilter === ''
      ) {
        return supervisor
      } else if (
        departmentFilter !== '' &&
        sciDegreeFilter === '' &&
        specFilter === ''
      ) {
        if (supervisor.department === departmentFilter) {
          return supervisor
        }
      } else if (
        sciDegreeFilter !== '' &&
        departmentFilter === '' &&
        specFilter === ''
      ) {
        if (supervisor.sciDegree === sciDegreeFilter) {
          return supervisor
        }
      } else if (
        specFilter !== '' &&
        sciDegreeFilter === '' &&
        departmentFilter === ''
      ) {
        if (supervisor.specialization === specFilter) {
          return supervisor
        }
      } else {
        if (
          (supervisor.sciDegree === sciDegreeFilter &&
            supervisor.department === departmentFilter) ||
          (supervisor.sciDegree === sciDegreeFilter &&
            supervisor.specialization === specFilter) ||
          (supervisor.department === departmentFilter &&
            supervisor.specialization === specFilter) ||
          (supervisor.sciDegree === sciDegreeFilter &&
            supervisor.department === departmentFilter &&
            supervisor.specialization === specFilter)
        ) {
          return supervisor
        }
      }
    })
    setCopySupervisors(newSupervisors)
  }

  const s2ab = (s) => {
    var buf = new ArrayBuffer(s.length)
    var view = new Uint8Array(buf)
    for (var i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff
    return buf
  }

  const printExcel = (data) => {
    let newData = []
    for (const item of data) {
      newData.push({
        ['الرقم الكودي']: item.idSupervisor,
        ['الاسم باللغة العربية']: item.arabicName,
        ['الاسم باللغة الإنجليزية']: item.englishName,
        ['الرقم القومي']: item.nationalityId,
        ['الجنس']: item.gender,
        ['دولة الجنسية']: item.nationality,
        ['رقم الهاتف']: item.mobile,
        ['البريد الإلكتروني']: item.email,
        ['الدرجة العلمية']: item.sciDegree,
        ['التخصص']: item.specialization,
        ['القسم الذي به المشرف']: item.department,
        ['الكلية التي بها المشرف']: item.faculty,
        ['الجامعة التي بها المشرف']: item.university,
      })
    }

    let wb = XLSX.utils.book_new()
    const ws = XLSX.utils.json_to_sheet(newData)
    wb.SheetNames.push('المشرفين')
    wb.Sheets['المشرفين'] = ws
    wb.Workbook = { ['Views']: [{ RTL: true }] }
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' })
    saveAs(
      new Blob([s2ab(wbout)], { type: 'application/octet-stream' }),
      'المشرفين.xlsx'
    )
  }

  const handleDelete = (supervisorID) => {
    Swal.fire({
      icon: 'warning',
      title: 'هل أنت متأكد من إزالة المشرف',
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: false,
      denyButtonText: `نعم ، امسح المشرف`,
      cancelButtonText: 'لا ، عودة',
      cancelButtonColor: '#2f3944',
      denyButtonColor: '#be0707',
    }).then((result) => {
      if (result.isDenied) {
        Swal.fire({
          icon: 'success',
          title: 'تمت إزالة القسم بنجاح',
          showConfirmButton: false,
          timer: 1500,
        })
        const newSupervisors = copySupervisors.filter((supervisor) => {
          return supervisor.idSupervisor !== supervisorID
        })
        setCopySupervisors([...newSupervisors])
        setSupervisors([...newSupervisors])
        isEditing && setIsEditing(false)

        const deleteSupervisorAPI = {
          url: `http://localhost:8000/api/supervisors/${supervisorID}`,
          method: 'delete',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
          },
        }
        axios(deleteSupervisorAPI)
          .then((response) => {
            console.log(response)
          })
          .catch((err) => {
            console.log(err)
          })
      }
    })
  }

  const handleCancel = () => {
    if (!isEqual(copySupervisors[editIndex], supervisors[editIndex])) {
      Swal.fire({
        icon: 'warning',
        title: '!لن يتم حفظ البيانات التي قمت بتعديلها',
        showDenyButton: true,
        showCancelButton: true,
        showConfirmButton: false,
        denyButtonText: `نعم ، إلغاء`,
        cancelButtonText: 'لا ، عودة',
        cancelButtonColor: '#2f3944',
        denyButtonColor: '#be0707',
      }).then((result) => {
        if (result.isDenied) {
          copySupervisors[editIndex] = supervisors[editIndex]
          setCopySupervisors([...copySupervisors])
          setIsEditing(false)
          // setValidated(false)
          setShowSave(false)
        }
      })
    } else {
      setIsEditing(false)
      setShowSave(false)
      // setValidated(false)
    }
  }

  if (isLoading) {
    return <Loading />
  }
  return isEditing ? (
    <SupervisorDataRegisteration
      isEditing={isEditing}
      setIsEditing={setIsEditing}
      editIndex={editIndex}
      editSupervisor={copySupervisors[editIndex]}
      handleDelete={handleDelete}
      handleCancel={handleCancel}
      setShowSave={setShowSave}
      showSave={showSave}
      copySupervisors={copySupervisors}
      setCopySupervisors={setCopySupervisors}
      setSupervisors={setSupervisors}
    />
  ) : (
    <div className='view-supervisors'>
      <div className='main-form'>
        <Row>
          <Col className='header'>
            <h1>المشرفيـن</h1>
          </Col>
        </Row>
        <Row>
          <Col className='excel-col'>
            <Button
              disabled={supervisors.length === 0}
              type='button'
              className='excel-btn'
              onClick={() => printExcel(copySupervisors)}
            >
              تحويل البيانات لملف إكسل <RiFileExcel2Fill />
            </Button>
          </Col>
          <Col className='search-col'>
            <InputGroup>
              <Form.Control
                // className='info'
                type='text'
                name='supervisors-search'
                placeholder='ابحث بالاسم'
                aria-label='ابحث بالاسم'
                aria-describedby='basic-addon1'
                onChange={handleSearch}
              />
              <InputGroup.Prepend>
                <InputGroup.Text id='basic-addon1'>
                  <FaSearch icon='search' />
                </InputGroup.Text>
              </InputGroup.Prepend>
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Control
              className='info'
              as='select'
              name='sciDegree'
              onChange={filterChange}
              custom
            >
              <option value=''>الدرجة العلمية</option>
              {universityPositions.map((position) => {
                return (
                  <option
                    key={position.idUniversityPosition}
                    value={position.arabicDegreeName}
                  >
                    {position.arabicDegreeName}
                  </option>
                )
              })}
            </Form.Control>
          </Col>

          <Col>
            <Form.Control
              className='info'
              as='select'
              name='specialization'
              onChange={filterChange}
              custom
            >
              <option value=''>التخصص</option>
              {specFilter.map((spec, index) => {
                if (spec.specialization) {
                  return (
                    <option key={index} value={spec.specialization}>
                      {spec.specialization}
                    </option>
                  )
                }
              })}
            </Form.Control>
          </Col>

          <Col>
            <Form.Control
              className='info'
              as='select'
              name='department'
              onChange={filterChange}
              custom
            >
              <option value=''>القسم</option>
              {departments.map((dept) => {
                return (
                  <option key={dept.idDept} value={dept.arabicName}>
                    {dept.arabicName}
                  </option>
                )
              })}
            </Form.Control>
          </Col>

          <Col>
            <Form.Control
              className='info'
              as='select'
              name='faculty'
              onChange={filterChange}
              custom
            >
              <option value=''>الكلية</option>
              {facultyFilter.map((item, index) => {
                if (item.faculty) {
                  return (
                    <option key={index} value={item.faculty}>
                      {item.faculty}
                    </option>
                  )
                }
              })}
            </Form.Control>
          </Col>

          <Col>
            <Form.Control
              className='info'
              as='select'
              name='university'
              onChange={filterChange}
              custom
            >
              <option value=''>الجامعة</option>
              {univerFilter.map((item, index) => {
                if (item.university) {
                  return (
                    <option key={index} value={item.university}>
                      {item.university}
                    </option>
                  )
                }
              })}
            </Form.Control>
          </Col>

          <Col>
            <Form.Control
              className='info'
              as='select'
              name='nationality'
              onChange={filterChange}
              custom
            >
              <option value=''>الجنسية</option>
              {nationFilter.map((item, index) => {
                if (item.nationality) {
                  return (
                    <option key={index} value={item.nationality}>
                      {item.nationality}
                    </option>
                  )
                }
              })}
            </Form.Control>
          </Col>

          <Col>
            <Form.Control
              className='info'
              as='select'
              name='gender'
              onChange={filterChange}
              custom
            >
              <option value=''>الجنس</option>
              <option value='ذكر'>ذكر</option>
              <option value='أنثى'>أنثى</option>
            </Form.Control>
          </Col>

          <Col>
            <Button className='filter-btn' type='button' onClick={handleFilter}>
              {' '}
              إعرض{' '}
            </Button>
          </Col>
        </Row>
        <Row className='labels-row'>
          <Col>
            <Form.Label>اسم المشرف</Form.Label>
          </Col>
          <Col>
            <Form.Label>الدرجة العلمية</Form.Label>
          </Col>
          <Col>
            <Form.Label>القسم</Form.Label>
          </Col>
          <Col>
            <Form.Label>التخصص</Form.Label>
          </Col>
        </Row>
        {copySupervisors.length !== 0 ? (
          copySupervisors.map((supervisor, index) => {
            return (
              <SupervisorRow
                key={supervisor.idSupervisor}
                index={index}
                supervisor={supervisor}
                handleDelete={handleDelete}
                setIsEditing={setIsEditing}
                setEditIndex={setEditIndex}
              />
            )
          })
        ) : (
          <NoSupervisors />
        )}
      </div>
    </div>
  )
}

export default ViewSupervisors
