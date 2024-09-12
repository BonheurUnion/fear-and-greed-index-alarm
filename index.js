const { crawl } = require('./crawler');

const targetUrl = 'aHR0cHM6Ly9wcm9kdWN0aW9uLmRhdGF2aXouY25uLmlvL2luZGV4L2ZlYXJhbmRncmVlZC9ncmFwaGRhdGE=';

// serveral static fields for console color into background.
const Reset = "\x1b[0m";
const BgRed = "\x1b[41m";
const BgGreen = "\x1b[42m";

(async () => {

    const FNG_MIN = parseFloat(process.env.FNG_MIN || -1);
    const FNG_MAX = parseFloat(process.env.FNG_MAX || -1);


    if (FNG_MAX < 0 || FNG_MIN < 0) {
        console.log(`${BgRed}%s${Reset}`, "Please set FNG_MIN and FNG_MAX");
        process.exit(1);
    }
    const result = await crawl(Buffer.from(targetUrl, 'base64').toString('utf-8'));
    console.log("FNG for toady is: ", result);
    if (result <= FNG_MIN || result >= FNG_MAX) {
        console.log(`${BgRed}%s${Reset}`, "FNG: ", result, ", is out of range, pls check your stock account.");
        process.exit(1);
    }
    process.exit(0);
})();
