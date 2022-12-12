import { useEffect } from "react";
import {useForm} from "react-hook-form"
import {useParams, useNavigate} from "react-router-dom"
import axios from "axios";
import { toast } from "react-toastify";
import Layout from "../../components/Layout";
import useHttp from "../../utils/hooks/use-http";
import { getAllSubjects, submit } from "./subjects-api";
import ImageForm from "../../components/ImageForm";

const SubjectsAddEdit = () => {
    const {register, handleSubmit, formState: {errors, isDirty}, reset} = useForm()
    const params = useParams()
    const id = params.id
    const navigate = useNavigate()
    const isUpdate = params.id !=="new"
    const {send: getSubjects} = useHttp(getAllSubjects)
    const {send: subjectsSubmit} = useHttp(submit)

    useEffect(()=> {
        getSubjects()
        if(isUpdate) {
            getById()
        }
    }, [])
    const addSubjectHandler = async (data) => {
        if(!isDirty) navigate(-1)
        try {
            await subjectsSubmit({data, isUpdate, id})
            getSubjects()
            if(isUpdate) {
                toast.success("Subject updated")
            }
            else toast.success("Subject added")
            navigate(-1)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    const getById = async () => {
        const res = await axios.get(`http://localhost:8080/api/v1/subjects/${params.id}`)
        const byId = res.data.data.subjectById
        reset(byId)
    }
    return ( 
        <Layout title="Fanni qo'shish/o'zgartirish">
            <form onSubmit={handleSubmit(addSubjectHandler)}> 
                <input className={errors.name? "invalid": ""} type="text" placeholder="Nomi"
                {...register("name", {required: {value: true, message: "Fan nomi kiritilmadi"}})}/>
                <br/>
                {errors.name&&<span className="error-text">{errors.name.message}</span>}
                <br/>
                <input className={errors.name? "invalid": ""} type="text" placeholder="Ma'ruza"
                {...register("lecture", {required: {value: true, message: "Ma'ruza kiritilmadi"}})}/>
                <br/>
                {errors.lecture&&<span className="error-text">{errors.lecture.message}</span>}
                <br/>
                <ImageForm/>
                <br/>
                <input className={errors.name? "invalid": ""} type="text" placeholder="Sillabus"
                {...register("syllabus", {required: {value: true, message: "Sillabus kiritilmadi"}})}/>
                <br/>
                {errors.syllabus&&<span className="error-text">{errors.syllabus.message}</span>}
                <br/>
                <input className={errors.name? "invalid": ""} type="text" placeholder="Adabiyot"
                {...register("literature", {required: {value: true, message: "Adabiyot kiritilmadi"}})}/>
                <br/>
                {errors.literature&&<span className="error-text">{errors.literature.message}</span>}
                <br/>
                <button>Saqlash</button>
            </form>
        </Layout>
     );
}
 
export default SubjectsAddEdit;