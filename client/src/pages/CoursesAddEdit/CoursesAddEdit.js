import { useEffect } from "react";
import {useForm} from "react-hook-form"
import {useParams, useNavigate} from "react-router-dom"
import axios from "axios";
import { toast } from "react-toastify";
import Layout from "../../components/Layout";
import useHttp from "../../utils/hooks/use-http";
import { getAllCourses, submit } from "../Courses/courses-api";

const CoursesAddEdit = () => {
    const {register, handleSubmit, formState: {errors, isDirty}, reset} = useForm()
    const params = useParams()
    const id = params.id
    const navigate = useNavigate()
    const isUpdate = params.id !=="new"
    const {send: getCourses} = useHttp(getAllCourses)
    const {send: coursesSubmit} = useHttp(submit)

    useEffect(()=> {
        getCourses()
        if(isUpdate) {
            getById()
        }
    }, [])
    const addCourseHandler = async (data) => {
        if(!isDirty) navigate(-1)
        try {
            await coursesSubmit({data, isUpdate, id})
            getCourses()
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
        const res = await axios.get(`http://localhost:8080/api/v1/courses/${params.id}`)
        const byId = res.data.data.courseById
        reset(byId)
    }
    return ( 
        <Layout title="Add/Edit subjects">
            <form onSubmit={handleSubmit(addCourseHandler)}> 
                <input className={errors.name? "invalid": ""} type="text" placeholder="Name"
                {...register("name", {required: {value: true, message: "Name hadn't entered"}})}/>
                <br/>
                {errors.name&&<span className="error-text">{errors.name.message}</span>}
                <br/>
                <textarea {...register("description", {required: {value: true, message: "Description hadn't entered"}})} placeholder="Description"/>
                <br />
                <button>Save</button>
            </form>
        </Layout>
     );
}
 
export default CoursesAddEdit;