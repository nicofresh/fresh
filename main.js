"use strict"

const qs = require('qs')
const moment = require('moment')

const GITHUB_API = "https://api.github.com"

async function searchGithub(search) {
    const searchParameters = {
        q: 'Vue.js',
        sort: 'stars',
        pushed: '>' + moment().subtract(10, 'days').format('YYYY-MM-DD'),
        order: 'desc'
    }
    const url = `${GITHUB_API}/search/repositories?${qs.stringify(searchParameters)}`
    console.log(url)
    const response = await fetch(url)
    return await response.json()
}

function renderResults(results) {
    const resultElement = document.querySelector('#results')
    //TODO use handlebar
    resultElement.innerHTML = JSON.stringify(results)
}

function indicateError() {
    alert("System error") //TODO this should be rendered nicely in html
}

async function runSearch() {
    try {

        const searchResults = await searchGithub("Vue.js")
        renderResults(searchResults)

    } catch(e) {
        console.error(e)
        indicateError()
    }
}

document.addEventListener('DOMContentLoaded', function() {
    runSearch()
})
