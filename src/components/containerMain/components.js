

//建立上下文关系
const files = require.context("../../views/", true, /\.js$/);//第一个参数：目录，第二个参数：是否查找目录，第三参数：找到指定文件
//声明数组对象
const components = []
//循环文件
files.keys().map(key => {
    //过滤index、login
    if (key.includes("./index/") || key.includes("./login/")) { return false; }
    const splitFilesName = key.split(".");
    const jsonObj = {};
    //path
    const path = `/index${splitFilesName[1].toLowerCase()}`;
    const component = files(key).default;
    //写入对象
    jsonObj.path = path;
    jsonObj.component = component;
    components.push(jsonObj);
})

export default components;