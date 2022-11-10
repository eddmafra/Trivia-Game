import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { requestEmail, thunkToken } from '../redux/actions';

const INITIAL_STATE = {
  name: '',
  email: '',
  btnDisable: true,
};

class Login extends React.Component {
  constructor() {
    super();
    this.state = INITIAL_STATE;
  }

  onInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    }, this.validationLogin);
  };

  validationLogin = () => {
    const { email, name } = this.state;
    const validationEmail = /^.{3,}$/;
    const validationName = /^.{3,}$/;
    if (validationEmail.test(email) && validationName.test(name)) {
      this.setState({ btnDisable: false });
    } else {
      this.setState({
        btnDisable: true,
      });
    }
  };

  startGame = () => {
    const { history, dispatch } = this.props;
    const { email, name } = this.state;
    dispatch(thunkToken());
    dispatch(requestEmail(email, name));
    history.push('/jogodetrivia');
  };

  btnSettings = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    const { name, email, btnDisable } = this.state;
    return (
      <form>
        <label htmlFor="name">
          Nome
          <input
            type="text"
            data-testid="input-player-name"
            id="name"
            name="name"
            value={ name }
            placeholder="Insira seu nome"
            onChange={ this.onInputChange }
          />
        </label>
        <label htmlFor="email">
          E-mail
          <input
            type="email"
            data-testid="input-gravatar-email"
            id="email"
            name="email"
            value={ email }
            placeholder="email"
            onChange={ this.onInputChange }
          />
        </label>
        <button
          data-testid="btn-play"
          type="button"
          disabled={ btnDisable }
          onClick={ this.startGame }
        >
          Play
        </button>
        <button
          data-testid="btn-settings"
          type="button"
          onClick={ this.btnSettings }
        >
          Configurações
        </button>

      </form>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  token: state.payload,
});

export default connect(mapStateToProps)(Login);
