<script>
	import Birthday from '$lib/Birthday.svelte';

	export let data;
	console.log(data);
</script>

<h1>Birthday list</h1>

<ol>
	{#each data.birthdays as birthday}
		<li>
			<Birthday {...birthday}></Birthday>
		</li>
	{/each}
</ol>

<style>
	ol {
		list-style-type: none;
		padding-left: 0;
	}

	li {
		padding: 10px;
	}
</style>
