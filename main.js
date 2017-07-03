"use strict"


const GITHUB_API = "https://api.github.com"

async function main() {
    const resultElement = document.querySelector('#results')

    const url = `${GITHUB_API}/search/repositories?q=` + encodeURIComponent('Vue.js')
    const response = await fetch(url)
    const results = await response.json()

    resultElement.innerHTML = JSON.stringify(results)
}

document.addEventListener('DOMContentLoaded', function() {
    main()
})
