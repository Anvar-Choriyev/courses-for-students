import http from "../../utils/axios-instance"

export const getAllLiteratures = async ({page, size}) => {
    const res = await http({url:"/literatures", params:{page, size}});
    return {
        content: res.data.data.allLiteratures.content, 
        pagination: res.data.data.allLiteratures.pagination
    }
}

export const deleteLiteratureHandler = async (id) => {
    const res = await http.delete(`/literatures/${id}`);
    return res.data
}
export const submit = async ({data, isUpdate, id}) => {
    const res = await http({
        url: isUpdate
        ? `http://localhost:8080/api/v1/literatures/${id}`
        : "http://localhost:8080/api/v1/literatures",
        method: isUpdate ? "PATCH" : "POST",
        data: data,
    })
    return res.data
}
