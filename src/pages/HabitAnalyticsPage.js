import React, { useEffect, useState, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

function HabitAnalyticsPage() {
  const [progressData, setProgressData] = useState(null);
  const habits = useSelector((state) => state.habits.habits);

  useEffect(() => {
    // Fetch habit progress data
    const fetchProgressData = async () => {
      // Mocked progress data
      const data = {
        labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
        datasets: [
          {
            label: 'Progression (%)',
            data: [20, 35, 50, 70, 80, 95, 100],
            fill: true,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2,
            tension: 0.4, // Smooth curve
          },
        ],
      };
      setProgressData(data);
    };

    fetchProgressData();
  }, []);

  const currentProgress = useMemo(() => {
    // Calculate overall progress
    const totalHabits = habits.length;
    const completedHabits = habits.filter((habit) => habit.completed).length;
    return totalHabits ? Math.round((completedHabits / totalHabits) * 100) : 0;
  }, [habits]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Habit Analytics</h1>
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {progressData ? (
          <div className="p-6" style={{ height: '400px' }}>
            <h2 className="text-xl font-semibold mb-4">Your Progress Over the Week</h2>
            <Line data={progressData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        ) : (
          <p>Loading progress data...</p>
        )}
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-2">Overall Progress</h2>
          <div className="relative w-full bg-gray-200 h-6 rounded-full">
            <div
              className="absolute h-full bg-blue-600 rounded-full"
              style={{ width: `${currentProgress}%` }}
            ></div>
            <span className="absolute inset-0 flex justify-center items-center text-sm font-medium text-white">
              {currentProgress}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HabitAnalyticsPage;
