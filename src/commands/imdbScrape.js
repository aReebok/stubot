const { html } = require('cheerio/lib/api/manipulation');
const fs = require('fs');
const cheerio = require('cheerio');
const axios = require('axios');
const { type } = require('os');

async function startSearch(search) {
    imdbLink = await getGoogleSearch(search)
    title = await scrapIMDB(imdbLink)
    console.log(title)
}

const scrapIMDB = async (link) => {
    title = ""
    await axios(link).then(res => {
        const html = res.data
        title = findTitle(html)

    }).catch(err => {
        console.error(err);
    });
    return title
}

const findTitle = (html) => {
    const $ = cheerio.load(html)
    headerObjects = $('h1')
    headers = []
    headerObjects.each((index, element) => {
        headers.push({
            text:$(element).text(),
        })
    })
    title = headers[0].text
    return title
}

async function getGoogleSearch(search) {
    oneTrueLink = "";
    await axios("https://www.google.com/search?q=" + search).then(res => {
        const html = res.data;
        oneTrueLink = findLink(html)
    }).catch(err => {
        console.error(err);
        return "error"
    })
    return oneTrueLink
}
const findLink = (html) => {
    const $ = cheerio.load(html)
    linkObjects = $('a')
    links = []
    linkObjects.each((index, element) => {
        links.push({
            text:$(element).text(), 
            href: $(element).attr('href'),
        })
    })
    theOneLink = ""
    for (link of links) {
        if (link.text.includes("imdb")) {
            theOneLink = link.href
            break;
        }
    }
    ind = theOneLink.indexOf("http")
    theOneLink = theOneLink.slice(ind)

    ind = -1
    for (i = 0; i < 5; i++) {
        ind = theOneLink.indexOf("/", ind + 1)
    }
    theOneLink = theOneLink.substring(0, ind + 1)
    return theOneLink;
}

exports.startSearch = startSearch