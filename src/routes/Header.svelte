<script>
	import logo from '$lib/images/logo.png';
	import logoDark from '$lib/images/logo-dark.png';

	let isDarkMode = false;

	const toggleTheme = () => {
		document.body.classList.toggle('dark');
		document.body.classList.toggle('light');
		isDarkMode = !isDarkMode;
	}
</script>

<header>
	<div class="logo">
		<a href="/"><img src={isDarkMode ? logoDark : logo} alt="jiangzi's blog" /></a>
	</div>

	<button
		type="button"
		aria-pressed={isDarkMode}
		aria-label="Dark mode"
		class="theme-toggle"
		on:click={toggleTheme}
	>
		<span class="check" class:checked={isDarkMode}
			><span class="icon">
				{#if isDarkMode}
					<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
						><path
							fill="currentColor"
							d="M12 21q-3.775 0-6.388-2.613T3 12q0-3.45 2.25-5.988T11 3.05q.625-.075.975.45t-.025 1.1q-.425.65-.638 1.375T11.1 7.5q0 2.25 1.575 3.825T16.5 12.9q.775 0 1.538-.225t1.362-.625q.525-.35 1.075-.037t.475.987q-.35 3.45-2.937 5.725T12 21Zm0-2q2.2 0 3.95-1.213t2.55-3.162q-.5.125-1 .2t-1 .075q-3.075 0-5.238-2.163T9.1 7.5q0-.5.075-1t.2-1q-1.95.8-3.163 2.55T5 12q0 2.9 2.05 4.95T12 19Zm-.25-6.75Z"
						></path></svg
					>
				{:else}
					<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"
						><g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
							><path d="M0 0h24v24H0z"></path><path
								fill="currentColor"
								d="M12 19a1 1 0 0 1 .993.883L13 20v1a1 1 0 0 1-1.993.117L11 21v-1a1 1 0 0 1 1-1zm6.313-2.09l.094.083l.7.7a1 1 0 0 1-1.32 1.497l-.094-.083l-.7-.7a1 1 0 0 1 1.218-1.567l.102.07zm-11.306.083a1 1 0 0 1 .083 1.32l-.083.094l-.7.7a1 1 0 0 1-1.497-1.32l.083-.094l.7-.7a1 1 0 0 1 1.414 0zM4 11a1 1 0 0 1 .117 1.993L4 13H3a1 1 0 0 1-.117-1.993L3 11h1zm17 0a1 1 0 0 1 .117 1.993L21 13h-1a1 1 0 0 1-.117-1.993L20 11h1zM6.213 4.81l.094.083l.7.7a1 1 0 0 1-1.32 1.497l-.094-.083l-.7-.7A1 1 0 0 1 6.11 4.74l.102.07zm12.894.083a1 1 0 0 1 .083 1.32l-.083.094l-.7.7a1 1 0 0 1-1.497-1.32l.083-.094l.7-.7a1 1 0 0 1 1.414 0zM12 2a1 1 0 0 1 .993.883L13 3v1a1 1 0 0 1-1.993.117L11 4V3a1 1 0 0 1 1-1zm0 5a5 5 0 1 1-4.995 5.217L7 12l.005-.217A5 5 0 0 1 12 7z"
							></path></g
						></svg
					>
				{/if}
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

	.check.checked {
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

	.icon svg {
		width: 12px;
		height: 12px;
		position: absolute;
		top: 3px;
		left: 3px;
	}
</style>
