import http from "../../utils/axios-instance"

export const getAllCourses = async ({page, size}) => {
    const res = await http({url:"/courses", params:{page, size}});
    return {
        content: res.data.data.allCourses.content, 
        pagination: res.data.data.allCourses.pagination
    }
}

export const deleteCourseHandler = async (id) => {
    const res = await http.delete(`/courses/${id}`);
    return res.data
}
export const submit = async ({data, isUpdate, id}) => {
    const res = await http({
        url: isUpdate
        ? `http://localhost:8080/api/v1/courses/${id}`
        : "http://localhost:8080/api/v1/courses",
        method: isUpdate ? "PATCH" : "POST",
        data: data,
    })
    return res.data
}
