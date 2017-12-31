import React from 'react';
import { graphql, compose } from 'react-apollo';
import { getWord } from '../graphql/word'
import { updateWord, deleteWord } from '../graphql/word'
import { getUser } from '../graphql/user'

class Word extends React.Component {
    state = {
        newWord: '',
        errors: {},
    }
    handleIsEditing () {
        this.setState({ isEditing: !this.state.isEditing })
    }
    onChange = (e) => {
        this.setState({ newWord: e.target.value })
    }

    updateWord = async (word, newWord, event) => {
        // const newWord = this.state.newWord
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
        const { word, newWord } = this.state
        console.log('word:', this.props);
        
        return (
            <div onClick={() => this.handleIsEditing()}>
            {getWord &&
                    <ul className="word-page">
                        <li className="capalaize">
                            <h4>{getWord.word}</h4>
                        </li>
                    <li><i>{getWord.partOfSpeach}</i></li>
                    <li><b>Definition:</b><br />{getWord.definition}</li>
                        <li className="word-list--buttons">
                        <button 
                            className="btn btn-primary" onClick={(event) => this.updateWord(getWord.word, newWord, event)}>Save</button>
                            <button className="btn" onClick={() => this.deleteWord(getWord.word)}>Delete</button>
                        </li>
                    </ul>
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
