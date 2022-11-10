import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getTrivia from '../services/fetchTrivia';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
    };
  }

  componentDidMount() {
    this.renderQuestions();
  }

  renderQuestions = async () => {
    const { history } = this.props;
    const getToken = localStorage.getItem('token');
    const response = await getTrivia(getToken);
    // console.log(response);
    if (response.response_code !== 0) {
      localStorage.removeItem('token');
      history.push('/');
    }
    this.setState({
      questions: response.results,
    });
  };

  render() {
    const { questions } = this.state;
    console.log(questions);
    if (questions.length === 0) {
      return (
        <Header />
      );
    }
    return (
      <>
        <Header />
        {questions.map((e, i) => (

          <div key={ i }>
            <div className="perguntas">
              <p data-testid="question-text">{ e.question }</p>
              <p data-testid="question-category">{ e.category }</p>
            </div>
            <div className="respostas" data-testid="answer-options">
              <button
                type="button"
                data-testid="correct-answer"
              >
                { e.correct_answer }

              </button>
              {e.incorrect_answers.map((el, index) => (
                <button
                  type="button"
                  key={ index }
                  data-testid={ `wrong-answer-${index}` }
                >
                  { el }

                </button>
              ))}
            </div>
          </div>

        ))}
      </>
    );
  }
}
Game.propTypes = {
  // dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
export default connect()(Game);
