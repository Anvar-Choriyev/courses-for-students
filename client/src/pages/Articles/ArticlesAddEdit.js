import { useEffect } from "react";
import {useForm} from "react-hook-form"
import {useParams, useNavigate} from "react-router-dom"
import axios from "axios";
import { toast } from "react-toastify";
import Layout from "../../components/Layout";
import useHttp from "../../utils/hooks/use-http";
import { getAllArticles, submit } from "./articles-api";

const ArticlesAddEdit = () => {
    const {register, handleSubmit, formState: {errors, isDirty}, reset} = useForm()
    const params = useParams()
    const id = params.id
    const navigate = useNavigate()
    const isUpdate = params.id !=="new"
    const {send: getArticles} = useHttp(getAllArticles)
    const {send: articlesSubmit} = useHttp(submit)

    useEffect(()=> {
        getArticles()
        if(isUpdate) {
            getById()
        }
    }, [])
    const addArticleHandler = async (data) => {
        if(!isDirty) navigate(-1)
        try {
            await articlesSubmit({data, isUpdate, id})
            getArticles()
            if(isUpdate) {
                toast.success("Maqola o'zgartirildi")
            }
            else toast.success("Maqola qo'shildi")
            navigate(-1)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    const getById = async () => {
        const res = await axios.get(`http://localhost:8080/api/v1/articles/${params.id}`)
        const byId = res.data.data.articleById
        reset(byId)
    }
    return ( 
        <Layout title="Maqolani qo'shish/o'zgartirish">
            <form onSubmit={handleSubmit(addArticleHandler)}> 
                <input className={errors.name? "invalid": ""} type="text" placeholder="Nomi"
                {...register("name", {required: {value: true, message: "Maqola nomi kiritilmadi"}})}/>
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
 
export default ArticlesAddEdit;