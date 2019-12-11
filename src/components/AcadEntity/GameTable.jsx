import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Table,
    Button
  } from "react-bootstrap";
  import { gamesFetchData, gameSelected } from '../../store/games/actions';
  import { questionsFetchData } from '../../store/questions/actions';

 class GameTable extends Component {
    gameSelection(gameKey){
        let selectedGame = this.props.games.games[gameKey];
        this.props.questionsFetchData(selectedGame.id);
        this.props.gameSelected(selectedGame);
    }
    render() {
        if (this.props.games.hasErrored) {
            return <p>Sorry! There was an error loading the games</p>;
        }
        if (this.props.games.isLoading) {
            return <p>Loading ...</p>;
        }
        return (
            <Table striped hover>
                <thead>
                <tr>
                    <th key={'Sequence'}>{'Sequence'}</th>
                    <th key={'Title'}>{'Title'}</th>
                    <th key={'Type'}>{'Type'}</th>
                    <th key={'Id'}>{'Id'}</th>
                </tr>
                </thead>
                <tbody>
                {("games" in this.props.games)?
                  this.props.games.games.map((game, i) => (
                    <tr key={game.id}>
                        <td key={game.sequence}>{game.sequence}</td>
                        <td key={game.title}>{game.title}</td>
                        <td key={game.game.name}>{game.game.name}</td>
                        <td key={game.id}>{game.id}</td>
                        <td key={"key"}>
                            <Button bsStyle="info" onClick={() => this.gameSelection(i)}>
                                <i className="pe-7s-more" />
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
      games: state.games
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
      fetchData: () => dispatch(gamesFetchData()),
      questionsFetchData: (gameId) => dispatch(questionsFetchData(gameId)),
      gameSelected : (game) => dispatch(gameSelected(game)),
      
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(GameTable);