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
import { questionAttributeUpdateCalled } from '../../store/questionAttributes/actions';

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
      value: props.input||'',
      editClassName: props.editClassName,
      edit: false,
      rows: props.rows
    }
  }
  
  editComponent() {
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
          const {id, entity_type} = this.props.questionAttr;
          this.props.questionAttributeUpdateCalled({
            id,
            entity_type,
            [this.props.field]: event.target.value
          }
            );
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
  render() {
    return (
      (this.props.input === undefined)?
        null : 
        <Row>
          <Col md={6}>
            <FormGroup controlId="formControlsTextarea">
              <ControlLabel>
                {this.props.title}
              </ControlLabel>
              {/* <FormControl
                rows={this.props.rows}
                componentClass="textarea"
                bsClass="form-control"
                placeholder="Here can be your description"
                defaultValue={this.props.input}
              /> */}
              {
                this.editComponent()
              }
            </FormGroup>
          </Col>
          <Col md={6}>
            <ControlLabel>Final {this.props.title}</ControlLabel>
            <BlockMath strict={'warn'} trust={false}>{convertToKatex(this.state.value)}</BlockMath>
            
          </Col>
        </Row>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
      questionAttributeUpdateCalled: (questionAttributes) => dispatch(questionAttributeUpdateCalled(questionAttributes))
  };
};
export default connect(null, mapDispatchToProps)(InputText);
