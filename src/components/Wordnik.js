import React from 'react'
import { getWord } from '../graphql/word';

const apiKey = '30197bf4f65d0e10cc369439c2821011532dc2d97f23f3278'
const baseUri = 'http://api.wordnik.com:80/v4/word.json/'

export const define = async (word, event) => {
    event.preventDefault()
    const uri = `${baseUri}${word}/definitions?limit=200&includeRelated=true&useCanonical=false&includeTags=false&api_key=${apiKey}`
    const response = await fetch(uri)
    const json = await response.json();
    return json
}


/*
Search for word with `definition`

Check for `type of speach` when search is returned and if more than one is present then allow user to filter results

When user has desired results allow them to search for examples and related words and add them to that word's page



*/
