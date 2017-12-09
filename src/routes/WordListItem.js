import React from 'react';

const WordListItem = ({ getUser, deleteWord }) => { 
    return (
        <div>
   {getUser.words && getUser.words.map((word, i) => {
       return (
           <li key={i}>
           <p>{word.word}</p>
           <button onClick={() => alert(word.id)}>Update</button>
           <button onClick={() => deleteWord(word.word)}>Delete</button>
           </li>
       )
   })} 
    </div>
    )
}

export default WordListItem