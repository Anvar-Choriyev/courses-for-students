import http from "../../utils/axios-instance"

export const getAdmins = async ({page, size, search, order}) => {
    const res = await http({url:"/users", params: {page, size, search}})
    return {
        content: res.data.data.allUsers.content, 
        pagination: res.data.data.allUsers.pagination
    }
}
export const deleteAdminHandler = async (id) => {
    const res = await http.delete(`/users/${id}`)
    return res.data
}
export const updateAdminHandler = async ({data, id}) => {
    const res = await http({
        url: `http://localhost:8080/api/v1/users/${id}`,
        method: "PUT",
        data
    })
    return res.data
}