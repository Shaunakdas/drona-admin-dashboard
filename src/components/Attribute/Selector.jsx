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
  ControlLabel
} from "react-bootstrap";
import Checkbox from "components/CustomCheckbox/CustomCheckbox.jsx";
import { questionUpdateCalled } from '../../store/questions/actions';
import { optionUpdateCalled } from '../../store/questions/actions';

class Selector extends Component {
  constructor(props){
    super(props)
    this.state = {
      isChecked: (typeof props.isChecked === "boolean")? props.isChecked : false,
    }
    this.toggleChange = this.toggleChange.bind(this);
  }
  toggleChange = () => {
    const { editor, field, openForEditing } = this.props;
    const newCheckedStatus = !this.state.isChecked
    editor(field, newCheckedStatus);
    if(openForEditing){
      this.triggerUpdateAPI(newCheckedStatus);
    }
    this.setState({
      isChecked: newCheckedStatus,
    });
  }
  triggerUpdateAPI = (newCheckedStatus) => {
    const { field, attributes, questionUpdateCalled, optionUpdateCalled } = this.props;
    const {id, entity_type, questionObj} = attributes;
    const updateParams = {
      id,
      entity_type,
      [field]: newCheckedStatus
    }
    if(entity_type === "game_question"){
      questionUpdateCalled(updateParams);
    }else{
      optionUpdateCalled({
        ...updateParams,
        questionObj
      });
    }
  }
  getId = () => {
    const { attributes } = this.props;
    if("id" in attributes){
      return attributes.id;
    }
    return 1;
  }
  render() {
    return (
      <Row>
        <Col md={6}>
          <FormGroup controlId="formControlsTextarea">
            <ControlLabel>
              {this.props.title} Flag
            </ControlLabel>
            <Checkbox
              toggleChange={this.toggleChange}
              isChecked={this.state.isChecked}
              number={this.getId()}
              label={this.state.isChecked? 'Correct' : 'Incorrect'}
            />
            
          </FormGroup>
        </Col>
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
export default connect(mapStateToProps, mapDispatchToProps)(Selector);
