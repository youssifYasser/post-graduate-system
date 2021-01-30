import React, { useContext, useState, useReducer } from 'react'

const AppContext = React.createContext()

// const reducer = (state, action) => {
//   if (action.type === 'HANDLE_SUBMIT') {
//     action.payload.preventDefault()
//     const form = action.payload.currentTarget
//     if (form.checkValidity() === false) {
//       action.payload.stopPropagation()
//       state.validated = true
//       const {page, validated, studentNumber } = state
//       console.log(page, validated, studentNumber)
//       //return { ...state, validated: true }
//     } else {
//       state.validated = true
//       switch (state.page) {
//         case 1:
//         case 2:
//           //state.page = state.page + 1
//           return { ...state, page: state.page + 1 }
//         case 3:
//           //   state.studentNumber = state.studentNumber + 1
//           //   state.page = state.page + 1
//           return {
//             ...state,
//             studentNumber: state.studentNumber + 1,
//             page: state.page + 1,
//           }
//       }
//       return { ...state, validated: true }
//     }
//   }
//   return state
// }

// const initialState = {
//   students: [],
//   validated: false,
//   showUpload: true,
//   page: 1,
//   studentNumber: 0,
//   personalData: {},
//   thesisData: {},
//   uniDegrees: [],
// }

const AppProvider = ({ children }) => {
  //const [state, dispatch] = useReducer(reducer, initialState)
  const [page, setPage] = useState(1)
  const [studentNumber, setStudentNumber] = useState(0)
  const [validated, setValidated] = useState(false)
  const [personalInfo, setPersonalInfo] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = e.currentTarget
    if (form.checkValidity() === false) {
      e.stopPropagation()
      setValidated(true)
    } else {
      setValidated(true)
      switch (page) {
        case 1:
        case 2:
          setPage(page + 1)
          break
        case 3:
          setStudentNumber(studentNumber + 1)
          setPage(1)
          break
      }
      setValidated(false)
    }
  }

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    const type = e.target.type
    const checked = e.target.checked
    type === 'checkbox'
      ? setPersonalInfo({ ...personalInfo, [name]: checked })
      : setPersonalInfo({ ...personalInfo, [name]: value })
  }

  return (
    <AppContext.Provider
      value={{
        validated,
        studentNumber,
        page,
        setStudentNumber,
        setPage,
        handleSubmit,
        handleChange,
        personalInfo,
        setPersonalInfo,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
