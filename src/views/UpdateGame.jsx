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
import {
  Grid,
  Row,
  Col,
  Image
} from "react-bootstrap";

import QuestionEditor from "./Games/QuestionEditor.jsx";
import SelectedEntityList from "components/AcadEntity/SelectedEntityList";


import avatar from "assets/img/agility-tuts.png";
import {  storeToken } from '../store/user/actions';

class UpdateGame extends Component {
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
  render() {  
    return (this.props.cookies.get('AuthToken') === undefined)? (
      <Redirect to="/auth/login-page" />
          ) :  (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={6}>
              <SelectedEntityList />
            </Col>
            {/* <Col md={6}>
              <div className="card card-user">
                <p className="description text-center">
                  <h5 className="title">
                    <i className="pe-7s-news-paper" />
                    Selected Tab
                  </h5>
                </p>
                <p className="description text-center">
                  <h5 className="title">
                    <i className="pe-7s-musiclist" />
                    Game Type</h5>
                </p>
                <p className="description text-center">
                  <h5 className="title">
                    <i className="pe-7s-browser" />
                    Question Type
                  </h5>
                </p>
              </div>
            </Col> */}

          </Row>
          <Row >
          <Col md={12}>
          <Image src={avatar} thumbnail />
          </Col>
          </Row>
          <Row>
          {/* {gameComponent} */}
          <QuestionEditor question={this.questionSelected()}/>
          </Row>
          </Grid>
        </div>
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
  };
};
export default withCookies(connect(mapStateToProps, mapDispatchToProps)(UpdateGame));
