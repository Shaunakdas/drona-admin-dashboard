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
import {  questionCreateCalled, childQuestionCreateCalled } from '../../store/questions/actions';

class QuestionList extends Component {
  constructor(props){
    super(props)
    this.state = {
      questionStructure: this.getQuestionStructure(props),
      questionObj: props.questionObj,
      finalQuestionObj: this.getDefaultFinalBlocks(props)
    }
    this.editor = this.editor.bind(this);
    this.updateQuestionList = this.updateQuestionList.bind(this);
  }
  getQuestionStructure = (props) => {
    const { games } = props;
    if('questionStructure' in games){
      const question = games.questionStructure;
      return ('blocks' in question) ? question.blocks[0] : question;
    } 
  }
  // Creation Mode
  getDefaultFinalBlocks = (props) => {
    const blocks = props.questionObj.blocks.map( block => {
      return this.copyDefaultKeys(block)
    })
    return {
      ...props.questionObj,
      blocks
    }
  }
  copyDefaultKeys = (question) => {
    let finalQues = {};
    for (let key in question){
      if(question[key] === "bool"){
        finalQues[key] = false;
      } else if(question[key] === "dropdown"){
        finalQues[key] = question[`_${key}`].split(',')[1]
      } else if(question[key] === "sequence"){
        finalQues[key] = question[`_${key}`].split(',')[1]
      }
    }
    return finalQues;
  }
  // Edit Mode
    // Method to create empty question when user wants to add question while editing existing parent question
  copyQuestionStructure = () => {
    const questionStructure = this.getQuestionStructure(this.props);
    let finalQues = this.copyEntityKeys(questionStructure);
    const option = this.copyEntityKeys(questionStructure.options[0]);
    return {
      ...finalQues,
      options: [option]
    }
  }
  copyEntityKeys = (structure) => {
    let finalQues = {};
    for (let key in structure){
      if(structure[key] === "string"){
        finalQues[key] = " ";
      } else if(structure[key] === "bool"){
        finalQues[key] = false;
      } else if(structure[key] === "dropdown"){
        finalQues[key] = structure[`_${key}`].split(',')[1]
      } else if(structure[key] === "sequence"){
        finalQues[key] = structure[`_${key}`].split(',')[1]
      }
    }
    return finalQues;
  }
  createQuestion(){
    this.props.questionCreateCalled(
      this.state.finalQuestionObj,
      this.props.games.selected.id);
  }
  // Button for adding an question
  addButton(){
    const { openForEditing, childQuestionCreateCalled, questionObj } = this.props;
    if(openForEditing){
      childQuestionCreateCalled(questionObj, this.copyQuestionStructure());
    }else{
      this.setState(state => {
        const blocks = [...state.questionObj.blocks, state.questionStructure];
        const questionObj ={
          ...state.questionObj,
          blocks
        }
        const finalBlocks = [...state.finalQuestionObj.blocks, this.copyDefaultKeys(state.questionStructure).blocks];
        let finalQuestionObj = {
          ...state.finalQuestionObj,
          blocks: finalBlocks
        }
        return {
          ...state,
          questionObj,
          finalQuestionObj,
        };
      });
    }
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
    const questionList =  openForCreating? this.state.questionObj : questionObj;
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
            questionList.blocks.map((block, key) => {
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
    questionCreateCalled : (question, gameId) => dispatch(questionCreateCalled(question, gameId)),
    childQuestionCreateCalled: (parentQuestion, question) => dispatch(childQuestionCreateCalled(parentQuestion, question)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps) (QuestionList);
