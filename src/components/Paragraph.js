import React from 'react';
import {connect} from 'react-redux';
import {fetchParagraph} from '../actions/actions';
import { bindActionCreators } from 'redux';
import Character from './Character';

class Paragraph extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchParagraph();
    }

    render () {
        if(this.props.loading) {
            return <p>Loading..</p>;
        } else {
            // return <p>{this.props.paragraph}</p>;
            return (
                <div className="paragraph__container">
                    {this.props.characterArray.map((char, index) => {
                        return <Character key={index} char={char}/>
                    })}
                </div>
            );
        }
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


const mapDispatchToProps = (dispatch) => {
    return {
      fetchParagraph: bindActionCreators(fetchParagraph, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Paragraph);