// A Hyper Island Student Project. Ask Jeff The Guru.
// Copyright - Ellioth Axelsson & Johan Hallenberg. v1.0.

(function($) {

// Preload gifs to not slow down experience
preloadImages(["/img/saxguy.gif", "/img/vitas.gif", "/img/dabb.gif"]);

// Autocomplete sentences in the serach field
$('#txt').autoComplete({
    minChars: 4,
    source: function(term, suggest){
        term = term.toLowerCase();
        var matches = [];
        for (i=0; i<searchTips.length; i++)
            if (~searchTips[i].toLowerCase().indexOf(term)) matches.push(searchTips[i]);
        suggest(matches);
    }
});

// Display the "Need help?" window
$(function() {
  $(".open-popup").fullScreenPopup({
  });
});

// Search mechanism
$("#txt").keypress(function(e) {
  if (e.which == 13) {

    // Hide the talkbubble when pressing enter again
    $('.talk').hide();

    // Hide the talkbubble when pressing enter again
    $('#shades').hide();

    // Reset the background-picture
    $('#head').attr('class', 'jeff').show();

    // Reset the background-picture
    $('body').css('background-image', 'url(/img/bg.jpg)');

    // Reset the autocomplete
    $('.autocomplete-suggestions').hide();

    // Fetch the search query and make it lowercase
    var str = $('#txt').val().toLowerCase();
    var einput = str.indexOf("@");

    // Reset the last query and insert it in the placeholder
    $('#txt').val('');
    $("#txt").attr("placeholder", str);

    // If the search query is lower than 1 character, show help message
    if(str.length <= 1) {
        $('#result').html('Yaah, dawg. You need to express yourself!<p /><b>If need a hand getting yourself outhere, here are some tips:</b><p /><b>Want me to play some tunes:</b> \"<hl>music please</hl>\"<br /><b>What to know more about programs:</b> \"<hl>what is DMC?</hl>\"<br /><b>Want to know what hyper is:</b> \"<hl>what is Hyper?</hl>\"<p />Turn on the sound, btw.').show();
        audio('express.m4a');
    } else if(str == "hey man" || str == "hey dude" || str == "whats up man?"){
        randomize(greetingPhrase, 'greetingPhrase');
        audio('dude.wav');
    } else if(str == 'music please'){
        audio('song.mp3');
        $('#result').html('Sure man!<p />Here comes some gravy tunes. Tell your friends! <p />It\'s from <a href=\'http://www.imdb.com/title/tt2707408/\'>Narcos</a>.').show();
    } else if(str == "introduce yourself" || str == "who is jeff"){
        audio('introsong.m4a');
        $('#shades').show();
        $('#result').html('This is an intense, jazzy jamba juice introduction of the Kennebunk Guru known as Jeffrey.' ).show();
    } else if(str == "make it snow" || str == 'i can\'t wait for christmas') {
        person('jeffchrist');
        audio('christmas.mp3');
        $(document).snowfall({collection : '#txt', flakeCount : 350, shadow: true, minSize: 5, round: true, flakeColor: '#ffffff'});
        $('.talk').html('I\'m dreaming of a white... christmas..').show();
    } else if(einput >= 1){
        addDb(str, 'emails');
        $('#result').html('Thanks man!<p />Awesome that you are intrested in Hyper Island. We\'ll contact you with more information about your program soon. Stay tuned Hombre!').show();
        audio('mail.mp3');
    } else {

    // Add search query to the database
    // addDb(str);

    // #1 - Remove all other characters such as !?,.
    str = str.replace(/[^\w\s]/gi, '');

    // #Extra - Remove all common words as you, is, what, how etc.
    str = str.replace(/who|is|and|or|for|the|but|what|how|its/i, '');

    // #2 - Split string into array of words. You want to split by " ".
    var words = str.split(" ");

    // Container for, if result is found
    var found = [];

    // Search for input in db. Structure for questions can be found in "structure-questions.js"
    $.each(search, function(index, searchItem){
      $.each(words, function(index, textWord) {
        if (searchItem.words.indexOf(textWord) !== -1) {

          // Push match to container
          found.push(searchItem);
        }
      });
    });

    // If not found, display error messages
    if(found.length == 0) {
      randomize(errorMessages, 'errorMessages');
    } else {
        // If there is an result, display it in the result tag.
        $('#result').html(found[0].result).show();

        // If there is "button" in the array, dispay either one or two buttons
        if('buttonh' in found[0]) {
          var buttonh = found[0].buttonh;
          var buttontexth = found[0].buttontexth;

          var button = found[0].button;
          var buttontext = found[0].buttontext;

          $('#result').append('<p />');
          btn(button, buttontext, null, buttonh, buttontexth);
        } else if('button' in found[0]) {
          var button = found[0].button;
          var buttontext = found[0].buttontext;

          var color = found[0].buttoncolor;

          $('#result').append('<p />');
          btn(button, buttontext, color);
        } else if('video' in found[0]) {
          var vid = found[0].video;

          video(vid);
        // If picutre/gif inluded, show it
        } else if('picture' in found[0]) {
          var pic = found[0].picture;

          picture(pic);
        // If sound included, play it
      } else if('sound' in found[0]) {
          var aud = found[0].sound;

          audio(aud);
        }
        // If changing person, display the specific one
        if ('person' in found[0]) {
          var pers = found[0].person;

          person(pers);

        }


      };
  };
};
});

// Functions for funny answers
// Shows after a couple of seconds to make the person interact with the website
// setTimeout(function(){
//   $(".talk").html('I\'m buffering... If you\'re stuck. Take examples of the cloud at the bottom').show();
//   buffering.play();
//   $(".faq").show();
// }, 100);

// Add search-query to database
function addDb (query, dbase) {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyByEZzz66TiRbLsZZcnD_g996eo8iva8NU",
    authDomain: "jefftheguru-fada6.firebaseapp.com",
    databaseURL: "https://jefftheguru-fada6.firebaseio.com",
    storageBucket: "jefftheguru-fada6.appspot.com",
    messagingSenderId: "1018668694907"
  };

  // Initialize your Firebase app
  firebase.initializeApp(config);

  // Reference to the recommendations object in your Firebase database
  var datab = firebase.database().ref(dbase);

  if (dbase == 'search') {
    datab.push({
      "search": query
    });
  } else if (dbase == 'emails') {
    datab.push({
      "emails": query
    });
  }

};

// Function to embedd videos
function video (videoid) {
  $('#result').append($('<p><center><iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/' + videoid + '?autoplay=1\" frameborder=\"0\" allowfullscreen></iframe></center><p />'));
}

// Functino to embedd picture to the search result
function picture (pictureid) {
  $('#result').prepend($('<img src=\"/img/' + pictureid + '\"><p />'));
}

// Function to play sound on search results
function audio (audioid) {
  new Audio ('/aud/' + audioid + '').play();
}

// Function to embedd links
function link (linkid, linktext) {
  $('#result').prepend($('<a href=\"' + linkid + '\">' + linktext + '</a />'));
}

// Author function
function person (name) {
  $('#head').attr('class', name);
}

// Randomize arrays
function randomize (inputType, inputValue) {
  // Pick a random number
  var random = Math.floor(Math.random() * (inputType.length));
  // If it's any of our arrays. Use the random nr to choose one random array.
  if (inputValue == 'greetingPhrase') {
      $('.talk').html(inputType[random]).show();
  } else if(inputValue == 'errorMessages') {
    var ans = inputType[random];

    $('#result').html(ans.message).show();

    if('buttonh' in ans) {
      // Check if there is any values in bummer answers
      $('#result').append('<p />');
      btn(ans.button, ans.buttontext, null, ans.buttonh, ans.buttontexth);
    } else if('button' in ans) {

      $('#result').append('<p />');
      btn(ans.button, ans.buttontext, ans.buttoncolor);
      // If video included, show it
    } else if('video' in ans) {
      video(ans.video);
      // If picutre/gif inluded, show it
    } else if('picture' in ans) {
      picture(ans.picture);
      // If background change it
    } else if('bg' in ans) {
      $('#head').hide();
      $('body').css('background-image', 'url(/img/' + ans.bg + ')');
    };

    // If sound, play it togheter with the rest
    if('sound' in ans) {
      audio(ans.sound);
    };

  };
}

// Function for showing buttons in results. One or two buttons.
function btn (btn, btntxt, clr, btnh, btntxth) {
  // Check if "btnh" has a value. If yes, show two buttons. If not show just one button
  if (typeof btnh === "undefined") {
      $('#result').append($('<center><a href=\"' + btn + '\" class=\"btn\" style=\"background-color:#' + clr + ';">' + btntxt + '</a></center>'));
  } else {
      $('#result').append($('<center><a href=\"' + btnh + '\" class=\"btn btnh\">' + btntxth + '</a><a href=\"' + btn + '\" class=\"btn\">' + btntxt + '</a></center>'));
};
}

function preloadImages(array) {
      if (!preloadImages.list) {
          preloadImages.list = [];
      }
      var list = preloadImages.list;
      for (var i = 0; i < array.length; i++) {
          var img = new Image();
          img.onload = function() {
              var index = list.indexOf(this);
              if (index !== -1) {
                  // remove image from the array once it's loaded
                  // for memory consumption reasons
                  list.splice(index, 1);
              }
          }
          list.push(img);
          img.src = array[i];
      }
}

})(jQuery);