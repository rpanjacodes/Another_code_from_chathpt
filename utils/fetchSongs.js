

const { YTDlpWrap } = require("yt-dlp-wrap"); // For CommonJS

const ytDlp = new YTDlpWrap();

const { PLAYLIST_URL } = require("../config/config");

async function getSongs() {

    try {

        const output = await ytDlp.execPromise([

            PLAYLIST_URL,

            "--format", "bestaudio",

            "--quiet",

            "--no-warnings",

            "--get-url"

        ]);

        

        const urls = output.trim().split("\n");

        return urls;

    } catch (err) {

        console.error("Error fetching songs:", err);

        return [];

    }

}

module.exports = { getSongs };
