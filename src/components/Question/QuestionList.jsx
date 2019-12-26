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

import Question from "components/Question/Question";
import Button from "components/CustomButton/CustomButton.jsx";

class QuestionList extends Component {
  constructor(props){
    super(props)
    this.state = {
      questionStructure: props.questionObj.blocks[0],
      questions: props.questionObj.blocks,
      finalQuestions: props.questionObj.blocks
    }
    this.updateQuestionList = this.updateQuestionList.bind(this);
  }

  // Button for adding an question
  addButton(){
    this.setState(state => {
      const questions = [...state.questions, state.questionStructure];
      return {
        ...state,
        questions,
      };
    });
  }

  // Function to update finalQuestion List in state, which wil be used to question question list
  updateQuestionList(questionIndex, field, value){
    let finalQuestions = [...this.state.finalQuestions];
    let question = {
      ...finalQuestions[questionIndex],
      [field]: value
    }
    finalQuestions[questionIndex]= question;
    this.setState(state => {
      return {
        ...state,
        finalQuestions,
      };
    });
    console.log(this.state);
    // this.props.editor( finalQuestions);
  }
  render() {
    const {questionObj} = this.props;
    return (
      <Col md={9}>
        <div>
          {
            questionObj.blocks.map((block, key) => {
              return (
                <Question key={key} questionObj={block}/>);
            })
          }
          <Button
            bsStyle="info"
            onClick={() => this.addButton()} >
            Add Question
          </Button>
        </div>
      </Col>
    );
  }
}

export default QuestionList;
