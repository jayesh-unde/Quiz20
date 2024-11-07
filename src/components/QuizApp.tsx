'use client'

import React, { useState, useEffect } from 'react';
import { FaLanguage } from "react-icons/fa";
import { BsSun, BsMoon } from "react-icons/bs";
import QuizResult from './QuizResult';

// Types for our quiz data
type Question = {
  id: number;
  text: {
    en: string;
    hi: string;
  };
  options: {
    id: string;
    text: {
      en: string;
      hi: string;
    };
  }[];
  correctAnswer: string;
};

// Sample quiz data
const quizData: Question[] = [
  {
    id: 1,
    text: {
      en: "Which one of the following is not a characteristic feature of Indian Federalism?",
      hi: "निम्नलिखित में से कौन भारतीय संघवाद की विशेषता नहीं है?"
    },
    options: [
      {
        id: "A",
        text: {
          en: "The federating units consented to form a union",
          hi: "संघीय इकाइयों ने संघ बनाने की सहमति दी"
        }
      },
      {
        id: "B",
        text: {
          en: "Residuary powers vested with the Centre",
          hi: "केंद्र के पास निहित अवशिष्ट शक्तियां"
        }
      },
      {
        id: "C",
        text: {
          en: "An extensive Union and Concurrent list",
          hi: "एक विस्तृत संघ और समवर्ती सूची"
        }
      },
      {
        id: "D",
        text: {
          en: "None of the above",
          hi: "उपरोक्त में से कोई नहीं"
        }
      }
    ],
    correctAnswer: "A"
  },
  {
    id: 2,
    text: {
      en: "Which one of the following is not a characteristic feature of Indian Federalism?",
      hi: "निम्नलिखित में से कौन भारतीय संघवाद की विशेषता नहीं है?"
    },
    options: [
      {
        id: "A",
        text: {
          en: "The federating units consented to form a union",
          hi: "संघीय इकाइयों ने संघ बनाने की सहमति दी"
        }
      },
      {
        id: "B",
        text: {
          en: "Residuary powers vested with the Centre",
          hi: "केंद्र के पास निहित अवशिष्ट शक्तियां"
        }
      },
      {
        id: "C",
        text: {
          en: "An extensive Union and Concurrent list",
          hi: "एक विस्तृत संघ और समवर्ती सूची"
        }
      },
      {
        id: "D",
        text: {
          en: "None of the above",
          hi: "उपरोक्त में से कोई नहीं"
        }
      }
    ],
    correctAnswer: "A"
  }
];

const QuizApp = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [timeLeft, setTimeLeft] = useState(60);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [score, setScore] = useState(0);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [darkMode, setDarkMode] = useState(true);

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !isQuizComplete) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      handleQuizComplete();
    }
  }, [timeLeft, isQuizComplete]);

  // Handle quiz completion
  const handleQuizComplete = () => {
    setIsQuizComplete(true);
    let totalScore = 0;
    Object.entries(selectedAnswers).forEach(([questionIndex, answer]) => {
      if (quizData[parseInt(questionIndex)].correctAnswer === answer) {
        totalScore++;
      }
    });
    setScore(totalScore);
  };

  // Handle option selection
  const handleOptionSelect = (optionId: string) => {
    if (!isQuizComplete) {
      setSelectedAnswers({
        ...selectedAnswers,
        [currentQuestion]: optionId
      });
    }
  };

  // Navigation handlers
  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // Toggle language
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  // Toggle dark/light mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen p-4 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Quiz20</h1>
        <div className="absolute right-1.5 px-4 py-2 flex items-center gap-4">
          {/* Timer */}
          <span>
            {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
          </span>

          {/* Dark/Light Mode Toggle */}
          <button onClick={toggleDarkMode} className="p-1">
            {darkMode ? <BsSun size={20} /> : <BsMoon size={20} />}
          </button>

          {/* Language Toggle */}
          <button onClick={toggleLanguage} className="p-1">
            <FaLanguage size={20} />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="flex items-center gap-2 mb-8">
        {quizData.map((_, index) => (
          <div
            key={index}
            className={`h-2 flex-1 rounded ${
              index === currentQuestion
                ? 'bg-green-500'
                : index < currentQuestion
                ? 'bg-gray-400'
                : 'bg-gray-600'
            }`}
          />
        ))}
      </div>

      {!isQuizComplete ? (
        <>
          {/* Question */}
          <div className="mb-8">
            <h2 className="text-blue-400 mb-4">
              Question {currentQuestion + 1} of {quizData.length}
            </h2>
            <p className="text-xl mb-6">{quizData[currentQuestion].text[language]}</p>
          </div>

          {/* Options */}
          <div className="space-y-4 mb-8">
            {quizData[currentQuestion].options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleOptionSelect(option.id)}
                className={`w-full p-4 text-left rounded-lg transition-colors ${
                  selectedAnswers[currentQuestion] === option.id
                    ? 'bg-blue-500 text-white'
                    : darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-300 hover:bg-gray-200'
                }`}
              >
                {option.id}. {option.text[language]}
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between gap-4">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="flex-1 p-4 bg-gray-700 rounded-lg disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={handleNext}
              disabled={currentQuestion === quizData.length - 1}
              className="flex-1 p-4 bg-gray-700 rounded-lg disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        // Results
        <QuizResult
          score={score}
          totalQuestions={quizData.length}
          correctAnswers={Object.values(selectedAnswers).filter(
            (answer) => quizData[parseInt(Object.keys(selectedAnswers)[0])].correctAnswer === answer
          ).length}
          incorrectAnswers={Object.keys(selectedAnswers).length - Object.values(selectedAnswers).filter(
            (answer) => quizData[parseInt(Object.keys(selectedAnswers)[0])].correctAnswer === answer
          ).length}
          unattemptedQuestions={quizData.length - Object.keys(selectedAnswers).length}
        />
      )}
    </div>
  );
};

export default QuizApp;
