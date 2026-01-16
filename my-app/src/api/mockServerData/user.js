import Mock from 'mockjs'

function param2Obj(url) {
    const search = url.split('?')[1]
    if (!search) {
        return {}
    }
    return JSON.parse(
        '{"' +
        decodeURIComponent(search)
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"') +
        '"}'
    )
}

let list = []
const count = 200

Array.from({ length: count }, () => {
    list.push(Mock.mock({
        id: Mock.Random.guid(),
        name: Mock.Random.cname(),
        addr: Mock.mock('@county(true)'),
        'age|18-60': 1,
        birth: Mock.Random.date(),
        sex: Mock.Random.integer(0, 1)
    }))
})

export default {
    getUserList: config => {
        const { name, page = 1, limit = 20 } = param2Obj(config.url)
        const mockList = list.filter(user => {
            if (name && user.name.indexOf(name) === -1 && user.addr.indexOf(name) === -1)
                return false
            else
                return true
        })
        const pageList = mockList.filter((item, index) => {
            return index < page * limit && index >= ((page - 1) * limit)
        })
        return {
            code: 20000,
            count: mockList.length,
            list: pageList
        }
    },

    createUser: config => {
        const { name, addr, age, birth, sex } = JSON.parse(config.body)
        list.unshift({
            id: Mock.Random.guid(),
            name: name,
            addr: addr,
            age: age,
            birth: birth,
            sex: sex
        })
        return {
            code: 20000,
            msg: '添加成功'
        }
    },

    deleteUser: config => {
        const { id } = JSON.parse(config.body)
        console.log(id);
        list = list.filter(item => item.id !== id)
        return {
            code: 20000,
            msg: '删除成功'
        }
    },

    batchDeleteUser: config => {
        let ids = param2Obj(config.url)
        ids = ids.split(',')
        list = list.filter(item => ids.includes(item.id))
        return {
            code: 20000,
            msg: '批量删除成功'
        }
    },

    updateUser: config => {
        const { id, name, addr, age, birth, sex } = JSON.parse(config.body)
        const sex_num = parseInt(sex)
        list.forEach(item => {
            if (item.id === id) {
                item.name = name;
                item.addr = addr;
                item.age = age;
                item.birth = birth;
                item.sex = sex;
            }
        })
        return {
            code: 20000,
            msg: '更新成功'
        }
    }
}