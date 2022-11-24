import http from "../../utils/axios-instance"

export const getAllStudents = async ({page, size}) => {
    const res = await http({url:"/students", params: {page, size}});
    console.log(res);
    return {content: res.data.data.allStudents.content, pagination: res.data.data.allStudents.pagination}
}

export const deleteStudentHandler = async (id) => {
    const res = await http.delete(`/students/${id}`);
    return res.data
}
export const submit = async ({data, isUpdate, id}) => {
    const res = await http({
        url: isUpdate
        ? `http://localhost:8080/api/v1/students/${id}`
        : "http://localhost:8080/api/v1/students",
        method: isUpdate ? "PATCH" : "POST",
        data: data,
    })
    return res.data
}
