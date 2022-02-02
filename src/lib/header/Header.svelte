<div id="top" class="headline">
    <div class="top-50">
        <a sveltekit:prefetch href="/">
            <div class="text-semi">
                The Numbers Game
            </div>
        </a>
        <div class="div-block-107">
            <div class="div-block-109">
                <a href="https://twitter.com/_Numbers_Game" target="_blank" class="text-regular bold info-link bluehighlight">Twitter</a>
                <a href="mailto:seeablenews@gmail.com" target="_blank" class="text-regular bold info-link pinkhighlight">Email</a>
            </div>
        </div>
    </div>
    <div class="flex">
        <div class="text-regular">
            This is an experiment in data journalism, using a machine learning model to generate articles based on football data. I am currently using a Text-to-Text transformer model (called T5) which can be trained to turn data into into natural language. The project is in an early stage of development and will contain errors. Please verify accuracy with <a class="source" href="https://fbref.com/en/">FBREF</a>, the original data source, before sharing content.
            <br>
        </div>
    </div>
</div>


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
        padding-top: 18px;
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

    .top-50 {
        width: 180%;
        margin-right: 60px;
    }

    @media only screen and (max-width: 600px) {
        .headline {
            display: revert;
            padding: 4px 8px 20px 4px;
        }
        .top-50 {
            width: 100%;
            margin-bottom: 20px;
        }
    }
</style>