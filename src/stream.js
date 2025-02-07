const ffmpeg = require("fluent-ffmpeg");

const { getSongs } = require("../utils/fetchSongs");

const { STREAM_URL } = require("../config/config");

async function startStream() {

    const urls = await getSongs();

    if (urls.length === 0) {

        console.log("No songs found. Retrying in 30 seconds...");

        setTimeout(startStream, 30000);

        return;

    }

    console.log("Starting stream...");

    // Start FFmpeg Stream

    const ffmpegProcess = ffmpeg()

        .input(urls[0]) // First song URL

        .inputFormat("mp3")

        .audioCodec("aac")

        .audioBitrate("128k")

        .outputOptions(["-f flv"])

        .output(STREAM_URL)

        .on("end", () => {

            console.log("Stream ended, restarting...");

            startStream();

        })

        .on("error", (err) => {

            console.error("FFmpeg error:", err);

            startStream();

        })

        .run();

}

module.exports = { startStream };
