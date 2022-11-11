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
      indexQuestion: 0,
      score: 0,
      timer: 30,
      // disabled: false,
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
    // console.log(response);
    if (response.response_code !== 0) {
      localStorage.removeItem('token');
      history.push('/');
    }
    this.setState({
      questions: response.results,
    });
  };

  clickAnswer = ({ target }) => {
    console.log(target.value);
    // const { indexQuestion } = this.state;
    const answer = target.value;
    const points = 10;
    // console.log(indexQuestion);
    if (answer === 'correct') {
      this.setState((prev) => ({
        // indexQuestion: (prev.indexQuestion + 1),
        score: (prev.score + points),
      }));
    } else if (answer === 'incorrect') {
      this.setState((prev) => ({
        // indexQuestion: (prev.indexQuestion + 1),
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
    // clearInterval(teste);
    setInterval(() => {
      this.setState((prev) => ({
        timer: timer > 0 ? prev.timer - 1 : 0,
      }));
    }, seconds);
  };

  clickNext = () => {
    this.setState((prev) => ({
      indexQuestion: (prev.indexQuestion + 1),
    }));
  };

  render() {
    const { questions, indexQuestion, timer } = this.state;
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
