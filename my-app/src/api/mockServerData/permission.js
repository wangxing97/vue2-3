import Mock from 'mockjs'

let jessionList = []

// 工具函数：计算当前时间+1分钟的时间戳（单位：毫秒）
const getExpireTime = () => {
    return new Date().getTime() + 60 * 1000; // 当前时间戳 + 60秒
}

// 工具函数：验证JSESSIONID是否有效（存在且未过期）
const validateJessionId = (jsessionId) => {
    jessionList = JSON.parse(localStorage.getItem("jessionList")) || [];
    const targetItem = jessionList.find(item => item.JSESSIONID === jsessionId);
    if (!targetItem) return false; // JSESSIONID不存在
    // 对比当前时间与过期时间，未过期则有效
    return new Date().getTime() < targetItem.expire;
}

export default {
    // 登录接口：生成JSESSIONID并设置1分钟过期
    login: config => {
        jessionList = JSON.parse(localStorage.getItem("jessionList")) || [];
        const { username, password } = JSON.parse(config.body);
        // 修复原代码中的赋值运算符错误（=== 改为 ===）
        if (username === 'admin' && password === '123123') {
            const expire = getExpireTime();
            const jsessionId = Mock.Random.guid();
            if (!jessionList.find(item => item.username === username)) {
                jessionList.push({
                    username: username,
                    JSESSIONID: jsessionId,
                    expire: expire
                });
            } else {
                jessionList.forEach(item => {
                    if (item.username === username) {
                        item.expire = expire;
                        item.JSESSIONID = jsessionId;
                    }
                })
            }
            // 登录成功：返回JSESSIONID，同时通过response设置cookie
            localStorage.setItem("jessionList", JSON.stringify(jessionList));
            return {
                code: 200,
                message: '登录成功',
                data: { JSESSIONID: jsessionId },
                // Mock响应头：设置cookie（JSESSIONID + 过期时间）
                headers: {
                    'Set-Cookie': `JSESSIONID=${jsessionId}; Expires=${new Date(expire).toUTCString()}; Path=/`
                }
            };
        } else {
            // 登录失败
            return {
                code: 401,
                message: '用户名或密码错误'
            };
        }
    },

    // 需登录验证的接口：验证携带的JSESSIONID是否有效
    checkAuth: (config) => {
        // 从请求头cookie中提取JSESSIONID
        const jsessionId = JSON.parse(config.body)['JSESSIONID'];

        if (!jsessionId) {
            return {
                code: 403,
                message: '未携带JSESSIONID，拒绝访问'
            };
        }
        const is_valid = validateJessionId(jsessionId);

        if (is_valid) {
            return {
                code: 200,
                message: 'JSESSIONID有效，访问成功',
                data: {}
            };
        } else {
            // 过期或无效：清除对应的JSESSIONID记录
            jessionList = jessionList.filter(item => item.JSESSIONID !== jsessionId);
            localStorage.setItem("jessionList", JSON.stringify(jessionList));
            return {
                code: 401,
                message: 'JSESSIONID已过期或无效，请重新登录'
            };
        }
    }
}