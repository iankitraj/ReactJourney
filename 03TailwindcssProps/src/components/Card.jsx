import React from "react";

function Card({ username, btnText = "view me" }) {
  console.log(username, btnText);

  return (
    <div className="max-w-xs rounded-md shadow-md bg-black text-gray-100 hover:scale-105 transition-transform duration-300">
      {/* Profile Image */}
      <div className="flex justify-center mt-4">
        <img
          src="https://images.pexels.com/photos/22632033/pexels-photo-22632033.jpeg"
          alt="Profile"
          className="h-24 w-24 rounded-full border-2 border-gray-700 object-cover"
        />
      </div>

      {/* Profile Info */}
      <div className="flex flex-col justify-between p-6 space-y-4 text-center">
        <h2 className="text-2xl font-semibold tracking-wide">{username}</h2>
        <p className="text-gray-400 text-sm">
          Software Engineer | Web Developer
        </p>
        <p className="text-gray-400 text-sm">Location: San Francisco, CA</p>

        {/* Skills */}
        <div className="flex justify-center flex-wrap gap-2">
          <span className="bg-gray-800 text-gray-200 text-xs font-medium px-2.5 py-0.5 rounded-full">
            React
          </span>
          <span className="bg-gray-800 text-gray-200 text-xs font-medium px-2.5 py-0.5 rounded-full">
            Node.js
          </span>
          <span className="bg-gray-800 text-gray-200 text-xs font-medium px-2.5 py-0.5 rounded-full">
            TailwindCSS
          </span>
        </div>

        {/* Action Button */}
        <button
          type="button"
          className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md bg-gray-800 text-gray-200 hover:bg-gray-700 transition-colors duration-200"
        >
          {btnText}→
        </button>
      </div>
    </div>
  );
}

export default Card;
