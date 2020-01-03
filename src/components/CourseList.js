import React, { Component } from 'react';
import {Grid, TextField} from '@material-ui/core';
import * as contentful from 'contentful';
import Course from './Course'

const SPACE_ID = '1j6np871ses9';
const ACCESS_TOKEN = 'VpKanQiqZVrYVvJQ2x5K6jkpztEGUuWNCFyRO2EMNmU';

const client = contentful.createClient({
    space: SPACE_ID,
    accessToken: ACCESS_TOKEN
});

export default class CourseList extends Component {
    
    constructor() {
        super();
        this.state = {
            courses: [],
            searchString: ''
        }      
    }
    
    getCourses = () => {
        client.getEntries({
            content_type: 'course',
            query: this.state.searchString
        })
        .then((response) => {
            if(response.items) {
                this.setState({ courses: response.items })
            }
        })
        .catch((error) => {
            console.log("Error occured while fetching data");
            console.log(error);
        })
    }

    onSearchInputChange = (event) => {
        console.log("search text", event.target.value)
        if (event.target.value) {
            this.setState({ searchString: event.target.value });
        } else {
            this.setState({ searchString: '' });
        }
        this.getCourses();
    }

    componentDidMount() {
        this.getCourses();
    }

    render() {
        return (
            <div>
                { this.state.courses.length > 0 ? (
                    <div>
                        <TextField style={{padding: 24}}
                            id="searchInput"
                            placeholder="Search for Courses"
                            margin="normal"
                            onChange={this.onSearchInputChange} />
                                
                        <Grid container spacing={24} style={{padding:24}}>
                            { this.state.courses.map(currentCourse => (
                                <Grid item xs={12} sm={6} lg={4} xl={3}>
                                    <Course course={currentCourse} />
                                </Grid>  
                            ))}
                        </Grid>
                    </div>
                ) : "No courses found" }
            </div>
        )
    }
}
