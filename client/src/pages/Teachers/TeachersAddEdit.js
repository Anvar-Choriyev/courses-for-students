import { useEffect, useState } from "react";
import {useForm} from "react-hook-form"
import {useParams, useNavigate} from "react-router-dom"
import axios from "axios";
import { toast } from "react-toastify";
import Layout from "../../components/Layout";
import useHttp from "../../utils/hooks/use-http";
import { getAllTeachers, submit } from "./teachers-api";


const TeachersAddEdit = () => {
    const {register, handleSubmit, formState: {errors, isDirty}, reset} = useForm()
    const [subjects, setSubjects] = useState([])
    const params = useParams()
    const id = params.id
    const navigate = useNavigate()
    const isUpdate = params.id !=="new"
    const {send: getTeachers} = useHttp(getAllTeachers)
    const {send: teachersSubmit} = useHttp(submit)

    useEffect(()=> {
        getSubjects()
        getTeachers()
        if(isUpdate) {
            getById()
        }
    }, [])
    const addTeacherHandler = async (data) => {
        if(!isDirty) navigate(-1)
        try {
            await teachersSubmit({data, isUpdate, id})
            getTeachers()
            if(isUpdate) {
                toast.success("Teacher updated")
            }
            else toast.success("Teacher added")
            navigate(-1)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    const getSubjects = async () => {
        const res = await axios.get("http://localhost:8080/api/v1/subjects")
        setSubjects(res.data.data.allSubjects.content);
    }
    const getById = async () => {
        const res = await axios.get(`http://localhost:8080/api/v1/teachers/${params.id}`)
        const byId = res.data.data.teacherById
        reset(byId)
    }
    return ( 
        <Layout title="O'qituvchi ma'lumotlarini qo'shish/o'zgartirish">
            <form onSubmit={handleSubmit(addTeacherHandler)}> 
                <input className={errors.firstName? "invalid": ""} type="text" placeholder="Ismi"
                {...register("firstName", {required: {value: true, message: "Ism kiritilmadi"}})}/>
                <br/>
                {errors.firstName&&<span className="error-text">{errors.firstName.message}</span>}
                <br/>
                <input className={errors.lastName? "invalid": ""} type="text" placeholder="Familiyasi"
                {...register("lastName", {required: {value: true, message: "Familiya kiritilmadi"}})}/>
                <br/>
                {errors.lastName&&<span className="error-text">{errors.lastName.message}</span>}
                <br/>
                <input className={errors.patronymic? "invalid": ""} type="text" placeholder="Sharifi"
                {...register("patronymic", {required: {value: true, message: "Sharif kiritilmadi"}})}/>
                <br/>
                {errors.patronymic&&<span className="error-text">{errors.patronymic.message}</span>}
                <br/>
                <input className={errors.phoneNumber? "invalid": ""} type="text" placeholder="Telefon raqami"
                {...register("phoneNumber", {required: {value: true, message: "Telefon raqam kiritilmadi"}})}/>
                <br/>
                {errors.phoneNumber&&<span className="error-text">{errors.phoneNumber.message}</span>}
                <br/>
                <input className={errors.address? "invalid": ""} type="text" placeholder="Manzil"
                {...register("address", {required: {value: true, message: "Manzil kiritilmadi"}})}/>
                <br/>
                {errors.address&&<span className="error-text">{errors.address.message}</span>}
                <br/>
                <select className={errors.subjectId? "invalid": ""} 
                {...register("subjectId",{required: {value: true, message: "Fan tanlanmadi"}})}>
                    <option value=""></option>
                    {subjects.map(s => {
                       return <option key={s.id} value={s.id}>{s.name}</option>
                    })}
                </select>
                <br/>
                {errors.subjectId&&<span className="error-text">{errors.subjectId.message}</span>}
                <br/>
                <button>Saqlash</button>
            </form>
            </Layout> 
     );
}
 
export default TeachersAddEdit;