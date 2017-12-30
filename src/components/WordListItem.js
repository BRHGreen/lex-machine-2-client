import React from 'react'
import { Link } from 'react-router-dom'


const WordListItem = ({ getUser, deleteWord }) => {
    return (
        <div>
            {getUser.words && getUser.words.map((word, i) => {
                return (
                    console.log('word', word),
                    <li key={i}>
                        <p>{word.word}</p>
                        <p>{word.partOfSpeach}</p>
                        <p>{word.definition}</p>
                        <Link to={`/word/${word.id}`}>
                            <button>Edit</button>
                        </Link>
                        <button onClick={() => deleteWord(word.word)}>Delete</button>
                    </li>
                )
            })}
        </div>
    )
}

export default WordListItem
