import http from "../../utils/axios-instance"

export const getAllTeachers = async ({page, size}) => {
    const res = await http({url:"/teachers", params: {page, size}});
    return {content: res.data.data.allTeachers.content, pagination: res.data.data.allTeachers.pagination}
}

export const deleteTeacherHandler = async (id) => {
    const res = await http.delete(`/teachers/${id}`);
    return res.data
}
export const submit = async ({data, isUpdate, id}) => {
    const res = await http({
        url: isUpdate
        ? `http://localhost:8080/api/v1/teachers/${id}`
        : "http://localhost:8080/api/v1/teachers",
        method: isUpdate ? "PATCH" : "POST",
        data: data,
    })
    return res.data
}
