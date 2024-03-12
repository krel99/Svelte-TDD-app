<script>
	import Birthday from '../../lib/Birthday.svelte';
	import Form from '../../lib/Form.svelte';

	export let data;
	export let form = undefined;

	let editing = form?.id ? form : null;
</script>

<h1>Birthday list</h1>

<ol>
	{#each data.birthdays as birthday}
		<li>
			{#if editing?.id === birthday.id}
				<Form form={editing} />
			{:else}
				<Birthday name={birthday.name} dateOfBirth={birthday.dateOfBirth} />
			{/if}
			{#if !editing}
				<button on:click={() => (editing = birthday)}>Edit</button>
			{/if}
		</li>
	{/each}
</ol>

{#if !editing}
	<h1>Add a new birthday</h1>
	<div>
		<Form {form} />
	</div>
{/if}

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
