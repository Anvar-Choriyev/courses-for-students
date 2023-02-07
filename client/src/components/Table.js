import styles from "./Table.module.css"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import {Table} from 'antd'

const TableForm = ({cols, data}) => {
    const [value, setValue] = useState()
    const navigate = useNavigate()

    const changeHandler = e => {
        setValue(e.target.value)
    }

    const columns=cols.map((item,index)=>(
        {
                title: item.header,
                dataIndex: index,
                key: item.header, 
        }
    ))
    console.log(columns)
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
        <div className={styles.Tableform}>
            <Table columns={columns} dataSource={data}></Table>
        </div>  
        
     );
}
 
export default TableForm;