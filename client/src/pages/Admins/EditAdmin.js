import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../components/Layout";
import useHttp from "../../utils/hooks/use-http";
import { getAdmins, updateAdminHandler } from "./admins-api";

const EditAdmin = () => {
    const navigate = useNavigate()
    const params = useParams()
    const id = params.id
    const {send: getAllAdmins} = useHttp(getAdmins)
    const {send} = useHttp(updateAdminHandler)
    const isUpdate = params.id !== "new"

    useEffect(() => {
        getAdmins()
        if(isUpdate) {
            adminById()
        }
    }, [])
    const onUpdate = async data => {
        await send({data, isUpdate, id})
        getAllAdmins()
        navigate(-1)
    }
    const adminById = async () => {
        const res = await axios.get(`http://localhost:8080/api/v1/users/${params.id}`)
        reset(res.data.data.userById)
    }
    const {register, handleSubmit, reset, formState: {errors}} = useForm()
    return (
        <Layout title={isUpdate ? "Update admin": ""}>
             <form onSubmit={handleSubmit(onUpdate)}>
                <input type="text" placeholder="Firstname" 
                {...register("firstName", {required: {value: true, message: "Firstname hadn't entered"}})} />
                <br />
                {errors.firstName&&<span>{errors.firstName.message}</span>}
                <br/>
                <input type="text" placeholder="Lastname" 
                {...register("lastName", {required: {value: true, message: "Lastname hadn't entered"}})} />
                <br />
                {errors.lastName&&<span>{errors.lastName.message}</span>}
                <br/>
                <input type="email" placeholder="Email" 
                {...register("email", {required: {value: true, message: "Email hadn't entered"}})} />
                <br />
                {errors.email&&<span>{errors.email.message}</span>}
                <br/>
                <input type="text" placeholder="Phone number" 
                {...register("phoneNumber", {required: {value: true, message: "Phone number hadn't entered"}})} />
                <br />
                {errors.phoneNumber&&<span>{errors.phoneNumber.message}</span>}
                <br/>
                <button>Save</button>
             </form>  
        </Layout>
      );
}
 
export default EditAdmin;