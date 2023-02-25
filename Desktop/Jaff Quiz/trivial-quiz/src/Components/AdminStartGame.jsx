import React from 'react'
import { gameContext } from './Game';
import { useContext } from 'react';
const AdminStartGame = () => {
  const { adminQuestionTitle, startQuizBtn, completedMessage } = useContext(gameContext);
  return (
    <div className="w-10p h-9p fixed bottom-0 flex justify-center items-center">
      <div className="flex">
        {adminQuestionTitle.length > 0 && (
          <div>
            {completedMessage !== "" && <p className='text-center font-serif text-green-like-100'>{completedMessage}</p>}
            {adminQuestionTitle.map((content, id) => (
              <div className="border border-dashback-200">
                <button
                  className="bg-green-like-100 py-2 px-5 text-white"
                  onClick={() => startQuizBtn(content.quizName, id)}
                >
                  {content.quizName}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminStartGame