import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot } from "lucide-react";
import { sendMessage } from "../lib/gemini";

const API_FALLBACK_MESSAGE = "Comms interference detected. Explore the dossier directly — you can find skills, missions, field operations, training records, and telemetry in the sections above. Use the Signal section to establish direct contact.";

const QUICK_SUGGESTIONS = [
  "What are Cedrick's skills?",
  "Tell me about Budget Byahe",
  "What's his current role?",
];

const WELCOME_MESSAGE = {
  role: "assistant",
  content: "Mission Comms online. Ask me anything about Cedrick's systems, missions, or field operations.",
};

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-zinc-400"
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

export default function Chatbot({ externalOpen, onExternalClose }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Handle external open trigger from MissionNav
  useEffect(() => {
    if (externalOpen) {
      setIsOpen(true);
      onExternalClose?.();
    }
  }, [externalOpen, onExternalClose]);

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
      console.error("Comms error:", error);
      setMessages((prev) => [...prev, { role: "assistant", content: API_FALLBACK_MESSAGE }]);
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
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="fixed bottom-20 right-6 z-50 lg:hidden w-12 h-12 rounded border border-sky-400/20 bg-deep text-sky-400 flex items-center justify-center hover:bg-sky-400/5 transition-colors shadow-sm"
          >
            <span className="font-mono text-[10px] font-bold">TX</span>
            <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-signal signal-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-4 right-4 lg:bottom-8 lg:right-8 z-[55] w-[calc(100vw-2rem)] sm:w-[380px] h-[520px] max-h-[80vh] overflow-hidden border border-zinc-200 dark:border-zinc-700 rounded-lg shadow-lg flex flex-col bg-white/[0.97] dark:bg-zinc-950/[0.97]"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 dark:border-zinc-700 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded border border-sky-400/20 bg-sky-400/5 flex items-center justify-center">
                  <Bot className="w-3.5 h-3.5 text-sky-400" />
                </div>
                <div>
                  <h3 className="font-mono text-[11px] font-bold text-zinc-900 dark:text-gray-100 tracking-wider">
                    MISSION COMMS
                  </h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-signal signal-pulse" />
                    <span className="font-mono text-[9px] text-zinc-400">ONLINE</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-900 dark:hover:text-gray-100 transition-all rounded"
              >
                <X className="w-3.5 h-3.5" />
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
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-3 py-2.5 text-[13px] leading-relaxed whitespace-pre-wrap rounded ${
                      msg.role === "user"
                        ? "bg-sky-50 dark:bg-sky-950 text-sky-900 dark:text-sky-200 border border-sky-200 dark:border-sky-800"
                        : "bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700"
                    }`}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded">
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
                      className="px-2.5 py-1.5 border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 font-mono text-[10px] text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-gray-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-600 transition-all rounded"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-zinc-200 dark:border-zinc-700 shrink-0">
              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Transmit message..."
                  rows={1}
                  className="flex-1 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 px-3 py-2.5 text-sm text-zinc-900 dark:text-gray-100 placeholder:text-zinc-400 focus:outline-none focus:border-sky-400/20 resize-none max-h-20 font-mono text-[12px] rounded"
                  style={{ minHeight: "40px" }}
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!inputValue.trim() || isLoading}
                  className="w-10 h-10 border border-sky-400/20 bg-sky-400/5 text-sky-400 flex items-center justify-center hover:bg-sky-400/10 transition-colors disabled:opacity-20 disabled:hover:bg-sky-400/5 shrink-0 rounded"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
