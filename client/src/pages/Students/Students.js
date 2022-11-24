import { useEffect } from "react"
import Layout from "../../components/Layout"
import styles from "./Students.module.css"
import Table from "../../components/Table"
import Pagination from "../../components/Pagination"
import { useNavigate, useSearchParams, Link } from "react-router-dom"
import useHttp from "../../utils/hooks/use-http"
import { getAllStudents } from "./students-api"
import { deleteStudentHandler } from "./students-api"
import {FaRegEdit} from "react-icons/fa"
import {AiOutlineDelete} from "react-icons/ai"

const Students = () => {
    const [params] = useSearchParams()
    const navigate = useNavigate()
    const size = params.get("size") || 3;
    let page = params.get("page") || 1;

    const {send, error, loading, data, pagination} = useHttp(getAllStudents)
    const {send: deleteStudent} = useHttp(deleteStudentHandler)
 
    useEffect(() => {
        send({page, size})
    }, [page, size])

    const deleteHandler = async (id) => {
        await deleteStudent(id)
        if(data.length === 1 && pagination.allPages !== 1){
            navigate(`/students?page=${page - 1}&size=${size}`)
        }
        send({page, size})
    }
    const studentsCols = [
        {header: "Firstname", accessor: "firstName"},
        {header: "Lastname", accessor: "lastName"},
        {header: "Birth Date", accessor: "birthDate"},
        {header: "Actions", accessor: (student) => {
            return <div>
            <Link to={`/courses/${student.id}`}><FaRegEdit/></Link> {" "}
            <AiOutlineDelete onClick={deleteHandler.bind(null, student.id)} className={styles.delete} 
            size={15} color={"blue"}/>
          </div>
        }}
    ]
    
    return (
        <>
        <Layout title="Teachers">
        <div className={styles.container}>
        <Link to="/students/new">
            Add teachers
        </Link>
        {loading&&"Loading"}
        {(!loading&&error)&&error}
        {!error&&!loading&&data&&<Table cols={studentsCols} data={data} />}
        <Pagination route={`students`} pagination={pagination} size={size} page={page} url={"students"} />
        </div>
        </Layout>
        </>
      );
}
 
export default Students;