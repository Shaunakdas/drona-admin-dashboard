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
import Card from "components/Card/Card.jsx";
import Question from "components/Question/Question";
import Button from "components/CustomButton/CustomButton.jsx";
import InputText from "../Attribute/InputText"
import {  questionCreateCalled } from '../../store/questions/actions';

class QuestionList extends Component {
  constructor(props){
    super(props)
    this.state = {
      questionStructure: props.questionObj.blocks[0],
      questionObj: props.questionObj,
      finalQuestionObj: props.questionObj
    }
    this.editor = this.editor.bind(this);
    this.updateQuestionList = this.updateQuestionList.bind(this);
  }

  createQuestion(){
    this.props.questionCreateCalled(
      this.state.finalQuestionObj,
      this.props.games.selected.id);
  }
  // Button for adding an question
  addButton(){
    this.setState(state => {
      const blocks = [...state.finalQuestionObj.blocks, state.questionStructure];
      let finalQuestion = {
        ...state.finalQuestionObj,
        blocks
      }
      return {
        ...state,
        finalQuestionObj: finalQuestion,
      };
    });
  }
  editor(field, value){
    this.setState(prevState => ({
      finalQuestionObj: {                   // object that we want to update
          ...prevState.finalQuestionObj,    // keep all other key-value pairs
          [field]: value       // update the value of specific key
      }
  }))
  }

  // Function to update finalQuestion List in state, which wil be used to question question list
  updateQuestionList(questionIndex, field, value){
    console.log({questionIndex, field, value})
    const newBlock = {
      ...this.state.finalQuestionObj.blocks[questionIndex],
      [field]: value
    }
    const finalQuestionObj = { 
      ...this.state.finalQuestionObj, 
      blocks: this.state.finalQuestionObj.blocks.map(
          (block, i) => i === questionIndex ? newBlock : block
      )
    }
    this.setState(state => {
      return {
        ...state,
        finalQuestionObj,
      };
    });
    // this.props.editor( finalQuestions);
  }
  render() {
    const {questionObj, openForCreating, openForEditing,questions} = this.props;
    return (
      <Card
          title="Parent Question"
          content={
        <div>
          {
            (questions.isQuestionUpdatePending)? 
            <div>
              <i className="pe-7s-lock" />
              <p> Updating... </p>
            </div> : null
          }
          {/* Display */}
          <InputText 
            title="Display"
            input={questionObj.question}
            rows="5"
            field="question"
            attributes={questionObj}
            editor={this.editor}
          />
          {
            questionObj.blocks.map((block, key) => {
              return (
                <Question
                  key={key}
                  questionObj={block}
                  questionIndex={key}
                  updateQuestionList={this.updateQuestionList}/>);
            })
          }
          <Button
            bsStyle="primary" fill
            onClick={() => this.addButton()} >
            Add Question
          </Button>
          {
            openForCreating?
            <Button bsStyle="primary" pullRight fill onClick={this.createQuestion.bind(this)}>
              Upload Question
            </Button>
            : null
          }
        </div>
          } />
    );
  }
}

const mapStateToProps = (state) => {
  return {
      questions: state.questions,
      games: state.games,
      openForCreating: state.questions.openForCreating,
      openForEditing: state.questions.openForEditing
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    questionCreateCalled : (question, gameId) => dispatch(questionCreateCalled(question, gameId))
  };
};
export default connect(mapStateToProps, mapDispatchToProps) (QuestionList);
