<script>
	const title = '一个绝妙的点子！啊啊';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<h1>{title}</h1>
	<p class="byline">Written on <strong>2023/12/1</strong></p>
	<div class="post"></div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 0.6;
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
