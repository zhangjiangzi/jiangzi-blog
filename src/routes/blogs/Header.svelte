<script lang="ts">
	import logo from '$lib/images/logo.png';
	import { beforeUpdate } from 'svelte';

	let themeMode: 'light' | 'dark' = 'light';

	const toggleTheme = (mode?: 'light' | 'dark') => {
		const next = mode ?? themeMode === 'light' ? 'dark' : 'light';
		document.documentElement.dataset.theme = next;
		themeMode = next;
		localStorage.setItem('theme_mode', next);
	};

	beforeUpdate(() => {
		themeMode = localStorage.getItem('theme_mode') as 'light' | 'dark';
	});
</script>

<svelte:head>
	<script>
		document.documentElement.dataset.theme =
			localStorage.getItem('theme_mode') === 'dark' ? 'dark' : 'light';
	</script>
</svelte:head>

<header>
	<div class="logo">
		<a href="/"><img src={logo} alt="jiangzi's blog" /></a>
	</div>

	<button
		type="button"
		aria-pressed={themeMode === 'dark'}
		aria-label="Dark mode"
		class="theme-toggle"
		on:click={() => toggleTheme()}
	>
		<span class="check"
			><span class="icon">
				<span />
			</span></span
		></button
	>
</header>

<style>
	header {
		z-index: 1000;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}

	header div.logo {
		position: absolute;
		display: block;
		border: none;
		margin: 1rem auto;
		left: 50%;
		transform: translateX(-50%);
	}

	header div.logo a {
		display: inline-block;
	}

	header div.logo a img {
		display: block;
		margin: 0 auto;
		width: auto;

		max-height: 47px;
		padding: 10px 0;
	}

	html[data-theme='dark'] header div.logo a img {
		filter: invert(100%);
	}

	a:hover,
	a:visited {
		color: #2a2a2a;
	}

	button.theme-toggle {
		border: 1px solid var(--color-text-3);
		background-color: var(--color-bg-2);
		border-radius: 11px;
		flex-shrink: 0;
		width: 40px;
		height: 22px;
		transition: border-color 0.25s;
		display: block;
		position: relative;
		cursor: pointer;

		position: fixed;
		top: 20px;
		right: 20px;
	}

	button.theme-toggle:hover {
		color: var(--color-text-2);
		border-color: var(--color-text-2);
	}

	.check {
		background-color: var(--color-bg-3);
		pointer-events: none;
		border-radius: 50%;
		width: 18px;
		height: 18px;
		transition: transform 0.25s;
		position: absolute;
		top: 1px;
		left: 1px;
		box-shadow:
			0 1px 2px #0000000a,
			0 1px 2px #0000000f;
	}

	html[data-theme='dark'] header .check {
		transform: translate(18px);
	}

	.icon {
		border-radius: 50%;
		width: 18px;
		height: 18px;
		display: block;
		position: relative;
		overflow: hidden;
	}

	.icon span {
		width: 12px;
		height: 12px;
		position: absolute;
		top: 3px;
		left: 3px;
		background-image: url('/images/light-icon.svg');
		background-size: contain;
	}

	html[data-theme='dark'] .icon span {
		background-image: url('/images/dark-icon.svg');
	}
</style>
