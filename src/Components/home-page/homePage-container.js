import React, { useState, useEffect } from 'react'
import axios from 'axios'

import HomePageView from './homePage-view'

const HomePage = () => {
    const [active, setActive] = useState({ student: 'active', studies: '', dep: '', supervisor: '', referee: '' })
    const [section, setSection] = useState(1)
    const [stats, setStats] = useState({})

    const handleChange = (event) => {
        const { name } = event.target
        setActive({ [name]: 'active' })
        switch (name) {
            case 'student':
                setSection(1)
                break;
            case 'studies':
                setSection(2)
                break;
            case 'dep':
                setSection(3)
                break;
            case 'supervisor':
                setSection(4)
                break;
            case 'referee':
                setSection(5)
                break;
            default:
                break;
        }
    }

    const convertToComa = (x)=>{
        console.log(x)
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    useEffect(() => {
        const stats = {
          url: 'http://localhost:8000/api/appinfo',
          method: 'get',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
          },
        }
        axios(stats)
          .then((response) => {
            setStats({...response.data})
          })
          .catch((err) => {
            console.log(err)
          })
      }, [])
    return (
        <HomePageView
            handleChange={handleChange}
            active={active}
            section={section}
            convertToComa={convertToComa}
            stats={stats}
        />
    )
}

export default HomePage;
