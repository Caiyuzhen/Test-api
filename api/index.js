//express.jx 基本配置
// const { Client } = require("@notionhq/client")
import { Client } from "@notionhq/client"

// require('dotenv').config()//读取 .env 文件, 放到环境变量中
// import {NOTION_KEY, NOTION_DB_ID} from './.env'

import express from "express"
// const express = require("express")


const server = express()
server.use(express.json())//把获取的数据转换成 json 格式
// const port = 3001


// 获取 Notion 数据
const NOTION_KEY = 'secret_5S1GPozbBlmooNRw4JQb2X6zOMacXSz3jqpEpC0p63q'
const NOTION_DB_ID = '4acd3ad8897c4605aebad3e66f1ab26a'


//初始化 notion 客户端
const notion = new Client({ auth: NOTION_KEY })


//🌟获取 title 数据的函数, 转化为较为简单的结构
async function getAllTitles() {
	// notion 获取数据库的 api
	const result = await notion.databases.query({ database_id: NOTION_DB_ID })
	const titles = new Map()

	//遍历 db 中的 page
	result.results.forEach((page) => {
		titles.set(page.id, {
			id: page.id,
			title: page.properties.Title.title[0].plain_text,
			createTime: page.created_time,
			content: page.properties.detail.rich_text[0].text.content
		})
	})

	//组装数据
	let titleDa = [...titles.values()].reduce((acc, curr) => {
		acc.push(curr)
		return acc
	}, [])

	return titleDa

}



//🌟获取时间的函数
// function getReativeTimeDesc(time) {
// 	// 获取当前时间戳
// 	const currentInMs = new Date().getTime()
// 	const timeInMs = new Date(time).getTime()

// 	const minuteInMs = 60 * 1000
// 	const hourInMs = 60 * minuteInMs
// 	const dayInMs = 24 * hourInMs
// 	const monthInMs = 30 * dayInMs
// 	const yearInMs = 12 * monthInMs

// 	// 计算相对的时间差
// 	const relativeTime = currentInMs - timeInMs
// 	if(relativeTime < minuteInMs) {
// 		return `${Math.ceil(relativeTime / 1000)} 秒前`//Math.ceil 取整
// 	} else if (relativeTime < hourInMs) {
// 		return `${Math.ceil(relativeTime / minuteInMs)} 分钟前`
// 	} else if (relativeTime < dayInMs) {
// 		return `${Math.ceil(relativeTime / hourInMs)} 小时前`
// 	} else if (relativeTime < monthInMs) {
// 		return `${Math.ceil(relativeTime / dayInMs)} 天前`
// 	} else if (relativeTime < yearInMs) {
// 		return `${Math.ceil(relativeTime / monthInMs)} 月前`
// 	} else {
// 		return `${Math.ceil(relativeTime / yearInMs)} 年前`
// 	}
// }


//🌟处理 get title 请求的函数
server.get("/api/getTitles", async (req, res) => {
	try {
		let titlesData = await getAllTitles() //接受上面获取 title 数据的结果
		res.json(titlesData) //发送给客户端
	} catch (err) {
		console.log(err)
		res.sendStatus(500)
	}
})


// server.get('/', (req, res) => {
// 	res.send('Hello World!')
// })


// server.listen(port, () => {
// 	console.log(`Example app listening at http://localhost:${port}`)
// })


export default server