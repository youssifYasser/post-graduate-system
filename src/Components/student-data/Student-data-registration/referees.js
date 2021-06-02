import React, { useEffect, useState } from 'react'
import { Container, Form, Col, Button } from 'react-bootstrap'
import './PersonalData.css'
import './StudentDataRegisteration.css'
import Swal from 'sweetalert2'
import axios from 'axios'
import InsertModal from './insertModal'

const StudentRefs = ({
  handleChange,
  handleUpload,
  btnText,
  deleteItem,
  studentRefs,
}) => {
  const [modalShow, setModalShow] = useState(false)
  const [insertPage, setInsertPage] = useState(3)
  const [allRefs, setAllRefs] = useState([])

  useEffect(() => {
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
        setAllRefs([...response.data])
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  const newRef = () => {
    Swal.fire({
      icon: 'question',
      title:
        'هل تريد إرسال بريداً إلكترونياً إلى السيد المحكم أم تسجيل بياناته يدوياً؟',
      showConfirmButton: true,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'أرسل بريد إلكترونى',
      confirmButtonColor: '#2f3944',
      denyButtonText: 'تسجيل المحكم يدوياً',
      cancelButtonText: 'لا ، عودة',
      cancelButtonColor: '#2f3944',
      denyButtonColor: '#2f3944',
    }).then((result) => {
      if (result.isConfirmed) {
        setModalShow(true)
        setInsertPage(3)
      } else if (result.isDenied) {
        setModalShow(true)
        setInsertPage(4)
      }
    })
  }

  if (modalShow) {
    return (
      <InsertModal
        insertPage={insertPage}
        show={modalShow}
        setModalShow={setModalShow}
        onHide={() => setModalShow(false)}
      />
    )
  }

  return (
    <Container className={`form-four animate__animated animate__fadeIn`}>
      <h5 className='title'>الســادة المحكميــن</h5>
      {studentRefs.length === 0 ? (
        <h6 className='title'>لا يوجد محكمين ...</h6>
      ) : (
        studentRefs.map((ref, index) => {
          return (
            <section className='section' key={ref.idRefereed}>
              <Form.Row>
                <Col>
                  <Form.Group>
                    <Form.Label className='sups-refs-labels'>
                      الرقم الكودي
                    </Form.Label>
                    <Form.Control
                      className='form-input'
                      type='number'
                      value={ref.idRefereed}
                      name={`idRefereed-${index}-r`}
                      onChange={handleChange}
                      disabled
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label className='sups-refs-labels'>
                      اسم المحكم
                    </Form.Label>

                    <Form.Control
                      className='form-input'
                      value={ref.arabicName}
                      name={`arabicName-${index}-r`}
                      onChange={handleChange}
                      as='select'
                      custom
                      dir='rtl'
                      lang='ar'
                    >
                      <option value=''>اختر المحكم</option>
                      {allRefs.map((refs) => {
                        return (
                          <option key={refs.idRefereed} value={refs.arabicName}>
                            {refs.arabicName}
                          </option>
                        )
                      })}
                    </Form.Control>
                    <Form.Control.Feedback type='invalid'>
                      من فضلك ادخل الاسم باللغة العربية فقط.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId='specialization-t'>
                    <Form.Label className='sups-refs-labels'>
                      تخصص المحكم
                    </Form.Label>

                    <Form.Control
                      className='form-input'
                      type='text'
                      value={ref.specialization}
                      name={`specialization-${index}-r`}
                      onChange={handleChange}
                      pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
                    />
                    <Form.Control.Feedback type='invalid'>
                      من فضلك ادخل التخصص باللغة العربية فقط.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col className='file'>
                  <Form.Group controlId='fileInput'>
                    <Form.Label className='sups-refs-labels'>
                      ملف التقرير
                    </Form.Label>
                    <input
                      dir='ltr'
                      lang='en'
                      type='file'
                      id='files'
                      name={`URLReport-${index}-r`}
                      value={ref.URLReport}
                      style={{ display: 'none' }}
                      onChange={handleUpload}
                    />
                    <label htmlFor='files' className='upload-label'>
                      {btnText}
                    </label>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId='cancelationDate-t'>
                    <Form.Label className='sups-refs-labels'>
                      حالة التقرير
                    </Form.Label>

                    <Form.Control
                      className='form-input'
                      type='text'
                      value={ref.reportState}
                      name={`reportState-${index}-r`}
                      onChange={handleChange}
                      pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
                    />
                    <Form.Control.Feedback type='invalid'>
                      من فضلك ادخل حالة التقرير باللغة العربية فقط.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col className='ref-rep-date-col'>
                  <Form.Group controlId='currentState-t'>
                    <Form.Label className='sups-refs-labels'>
                      تاريخ التقرير
                    </Form.Label>

                    <Form.Control
                      className='form-input ref-rep-date'
                      type='text'
                      value={ref.dateReport}
                      name={`dateReport-${index}-r`}
                      onChange={handleChange}
                      dir='ltr'
                      lang='en'
                      pattern='^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[012])/[0-9]{4}$'
                    />
                    <Form.Control.Feedback type='invalid'>
                      من فضلك ادخل التاريخ بالطريقة الصحيحة (مثال:25/02/2015)
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col className='del-col'>
                  <Form.Label
                    className='sups-refs-labels'
                    style={{ visibility: 'hidden' }}
                  >
                    وضع الإشراف
                  </Form.Label>
                  <Button
                    type='button'
                    onClick={() => deleteItem(ref.idRefereed)}
                  >
                    مسح المحكم
                  </Button>
                </Col>
              </Form.Row>
            </section>
          )
        })
      )}
      {studentRefs.length !== 0 && (
        <Form.Row className='new-row'>
          <Col className='new-col'>
            <span className='new-btn' onClick={newRef}>
              هل تريد تسجيل بيانات محكم جديد؟
            </span>
          </Col>
        </Form.Row>
      )}
    </Container>
  )
}

export default StudentRefs
