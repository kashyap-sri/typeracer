import React,{Component} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import Textbox from './Textbox';
import Paragraph from './Paragraph';
import Header from './Header';

let paragraph;

class Landing extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        <Header/>
        <Paragraph/>
        <Textbox/>
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  return {
      'query': state.query
  };
};


export default connect(mapStateToProps)(Landing);
