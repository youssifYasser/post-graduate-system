import React, { useState } from 'react'
import { Col, Form, Container } from 'react-bootstrap'
import './ThesisData.css'

const ThesisData = ({ academicThesisData, setThesisData, className }) => {
  const [thesis, setThesis] = useState(academicThesisData)
  const handleChange = (e) => {
    const { name, value } = e.target
    setThesis({ ...thesis, [name]: value })
  }
  console.log(thesis)
  React.useEffect(() => {
    setThesisData(thesis)
  }, [thesis])

  return (
    <>
      <Container className={`form-three ${className}`}>
        <h5 className='title'> بيانات الرسالة</h5>
        <section className='section'>
          <Form.Row>
            <Col md={{ span: 5, offset: 2 }} sm={6}>
              <Form.Group controlId='studyType'>
                <Form.Label>نوع الدراسة</Form.Label>
                <Form.Control
                  className='form-input'
                  as='select'
                  name='registerationType'
                  value={thesis.registerationType}
                  onChange={handleChange}
                  pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
                  custom
                >
                  <option>دبلومة الدراسات العليا</option>
                  <option>تمهيدي الماجستير</option>
                  <option>الماجستير في العلوم</option>
                  <option>دكتوراه الفلسفة في العلوم</option>
                </Form.Control>
                <Form.Control.Feedback type='invalid'>
                  من فضلك أدخل نوع الدراسة بالطريقة الصحيحة.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={5} sm={6}>
              <Form.Group controlId='TOEFL'>
                <Form.Label>درجة امتحان التويفل - TOEFL</Form.Label>
                <Form.Control
                  className='form-input form-english'
                  type='number'
                  name='toeflDegree'
                  value={thesis.toeflDegree}
                  onChange={handleChange}
                />
                <Form.Control.Feedback type='invalid'>
                  من فضلك أدخل الدرجة بالطريقة الصحيحة (ارقام فقط).
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Form.Row>
          <Form.Row>
            <Col md={{ span: 5, offset: 2 }} sm={6}>
              {(thesis.registerationType === 'تمهيدي الماجستير' ||
                thesis.registerationType === 'دبلومة الدراسات العليا') && (
                <Form.Group controlId='department'>
                  <Form.Label>
                    {thesis.registerationType === 'دبلومة الدراسات العليا'
                      ? 'القسم التابعة له هذه الدبلومة'
                      : 'القسم التابعة له دراسة تمهيدي الماجستير'}
                  </Form.Label>
                  <Form.Control
                    className='form-input'
                    as='select'
                    name='department'
                    value={thesis.department}
                    onChange={handleChange}
                    pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
                    custom
                  >
                    <option>قسم الفيزياء</option>
                    <option>قسم الكيمياء</option>
                    <option>قسم الكيمياء الحيوية</option>
                    <option>قسم علم الحشرات</option>
                    <option>قسم الرياضيات</option>
                    <option>قسم الجيولوجيا</option>
                    <option>قسم الجيوفيزياء</option>
                    <option>قسم علم الحيوان</option>
                    <option>قسم علم النبات</option>
                  </Form.Control>
                  <Form.Control.Feedback type='invalid'>
                    من فضلك أدخل اسم القسم باللغة العربية فقط.
                  </Form.Control.Feedback>
                </Form.Group>
              )}
              {thesis.registerationType === 'تمهيدي الماجستير' ||
                thesis.registerationType === 'دبلومة الدراسات العليا' || (
                  <Form.Group controlId='arThesis'>
                    <Form.Label>عنوان الرسالة باللغة العربية</Form.Label>
                    <Form.Control
                      className='form-input'
                      type='text'
                      name='arabicTitle'
                      value={thesis.arabicTitle}
                      onChange={handleChange}
                      pattern='^[\u0621-\u064A0-9 ]+$'
                    />
                    <Form.Control.Feedback type='invalid'>
                      من فضلك أدخل عنوان الرسالة باللغة العربية فقط.
                    </Form.Control.Feedback>
                  </Form.Group>
                )}
            </Col>
            <Col md={5} sm={6}>
              {thesis.registerationType === 'تمهيدي الماجستير' ||
              thesis.registerationType === 'دبلومة الدراسات العليا' ? (
                <Form.Group controlId='diplomaTitle'>
                  <Form.Label>
                    {thesis.registerationType === 'دبلومة الدراسات العليا'
                      ? 'عنوان الدبلومة'
                      : 'عنوان تمهيدي الماجستير'}
                  </Form.Label>
                  <Form.Control
                    className='form-input'
                    type='text'
                    name='diplomaTitle'
                    value={thesis.diplomaTitle}
                    onChange={handleChange}
                    pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
                  />

                  <Form.Control.Feedback type='invalid'>
                    {thesis.registerationType === 'دبلومة الدراسات العليا'
                      ? 'من فضلك أدخل عنوان الدبلومة باللغة العربية فقط.'
                      : ' من فضلك أدخل عنوان تمهيدي الماجستير باللغة العربية فقط.'}
                  </Form.Control.Feedback>
                </Form.Group>
              ) : (
                <Form.Group controlId='enThesis'>
                  <Form.Label>عنوان الرسالة باللغة الإنجليزية</Form.Label>
                  <Form.Control
                    className='form-input form-english'
                    type='text'
                    name='englishTitle'
                    value={thesis.englishTitle}
                    onChange={handleChange}
                    pattern='^[a-zA-Z0-9$@$!%*?&#^-_. +]+$'
                  />
                  <Form.Control.Feedback type='invalid'>
                    من فضلك أدخل عنوان الرسالة باللغة الإنجليزية فقط.
                  </Form.Control.Feedback>
                </Form.Group>
              )}
            </Col>
          </Form.Row>
          <Form.Row>
            {(thesis.registerationType === 'دكتوراه الفلسفة في العلوم' ||
              thesis.registerationType === 'الماجستير في العلوم') && (
              <Col md={{ span: 5, offset: 2 }} sm={6}>
                <Form.Group controlId='department'>
                  <Form.Label>التخصص التابعة له هذه الرسالة</Form.Label>
                  <Form.Control
                    className='form-input'
                    as='select'
                    name='department'
                    value={thesis.department}
                    onChange={handleChange}
                    pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
                    custom
                  >
                    <option>الرياضة البحتــــة</option>
                    <option>الرياضة التطبيقيـة</option>
                    <option>الإحصاء الرياضــى</option>
                    <option>علوم الحاسبــات</option>
                    <option>قسم الفيزيـــــــاء</option>
                    <option>الكيميــــــاء</option>
                    <option>الكيمياء الحيويـــة</option>
                    <option>النبـــــــات</option>
                    <option>الميكروبيولوجـــى</option>
                    <option>الحيــــــوان</option>
                    <option>الحشــــــرات</option>
                    <option>الجيولوجيــــا</option>
                    <option>الجيوفيـــــزياء</option>
                    <option>الفيزياء الحيويـة</option>
                  </Form.Control>
                  <Form.Control.Feedback type='invalid'>
                    من فضلك أدخل اسم التخصص باللغة العربية فقط.
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            )}
            <Col md={5} sm={6}>
              <Form.Group controlId='courses'>
                <Form.Label>المقررات الملتحقة بالدراسة</Form.Label>
                <Form.Control
                  className='form-input'
                  type='text'
                  name='courses'
                  value={thesis.courses}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Form.Row>
        </section>
      </Container>
    </>
  )
}

export default ThesisData
