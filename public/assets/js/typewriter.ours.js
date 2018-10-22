'use strict';

function runTypewriter($typewriter) {
  //gets the inner HTML for the typerwriter
  let htmlContent = $typewriter.html();
  
  //clearing out all content
  $typewriter.html('');

  //inital variables
  let cursorPosition = 0,
    tag = '',
    tagOpen = false,
    typeSpeed = 100, //type at 1 character per 100 milliseconds by default
    tempTypeSpeed = 0;

  let type = function() {
    let currentCharacter = htmlContent[cursorPosition];
    // randomly picking a speed and adding 50 milliseconds to it
    // this will be the speed of the next character appearance
    // (assuming we don't want to immediately go to the next character--capturing html tags)
    let nextSpeed = (Math.random() * typeSpeed) + 50;

    if (currentCharacter === '<') { // starting a new tag
      tempTypeSpeed = 0; // we want to immediately render html (invisible)
      tag = currentCharacter;
      tagOpen = true;
    }else if (tagOpen) { // in process of capturing a tag
      tempTypeSpeed = 0;
      tag += currentCharacter;
      if (currentCharacter === '>') { //when we reach the end of the HTML tag
        // turn speed back on for visible content (inside html tag)
        // next character will take this long to appear
        tempTypeSpeed = nextSpeed; 
        tagOpen = false;
        $typewriter.get(0).innerHTML += tag; // drop it in
      }
    }else { // not within a tag capture (writing text, visible)
      if (currentCharacter === ' ') {
        tempTypeSpeed = 0; // immediately jump to visible content
      } else {
        tempTypeSpeed = nextSpeed;
      }
      $typewriter.get(0).innerHTML += currentCharacter; //makes character appear
    }
    
    cursorPosition += 1;

    // as long as we have more characters in the conent to render
    if (cursorPosition < htmlContent.length - 1) {
      // render the next character after waiting our temp speed milliseconds
      setTimeout(type, tempTypeSpeed);
    }
  };
  // kick it off
  type();
}


$('body').scroll(function(){
  if(window.scrollY === 1500){
    runTypewriter($('#typewriter'));
  }
});
