import Navbar from "./Navbar";
import img1 from "../images/course-logo.png"
import styles from "./Layout.module.css"
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import img2 from "../images/avatar.png"
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
            <div className={styles.leftSide}>
                <img src={img1} alt="logo"/>
                <h2>Computer Engineering</h2>
            </div>
            <div className={styles.rightSide}>
            <div className={styles.links}>
                <Link className={styles.link} to={"/subjects"}>Subjects</Link>
                <Link className={styles.link} to={"/"}>Home</Link>
                <Link className={styles.link} to={"/teachers"}>Teachers</Link>
            </div>
            </div>
            <Navbar title={params.title}/>
            <div className={styles.rightSide}> 
             <div className={styles.profile}>
                <img src={img2} alt="avatar"/>
                <div className={styles.user_settings}>
                     <Link to="/user/:id">Profil sozlamalari</Link>  
                     <button onClick={logoutHandler}>Logout</button>  
                </div>
             </div>
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