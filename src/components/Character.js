import React, {Component} from 'react';
import {connect} from 'react-redux';

class Character extends React.Component {
    
    constructor(props) {
        super(props);
    }

    render(){
        return <span>{this.props.char}</span>;
    }
}

const mapStateToProps = (state, props) => {
    return {
        'query': state.query,
        'loading': state.loading,
        'paragraph': state.paragraph,
        'characterArray': state.characterArray
    };
};


export default connect(mapStateToProps)(Character);