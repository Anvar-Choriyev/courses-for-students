import { useEffect, useState } from "react";
import {useForm} from "react-hook-form"
import {useParams, useNavigate} from "react-router-dom"
import axios from "axios";
import { toast } from "react-toastify";
import Layout from "../../components/Layout";
import useHttp from "../../utils/hooks/use-http";
import { getAllStudents, submit } from "../Students/students-api";


const StudentsAddEdit = () => {
    const {register, handleSubmit, formState: {errors, isDirty}, reset} = useForm()
    const [courses, setCourses] = useState([])
    const params = useParams()
    const id = params.id
    const navigate = useNavigate()
    const isUpdate = params.id !=="new"
    const {send: getStudents} = useHttp(getAllStudents)
    const {send: studentsSubmit} = useHttp(submit)

    useEffect(()=> {
        getCourses()
        getStudents()
        if(isUpdate) {
            getById()
        }
    }, [])
    const addStudentHandler = async (data) => {
        if(!isDirty) navigate(-1)
        try {
            await studentsSubmit({data, isUpdate, id})
            getStudents()
            if(isUpdate) {
                toast.success("Teacher updated")
            }
            else toast.success("Teacher added")
            navigate(-1)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    const getCourses = async () => {
        const res = await axios.get("http://localhost:8080/api/v1/courses")
        setCourses(res.data.data.allCourses.content);
    }
    const getById = async () => {
        const res = await axios.get(`http://localhost:8080/api/v1/students/${params.id}`)
        const byId = res.data.data.studentById
        reset(byId)
    }
    return ( 
        <Layout title="Add/Edit teachers">
            <form onSubmit={handleSubmit(addStudentHandler)}> 
                <input className={errors.firstName? "invalid": ""} type="text" placeholder="Firstname"
                {...register("firstName", {required: {value: true, message: "Firstname hadn't entered"}})}/>
                <br/>
                {errors.firstName&&<span className="error-text">{errors.firstName.message}</span>}
                <br/>
                <input className={errors.lastName? "invalid": ""} type="text" placeholder="LastName"
                {...register("lastName", {required: {value: true, message: "Lastname hadn't entered"}})}/>
                <br/>
                {errors.lastName&&<span className="error-text">{errors.lastName.message}</span>}
                <br/>
                <input className={errors.birthDate? "invalid": ""} type="date" 
                {...register("birthDate", {required: {value: true, message: "Birth Date hadn't entered"}})}/>
                <br/>
                {errors.birthDate&&<span className="error-text">{errors.birthDate.message}</span>}
                <br/>
                <select className={errors.courseId? "invalid": ""} 
                {...register("courseId",{required: {value: true, message: "Course hadn't choosen"}})}>
                    <option value=""></option>
                    {courses.map(c => {
                       return <option key={c.id} value={c.id}>{c.name}</option>
                    })}
                </select>
                <br/>
                {errors.courseId&&<span className="error-text">{errors.courseId.message}</span>}
                <br/>
                <button>Save</button>
            </form>
            </Layout> 
     );
}
 
export default StudentsAddEdit;