import Mock from "mockjs";

let list = [];

export default {
  getStatisticalData: () => {
    Array.from({ length: 7 }, () => {
      list.push(
        Mock.mock({
          苹果: Mock.Random.float(100, 8000, 0, 0),
          vivo: Mock.Random.float(100, 8000, 0, 0),
          oppo: Mock.Random.float(100, 8000, 0, 0),
          魅族: Mock.Random.float(100, 8000, 0, 0),
          三星: Mock.Random.float(100, 8000, 0, 0),
          小米: Mock.Random.float(100, 8000, 0, 0),
        })
      );
    });
    return {
      code: 20000,
      data: {
        // 饼图
        videoData: [
          {
            name: "小米",
            value: 2999,
          },
          {
            name: "苹果",
            value: 5999,
          },
          {
            name: "vivo",
            value: 1500,
          },
          {
            name: "oppo",
            value: 1999,
          },
          {
            name: "魅族",
            value: 2200,
          },
          {
            name: "三星",
            value: 4500,
          },
        ],
        // 柱状图
        userData: [
          {
            date: "周一",
            new: 5,
            active: 200,
          },
          {
            date: "周二",
            new: 10,
            active: 500,
          },
          {
            date: "周三",
            new: 12,
            active: 550,
          },
          {
            date: "周四",
            new: 60,
            active: 800,
          },
          {
            date: "周五",
            new: 65,
            active: 550,
          },
          {
            date: "周六",
            new: 53,
            active: 770,
          },
          {
            date: "周日",
            new: 33,
            active: 170,
          },
        ],
        // 折线图
        orderData: {
          date: [
            "20260101",
            "20260102",
            "20260103",
            "20260104",
            "20260105",
            "20260106",
            "20260107",
          ],
          data: list,
        },
        tableData: [
          {
            name: "苹果",
            todayBuy: 300,
            monthBuy: 5000,
            totalBuy: 60000,
          },
          {
            name: "小米",
            todayBuy: 400,
            monthBuy: 3000,
            totalBuy: 30000,
          },
          {
            name: "vivo",
            todayBuy: 700,
            monthBuy: 1600,
            totalBuy: 50000,
          },
          {
            name: "oppo",
            todayBuy: 800,
            monthBuy: 5000,
            totalBuy: 90000,
          },
          {
            name: "魅族",
            todayBuy: 300,
            monthBuy: 5000,
            totalBuy: 60000,
          },
          {
            name: "三星",
            todayBuy: 100,
            monthBuy: 1000,
            totalBuy: 10000,
          },
        ],
        columnData: [
          {
            name: "name",
            label: "品牌",
          },
          {
            name: "todayBuy",
            label: "今日销量",
          },
          {
            name: "monthBuy",
            label: "本月销量",
          },
          {
            name: "totalBuy",
            label: "总销量",
          },
        ],
        countData: [
          {
            name: "今日支付订单",
            value: 1234,
            icon: "success",
            color: "#2ec7c9",
          },
          {
            name: "今日收藏订单",
            value: 210,
            icon: "star-on",
            color: "#ffb980",
          },
          {
            name: "今日未支付订单",
            value: 1234,
            icon: "s-goods",
            color: "#5ab1ef",
          },
          {
            name: "本月支付订单",
            value: 1234,
            icon: "success",
            color: "#2ec7c9",
          },
          {
            name: "本月收藏订单",
            value: 210,
            icon: "star-on",
            color: "#ffb980",
          },
          {
            name: "本月未支付订单",
            value: 1234,
            icon: "s-goods",
            color: "#5ab1ef",
          },
        ],
        menuData: [
          {
            path: "/home",
            name: "home",
            label: "首页",
            icon: "s-home",
            url: "Home/Home",
          },
          {
            path: "/mall",
            name: "mall",
            label: "商品管理",
            icon: "video-play",
            url: "MallManage/MallManage",
          },
          {
            path: "/user",
            name: "user",
            label: "用户管理",
            icon: "user",
            url: "UserManage/UserManage",
          },
          {
            label: "其他",
            name: "other",
            icon: "location",
            children: [
              {
                path: "/page1",
                name: "page1",
                label: "其它1",
                icon: "setting",
                url: "Other/PageOne",
              },
              {
                path: "/page2",
                name: "page2",
                label: "其它2",
                icon: "setting",
                url: "Other/PageTwo",
              },
            ],
          },
        ]
      },
    };
  },
};
