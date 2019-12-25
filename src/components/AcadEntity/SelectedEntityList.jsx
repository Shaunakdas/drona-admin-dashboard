import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from "components/Card/Card.jsx";

 class SelectedEntityList extends Component {
    render() {
        const { standards, chapters, games, questions } = this.props;
        if (standards.hasErrored) {
            return <p>Sorry! There was an error loading the chapters</p>;
        }
        if(!(('selected' in standards) && ('name' in standards.selected))){
          return null
        }
        return (
          <Card
          title="Current selection"
          content= 
          {
            <form>

            {
              (('selected' in standards) && ('name' in standards.selected))? 
              <h5 className="title">
                <i className="pe-7s-culture" />
                Selected Standard: Standard {standards.selected.name}
              </h5>
              : null 
            }
          
            {
              ('selected' in chapters)? 
              <h5 className="title">
                <i className="pe-7s-bookmarks" />
                Selected Chapter: {chapters.selected.name}
              </h5>
              : null 
            }
            {
              ('selected' in games)? 
              <div>
                <h5 className="title">
                  <i className="pe-7s-joy" />
                  Selected Game: {games.selected.title}
                </h5>
                <h5 className="title">
                  <i className="pe-7s-joy" />
                  Selected Game Type: {games.selected.game.name}
                </h5>
                <h5 className="title">
                  <i className="pe-7s-copy-file" />
                  Question Count: {questions.questions.length}
                </h5>
              </div>
              : null 
            }
            </form>
          }
                 />
        );
    }
}
const mapStateToProps = (state) => {
  return {
    standards: state.standards,
    chapters: state.chapters,
    games: state.games,
    questions: state.questions,
  };
};
export default connect(mapStateToProps, null)(SelectedEntityList);
