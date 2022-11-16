import md5 from 'crypto-js/md5';
// import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { scoreAction } from '../redux/actions';
import { pegaJogadorStorage } from '../services/gameStorage';

class Ranking extends Component {
  state = {
    jogadores: [],
  };

  componentDidMount() {
    const jogadores = pegaJogadorStorage();
    jogadores.sort((jogador1, jogador2) => jogador2.score - jogador1.score); // ordenando pela pontuação "score"
    this.setState({ jogadores });
  }

  btnInicio = () => {
    const { history, jogador } = this.props;
    jogador(0, 0);
    history.push('/');
  };

  listaRanking = () => {
    const { jogadores } = this.state;
    const lista = jogadores.map((jogador, index) => {
      const { email, name, score } = jogador;
      const gravatarEmail = md5(email).toString();
      return (
        <li key={ index }>
          <img src={ `https://www.gravatar.com/avatar/${gravatarEmail}` } alt={ name } />
          <p data-testid={ `player-name-${index}` }>{name}</p>
          <p data-testid={ `player-score-${index}` }>{score}</p>
        </li>
      );
    });
    return lista;
  };

  render() {
    return (
      <div>
        <h1
          data-testid="ranking-title"
        >
          Ranking

        </h1>
        <ol>
          { this.listaRanking() }
        </ol>
        <button
          onClick={ this.btnInicio }
          aria-label="ranking"
          type="button"
          data-testid="btn-go-home"
        >
          Voltar a tela inicial
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  jogador: (score, assertions) => dispatch(scoreAction(score, assertions)),
});

// Ranking.propTypes = {
//   history: PropTypes.shape({
//     push: PropTypes.func,
//   }).isRequired,
// };

Ranking.propTypes = {}.isRequired;

export default connect(null, mapDispatchToProps)(Ranking);
