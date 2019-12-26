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
import {
  Col,
} from "react-bootstrap";

import Question from "components/Question/Question";
import QuestionList from "components/Question/QuestionList";

class QuestionEditor extends Component {
  
  render() {
    let {question} = this.props;
    return (
      <Col md={9}>
        {
          question.is_parent_question?
            <QuestionList questionObj={question} /> :
            <Question questionObj={question} />
        }  
      </Col>
    );
  }
}

export default QuestionEditor;
