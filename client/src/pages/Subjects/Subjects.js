import { useEffect } from "react"
import Layout from "../../components/Layout"
import "./Subjects.module.css"
import Table from "../../components/Table"
import Pagination from "../../components/Pagination"
import styles from "./Subjects.module.css"
import { deleteSubjectHandler } from "./subjects-api"
import useHttp from "../../utils/hooks/use-http"
import { getAllSubjects} from "./subjects-api"
import { useSearchParams, useNavigate, Link} from "react-router-dom"
import {FaRegEdit} from "react-icons/fa"
import {AiOutlineDelete} from "react-icons/ai"
import http from "../../utils/axios-instance"

const Subjects = () => {
    const [params] = useSearchParams()
    const navigate = useNavigate()
    const size = params.get("size") || 3;
    let page = params.get("page") || 1;

    const {send, error, loading, data, pagination} = useHttp(getAllSubjects)
    const {send: deleteSubject} = useHttp(deleteSubjectHandler)

    useEffect(() => {
        send({page, size})
    }, [page, size])

    const deleteHandler = async (id) => {
        await deleteSubject(id)
        if(data.length === 1 && pagination.allPages !== 1){
            navigate(`/subjects?page=${page - 1}&size=${size}`)
        }
        send({page,size})
    }
    const getFile = async () => {
        http({
          url: "subjects/download",
          method: "GET",
          responseType: "blob",
        }).then(res => {
          const href = URL.createObjectURL(res.data);
          const link = document.createElement("a");
          link.href = href;
          link.setAttribute("download", "subjects.xlsx");
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(href);
        });
      };

    const subjectCols = [
        {header: "Nomi", accessor: (item)=> <Link to={`/subjects/${item.id}/teachers`}>{item.name}</Link>},
        {header: "Ma'ruza", accessor: "lecture"},
        {header: "Prezentatsiya", accessor: "presentation"},
        {header: "Sillabus", accessor: "syllabus"},
        {header: "Adabiyot", accessor: "literature"},
        {header: "Actions", accessor: (subject)=>{
          return <div>
            <Link to={`/subjects/${subject.id}`}><FaRegEdit/></Link> {" "}
            <AiOutlineDelete onClick={deleteHandler.bind(null, subject.id)} className={styles.delete} 
            size={15} color={"blue"}/>
          </div>
        }},
    ]
    return (
        <>
        <Layout title="Fanlar">
        <div className={styles.container}>
        <button onClick={getFile}>Download</button>
        <Link to="/subjects/new">
            Fan qo'shish
        </Link>
        {loading&&"Loading"}
        {(!loading&&error)&&error}
        {!error&&!loading&&data&&<Table cols={subjectCols} data={data}  />}
        <Pagination route={`subjects`} pagination={pagination} size={size} page={page}
            />
        </div>
        </Layout>
        </>
      );
}
 
 
export default Subjects;