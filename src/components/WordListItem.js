import React from 'react'
import { Link } from 'react-router-dom'


const WordListItem = ({ getUser, deleteWord }) => (
    <div>
        {getUser.words && getUser.words.map((word, i) => {
            return (
                <ul className="word-list" key={i}>
                    <li><hr/></li>
                    <li
                        className="capalaize"
                    >
                        <Link to={`/word/${word.id}`}>
                            <h4>{word.word}</h4>
                        </Link>
                    </li>
                    <li><i>{word.partOfSpeach}</i></li>
                    <li><b>Definition:</b><br/>{word.definition}</li>
                    <li className="word-list--buttons">
                        <Link to={`/word/${word.id}`}>
                            <button className="btn btn-primary">Edit</button>
                        </Link>
                        <button className="btn" onClick={() => deleteWord(word.word)}>Delete</button>
                    </li>
                </ul>
            )
        })}
    </div>
)


export default WordListItem
