import { useForm } from "react-hook-form";
import Layout from "../../components/Layout";
import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux"
import axios from "axios"
import { appActions } from "../../store";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import styles from "./Login.module.css"
import img1 from "../../images/course-logo.png"

const Login = () => {
    const {register, handleSubmit, formState: {errors, isDirty}, reset} = useForm()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const loginHandler = async loginData => {
        try {
            const res = await axios.post("http://localhost:8080/api/v1/auth/login", 
            loginData)
            localStorage.setItem("token", res.data.data.jwt)
            localStorage.setItem("user", JSON.stringify(res.data.data.user))
            localStorage.setItem("userRole", JSON.stringify(res.data.data.user.role))
            localStorage.setItem("isAuth", true)
            dispatch(appActions.login(res.data.data))
            navigate("/courses")
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    return ( 
        <div className={styles.main}>
        <div className={styles.container}>
        <div className={styles.logo}>
            <img src={img1} alt="Login logo"/>
        </div>
        <p className={styles.dashboardText}>Computer Ingineering</p>
        <h2>Log In to TUIT Cathedra</h2>
        <p className={styles.description}>Enter your username and password below</p>
        <form onSubmit={handleSubmit(loginHandler)} className={styles.login}>
            <p className={styles.username}>Username</p> 
            <input className={errors.name? "invalid": ""} type="text" placeholder="Username"
            {...register("username", {
                required: {value: true, message: "Username must entered"},
                minLength: {value: 6, message: "Username mustn't be less than 6"}
                })}/>
            {errors.username&&<span className="error-text">{errors.username.message}</span>}
            <div className={styles.password}>
                <span>PASSWORD</span>
                <span>Forgot password?</span>
            </div>
            <input className={errors.name? "invalid": ""} type="password" placeholder="Password"
            {...register("password", {
                required: {value: true, message: "Password must entered"},
                minLength: {value: 8, message: "Username mustn't be less than 8"}
                })}/>
            {errors.password&&<span className="error-text">{errors.password.message}</span>}
            <button>Login</button>
            <div className={styles.register}>
                <span>Don't have an account?</span>
                <Link className={styles.link} to="/auth/register">Sign Up</Link>
            </div>
        </form>
        </div>
        </div>
);
}
 
export default Login;