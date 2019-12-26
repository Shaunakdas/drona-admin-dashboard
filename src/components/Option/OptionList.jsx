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
import Option from "components/Option/Option";
import Button from "components/CustomButton/CustomButton.jsx";

class OptionList extends Component {
  constructor(props){
    super(props)
    this.state = {
      optionStructure: props.options[0],
      options: props.options,
      finalOptions: props.options
    }
    this.updateOptionList = this.updateOptionList.bind(this);
  }

  // Button for adding an option
  addButton(){
    this.setState(state => {
      const options = [...state.options, state.optionStructure];
      return {
        ...state,
        options,
      };
    });
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
    return (
      <div>
        {
          this.state.options.map((option, optionIndex) => {
            return (
              <Option
                key={optionIndex}
                option={option}
                optionIndex={optionIndex}
                updateOptionList={this.updateOptionList} />
            )
          })
        }
        <Button
          bsStyle="info"
          onClick={() => this.addButton()} >
          Add Option
        </Button>
      </div>
      
    );
  }
}

export default OptionList;
