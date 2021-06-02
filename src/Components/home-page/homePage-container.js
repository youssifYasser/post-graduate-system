import React, { useState } from 'react'

import HomePageView from './homePage-view'

const HomePage = () => {
    const [active, setActive] = useState({ student: 'active', studies: '', dep: '', supervisor: '', referee: '' })
    const [section, setSection] = useState(1)
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
    return (
        <HomePageView
            handleChange={handleChange}
            active={active}
            section={section}
        />
    )
}

export default HomePage;
