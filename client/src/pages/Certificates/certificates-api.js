import http from "../../utils/axios-instance"

export const getAllCertificates = async ({page, size}) => {
    const res = await http({url:"/certificates", params:{page, size}});
    return {
        content: res.data.data.allCertificates.content, 
        pagination: res.data.data.allCertificates.pagination
    }
}

export const deleteCertificateHandler = async (id) => {
    const res = await http.delete(`/certificates/${id}`);
    return res.data
}
export const submit = async ({data, isUpdate, id}) => {
    const res = await http({
        url: isUpdate
        ? `http://localhost:8080/api/v1/certificates/${id}`
        : "http://localhost:8080/api/v1/certificates",
        method: isUpdate ? "PATCH" : "POST",
        data: data,
    })
    return res.data
}
