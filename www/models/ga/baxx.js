'use strict'

/**
 * 模型名称： 公安 保安
 * 数据库表名称： BIZ_GA_BAXX
 * author pc 2017/10/11
 */
const 
    dbtypes = require('../../dbtypes');

module.exports = {
    name: 'BAXX',
    table: 'BIZ_GA_BAXX',
    fields: {
        //姓名
        xm: {
            type: dbtypes.STRING,
            allowNull: true
        },
        //性别
        xb: {
            type: dbtypes.STRING,
            allowNull: true
        },
        //民族
        mz: {
            type: dbtypes.STRING,
            allowNull: true
        },
        //出生日期
        csrq: {
            type: dbtypes.STRING,
            allowNull: true
        },
        //公民身份证号码
        gmsfhm: {
            type: dbtypes.STRING,
            allowNull: true
        },
        //户籍地详址
        hjdxz: {
            type: dbtypes.STRING,
            allowNull: true
        },
        //保安资格证编号
        bazgzbh: {
            type: dbtypes.STRING,
            allowNull: true
        },
        //资格证发证日期
        zgzfzrq: {
            type: dbtypes.STRING,
            allowNull: true
        },
        //资格证发证机关
        zgzfzjg: {
            type: dbtypes.STRING,
            allowNull: true
        },
        //入职日期
        rzrq: {
            type: dbtypes.STRING,
            allowNull: true
        },
        //工作部门
        gzbm: {
            type: dbtypes.STRING,
            allowNull: true
        },
        //保安员岗位
        baygm: {
            type: dbtypes.STRING,
            allowNull: true
        },
        //离职日期
        lzrq: {
            type: dbtypes.STRING,
            allowNull: true
        },
        //离职原因
        lzyy: {
            type: dbtypes.STRING,
            allowNull: true
        },
        //资格证吊销机关
        zgzdxjg: {
            type: dbtypes.STRING,
            allowNull: true
        },
        //资格证吊销原因
        zjzdxyy: {
            type: dbtypes.STRING,
            allowNull: true
        },
        //资格证吊销日期
        zgzdxrq: {
            type: dbtypes.STRING,
            allowNull: true
        },
        seqId: {
            type: dbtypes.STRING,
            allowNull: true
        },
        createTime: {
            type: dbtypes.DATE,
            allowNull: true
        },
        updateTime: {
            type: dbtypes.DATE,
            allowNull: true
        },
        cleanFlag: {
            type: dbtypes.STRING,
            allowNull: true
        },
        lastCleanTime: {
            type: dbtypes.STRING,
            allowNull: true
        },
        compareFlag: {
            type: dbtypes.STRING,
            allowNull: true
        },
        lastCompareTime: {
            type: dbtypes.DATE,
            allowNull: true
        },
        hBaseId: {
            type: dbtypes.STRING,
            allowNull: true
        },
        oBaseId: {
            type: dbtypes.STRING,
            allowNull: true
        }
    }
};