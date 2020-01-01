import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, withRouter } from 'react-router-dom';
import ReactTable from "react-table";
import {
    ControlLabel
  } from "react-bootstrap";

import Button from "components/CustomButton/CustomButton.jsx";
import SweetAlert from "react-bootstrap-sweetalert";
import { questionsFetchData,questionSelected,questionDeleteCalled } from '../../store/questions/actions';

 class QuestionTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alert: null,
            show: false
        };
        this.hideAlert = this.hideAlert.bind(this);
        this.successDelete = this.successDelete.bind(this);
        this.cancelDelete = this.cancelDelete.bind(this);
    }
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
              date: new Date(question.question_updated_at*1000).toISOString(),
              actions: (
                // we've added some custom button actions
                <div className="actions-right">
                  {/* use this button to add a edit kind of action */}
                  <Button
                    onClick={() => {this.questionSelection(question.id)}}
                    simple
                    icon
                  >
                    <i className="fa fa-edit" />
                  </Button>{" "}
                  <Button
                    onClick={() => {this.warningWithConfirmAndCancelMessage(question)}}
                    bsStyle="warning"
                    simple
                    icon
                  >
                    <i className="fa fa-times" />
                  </Button>{" "}
                </div>
              )
            };
          })
    }
    successDelete(question) {
        this.props.questionDeleteCalled(question, 1);
        this.setState({
            alert: (
            <SweetAlert
                success
                style={{ display: "block", marginTop: "-100px" }}
                title="Deleted!"
                onConfirm={() => this.hideAlert()}
                onCancel={() => this.hideAlert()}
                confirmBtnBsStyle="info"
            >
                Trying to delete Question [id: {question.id} display: {question.display}]
            </SweetAlert>
            )
        });
    }
    warningWithConfirmAndCancelMessage(question) {
        this.setState({
            alert: (
            <SweetAlert
                warning
                style={{ display: "block", marginTop: "-100px" }}
                title="Are you sure?"
                onConfirm={() => this.successDelete(question)}
                onCancel={() => this.cancelDelete()}
                confirmBtnBsStyle="info"
                cancelBtnBsStyle="danger"
                confirmBtnText="Yes, delete it!"
                cancelBtnText="Cancel"
                showCancel
            >
                You will not be able to recover this imaginary file!
            </SweetAlert>
            )
        });
    }
    cancelDelete() {
        this.setState({
            alert: (
            <SweetAlert
                danger
                style={{ display: "block", marginTop: "-100px" }}
                title="Cancelled"
                onConfirm={() => this.hideAlert()}
                onCancel={() => this.hideAlert()}
                confirmBtnBsStyle="info"
            >
                Your imaginary file is safe :)
            </SweetAlert>
            )
        });
    }
    hideAlert() {
        this.setState({
          alert: null
        });
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
            {Header: 'Modified Date', accessor: 'date'},
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
                {this.state.alert}
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
      questionDeleteCalled: (question, deleteStatus, parentQuestionId) => dispatch(questionDeleteCalled(question, deleteStatus, parentQuestionId)), 
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(QuestionTable));