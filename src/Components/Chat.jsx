import React, { useState } from "react";
import Gear from "../assets/gear2.png";
import Logo from "../assets/careerPalLogo.png";

const Chat = () => {
  const questions = [
    "What is your interest?",
    "Which type of career do you want to take?",
    "What skills do you have?",
    "What are your long-term goals?",
    "Which industry excites you the most?",
  ];

  const [chatHistory, setChatHistory] = useState([
    { type: "question", text: questions[0] }, // Initialize with the first question
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [careerAdvice, setCareerAdvice] = useState("");
  const [loading, setLoading] = useState(false); // For showing a loading state


  const [navigation, setNavigation] = useState([
    { questions: [], answers: [], finalResponse: "" }
  ]);
  
  const [currentIndex, setCurrentIndex] = useState(0); // Active session index
  // const [inputValue, setInputValue] = useState(""); // Input value
  const [view, setView] = useState("home"); // 'home' or 'questions'
  const [showPopup, setShowPopup] = useState(false);


  const handleAnswerSubmit = async () => {
    if (inputValue.trim() === "") return;
  
    const updatedChatHistory = [
      ...chatHistory,
      { type: "answer", text: inputValue },
    ];
  
    const nextQuestionIndex = currentQuestionIndex + 1;
  
    if (nextQuestionIndex < questions.length) {
      // Add next question to the chat history
      updatedChatHistory.push({
        type: "question",
        text: questions[nextQuestionIndex],
      });
    } else {
      // Generate career advice once all questions are answered
      const prompt = questions
        .map((question, index) => `Give Career Advice, ${question}: ${chatHistory[index * 2 + 1]?.text || inputValue}`)
        .join(", ");
  
      setLoading(true);
      try {
        const response = await fetch("http://localhost:5000/api/generate-advice", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ prompt }),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data = await response.json();
        const advice = data.advice || "Unable to fetch career advice at the moment.";
        updatedChatHistory.push({ type: "response", text: advice });
  
        // Save final response to the navigation
        setNavigation((prevNavigation) => {
          const updatedNavigation = [...prevNavigation];
          updatedNavigation[currentIndex].finalResponse = advice;
          return updatedNavigation;
        });
  
        setCareerAdvice(advice);
      } catch (error) {
        updatedChatHistory.push({
          type: "answer",
          text: "An error occurred while fetching career advice. Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    }
  
    setChatHistory(updatedChatHistory);
    setCurrentQuestionIndex(nextQuestionIndex);
  
    // Add the question and answer to navigation
    setNavigation((prevNavigation) => {
      const updatedNavigation = [...prevNavigation];
      updatedNavigation[currentIndex].questions.push(questions[currentQuestionIndex]);
      updatedNavigation[currentIndex].answers.push(inputValue);
      return updatedNavigation;
    });
  
    setInputValue("");
  };
  

  const handleNewChat = () => {
    setChatHistory([{ type: "question", text: questions[0] }]);
    setCurrentQuestionIndex(0);
    setCareerAdvice("");
    setInputValue("");
    setLoading(false);
  
    // Add a new session with empty questions, answers, and response
    setNavigation((prevNavigation) => [
      ...prevNavigation,
      { questions: [], answers: [], finalResponse: "" },
    ]);
    setCurrentIndex(navigation.length);
    setView("home");
  };
  
  

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

  // Handle navigation click
  const handleNavigationClick = (index) => {
    setCurrentIndex(index);
    setView("questions");
  };

  // Close popup
  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="block md:flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="bg-[#1b306f] text-white w-1/6 flex flex-col items-center p-4">
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

      {/* Main Chat Area */}
      <main className="flex-1 bg-white flex flex-col">
        <div className="bg-[#1b306f] p-4">
          <img src={Gear} className="w-10 h-10 ml-auto rounded-full" alt="Settings" />
        </div>

        {/* Chat Area */}
        {view === "home" && (<div className="flex-1 p-4 overflow-y-auto">
          {chatHistory.map((item, index) => (
            <div
              key={index}
              className={`mb-4 flex ${
                item.type === "question"
                  ? "justify-start"
                  : item.type === "response"
                  ? "justify-center"
                  : "justify-end"
              }`}
            >
              <div
                className={`p-3 rounded-lg max-w-4xl ${
                  item.type === "question"
                    ? "bg-gray-200 text-black"
                    : item.type === "response"
                    ? "bg-green-600 text-white"
                    : "bg-orange-600 text-white"
                }`}
              >
                {item.text}
              </div>
            </div>
          ))}
          {loading && (
            <div className="text-center text-gray-500 mt-4">Fetching career advice...</div>
          )}
        </div>)}

        {/* Input Area */}
        <div className="p-4 bg-gray-200 flex items-center">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your answer..."
            className="flex-1 px-4 py-2 border-2 rounded-l-lg focus:outline-none"
            disabled={careerAdvice !== "" || loading} // Disable input when loading or advice displayed
          />
          <button
            className="bg-green-600 text-white px-4 py-2 rounded-r-lg"
            onClick={handleAnswerSubmit}
            disabled={careerAdvice !== "" || loading} // Disable button when loading or advice displayed
          >
            Send
          </button>
        </div>
        {view === "questions" && (
  <div className="m-4 p-4 bg-gray-50 rounded shadow-md overflow-y-auto">
    <h2 className="text-2xl font-bold text-[#1b306f] mb-4">Questions & Answers</h2>
    {navigation[currentIndex].questions.length > 0 ? (
      <ul>
        {navigation[currentIndex].questions.map((question, index) => (
          <li key={index} className="mb-2">
            <p className="font-bold">Q{index + 1}: {question}</p>
            <p className="ml-4">A{index + 1}: {navigation[currentIndex].answers[index]}</p>
          </li>
        ))}
      </ul>
    ) : (
      <p>No questions added yet!</p>
    )}
    {navigation[currentIndex].finalResponse && (
      <div className="mt-4 p-4 bg-green-100 border border-green-400 rounded">
        <h3 className="font-bold text-green-700">Career Advice:</h3>
        <p>{navigation[currentIndex].finalResponse}</p>
      </div>
    )}
  </div>
)}

      </main>
    </div>
  );
};

export default Chat;
