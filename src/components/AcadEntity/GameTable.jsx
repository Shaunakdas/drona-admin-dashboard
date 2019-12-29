import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Table,
    Button
  } from "react-bootstrap";
  import { gamesFetchData, gameSelected, gameFetchQuestionStructure } from '../../store/games/actions';
  import { questionsFetchData } from '../../store/questions/actions';

 class GameTable extends Component {
    gameSelection(gameKey){
        let selectedGame = this.props.games.games[gameKey];
        this.props.questionsFetchData(selectedGame.id);
        this.props.gameFetchQuestionStructure(selectedGame.id);
        this.props.gameSelected(selectedGame);
    }
    bgColor(gameId){
        const {games} = this.props;
        if(('selected' in games) && (gameId === games.selected.id)){
            return {backgroundColor: '#e5f57f'};
        }
        return null;
    }
    render() {
        const btn ={backgroundColor: '#7ff5e3'};
        const {games, chapters} = this.props;
        if (games.hasErrored) {
            return <p>Sorry! There was an error loading the games</p>;
        }
        if (games.isLoading) {
            return <p>Loading ...</p>;
        }
        if(!('selected' in chapters)){
            return null;
        }
        return (
            <Table striped hover>
                <thead>
                <tr>
                    <th key={'Seq.'}>{'Seq.'}</th>
                    <th key={'Title'}>{'Title'}</th>
                    <th key={'Type'}>{'Type'}</th>
                    <th key={'Id'}>{'Id'}</th>
                </tr>
                </thead>
                <tbody>
                {("games" in this.props.games)?
                  this.props.games.games.map((game, i) => (
                    <tr key={game.id} style={this.bgColor(game.id)}>
                        <td key={game.sequence}>{game.sequence}</td>
                        <td key={game.title}>{game.title}</td>
                        <td key={game.game.name}>{game.game.name}</td>
                        <td key={game.id}>{game.id}</td>
                        <td key={"key"}>
                            <Button style={btn} onClick={() => this.gameSelection(i)}>
                                <i className="fa fa-hand-paper-o" />
                            </Button>
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
      games: state.games,
      chapters: state.chapters
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
      fetchData: () => dispatch(gamesFetchData()),
      questionsFetchData: (gameId) => dispatch(questionsFetchData(gameId)),
      gameFetchQuestionStructure: (gameId) => dispatch(gameFetchQuestionStructure(gameId)),
      gameSelected : (game) => dispatch(gameSelected(game)),
      
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(GameTable);