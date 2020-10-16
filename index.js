const core = require('@actions/core');
const exec = require('@actions/exec');
const tc = require('@actions/tool-cache');
const io = require('@actions/io');
const fs = require("fs");


async function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}


// most @actions toolkit packages have async methods
async function run() {
  try {


    let imgName = "sol-11_4-vbox.ova";
    let url= process.env["URL"];
    core.info("Downloading image: " + url);
    let img = await tc.downloadTool(url);
    core.info("Downloaded file: " + img);

    await io.mv(img, "./" + imgName);

    core.info("Split file");
    await exec.exec("zip -0 -s 2000m sol-11_4-vbox.ova.zip sol-11_4-vbox.ova");
    await exec.exec("ls -lah");

  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
