"use strict"

const qs = require('qs')
const moment = require('moment')
//const templateStore = require('./templates/templateStore.js')
const templateTest = require('./templates/search-results.hbs')

const GITHUB_API = "https://api.github.com"

async function searchGithub(search) {
    const searchParameters = {
        q: 'Vue.js',
        sort: 'stars',
        pushed: '>' + moment().subtract(1, 'week').format('YYYY-MM-DD'),
        order: 'desc'
    }
    const url = `${GITHUB_API}/search/repositories?${qs.stringify(searchParameters)}`
    console.log(url)
    const response = await fetch(url)
    return await response.json()
}

function renderResults(results) {
	console.log(results)
    const resultElement = document.querySelector('#results')
    //TODO use handlebar
    //resultElement.value = JSON.stringify(results, true, '\t')
	//resultElement.innerHTML = templateStore.searchResults(results)
	resultElement.innerHTML = templateTest(results)
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
