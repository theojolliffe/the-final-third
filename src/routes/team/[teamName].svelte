<script>
    import {page} from '$app/stores'
	import { teams } from '../fb-utils'

    import * as someJSON from './tweets.json';

	console.log('someJSON', someJSON.default)

    $: teamName = $page.params.teamName
    $: teamName = teams.find(d => d.id==teamName).name
	$: tweets = someJSON.default[teamName]['data']
	$: console.log("TWEETS", tweets)

</script>
<div style="width: 640px; margin:0 auto;">
    <div>
        <div style="width: 640px; margin: 50px auto;">
            <h1>Latest {teamName} match report</h1>
        </div>
    </div>
</div>
<div id="tweet-cont" style="width: 640px; margin:0 auto;">
    {#each tweets.reverse() as { id, text }, i}
        <div>
            <a class="tweets" href={"https://twitter.com/_Numbers_Game/status/"+id} target="_blank">{text}</a>
        </div>
        <br>
    {/each}
</div>

<!-- <div>
	{#if loaded&teamLoad&topicsLoad}
		<div id="sf">
			<div style="width: 640px; margin:0 auto;">
				<div>
					<div style="width: 640px; margin: 50px auto;">
						<h1>Latest {teamName} match report</h1>
					</div>
				</div>
			</div>
		</div>
		<main>
			{@html results(data, topics)}
			<hr style="width: 40%; margin: 60px auto 30px auto;"/>
		</main>
	{/if}
</div> -->

<style>
    a.tweets {
        color: var(--heading-color);
    }
    /* a:-webkit-any-link {
        color: var(--accent-color);
        cursor: pointer;
        text-decoration: underline;
    } */
    a:hover {
        background-color: yellow;
    }
</style>