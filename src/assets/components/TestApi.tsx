import React, { useEffect, useState } from 'react'

export type TestApiProps = string


export default function TestApi() {

	const [blogData, setBlogData] = useState<TestApiProps>('title')

	//获取博客数据的方法
	async function getBlogData() {
		const res = await fetch('/api/getTitles', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
		const data = await res.json() //要把数据转换成json格式
		const title = data[0].title
		setBlogData(title)
		console.log(blogData)
	}

	useEffect(()=>{
		getBlogData()
	},[blogData])

	return (
		<div>标题:{blogData}</div>
	)
}
