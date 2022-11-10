import React, { Component } from 'react';

class Header extends Component {
  render() {
    const { name, image, score } = this.props;
    return (
      <header>
        <img data-testid="header-profile-picture" src={ image } alt="imagemPerfil" />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">{ score }</p>
      </header>
    );
  }
}

export default connect()(Header);
