"use strict"

const qs = require('qs')
const moment = require('moment')
const appContext = {
	templateStore: require('./templates/templateStore.js').templates
}

const GITHUB_API = "https://api.github.com"

class SearchResultModel {
	constructor (data) {
		console.log(data)
		this.data = data
	}
}

class SearchResultsView {
	constructor (element, model, context) {
		this.element = element
		this.model = model
		this.template = context.templateStore.searchResults
	}

	render() {
		return this.element.innerHTML = this.template(this.model.data)
	}
}

async function searchGithub(search) {
    const searchParameters = {
        q: 'Vue.js',
        sort: 'stars',
        pushed: '>' + moment().subtract(1, 'week').format('YYYY-MM-DD'),
        order: 'desc'
    }
    const url = `${GITHUB_API}/search/repositories?${qs.stringify(searchParameters)}`
    const response = await fetch(url)
    return new SearchResultModel(await response.json())
}

function indicateError() {
    alert("System error") //TODO this should be rendered nicely in html
}

async function runSearch() {
    try {

        const model = await searchGithub("Vue.js")
		const view = new SearchResultsView(
			document.querySelector('#results'),
			model,
			appContext
		)
		view.render()
    } catch(e) {
        console.error(e)
        indicateError()
    }
}

document.addEventListener('DOMContentLoaded', function() {
    runSearch()
})
