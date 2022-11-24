import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { appActions } from "../../store";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import styles from "./Register.module.css"

const Register = () => {
    const {register, handleSubmit, formState: {errors}, reset} = useForm()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const registerHandler = async registerData => {
        try {
            const res = await axios.post("http://localhost:8080/api/v1/auth/register", registerData)
            console.log(res);
            localStorage.setItem("token", res.data.data.jwt)
            localStorage.setItem("user", JSON.stringify(res.data.data))
            dispatch(appActions.register(res.data.data))
            navigate(`/auth/email-verification/${res.data.data.id}`)
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message)
        }
    }
    return ( 
        <div className={styles.main}>
        <h1>Registration</h1>
        <form onSubmit={handleSubmit(registerHandler)}> 
            <input className={errors.name? "invalid": ""} type="text" placeholder="Firstname"
                {...register("firstName", {
                required: {value: true, message: "Firstname must entered"}
                })}/>
            {errors.firstName&&<span className="error-text">{errors.firstName.message}</span>}
            <input className={errors.name? "invalid": ""} type="text" placeholder="Lastname"
                {...register("lastName", {
                required: {value: true, message: "Lastname must entered"}
                })}/>
            {errors.lastName&&<span className="error-text">{errors.lastName.message}</span>}
            <input className={errors.name? "invalid": ""} type="text" placeholder="Email"
                {...register("email", {
                required: {value: true, message: "Email must entered"}
                })}/>
            {errors.email&&<span className="error-text">{errors.email.message}</span>}
            <input className={errors.name? "invalid": ""} type="text" placeholder="Phone number"
                {...register("phoneNumber", {
                required: {value: true, message: "Phone number must entered"}
                })}/>
            {errors.phoneNumber&&<span className="error-text">{errors.phoneNumber.message}</span>}
            <input className={errors.name? "invalid": ""} type="text" placeholder="Username"
                {...register("username", {
                required: {value: true, message: "Username must entered"},
                minLength: {value: 6, message: "Username mustn't be less than 6"}
                })}/>
            {errors.username&&<span className="error-text">{errors.username.message}</span>}
            <input className={errors.name? "invalid": ""} type="password" placeholder="Password"
                {...register("password", {
                required: {value: true, message: "Password must entered"},
                minLength: {value: 8, message: "Username mustn't be less than 8"}
                })}/>
            {errors.password&&<span className="error-text">{errors.password.message}</span>}
            <button>Register</button>
        </form>
        </div>
    );
}
 
export default Register;