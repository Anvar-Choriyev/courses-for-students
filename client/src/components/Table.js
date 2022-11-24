import styles from "./Table.module.css"
import {BiSortAlt2} from "react-icons/bi"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

const Table = ({cols, data}) => {
    const [value, setValue] = useState()
    const navigate = useNavigate()
    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         navigate(`/users?search=${value === null ? "" : value}`)
    //     }, 200)
    //     return () => {
    //         clearTimeout(timer)
    //     }
    // }, [value])
    // useEffect(() => {
    //     navigate(`/users?order=${value}`)
    // }, [value])

    const changeHandler = e => {
        setValue(e.target.value)
    }

    const bodyContent = data.map(i => <tr key={i.id}>
        {cols.map((c,ind) => {
            let content;
            if(typeof c.accessor === "string") {
                content = i[c.accessor]
            }
            else if(c.accessor instanceof Function) {
                content = c.accessor(i)
            }
            return <td key={c.header+ind}>{content}</td>
        })}
    </tr>)

    return ( 
        <table>
            <thead>
                <tr>
                    {cols.map(c=> <th
                    key={c.header}>
                        <div className={styles.header}>
                            {c.header}
                            {c.header !== "Actions"?<BiSortAlt2 onClick={changeHandler} value={c.header}/>:""}
                        </div>
                            </th>
                )}
                </tr>
            </thead>
            <tbody>
                {bodyContent}
            </tbody>
        </table>
     );
}
 
export default Table;