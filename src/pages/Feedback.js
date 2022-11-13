import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { scoreAction } from '../redux/actions';

class Feedback extends Component {
  playAgain = () => {
    const resetScore = 0;
    const { dispatch } = this.props;
    const { history } = this.props;
    dispatch(scoreAction(resetScore));
    history.push('/');
  };

  goToRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    const { assertions, score } = this.props;
    const NUMBER = 3;
    return (
      <>
        <Header scoreType={ score } />
        {(assertions >= NUMBER)
          ? <p data-testid="feedback-text">Well Done!</p>
          : <p data-testid="feedback-text">Could be better...</p>}
        <p data-testid="feedback-total-question">{assertions}</p>
        <p data-testid="feedback-total-score">{score}</p>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.playAgain }
        >
          Play Again
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ this.goToRanking }
        >
          Ranking

        </button>
      </>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
