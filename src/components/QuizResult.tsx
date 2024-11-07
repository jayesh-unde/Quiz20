import React from 'react';
import { FaShare, FaEye } from 'react-icons/fa';


interface QuizResultProps {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  unattemptedQuestions: number;
  darkMode: boolean;
}

const QuizResult: React.FC<QuizResultProps> = ({
  score,
  totalQuestions,
  correctAnswers,
  incorrectAnswers,
  unattemptedQuestions,
  darkMode
}) => {
  const totalAnswered = correctAnswers + incorrectAnswers;
  const percentageCorrect = (correctAnswers / totalAnswered) * 100;
  const percentageIncorrect = (incorrectAnswers / totalAnswered) * 100;
  const percentageUnattempted = (unattemptedQuestions / totalQuestions) * 100;

  return (
    <div className={`min-h-screen p-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quiz20</h1>
      </div>

      <div className="text-center">
        <h2 className="text-2xl mb-4">Quiz Complete!</h2>
        <p className="text-xl mb-2">Your Score: {score}/{totalQuestions}</p>

        <div className="flex justify-center items-center mb-8">
          <div className="relative w-64 h-64">
            <div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-4xl font-bold"
              style={{ color: 'white', textShadow: '0 0 10px rgba(0, 0, 0, 0.5)' }}
            >
              {Math.round(percentageCorrect)}%
            </div>
            <div className="absolute w-full h-full">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke={darkMode ? '#475569' : '#E5E7EB'}
                  strokeWidth="10"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="transparent"
                  stroke="#4CAF50"
                  strokeWidth="10"
                  strokeDasharray={`${percentageCorrect * 2.51} 251`}
                  transform="rotate(-90) translate(-100)"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-8">
          <div>
            <p className="text-green-500 text-xl font-bold">{Math.round(percentageCorrect)}%</p>
            <p className="text-gray-400">Correct</p>
          </div>
          <div>
            <p className="text-red-500 text-xl font-bold">{Math.round(percentageIncorrect)}%</p>
            <p className="text-gray-400">Incorrect</p>
          </div>
          <div>
            <p className="text-gray-400 text-xl font-bold">{Math.round(percentageUnattempted)}%</p>
            <p className="text-gray-400">Unattempted</p>
          </div>
        </div>

        <div className="flex justify-between gap-4">
          <button className="flex-1 p-4 bg-gray-700 rounded-lg">
            <FaShare size={20} />
            <span className="ml-2">Share</span>
          </button>
          <button className="flex-1 p-4 bg-gray-700 rounded-lg">
            <FaEye size={20} />
            <span className="ml-2">Answers</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizResult;
