import service from "@/utils/request";

/**
 * 部门添加
 */
export function DepartmentAddApi(data) {
    return service.request({
        url: "/department/add/",
        method: "post",
        data: data,//请求类型为post时
    })
}

/**
 * 部门列表
 */
export function GetList(data) {
    return service.request({
        url: "/department/list/",
        method: "post",
        data: data,//请求类型为post时
    })
}

/**
 * 部门删除
 */
export function Delete(data) {
    return service.request({
        url: "/department/delete/",
        method: "post",
        data: data,//请求类型为post时
    })
}