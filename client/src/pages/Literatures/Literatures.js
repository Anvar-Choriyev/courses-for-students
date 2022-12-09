import { useEffect } from "react"
import Layout from "../../components/Layout"
import Table from "../../components/Table"
import Pagination from "../../components/Pagination"
import useHttp from "../../utils/hooks/use-http"
import { useSearchParams, useNavigate, Link} from "react-router-dom"
import {FaRegEdit} from "react-icons/fa"
import {AiOutlineDelete} from "react-icons/ai"
import { deleteLiteratureHandler, getAllLiteratures } from "./literatures-api"
import styles from "./Literatures.module.css"

const Literatures = () => {
    const [params] = useSearchParams()
    const navigate = useNavigate()
    const size = params.get("size") || 3;
    let page = params.get("page") || 1;

    const {send, error, loading, data, pagination} = useHttp(getAllLiteratures)
    const {send: deleteLiterature} = useHttp(deleteLiteratureHandler)

    useEffect(() => {
        send({page, size})
    }, [page, size])

    const deleteHandler = async (id) => {
        await deleteLiterature(id)
        if(data.length === 1 && pagination.allPages !== 1){
            navigate(`/literatures?page=${page - 1}&size=${size}`)
        }
        send({page,size})
    }
    const literatureCols = [
        {header: "Nomi", accessor: (item)=> <Link to={`/literatures/${item.id}/teachers`}>{item.name}</Link>},
        {header: "Chiqqan sanasi", accessor: "releaseDate"},
        {header: "Turi", accessor: "type"},
        {header: "Avtor", accessor: "author"},
        {header: "Actions", accessor: (article)=>{
          return <div>
            <Link to={`/articles/${article.id}`}><FaRegEdit/></Link> {" "}
            <AiOutlineDelete onClick={deleteHandler.bind(null, article.id)} className={styles.delete} 
            size={15} color={"blue"}/>
          </div>
        }},
    ]
    return (
        <>
        <Layout title="Adabiyotlar">
        <div className={styles.container}>
        <Link to="/literatures/new">
            Adabiyot qo'shish
        </Link>
        {loading&&"Loading"}
        {(!loading&&error)&&error}
        {!error&&!loading&&data&&<Table cols={literatureCols} data={data}  />}
        <Pagination route={`literatures`} pagination={pagination} size={size} page={page}
            />
        </div>
        </Layout>
        </>
      );
}
 
 
export default Literatures;