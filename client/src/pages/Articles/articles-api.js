import http from "../../utils/axios-instance"

export const getAllArticles = async ({page, size}) => {
    const res = await http({url:"/articles", params:{page, size}});
    return {
        content: res.data.data.allArticles.content, 
        pagination: res.data.data.allArticles.pagination
    }
}

export const deleteArticleHandler = async (id) => {
    const res = await http.delete(`/articles/${id}`);
    return res.data
}
export const submit = async ({data, isUpdate, id}) => {
    const res = await http({
        url: isUpdate
        ? `http://localhost:8080/api/v1/articles/${id}`
        : "http://localhost:8080/api/v1/articles",
        method: isUpdate ? "PATCH" : "POST",
        data: data,
    })
    return res.data
}
