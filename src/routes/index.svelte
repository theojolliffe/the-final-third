<script>

	import { page } from '$app/stores';

	import { teams } from './fb-utils'

</script>

<div class='grid-container'>
	{#each teams as { id, name }, i}
		<div class="team-div" class:active={$page.url.pathname === '/'+id}><a sveltekit:prefetch href={'/team/'+id}>{name}</a></div>
	{/each}
</div>