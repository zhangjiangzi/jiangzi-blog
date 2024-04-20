<script>
	import Header from './Header.svelte';
</script>

<svelte:head>
	<script>
		window.MathJax = {
			tex: {
				inlineMath: [
					['$', '$'],
					['\\(', '\\)']
				]
			}
		};
	</script>
	<script type="text/javascript" id="MathJax-script" async src="/mathjax/tex-mml-chtml.js">
	</script>
</svelte:head>

<main id="content">
	<Header />
	<slot />
</main>

<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 80rem;
		margin: 0 auto;
		box-sizing: border-box;
		padding: 4rem 1rem 0 1rem;
		position: relative;
	}
</style>