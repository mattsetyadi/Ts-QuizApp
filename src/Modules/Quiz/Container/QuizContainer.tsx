import { Difficulty, QuestionState } from '../../App/API';
import React, { useState } from 'react';

import QuizComponent from '../Component/QuizComponent';
import { fetchQuizQuestions } from '../../App/API';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const TOTAL_QUESTIONS = 10;

const QuizContainer = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startTrivia: any = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const forcePassedUserAnswers = userAnswers;

  // console.log('user answer', userAnswers);

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      //   User answers
      const answer = e.currentTarget.value;

      //   check user answer against corrent answer
      const correct = questions[number].correct_answer === answer;

      // add score if answer is correct
      if (correct) setScore((prev) => prev + 1);

      // Save user asnwer into array
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };

      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    const nextQuestion = number + 1;

    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  const renderNextButton = () => {
    if (
      gameOver === false &&
      loading === false &&
      userAnswers?.length === number + 1 &&
      number !== TOTAL_QUESTIONS - 1
    )
      return true;
  };

  const finished = () => {
    setGameOver(true);
    setNumber(0);
    setQuestions([]);
    setUserAnswers([]);
    setScore(0);
  };

  // console.log(renderNextButton);

  return (
    <>
      <QuizComponent
        startTrivia={startTrivia}
        callback={checkAnswer}
        nextQuestion={nextQuestion}
        questionNumber={number + 1}
        loading={loading}
        totalQuestions={TOTAL_QUESTIONS}
        question={questions ? questions[number]?.question : null}
        answers={questions[number]?.answers}
        userAnswer={userAnswers ? userAnswers[number] : undefined}
        number={number}
        userAswers={userAnswers.length > 0 ? userAnswers : number}
        gameOver={gameOver}
        score={score}
        apaanIni={forcePassedUserAnswers}
        renderNextButton={renderNextButton}
      />
      {gameOver === false &&
      loading === false &&
      userAnswers.length === number + 1 &&
      number !== TOTAL_QUESTIONS - 1 ? (
        <button onClick={nextQuestion}>NextQuestion</button>
      ) : null}
      {!loading && userAnswers?.length === TOTAL_QUESTIONS ? (
        <button onClick={finished}>Start Over</button>
      ) : null}
    </>
  );
};

export default QuizContainer;
