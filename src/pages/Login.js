import React from 'react';

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
    const validationEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    const validationName = /^.{3,}$/;
    if (validationEmail.test(email) && validationName.test(name)) {
      this.setState({ btnDisable: false });
    } else {
      this.setState({
        btnDisable: true,
      });
    }
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
          onClick={ () => {} }
        >
          Play
        </button>

      </form>
    );
  }
}

export default Login;
