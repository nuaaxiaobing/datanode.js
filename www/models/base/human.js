'use strict'

/**
 * 模型名称：基础  人类  
 * 数据库表名称： BASE_HUMAN
 * author pc 2017/10/11
 */
const 
    dbtypes = require('../../dbtypes');

module.exports = {
    name: 'Human',
    table: 'BASE_HUMAN',
    fields: {
        cname: {
            type: dbtypes.STRING,
            allowNull: true
        },
        cidnum: {
            type: dbtypes.STRING,
            allowNull: true
        },
        alias: {
            type: dbtypes.STRING,
            allowNull: true
        },
        sex: {
            type: dbtypes.STRING,
            allowNull: true
        },
        birthdate: {
            type: dbtypes.DATE,
            allowNull: true
        },
        ethnicity: {
            type: dbtypes.STRING,
            allowNull: true
        },
        nativePlace: {
            type: dbtypes.STRING,
            allowNull: true
        },
        nationality: {
            type: dbtypes.STRING,
            allowNull: true
        },
        familyNumber: {
            type: dbtypes.STRING,
            allowNull: true
        },
        familyRelation: {
            type: dbtypes.STRING,
            allowNull: true
        },
        residenceType: {
            type: dbtypes.STRING,
            allowNull: true
        },
        cidNum18: {
            type: dbtypes.STRING,
            allowNull: true
        },
        code_pc: {
            type: dbtypes.STRING,
            allowNull: true
        },
        code_td: {
            type: dbtypes.STRING,
            allowNull: true
        },
        code_vc: {
            type: dbtypes.STRING,
            allowNull: true
        },
        deathDate: {
            type: dbtypes.STRING,
            allowNull: true
        },
        status: {
            type: dbtypes.STRING,
            allowNull: true
        },
        dataFrom: {
            type: dbtypes.STRING,
            allowNull: true
        },
        remark: {
            type: dbtypes.STRING,
            allowNull: true
        }
    }
}