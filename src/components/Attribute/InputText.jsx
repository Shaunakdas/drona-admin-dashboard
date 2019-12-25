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
import {
  Row,
  Col,
  FormGroup,
  ControlLabel,
  FormControl
} from "react-bootstrap";
import 'katex/dist/katex.min.css';
import {  BlockMath } from 'react-katex';
import Card from "components/Card/Card";
import MathJax from 'react-mathjax';
import { questionUpdateCalled } from '../../store/questions/actions';
import { optionUpdateCalled } from '../../store/questions/actions';


const convertToKatex = (texString) => {
  let updatedText = texString.toString().replace(/ /g, '\\,');
   updatedText = updatedText.toString().replace(/\\bg\[07c\]{\\color\[cyan\]/g, '{');
  return updatedText;
}
class InputText extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: props.name,
      type: props.type||'text',
      value: this.initialValue(props),
      editClassName: props.editClassName,
      edit: false,
      rows: props.rows
    }
  }

  inputType = (props) => {
    const { attributes,field } = props;
    if(`_${field}` in attributes){
      const itemList = attributes[`_${field}`].split(',');
      if(itemList.length > 0){
        const [inputType, ...list] = itemList;
        return inputType;
      }
    }
    return "input";
  }
  initialValue = (props) => {
    switch(this.inputType(props)) {
      case("dropdown"):
        return props.openForCreating? this.optionList()[0] : (props.input||'')
      case("sequence"):
        return props.openForCreating? this.optionList()[0] : (props.input||'')
      case("input"):
        return props.openForCreating? '': (props.input||'')
      case("german"):
        return "German Shepherds are good boys and girls."
      default:
        return null
    }
  }

  optionList = () => {
    const { attributes,field } = this.props;
    if(`_${field}` in attributes){
      const itemList = attributes[`_${field}`].split(',');
      if(itemList.length > 0){
        const [inputType, ...list] = itemList;
        return list;
      }
    }
    return [];
  }

  coreComponent(){
    const { openForEditing } = this.props;
    switch(this.inputType(this.props)) {
      case("dropdown"):
        return openForEditing? this.editDropdownComponent() : this.createDropdownComponent()
      case("sequence"):
        return openForEditing? this.editDropdownComponent() : this.createDropdownComponent()
      case("input"):
        return openForEditing? this.editInputComponent() : this.createInputComponent()
      case("german"):
        return "German Shepherds are good boys and girls."
      default:
        return null
    }
  }
  createInputComponent(){
    return (
      <FormControl
        rows={this.props.rows}
        componentClass="textarea"
        bsClass="form-control"
        placeholder={`Here can be your ${this.props.field}`}
        onChange={event=>{
          this.setState({value:event.target.value});
          this.props.editor(this.props.field, event.target.value);
        }}
      />
    );
  }
  
  editInputComponent() {
    return (
      this.state.edit===true&&
      <FormControl
        rows={this.state.rows}
        componentClass="textarea"  
        name={this.state.name}
        type={this.state.type}
        value={this.state.value}
        className={this.state.editClassName}
        autoFocus
        onFocus={event=>{
          const value = event.target.value
          event.target.value = ''
          event.target.value = value
          this.setState({backup:this.state.value})
        }}
        onChange={event=>{
          this.setState({value:event.target.value})
        }}
        onBlur={event=>{
          this.setState({edit:false})
          const {id, entity_type} = this.props.attributes;
          const updateParams = {
            id,
            entity_type,
            [this.props.field]: event.target.value
          }
          if(entity_type === "game_question"){
            this.props.questionUpdateCalled(updateParams);
          }else{
            this.props.optionUpdateCalled(updateParams);
          }
        }}
        onKeyUp={event=>{
          if(event.key==='Escape') {
            this.setState({edit:false, value:this.state.backup})
          }
        }}
      />
      ||
      <FormGroup controlId="formControlsTextarea">
        <Card
          content={this.state.value}
          md={6}
          block={true}
          onClick={event=>{
            this.setState({edit:this.state.edit!==true})
          }}>
          
        </Card>
      </FormGroup>
    )
  }
  createDropdownComponent(){
    return (
      <FormControl
        componentClass="select"  
        name={this.state.name}
        type={this.state.type}
        value={this.optionList()[0]}
        onChange={event=>{
          this.setState({value:event.target.value});
          this.props.editor(this.props.field, event.target.value);
        }}
      >
        {
          this.optionList().map((option, key) => {
            return <option key={key}>{option}</option>
          })
        }
      </FormControl>
    );
  }
  
  editDropdownComponent() {
    const { field, attributes, questionUpdateCalled, optionUpdateCalled} = this.props;
    const {id, entity_type} = attributes;
    
    
    return (
      <FormControl
        componentClass="select"  
        name={this.state.name}
        type={this.state.type}
        value={this.state.value}
        onChange={event=>{
          this.setState({value:event.target.value})
          this.props.editor(this.props.field, event.target.value);
          const updateParams = {
            id,
            entity_type,
            [field]: event.target.value
          }
          if(entity_type === "game_question"){
            questionUpdateCalled(updateParams);
          }else{
            optionUpdateCalled(updateParams);
          }
        }}
      >
        {
          this.optionList().map((option, key) => {
            return <option key={key}>{option}</option>
          })
        }
      </FormControl>
    )
  }
  
  render() {
    // const { inputType } = this.props;
    const btn ={backgroundColor: '#10bcf1'};
    const finalValue = (value) => {
      return this.inputType(this.props) === "input" ? convertToKatex(value) : value;
    }
    return (
      (this.props.input === undefined)?
        null : 
        <Row>
          <Col md={6}>
            <FormGroup controlId="formControlsTextarea">
              <ControlLabel>
                {this.props.title}
              </ControlLabel>
              {
                this.coreComponent()
              }
            </FormGroup>
          </Col>
          <Col md={6} style={btn}>
            <ControlLabel>Final {this.props.title}</ControlLabel>
            <BlockMath strict={'warn'} trust={false}>{finalValue(this.state.value)}</BlockMath>
            
          </Col>
          <hr />
        </Row>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    openForEditing: state.questions.openForEditing,
    openForCreating: state.questions.openForCreating
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    questionUpdateCalled: (question) => dispatch(questionUpdateCalled(question)),
    optionUpdateCalled: (option) => dispatch(optionUpdateCalled(option))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(InputText);
