import React from 'react'

// const uri = 'http://api.wordnik.com:80/v4/word.json'

// export class Define extends React.component {
//     componentWillMount() {
//         const uri = 'http://api.wordnik.com:80/v4/word.json/table/definitions?limit=200&includeRelated=true&sourceDictionaries=all&useCanonical=false&includeTags=false&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5'
//         fetch(uri).then(res => {
//             return res.json()
//         }).then(data => {
//             console.log('data', data)
//         })
//     }
// }
const apiKey = "30197bf4f65d0e10cc369439c2821011532dc2d97f23f3278"
export const Define = (word, event) => {
    event.preventDefault()
    const uri = "http://api.wordnik.com:80/v4/word.json/table/definitions?limit=200&includeRelated=true&sourceDictionaries=all&useCanonical=false&includeTags=false&api_key=30197bf4f65d0e10cc369439c2821011532dc2d97f23f3278"
    fetch(uri).then(res => {
        return res.json()
    }).then(data => {
        console.log('data', data)
    }).catch(err => {
        console.log('err:', err)
    })
}

