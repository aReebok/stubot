const { html } = require('cheerio/lib/api/manipulation');
const fs = require('fs');
const cheerio = require('cheerio');
const axios = require('axios');
const { type } = require('os');


const getGoogleSearch = () => {
    axios("https://www.google.com/search?q=dragawn bell z").then(res => {
        const html = res.data;
        imdbLink = findLink(html)
        console.log(imdbLink)

    }).catch(err => {
        console.error(err);
    })
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

exports.getGoogleSearch = getGoogleSearch