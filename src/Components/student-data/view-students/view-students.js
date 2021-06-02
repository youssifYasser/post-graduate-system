import React, { useEffect, useState } from 'react'
import { Row, Col, InputGroup, Button, Form, Tabs, Tab } from 'react-bootstrap'
import { FaSearch } from 'react-icons/fa'
import { RiFileExcel2Fill } from 'react-icons/ri'
import Swal from 'sweetalert2'
import axios from 'axios'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import isEqual from 'lodash/isEqual'

import Loading from '../../supervisor-data/view-supervisors/loading'
import StudentDataRegisteration from '../Student-data-registration/StudentDataRegisteration'
import StudentRow from './student-row'

import './view-students-style.css'
import NoSupervisors from '../../supervisor-data/view-supervisors/no-supervisors'

// make the view with tabs
const ViewStudents = () => {
  const [registeredStudents, setRegisteredStudents] = useState([])
  const [validStudents, setValidStudents] = useState([])
  const [InvalidStudents, setInvalidStudents] = useState([])
  const [copyStudents, setCopyStudents] = useState([])
  const [selectedSection, setSelectedSection] = useState('registeredStudents')
  const [isLoading, setIsLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editIndex, setEditIndex] = useState(-1)
  const [showSave, setShowSave] = useState(false)

  const [titleFilter, setTitleFilter] = useState([])
  const [departments, setDepartments] = useState([])
  const [nationFilter, setNationFilter] = useState([])
  const [isFiltering, setIsFiltering] = useState(false)

  const s2ab = (s) => {
    var buf = new ArrayBuffer(s.length)
    var view = new Uint8Array(buf)
    for (var i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff
    return buf
  }

  const printExcel = (data) => {
    let newData = []
    for (let i = 0; i < data.length; i++) {
      newData.push({
        ['الرقم الكودي']: data[i]['personal'].idS,
        ['الصورة الشخصية']: data[i]['personal'].image,
        ['الاسم باللغة العربية']: data[i]['personal'].arabicName,
        ['الاسم باللغة الإنجليزية']: data[i]['personal'].englishName,
        ['تاريخ الميلاد']: data[i]['personal'].birthdate,
        ['الجنس']: data[i]['personal'].gender,
        ['دولة الجنسية']: data[i]['personal'].nationality,
        ['الرقم القومي']: data[i]['personal'].nationalityId,
        ['مصدر شهادة الميلاد']: data[i]['personal'].birthdateSource,
        ['العنوان']: data[i]['personal'].Add,
        ['رقم الهاتف']: data[i]['personal'].mobile,
        ['البريد الإلكتروني']: data[i]['personal'].email,
        ['الوظيفة باللغة العربية']: data[i]['personal'].jobArabic,
        ['الوظيفة باللغة الإنجليزية']: data[i]['personal'].jobEnglish,
        ['عنوان الوظيفة']: data[i]['personal'].jobAdd,
      })
      if (selectedSection === 'registeredStudents') {
        if (data[i]['previousstudie'].length === 1) {
          newData[i] = {
            ...newData[i],
            ['الرقم الكودي للدراسة السابقة']: data[i]['previousstudie'].id,
            ['الدرجة  العلمية']: data[i]['previousstudie'].degree,
            ['التخصص']: data[i]['previousstudie'].specialization,
            ['تاريخ الحصول عليها']: data[i]['previousstudie'].dateObtained,
            ['الكلية التي حصل الطالب على الدرجة العلمية منها']:
              data[i]['previousstudie'].faculty,
            ['الجامعة التي حصل الطالب على الدرجة العلمية منها']:
              data[i]['previousstudie'].university,
          }
        } else {
          for (let j = 0; j < data[i]['previousstudie'].length; j++) {
            newData[i] = {
              ...newData[i],
              [`الرقم الكودي للدراسة السابقة ${i + 1}`]:
                data[i]['previousstudie'].id,
              [`الدرجة  العلمية ${i + 1}`]: data[i]['previousstudie'].degree,
              [`التخصص ${i + 1}`]: data[i]['previousstudie'].specialization,
              [`تاريخ الحصول عليها ${i + 1}`]:
                data[i]['previousstudie'].dateObtained,
              [`الكلية التي حصل الطالب على الدرجة العلمية منها ${i + 1}`]:
                data[i]['previousstudie'].faculty,
              [`الجامعة التي حصل الطالب على الدرجة العلمية منها ${i + 1}`]:
                data[i]['previousstudie'].university,
            }
          }
        }

        newData[i] = {
          ...newData[i],
          ['نوع التسجيل']: data[i]['register'].gender,
          ['الجنس']: data[i]['personal'].gender,
          ['الجنس']: data[i]['personal'].gender,
          ['الجنس']: data[i]['personal'].gender,
          ['الجنس']: data[i]['personal'].gender,
          ['الجنس']: data[i]['personal'].gender,
          ['الجنس']: data[i]['personal'].gender,
          ['الجنس']: data[i]['personal'].gender,
          ['الجنس']: data[i]['personal'].gender,
          ['الجنس']: data[i]['personal'].gender,
          ['الجنس']: data[i]['personal'].gender,
          ['الجنس']: data[i]['personal'].gender,
          ['الجنس']: data[i]['personal'].gender,
          ['الجنس']: data[i]['personal'].gender,
          ['الجنس']: data[i]['personal'].gender,
          ['الجنس']: data[i]['personal'].gender,
          ['الجنس']: data[i]['personal'].gender,
          ['الجنس']: data[i]['personal'].gender,
          ['الجنس']: data[i]['personal'].gender,
          ['الجنس']: data[i]['personal'].gender,
          ['الجنس']: data[i]['personal'].gender,
          ['الجنس']: data[i]['personal'].gender,
          ['الجنس']: data[i]['personal'].gender,
          ['الجنس']: data[i]['personal'].gender,
        }
      }
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

  const handleSearch = (e) => {
    const value = e.target.value
    const searchArray =
      selectedSection === 'registeredStudents'
        ? registeredStudents
        : selectedSection === 'validStudents'
        ? validStudents
        : InvalidStudents
    const newStudents = searchArray.filter((student) => {
      if (student['personal'].arabicName.includes(value)) {
        return student
      } else if (
        student['personal'].nationalityId &&
        student['personal'].nationalityId.includes(value)
      ) {
        return student
      }
    })
    setCopyStudents(newStudents)
  }

  const startEdit = (index, idS, idStudyTypeF) => {
    if (!idStudyTypeF) {
      setEditIndex(index)
      setIsEditing(true)
    } else {
      const registeredStudentsAPI = {
        url: 'http://localhost:8000/api/getstudnt',
        data: JSON.stringify({ idS, studyType_id: idStudyTypeF }),
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=UTF-8',
        },
      }
      axios(registeredStudentsAPI)
        .then((response) => {
          console.log(response.data)
          copyStudents[index] = { ...copyStudents[index], ...response.data }
          // setCopyStudents([...copyStudents])
          setEditIndex(index)
          setIsEditing(true)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  const handleDelete = (studentID) => {
    Swal.fire({
      icon: 'warning',
      title: 'هل أنت متأكد من إزالة الطالب',
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: false,
      denyButtonText: `نعم ، امسح الطالب`,
      cancelButtonText: 'لا ، عودة',
      cancelButtonColor: '#2f3944',
      denyButtonColor: '#be0707',
    }).then((result) => {
      if (result.isDenied) {
        const newStudents = copyStudents.filter((student) => {
          return student['personal'].idS !== studentID
        })

        const deleteStudentAPI = {
          url: `http://localhost:8000/api/deletestudent/${studentID}`,
          method: 'delete',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
          },
        }
        axios(deleteStudentAPI)
          .then((response) => {
            Swal.fire({
              icon: 'success',
              title: 'تمت إزالة الطالب بنجاح',
              showConfirmButton: false,
              timer: 1500,
            })
            setTimeout(() => {
              setCopyStudents([...newStudents])
              // setSupervisors([...newSupervisors])
              window.location.href =
                window.location.pathname +
                window.location.search +
                window.location.hash
            }, 1100)
            // isEditing && setIsEditing(false)
            console.log(response)
          })
          .catch((err) => {
            console.log(err)
          })
      }
    })
  }

  useEffect(() => {
    const filterItems = {
      url: 'http://localhost:8000/api/view-info',
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
    }
    axios(filterItems)
      .then((response) => {
        console.log(response.data)
        setNationFilter([...response.data.nationalities])
        setTitleFilter([...response.data.studies])
      })
      .catch((err) => {
        console.log(err)
      })

    const registeredStudentsAPI = {
      url: 'http://localhost:8000/api/getall',
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
    }
    axios(registeredStudentsAPI)
      .then((response) => {
        console.log([...response.data])
        setRegisteredStudents([...response.data])
        setCopyStudents([...response.data])
      })
      .catch((err) => {
        console.log(err)
      })

    setTimeout(() => {
      setIsLoading(false)
    }, 500)

    const validStudentsAPI = {
      url: 'http://localhost:8000/api/valid-but-uncompleted',
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
    }
    axios(validStudentsAPI)
      .then((response) => {
        console.log([...response.data])
        setValidStudents([...response.data])
        // setCopyStudents([...response.data])
      })
      .catch((err) => {
        console.log(err)
      })

    const InvalidStudentsAPI = {
      url: 'http://localhost:8000/api/uncompletedRegistration',
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
    }
    axios(InvalidStudentsAPI)
      .then((response) => {
        console.log([...response.data])
        setInvalidStudents([...response.data])
        // setCopyStudents([...response.data])
      })
      .catch((err) => {
        console.log(err)
      })

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

  if (isLoading) {
    return <Loading />
  } else if (isEditing) {
    return (
      <StudentDataRegisteration
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        editIndex={editIndex}
        editStudent={copyStudents[editIndex]}
        // handleDelete={handleDelete}
        // handleCancel={handleCancel}
        setShowSave={setShowSave}
        showSave={showSave}
        copyStudents={copyStudents}
        setCopyStudents={setCopyStudents}
        // setStudents={setStudents}
      />
    )
  } else {
    return (
      <div className='view-students'>
        <div className='main-form'>
          <Row>
            <Col className='header'>
              <h1>الطـــلاب</h1>
            </Col>
          </Row>
          <Row>
            <Col className='excel-col'>
              <Button
                disabled={
                  (selectedSection === 'registeredStudents'
                    ? registeredStudents
                    : selectedSection === 'validStudents'
                    ? validStudents
                    : InvalidStudents
                  ).length === 0
                }
                type='button'
                className='excel-btn'
                onClick={() => printExcel(copyStudents)}
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
                  placeholder='ابحث بالاسم أو بالرقم القومي'
                  aria-label='ابحث بالاسم أو بالرقم القومي'
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
              <Form.Control className='info' as='select' name='type' custom>
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
            </Col>

            <Col>
              <Form.Control
                className='info'
                as='select'
                name='arabic-name'
                custom
              >
                <option value=''>عنوان الدراسة</option>
                {titleFilter.map((title, index) => {
                  return (
                    <option key={index} value={title}>
                      {title}
                    </option>
                  )
                })}
              </Form.Control>
            </Col>

            <Col>
              <Form.Control
                className='info'
                as='select'
                name='department'
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
                name='nationality'
                custom
              >
                <option value=''>الجنسية</option>
                {nationFilter.map((item, index) => {
                  return (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  )
                })}
              </Form.Control>
            </Col>

            <Col>
              <Form.Control className='info' as='select' name='gender' custom>
                <option value=''>الجنس</option>
                <option value='ذكر'>ذكر</option>
                <option value='أنثى'>أنثى</option>
              </Form.Control>
            </Col>

            <Col>
              <Button
                className='filter-btn'
                type='button'
                // onClick={handleFilter}
              >
                {' '}
                إعرض{' '}
              </Button>
            </Col>
          </Row>
          <Tabs
            defaultActiveKey='registeredStudents'
            // activeKey={page}
            id='uncontrolled-tab'
            onSelect={(k) => {
              // console.log(k)
              if (k === 'registeredStudents') {
                setCopyStudents(registeredStudents)
                setSelectedSection('registeredStudents')
              } else if (k === 'validStudents') {
                setCopyStudents(validStudents)
                setSelectedSection('validStudents')
              } else if (k === 'InvalidStudents') {
                setCopyStudents(InvalidStudents)
                setSelectedSection('InvalidStudents')
              }
            }}
          >
            <Tab eventKey='registeredStudents' title='الطلبة الذي تم تسجيلهم'>
              <Row className='labels-row'>
                <Col>
                  <Form.Label>اسم الطالب</Form.Label>
                </Col>
                <Col>
                  <Form.Label>تاريخ الميلاد</Form.Label>
                </Col>
                <Col>
                  <Form.Label>الرقم القومي</Form.Label>
                </Col>
                <Col>
                  <Form.Label>عنوان الدراسة</Form.Label>
                </Col>
              </Row>
              {copyStudents.length !== 0 ? (
                isFiltering ? (
                  <Loading />
                ) : (
                  copyStudents.map((student, index) => {
                    return (
                      <StudentRow
                        key={student['personal'].idS}
                        index={index}
                        student={student}
                        startEdit={startEdit}
                        handleDelete={handleDelete}
                        setIsEditing={setIsEditing}
                        setEditIndex={setEditIndex}
                      />
                    )
                  })
                )
              ) : (
                <NoSupervisors word={'طلاب'} />
              )}
            </Tab>

            <Tab eventKey='validStudents' title='الطلبة الذي تم إضافتهم'>
              <Row className='labels-row'>
                <Col>
                  <Form.Label>اسم الطالب</Form.Label>
                </Col>
                <Col>
                  <Form.Label>تاريخ الميلاد</Form.Label>
                </Col>
                <Col>
                  <Form.Label>الرقم القومي</Form.Label>
                </Col>
                <Col>
                  <Form.Label>عنوان الدراسة</Form.Label>
                </Col>
              </Row>
              {copyStudents.length !== 0 ? (
                isFiltering ? (
                  <Loading />
                ) : (
                  copyStudents.map((student, index) => {
                    return (
                      <StudentRow
                        key={student['personal'].idS}
                        index={index}
                        student={student}
                        startEdit={startEdit}
                        handleDelete={handleDelete}
                        setIsEditing={setIsEditing}
                        setEditIndex={setEditIndex}
                      />
                    )
                  })
                )
              ) : (
                <NoSupervisors word={'طلاب'} />
              )}
            </Tab>

            <Tab eventKey='InvalidStudents' title='الطلبة المتأخرين'>
              <Row className='labels-row'>
                <Col>
                  <Form.Label>اسم الطالب</Form.Label>
                </Col>
                <Col>
                  <Form.Label>تاريخ الميلاد</Form.Label>
                </Col>
                <Col>
                  <Form.Label>الرقم القومي</Form.Label>
                </Col>
                <Col>
                  <Form.Label>عنوان الدراسة</Form.Label>
                </Col>
              </Row>
              {copyStudents.length !== 0 ? (
                isFiltering ? (
                  <Loading />
                ) : (
                  copyStudents.map((student, index) => {
                    return (
                      <StudentRow
                        key={student['personal'].idS}
                        index={index}
                        student={student}
                        startEdit={startEdit}
                        handleDelete={handleDelete}
                        setIsEditing={setIsEditing}
                        setEditIndex={setEditIndex}
                      />
                    )
                  })
                )
              ) : (
                <NoSupervisors word={'طلاب'} />
              )}
            </Tab>
          </Tabs>
          {/* workking on Tabs */}
        </div>
      </div>
    )
  }
}
export default ViewStudents
