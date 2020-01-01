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
import Option from "components/Option/Option";
import Button from "components/CustomButton/CustomButton.jsx";
import {  optionCreateCalled } from '../../store/questions/actions';

class OptionList extends Component {
  constructor(props){
    super(props)
    this.state = {
      optionStructure: this.getOptionStructure(props),
      options: props.options,
      finalOptions: this.getDefaultFinalOptions(props)
    }
    this.updateOptionList = this.updateOptionList.bind(this);
  }

  // Method to get game structure of option
  getOptionStructure = (props) => {
    const { games } = props;
    if('questionStructure' in games){
      const question = games.questionStructure;
      return ('blocks' in question) ? question.blocks[0].options[0] : question.options[0];
    } 
  }
  // Method to get Default structure for finalOptions Objet which will contain current option object in state
  getDefaultFinalOptions = (props) => {
    return props.options.map( option => {
      return this.copyDefaultKeys(option)
    })
  }
  // Method to create option with default keys when user wants to add option while creating new question
  copyDefaultKeys = (option) => {
    let finalOp = {};
    for (let key in option){
      if(option[key] === "bool"){
        finalOp[key] = false;
      } else if(option[key] === "dropdown"){
        finalOp[key] = option[`_${key}`].split(',')[1]
      } else if(option[key] === "sequence"){
        finalOp[key] = option[`_${key}`].split(',')[1]
      }
    }
    return finalOp;
  }
  // Method to create empty option when user wants to add option while editing existing question
  copyEmptyKeys = (option) => {
    const optionStructure = this.getOptionStructure(this.props);
    let finalOp = {};
    for (let key in optionStructure){
      if(option[key] === "string"){
        finalOp[key] = " ";
      } else if(option[key] === "bool"){
        finalOp[key] = false;
      } else if(option[key] === "dropdown"){
        finalOp[key] = option[`_${key}`].split(',')[1]
      } else if(option[key] === "sequence"){
        finalOp[key] = option[`_${key}`].split(',')[1]
      }
    }
    return finalOp;
  }

  // Button for adding an option
  addButton(){
    const { openForCreating, openForEditing, optionCreateCalled, questionObj } = this.props;
    const newFinalOption = openForCreating ? this.copyDefaultKeys(this.state.optionStructure) : this.copyEmptyKeys(this.state.optionStructure);
    const newOption = openForCreating ? this.state.optionStructure : this.copyEmptyKeys(this.state.optionStructure);
    if(openForEditing){
      optionCreateCalled(questionObj, newFinalOption);
    }else{
      this.setState(state => {
        const options = [...state.options, newOption];
        const finalOptions = [...state.finalOptions, newFinalOption];
        return {
          ...state,
          options,
          finalOptions
        };
      });
    }
  }

  // Function to update finalOption List in state, which wil be used to question option list
  updateOptionList(optionIndex, field, value){
    let finalOptions = [...this.state.finalOptions];
    let option = {
      ...finalOptions[optionIndex],
      [field]: value
    }
    finalOptions[optionIndex]= option;
    this.setState(state => {
      return {
        ...state,
        finalOptions,
      };
    });
    this.props.editor( finalOptions);
  }

  // Function to update all default values of options array copy to be null.
  updateOptionListValues(options){
    return options.map(option => this.updateValues(option));
  }
  updateValues(optionObj){
    Object.keys(optionObj).forEach(function(key) {
      if(key === "entity_type"){
        return;
      }
      if (/string|bool|sequence|positive_integer/.test(optionObj[key])) {
        optionObj[key] = null;
      }
    });
    return optionObj;
  }

  render() {
    const {questionObj,openForEditing,  options, deleteOption} = this.props;
    const optionList = openForEditing? options : this.state.options;
    return (
      <div>
        {
          optionList.map((option, optionIndex) => {
            return (
              <Option
                key={optionIndex}
                option={option}
                deleteOption={deleteOption}
                optionIndex={optionIndex}
                openForEditing={openForEditing}
                updateOptionList={this.updateOptionList}
                questionObj={questionObj} />
            )
          })
        }
        <Button
          bsStyle="info" pullLeft fill
          onClick={() => this.addButton()} >
          Add Option
        </Button>
      </div>
      
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
    optionCreateCalled : (question, option) => dispatch(optionCreateCalled(question, option))
  };
};
export default connect(mapStateToProps, mapDispatchToProps) (OptionList);
