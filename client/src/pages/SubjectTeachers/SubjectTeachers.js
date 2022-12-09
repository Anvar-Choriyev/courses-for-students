import axios from "axios"
import { useEffect, useState } from "react"
import { useCallback } from "react"
import { toast } from "react-toastify"
import Table from "../../components/Table"
import useHttp from "../../utils/hooks/use-http"
import { deleteTeacherHandler } from "../Teachers/teachers-api"
import Layout from "../../components/Layout";
import { Link, useParams} from "react-router-dom"
import { getAllSubjects} from "../Subjects/subjects-api"

const SubjectTeachers = () => {
    const id = useParams().id

    const [selectedTeachers, setSelectedTeachers] = useState([])
    const {error, loading} = useHttp(getAllSubjects)
    const {send: deleteTeacher} = useHttp(deleteTeacherHandler)

    useEffect(()=>{
        getTeachers()
        getArticles()
        getLiteratures()
        getCertificates()
    },[])

    const getTeachers = useCallback(async () => {
        const res = await axios.get(`http://localhost:8080/api/v1/subjects/${id}/teachers`)
        setSelectedTeachers(res.data.data.byIdTeachers.teachers)    
    })
    const getArticles = useCallback(async () => {
        const res = await axios.get(`http://localhost:8080/api/v1/articles/${id}/teachers`)
        setSelectedTeachers(res.data.data.byIdTeachers.teachers)    
    })
    const getLiteratures = useCallback(async () => {
        const res = await axios.get(`http://localhost:8080/api/v1/literatures/${id}/teachers`)
        setSelectedTeachers(res.data.data.byIdTeachers.teachers)    
    })
    const getCertificates = useCallback(async () => {
        const res = await axios.get(`http://localhost:8080/api/v1/certificates/${id}/teachers`)
        setSelectedTeachers(res.data.data.byIdTeachers.teachers)    
    })
    const deleteHandler = async (id) => {
        try {
            deleteTeacher(id)
            toast.success("Teacher deleted")
            getTeachers()
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    const subjectTeacherCols = [
        {header: "Ismi", accessor: "firstName"},
        {header: "Familiyasi", accessor: "lastName"},
        {header: "Sharifi", accessor: "patronymic"},
        {header: "Telefon raqami", accessor: "phoneNumber"},
        {header: "Manzili", accessor: "address"},
        {header: "Actions", accessor: (st)=> {
            return <div>
                <Link to={`/teachers/${st.id}`}>Edit</Link>
                <button onClick={deleteHandler.bind(null, st.id)}>Delete</button>
            </div>
        }}
    ]
    return ( 
        <>
            <Layout title="Teachers">
            {loading&&"Loading"}
            {(!loading&&error)&&error}
            {!error&&!loading&&
            <Table cols={subjectTeacherCols} data={selectedTeachers} />}
            </Layout>
        </>
     );
}
 
export default SubjectTeachers;