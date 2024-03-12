<script>
	export let form = undefined;
</script>

{#if form?.error}
	<p class="error">{form.error}</p>
{/if}

<form name="birthday" method="post">
	<label>
		Name
		<input type="text" name="name" value={form?.name || ''} />
	</label>

	<label>
		Date of birth
		<input type="text" name="dateOfBirth" value={form?.dateOfBirth || ''} />
	</label>

	<input type="submit" value="Save" />
</form>

<style>
	.error {
		color: red;
	}
</style>
