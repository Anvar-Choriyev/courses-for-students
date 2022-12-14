import http from "../../utils/axios-instance"

export const getAllSubjects = async ({page, size}) => {
    const res = await http({url:"/subjects", params:{page, size}});
    return {
        content: res.data.data.allSubjects.content, 
        pagination: res.data.data.allSubjects.pagination
    }
}

export const deleteSubjectHandler = async (id) => {
    const res = await http.delete(`/subjects/${id}`);
    return res.data
}
export const submit = async ({data, isUpdate, id}) => {
    const res = await http({
        url: isUpdate
        ? `http://localhost:8080/api/v1/subjects/${id}`
        : "http://localhost:8080/api/v1/subjects",
        method: isUpdate ? "PATCH" : "POST",
        data: data,
    })
    console.log(res.data)
    return res.data
}
