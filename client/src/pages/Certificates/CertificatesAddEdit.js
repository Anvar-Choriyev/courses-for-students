import { useEffect } from "react";
import {useForm} from "react-hook-form"
import {useParams, useNavigate} from "react-router-dom"
import axios from "axios";
import { toast } from "react-toastify";
import Layout from "../../components/Layout";
import useHttp from "../../utils/hooks/use-http";
import { getAllCertificates, submit } from "./certificates-api";

const CertificatesAddEdit = () => {
    const {register, handleSubmit, formState: {errors, isDirty}, reset} = useForm()
    const params = useParams()
    const id = params.id
    const navigate = useNavigate()
    const isUpdate = params.id !=="new"
    const {send: getCertificates} = useHttp(getAllCertificates)
    const {send: certificatesSubmit} = useHttp(submit)

    useEffect(()=> {
        getCertificates()
        if(isUpdate) {
            getById()
        }
    }, [])
    const addCertificateHandler = async (data) => {
        if(!isDirty) navigate(-1)
        try {
            await certificatesSubmit({data, isUpdate, id})
            getCertificates()
            if(isUpdate) {
                toast.success("Guvohnoma o'zgartirildi")
            }
            else toast.success("Guvohnoma qo'shildi")
            navigate(-1)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    const getById = async () => {
        const res = await axios.get(`http://localhost:8080/api/v1/certificates/${params.id}`)
        const byId = res.data.data.certificateById
        reset(byId)
    }
    return ( 
        <Layout title="Guvohnomani qo'shish/o'zgartirish">
            <form onSubmit={handleSubmit(addCertificateHandler)}> 
                <input className={errors.name? "invalid": ""} type="text" placeholder="Nomi"
                {...register("name", {required: {value: true, message: "Guvohnoma nomi kiritilmadi"}})}/>
                <br/>
                {errors.name&&<span className="error-text">{errors.name.message}</span>}
                <br/>
                <input className={errors.name? "invalid": ""} type="date" placeholder="Chiqqan sanasi"
                {...register("releaseDate", {required: {value: true, message: "Chiqqan sanasi kiritilmadi"}})}/>
                <br/>
                {errors.releaseDate&&<span className="error-text">{errors.releaseDate.message}</span>}
                <br/>
                <input className={errors.name? "invalid": ""} type="text" placeholder="Turi"
                {...register("type", {required: {value: true, message: "Tur kiritilmadi"}})}/>
                <br/>
                {errors.type&&<span className="error-text">{errors.type.message}</span>}
                <br/>
                <input className={errors.name? "invalid": ""} type="text" placeholder="Avtor"
                {...register("author", {required: {value: true, message: "Avtor kiritilmadi"}})}/>
                <br/>
                {errors.author&&<span className="error-text">{errors.author.message}</span>}
                <br/>
                <button>Saqlash</button>
            </form>
        </Layout>
     );
}
 
export default CertificatesAddEdit;