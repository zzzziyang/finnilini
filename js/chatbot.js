// Simple Travel Planner Chatbot UI/UX
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotWindow = document.getElementById('chatbot-window');
const chatbotClose = document.getElementById('chatbot-close');
const chatbotForm = document.getElementById('chatbot-form');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotMessages = document.getElementById('chatbot-messages');

// Persisted chat session
let chatId = localStorage.getItem('chatId');
// Initial message
let chatbotInitialized = false;

if (!chatbotInitialized) {
  appendMessage('Finnilini Bot', "Hi! How can I help you plan your Finland trip today?");
  chatbotInitialized = true;
}

if (!chatId) {
  chatId = crypto.randomUUID();
  localStorage.setItem('chatId', chatId);
}

chatbotToggle.addEventListener('click', () => {
  chatbotWindow.hidden = false;
  chatbotWindow.style.display = '';
  chatbotInput.focus();


});

chatbotClose.addEventListener('click', () => {
  chatbotWindow.hidden = true;
  chatbotWindow.style.display = 'none';
});

chatbotForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const userMsg = chatbotInput.value.trim();
  if (!userMsg) return;
  appendMessage('You', userMsg);
  chatbotInput.value = '';
  chatbotInput.focus();

  const typingDiv = document.createElement('div');
  typingDiv.className = 'chatbot-bot chatbot-typing';
  typingDiv.innerHTML = '<em>Finnilini Bot is typing...</em>';
  chatbotMessages.appendChild(typingDiv);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

  const botReply = await getBotResponse(userMsg);

  typingDiv.remove();
  appendMessage('Finnilini Bot', botReply);
});

function appendMessage(sender, text) {
  const msgDiv = document.createElement('div');
  msgDiv.className = sender === 'You' ? 'chatbot-user' : 'chatbot-bot';

  if (sender === 'You') {
    // User messages as plain text (escaped)
    msgDiv.textContent = `${sender}: ${text}`;
  } else {
    // Bot messages parsed from Markdown to HTML using marked
    const htmlText = marked.parse(text);
    msgDiv.innerHTML = `<strong>${sender}:</strong> ${htmlText}`;
  }

  chatbotMessages.appendChild(msgDiv);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

async function getBotResponse(input) {
  const endpoint = 'https://limeutr-flowise.hf.space/api/v1/prediction/ae108c7f-d397-4326-b660-ae6827a4a1c6';
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question: input,
        chatId: chatId
      })
    });
    const data = await response.json();
    return data.text || data.answer || data.result || 'Sorry, no response.';
  } catch (e) {
    return 'Sorry, I could not connect to the travel planner AI right now.';
  }
}
