import React from 'react';
import {connect} from 'react-redux';
import { updateInputQuery, updateValidity } from '../actions/actions';

class Textbox extends React.Component {
    constructor(props) {
        super(props);
    }

    updateQueryInput = (input) => {
        this.props.dispatch(updateInputQuery(input));
    }

    checkValidity = (input, queryLength, event) => {
        const currentValidity = this.props.valid;
        if(input && input.length) {
            if(queryLength < this.props.validityArray.length) {
                const purgedArray = this.props.validityArray.slice();
                purgedArray[purgedArray.length - 1] = null;
                var updatedValidity = this.props.characterArray[queryLength - 1] === input && !(purgedArray.indexOf(false) >= 0);
            } else {
                updatedValidity = this.props.characterArray[queryLength - 1] === input && !(this.props.validityArray.indexOf(false) >= 0);
            }
            this.props.dispatch(updateValidity(updatedValidity, queryLength));
        } else {
            this.props.dispatch(updateValidity(true, 0));
        }
    }

    render() {
        return (
            <div>                
                <input type="textbox" 
                className={this.props.valid ? "textbox__container valid_input_box" : "textbox__container invalid_input_box"}
                onChange={(e) => this.checkValidity(e.target.value[e.target.value.length - 1], e.target.value.length, e)} 
                placeholder="start typing..."
                />
                {this.props.valid}
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
    return {
        'query': state.query,
        'valid': state.valid,
        'characterArray': state.characterArray,
        'validityArray': state.validityArray
    };
};

export default connect(mapStateToProps)(Textbox);
