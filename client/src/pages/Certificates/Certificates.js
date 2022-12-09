import { useEffect } from "react"
import Layout from "../../components/Layout"
import Table from "../../components/Table"
import Pagination from "../../components/Pagination"
import styles from "./Certificates.module.css"
import useHttp from "../../utils/hooks/use-http"
import { useSearchParams, useNavigate, Link} from "react-router-dom"
import {FaRegEdit} from "react-icons/fa"
import {AiOutlineDelete} from "react-icons/ai"
import { deleteCertificateHandler, getAllCertificates } from "./certificates-api"

const Certificates = () => {
    const [params] = useSearchParams()
    const navigate = useNavigate()
    const size = params.get("size") || 3;
    let page = params.get("page") || 1;

    const {send, error, loading, data, pagination} = useHttp(getAllCertificates)
    const {send: deleteCertificate} = useHttp(deleteCertificateHandler)

    useEffect(() => {
        send({page, size})
    }, [page, size])

    const deleteHandler = async (id) => {
        await deleteCertificate(id)
        if(data.length === 1 && pagination.allPages !== 1){
            navigate(`/certificates?page=${page - 1}&size=${size}`)
        }
        send({page,size})
    }
    const certificateCols = [
        {header: "Nomi", accessor: (item)=> <Link to={`/certificates/${item.id}/teachers`}>{item.name}</Link>},
        {header: "Chiqqan sanasi", accessor: "releaseDate"},
        {header: "Turi", accessor: "type"},
        {header: "Avtor", accessor: "author"},
        {header: "Actions", accessor: (certificate)=>{
          return <div>
            <Link to={`/certificates/${certificate.id}`}><FaRegEdit/></Link> {" "}
            <AiOutlineDelete onClick={deleteHandler.bind(null, certificate.id)} className={styles.delete} 
            size={15} color={"blue"}/>
          </div>
        }},
    ]
    return (
        <>
        <Layout title="Guvohnomalar">
        <div className={styles.container}>
        <Link to="/certificates/new">
            Guvohnoma qo'shish
        </Link>
        {loading&&"Loading"}
        {(!loading&&error)&&error}
        {!error&&!loading&&data&&<Table cols={certificateCols} data={data}  />}
        <Pagination route={`certificates`} pagination={pagination} size={size} page={page}
            />
        </div>
        </Layout>
        </>
      );
}
 
 
export default Certificates;