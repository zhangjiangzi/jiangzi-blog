import showdown from 'showdown'
import fs from 'fs'
import type { MenuItem } from './type'

const converter = new showdown.Converter()
const menu: MenuItem[] = JSON.parse(fs.readFileSync('docs/menu.json', 'utf8'))

const getDocHtmlContent = (slug: string) => {
  const content = converter.makeHtml(fs.readFileSync(`docs/${slug}.md`, 'utf8'))
  return content
}

const getMenuItem = (slug: string) => {
  return menu.find((item) => item.slug === slug)
}

export {
  getDocHtmlContent,
  getMenuItem
}