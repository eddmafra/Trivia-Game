import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';
import getTrivia from '../services/fetchTrivia';
import { rightAnswer, scoreAction } from '../redux/actions';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      indexQuestion: 0,
      localScore: 0,
      color: false,
      timer: 30,
      correctAnswers: 0,
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

  randomAnswers = (array) => {
    const NUMBER = 0.5;
    const random = array.sort(() => Math.random() - NUMBER);
    return random;
  };

  clickAnswer = ({ target }) => {
    const answer = target.value;
    this.setState({
      color: true,
    });
    if (answer === 'correct') {
      this.calcScore();
      this.setState((prev) => ({
        correctAnswers: prev.correctAnswers + 1,
      }));
    }
  };

  myTimer = () => {
    const seconds = 1000;
    const countDown = setInterval(() => {
      this.setState((prev) => ({
        timer: prev.timer - 1,
      }), () => {
        const { timer } = this.state;
        if (timer === 0) {
          clearInterval(countDown);
          this.setState({
            color: true,
          });
        }
      });
    }, seconds);
  };

  calcScore = () => {
    const { questions, timer, indexQuestion } = this.state;
    const { dispatch } = this.props;
    const points = 10;
    const easy = 1;
    const medium = 2;
    const hard = 3;
    if (questions[indexQuestion].difficulty === 'easy') {
      this.setState((prev) => ({
        localScore: prev.localScore + (points + (timer * easy)),
      }), () => {
        const { localScore } = this.state;
        dispatch(scoreAction(localScore));
      });
    }
    if (questions[indexQuestion].difficulty === 'medium') {
      this.setState((prev) => ({
        localScore: prev.localScore + (points + (timer * medium)),
      }), () => {
        const { localScore } = this.state;
        dispatch(scoreAction(localScore));
      });
    }
    if (questions[indexQuestion].difficulty === 'hard') {
      this.setState((prev) => ({
        localScore: prev.localScore + (points + (timer * hard)),
      }), () => {
        const { localScore } = this.state;
        dispatch(scoreAction(localScore));
      });
    }
  };

  clickNext = () => {
    const { correctAnswers, indexQuestion } = this.state;
    const { history } = this.props;
    const FOUR = 4;
    if (indexQuestion === FOUR) {
      history.push('/feedback');
    }
    const { dispatch } = this.props;
    dispatch(rightAnswer(correctAnswers));
    this.setState((prev) => ({
      indexQuestion: (prev.indexQuestion + 1),
      color: false,
      timer: 30,
    }));
  };

  mudarCor = (el, e) => (
    el === e.correct_answer
      ? '3px solid rgb(6, 240, 15)' : '3px solid red');

  render() {
    const { questions, indexQuestion, color, timer, localScore } = this.state;
    // console.log(questions);
    if (questions.length === 0) {
      return (
        <Header />
      );
    }
    return (
      <>
        <Header scoreType={ localScore } />

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
                    {this.randomAnswers([...e.incorrect_answers, e.correct_answer])
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
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
export default connect()(Game);
