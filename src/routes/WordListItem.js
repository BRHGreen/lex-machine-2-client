import React from 'react';

const WordListItem = (getUser) => {
    console.log('getUser', getUser)
    return (
        <div>
        {getUser.words && getUser.words.map((word, i) => {
            console.log('word', word),
            <li key={i}>
            <p>{word.word}</p>
            <button onClick={() => alert('update')}>Update</button>
            <button onClick={() => alert('delete')}>Delete</button>
            </li>
        })
    }
    </div>
    )
}

export default WordListItem