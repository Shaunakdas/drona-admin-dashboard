import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import ReactTable from "react-table";
import {
    ControlLabel
  } from "react-bootstrap";

import Button from "components/CustomButton/CustomButton.jsx";
import { questionsFetchData,questionSelected } from '../../store/questions/actions';

 class QuestionTable extends Component {
    questionSelection(questionId){
        this.props.questionSelected(questionId);
        this.props.history.push('game/edit')
    }
    getColumns = () =>{
        return this.props.questions.questions.map((question,i) => {
            return {
              seq: i,
              id: question.id,
              display: question.question,
              hint: question.hint,
              actions: (
                // we've added some custom button actions
                <div className="actions-right">
                  {/* use this button to add a edit kind of action */}
                  <Button
                    onClick={() => {this.questionSelection(question.id)}}
                    bsStyle="warning"
                    simple
                    icon
                  >
                    <i className="fa fa-edit" />
                  </Button>{" "}
                </div>
              )
            };
          })
    }
    filterMethod = (filter, row, column) => {
        const id = filter.pivotId || filter.id
        return row[id] !== undefined ? String(row[id].toLowerCase()).startsWith(filter.value.toLowerCase()) : true
      }
    render() {
        const columns = [
            {Header: 'Id', accessor: 'id'},
            {Header: 'Title', accessor: 'display'},
            {Header: 'Actions', accessor: 'actions'},
            {Header: 'Type', accessor: 'hint'},
        ]
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
            <div>
                <ControlLabel>Question List</ControlLabel>
                <ReactTable
                    defaultFilterMethod={this.filterMethod}
                    filterable
                    data={this.getColumns()}
                    columns={columns}
                    defaultPageSize={10}
                    showPaginationTop
                    showPaginationBottom={false}
                    className="-striped -highlight"
                />
            </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(QuestionTable));