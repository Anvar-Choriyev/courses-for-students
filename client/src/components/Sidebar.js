import styles from "./Sidebar.module.css"
import {RiDashboardFill} from "react-icons/ri"
import {FaBars} from "react-icons/fa"
import {SiCoursera} from "react-icons/si"
import {AiOutlineEdit, AiOutlineIdcard, AiOutlineUser} from "react-icons/ai"
import { NavLink } from "react-router-dom"
import { useState } from "react"

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const changeSidebar = () => {
        setIsOpen(!isOpen)
    }
    const verifyAdmin = localStorage.getItem("userRole") === '"SUPER_ADMIN"'

    const menuItem = [
        {
            path: "/",
            name: "Dashboard",
            icon: <RiDashboardFill/>
        },
        {
            path: "/subjects",
            name: "Fanlar",
            icon: <SiCoursera/>
        },
        {
            path: "/teachers",
            name: "O'qituvchilar",
            icon: <AiOutlineIdcard/>
        },
        {
            path: "/articles",
            name: "Maqolalar",
            icon: <AiOutlineEdit/>
        },
        {
            path: "/literatures",
            name: "Adabiyotlar",
            icon: <AiOutlineEdit/>
        },
        {
            path: "/certificates",
            name: "Guvohnomalar",
            icon: <AiOutlineEdit/>
        },
    ]
    return ( 
        <div className={styles.container}>
            <div className={isOpen ? styles.icons : styles.sidebar}>
                <div className={styles.section1}>
                    <div className={styles.bars}>
                        <FaBars onClick={changeSidebar}/>
                    </div>
                </div>
                {
                   menuItem.map((item, i) => 
                        <NavLink to={item.path} key={i} className={styles.link}>
                            <div>{item.icon}</div>
                            <div>{item.name}</div>
                        </NavLink>
                    )
                }
                {verifyAdmin && <NavLink to="/users" className={styles.link}>
                        <div><AiOutlineUser/></div>
                        <div>Admins</div>
                    </NavLink>}
            </div>
        </div>
     );
}
 
export default Sidebar;