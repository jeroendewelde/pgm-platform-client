import { useQuery } from '@apollo/client'
import React, { ReactElement } from 'react'
import { GET_ALL_COURSES } from '../../graphql/courses'
import { CourseDataInside, CourseInfo, CoursesData } from '../../interfaces'

interface Props {
    
}

export default function CourseList({}: Props): ReactElement {

    // const { data, loading, error } = useQuery<CoursesData>(GET_ALL_COURSES);

    // if(loading) return <p>Loading...</p>
    // if(error) return <p>Error....</p>
    // console.log('error',error);

    // if(!loading && data) {
    //     console.log(data);
    //     return (
    //         <ul>
    //             {data.courses.data.map(course => (
    //                 <li key={course.attributes.name}>
    //                     {course.attributes.name}<br/>
    //                     {course.attributes.periode}<br/>
    //                     {course.attributes.description}</li>
    //             ))}
    //         </ul>
    //     )
    // }


    return (
        <div>
            .... component ....
        </div>
    )
}
