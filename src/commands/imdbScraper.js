// const { html } = require('cheerio/lib/api/manipulation');
const fs = require('fs');
const cheerio = require('cheerio');
const axios = require('axios');
// const { data } = require('cheerio/lib/api/attributes');

async function searchIMDB(search, request) {
    imdbLink = await getGoogleSearch(search, "imdb")
    data = await scrapIMDB(imdbLink, request)
    return data;
}
exports.searchIMDB = searchIMDB


async function getGoogleSearch(search, loc) {
    oneTrueLink = "";
    await axios("https://www.google.com/search?q=" + search +" "+ loc).then(res => {
        const html = res.data;
        oneTrueLink = findLink(html, loc)

    }).catch(err => {
        console.error(err);
        return "error"
    })
    return oneTrueLink
}
exports.getGoogleSearch = getGoogleSearch

const findLink = (html, loc) => {

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
        if (link.text.includes(loc+'.com')) {
            theOneLink = link.href
            break;
        }
    }
    // console.log(links)
    ind = theOneLink.indexOf("http")
    theOneLink = theOneLink.slice(ind)
    
    ind = -1
    if (loc == "imdb") {
        for (i = 0; i < 5; i++) {
            ind = theOneLink.indexOf("/", ind + 1)
        }
    }
    else {
        ind = theOneLink.indexOf("&", ind + 1)
        ind = ind - 1
    }

    theOneLink = theOneLink.substring(0, ind + 1)
    return theOneLink;
}

const scrapIMDB = async (link, request) => {
    let data = []
    await axios(link).then(res => {
        const html = res.data
        if(request.includes("TITLE")) {
            title = findTitle(html)
            data.push(title);
        }
    }).catch(err => {
        console.error(err);
    });
    return data

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