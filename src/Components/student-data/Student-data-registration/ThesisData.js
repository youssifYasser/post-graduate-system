import React, { useState, useEffect } from 'react'
import { Col, Form, Container, Button } from 'react-bootstrap'
import './ThesisData.css'

const ThesisData = ({
  thesisData,
  setThesisData,
  handleChange,
  departments,
  isEditing,
}) => {
  // const [thesis, setThesis] = useState(academicThesisData)
  // const handleChange = (e) => {
  //   const { name, value } = e.target
  //   setThesisData({ ...thesisData, [name]: value })
  // }

  // React.useEffect(() => {
  //   setThesisData(thesis)
  // }, [thesis])

  return (
    <Container className={`form-three animate__animated animate__fadeIn`}>
      <h5 className='title'> بيانات الرسالة</h5>
      <section className='section'>
        <Form.Row>
          <Col md={{ span: 5, offset: 2 }} sm={6}>
            <Form.Group controlId='studyType'>
              <Form.Label>نوع الدراسة</Form.Label>
              <Form.Control
                className='form-input'
                as='select'
                name='sciDegree-t'
                value={thesisData.sciDegree}
                onChange={handleChange}
                pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
                custom
                required
              >
                <option value=''>اختر نوع الدراسة</option>
                <option value='دبلومة الدراسات العليا'>
                  دبلومة الدراسات العليا
                </option>
                <option value='تمهيدي الماجستير'>تمهيدي الماجستير</option>
                <option value='الماجستير في العلوم'>الماجستير في العلوم</option>
                <option value='دكتوراه الفلسفة في العلوم'>
                  دكتوراه الفلسفة في العلوم
                </option>
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
                className='form-input'
                type='number'
                name='toeflGrade-t'
                value={thesisData.toeflGrade}
                onChange={handleChange}
                dir='ltr'
                lang='en'
              />
              <Form.Control.Feedback type='invalid'>
                من فضلك أدخل الدرجة بالطريقة الصحيحة (ارقام فقط).
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Form.Row>
        <Form.Row>
          <Col md={{ span: 5, offset: 2 }} sm={6}>
            <Form.Group controlId='department'>
              <Form.Label>
                {thesisData.sciDegree === 'دبلومة الدراسات العليا'
                  ? 'القسم التابعة له هذه الدبلومة'
                  : thesisData.sciDegree === 'تمهيدي الماجستير'
                  ? 'القسم التابعة له دراسة تمهيدي الماجستير'
                  : 'القسم التابعة له هذه الرسالة'}
              </Form.Label>
              <Form.Control
                className='form-input'
                as='select'
                name='department-t'
                value={thesisData.department}
                onChange={handleChange}
                pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
                custom
                required
              >
                <option value=''>اختر القسم</option>
                {departments.map((dept) => {
                  return (
                    <option key={dept.idDept} value={dept.arabicName}>
                      {dept.arabicName}
                    </option>
                  )
                })}
              </Form.Control>
              <Form.Control.Feedback type='invalid'>
                من فضلك أدخل اسم القسم باللغة العربية فقط.
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          {/*start from here  */}
          <Col md={5} sm={6}>
            {thesisData.sciDegree === 'تمهيدي الماجستير' ||
            thesisData.sciDegree === 'دبلومة الدراسات العليا' ? (
              <Form.Group controlId='diplomaTitle'>
                <Form.Label>
                  {thesisData.sciDegree === 'دبلومة الدراسات العليا'
                    ? 'عنوان الدبلومة'
                    : 'عنوان تمهيدي الماجستير'}
                </Form.Label>
                <Form.Control
                  className='form-input'
                  type='text'
                  name='arabicTitle-t'
                  value={thesisData.arabicTitle}
                  onChange={handleChange}
                  pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
                  required
                />

                <Form.Control.Feedback type='invalid'>
                  {thesisData.sciDegree === 'دبلومة الدراسات العليا'
                    ? 'من فضلك أدخل عنوان الدبلومة باللغة العربية فقط.'
                    : ' من فضلك أدخل عنوان تمهيدي الماجستير باللغة العربية فقط.'}
                </Form.Control.Feedback>
              </Form.Group>
            ) : (
              <Form.Group controlId='department'>
                <Form.Label>التخصص التابعة له هذه الرسالة</Form.Label>
                <Form.Control
                  className='form-input'
                  as='select'
                  name='spec-t'
                  value={thesisData.spec}
                  onChange={handleChange}
                  pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
                  custom
                  required
                >
                  <option value=''>اختر التخصص</option>

                  {thesisData.department === 'قسم الفيزياء' && (
                    <>
                      <option value='الفيزياء النووية'>الفيزياء النووية</option>
                      <option value='الإلكترونيات'>الإلكترونيات</option>
                      <option value='فيزياء الجوامد'>فيزياء الجوامد</option>
                      <option value='الفيزياء النظرية'>الفيزياء النظرية</option>
                      <option value='الضوء والطيف'>الضوء والطيف</option>
                      <option value='الفيزياء الحيوية'>الفيزياء الحيوية</option>
                    </>
                  )}

                  {thesisData.department === 'قسم الكيمياء' && (
                    <>
                      <option value='الكيمياء العضوية'>الكيمياء العضوية</option>
                      <option value='الكيمياء غيرالعضوية والتحليلية'>
                        الكيمياء غيرالعضوية والتحليلية
                      </option>
                      <option value='الكيمياء الفيزيائية'>
                        الكيمياء الفيزيائية
                      </option>{' '}
                    </>
                  )}

                  {thesisData.department === 'قسم الكيمياء الحيوية' && (
                    <>
                      <option value='كيمياء حيوية تمثيل غذائى عام'>
                        كيمياء حيوية تمثيل غذائى عام
                      </option>
                      <option value='كيمياء حيوية الخلية'>
                        كيمياء حيوية الخلية
                      </option>
                    </>
                  )}
                  {thesisData.department === 'قسم علم الحشرات' && (
                    <>
                      <option value='التصنيف والبيئـــــة'>
                        التصنيف والبيئـــــة
                      </option>
                      <option value='وظائف الأعضــاء'>وظائف الأعضــاء</option>
                      <option value='التوكسيكولوجى والمكافحة'>
                        التوكسيكولوجى والمكافحة
                      </option>
                      <option value='الحشرات الناقلة للأمراض والميكروبيولوجيا'>
                        الحشرات الناقلة للأمراض والميكروبيولوجيا
                      </option>
                    </>
                  )}
                  {thesisData.department === 'قسم الرياضيات' && (
                    <>
                      <option value='الرياضة البحتــــة'>
                        الرياضة البحتــــة
                      </option>
                      <option value='الرياضة التطبيقيـة'>
                        الرياضة التطبيقيـة
                      </option>
                      <option value='الإحصاء الرياضــى'>
                        الإحصاء الرياضــى
                      </option>
                      <option value='علوم الحاسبــات'>علوم الحاسبــات</option>
                    </>
                  )}
                  {thesisData.department === 'قسم الجيولوجيا' && (
                    <>
                      <option value='المعادن والصخور'>المعادن والصخور</option>
                      <option value='الحفريات والطبقات'>
                        الحفريات والطبقات
                      </option>
                      <option value='الجيولوجيا التركيبية'>
                        الجيولوجيا التركيبية
                      </option>
                      <option value='الهيدروجيولوجيا'>الهيدروجيولوجيا</option>
                    </>
                  )}
                  {thesisData.department === 'قسم الجيوفيزياء' && (
                    <>
                      <option value='طرق الجهد'>طرق الجهد</option>
                      <option value='الطرق السيزمية والزلزالية'>
                        الطرق السيزمية والزلزالية
                      </option>
                      <option value='التقويم الجيوفيزيقى للخزانات'>
                        التقويم الجيوفيزيقى للخزانات
                      </option>
                    </>
                  )}
                  {thesisData.department === 'قسم علم الحيوان' && (
                    <>
                      <option value='الفقاريــات'>الفقاريــات</option>
                      <option value='اللافقاريـــات'>اللافقاريـــات</option>
                      <option value='الفسيولوجى'>الفسيولوجى</option>
                      <option value='الأنسجة والخلية'>الأنسجة والخلية</option>
                    </>
                  )}
                  {thesisData.department === 'قسم علم النبات' && (
                    <>
                      <option value='النبـــــــات'>النبـــــــات</option>
                    </>
                  )}
                  {thesisData.department === 'قسـم الميكروبيولوجى' && (
                    <>
                      <option value='الميكروبيولوجـــى'>
                        الميكروبيولوجـــى
                      </option>
                    </>
                  )}
                </Form.Control>
                <Form.Control.Feedback type='invalid'>
                  من فضلك أدخل اسم التخصص باللغة العربية فقط.
                </Form.Control.Feedback>
              </Form.Group>
            )}
          </Col>
        </Form.Row>
        <Form.Row>
          <Col md={{ span: 5, offset: 2 }} sm={6}>
            {thesisData.sciDegree === 'دكتوراه الفلسفة في العلوم' ||
            thesisData.sciDegree === 'الماجستير في العلوم' ? (
              <Form.Group controlId='arThesis'>
                <Form.Label>عنوان الرسالة باللغة العربية</Form.Label>
                <Form.Control
                  className='form-input'
                  type='text'
                  name='arabicTitle-t'
                  value={thesisData.arabicTitle}
                  onChange={handleChange}
                  pattern='^[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF ]+$'
                  required
                />
                <Form.Control.Feedback type='invalid'>
                  من فضلك أدخل عنوان الرسالة باللغة العربية فقط.
                </Form.Control.Feedback>
              </Form.Group>
            ) : (
              <Form.Group controlId='courses'>
                <Form.Label>دراسات إضافية ببيان من القسم (إن وجدت)</Form.Label>
                <Form.Control
                  className='form-input'
                  type='text'
                  name='requiredCourses-t'
                  value={thesisData.requiredCourses}
                  onChange={handleChange}
                />
              </Form.Group>
            )}
          </Col>
          {(thesisData.sciDegree === 'دكتوراه الفلسفة في العلوم' ||
            thesisData.sciDegree === 'الماجستير في العلوم') && (
            <Col md={5} sm={6}>
              <Form.Group controlId='enThesis'>
                <Form.Label>عنوان الرسالة باللغة الإنجليزية</Form.Label>
                <Form.Control
                  className='form-input'
                  type='text'
                  name='englishTitle-t'
                  value={thesisData.englishTitle}
                  onChange={handleChange}
                  pattern='^[a-zA-Z0-9$@$!%*?&#^-_. +]+$'
                  dir='ltr'
                  lang='en'
                  required
                />
                <Form.Control.Feedback type='invalid'>
                  من فضلك أدخل عنوان الرسالة باللغة الإنجليزية فقط.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          )}
        </Form.Row>

        {thesisData.sciDegree === ''}
        {(thesisData.sciDegree === 'دكتوراه الفلسفة في العلوم' ||
          thesisData.sciDegree === 'الماجستير في العلوم') && (
          <Form.Row>
            <Col md={{ span: 5, offset: 2 }} sm={6}>
              <Form.Group controlId='courses'>
                <Form.Label>دراسات إضافية ببيان من القسم (إن وجدت)</Form.Label>
                <Form.Control
                  className='form-input'
                  type='text'
                  name='requiredCourses-t'
                  value={thesisData.requiredCourses}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Form.Row>
        )}
      </section>
      <Form.Row>
        <Col>
          <Button type='button' className='new-reg-email'>
            إرسال بريد إلكتروني للطالب لتسجيل رسالة جديدة
          </Button>
        </Col>
      </Form.Row>
      <hr></hr>
      {isEditing && (
        <>
          <h5 className='title'> تواريــخ هامــة</h5>
          <section className='section'>
            <Form.Row>
              <Col md={{ span: 5, offset: 2 }} sm={6}>
                <Form.Group controlId='submition-date'>
                  <Form.Label>تاريخ تسجيل الاستمارة</Form.Label>
                  <Form.Control
                    className='form-input'
                    type='text'
                    placeholder='dd/mm/yyyy'
                    name='formDate-t'
                    value={thesisData.formDate}
                    onChange={handleChange}
                    pattern='^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[-/.](19|20)\d\d$'
                    dir='ltr'
                  />
                  <Form.Control.Feedback type='invalid'>
                    من فضلك ادخل التاريخ بالطريقة الصحيحة (مثال:25/02/2015)
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={5} sm={6}>
                <Form.Group controlId='dept-accept-date'>
                  <Form.Label>تاريخ موافقة القسم</Form.Label>
                  <Form.Control
                    className='form-input'
                    type='text'
                    placeholder='dd/mm/yyyy'
                    dir='ltr'
                    name='departmentApprovalDateRegistration-t'
                    value={thesisData.departmentApprovalDateRegistration}
                    onChange={handleChange}
                    pattern='^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[-/.](19|20)\d\d$'
                  />
                  <Form.Control.Feedback type='invalid'>
                    من فضلك ادخل التاريخ بالطريقة الصحيحة (مثال:25/02/2015)
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col md={{ span: 5, offset: 2 }} sm={6}>
                <Form.Group controlId='fac-accept-date'>
                  <Form.Label>تاريخ موافقة الكلية</Form.Label>
                  <Form.Control
                    className='form-input'
                    type='text'
                    placeholder='dd/mm/yyyy'
                    name='facultyApprovalDateRegistration-t'
                    value={thesisData.facultyApprovalDateRegistration}
                    onChange={handleChange}
                    pattern='^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[-/.](19|20)\d\d$'
                    dir='ltr'
                  />
                  <Form.Control.Feedback type='invalid'>
                    من فضلك ادخل التاريخ بالطريقة الصحيحة (مثال:25/02/2015)
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={5} sm={6}>
                <Form.Group controlId='com-accept-date'>
                  <Form.Label>تاريخ موافقة لجنة الدراسات</Form.Label>
                  <Form.Control
                    className='form-input'
                    type='text'
                    placeholder='dd/mm/yyyy'
                    dir='ltr'
                    name='universitydepartmentApprovalDateRegistration-t'
                    value={
                      thesisData.universitydepartmentApprovalDateRegistration
                    }
                    onChange={handleChange}
                    pattern='^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[-/.](19|20)\d\d$'
                  />
                  <Form.Control.Feedback type='invalid'>
                    من فضلك ادخل التاريخ بالطريقة الصحيحة (مثال:25/02/2015)
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Form.Row>
            <Form.Row>
              <Col md={{ span: 5, offset: 2 }} sm={6}>
                <Form.Group controlId='uni-accept-date'>
                  <Form.Label>تاريخ موافقة الجامعة</Form.Label>
                  <Form.Control
                    className='form-input'
                    type='text'
                    placeholder='dd/mm/yyyy'
                    name='universitydepartmentApprovalDateRegistration-t'
                    value={
                      thesisData.universitydepartmentApprovalDateRegistration
                    }
                    onChange={handleChange}
                    pattern='^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[-/.](19|20)\d\d$'
                    dir='ltr'
                  />
                  <Form.Control.Feedback type='invalid'>
                    من فضلك ادخل التاريخ بالطريقة الصحيحة (مثال:25/02/2015)
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col md={5} sm={6}>
                <Form.Group controlId='form-status'>
                  <Form.Label>وضع الاستمارة</Form.Label>
                  <Form.Control
                    className='form-input'
                    type='text'
                    name='currentState-t'
                    value={thesisData.currentState}
                    onChange={handleChange}
                    as='select'
                    custom
                  >
                    <option value=''>اختر وضع الاستمارة</option>
                    <option value='سارية'>سارية</option>
                    <option value='أجيزت'>أجيزت</option>
                    <option value='موقوفة'>موقوفة</option>
                    <option value='ملغية'>ملغية</option>
                  </Form.Control>
                </Form.Group>
              </Col>
            </Form.Row>
          </section>{' '}
        </>
      )}
    </Container>
  )
}

export default ThesisData
