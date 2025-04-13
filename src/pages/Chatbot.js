import React, { useState, useEffect } from "react";
import "../styles/chatbot.css";

const questionBank = {
  "Admin Management": [
    { question: "How can I add a new employee?", answer: "Go to Employee Management > Add New, fill the form and submit." },
    { question: "How can I update employee information?", answer: "Go to Employee List, select the employee, and click Edit." },
    { question: "How do I delete an employee record?", answer: "In Employee Management, select the employee and click the Delete button." },
    { question: "How do I apply for leave?", answer: "Navigate to Leave Management and click on 'Apply for Leave'." },
    { question: "How can I approve or reject leave requests?", answer: "Go to Leave Management > Requests. Approve or Reject with action buttons." },
    { question: "Where can I view leave history?", answer: "Leave history is available under Leave Reports or My Leave History." },
    { question: "How is payroll generated?", answer: "Payroll is calculated based on salary, deductions, and attendance each month." },
    { question: "Can I generate payslips?", answer: "Yes, go to Payroll > Generate Payslips and select the employee and month." },
    { question: "Where can I view payroll reports?", answer: "Check Payroll > Reports for monthly or annual payroll summaries." },
    { question: "How to manage departments?", answer: "You can add, update or remove departments under Department Management section." },
  ],
  "Civil Work Management": [
    { question: "How do I track road construction progress?", answer: "Go to Road Construction section to view real-time progress updates." },
    { question: "How to add a new road construction project?", answer: "Click on 'Add Project' under Road Construction and fill out the details." },
    { question: "How can I update road project status?", answer: "Open the specific road project and click 'Update Progress'." },
    { question: "How do I report water supply issues?", answer: "Click on Water Supply > Report Issue and submit your complaint." },
    { question: "Can I monitor water supply usage?", answer: "Yes, you can view reports and real-time data in Water Supply > Usage Reports." },
    { question: "How to update drainage system maintenance status?", answer: "Go to Drainage section, select the task, and mark status accordingly." },
    { question: "Where can I manage bridge construction tasks?", answer: "Use Bridge Construction section to add, update, or track bridge projects." },
    { question: "How are deadlines set for civil work projects?", answer: "Each project includes milestones. Set them when adding or editing a task." },
    { question: "How to add new land development activity?", answer: "Go to Land Development > Add Activity and enter required info." },
    { question: "Where to view all ongoing projects?", answer: "Check the Civil Dashboard or the section-wise list under each category." },
  ],
  "Security Management": [
    { question: "How do I register a visitor?", answer: "Go to Visitor Entry and fill in the visitor's name, purpose, and time." },
    { question: "Can I update visitor exit time?", answer: "Yes, go to Entry Log, find the visitor, and update the exit time." },
    { question: "How do I delete a visitor log?", answer: "Visit the Entry Logs section and click the delete button next to the entry." },
    { question: "How can I view daily entry logs?", answer: "Check the Entry/Exit Log section filtered by today’s date or any date range." },
    { question: "How to generate a daily security report?", answer: "Go to Reports > Daily Summary and select a date to generate a PDF report." },
    { question: "Where can I see all past visitor logs?", answer: "Navigate to Security Logs > Archives to search past entries." },
    { question: "How do I handle suspicious activity?", answer: "Use the 'Report Incident' feature under Security and notify admin immediately." },
    { question: "How can I track who’s inside the premises?", answer: "Use the Live Entry tab to see visitors who haven’t checked out yet." },
    { question: "Can I view entry logs by department?", answer: "Yes, you can filter entry logs by department or category in Entry Logs." },
    { question: "How can I print a security log?", answer: "Go to Security Reports, choose a date range and click on 'Print Report'." },
  ]
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [isListening, setIsListening] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setActiveQuestion(null);
  };

  const speak = (text) => {
    const synth = window.speechSynthesis;
    // Cancel any ongoing speech to avoid overlap with chat title
    if (synth.speaking) {
      synth.cancel();
    }
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-US";
    synth.speak(utter);
  };

  const handleQuestionClick = (section, index) => {
    const id = `${section}-${index}`;
    const selectedAnswer = questionBank[section][index].answer;
    const newActive = activeQuestion === id ? null : id;
    setActiveQuestion(newActive);

    if (newActive !== null) {
      speak(selectedAnswer);
    }
  };

  const handleVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech Recognition not supported on your browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    setIsListening(true);

    recognition.onresult = (event) => {
      const voiceInput = event.results[0][0].transcript.toLowerCase();
      setIsListening(false);

      let found = false;
      for (const [section, qList] of Object.entries(questionBank)) {
        for (let i = 0; i < qList.length; i++) {
          if (qList[i].question.toLowerCase().includes(voiceInput)) {
            setActiveQuestion(`${section}-${i}`);
            speak(qList[i].answer);
            found = true;
            return;
          }
        }
      }

      if (!found) {
        speak("Sorry, I couldn't find a match for your question.");
      }
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <div className="chatbot-container">
      <button className="chat-toggle" onClick={toggleChat}>
        💬 Chat
      </button>
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            Smart Assistant 🤖
            <button className="mic-button" onClick={handleVoiceInput}>
              🎤 {isListening ? "Listening..." : "Ask"}
            </button>
          </div>
          <div className="chat-body">
            {Object.entries(questionBank).map(([section, qList]) => (
              <div key={section}>
                <h4 className="chat-section">{section}</h4>
                <ul className="question-list">
                  {qList.map((item, index) => {
                    const id = `${section}-${index}`;
                    return (
                      <li key={index} className="question-item">
                        <button onClick={() => handleQuestionClick(section, index)}>
                          {item.question}
                        </button>
                        {activeQuestion === id && (
                          <div className="answer">{item.answer}</div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
