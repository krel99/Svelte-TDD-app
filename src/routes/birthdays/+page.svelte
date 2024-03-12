<script>
	import Birthday from '../../lib/Birthday.svelte';
	import Form from '../../lib/Form.svelte';

	export let data;
	export let form = undefined;
</script>

<h1>Birthday list</h1>

<ol>
	{#each data.birthdays as birthday}
		<li>
			<Birthday {...birthday}></Birthday>
		</li>
	{/each}
</ol>

<h1>Add a new birthday</h1>
<div>
	<Form {form}></Form>
</div>

<style>
	ol {
		list-style-type: none;
		padding-left: 0;
	}

	li,
	div {
		padding: 10px;
	}
</style>
