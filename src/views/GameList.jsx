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
import { Redirect } from "react-router-dom";
import {
  Grid,
  Row,
  Col,
  FormGroup,
  ControlLabel,
} from "react-bootstrap";

import  Card  from "components/Card/Card.jsx";
import  StandardDropdown  from "components/AcadEntity/StandardDropdown";
import  ChapterDropdown  from "components/AcadEntity/ChapterDropdown";
import  GameTable  from "components/AcadEntity/GameTable";
import QuestionTable from "components/AcadEntity/QuestionTable";

import Button from "components/CustomButton/CustomButton.jsx";


class GameList extends Component {
  render() {
    return (!this.props.user.loggedIn)? (
      <Redirect to="/auth/login-page" />
          ) : (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={6}>
              <Card
                title="Dashboard"
                content={
                  <form>
                  <Row>
                    <Col md={9}>
                    <ControlLabel>Standard: </ControlLabel> <StandardDropdown />
                    </Col>
                  </Row>
                  <Row>
                    <Col md={9}>
                    <ControlLabel>Chapter: </ControlLabel><ChapterDropdown />
                    </Col>
                  </Row>

                    <Row>
                      <Col md={12}>
                      <GameTable />
                      </Col>
                    </Row>
                    <div className="clearfix" />
                  </form>
                }
              />
            </Col>
            <Col md={6}>
            <Row>
            <div className="card card-user">
              <div className="content">
                <p className="description text-center">
                  Selected Standard: Standard_1
                </p>
                <p className="description text-center">
                  Selected Chapter: Chapter_1
                </p>
                <p className="description text-center">
                  Selected Game: Game_1
                </p>
                <p className="description text-center">
                  Question Count: 40
                </p>
                <div className="description text-center">
                <Button bsStyle="info" fill type="submit">
                            New Question
                          </Button>
                </div>
                
                
              </div>
            </div>
            </Row>
            <Row>
            <div className="card card-user">
            <QuestionTable />
                  </div>
                    </Row>
            </Col>
          </Row>
          
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
      user: state.user
  };
};
export default connect(mapStateToProps, null) (GameList);
