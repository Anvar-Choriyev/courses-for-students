import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";

const Verification = () => {
    const params = useParams()
    const navigate = useNavigate()
    const getVerificationCode = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/v1/auth/verify/${params.id}`)
            console.log(res);
            toast.success(res.data.message)   
            navigate("/auth/login")
        } catch (error) {
            toast.error(error.response.data.message)
            console.log(error);
            navigate("/auth/register")
        }
    }
    useEffect(()=> {
        if(params.id) {
            getVerificationCode()
        }
    }, [params.id])
}
 
export default Verification;