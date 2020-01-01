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
import SweetAlert from "react-bootstrap-sweetalert";

import Question from "components/Question/Question";
import QuestionList from "components/Question/QuestionList";

class QuestionEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      alert: null,
      show: false
    };
    this.hideAlert = this.hideAlert.bind(this);
  }
  questionSelected(){
    const {games, questions} = this.props;
    if (questions.openForEditing){
      return questions.questions.find(x => x.id === questions.selectedId);
    }else{
      return games.questionStructure;
    }
  }
  basicAlert(error) {
    this.setState({
      alert: (
        <SweetAlert
          style={{ display: "block", marginTop: "-100px" }}
          title={'Error while updating'}
          onConfirm={() => this.hideAlert()}
          onCancel={() => this.hideAlert()}
          confirmBtnBsStyle="info"
        >
          {error}
        </SweetAlert>
      )
    });
  }
  hideAlert() {
    this.setState({
      alert: null
    });
  }
  componentWillReceiveProps(nextProps) {
    const questions = nextProps;
    if('errorMessage' in questions.questions && questions.questions.errorMessage.length > 0){
      this.basicAlert(questions.questions.errorMessage);
    }
   }
  render() {
    const question = this.questionSelected();
    const {deleteQuestion} = this.props;
    return (
      <Col md={9}>
        {
          ((!(question === undefined)) && ("blocks" in question))?
            <QuestionList 
              deleteQuestion={deleteQuestion}
              questionObj={this.questionSelected()} /> :
            <Question 
              deleteQuestion={deleteQuestion}
              questionObj={this.questionSelected()} />
        }
        {this.state.alert}
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
