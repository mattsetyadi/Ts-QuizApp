// types
import { AnswerObject } from '../Container/QuizContainer';
import React from 'react';

type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNumber: number;
  totalQuestions: number;
};

const QuestionCardComponent: React.FC<Props> = (props) => {
  const {
    question,
    answers,
    callback,
    userAnswer,
    questionNumber,
    totalQuestions,
  } = props;
  return (
    <div>
      <p>{question && `Question: ${questionNumber} / ${totalQuestions}`}</p>
      <p dangerouslySetInnerHTML={{ __html: question }} />
      <div>
        {answers &&
          answers.map((answer, index) => (
            <div key={index}>
              {/* !! digunakan untuk merubah value pada types userAnswer(Answerobject) menjadi boolean */}
              <button disabled={!!userAnswer} value={answer} onClick={callback}>
                <span dangerouslySetInnerHTML={{ __html: answer }} />
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default QuestionCardComponent;
