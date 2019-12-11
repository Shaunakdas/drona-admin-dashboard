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
import Selector from "../Attribute/Selector"

class Option extends Component {
  render() {
    let optionObj = this.props.option;
    console.log(optionObj);
    return (
      <Card
        title="Option"
        content={
          <form>
            {/* Display */}
            {
              (optionObj.answer === undefined)?
                null : 
                <InputText 
                  title="Display"
                  rows="2"
                  input={optionObj.answer}
                />
            }
            {/* Index */}
            {
              (optionObj.index === undefined)?
                null : 
                <InputText 
                  title="Index"
                  rows="2"
                  input={optionObj.index}
                />
            }
            {
              (optionObj.display === undefined)?
                null : 
                <InputText 
                  title="Display"
                  rows="2"
                  input={optionObj.display}
                />
            }
            {/* Hint */}
            {
              (optionObj.hint === undefined)?
                null : 
                <InputText 
                  title="Hint"
                  rows="2"
                  input={optionObj.hint}
                />
            }
            {/* Title */}
            {
              (optionObj.title === undefined)?
                null : 
                <InputText 
                  title="Title"
                  rows="1"
                  input={optionObj.title}
                />
            }
            {/* Value Type */}
            {
              (optionObj.value_type === undefined)?
                null : 
                <InputText 
                  title="Value Type"
                  rows="1"
                  input={optionObj.value_type}
                />
            }
            {/* Key */}
            {
              (optionObj.key === undefined)?
                null : 
                <InputText 
                  title="Key"
                  rows="1"
                  input={optionObj.key}
                />
            }
            {/* Value */}
            {
              (optionObj.value === undefined)?
                null : 
                <InputText 
                  title="Value"
                  rows="1"
                  input={optionObj.value}
                />
            }
            {/* Option Index */}
            {
              (optionObj.option_index === undefined)?
                null : 
                <InputText 
                  title="Option Index"
                  rows="1"
                  input={optionObj.option_index}
                />
            }
            {/* Upper */}
            {
              (optionObj.upper === undefined)?
                null : 
                <InputText 
                  title="Upper"
                  rows="2"
                  input={optionObj.upper}
                />
            }
            {/* Lower */}
            {
              (optionObj.lower === undefined)?
                null : 
                <InputText 
                  title="Lower"
                  rows="2"
                  input={optionObj.lower}
                />
            }
            {/* Attempted */}
            {
              (optionObj.attempted === undefined)?
                null : 
                <InputText 
                  title="Attempted"
                  rows="2"
                  input={optionObj.attempted}
                />
            }
            {/* Sequence */}
            {
              (optionObj.sequence === undefined)?
                null : 
                <InputText 
                  title="Sequence"
                  rows="2"
                  input={optionObj.sequence}
                />
            }

            {/* Correct */}
            {
              (optionObj.correct === undefined)?
                null : 
                <Selector 
                  title="Correct"
                  isChecked={optionObj.correct}
                />
            }
            <div className="clearfix" />
          </form>
        }
      />
    );
  }
}

export default Option;
