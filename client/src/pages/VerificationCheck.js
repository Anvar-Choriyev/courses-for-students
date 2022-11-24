import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const VerificationCheck = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [code, setCode] = useState()
    const id = params.id

    const changeCode = e => {
        setCode(e.target.value)
    }

    const {register, handleSubmit, reset, formState: {errors}} = useForm()

    const verify = async (data) => {
        try {
            const res = await axios.post(`http://localhost:8080/api/v1/auth/email-verification/${id}`, data)
            console.log(res);
            navigate("/auth/login")
        } catch (error) {
            navigate("/auth/register")
        }
    }
    return ( 
        <>
            <h1>Check your gmail account</h1>
            <br/>
            <form onSubmit={handleSubmit(verify)}>
                <label>Enter verification Code</label>
                <br/>
                <input type="number" 
                placeholder="Verification Code"
                {...register("verificationCode", {required: {value: true, message: "Verification code must entered"}})}
                />
                <br/>
                <button>Submit</button>
            </form>
        </> 
    );
}
 
export default VerificationCheck;