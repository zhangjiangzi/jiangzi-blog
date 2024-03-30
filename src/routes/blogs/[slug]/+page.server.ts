import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { getDocHtmlContent, getMenuItem } from '$lib/server/docs';

export const load: PageServerLoad = ({ params }) => {
  const menuItem = getMenuItem(params.slug);

	if (menuItem) {
		return { 
      title: menuItem.title, 
      subTitle: menuItem['sub-title'],
      content: getDocHtmlContent(menuItem.slug),
      description: menuItem['seo-description'],
      lastModified: menuItem['last-modified'],
    };
	}

	error(404, 'Not found');
};