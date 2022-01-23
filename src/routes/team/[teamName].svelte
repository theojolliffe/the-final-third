<script>
	import Header from '$lib/header/Header.svelte';
    import {page} from '$app/stores'
	import { teams } from '../fb-utils'

    import * as someJSON from '../tweets.json';

    import { Email, HackerNews, Reddit, LinkedIn, Pinterest, Telegram, Tumblr, Vk, WhatsApp, Xing, Facebook, Twitter, Line } from 'svelte-share-buttons-component';

    let data = someJSON.default
    data = Object.keys(data).map(e => {
        // let objt = {};
        // objt[e] = data[e];
        return data[e]
    })


    $: teamName = $page.params.teamName
    $: teamName = teams.find(d => d.id==teamName).name

    $: tweets = data.find(e => e.misc.team == teamName).data

	$: tweets = tweets.sort(function(a, b){
        return parseInt(a['id']) - parseInt(b['id'])
    });
	$: console.log(teamName, data.find(e => e.misc.team == teamName))

    let expanded;
    function toggle(id) {
        if (expanded==id) {
            expanded = null;
        } else {
            expanded = id;
        }
	}

    const url = 'https://twitter.com/LeicesterTng/status/1485011327630417928';
	const title = 'Svelte Share Buttons Component';
	const desc = 'Svelte based social media share buttons component with no tracking.';

</script>


<body class="body2">
	<Header />
	<div style="height: 50px;"></div>
    <div id="head-cont">
        <h2>
            Latest <span style="white-space: nowrap;">{teamName}</span> <br> match report
        </h2>
    </div>

	<div id="text-top"></div>
	<div id="tweet-cont" style="width: 640px; margin:0 auto;">
		{#each tweets as { id, text }, i}
			<!-- <div>
				<a class="tweets" href={"https://twitter.com/_Numbers_Game/status/"+id} target="_blank">{text}</a>
			</div> -->
            <div class={(expanded==id)?"selectedtweet":"unselectedtweet"}>
                <div> 
                    <span class="tweets" on:click={toggle(id)}>{text}</span>
                    <br>
                    {#if expanded==id}
                        <div class="share-cont">
                            <Twitter class="share-button" text="{text}" url={"https://twitter.com/_Numbers_Game/status/"+id} />
                            <Reddit class="share-button" text="{"Read this tweet from the latest " + teamName + " match"}" url={"https://twitter.com/_Numbers_Game/status/"+id} />
                            <WhatsApp class="share-button" text="{text} url={"https://twitter.com/_Numbers_Game/status/"+id}" />
                            <Facebook class="share-button" quote="{text}" url={"https://twitter.com/_Numbers_Game/status/"+id} />
                        </div>
                    {/if}
                    <br>
                </div>
            </div>
		{/each}
	</div>
</body>

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
    .share-cont {
        width: max-content;
        margin: auto;
        margin-top: 40px;
    }
    .selectedtweet {
        border: 1px solid red;
        /* width: 110%; */
        /* margin: 0px 0px 0px -5%; */
        padding: 5%;
        border-radius: 20px;

        border: 1px solid #00917c;
        padding: 5%;
        border-radius: 20px;
        background: #f0f7f6;
        margin: 10px 0 30px 0;
    }

    /* a:-webkit-any-link {
        color: var(--accent-color);
        cursor: pointer;
        text-decoration: underline;
    } */
    a:hover {
        background-color: yellow;
    }
    span:hover {
        background-color: yellow;
    }

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
        font-size: 8vw;
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

    .tweets {
        color: var(--heading-color);
		line-height: initial;
		font-size: large;
        color: #434343;
        line-height: 1.4;
        font-weight: 300;
        cursor: pointer;
    }

    #head-cont {
        background: black;
        color: white;
        width: 100vw;
        margin: 0 0 50px -16px;
        /* height: 220px; */
        padding: 5%;
        padding-bottom: 25%;
    }
    #text-top {
        height: 50px;
    }
    @media only screen and (max-width: 650px) {
        #text-top {
            height: 20px;
        }
        #tweet-cont {
            width: revert !important;
        }
        .tweets {
            font-size: medium;
        }
        h2 {
            font-size: 10vw;
        }
    }

    :global(.ssbc-button) {
        border-radius: 5px;
    }

</style>