import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
    DropdownButton,
    Table,
    MenuItem
  } from "react-bootstrap";
import { questionsFetchData,questionSelected } from '../../store/questions/actions';

 class QuestionTable extends Component {
    questionSelection(questionKey){
        let selectedQuestion = this.props.questions.questions[questionKey];
        this.props.questionSelected(selectedQuestion);
    }
    render() {
        if (this.props.questions.hasErrored) {
            return <p>Sorry! There was an error loading the questions</p>;
        }
        if (this.props.questions.isLoading) {
            return <p>Loading ...</p>;
        }
        console.log(this.props);
        return (
            <Table striped hover>
                <thead>
                <tr>
                    <th key={'Id'}>{'Id'}</th>
                    <th key={'Sequence'}>{'Sequence'}</th>
                    <th key={'Title'}>{'Title'}</th>
                </tr>
                </thead>
                <tbody>
                {("questions" in this.props.questions)?
                  this.props.questions.questions.map((question, i) => (
                    <tr key={question.id}>
                        <td key={question.id}>{question.id}</td>
                        <td key={question.id}>{'-'}</td>
                        <td key={question.question}>{question.question}</td>
                        <td key={"key"}>
                            <DropdownButton title="Edit">
                                <MenuItem eventKey={2.1} onClick={() => this.questionSelection(i)}>
                                    <NavLink to="game/edit">
                                        Open
                                    </NavLink>
                                </MenuItem>
                                <MenuItem eventKey={2.1}>Move</MenuItem>
                                <MenuItem divider />
                                <MenuItem eventKey={2.1}>Delete</MenuItem>
                            </DropdownButton>
                        </td>
                    </tr>
                    )) : null
                }
                
                </tbody>
            </Table>
        );
    }
}
const mapStateToProps = (state) => {
  return {
      questions: state.questions
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
      fetchData: () => dispatch(questionsFetchData()),
      questionSelected: (question) => dispatch(questionSelected(question)), 
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(QuestionTable);