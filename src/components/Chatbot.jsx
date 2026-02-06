import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { sendMessage } from "../lib/gemini";

// Fallback responses for when API is unavailable - matched by keywords
const FALLBACK_RESPONSES = [
  { keywords: ["skill", "tech", "stack", "know", "language", "framework", "tool"], response: "Cedrick specializes in React, Laravel, Tailwind CSS, JavaScript, PHP, and MySQL. He also has experience with cloud platforms like GCP and Azure, plus UI/UX design with Figma." },
  { keywords: ["project", "work", "build", "made", "create"], response: "His main projects include Budget Byahe (a transport fare routing app that reached Top 15 at Philippine Startup Challenge 10) and SafeZone PH (a community issue reporting system). Check out more on his GitHub!" },
  { keywords: ["contact", "reach", "hire", "email", "message", "collaborate"], response: "You can reach Cedrick through the contact form on this website (click the mail icon in the navbar), or connect via LinkedIn and Behance." },
  { keywords: ["experience", "certif", "achievement", "award"], response: "Cedrick holds certifications from Salesforce (Agentblazer Champion), AWS Cloud Practitioner (Udemy), freeCodeCamp Frontend Dev Libraries, Cisco Cybersecurity, and Simplilearn AI for Web Apps. He also reached Top 15/74 at PSC10." },
  { keywords: ["budget byahe", "byahe", "capstone", "fare"], response: "Budget Byahe is Cedrick's capstone project - a specialized fare calculation app for Santa Maria, Bulacan's transport network. Built with React, Laravel, Google Maps, and Groq AI. It reached Top 15 out of 74 teams at PSC10! Live at budgetbyahe.com" },
  { keywords: ["education", "school", "university", "study", "college", "pup"], response: "Cedrick is pursuing BS Information Technology at Polytechnic University of the Philippines (PUP) - Sta. Maria, Bulacan Campus (2022 - Present). Relevant coursework: Web Development, UI/UX Design, Software Engineering, Database Management, and Cybersecurity." },
  { keywords: ["safezone", "safe zone", "community"], response: "SafeZone PH is a community-focused system built for reporting local issues directly to authorities. Built with React, Laravel, and MySQL." },
  { keywords: ["design", "behance", "figma", "ui", "ux"], response: "Cedrick has designed several UI/UX projects including a Streaming Application, Budget Byahe SaaS interface, an Online Shopping App, and an Appliance Warehouse website redesign. Check them out on his Behance!" },
  { keywords: ["who", "about", "cedrick", "cedie", "name"], response: "Jhon Cedrick Ignacio (Cedie) is a Web Developer and UI/UX Designer from Sta. Maria, Bulacan, Philippines. He builds scalable web apps with a focus on clean architecture and expressive motion design." },
  { keywords: ["github", "linkedin", "link", "social", "portfolio"], response: "Here are Cedrick's links:\n- GitHub: github.com/Cedie99\n- LinkedIn: linkedin.com/in/jhon-cedrick-ignacio-127944326\n- Behance: behance.net/johnceignacio\n- Budget Byahe: budgetbyahe.com" },
];

function getKeywordResponse(message) {
  const lowerMessage = message.toLowerCase();
  for (const entry of FALLBACK_RESPONSES) {
    if (entry.keywords.some((kw) => lowerMessage.includes(kw))) {
      return entry.response;
    }
  }
  return "I'm Cedrick's AI assistant. I can tell you about his skills, projects, education, certifications, and how to contact him. What would you like to know?";
}

const QUICK_SUGGESTIONS = [
  "What are Cedrick's skills?",
  "Tell me about Budget Byahe",
  "How can I contact Cedrick?",
];

const WELCOME_MESSAGE = {
  role: "assistant",
  content: "Hey! I'm Cedie AI. Ask me anything about Cedrick's skills, projects, or experience!",
};

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-zinc-500"
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSend = async (text) => {
    const messageText = text || inputValue.trim();
    if (!messageText || isLoading) return;

    setInputValue("");
    const userMessage = { role: "user", content: messageText };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const chatHistory = messages.filter((m) => m !== WELCOME_MESSAGE);
      const response = await sendMessage(chatHistory, messageText);
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
    } catch (error) {
      console.error("Chatbot error:", error);
      // Always fall back to keyword-based responses
      const fallbackResponse = getKeywordResponse(messageText);
      setMessages((prev) => [...prev, { role: "assistant", content: fallbackResponse }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const showSuggestions = messages.length <= 1;

  return (
    <>
      {/* FAB */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 2 }}
            onClick={() => setIsOpen(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full bg-sky-500 text-white flex items-center justify-center shadow-[0_0_30px_rgba(56,189,248,0.3)] hover:shadow-[0_0_40px_rgba(56,189,248,0.5)] transition-shadow"
          >
            <span className="absolute inset-0 rounded-full bg-sky-400 animate-ping opacity-20" />
            <MessageCircle className="w-6 h-6 relative z-10" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-6 z-[55] w-[calc(100vw-3rem)] sm:w-[380px] h-[520px] max-h-[80vh] rounded-2xl overflow-hidden border border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.6)] flex flex-col"
            style={{ background: "rgba(9, 9, 11, 0.95)", backdropFilter: "blur(40px)" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/5 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-sky-500/20 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-sky-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Cedie AI</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] text-zinc-500 font-medium">Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/5 rounded-full text-zinc-500 hover:text-white transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Messages */}
            <div
              className="flex-1 overflow-y-auto px-4 py-4 space-y-3 chatbot-messages"
              data-lenis-prevent
            >
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.role === "user"
                        ? "bg-sky-500/20 text-sky-100 rounded-br-md"
                        : "bg-zinc-800/50 text-zinc-300 rounded-bl-md"
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-zinc-800/50 rounded-2xl rounded-bl-md">
                    <TypingIndicator />
                  </div>
                </div>
              )}

              {/* Quick Suggestions */}
              {showSuggestions && !isLoading && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {QUICK_SUGGESTIONS.map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => handleSend(suggestion)}
                      className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[11px] font-medium text-zinc-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-white/5 shrink-0">
              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about Cedrick..."
                  rows={1}
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-sky-500/30 resize-none max-h-20"
                  style={{ minHeight: "40px" }}
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!inputValue.trim() || isLoading}
                  className="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center hover:bg-sky-400 transition-colors disabled:opacity-30 disabled:hover:bg-sky-500 shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
