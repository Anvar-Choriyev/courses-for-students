import styles from "./Layout.module.css"

const Navbar = params => {
    return ( 
        <div className={styles.title}>
            <h1>{params.title}</h1>
        </div> 
    );
}
 
export default Navbar;