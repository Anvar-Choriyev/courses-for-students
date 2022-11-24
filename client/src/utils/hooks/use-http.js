import { useState } from "react";
import { toast } from "react-toastify";

const useHttp = (reqFn) => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [data, setData] = useState([])
    const [pagination, setPagination]= useState({})

    const send = async (reqData) => {
        setLoading(true);
        setError(null);
        try {
            const res = await reqFn(reqData)
            setData(res.content)
            setPagination(res.pagination)
            toast.success(data.message)
            console.log(data);
        } catch (error) {
            setError("Error")
            toast.error(data.message)
        }
        setLoading(false)
    }

    return {
        send, loading, error, data, pagination
    };
}
 
export default useHttp;