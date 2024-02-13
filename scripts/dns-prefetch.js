// 预先对打包进行解析DNS,这样可以使包内用到的第三方域名提前异步解析,提高用户体验,加快加载
const fs = require('fs')
const path = require('path')
const { parse } = require('node-html-parser')
const { glob } = require('glob')
const urlRegex = require('url-regex')

//获取外部链接的正则表达式
const urlPattern = /(http?:\/\/[^/]*)/i
const urls = new Set()
//遍历dist/build/h5目录中所有HTML,js,css文件
async function searchDomain() {
  //读取到匹配的文件
  const files = await glob('dist/build/h5/**/*.{html,css,js}')
  for (const file of files) {
    //把每个文件的内容读取出来
    const source = fs.readFileSync(file, 'utf-8')
    //通过urlRegex库,分析出所有url地址
    const matches = source.match(urlRegex({ strict: true }))
    //把这些地址的域名部分提取出来,加到set集合中
    if (matches) {
      matches.forEach((url) => {
        const match = url.match(urlPattern)
        if (match && match[1]) {
          urls.add(match[1])
        }
      })
    }
  }
}

//把set集合内的所有提取出来的域名插入到HTML文件里面去
async function insertLinks() {
  const files = await glob('dist/build/h5/**/*.html')
  //把每一个域名字符串映射成一个links元素
  const links = [...urls].map((url) => `<link rel="dns-prefetch" href="${url}">`).join('\n')

  for (const file of files) {
    const html = fs.readFileSync(file, 'utf-8')
    //对每一个HTML文件解析成一个节点
    const root = parse(html)
    //找到head元素
    const head = root.querySelector('head')
    //把生成的所有链接放到head元素里面去
    head.insertAdjacentHTML('afterbegin', links)
    //文件内容写回原来的html文件
    fs.writeFileSync(file, root.toString())
  }
}

async function main() {
  await searchDomain()
  //在<head>标签添加提取的链接
  await insertLinks()
}

main()
