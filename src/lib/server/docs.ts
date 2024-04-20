import fs from 'fs';
import { marked } from 'marked';
import type { MenuItem } from './type';

const menu: MenuItem[] = JSON.parse(fs.readFileSync('docs/menu.json', 'utf8'));

const getDocHtmlContent = (slug: string) => {
	const content = marked.parse(fs.readFileSync(`docs/${slug}.md`, 'utf8'));
	return content;
};

const getMenuItem = (slug: string) => {
	return menu.find((item) => item.slug === slug);
};

const getMenu = () => {
  return menu;
};

export { getDocHtmlContent, getMenuItem, getMenu };
