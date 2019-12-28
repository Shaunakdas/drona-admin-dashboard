/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import {
  Col,
} from "react-bootstrap";
import { connect } from 'react-redux';

import Question from "components/Question/Question";
import QuestionList from "components/Question/QuestionList";

class QuestionEditor extends Component {
  questionSelected(){
    const {games, questions} = this.props;
    if (questions.openForEditing){
      return questions.questions.find(x => x.id === questions.selectedId);
    }else{
      return games.questionStructure;
    }
  }
  render() {
    const question = this.questionSelected();
    return (
      <Col md={9}>
        {
          ((!(question === undefined)) && ("blocks" in question))?
            <QuestionList questionObj={this.questionSelected()} /> :
            <Question questionObj={this.questionSelected()} />
        }  
      </Col>
    );
  }
}
const mapStateToProps = (state) => {
  return {
      questions: state.questions,
      games: state.games
  };
};
export default connect(mapStateToProps, null) (QuestionEditor);
