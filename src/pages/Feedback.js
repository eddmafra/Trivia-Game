import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { rightAnswer } = this.props;
    const NUMBER = 3;
    return (
      <>
        <Header />
        {(rightAnswer >= NUMBER) ? <p>Well Done!</p> : <p>Could be better...</p>}
      </>
    );
  }
}

Feedback.propTypes = {
  rightAnswer: PropTypes.number.isRequired,
};

mapStateToProps = (state) => ({
  rightAnswer: state.reducer.rightAnswer,
});

export default connect()(Feedback);
