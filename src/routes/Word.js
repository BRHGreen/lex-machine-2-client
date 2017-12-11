import React from 'react';
import { graphql } from 'react-apollo';
import { getWord } from '../graphql/word'
import { updareWord } from '../graphql/word'

class Word extends React.Component {
    state = {
        isEditing: false,
        word: '',
        errors: {},
    }
    handleIsEditing () {
        this.setState({ isEditing: !this.state.isEditing })
        console.log('this.state:', this.state)
    }
    onChange = (e) => {
        console.log('e:', e)
        console.log('change', e.target.value)
        this.setState({ word: e.target.value })
    }
    render () {
        const { getWord } = this.props.data
        return (
            <div onClick={() => this.handleIsEditing()}>
            
            {getWord &&
                <input
                    placeholder={getWord.word}
                    value={this.state.word}
                    onChange={this.onChange}
                />
            }
            </div>
        )
    }
}

export default graphql(getWord, {
    options: (props) => { return { variables: { id: props.match.params.id } } }
})(Word)