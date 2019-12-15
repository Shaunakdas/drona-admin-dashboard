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

class Option extends Component {
  constructor(props){
    super(props);
    this.editor = this.editor.bind(this);
  }
  editor(field, value){
    this.props.updateOptionList(this.props.optionIndex, field,value)
  }
  render() {
    let optionObj = this.props.option;
    return (
      <Card
        title="Option"
        content={
          <form>
            {
            (this.props.questions.isOptionUpdatePending)? 
              <div>
                <i className="pe-7s-lock" />
                <p> Updating... </p>
              </div> : null
            }
            {/* Display */}
            {
              (optionObj.answer === undefined)?
                null : 
                <InputText 
                  title="Display"
                  rows="2"
                  input={optionObj.answer}
                  field="answer"
                  attributes={optionObj}
                  editor={this.editor}
                />
            }
            {/* Index */}
            {
              (optionObj.index === undefined)?
                null : 
                <InputText 
                  title="Index"
                  rows="2"
                  input={optionObj.index}
                  field="index"
                  attributes={optionObj}
                  editor={this.editor}
                />
            }
            {
              (optionObj.display === undefined)?
                null : 
                <InputText 
                  title="Display"
                  rows="2"
                  input={optionObj.display}
                  field="display"
                  attributes={optionObj}
                  editor={this.editor}
                />
            }
            {/* Hint */}
            {
              (optionObj.hint === undefined)?
                null : 
                <InputText 
                  title="Hint"
                  rows="2"
                  input={optionObj.hint}
                  field="hint"
                  attributes={optionObj}
                  editor={this.editor}
                />
            }
            {/* Title */}
            {
              (optionObj.title === undefined)?
                null : 
                <InputText 
                  title="Title"
                  rows="1"
                  input={optionObj.title}
                  field="title"
                  attributes={optionObj}
                  editor={this.editor}
                />
            }
            {/* Value Type */}
            {
              (optionObj.value_type === undefined)?
                null : 
                <InputText 
                  title="Value Type"
                  rows="1"
                  input={optionObj.value_type}
                  field="value_type"
                  attributes={optionObj}
                  editor={this.editor}
                />
            }
            {/* Key */}
            {
              (optionObj.key === undefined)?
                null : 
                <InputText 
                  title="Key"
                  rows="1"
                  input={optionObj.key}
                  field="key"
                  attributes={optionObj}
                  editor={this.editor}
                />
            }
            {/* Value */}
            {
              (optionObj.value === undefined)?
                null : 
                <InputText 
                  title="Value"
                  rows="1"
                  input={optionObj.value}
                  field="value"
                  attributes={optionObj}
                  editor={this.editor}
                />
            }
            {/* Option Index */}
            {
              (optionObj.option_index === undefined)?
                null : 
                <InputText 
                  title="Option Index"
                  rows="1"
                  input={optionObj.option_index}
                  field="option_index"
                  attributes={optionObj}
                  editor={this.editor}
                />
            }
            {/* Upper */}
            {
              (optionObj.upper === undefined)?
                null : 
                <InputText 
                  title="Upper"
                  rows="2"
                  input={optionObj.upper}
                  field="upper"
                  attributes={optionObj}
                  editor={this.editor}
                />
            }
            {/* Lower */}
            {
              (optionObj.lower === undefined)?
                null : 
                <InputText 
                  title="Lower"
                  rows="2"
                  input={optionObj.lower}
                  field="lower"
                  attributes={optionObj}
                  editor={this.editor}
                />
            }
            {/* Attempted */}
            {
              (optionObj.attempted === undefined)?
                null : 
                <InputText 
                  title="Attempted"
                  rows="2"
                  input={optionObj.attempted}
                  field="attempted"
                  attributes={optionObj}
                  editor={this.editor}
                />
            }
            {/* Sequence */}
            {
              (optionObj.sequence === undefined)?
                null : 
                <InputText 
                  title="Sequence"
                  rows="2"
                  input={optionObj.sequence}
                  field="sequence"
                  attributes={optionObj}
                  editor={this.editor}
                />
            }

            {/* Correct */}
            {
              (optionObj.correct === undefined)?
                null : 
                <Selector 
                  title="Correct"
                  isChecked={optionObj.correct}
                  field="correct"
                  attributes={optionObj}
                  editor={this.editor}
                />
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
export default connect(mapStateToProps, null) (Option);
