// Structure for search-phrases, results and extra features. Configure by search-words, result text and buttons
// and its colors.
var search = [
  {
    "words": ["age", "old", "grandpha", "odie"],
    "result": "I ain\'t old.",
    "button": "http://coollink.com/",
    "buttontext": "This is a cool button",
    "buttoncolor": "fe7706"
  },
  {
    "words": ["books", "read"],
    "result": "Yeah, I dont really read. I'm more in to netflix."
  },
  {
    "words": ["share", "spread"],
    "result": "Soo, you wanna share this thing to your friends. You\'re more than welcome. Use the services below.",
    "buttonh": "https://www.facebook.com/linktoshare",
    "buttontexth": "Facebook",
    "button": "https://twitter.com/linktoshare",
    "buttontext": "Twitter"
  }
];

// When no results show this messages. Configure by message, background and sound. Notice that non of these are depended. Choose freely.
var errorMessages = [
  {
    'message': 'Oh, no. There\'s no answer to that question. Listen to this song and look at the gif in the background.',
    'bg': 'cool_background.gif',
    'sound': 'cool_song.m4a'
  }
];

// When initializing a greeting phrase, randomize between these ones.
var greetingPhrase = [
  'Hey man!',
  'Whats up dude?!',
  'Do you like my site? Type for \"I want to share it\"'
];

// This is phrased questions to help the user to find relevant questions to match our results.
var searchTips = [
  'What is this?',
  'What weather is it today?',
  'What is Hyper Island?'
];