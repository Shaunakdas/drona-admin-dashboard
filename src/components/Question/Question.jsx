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

import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";

import Card from "components/Card/Card.jsx";
import InputText from "../Attribute/InputText"
import Selector from "../Attribute/Selector"
import OptionList from "components/Option/OptionList";
import NumberLine from "./NumberLine";
import Button from "components/CustomButton/CustomButton.jsx";

import {  questionCreateCalled } from '../../store/questions/actions';

class Question extends Component {
  constructor(props){
    super(props)
    this.state = {
      finalObj: this.getDefaultFinalOptions(props),
    }
    this.editor = this.editor.bind(this);
    this.optionListEditor = this.optionListEditor.bind(this);
  }

  getDefaultFinalOptions = (props) => {
    return this.copyDefaultKeys(props.questionObj)
  }
  copyDefaultKeys = (question) => {
    let finalOp = {};
    for (let key in question){
      if(question[key] === "bool"){
        finalOp[key] = false;
      } else if(question[key] === "dropdown"){
        finalOp[key] = question[`_${key}`].split(',')[1]
      } else if(question[key] === "sequence"){
        finalOp[key] = question[`_${key}`].split(',')[1]
      }
    }
    return finalOp;
  }
  //For current question attributes
  editor(field, value){
    const {questionIndex, updateQuestionList} = this.props;
    this.setState(prevState => ({
      finalObj: {                   // object that we want to update
          ...prevState.finalObj,    // keep all other key-value pairs
          [field]: value       // update the value of specific key
      }
    }))
    if (!(updateQuestionList === undefined)){
      updateQuestionList(questionIndex, field, value);
    }
  }
  // For options array edits
  optionListEditor(options){
    const {questionIndex, updateQuestionList} = this.props;
    this.setState(prevState => ({
      finalObj: {                   // object that we want to update
          ...prevState.finalObj,    // keep all other key-value pairs
          options: options       // update the value of specific key
        }
    }))
    if (!(updateQuestionList === undefined)){
      updateQuestionList(questionIndex, 'options', options);
    }
  }
  //Backup function
  updateValues(questionObj){
    const { openForCreating } = this.props;
    Object.keys(questionObj).forEach(function(key) {
      if(key === "entity_type"){
        return;
      }
      if (openForCreating && (/string|bool|sequence|positive_integer/.test(questionObj[key]))) {
        questionObj[key] = null;
      }
    });
    return questionObj;
  }
  createQuestion(){
    this.props.questionCreateCalled(
      this.state.finalObj,
      this.props.games.selected.id);
  }
  deleteQuestion () {
    const {deleteQuestion, questionObj, parentQuestionId} = this.props;
    deleteQuestion(questionObj, parentQuestionId);
  }
  getTitle = () => {
    const {questionObj, questionIndex} = this.props;
    if(questionObj._has_parent_question){
      return `Question #${questionIndex+1}`
    }
    return "Question"
  }
  getBackgroundColor = () => {
    const {questionObj, questionIndex} = this.props;
    if(questionObj._has_parent_question){
      return ['lightskyblue', 'skyblue', 'deepskyblue', 'dodgerblue'][questionIndex%4]
    }
    return "aqua"
  }
  render() {
    const {questionObj, openForCreating, openForEditing, deleteOption} = this.props;
    if(questionObj === undefined){
      return <Redirect to="/admin/dashboard" />
    }
    const selectorCheck = (openForEditing && (typeof questionObj.answer === "boolean"))||(openForCreating && (questionObj.answer === "bool"))
    return (
        <Card
          title={this.getTitle()}
          backgroundColor={this.getBackgroundColor()}
          content={
            <form>
              {
              (this.props.questions.isQuestionUpdatePending)? 
                <div>
                  <i className="pe-7s-lock" />
                  <p> Updating... </p>
                </div> : null
              }
              {
                openForEditing?
                <Button bsStyle="danger" pullLeft fill onClick={this.deleteQuestion.bind(this)}>
                  <span className="btn-label">
                    <i className="fa fa-times" />
                  </span>
                  Delete Question
                </Button>
                : null
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
              {/* Question Highlights */}
              <InputText 
                title="Question Highlight"
                input={questionObj.section_question}
                rows="5"
                field="section_question"
                attributes={questionObj}
                editor={this.editor}
              />
              {/* Tip */}
              <InputText 
                title="Tip"
                input={questionObj.tip}
                rows="2"
                field="tip"
                attributes={questionObj}
                editor={this.editor}
              />
              {/* Bubble */}
              <InputText 
                title="Bubble"
                input={questionObj.bubble}
                rows="1"
                field="bubble"
                attributes={questionObj}
                editor={this.editor}
              />

              {/* Tips */}
              {
                (questionObj.tips === undefined)?
                  null : 
                  <div>
                    {
                      (typeof questionObj.tips === 'string') || ( questionObj.hint === null)?
                      <InputText 
                          title="Tips"
                          input={questionObj.tips}
                          rows="2"
                          field="tips"
                          attributes={questionObj}
                          editor={this.editor}
                      />
                        : 
                        <div>
                          {
                            questionObj.tips.map((tip) => {
                              return (
                                <InputText 
                                  title="Tip"
                                  rows="2"
                                  input={tip}
                                  field="tips"
                                  attributes={questionObj}
                                  editor={this.editor}
                                />
                              )
                            })
                          }
                        </div>
                    }
                  </div>
              }
              {/* Hint */}
              <InputText 
                title="Hint Content"
                input={questionObj.hint_content}
                rows="3"
                field="hint_content"
                attributes={questionObj}
                editor={this.editor}
              />
              {/* Solution */}
              <InputText 
                title="Solution"
                input={questionObj.solution}
                rows="3"
                field="solution"
                attributes={questionObj}
                editor={this.editor}
              />
              {/* Correct */}
              {
                (questionObj.answer === undefined)?
                  null : 
                  <div>
                    {
                      selectorCheck?
                        <Selector 
                          title="Correct"
                          isChecked={questionObj.answer}
                          field="answer"
                          editor={this.editor}
                          attributes={questionObj}
                        />
                        :
                        <InputText 
                          title="Answer"
                          input={questionObj.answer}
                          rows="2"
                          field="answer"
                          editor={this.editor}
                          attributes={questionObj}
                        />
                    }
                  </div>
                  
              }
              {/* Type */}
              <InputText 
                title="Type"
                rows="1"
                input={questionObj.type}
                field="type"
                attributes={questionObj}
                editor={this.editor}
              />
              {/* Title */}
              <InputText 
                title="Title"
                rows="2"
                input={questionObj.title}
                field="title"
                attributes={questionObj}
                editor={this.editor}
              />
              {/* Mode */}
              {
                (questionObj.mode === undefined)?
                  null : 
                  <div>
                    {
                      <InputText 
                      title="Mode"
                      rows="2"
                      input={questionObj.mode}
                      field="mode"
                      attributes={questionObj}
                      editor={this.editor}
                    />
                        
                    }
                  </div>
                  
              }
              


              {/* Blocks */}
              {
                (questionObj.blocks === undefined)?
                  null : 
                  <div>
                    {
                      questionObj.blocks.map((block) => {
                        return (
                          <div>
                            <InputText 
                              title="Block"
                              rows="2"
                              input={block.title}
                            />
                            {
                              (block.faces === undefined)?
                                null : 
                                <OptionList
                                  title="Faces"
                                  options={block.faces}
                                  questionObj={questionObj}
                                />
                            }
                            
                            
                          </div>
                        )
                      })
                    }
                  </div>
              }
              {/* Number Line */}
              <NumberLine 
                title="Number Line"
                number_line={questionObj.number_line}
                rows="1"
              />

              {/* Options */}
              {
                (questionObj.options === undefined)?
                  null : 
                  <OptionList
                    deleteOption={deleteOption}
                    options={questionObj.options}
                    editor={this.optionListEditor}
                    questionObj={questionObj}/>
              }
              <div className="clearfix" />
              {
                (!questionObj._has_parent_question && openForCreating)?
                <Button bsStyle="primary" pullRight fill onClick={this.createQuestion.bind(this)}>
                  Upload Question
                </Button>
                : null
              }
              
            </form>
          }
        />
        
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
export default connect(mapStateToProps, mapDispatchToProps) (Question);
