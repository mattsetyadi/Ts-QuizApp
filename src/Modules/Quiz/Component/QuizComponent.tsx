import QuestionCardComponent from './QuestionCardComponent';

const QuizComponent = (props: any) => {
  const {
    startTrivia,
    // nextQuestion,
    userAnswer,
    question,
    answers,
    gameOver,
    loading,
    // userAnswers,
    totalQuestions,
    score,
    // renderNextButton,
  } = props;
  // console.log('props quiz component', props);

  // console.log(userAnswers);

  return (
    <div className="app">
      <h1>React Quix</h1>
      {gameOver || userAnswer === totalQuestions ? (
        <button onClick={startTrivia}>Start</button>
      ) : null}
      <p>
        Score : {score} / {totalQuestions}
      </p>
      {loading && !question ? (
        <p>Loading...</p>
      ) : (
        <QuestionCardComponent
          {...props}
          question={question}
          answers={answers}
          // userAnswer={userAnswer}
        />
      )}
      {/* {renderNextButton === true ? (
        <button onClick={nextQuestion}>NextQuestion</button>
      ) : null} */}
    </div>
  );
};

export default QuizComponent;
