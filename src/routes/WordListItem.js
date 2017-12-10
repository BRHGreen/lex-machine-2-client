import React from 'react';
import { Link } from 'react-router-dom';

const WordListItem = ({ getUser, deleteWord }) => { 
    return (
        <div>
   {getUser.words && getUser.words.map((word, i) => {
       return (
           <li key={i}>
            <p>{word.word}</p>
                <Link to={`/word/${word.id}`}>
                    <button>Update</button>
                </Link>
            <button onClick={() => deleteWord(word.word)}>Delete</button>
           </li>
       )
   })} 
    </div>
    )
}

export default WordListItem