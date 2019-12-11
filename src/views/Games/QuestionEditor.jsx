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
import AgilityJson from "./agility_structure.json";

class QuestionEditor extends Component {
  
  render() {
    let questionObj = AgilityJson.game_holder_detail.question_input.sections[0];
    if(!(this.props.question === undefined)){
      questionObj = this.props.question;
    }
    
    return (
      <Col md={9}>
        <Question questionObj={questionObj} />
        {/* Title */}
        {
          !("blocks" in questionObj)?
            null :
            <div>
              {
                questionObj.blocks.map((block) => {
                  return (
                    <Question questionObj={block}/>);
                })
              }
            </div>
        }  
      </Col>
    );
  }
}

export default QuestionEditor;
