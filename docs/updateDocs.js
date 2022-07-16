// 根据docs目录生成目录列表到index.md
const fs = require('fs/promises')
const path = require('path')

const DirsMap = {
  main: 'Vue 与 React',
  others: '其他文档',
}

const getAllDocsNames = async (targetPath) => {
  const files = await fs.readdir(targetPath, { withFileTypes: true })
  const dirs = files.filter((i) => i.isDirectory()).map((i) => i.name)
  return dirs
}

const createMarkdownContent = (list, title) => {
  const resolveName = (name) => {
    const index = name.indexOf('/')
    if (~index) {
      // 子目录列表
      return name.substring(index + 1)
    } else {
      return name
    }
  }
  const lineList = list.map(
    (name, i) =>
      `${i + 1}. [查看：${resolveName(name)}](/docs/${name}/index.md)`
  )
  const space = '\u0020'
  const gapLine = '\n'.repeat(2)
  const result = `#${space}${title}${gapLine}${lineList.join(gapLine)}${gapLine}`
  return result
}

const beginCreate = async () => {
  const rootList = await getAllDocsNames(__dirname)
  const mainList = rootList.filter((name) => !DirsMap[name])
  const subListInDirs = rootList.filter((name) => !!DirsMap[name])
  const mainContent = createMarkdownContent(mainList, DirsMap['main'])
  const result = [mainContent]
  // 接下来继续生成子目录的markdown
  for (const dir of subListInDirs) {
    const list = await getAllDocsNames(path.resolve(__dirname, dir))
    result.push(
      createMarkdownContent(
        list.map((i) => `${dir}/${i}`),
        DirsMap[dir]
      )
    )
  }
  await fs.writeFile(path.resolve(__dirname, 'index.md'), result.join('\n'))
  console.log('updated.')
}

beginCreate()
