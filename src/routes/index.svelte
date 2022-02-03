<script>
	import Header from '$lib/header/Header.svelte';
	import { page } from '$app/stores';
	import { teams } from './fb-utils';
    import * as someJSON from './tweets.json';
    // let data = someJSON
    // console.log('someJSON', data)
    // teams.sort(function(a, b){
    //     return parseInt(data[b['name']].misc.story_id) - parseInt(data[a['name']].misc.story_id)
    // });
    // console.log('teams', teams)

    // for (const { id, name } of teams) {
    //     console.log('team', data[name])
    // }

    let data = someJSON.default
    data = Object.keys(data).map(e => {
        // let objt = {};
        // objt[e] = data[e];
        return data[e]
    })
    data.sort(function(a, b){
        return b.misc.story_id - a.misc.story_id
    })
    console.log('data', data)
    
    // teams.sort(function(a, b){
    //     return parseInt(data[b['name']].misc.story_id) - parseInt(data[a['name']].misc.story_id)
    // });
    // console.log('teams', teams)

    // for (const { id, name } of teams) {
    //     console.log('team', data[name])
    // }

    function addZeros(id) {
        if (String(id).length<3) {
            id = "0" + id
        }
        if (String(id).length<3) {
            id = "0" + id
        }
        return id
    }
</script>

<body class="body2">
    <Header />

    <h2>
        Premier League<br>Statistics
    </h2>
    <div class='grid-container'>

        {#each data as { data, misc }, i}
            <a sveltekit:prefetch href={'/team/'+teams.find(d => d.name == misc.team)['id']}>
                <div class="team-div" class:active={$page.url.pathname === '/'+teams.find(d => d.name == misc.team)['id']}>
                    <div class="row number">
                        {addZeros(misc.story_id)}
                    </div>
                    <div class="row name">
                        {misc.team}
                    </div>
                    <div class="row text">
                        <div class='col1'>Opponent</div>
                        <div>{misc.opponent}</div>
                    </div>
                    <div class="row text">
                        <div class='col1'>Result</div>

                        {#if misc.home=='home'}
                            <div><strong>{misc.result[0]}</strong><span style="color: #686868;">-{misc.result[1]}</span></div>
                        {:else}
                            <div><span style="color: #686868;">{misc.result[0]}-</span><strong>{misc.result[1]}</strong></div>
                        {/if}

                    </div>
                    <div class="row text last">
                        <div class='col1'>Date</div>
                        <div>{misc.date}</div>
                    </div>
                </div>
            </a>


            <!-- <a sveltekit:prefetch href={'/team/'+id}>
                <div class="team-div" class:active={$page.url.pathname === '/'+id}>
                    <div class="row number">
                        {((String(data[name].misc.story_id).length<3)?"0":"") + data[name].misc.story_id}
                    </div>
                    <div class="row name">
                        {name}
                    </div>
                    <div class="row text">
                        <div class='col1'>Opponent</div>
                        <div>{data[name].misc.opponent}</div>
                    </div>
                    <div class="row text">
                        <div class='col1'>Result</div>
                        <div>{data[name].misc.result[0]}-{data[name].misc.result[1]}</div>
                    </div>
                    <div class="row text last">
                        <div class='col1'>Date</div>
                        <div>12/03/2022</div>
                    </div>
                </div>
            </a> -->
        {/each}

        <!-- {#each teams as { id, name }, i}
            <a sveltekit:prefetch href={'/team/'+id}>
                <div class="team-div" class:active={$page.url.pathname === '/'+id}>
                    <div class="row number">
                        {((String(data[name].misc.story_id).length<3)?"0":"") + data[name].misc.story_id}
                    </div>
                    <div class="row name">
                        {name}
                    </div>
                    <div class="row text">
                        <div class='col1'>Opponent</div>
                        <div>{data[name].misc.opponent}</div>
                    </div>
                    <div class="row text">
                        <div class='col1'>Result</div>
                        <div>{data[name].misc.result[0]}-{data[name].misc.result[1]}</div>
                    </div>
                    <div class="row text last">
                        <div class='col1'>Date</div>
                        <div>12/03/2022</div>
                    </div>
                </div>
            </a>
        {/each} -->
    </div>
</body>


<style>
    .body2 {
        font-family: system-ui;
        color: #000;
        font-size: 16px;
        line-height: 17px;
        font-weight: 500;
        letter-spacing: 0.06em;
        margin-top: 18px;
    }
    .headline {
        position: relative;
        z-index: 999;
        display: flex;
        width: 98%;
        padding: 4px 8px 20px 16px;
    }
    .top-50 {
        display: flex;
        max-width: 500px;
        padding-right: 10px;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        flex-direction: column;
        -webkit-box-flex: 0;
        width: 1600px;
    }
    .text-semi {
        font-size: 48px;
        line-height: 1;
        font-weight: 400;
    }
    .text-regular {
        font-size: 14px;
        line-height: 1.15;
        font-weight: 400;
    }
    .div-block-107 {
        display: flex;
        padding-top: 8px;
        flex-wrap: wrap;
        align-items: center;
    }
    .text-regular.bold.info-link {
        margin-right: 4px;
        margin-left: 0px;
        padding: 2px 6px 3px;
        border: 1px solid #000;
        border-radius: 24px;
        color: #000;
        font-weight: 400;
        text-decoration: none;
        cursor: pointer;
    }
    .text-regular.bold.info-link.bluehighlight {
        background-color: #c0eeff;
    }
    .text-regular.bold.info-link.pinkhighlight {
        background-color: #ffc2fd;
    }
    .source {
        text-decoration: underline; 
    }
    h2 {
        font-family: system-ui;
        font-size: 12vw;
        margin: auto;
        line-height: 0.85;
    }
    a {
        text-decoration: auto;
        color: black;
    }
    .row {
        border-bottom: 1px solid #000;
        font-size: medium;
        padding-top: 4px;
        padding-bottom: 4px;
    }
    .number {
        font-size: xx-large;
        line-height: 1;
    }
    .name {
        font-weight:800;
    }
    .text {
        display: flex;
        justify-content: flex-start;
    }
    .col1 {
        overflow: hidden;
        width: 40%;
    }
    .last {
        border-bottom: none;
    }

    .grid-container {
		display: grid;
		grid-template-columns: auto auto auto auto;
		grid-gap: 10px;
		padding: 10px;
	}

	.team-div {
		background-color: rgba(255, 255, 255, 0.8);
		text-align: left;
		padding: 20px 0;
        font-family: system-ui;
		font-size: 1.4rem;
		width: 100%;
	}
    @media only screen and (max-width: 1180px) {
        .grid-container {
            grid-template-columns: auto auto auto;
        }
    }
    @media only screen and (max-width: 768px) {
        .grid-container {
            grid-template-columns: auto auto;
        }
    }
    @media only screen and (max-width: 600px) {
        .grid-container {
            grid-template-columns: auto;
        }
    }

</style>