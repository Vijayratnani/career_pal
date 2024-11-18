import React, { useState } from "react";
import Gear from "../assets/gear2.png";
import Logo from "../assets/careerPalLogo.png";

const Chat = () => {
  const [navigation, setNavigation] = useState([[]]); // Array of question arrays
  const [currentIndex, setCurrentIndex] = useState(0); // Active session index
  const [inputValue, setInputValue] = useState(""); // Input value
  const [view, setView] = useState("home"); // 'home' or 'questions'
  const [showPopup, setShowPopup] = useState(false);

  const questionOptions = [
    "What career path should I choose?",
    "How can I improve my skills?",
    "What is the best job for me?",
    "How do I get started in my field?",
    "What are the highest-paying jobs?",
    "Which industries are booming?",
    "How can I build a great resume?",
    "What are the best certifications to get?",
    "How can I ace my job interviews?",
    "What are the best remote jobs?"
  ];

  const getRandomQuestion = () => {
    return questionOptions[Math.floor(Math.random() * questionOptions.length)];
  };

  const buttonQuestions = [getRandomQuestion(), getRandomQuestion(), getRandomQuestion()];

  // Function to add a question to the current session
  const addQuestion = (question) => {
    if (navigation[currentIndex].length >= 10) {
      setShowPopup(true); // Show popup
      return;
    }

    setNavigation((prevNavigation) => {
      const updatedNavigation = [...prevNavigation];
      updatedNavigation[currentIndex].push(question);
      if (updatedNavigation[currentIndex].length > 10) {
        updatedNavigation[currentIndex] = updatedNavigation[currentIndex].slice(1);
      }
      return updatedNavigation;
    });
  };

  // Handle input submission
  const handleInputSubmit = () => {
    if (navigation[currentIndex].length >= 10) {
      setShowPopup(true); // Show popup
      return;
    }

    if (inputValue.trim() !== "") {
      addQuestion(inputValue.trim());
      setInputValue("");
    }
  };

  // Close popup
  const closePopup = () => {
    setShowPopup(false);
  };

  // Handle "New Chat" button
  const handleNewChat = () => {
    setNavigation((prevNavigation) => [...prevNavigation, []]);
    setCurrentIndex(navigation.length); // Set to the new session
    setView("home");
  };

  // Handle navigation click
  const handleNavigationClick = (index) => {
    setCurrentIndex(index);
    setView("questions");
  };

  return (
    <div className="block md:flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="bg-[#1b306f] text-white w-1/6 flex flex-col items-center p-4 ">
        <img src={Logo} alt="Logo" className="h-14 w-14 mx-auto rounded-full" />
        <div className="text-2xl font-bold mb-4">
          Career<span className="text-orange-600">PAL</span>
        </div>
        <button
          className="bg-orange-600 text-white px-4 py-2 rounded-full mb-4 w-4/5"
          onClick={handleNewChat}
        >
          + New Chat
        </button>
        <div className="overflow-y-auto w-full">
        {navigation.map((session, index) => (
          <button
            key={index}
            className="text-orange-500 hover:text-orange-600 hover:underline w-11/12 overflow-hidden text-ellipsis whitespace-nowrap"
            onClick={() => handleNavigationClick(index)}
          >
            {session[0] || `Chat ${index + 1}`}
          </button>
        ))}
        </div>
        <button className="bg-orange-600 text-black px-4 py-2 rounded-full mt-auto mb-2 w-4/5">
          About
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 bg-white flex flex-col">
        <div className="bg-[#1b306f]">
          <img src={Gear} className="w-10 h-10 ml-auto rounded-full" />
        </div>

        {view === "home" && (
          <div className=" bg-white p-8 flex flex-col items-center justify-center">
            <img src={Logo} alt="Logo" className="h-40 w-40 mx-auto opacity-15" />
            <div>
              <h1 className="text-5xl font-semibold text-[#1b306f] opacity-15">
                Career<span className="text-orange-600">PAL</span>
              </h1>
            </div>

            {/* Interaction Options */}
            <div className="mt-[9%] bottom-4 mx-auto right-1/4 bg-white p-4 rounded justify-between">
            <div className="w-11/12 flex">
            {buttonQuestions.map((question, index) => (
              <button
                key={index}
                className="border-2 border-orange-500 hover:border-orange-600 px-4 py-2 rounded-md m-2"
                onClick={() => addQuestion(question)}
              >
                {question}
              </button>
            ))}
            </div>
            <div className="flex items-center mt-6">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Send a message..."
                className="rounded-l-md px-4 py-2 w-full text-gray-900 bg-transparent border-2 
                border-orange-500 appearance-none dark:text-white dark:border-orange-600 
                dark:focus:border-orange-600 focus:outline-none focus:ring-0 focus:border-orange-600"
              />
              <button
                className="bg-green-900 text-orange-500 hover:text-orange-600 px-4 py-2 rounded-r-md"
                onClick={handleInputSubmit}
              >
                &rarr;
              </button>
            </div>
              </div>
            </div>
          
        )}

        {view === "questions" && (
          <div className="m-4 p-4 bg-gray-50 rounded shadow-md overflow-y-auto">
            <h2 className="text-2xl font-bold text-[#1b306f] mb-4">Questions List</h2>
            {navigation[currentIndex].length > 0 ? (
              <ul>
                {navigation[currentIndex].map((question, index) => (
                  <li
                    key={index}
                    className="mb-2 p-2 bg-white border rounded shadow-sm"
                    id={`question-${index}`}
                  >
                    Q{index +1}. {question}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No questions added yet!</p>
            )}
          </div>
        )}
      </main>
      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 text-center">
            <h2 className="text-xl font-semibold mb-4">Error</h2>
            <p>The question list is full. No more questions can be added.</p>
            <button
              className="mt-4 bg-orange-500 text-white px-4 py-2 rounded"
              onClick={closePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chat;
