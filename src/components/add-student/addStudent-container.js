import React, { Component } from 'react';

import AddStudentView from './addStudent-view';

class AddStudent extends Component {
    state = {
        NameInArabic: '',
        Email: '',
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState({[name]: value});
    }

    render() {
        return(
            <AddStudentView 
                state = {this.state}
                handleChange = {this.handleChange}
            />
        )
    }
}

export default AddStudent;
