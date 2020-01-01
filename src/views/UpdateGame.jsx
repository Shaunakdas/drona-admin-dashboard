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
import { withCookies } from 'react-cookie';
import { Redirect } from "react-router-dom";
import ImageZoom from 'react-medium-image-zoom'
import {
  Grid,
  Row,
  Col,
  Image
} from "react-bootstrap";

import QuestionEditor from "./Games/QuestionEditor.jsx";
import SweetAlert from "react-bootstrap-sweetalert";
import SelectedEntityList from "components/AcadEntity/SelectedEntityList";


import {  storeToken } from '../store/user/actions';
import { questionDeleteCalled, optionDeleteCalled } from '../store/questions/actions';
const imageLinks = {
  Agility: "https://i.ibb.co/x2yGjLV/Agility.png",
  Conversion: "https://i.ibb.co/d4ynRZT/Conversion.png",
  Diction: "https://i.ibb.co/N6GTzQn/Diction.png",
  Discounting: "https://i.ibb.co/QCwd40R/Discounting.png",
  Division: "https://i.ibb.co/cTJ5sxW/Division.png",
  Estimation: "https://i.ibb.co/Y2VCMvg/Estimation.png",
  Inversion: "https://i.ibb.co/nkBq9jm/Inversion.png",
  Percentages: "https://i.ibb.co/BPwdVDw/Percentages.png",
  Proportion: "https://i.ibb.co/tYXnQyn/Proportion.png",
  Purchasing: "https://i.ibb.co/6rTsPdZ/Purchasing.png",
  Refinement: "https://i.ibb.co/2t2w6hd/Refinement.png",
  Tipping: "https://i.ibb.co/s3TR73G/Tipping.png"
}
class UpdateGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
        alert: null,
        show: false
    };
    this.hideAlert = this.hideAlert.bind(this);
    this.successQuestionDelete = this.successQuestionDelete.bind(this);
    this.successOptionDelete = this.successOptionDelete.bind(this);
    this.cancelDelete = this.cancelDelete.bind(this);
    this.deleteQuestion = this.deleteQuestion.bind(this);
    this.deleteOption = this.deleteOption.bind(this);
  }
  questionSelected(){
    if (this.props.questions.openForEditing){
      return this.props.questions.questions.find(x => x.id === this.props.questions.selectedId);
    }else{
      return this.props.games.questionStructure;
    }
  }
  componentDidMount(){
    if(this.props.cookies.get('AuthToken')){
      this.props.storeToken(this.props.cookies.get('AuthToken'));
    }
  }
  successQuestionDelete(question, parentQuestionId) {
    this.props.questionDeleteCalled(question, 1, parentQuestionId);
    this.setState({
        alert: (
        <SweetAlert
            success
            style={{ display: "block", marginTop: "-100px" }}
            title="Deleted!"
            onConfirm={() => this.hideAlert()}
            onCancel={() => this.hideAlert()}
            confirmBtnBsStyle="info"
        >
            Your imaginary file has been deleted.
        </SweetAlert>
        )
    });
  }
  successOptionDelete(option, question) {
    this.props.optionDeleteCalled(option, 1, question);
    this.setState({
        alert: (
        <SweetAlert
            success
            style={{ display: "block", marginTop: "-100px" }}
            title="Deleted!"
            onConfirm={() => this.hideAlert()}
            onCancel={() => this.hideAlert()}
            confirmBtnBsStyle="info"
        >
            Your imaginary file has been deleted.
        </SweetAlert>
        )
    });
  }
  deleteQuestion(question, parentQuestionId) {
      this.setState({
          alert: (
          <SweetAlert
              warning
              style={{ display: "block", marginTop: "-100px" }}
              title="Are you sure?"
              onConfirm={() => this.successQuestionDelete(question, parentQuestionId)}
              onCancel={() => this.cancelDelete()}
              confirmBtnBsStyle="info"
              cancelBtnBsStyle="danger"
              confirmBtnText="Yes, delete it!"
              cancelBtnText="Cancel"
              showCancel
          >
              Trying to delete Question [id: {question.id} display: {question.display}]
          </SweetAlert>
          )
      });
  }
  deleteOption(option, question) {
      this.setState({
          alert: (
          <SweetAlert
              warning
              style={{ display: "block", marginTop: "-100px" }}
              title="Are you sure?"
              onConfirm={() => this.successOptionDelete(option, question)}
              onCancel={() => this.cancelDelete()}
              confirmBtnBsStyle="info"
              cancelBtnBsStyle="danger"
              confirmBtnText="Yes, delete it!"
              cancelBtnText="Cancel"
              showCancel
          >
              Trying to delete Option [id: {option.id} display: {option.display}]
          </SweetAlert>
          )
      });
  }
  cancelDelete() {
      this.setState({
          alert: (
          <SweetAlert
              danger
              style={{ display: "block", marginTop: "-100px" }}
              title="Cancelled"
              onConfirm={() => this.hideAlert()}
              onCancel={() => this.hideAlert()}
              confirmBtnBsStyle="info"
          >
              Your imaginary file is safe :)
          </SweetAlert>
          )
      });
  }
  hideAlert() {
      this.setState({
        alert: null
      });
  }
  render() {  
    const {cookies, questions, games} = this.props;
    let imageLink = "";
    if('selected' in games){
      const game = games.selected.game.name;
      imageLink = imageLinks[game];
    }
    return (cookies.get('AuthToken') === undefined)? (
      <Redirect to="/auth/login-page" />
          ) :  (
            (questions.questions.length == 0)? (
              <Redirect to="/game/edit" />
            ) : (
              <div className="content">
                <Grid fluid>
                  <Row>
                    <Col md={6}>
                      <SelectedEntityList />
                    </Col>
                    </Row>
                    <Row>
                    <Col md={6}>
                      <ImageZoom
                        image={{
                          src: imageLink,
                          alt: 'Golden Gate Bridge',
                          className: 'img',
                          style: { width: '70em' }
                        }}
                        zoomImage={{
                          src: imageLink,
                          alt: 'Golden Gate Bridge'
                        }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    {/* {gameComponent} */}
                    {this.state.alert}
                    <QuestionEditor question={this.questionSelected()}
                      deleteQuestion={this.deleteQuestion}
                      deleteOption={this.deleteOption}/>
                  </Row>
                </Grid>
              </div>
            )
          );
  }
}

const mapStateToProps = (state) => {
  return {
      questions: state.questions,
      games: state.games,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
      storeToken: (authToken) => dispatch(storeToken(authToken)), 
      questionDeleteCalled: (question, deleteStatus, parentQuestionId) => dispatch(questionDeleteCalled(question, deleteStatus, parentQuestionId)), 
      optionDeleteCalled: (option, deleteStatus, question) => dispatch(optionDeleteCalled(option, deleteStatus, question)), 
  };
};
export default withCookies(connect(mapStateToProps, mapDispatchToProps)(UpdateGame));
