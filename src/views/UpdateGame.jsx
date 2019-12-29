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
    const {cookies, questions} = this.props;
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
                    <Col md={6}>
                      <ImageZoom
                        image={{
                          src: avatar,
                          alt: 'Golden Gate Bridge',
                          className: 'img',
                          style: { width: '30em' }
                        }}
                        zoomImage={{
                          src: avatar,
                          alt: 'Golden Gate Bridge'
                        }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    {/* {gameComponent} */}
                    <QuestionEditor question={this.questionSelected()}/>
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
  };
};
export default withCookies(connect(mapStateToProps, mapDispatchToProps)(UpdateGame));
