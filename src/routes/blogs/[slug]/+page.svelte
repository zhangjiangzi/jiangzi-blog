<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>{data.title}</title>
	<meta name="description" content={data.description} />
</svelte:head>

<section>
	<p class="intro-overline">{data.subTitle}</p>
	<h1 class="intro-title">{data.title}</h1>
	<p class="byline">Written on <strong>{data.lastModified}</strong></p>
	<div class="post">{@html data.content}</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
	}

	h1.intro-title {
		max-width: 65rem;
		margin: 0 auto;
		font-weight: bold;
		text-align: center;
		font-size: 40px;
		line-height: 1.2;

    font-family: 'Atlas Grotesk Web', 'Atlas Grotesk Web', Helvetica, Arial, sans-serif;
	}

  @media only screen and (min-width: 40em) {
		h1.intro-title {
			font-size: 48px;
			line-height: 1.2;
		}
	}

	@media only screen and (min-width: 50em) {
		h1.intro-title {
			font-size: 64px;
			line-height: 1.2;
		}
	}

	p.intro-overline {
		max-width: 60rem;
    margin: 0 auto;
    padding-top: 5rem;
    font-weight: 400;
    font-size: 24px;
    text-transform: uppercase;
    color: #f33;
    text-align: center;
    line-height: 1.2;
    letter-spacing: 0.1em;

		font-family: 'Atlas Grotesk Web', 'Atlas Grotesk Web', Helvetica, Arial, sans-serif;
	}

	p.byline {
		max-width: 40rem;
		margin: 0 auto;
		padding-bottom: 1.5rem;
		text-align: center;
		font-size: 16px;
		line-height: 1.5;
		padding-top: 1.5rem;
	}
</style>
