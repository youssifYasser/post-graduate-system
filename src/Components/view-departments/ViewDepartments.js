import React, { useState, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import { RiFileExcel2Fill } from 'react-icons/ri'
import { Col, Container, Row, Form, Button } from 'react-bootstrap'
import Swal from 'sweetalert2'
import axios from 'axios'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'

import './viewDepartments-style.css'
import 'animate.css/animate.min.css'

import DepartmentRow from './department-row'
import NoDepartments from './no-departments'
import Loading from './loading'

const ViewDepartments = () => {
  const [departments, setDepartments] = useState([])
  const [copyDepts, setCopyDepts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const handleDelete = (deptID) => {
    Swal.fire({
      icon: 'warning',
      title: 'هل أنت متأكد من إزالة القسم',
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: false,
      denyButtonText: `نعم ، امسح القسم`,
      cancelButtonText: 'لا ، عودة',
      cancelButtonColor: '#2f3944',
      denyButtonColor: '#be0707',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isDenied) {
        Swal.fire({
          icon: 'success',
          title: 'تمت إزالة القسم بنجاح',
          confirmButtonText: 'حسنــاً',
          confirmButtonColor: '#2f3944',
        })
        const newDepartments = copyDepts.filter((department) => {
          return department.idDept !== deptID
        })
        setCopyDepts([...newDepartments])
        setDepartments([...newDepartments])

        const deleteDepartmentsAPI = {
          url: `http://localhost:8000/api/departments/${deptID}`,
          method: 'delete',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
          },
        }
        axios(deleteDepartmentsAPI)
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

    copyDepts[index] = { ...copyDepts[index], [name]: value }
    setCopyDepts([...copyDepts])
  }

  const handleSearch = (e) => {
    const value = e.target.value
    const resultDepts = departments.filter((dept) => {
      if (dept.arabicName.includes(value)) {
        return dept
      } else if (dept.englishName.toLowerCase().includes(value.toLowerCase())) {
        return dept
      }
    })
    setCopyDepts(resultDepts)
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
        ['الرقم الكودي']: item.idDept,
        ['اسم القسم باللغة العربية']: item.arabicName,
        ['اسم القسم باللغة الإنجليزية']: item.englishName,
      })
    }
    let wb = XLSX.utils.book_new()
    const ws = XLSX.utils.json_to_sheet(newData, {
      header: [
        'الرقم الكودي',
        'اسم القسم باللغة العربية',
        'اسم القسم باللغة الإنجليزية',
      ],
    })
    wb.SheetNames.push('أقسام الكلية')
    wb.Sheets['أقسام الكلية'] = ws
    wb.Workbook = { ['Views']: [{ RTL: true }] }
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' })
    saveAs(
      new Blob([s2ab(wbout)], { type: 'application/octet-stream' }),
      'أقسام الكلية.xlsx'
    )
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
        // console.log(response.data)
        setDepartments([...response.data])
        setCopyDepts([...response.data])
      })
      .catch((err) => {
        console.log(err)
      })

    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }, [])

  if (isLoading) {
    return <Loading />
  }
  return (
    <Container className='view-department'>
      <div className='main-form'>
        <Row>
          <Col className='header'>
            <h1>الأقسام</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <FaSearch />
            <Form.Control
              type='text'
              placeholder='ابحث عن القسم'
              onChange={handleSearch}
            />
          </Col>
        </Row>
        {copyDepts.length !== 0 ? (
          copyDepts.map((department, index) => {
            return (
              <DepartmentRow
                key={department.idDept}
                index={index}
                department={department}
                handleDelete={handleDelete}
                handleChange={handleChange}
                departments={departments}
                setDepartments={setDepartments}
                copyDepts={copyDepts}
                setCopyDepts={setCopyDepts}
              />
            )
          })
        ) : (
          <NoDepartments />
        )}
        {copyDepts.length !== 0 && (
          <Row>
            <Col className='excel-col'>
              <Button
                type='button'
                className='excel-btn'
                onClick={() => printExcel(copyDepts)}
              >
                تحويل البيانات لملف اكسيل <RiFileExcel2Fill />
              </Button>
            </Col>
          </Row>
        )}
      </div>
    </Container>
  )
}

export default ViewDepartments
