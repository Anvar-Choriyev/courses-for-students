import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import ImageForm from "../../components/ImageForm";
import Layout from "../../components/Layout";
import Pagination from "../../components/Pagination";
import Table from "../../components/Table";
import useHttp from "../../utils/hooks/use-http";
import { deleteAdminHandler, getAdmins } from "./admins-api";
import "./Admins.module.css"

const Admins = () => {
    const [params] = useSearchParams()
    const size = params.get("size") || 3
    let page = params.get("page") || 1
    // let search = params.get("search") || ""
    let order = params.get("order") || ""
    const navigate = useNavigate()
    const {send, error, isLoading, data, pagination} = useHttp(getAdmins)
    const {send: deleteAdmin} = useHttp(deleteAdminHandler)

    useEffect(() => {
        send({page, size, order})
    }, [page, size, order])

    const deleteHandler = async (id) => {
        await deleteAdmin(id)
        if(data.length === 1) {
            resetPage()
        }
        await send({page, size})
    }
    const resetPage = () => {
        navigate(`?page=${page-1}&size=3`)
    }

    const [value, setValue] = useState(null)
    
    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         navigate(`/users?search=${value === null ? "" : value}`)
    //     }, 200)
    //     return () => {
    //         clearTimeout(timer)
    //     }
    // }, [value])
    useEffect(() => {
        const timer = setTimeout(() => {
            navigate(`/users?search=${value === null ? "" : value}`)
        }, 200)
        return () => {
            clearTimeout(timer)
        }
    }, [value])

    const changeHandler = e => {
        setValue(e.target.value)
    }
    const adminsCols = [
        {header: "Firstname", accessor: "firstName"},
        {header: "Lastname", accessor: "lastName"},
        {header: "Email", accessor: "email"},
        {header: "Phone number", accessor: "phoneNumber"},
        {
            header: "Actions", accessor: (admins) => {
                return <div>
                    <Link to={`/users/${admins.id}`}>Edit</Link>{" "}
                    <button onClick={deleteHandler.bind(null, admins.id)}>Delete</button>
                </div>
            }
        }
    ]
    return ( 
        <Layout title="Admins">
            <input type="text" onChange={changeHandler} />
            <br/>
            {data.length > 0 ?
                <>
                    <Table cols={adminsCols} data={data} />
                    <Pagination route={"users"} pagination={pagination} size={size} page={page} />
                </>
                : "no admins found"
            }
        </Layout>
     );
}
 
export default Admins;