const {Op} = require("sequelize")

const excludeParams = ["page", "size", "fields", "search", "sort"]
const operators = ["gte", "gt", "lt", "lte", "in"]

class QueryBuilder {
    constructor(queryParams) {
        this.queryParams = queryParams
        this.queryOptions = {}
    }

    filter() {
        const filterFields = {...this.queryParams}
        // Object.keys(filterFields).forEach(paramKey => {
        //     if(excludeParams.includes(paramKey)) {
        //         delete filterFields[paramKey]
        //     }
        // })
        // ({where: {
        //     createdAt: {[Op.lt]: "2020-01-09"}
        // }})
        // return this
        excludeParams.forEach(p=> delete filterFields[p])

        const filterObject = {}
        Object.keys(filterFields).forEach(k=>{
            const filterItem = filterFields[k]

            if(typeof filterItem === "object") {
                Object.keys(filterItem).forEach(ik=>{
                    if(operators.includes(ik)) {
                        filterObject[k] = {[Op[ik]]: filterItem[ik]}
                    }
                })
            } else {
                filterObject[k] = {[Op.eq]: filterItem}
            }
        })
        if(this.queryOptions.where) {
            this.queryOptions.where = {...filterObject, ...this.queryOptions.where}
        } else {
            this.queryOptions.where = filterObject;
        }
        return this;
     }

    limitFields() {
        if(this.queryParams.hasOwnProperty("fields")) {
            const attributes = this.queryParams.fields.split(",")
            console.log(attributes);
            this.queryOptions.attributes = attributes
        } else {
            console.log("There is no fields property");
        }
        return this
    }

    paginate() {
        const page = this.queryParams.page = this.queryParams.page || 1
        const limit = this.queryParams.size = this.queryParams.size || 100

        this.queryOptions.limit = limit
        this.queryOptions.offset = (page-1) * limit
        return this
    }

    search(searchFields) {
        if(this.queryParams.hasOwnProperty("search")) {
            this.queryOptions.where = {
                [Op.or]:
                    searchFields.map((field) => ({[field]: {[Op.iLike]: `%${this.queryParams.search}%`}}))
            }
        }
        return this
    }
    createPage(queryResult) {
        if(queryResult.hasOwnProperty("count") && queryResult.hasOwnProperty("rows")) {
            const allPagesCount = Math.ceil(queryResult.count / this.queryOptions.limit)
            const page = +this.queryParams.page
            const isLastPage = allPagesCount === page
        return {
            content: queryResult.rows,
            pagination: {
                allItemsCount: queryResult.count,
                page,
                allPagesCount,
                isFirstPage: page === 1,
                isLastPage,
                pageSize: this.queryOptions.size
            }
        }
        }
        return queryResult
    }
    order() {
        if(this.queryParams.hasOwnProperty("order")) {
            const order = this.queryParams.order.split(",")
            this.queryOptions.order = order.map((field) => {
                if(field.startsWith("-")) {
                    return (
                        [field.slice(1), "desc"]
                    )
                } else  return [field, "asc"]
            })
        }
        return this
    }
}

module.exports = QueryBuilder