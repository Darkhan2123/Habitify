import React from 'react';
import { Link } from 'react-router-dom';
export default function Home() {
    return (
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Transform Your Life, One Habit at a Time
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Welcome to your personal habit tracking journey. Build, maintain, and analyze your habits for a better you.
          </p>
        </header>

        <section className="grid md:grid-cols-2 gap-12 mb-16">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Track Your Progress</h2>
            <p className="text-gray-600 mb-6">
              Easily monitor your daily habits and see your consistency grow over time. Our intuitive interface makes habit tracking a breeze.
            </p>
            <Link href="/habits" className="text-blue-600 hover:text-blue-800 font-medium">
              View Your Habits →
            </Link>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Gain Valuable Insights</h2>
            <p className="text-gray-600 mb-6">
              Dive deep into your habit data with our analytics tools. Understand your patterns and optimize your routines for success.
            </p>
            <Link href="/analytics" className="text-blue-600 hover:text-blue-800 font-medium">
              Explore Analytics →
            </Link>
          </div>
        </section>

        <section className="bg-gray-50 p-8 rounded-lg shadow-md mb-16">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Why Habit Tracking Matters</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Consistency is Key",
                description: "Small, consistent actions lead to significant changes over time. Track your habits to ensure you're staying on course."
              },
              {
                title: "Self-Awareness",
                description: "Understand your behavior patterns and identify areas for improvement in your daily routines."
              },
              {
                title: "Motivation Boost",
                description: "Visualize your progress and celebrate your streaks to stay motivated on your personal growth journey."
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Begin building better habits today. Our easy-to-use platform will guide you every step of the way.
          </p>
          <Link
            href="/habits"
            className="px-8 py-4 bg-blue-600 text-white rounded-md text-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Get Started Now
          </Link>
        </section>
      </div>
    )
  }
