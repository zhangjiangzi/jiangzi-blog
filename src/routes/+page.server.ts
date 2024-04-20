import type { PageServerLoad } from './$types';
import { getMenu } from '$lib/server/docs';

export const load: PageServerLoad = () => {
	return {
		menu: getMenu()
	}
};

// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;