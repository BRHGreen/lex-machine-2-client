import React from 'react';
import { graphql, compose } from 'react-apollo';
import { getWord } from '../graphql/word'
import { updateWord, deleteWord } from '../graphql/word'
import { getUser } from '../graphql/user'

class Word extends React.Component {
    state = {
        newWord: '',
        newPartOfSpeach: '',
        newDefinition: '',
        errors: {},
    }
    handleIsEditing (state) {
        this.setState({ isEditing: state })
    }
    onChange = (e) => {
        this.setState({ newWord: e.target.value })
    }

    updateWord = async (word, newWord, event) => {
        event.preventDefault()
        const response = await this.props.updateWord({
            variables: { word, newWord },
            refetchQueries: [{
                query: getUser
            }]
        })
        this.props.history.push('/');
    };

    deleteWord = async (word) => {
        const response = await this.props.deleteWord({
            variables: { word },
            refetchQueries: [{
                query: getUser
            }]
        })
        this.props.history.push('/');
    }

    render () {
        const { getWord } = this.props.data
        const { 
            word,
            newWord,
            newPartOfSpeach,
            newDefinition,
            isEditing,
         } = this.state
        console.log('word:', this.props);
        
        return (
            <div>
            {!isEditing
                    ? <div>
                    {getWord &&
                    <ul className="word__page">
                    <li className="capalaize">
                            <div>
                                <h4>{getWord.word}</h4>
                            </div>
                        </li>
                    <li><i>{getWord.partOfSpeach}</i></li>
                    <li><b>Definition:</b><br />{getWord.definition}</li>
                        <li className="word-list--buttons">
                                <button className="btn btn-primary" onClick={() => this.handleIsEditing(true)}>Edit</button>
                        <button className="btn" onClick={() => this.deleteWord(getWord.word)}>Delete</button>
                        </li>
                    </ul>
                    }
                    </div>
                    : <div>
                    {getWord &&
                    <ul className="word__page--edit">
                        <li className="capalaize" onClick={() => this.handleIsEditing(true)}>
                            <div>
                                <label>Word:</label>
                                    <input
                                    placeholder={getWord.word}
                                    value={newWord}
                                    onChange={this.onChange}
                                    />
                                </div>
                        </li>
                        <li>
                                <div>
                                    <label>Part of speach:</label>
                                    <input
                                        placeholder={getWord.partOfSpeach}
                                        value={newPartOfSpeach}
                                        onChange={this.onChange}
                                    />
                                </div>
                        </li>
                        <li>
                            <div>
                                <label>Definition:</label>
                                <textarea
                                    placeholder={getWord.definition}
                                    value={newDefinition}
                                    onChange={this.onChange}
                                />
                            </div>
                        </li>
                    <li className="word-list--buttons">
                                <button
                                    className="btn btn-primary" onClick={(event) => this.updateWord(getWord.word, newWord, event)}>Save</button>
                        <button className="btn" onClick={() => this.handleIsEditing(false)}>Cancel</button>
                    </li>
                    </ul>
                    }
                    </div> 
            }
            </div>
        )
    }
}

const WordWithMutations = compose(
    graphql(updateWord, {
        name: 'updateWord'
    }),
    graphql(deleteWord, {
        name: 'deleteWord'
    }),
    graphql(getWord, {
        options: (props) => { return { variables: { id: props.match.params.id } } }
    })
)(Word)

export default WordWithMutations
