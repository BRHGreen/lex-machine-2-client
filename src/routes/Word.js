import React from 'react';
import { graphql } from 'react-apollo';
import { getWord } from '../graphql/word'
import { updareWord } from '../graphql/word'

class Word extends React.Component {
    state = {
        word: '',
        errors: {},
    }
    render () {
        const { getWord } = this.props.data
        return (
            <div>
            {getWord &&
                <p>{getWord.word}</p>
            }
            </div>
        )
    }
}

export default graphql(getWord, {
    options: (props) => { return { variables: { id: props.match.params.id } } }
})(Word)