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
import { questionUpdateCalled } from '../../store/questions/actions';
import { optionUpdateCalled } from '../../store/questions/actions';


const convertToKatex = (texString) => {
  let updatedText = texString.toString().replace(/ /g, '\\,');
   updatedText = updatedText.toString().replace(/\\bg\[07c\]{\\color\[cyan\]/g, '{');
  return updatedText;
}
class Dropdown extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: props.name,
      type: props.type||'text',
      value: this.props.openForCreating? this.optionList()[0] : (props.input||''),
      editClassName: props.editClassName,
      edit: false,
      rows: props.rows
    }
  }
  optionList = () => {
    const { attributes,field } = this.props;
    return attributes[`_${field}`].split(',');
  }

  coreComponent(){
    if(this.props.openForEditing){
      return this.editComponent();
    }
    if(this.props.openForCreating){
      return this.createComponent();
    }
    return null;
  }
  createComponent(){
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
  
  editComponent() {
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
    const btn ={backgroundColor: '#10bcf1'};
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
            <BlockMath strict={'warn'} trust={false}>{this.state.value}</BlockMath>
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
export default connect(mapStateToProps, mapDispatchToProps)(Dropdown);
