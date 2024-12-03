import React, { useState } from 'react';

export default function SettingsPage() {
  // State for showing the success message
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Local state for toggles to make them move
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [pushNotifications, setPushNotifications] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Show the success message
    setShowSuccessMessage(true);
    // Hide the message after 3 seconds (optional)
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Settings</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Dark Mode Toggle */}
        <div className="flex items-center justify-between">
          <label htmlFor="darkMode" className="text-2xl text-gray-700">
            Dark Mode
          </label>
          <button
            type="button"
            className={`relative inline-flex items-center h-8 rounded-full w-14 transition-colors focus:outline-none ${
              darkMode ? 'bg-blue-600' : 'bg-gray-200'
            }`}
            onClick={() => setDarkMode(!darkMode)}
          >
            <span className="sr-only">Toggle Dark Mode</span>
            <span
              className={`inline-block w-6 h-6 bg-white rounded-full transform transition-transform ${
                darkMode ? 'translate-x-6' : 'translate-x-0'
              }`}
            ></span>
          </button>
        </div>

        {/* Email Notifications Toggle */}
        <div className="flex items-center justify-between">
          <label htmlFor="emailNotifications" className="text-2xl text-gray-700">
            Email Notifications
          </label>
          <button
            type="button"
            className={`relative inline-flex items-center h-8 rounded-full w-14 transition-colors focus:outline-none ${
              emailNotifications ? 'bg-blue-600' : 'bg-gray-200'
            }`}
            onClick={() => setEmailNotifications(!emailNotifications)}
          >
            <span className="sr-only">Toggle Email Notifications</span>
            <span
              className={`inline-block w-6 h-6 bg-white rounded-full transform transition-transform ${
                emailNotifications ? 'translate-x-6' : 'translate-x-0'
              }`}
            ></span>
          </button>
        </div>

        {/* Push Notifications Toggle */}
        <div className="flex items-center justify-between">
          <label htmlFor="pushNotifications" className="text-2xl text-gray-700">
            Push Notifications
          </label>
          <button
            type="button"
            className={`relative inline-flex items-center h-8 rounded-full w-14 transition-colors focus:outline-none ${
              pushNotifications ? 'bg-blue-600' : 'bg-gray-200'
            }`}
            onClick={() => setPushNotifications(!pushNotifications)}
          >
            <span className="sr-only">Toggle Push Notifications</span>
            <span
              className={`inline-block w-6 h-6 bg-white rounded-full transform transition-transform ${
                pushNotifications ? 'translate-x-6' : 'translate-x-0'
              }`}
            ></span>
          </button>
        </div>

        {/* Reminder Time Input */}
        <div>
          <label htmlFor="reminderTime" className="block text-2xl text-gray-700 mb-2">
            Daily Reminder Time
          </label>
          <input
            type="time"
            id="reminderTime"
            className="mt-1 block w-full rounded-md border-gray-300 text-xl shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 bg-white p-3"
          />
        </div>

        {/* Language Selection */}
        <div>
          <label htmlFor="language" className="block text-2xl text-gray-700 mb-2">
            Language
          </label>
          <select
            id="language"
            className="mt-1 block w-full rounded-md border-gray-300 text-xl shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 bg-white p-3"
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
          </select>
        </div>

        {/* Save Settings Button */}
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save Settings
          </button>
        </div>
      </form>

      {/* Success Message */}
      {showSuccessMessage && (
        <div className="mt-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          Changes Saved
        </div>
      )}
    </div>
  );
}
