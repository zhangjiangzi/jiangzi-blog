<script lang="ts">
	import type { PageData } from './$types';
	import Header from './Header.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>jiangzi's blog</title>
	<meta name="description" content="The blog of jiangzi" />
</svelte:head>

<main id="content">
	<Header />

	<h1 style="display: none;">The blog of jiangzi</h1>

	<div class="main">
		{#each data.menu as menuItem (menuItem.slug)}
			<div
				class="story"
				style="
					--light: hsl(6, 58%, 80%);
					--dark: hsl(6, 58%, 44%);
					--darker: hsl(6, 58%, 33%);
					--default-light: hsl(0, 0%, 80%);
					--default-dark: hsl(0, 0%, 44%);
					--default-darker: hsl(0, 0%, 34%);"
			>
				<a href="/blogs/{menuItem.slug}">
					<img
						alt=""
						loading="lazy"
						src="/images/{menuItem.slug}.jpg"
						srcset="/images/{menuItem.slug}.jpg"
					/>
					<div class="info">
						<h2>
							<span>{menuItem.title}</span>
						</h2>
						<p>{menuItem['last-modified']}</p>
					</div>
				</a>
			</div>
		{/each}
	</div>
</main>

<style>
	main {
		position: relative;
		width: 100%;
		margin: 0 auto;
		box-sizing: border-box;
	}

	.main {
		line-height: 1.65;
		padding: 4em 0 2em;
	}

	.story {
		width: 100%;
		margin-bottom: 0.25rem;
		padding: 0 1rem;
		background-color: var(--light);
	}

	.story > a {
		max-width: 80rem;
		color: var(--color-link);
		background: none;
		display: -webkit-box;
		display: flex;
		padding: 2rem 0;
		-webkit-box-align: start;
		align-items: flex-start;
		text-decoration: none;

		width: 100%;
		margin: 0 auto;
	}

	.story > a > img {
		max-width: 320px;
		border: 1px solid var(--default-darker);
		transition: all 0.1s ease-in;
	}

	.story > a > .info {
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		flex-direction: column;
		padding: 0 1.5em;
	}

	.story > a > .info > h2 {
		margin: 0;
		color: currentColor;
		font-weight: var(--font-weight-normal);
		font-size: var(--font-size-medium);
	}

	.story > a > .info > h2 > span {
		color: var(--color-text);
		background-size: 100% 0.05em;
		background-position: 0 90%;
		background-repeat: no-repeat;
		background-image: -webkit-gradient(
			linear,
			left top,
			left bottom,
			from(var(--dark)),
			to(var(--dark))
		);
		background-image: -o-linear-gradient(var(--dark), var(--dark));
		background-image: linear-gradient(var(--dark), var(--dark));
		-webkit-transition: all 0.1s ease-in;
		-o-transition: all 0.1s ease-in;
		transition: all 0.1s ease-in;
		padding: 0 0.05em;
	}

	.story > a > .info > p {
		color: var(--darker);
		font-size: var(--font-size-small);
		line-height: 1.65;
	}

	.story > a:hover {
		outline: none;
	}

	.story > a:hover > img {
		transform: scale(1.02);
		-webkit-transform: scale(1.02);
	}

	.story > a:hover > .info > h2 > span {
		background-size: 100% 0.1em;
		background-image: -webkit-gradient(
			linear,
			left top,
			left bottom,
			from(var(--darker)),
			to(var(--darker))
		);
		background-image: -o-linear-gradient(var(--darker), var(--darker));
		background-image: linear-gradient(var(--darker), var(--darker));
	}

	html[data-theme='dark'] .main .story {
		background: var(--dark);
	}

	html[data-theme='dark'] .main .story > a > .info > p {
		color: var(--light);
	}
</style>
