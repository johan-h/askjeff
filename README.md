# Ask Jeff the guru
### Brief
As part of a student project, create an interactive application with the purpose of being beneficial for Hyper Island students. Use basic programming knowledge including HTML, CSS & JavaScript. No frameworks allowed.

### Result
A responsive bot for asking questions regards anything about the school. Made with a fun twist. The mechanism is based on a simple keywords search in every question asked and a result is displayed if there is a match in the database.

### Notes
The first version is build upon the mentality of "first time using Javascript in a project". Hopefully, I'll get the opportunity to update the code and application to its proper form soon.

## How it works
Users search phrase is filtered through relevant parameters to be cut down as keywords. Each keyword is run through function displayed below to look after a match in any of the pre-set results. The result can later be displayed in different ways.

```
var found = [];

$.each(search, function(index, searchItem){
    $.each(words, function(index, textWord) {
        if (searchItem.words.indexOf(textWord) !== -1) {

            found.push(searchItem);
        }
    });
});
```

At the current state all results, phrases and errors are stored in a seperate .js file - (q.js). There is a wide range of configurations regards how to display the results. An example is displayed in `js/example_structure.js`.

#### Search phrases and results
Wrapped inside an array named search.

```
var search = [
    // Keywords and answers goes here.
]
```

Set up results by identifing keywords related to the answer. The keywords is defined by `words` and the related answer with `result`.

```
{
    "words": ["share", "spread"],
    "result": "Soo, you wanna share this thing to your friends. You\'re more than welcome."
}
```

Add a button for a easier interaction. The button link is defined by `button` and the text inside of the button by `buttontext`.

```
{
    "words": ["share", "spread"],
    "result": "Soo, you wanna share this thing to your friends. You\'re more than welcome. Use the services below.",
    "button": "https://www.facebook.com/linktoshare",
    "buttontext": "Facebook"
}
```

Add color. Color is defined by `buttoncolor`. Use hex without the #.
```
{
    "words": ["share", "spread"],
    "result": "Soo, you wanna share this thing to your friends. You\'re more than welcome. Use the services below.",
    "button": "https://www.facebook.com/linktoshare",
    "buttontext": "Facebook",
    "buttoncolor": "fe7706"
}
```

Add two buttons with one highligted. The highlighted button link is defined by `buttonh` and the text inside of the button by `buttontexth`. The second button is defined by the same as before. The highlighted button might be configured as a standalone as well. 
```
{
    "words": ["share", "spread"],
    "result": "Soo, you wanna share this thing to your friends. You\'re more than welcome. Use the services below.",
    "buttonh": "https://www.facebook.com/linktoshare",
    "buttontexth": "Facebook",
    "button": "https://twitter.com/linktoshare",
    "buttontext": "Twitter"
}
```

#### Error phrases when no results found
Wrapped inside an array named errorMessage.

```
var errorMessage = [
    // Message goes here.
]
```

Error messages is run by a randomized mechanism and therefore there is no keywords connected to it. The message is defined by `message`.
```
{
    'message': 'Oh, no. There\'s no answer to that question.'
}
```

Add a background of the site to the result. The background will change together with the specific error message and return back to standard when typing in a another question. The background added is defined by `bg`, all extensions should work.
```
{
    'message': 'Oh, no. There\'s no answer to that question. But look at the gif.',
    'bg': 'cool_background.gif'
}
```

Add a sound. A sound will be played together with the error message. The sound is defined by `sound`.
```
{
    'message': 'Oh, no. There\'s no answer to that question. But look at the gif and listen to the sound.',
    'bg': 'cool_background.gif',
    'sound': 'cool_song.m4a'
}
```

All these modifications can be standalone or together.

#### Greeting phrases
Wrapped inside an array named greetingPhrase.

Greeting phrases is run by a randomized mechanism fired by specific keywords as "hey" etc. Keywords can be modified in main.js. 

```
var greetingPhrase = [
  'Hey man!',
  'Whats up dude?!',
  'Do you like my site? Type for \"I want to share it\"'
];
```

#### Autocomplete questions
Wrapped inside an array named searchTips.

An autocomplete function is activated after the user typed in a couple of characters. Search tips is a collection of pre-phrased questions to help the user phrase questions the way our mechanism understands it to optimize the chance of getting an answer.

```
var searchTips = [
  'What is this?',
  'What weather is it today?',
  'What is Hyper Island?'
];
```

### Next step
* Adjust Jeff to ES6.
* Add proper structure to the project.
* Optimize for mobile users.
* Build Jeff on top of a framework to easier handle modules. (react/vue)
* Optimized rendering.
* Involve data in database rather than an separate "data"-file. Explore the option of API.
* Explore possibilities in ML to enhance user interactions.