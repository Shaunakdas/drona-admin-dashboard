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
    questionSelection(questionId){
        this.props.questionSelected(questionId);
    }
    render() {
        const {questions, games} = this.props;
        if (questions.hasErrored) {
            return <p>Sorry! There was an error loading the questions</p>;
        }
        if (questions.isLoading) {
            return <p>Loading ...</p>;
        }
        if(!('selected' in games)){
            return null;
        }
        return (
            <Table striped hover>
                <thead>
                <tr>
                    <th key={'Id'}>{'Id'}</th>
                    <th key={'Seq.'}>{'Seq.'}</th>
                    <th key={'Title'}>{'Title'}</th>
                </tr>
                </thead>
                <tbody>
                {("questions" in this.props.questions)?
                  this.props.questions.questions.map((question, i) => (
                    <tr key={`${question.id}-${i}`}>
                        <td key={question.id}>{question.id}</td>
                        <td key={`${question.id}-${i}${i}`}>{'-'}</td>
                        <td key={question.question}>{question.question}</td>
                        <td key={"key"}>
                            <DropdownButton id={3} title="Edit">
                                <MenuItem eventKey={2.1} onClick={() => this.questionSelection(question.id)}>
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
      questions: state.questions,
      games: state.games
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
      fetchData: () => dispatch(questionsFetchData()),
      questionSelected: (questionId) => dispatch(questionSelected(questionId)), 
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(QuestionTable);