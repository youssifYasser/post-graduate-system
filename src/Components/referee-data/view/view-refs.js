import React, { useState, useEffect } from 'react'
import { Row, Form, Col, Button, InputGroup } from 'react-bootstrap'
import '../ref-style.css'
import { FaSearch } from 'react-icons/fa'
import Referee from './referee'
import axios from 'axios'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import isEqual from 'lodash/isEqual'
import { RiFileExcel2Fill } from 'react-icons/ri'
import Loading from './loading'
import NoRefs from './no-refs'
import Swal from 'sweetalert2'
import RefManualReg from '../registeration/ref-manual-reg'

const Referees = () => {
  const [degrees, setDegrees] = useState([])
  const [departments, setDepartments] = useState([])
  const [nationalityFilter, setNationalityFilter] = useState([])
  const [specFilter, setSpecFilter] = useState([])
  const [facultyFilter, setFacultyFilter] = useState([])
  const [univerFilter, setUniverFilter] = useState([])
  const [positionFilter, setPositionFilter] = useState([])
  const [refs, setRefs] = useState([])
  const [copyRefs, setCopyRefs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editIndex, setEditIndex] = useState(-1)
  const [showSave, setShowSave] = useState(false)
  const [isFiltering, setIsFiltering] = useState(false)

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
        setSpecFilter([...response.data.specializations])
        setPositionFilter([...response.data.positions])
        setFacultyFilter([...response.data.faculties])
        setUniverFilter([...response.data.universities])
        setNationalityFilter([...response.data.nationalities])
      })
      .catch((err) => {
        console.log(err)
      })

    const getReferees = {
      url: 'http://localhost:8000/api/getreferees',
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
    }
    axios(getReferees)
      .then((response) => {
        setRefs([...response.data])
        setCopyRefs([...response.data])
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
      url: 'http://localhost:8000/api/uni-positions',
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
    }
    axios(universityPositionsAPI)
      .then((response) => {
        setDegrees([...response.data])
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    for (let i = 0; i < copyRefs.length; i++) {
      for (let j = 0; j < degrees.length; j++) {
        if (copyRefs[i].idDegreeF === degrees[j].idUniversityPosition) {
          copyRefs[i] = {
            ...copyRefs[i],
            ['degree']: degrees[j].arabicDegreeName,
          }
          break
        }
      }
    }
    setRefs([...copyRefs])
    setCopyRefs([...copyRefs])
    console.log('ref', copyRefs)
  }, [degrees])

  const handleDelete = (ID) => {
    Swal.fire({
      icon: 'warning',
      title: 'هل أنت متأكد من إزالة المحكم',
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: false,
      denyButtonText: `نعم ، امسح المحكم`,
      cancelButtonText: 'لا ، عودة',
      cancelButtonColor: '#2f3944',
      denyButtonColor: '#be0707',
    }).then((result) => {
      if (result.isDenied) {
        const newRefs = copyRefs.filter((ref) => {
          return ref.idRefereed !== ID
        })
        isEditing && setIsEditing(false)

        const deleteRefereeAPI = {
          url: `http://localhost:8000/api/delete/${ID}`,
          method: 'delete',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
          },
        }
        axios(deleteRefereeAPI)
          .then((response) => {
            Swal.fire({
              icon: 'success',
              title: 'تمت إزالة المحكم بنجاح',
              showConfirmButton: false,
              timer: 1500,
            })
            setTimeout(() => {
              setCopyRefs([...newRefs])
              setRefs([...newRefs])
              window.location.href =
                window.location.pathname +
                window.location.search +
                window.location.hash
            }, 1100)
          })
          .catch((err) => {
            console.log(err)
          })
      }
    })
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
        ['الرقم الكودي']: item.idRefereed,
        ['الاسم باللغة العربية']: item.arabicName,
        ['الاسم باللغة الإنجليزية']: item.englishName,
        ['الرقم القومي']: item.nationalityId,
        ['الجنس']: item.gender,
        ['دولة الجنسية']: item.nationality,
        ['رقم الهاتف']: item.mobile,
        ['البريد الإلكتروني']: item.email,
        ['الدرجة العلمية']: item.degree,
        ['التخصص']: item.specialization,
        ['المنصب']: item.position,
        ['القسم الذي به المحكم']: item.department,
        ['الكلية التي بها المحكم']: item.faculty,
        ['الجامعة التي بها المحكم']: item.university,
      })
    }

    let wb = XLSX.utils.book_new()
    const ws = XLSX.utils.json_to_sheet(newData)
    wb.SheetNames.push('المحكمين')
    wb.Sheets['المحكمين'] = ws
    wb.Workbook = { ['Views']: [{ RTL: true }] }
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' })
    saveAs(
      new Blob([s2ab(wbout)], { type: 'application/octet-stream' }),
      'المحكمين.xlsx'
    )
  }

  const handleSearch = (e) => {
    const value = e.target.value
    const newRefs = refs.filter((ref) => {
      if (ref.arabicName.includes(value)) {
        return ref
      } else if (ref.nationalityId && ref.nationalityId.includes(value)) {
        return ref
      }
    })
    setCopyRefs(newRefs)
  }

  const handleCancel = () => {
    if (!isEqual(copyRefs[editIndex], refs[editIndex])) {
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
          copyRefs[editIndex] = refs[editIndex]
          setCopyRefs([...copyRefs])
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

  const handleFilter = () => {
    setIsFiltering(true)
    const filterObj = {
      idDegreeF: document.getElementsByName('idDegreeF')[0].value,
      department: document.getElementsByName('department')[0].value,
      specialization: document.getElementsByName('specialization')[0].value,
      faculty: document.getElementsByName('faculty')[0].value,
      university: document.getElementsByName('university')[0].value,
      nationality: document.getElementsByName('nationality')[0].value,
      gender: document.getElementsByName('gender')[0].value,
      position: document.getElementsByName('position')[0].value,
    }

    document.getElementsByName('refs-search')[0].value = ''

    console.log(filterObj)
    const filterItems = {
      url: 'http://localhost:8000/api/filterRef',
      data: JSON.stringify(filterObj),
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
    }
    axios(filterItems)
      .then((response) => {
        console.log(response.data)
        setCopyRefs([...response.data.referees])
        setDegrees([...degrees])
        setIsFiltering(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  if (isLoading) {
    return <Loading />
  }

  if (isEditing) {
    return (
      <RefManualReg
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        editIndex={editIndex}
        editRef={copyRefs[editIndex]}
        handleDelete={handleDelete}
        handleCancel={handleCancel}
        setShowSave={setShowSave}
        showSave={showSave}
        copyRefs={copyRefs}
        setCopyRefs={setCopyRefs}
        setRefs={setRefs}
      />
    )
  }

  return (
    <div className='view-ref'>
      <Row>
        <div className='header'>
          <h1>الـمـحـكـمـيـــن</h1>
        </div>
      </Row>
      <Form className='search-form'>
        <Row>
          <Col className='excel-col'>
            <Button
              type='button'
              className='excel-btn'
              onClick={() => {
                printExcel(copyRefs)
              }}
            >
              تحويل البيانات لملف اكسيل <RiFileExcel2Fill />
            </Button>
          </Col>
          <Col className='search-col'>
            <InputGroup>
              <Form.Control
                type='text'
                name='refs-search'
                placeholder='ابحث بالاسم أو الرقم القومى'
                aria-label='ابحث بالاسم أو الرقم القومى'
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
        <Row className='filter-row'>
          <Col>
            <Form.Control className='info' as='select' name='idDegreeF' custom>
              <option value=''>الدرجة العلمية</option>
              {degrees.map((degree) => {
                return (
                  <option
                    key={degree.idUniversityPosition}
                    value={degree.idUniversityPosition}
                  >
                    {degree.arabicDegreeName}
                  </option>
                )
              })}
            </Form.Control>
          </Col>
          <Col>
            <Form.Control className='info' as='select' name='position' custom>
              <option value=''>المنصب</option>
              {positionFilter.map((pos, index) => {
                if (pos) {
                  return (
                    <option key={index} value={pos}>
                      {pos}
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
              name='specialization'
              custom
            >
              <option value=''>التخصص</option>
              {specFilter.map((spec, index) => {
                if (spec) {
                  return (
                    <option key={index} value={spec}>
                      {spec}
                    </option>
                  )
                }
              })}
            </Form.Control>
          </Col>

          <Col>
            <Form.Control className='info' as='select' name='department' custom>
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
            <Form.Control className='info' as='select' name='faculty' custom>
              <option value=''>الكلية</option>
              {facultyFilter.map((item, index) => {
                if (item) {
                  return (
                    <option key={index} value={item}>
                      {item}
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
              // onChange={filterChange}
              custom
            >
              <option value=''>الجامعة</option>
              {univerFilter.map((item, index) => {
                if (item) {
                  return (
                    <option key={index} value={item}>
                      {item}
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
              custom
            >
              <option value=''>الجنسية</option>
              {nationalityFilter.map((item, index) => {
                if (item) {
                  return (
                    <option key={index} value={item}>
                      {item}
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
              // onChange={filterChange}
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
      </Form>
      <Row className='labels-row'>
        <Col className='label-col'>اسم المحكم</Col>
        <Col className='label-col'>الدرجة العلمية</Col>
        <Col className='label-col'>القسم</Col>
        <Col className='label-col'>التخصص</Col>
      </Row>
      {copyRefs.length !== 0 ? (
        isFiltering ? (
          <Loading />
        ) : (
          copyRefs.map((referee, index) => {
            return (
              <Referee
                key={referee.idRefereed}
                referee={referee}
                handleDelete={handleDelete}
                index={index}
                setIsEditing={setIsEditing}
                setEditIndex={setEditIndex}
                isFiltering={isFiltering}
              />
            )
          })
        )
      ) : (
        <NoRefs />
      )}
    </div>
  )
}

export default Referees
