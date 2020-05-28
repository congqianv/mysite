const chalk = require('chalk')
const path = require('path')
const fs = require('fs')

// 路径拼接
const resolve = (...file) => { return path.resolve(__dirname, ...file) }

// 终端日志输出
const log = (msg) => console.log(chalk.green(msg))
const errLog = (msg) => console.log(chalk.red(msg))
const successLog = (msg) => console.log(chalk.bgWhite(chalk.blue(msg)))

// 引入模板文件
const { vueTempleta } = require('./template')


function generateFile (path, data) {
  if (fs.existsSync(path)) {
    errLog(`${path}已存在`)
    return
  }

  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, 'utf8', err => {
      if (err) {
        errLog(err.message)
        reject(err)
      } else {
        resolve(true)
      }
    })
  })
}

log('请输入要生成的组件目录名称')

// 设置process.stdin编码
process.stdin.setEncoding('utf8')
process.stdin.on('data', async chunk => {
  let inputName = chunk.trim()
  let path = resolve('../src/views', inputName)
  log('请输入目录下的vue文件名(无需扩展名)')
  process.stdin.on('data', async chunk2 => {
    let fileName = chunk2.trim()
    let componentVueName = resolve(path, `${fileName}.vue`)
    console.log(componentVueName)
    let hasExistPath = fs.existsSync(componentVueName)
    if (hasExistPath) {
      errLog(`${path}已存在`)
      return
    } else {
      let hasPath = fs.existsSync(path)
      if (!hasPath) {
        fs.mkdirSync(path)
      }
      await generateFile(componentVueName, vueTempleta(fileName))
      successLog(`${fileName} 生成成功`)
      process.stdin.emit('end')
    }
  })
})

process.stdin.on('end', async chunk => {
  process.exit()
})