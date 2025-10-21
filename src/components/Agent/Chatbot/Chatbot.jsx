import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Bot,
  User,
  Heart,
  Stethoscope,
  Activity,
  MessageCircle,
  Sparkles,
  Clock,
  Mic, // Keep Mic icon
  Paperclip, // New icon for file upload
  TrendingUp,
  Shield,
  Zap,
  Users,
  Award,
} from "lucide-react";

function Chatbot() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm Arogyam. I'm here to help you with health-related questions and provide general medical information. How can I assist you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputText.trim() === "" && !selectedFile) return;

    const userMessage = {
      id: Date.now(),
      text: selectedFile
        ? `📎 Uploaded file: ${selectedFile.name}`
        : inputText,
      isUser: true,
      timestamp: new Date(),
      isFile: !!selectedFile,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setSelectedFile(null);
    setIsTyping(true);

    setTimeout(() => {
      const responses = [
        "Thanks for sharing! I'll review your message/file and provide general tips.",
        "Your file was received successfully. Please ensure you protect personal details online.",
      ];

      const aiResponse = {
        id: Date.now() + 1,
        text: responses[Math.floor(Math.random() * responses.length)],
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const quickActions = [
    { icon: Activity, text: "Symptoms Check", color: "from-blue-600 to-teal-600" },
    { icon: Heart, text: "Heart Health", color: "from-red-500 to-pink-600" },
    { icon: Shield, text: "Prevention Tips", color: "from-teal-600 to-blue-600" },
    { icon: Zap, text: "Emergency Info", color: "from-orange-500 to-red-600" },
  ];

  return (
    <div className="min-h-[80vh] bg-gradient-to-br mt-8 from-blue-50 via-white to-purple-50 flex flex-col">
      {/* Header */}
  

      <div className="flex-1 flex">
        {/* Sidebar */}
      

        {/* Chat */}
        <main className="flex-1 flex flex-col">
          <div className="flex-1 overflow-y-auto px-4 py-4">
            <div className="max-w-4xl mx-auto space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start space-x-3 ${
                    message.isUser ? "flex-row-reverse space-x-reverse" : ""
                  }`}
                >
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
                      message.isUser
                        ? "bg-gradient-to-r from-purple-600 to-blue-600"
                        : "bg-gradient-to-r from-blue-600 to-teal-600"
                    }`}
                  >
                    {message.isUser ? (
                      <User className="w-5 h-5 text-white" />
                    ) : (
                      <Bot className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div
                    className={`flex-1 max-w-2xl ${
                      message.isUser ? "text-right" : "text-left"
                    }`}
                  >
                    <div
                      className={`inline-block px-5 py-3 rounded-2xl shadow-md transition-all duration-300 hover:shadow-lg ${
                        message.isUser
                          ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-br-md"
                          : "bg-white border border-gray-100 text-gray-800 rounded-bl-md"
                      }`}
                    >
                      {message.isFile ? (
                        <p className="text-sm leading-relaxed font-medium">
                          📎 {message.text}
                        </p>
                      ) : (
                        <p className="text-sm leading-relaxed">{message.text}</p>
                      )}
                    </div>
                    <div
                      className={`flex items-center mt-1 space-x-2 text-xs text-gray-500 ${
                        message.isUser ? "justify-end" : "justify-start"
                      }`}
                    >
                      <Clock className="w-3 h-3" />
                      <span>{formatTime(message.timestamp)}</span>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-md px-5 py-3 shadow-md">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                      <div
                        className="w-2 h-2 bg-teal-600 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-purple-600 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <footer className="bg-white/90 backdrop-blur-md border-t border-gray-200/50 px-4 py-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-2xl border border-gray-200 focus-within:border-blue-300 focus-within:ring-4 focus-within:ring-blue-50 transition-all duration-200">
                <MessageCircle className="w-5 h-5 text-gray-400" />

                <input
                  ref={inputRef}
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me about your health concerns..."
                  className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder-gray-400 py-2 text-sm"
                  disabled={isTyping}
                />

                {/* File Upload */}
                <label className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-105 transition-all cursor-pointer">
                  <Paperclip className="w-4 h-4 text-white" />
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>

                {/* Disabled Mic Button */}
                <button
                  disabled
                  className="w-10 h-10 bg-gradient-to-r from-teal-600 to-blue-600 rounded-xl flex items-center justify-center opacity-50 cursor-not-allowed"
                >
                  <Mic className="w-4 h-4 text-white" />
                </button>

                {/* Send */}
                <button
                  onClick={handleSendMessage}
                  disabled={(inputText.trim() === "" && !selectedFile) || isTyping}
                  className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-xl flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>

              {selectedFile && (
                <p className="mt-2 text-sm text-gray-600 text-center">
                  📎 Selected: {selectedFile.name}
                </p>
              )}

              <div className="mt-3 text-center">
                <p className="text-xs text-gray-500 flex items-center justify-center space-x-1">
                  <Heart className="w-3 h-3 text-red-500" />
                  <span>
                    This AI assistant provides general health information only.
                    Always consult healthcare professionals for medical advice.
                  </span>
                </p>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default Chatbot;
