import Navbar from "./Navbar";
import img1 from "../images/course-logo.png"
import styles from "./Layout.module.css"
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import img2 from "../images/avatar.png"
import {VscBellDot} from "react-icons/vsc"
import {TbLogout} from "react-icons/tb"
import { useNavigate } from "react-router-dom";

const Layout = params => {
    const navigate = useNavigate()

    const logoutHandler = () => {
        navigate("/auth/login")
        window.location.reload()
    }
    return ( 
        <>
        <nav>
            <img src={img1} alt="logo"/>
            <h2>Computer Ingineering</h2>
            <div className={styles.links}>
                <Link className={styles.link} to={"/courses"}>Subjects</Link>
                <Link className={styles.link} to={"/"}>Home</Link>
                <Link className={styles.link} to={"/students"}>Teachers</Link>
            </div>
            <Navbar title={params.title}/>
            <div className={styles.rightSide}>
                <VscBellDot size={25}/>
                <p>Jones Ferdinand</p>
                <img src={img2} alt="avatar"/>
                <button onClick={logoutHandler} className={styles.logout}>Log out <TbLogout size={25}/></button>
            </div>
        </nav>
        <div className={styles.container}>
        <Sidebar/>
        <div className={styles.main}>
            {params.children}
        </div>
        </div>
        </>
     );
}
 
export default Layout;