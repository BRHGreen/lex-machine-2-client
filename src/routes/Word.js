import React from 'react';
import { graphql, compose } from 'react-apollo';
import { getWord } from '../graphql/word'
import { updateWord } from '../graphql/word'
import { getUser } from '../graphql/user'

class Word extends React.Component {
    state = {
        isEditing: false,
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
        });
        this.props.history.push('/');
    };

    render () {
        const { getWord } = this.props.data
        const { word, newWord } = this.state.newWord
        return (
            <div onClick={() => this.handleIsEditing()}>
            {getWord &&
                <input
                    placeholder={getWord.word}
                    value={word}
                    onChange={this.onChange}
                />
            }
                <button className="btn" onClick={(event) => this.updateWord(getWord.word, this.state.newWord, event)}>Save</button>
            </div>
        )
    }
}

const WordWithMutations = compose(
    graphql(updateWord, {
        name: 'updateWord'
    }),
    graphql(getWord, {
        options: (props) => { return { variables: { id: props.match.params.id } } }
    })
)(Word)

export default WordWithMutations
