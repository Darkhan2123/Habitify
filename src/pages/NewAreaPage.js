// src/pages/NewAreaPage.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAreas } from '../actions/areaActions';
import { useNavigate } from 'react-router-dom';

function NewAreaPage() {
  const dispatch = useDispatch();
  const areas = useSelector((state) => {
    console.log('Redux state:', state);
    return state.area.areas;
  });

  const [selectedArea, setSelectedArea] = useState(null);
  const [areaProgress, setAreaProgress] = useState({});
  const [currentWeek, setCurrentWeek] = useState(1);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [showWeekCompletionModal, setShowWeekCompletionModal] = useState(false);
  const [timer, setTimer] = useState(10);

  const navigate = useNavigate();

  // Fetch areas on component mount
  useEffect(() => {
    dispatch(fetchAreas());
  }, [dispatch]);

  // Timer for automatic progression to next week
  useEffect(() => {
    let countdown;
    if (showWeekCompletionModal && timer > 0) {
      countdown = setTimeout(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      handleProceedToNextWeek();
    }
    return () => clearTimeout(countdown);
  }, [showWeekCompletionModal, timer]);

  const handleAreaClick = (area) => {
    setSelectedArea(area);
    if (!areaProgress[area.id]) {
      setAreaProgress((prev) => ({ ...prev, [area.id]: 'not-started' }));
    }
  };


  const handleStartArea = () => {
    if (selectedArea) {
      setAreaProgress((prev) => ({ ...prev, [selectedArea.id]: 'in-progress' }));
      setCurrentWeek(1);
      setCompletedTasks([]);
    }
  };

  const handleCompleteTask = (task) => {
    setCompletedTasks((prev) => [...prev, task]);

    if (selectedArea) {
      const currentWeekTasks =
        selectedArea.weeks.find((w) => w.number === currentWeek)?.tasks || [];
      if (completedTasks.length + 1 === currentWeekTasks.length) {
        if (currentWeek === selectedArea.weeks.length) {
          setAreaProgress((prev) => ({ ...prev, [selectedArea.id]: 'completed' }));
          setShowCongratulations(true);
        } else {
          setShowWeekCompletionModal(true);
          setTimer(10); // Reset timer for next week
        }
      }
    }
  };

  const handleProceedToNextWeek = () => {
    setShowWeekCompletionModal(false);
    setCurrentWeek((prev) => prev + 1);
    setCompletedTasks([]);
    setTimer(10);
  };

  const handleGoBack = () => {
    setShowWeekCompletionModal(false);
    navigate('/'); // Redirect to home
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">New Area</h1>

      {!selectedArea && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {areas.map((area) => (
            <div
              key={area.id}
              className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleAreaClick(area)}
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{area.name}</h2>
              <p className="text-gray-600 mb-4">{area.description}</p>
              <div className="text-sm font-medium text-gray-500">
                {areaProgress[area.id] === 'completed' && (
                  <span className="text-green-500">Completed</span>
                )}
                {areaProgress[area.id] === 'in-progress' && (
                  <span className="text-blue-500">In Progress</span>
                )}
                {(!areaProgress[area.id] || areaProgress[area.id] === 'not-started') && (
                  <span className="text-gray-500">Not Started</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedArea && (
        <div>
          <button
            onClick={() => setSelectedArea(null)}
            className="mb-4 text-blue-600 hover:text-blue-800"
          >
            ← Back to Areas
          </button>

          <h2 className="text-2xl font-bold text-gray-900 mb-4">{selectedArea.name}</h2>

          {/* Display gain description */}
          <p className="text-gray-700 mb-6">{selectedArea.gainDescription}</p>

          {areaProgress[selectedArea.id] === 'not-started' && (
            <button
              onClick={handleStartArea}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Start This Area
            </button>
          )}

          {areaProgress[selectedArea.id] === 'in-progress' && (
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Week {currentWeek}</h3>
              <ul className="space-y-4">
                {selectedArea.weeks
                  .find((w) => w.number === currentWeek)
                  ?.tasks.map((task) => (
                    <li key={task} className="flex items-center">
                      <input
                        type="checkbox"
                        id={task}
                        checked={completedTasks.includes(task)}
                        onChange={() => handleCompleteTask(task)}
                        className="mr-3 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor={task} className="text-lg text-gray-700">
                        {task}
                      </label>
                    </li>
                  ))}
              </ul>
            </div>
          )}

          {areaProgress[selectedArea.id] === 'completed' && (
            <div className="text-center mt-8">
              <p className="text-2xl text-green-600 font-semibold mb-6">
                Congratulations! You've completed the {selectedArea.name} area!
              </p>
              <div className="bg-green-100 text-green-800 text-xl font-medium px-4 py-2 rounded-full inline-block">
                {selectedArea.name} Master
              </div>
            </div>
          )}
        </div>
      )}

      {/* Week Completion Modal */}
      {showWeekCompletionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Great Job on Completing Week {currentWeek}!
            </h2>
            <p className="text-xl text-gray-700 mb-6">
              Do you want to proceed to Week {currentWeek + 1}?
            </p>
            <p className="text-gray-600 mb-6">
              Automatically proceeding in {timer} seconds...
            </p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleProceedToNextWeek}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Proceed to Week {currentWeek + 1}
              </button>
              <button
                onClick={handleGoBack}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-400 transition-colors"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Final Congratulations Modal */}
      {showCongratulations && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Congratulations!</h2>
            <p className="text-2xl text-gray-700 mb-6">
              You've successfully formed a new habit: {selectedArea?.name}
            </p>
            <div className="text-6xl mb-6">🎉</div>
            <button
              onClick={() => {
                setShowCongratulations(false);
                navigate('/'); // Redirect to home
              }}
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
            >
              Continue Your Journey
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default NewAreaPage;
