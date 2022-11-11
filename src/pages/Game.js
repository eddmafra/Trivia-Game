import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import getTrivia from '../services/fetchTrivia';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      indexQuestion: 0,
      score: 0,
      color: false,
      timer: 30,
    };
  }

  componentDidMount() {
    this.renderQuestions();
    this.myTimer();
  }

  renderQuestions = async () => {
    const { history } = this.props;
    const getToken = localStorage.getItem('token');
    const response = await getTrivia(getToken);
    if (response.response_code !== 0) {
      localStorage.removeItem('token');
      history.push('/');
    }
    this.setState({
      questions: response.results,
    });
  };

  clickAnswer = ({ target }) => {
    const answer = target.value;
    const points = 10;
    this.setState({
      color: true,
    });
    if (answer === 'correct') {
      this.setState((prev) => ({
        score: (prev.score + points),
      }));
    } else if (answer === 'incorrect') {
      this.setState((prev) => ({
        score: (prev.score - points),
      }));
    }
  };

  randomAnswers = (array, timer) => {
    const NUMBER = 0.5;
    const time = 30;
    if (timer === time) {
      const random = array.sort(() => Math.random() - NUMBER);
      return random;
    }
    return array;
  };

  myTimer = () => {
    const { timer } = this.state;
    const seconds = 1000;
    setInterval(() => {
      this.setState((prev) => ({
        timer: timer > 0 ? prev.timer - 1 : 0,
      }));
    }, seconds);
  };

  clickNext = () => {
    this.setState((prev) => ({
      indexQuestion: (prev.indexQuestion + 1),
      color: false,
    }));
  };

  mudarCor = (el, e) => (
    el === e.correct_answer
      ? '3px solid rgb(6, 240, 15)' : '3px solid red');

  render() {
    const { questions, indexQuestion, color, timer } = this.state;
    // console.log(questions);
    if (questions.length === 0) {
      return (
        <Header />
      );
    }
    return (
      <>
        <Header />

        {questions.map((e, i) => {
          if (i === indexQuestion) {
            return (
              <div>
                <p>
                  Timer
                  { timer }
                </p>
                <div key={ i }>
                  <div className="perguntas">
                    <p data-testid="question-text">{ e.question }</p>
                    <p data-testid="question-category">{ e.category }</p>
                  </div>
                  <div className="respostas" data-testid="answer-options">
                    {this.randomAnswers([...e.incorrect_answers, e.correct_answer], timer)
                      .map((el, index) => (
                        <button
                          onClick={ this.clickAnswer }
                          disabled={ timer <= 0 }
                          type="button"
                          key={ index }
                          value={ el === e.correct_answer ? 'correct' : 'incorrect' }
                          data-testid={ el === e.correct_answer
                            ? 'correct-answer' : `wrong-answer-${index}` }
                          style={ {
                            border: color && (this.mudarCor(el, e)),
                          } }
                        >
                          { el }

                        </button>
                      ))}
                    <button
                      type="button"
                      data-testid="btn-next"
                      onClick={ this.clickNext }
                      disabled={ timer <= 0 }
                    >
                      Próxima Pergunta

                    </button>
                  </div>
                </div>
              </div>
            );
          }
          return null;
        })}

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
