<script>
	export let form = undefined;
</script>

{#if form?.error}
	<p class="error">{form.error}</p>
{/if}

<form name="birthday" method="post">
	{#if form?.id}
		<!-- only if form requires ID; this makes existing tests pass and may need to be edited for optimization -->
		<input type="hidden" name="id" value={form?.id} />
	{/if}
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
