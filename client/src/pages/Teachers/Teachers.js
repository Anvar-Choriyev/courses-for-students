import { useEffect } from "react"
import Layout from "../../components/Layout"
import styles from "./Teachers.module.css"
import Table from "../../components/Table"
import Pagination from "../../components/Pagination"
import { useNavigate, useSearchParams, Link } from "react-router-dom"
import useHttp from "../../utils/hooks/use-http"
import { deleteTeacherHandler, getAllTeachers } from "./teachers-api"
import {FaRegEdit} from "react-icons/fa"
import {AiOutlineDelete} from "react-icons/ai"

const Teachers = () => {
    const [params] = useSearchParams()
    const navigate = useNavigate()
    const size = params.get("size") || 3;
    let page = params.get("page") || 1;

    const {send, error, loading, data, pagination} = useHttp(getAllTeachers)
    const {send: deleteTeacher} = useHttp(deleteTeacherHandler)
 
    useEffect(() => {
        send({page, size})
    }, [page, size])

    const deleteHandler = async (id) => {
        await deleteTeacher(id)
        if(data.length === 1 && pagination.allPages !== 1){
            navigate(`/teachers?page=${page - 1}&size=${size}`)
        }
        send({page, size})
    }
    const teacherCols = [
        {header: "Ismi", accessor: "firstName"},
        {header: "Familiyasi", accessor: "lastName"},
        {header: "Sharifi", accessor: "patronymic"},
        {header: "Telefon raqami", accessor: "phoneNumber"},
        {header: "Manzili", accessor: "address"},
        {header: "Actions", accessor: (teacher) => {
            return <div>
            <Link to={`/teachers/${teacher.id}`}><FaRegEdit/></Link> {" "}
            <AiOutlineDelete onClick={deleteHandler.bind(null, teacher.id)} className={styles.delete} 
            size={15} color={"blue"}/>
          </div>
        }}
    ]
    
    return (
        <>
        <Layout title="Teachers">
        <div className={styles.container}>
        <Link to="/teachers/new">
            O'qituvchi qo'shish
        </Link>
        {loading&&"Loading"}
        {(!loading&&error)&&error}
        {!error&&!loading&&data&&<Table cols={teacherCols} data={data} />}
        <Pagination route={`teachers`} pagination={pagination} size={size} page={page} url={"teachers"} />
        </div>
        </Layout>
        </>
      );
}
 
export default Teachers;