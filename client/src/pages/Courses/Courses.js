import { useEffect } from "react"
import Layout from "../../components/Layout"
import "./Courses.module.css"
import Table from "../../components/Table"
import Pagination from "../../components/Pagination"
import styles from "./Courses.module.css"
import { deleteCourseHandler } from "./courses-api"
import useHttp from "../../utils/hooks/use-http"
import { getAllCourses} from "./courses-api"
import { useSearchParams, useNavigate, Link} from "react-router-dom"
import {FaRegEdit} from "react-icons/fa"
import {AiOutlineDelete} from "react-icons/ai"
import ImageForm from "../../components/ImageForm"

const Courses = () => {
    const [params] = useSearchParams()
    const navigate = useNavigate()
    const size = params.get("size") || 3;
    let page = params.get("page") || 1;

    const {send, error, loading, data, pagination} = useHttp(getAllCourses)
    const {send: deleteCourse} = useHttp(deleteCourseHandler)

    useEffect(() => {
        send({page, size})
    }, [page, size])

    const deleteHandler = async (id) => {
        await deleteCourse(id)
        if(data.length === 1 && pagination.allPages !== 1){
            navigate(`/courses?page=${page - 1}&size=${size}`)
        }
        send({page,size})
    }
    const courseCols = [
        {header: "Name", accessor: (item)=> <Link to={`/courses/${item.id}/students`}>{item.name}</Link>},
        {header: "Description", accessor: "description"},
        {header: "Actions", accessor: (course)=>{
          return <div>
            <Link to={`/courses/${course.id}`}><FaRegEdit/></Link> {" "}
            <AiOutlineDelete onClick={deleteHandler.bind(null, course.id)} className={styles.delete} 
            size={15} color={"blue"}/>
          </div>
        }},
    ]
    return (
        <>
        <Layout title="Subjects">
        <div className={styles.container}>
        <Link to="/courses/new">
            Add subject
        </Link>
        {loading&&"Loading"}
        {(!loading&&error)&&error}
        {!error&&!loading&&data&&<Table cols={courseCols} data={data}  />}
        <Pagination route={`courses`} pagination={pagination} size={size} page={page}
            />
            {/* <ImageForm/> */}
        </div>
        </Layout>
        </>
      );
}
 
 
export default Courses;