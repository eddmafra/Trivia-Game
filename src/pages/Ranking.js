import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Ranking extends Component {
  btnInicio = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <>
        <h1
          data-testid="ranking-title"
        >
          Ranking

        </h1>
        <button
          onClick={ this.btnInicio }
          aria-label="ranking"
          type="button"
          data-testid="btn-go-home"
        >
          Voltar a tela inicial
        </button>
      </>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Ranking;
