import axios from "axios"
import { useEffect, useState } from "react"
import { useCallback } from "react"
import { toast } from "react-toastify"
import Table from "../../components/Table"
import useHttp from "../../utils/hooks/use-http"
import { deleteStudentHandler } from "../Students/students-api"
import Layout from "../../components/Layout";
import { Link, useParams} from "react-router-dom"
import { getAllCourses} from "../Courses/courses-api"

const CourseStudents = () => {
    const id = useParams().id

    const [selectedStudents, setSelectedStudents] = useState([])
    const {error, loading} = useHttp(getAllCourses)
    const {send: deleteStudent} = useHttp(deleteStudentHandler)

    useEffect(()=>{
        getStudents()
    },[])

    const getStudents = useCallback(async () => {
        const res = await axios.get(`http://localhost:8080/api/v1/courses/${id}/students`)
        setSelectedStudents(res.data.data.byIdStudents.students)    
    })
    const deleteHandler = async (id) => {
        try {
            deleteStudent(id)
            toast.success("Teacher deleted")
            getStudents()
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    const courseStudentsCols = [
        {header: "Firstname", accessor: "firstName"},
        {header: "Lastname", accessor: "lastName"},
        {header: "Birth Date", accessor: "birthDate"},
        {header: "Actions", accessor: (cs)=> {
            return <div>
                <Link to={`/students/${cs.id}`}>Edit</Link>
                <button onClick={deleteHandler.bind(null, cs.id)}>Delete</button>
            </div>
        }}
    ]
    return ( 
        <>
            <Layout title="Teachers">
            {loading&&"Loading"}
            {(!loading&&error)&&error}
            {!error&&!loading&&
            <Table cols={courseStudentsCols} data={selectedStudents} />}
            </Layout>
        </>
     );
}
 
export default CourseStudents;