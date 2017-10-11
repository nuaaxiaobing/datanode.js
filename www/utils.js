'use strict'

/**
 * create by pc 2017/10/11
 * 工具帮助文件
 */
const 
    fs = require('fs');

/**
 * 获取root目录下的所有文件
 * 
 * @param {any} root 根目录
 * @param {any} subRoot 根目录内部的子目录，用于保存类似于/subRoot/xxx.js的文件名称
 * @returns root目录下的所有文件数组
 */
function getAllFiles(root, subRoot) {
    let res = [], files = fs.readdirSync(root);
    files.forEach((file) => {
        let 
            pathname = root + '/' + file,  
            stat = fs.lstatSync(pathname);
        if (!stat.isDirectory()) {
            if (subRoot !== undefined && subRoot.length > 0) {
                res.push(subRoot + '/' + file);
            } else {
                res.push(file);
            }
        } else {
            res = res.concat(getAllFiles(pathname,file));
        }
    });
    return res;
}


module.exports = {
    getAllFiles: getAllFiles
}