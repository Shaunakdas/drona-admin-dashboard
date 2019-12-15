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

import Card from "components/Card/Card.jsx";
import InputText from "../Attribute/InputText"
import Selector from "../Attribute/Selector"
import OptionList from "components/Option/OptionList";
import NumberLine from "./NumberLine";

import { bool } from "prop-types";

class Question extends Component {
  constructor(props){
    super(props)
    this.state = {
      finalObj: {},
    }
    this.editor = this.editor.bind(this);
  }
  editor(field, value){
    this.setState(prevState => ({
      finalObj: {                   // object that we want to update
          ...prevState.finalObj,    // keep all other key-value pairs
          [field]: value       // update the value of specific key
      }
  }))
  }
  //Backup function
  updateValues(questionObj){
    Object.keys(questionObj).forEach(function(key) {
      if(key === "entity_type"){
        return;
      }
      if (/string|bool|sequence|positive_integer/.test(questionObj[key])) {
        questionObj[key] = null;
      }
    });
    return questionObj;
  }
  render() {
    let questionObj = this.props.questionObj;
    return (
        <Card
          title="Question"
          content={
            <form>
              {
              (this.props.questions.isQuestionUpdatePending)? 
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
              {/* Question Highlights */}
              <InputText 
                title="Question Highlight"
                input={questionObj.section_question}
                rows="5"
                field="section_question"
                attributes={questionObj}
              />
              {/* Time */}
              <InputText 
                title="time"
                input={questionObj.time}
                rows="1"
                field="time"
                attributes={questionObj}
              />
              {/* Tip */}
              <InputText 
                title="Tip"
                input={questionObj.tip}
                rows="2"
                field="tip"
                attributes={questionObj}
              />
              {/* Bubble */}
              <InputText 
                title="Bubble"
                input={questionObj.bubble}
                rows="1"
                field="bubble"
                attributes={questionObj}
              />
              {/* Correct Option Count */}
              <InputText 
                title="Correct Option Count"
                input={questionObj.correct_option_count}
                rows="1"
                field="correct_option_count"
                attributes={questionObj}
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
                                />
                              )
                            })
                          }
                        </div>
                    }
                  </div>
              }
              {/* Numpad */}
              {
                (questionObj.numpad === undefined)?
                  null : 
                  <div>
                    {
                      questionObj.numpad.map((num) => {
                        return (
                          <InputText 
                            title="Numpad"
                            rows="1"
                            input={num}
                          />
                        )
                      })
                    }
                  </div>
              }
              {/* Hint */}
              {
                (questionObj.hint === undefined)?
                  null : 
                    <div>
                      {
                        (typeof questionObj.hint === 'string') || ( questionObj.hint === null)?
                        <InputText 
                            title="Hint"
                            input={questionObj.hint}
                            rows="2"
                            field="hint"
                            attributes={questionObj}
                        />
                          : 
                          <div>
                            <InputText 
                              title="Hint Before attempt"
                              input={questionObj.hint.question}
                              rows="2"
                            />
                          
                            <InputText 
                              title="Hint After Attempt"
                              input={questionObj.hint.solution}
                              rows="2"
                            />
                          </div>
                      }
                    </div>
              }
              {/* Correct */}
              {
                (questionObj.answer === undefined)?
                  null : 
                  <div>
                    {
                      (typeof questionObj.answer === bool)?
                        <Selector 
                          title="Correct"
                          isChecked={questionObj.answer}
                        />
                        :
                        <InputText 
                          title="Answer"
                          input={questionObj.answer}
                          rows="2"
                          field="answer"
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
              />
              {/* Title */}
              <InputText 
                title="Title"
                rows="2"
                input={questionObj.title}
                field="title"
                attributes={questionObj}
              />
              {/* Mode */}
              <InputText 
                title="Mode"
                rows="2"
                input={questionObj.mode}
                field="mode"
                attributes={questionObj}
              />


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
                                <OptionList title="Faces" options={block.faces}/>
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
                  <OptionList options={questionObj.options}/>
              }
              <div className="clearfix" />
            </form>
          }
        />
    );
  }
}

const mapStateToProps = (state) => {
  return {
      questions: state.questions
  };
};
export default connect(mapStateToProps, null) (Question);
