import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import './ChatAssistant.css';

const quickQuestions = [
  'What is the fare?',
  'How do I book?',
  'Show me the EV fleet',
  'What are your hours?',
];

const answers = {
  'What is the fare?': 'Every ride has a simple flat fare of ₹50, with no surge pricing or hidden charges.',
  'How do I book?': 'Choose your pickup and destination, select an EV, then confirm your date and time.',
  'Show me the EV fleet': 'We have 7 electric models from Tata, MG, Mahindra, and BYD ready for your next ride.',
  'What are your hours?': 'Our rides operate daily from 6:00 AM to 6:00 PM across Tamil Nadu.',
};

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hi, I am Eco Assist. How can I help with your next electric ride?' },
  ]);
  const [input, setInput] = useState('');

  function askQuestion(question) {
    const answer = answers[question] || 'I can help with fares, bookings, fleet details, and operating hours.';
    setMessages((current) => [
      ...current,
      { type: 'user', text: question },
      { type: 'bot', text: answer },
    ]);
    setInput('');
  }

  function handleSubmit(event) {
    event.preventDefault();
    const question = input.trim();
    if (question) askQuestion(question);
  }

  return createPortal(
    (
    <div className={`chat-assistant ${isOpen ? 'is-open' : ''}`}>
      {isOpen && (
        <section className="chat-panel" aria-label="Eco Assist chat">
          <div className="chat-panel-header">
            <div>
              <span className="chat-status"><i /> Online now</span>
              <h2>Eco Assist</h2>
            </div>
            <button type="button" className="chat-close" onClick={() => setIsOpen(false)} aria-label="Close chat">×</button>
          </div>

          <div className="chat-messages" aria-live="polite">
            {messages.map((message, index) => (
              <div className={`chat-message ${message.type}`} key={`${message.text}-${index}`}>
                {message.text}
              </div>
            ))}
          </div>

          <div className="chat-quick-actions">
            {quickQuestions.map((question) => (
              <button type="button" key={question} onClick={() => askQuestion(question)}>{question}</button>
            ))}
          </div>

          <form className="chat-form" onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about your ride..."
              aria-label="Ask Eco Assist a question"
            />
            <button type="submit" aria-label="Send message">→</button>
          </form>

          <Link to="/book" className="chat-book-link">Start booking an EV ride <span>↗</span></Link>
        </section>
      )}

      <button
        type="button"
        className="chat-launcher"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-label={isOpen ? 'Close Eco Assist' : 'Open Eco Assist'}
      >
        <span className="chat-launcher-icon" aria-hidden="true">✦</span>
        <span className="chat-launcher-label">{isOpen ? 'Close' : 'Ask Eco Assist'}</span>
      </button>
    </div>
    ),
    document.body
  );
}
