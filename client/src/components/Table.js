import styles from "./Table.module.css"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import {Table,Tag, Space} from 'antd'

const TableForm = ({cols, data}) => {
    const [value, setValue] = useState()
    const navigate = useNavigate()

    const changeHandler = e => {
        setValue(e.target.value)
    }

    const columns=[
        {
            title: "Nomi",
            dataIndex: "name",
            key: "name", 
        },
        {
            title: "Lecture",
            dataIndex: "lecture",
            key: "lecture", 
        },
        {
            title: "Prezentatsiya",
            dataIndex: "presentation",
            key: "presentation", 
        },
        {
            title: "Adabiyot",
            dataIndex: "literature",
            key: "literature", 
        },
        {
            title:"Syllabus",
            dataIndex:"syllabus",
            key:"syllabus"
        },
        {
            title:"Action",
            key: 'Action',
                render: (_, record) => (
                  <Space size="middle">
                    <a className="btn btn-warning">edit</a>
                    <a className="btn btn-danger">Delete</a>
                  </Space>
                ),
        }
    ]
 
    console.log("data",data)
    console.log("header",columns)
    const actions=`<button className="btn btn-warning">Edit</button>`
    const bodyContent = data.map((item,index)=>(
        {
            key:item.id,
            name:item.name,
            lecture:item.lecture,
            presentation:item.presentation,
            literature:item.literature,
            syllabus:item.syllabus,
        }
    ))
    console.log('bodycontent',bodyContent)

    return ( 
        <div className={styles.Tableform}>
            <Table columns={columns} dataSource={bodyContent}></Table>
        </div>  
        
     );
}
 
export default TableForm;