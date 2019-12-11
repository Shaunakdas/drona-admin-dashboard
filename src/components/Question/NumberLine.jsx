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

import Card from "components/Card/Card.jsx";
import InputText from "../Attribute/InputText"
import OptionList from "components/Option/OptionList";

class NumberLine extends Component {
  render() {
    let questionObj = this.props.number_line;
    return (
      (questionObj === undefined)?
        null : 
        <Card
          title="Number Line"
          content={
            <form>
              {/* Mode */}
              <InputText 
                title="Mode"
                input={questionObj.mode}
                rows="1"
              />
              {/* Marker Gap : Big */}
              <InputText 
                title="Marker Gap : Big"
                input={questionObj.marker_gaps.big}
                rows="1"
              />
              {/* Marker Gap : Small */}
              <InputText 
                title="Marker Gap : Small"
                input={questionObj.marker_gaps.small}
                rows="1"
              />
              {/* Marker Gap : Tiny */}
              <InputText 
                title="Marker Gap : Tiny"
                input={questionObj.marker_gaps.tiny}
                rows="1"
              />
              {/* Answer : Index */}
              <InputText 
                title="Answer : Index"
                input={questionObj.answer.index}
                rows="1"
              />
              {/* Answer : Title */}
              <InputText 
                title="Answer : Title"
                input={questionObj.answer.title}
                rows="2"
              />
              {/* Answer : Sub Title */}
              <InputText 
                title="Answer : Sub Title"
                input={questionObj.answer.sub_title}
                rows="1"
              />


              {/* Blocks */}
              {
                (questionObj.blocks === undefined)?
                  null : 
                  <div>
                    {
                      questionObj.blocks.map((block) => {
                        return (
                          <div>
                            <InputText 
                              title="Block"
                              rows="2"
                              input={block.title}
                            />
                            {
                              (block.faces === undefined)?
                                null : 
                                <OptionList title="Faces" options={block.faces}/>
                            }
                            
                            
                          </div>
                        )
                      })
                    }
                  </div>
              }

              {/* Options */}
              {
                (questionObj.display === undefined)?
                  null : 
                  <OptionList options={questionObj.display}/>
              }
              <div className="clearfix" />
            </form>
          }
        />
    );
  }
}

export default NumberLine;
