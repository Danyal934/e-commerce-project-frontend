import React from 'react';

const QuickReplies = ({ replies, onClick }) => {
  if (!replies || replies.length === 0) return null;

  return (
    <div className="quick-replies">
      <p className="quick-replies-label">Quick suggestions:</p>
      <div className="quick-replies-buttons">
        {replies.map((reply, index) => (
          <button
            key={index}
            className="quick-reply-btn"
            onClick={() => onClick(reply)}
          >
            {reply}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickReplies;