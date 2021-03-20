const head = $(".header");
const quizMe = $(".quizMe");
const redo = $(".redo");
const startOver = $(".startOver");
const display = $(".textDisplay");
const output = $(".output");
const alert = $(".alert");
const lenient = $(".lenient");
const standard = $(".standard");
const perfectionist = $(".perfectionist");
const current = $(".current");
const spinner = $("spinner-grow");
const drop = $(".dropdown-toggle");
const romeo = $(".romeo");
const macbeth = $(".macbeth");
const richard = $(".richard");
const ash = $(".ash");
// const prog = $(".progress-bar");

richard.click(function(){
  display.val(`Now is the winter of our discontent
Made glorious summer by this sun of York;
And all the clouds that lour'd upon our house
In the deep bosom of the ocean buried.
Now are our brows bound with victorious wreaths;
Our bruised arms hung up for monuments;
Our stern alarums changed to merry meetings,
Our dreadful marches to delightful measures.
Grim-visaged war hath smooth'd his wrinkled front;
And now, instead of mounting barded steeds
To fright the souls of fearful adversaries,
He capers nimbly in a lady's chamber
To the lascivious pleasing of a lute.
But I, that am not shaped for sportive tricks,
Nor made to court an amorous looking-glass;
I, that am rudely stamp'd, and want love's majesty
To strut before a wanton ambling nymph;
I, that am curtail'd of this fair proportion,
Cheated of feature by dissembling nature,
Deformed, unfinish'd, sent before my time
Into this breathing world, scarce half made up,
And that so lamely and unfashionable
That dogs bark at me as I halt by them;
Why, I, in this weak piping time of peace,
Have no delight to pass away the time,
Unless to spy my shadow in the sun
And descant on mine own deformity:
And therefore, since I cannot prove a lover,
To entertain these fair well-spoken days,
I am determined to prove a villain
And hate the idle pleasures of these days.
Plots have I laid, inductions dangerous,
By drunken prophecies, libels and dreams,
To set my brother Clarence and the king
In deadly hate the one against the other:
And if King Edward be as true and just
As I am subtle, false and treacherous,
This day should Clarence closely be mew'd up,
About a prophecy, which says that 'G'
Of Edward's heirs the murderer shall be.
Dive, thoughts, down to my soul: here
Clarence comes.`);
});


macbeth.click(function(){
  display.val(`Is this a dagger which I see before me,
The handle toward my hand? Come, let me clutch thee.
I have thee not, and yet I see thee still.
Art thou not, fatal vision, sensible
To feeling as to sight? or art thou but
A dagger of the mind, a false creation,
Proceeding from the heat-oppressed brain?
I see thee yet, in form as palpable
As this which now I draw.
Thou marshall'st me the way that I was going;
And such an instrument I was to use.
Mine eyes are made the fools o' the other senses,
Or else worth all the rest; I see thee still,
And on thy blade and dudgeon gouts of blood,
Which was not so before. There's no such thing:
It is the bloody business which informs
Thus to mine eyes. Now o'er the one halfworld
Nature seems dead, and wicked dreams abuse
The curtain'd sleep; witchcraft celebrates
Pale Hecate's offerings, and wither'd murder,
Alarum'd by his sentinel, the wolf,
Whose howl's his watch, thus with his stealthy pace.
With Tarquin's ravishing strides, towards his design
Moves like a ghost. Thou sure and firm-set earth,
Hear not my steps, which way they walk, for fear
Thy very stones prate of my whereabout,
And take the present horror from the time,
Which now suits with it. Whiles I threat, he lives:
Words to the heat of deeds too cold breath gives.
I go, and it is done; the bell invites me.
Hear it not, Duncan; for it is a knell
That summons thee to heaven or to hell.`)
});

romeo.click(function(){
  display.val(`But, soft! what light through yonder window breaks?
It is the east, and Juliet is the sun.
Arise, fair sun, and kill the envious moon,
Who is already sick and pale with grief,
That thou her maid art far more fair than she:
Be not her maid, since she is envious;
Her vestal livery is but sick and green
And none but fools do wear it; cast it off.
It is my lady, O, it is my love!
O, that she knew she were!
She speaks yet she says nothing: what of that?
Her eye discourses; I will answer it.
I am too bold, 'tis not to me she speaks:
Two of the fairest stars in all the heaven,
Having some business, do entreat her eyes
To twinkle in their spheres till they return.
What if her eyes were there, they in her head?
The brightness of her cheek would shame those stars,
As daylight doth a lamp; her eyes in heaven
Would through the airy region stream so bright
That birds would sing and think it were not night.
See, how she leans her cheek upon her hand!
O, that I were a glove upon that hand,
That I might touch that cheek!`);
});

ash.click(function(){
  display.val(`I want to be the very best,
Like no one ever was.
To catch them is my real test,
To train them is my cause!
(I will travel across the land,
Searching far and wide.
Each Pokemon to understand
The power that's inside!)
Pokemon!
Gotta catch em' all!
It's you and me,
I know it's my destiny!
Pokemon!
Oh, you're my best friend,
In a world we must defend!`)
});



var userText;
var allLines = [];
var globalCounter = 0;
var mostly = .25;
var somewhat = .5;
var redoCounter = 0;
var perfectCounter = 0;
var goodCounter = 0;
var somewhatCounter = 0;
var notCounter = 0;
var chosenDiff = "standard";
var thisDiff;







lenient.click(function(){
  mostly = .5;
  somewhat = .75;
  current.text("Current Mode: Lenient");
    $(".masks").css("color", "#0275d8");
    chosenDiff = "lenient";
})

standard.click(function(){
  mostly = .25;
  somewhat = .5;
  current.text("Current Mode: Standard");
    $(".masks").css("color", "#5bc0de");
    chosenDiff = "standard";

})

perfectionist.click(function(){
  mostly = .05;
  somewhat = .1;
  current.text("Current Mode: Perfectionist");
    $(".masks").css("color", "#d9534f");
    chosenDiff = "perfectionist";
})



//initiate
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition;

recognition.onstart = function() {
  quizMe.text("Listening...");
  quizMe.prepend("<span class='spinner-grow spinner-grow-sm m-1' role='status' aria-hidden='true' ></span>");
  console.log("vc");
}

recognition.onresult = function(event) {
  quizMe.prop('disabled', false);
  spinner.css("display", "none");
  quizMe.text("Next Line");
  const current = event.resultIndex;
  const transcript = event.results[current][0].transcript.toLowerCase();
  output.text(transcript);
  check(transcript, globalCounter);
};

quizMe.click(function() {
    if(display.val() == ""){
      alert.removeClass();
      alert.addClass("mt-3 alert alert-warning");
      alert.text("Enter your lines to be quizzed on!")
    } else {
      quizMe.prop('disabled', true);
      startOver.prop('disabled', false);
      thisDiff = chosenDiff;
    $('#collapse1').collapse();
    $('#collapse2').collapse("show");

    alert.css("display", "block");
    userText = display.val().trim().toLowerCase().replace(/[.,’\/#!$%?\^&\*;:{}=\-_`~()]/g, "");
    allLines = userText.split('\n');

    if (globalCounter == 0){
      console.log("hi");
      $.each(allLines, function(index, value){
              var i = String(index);
              console.log(i);
              var txt = $("<mark></mark><br>").text((index + 1) + ": " + value).addClass(i);
              $("#collapse2").append(txt);
          });
    }

    var currentLine = $("mark." + globalCounter);
    currentLine.before(">");

    if (globalCounter == allLines.length) {
      alert.removeClass();
      alert.addClass("mt-3 alert alert-info");
      alert.text("That was your last line!");
    } else {
        recognition.start();
  }
    console.log(allLines[globalCounter]);
    console.log("globalCounter: " + globalCounter);
    console.log("num of lines: " + allLines.length);
}});

redo.click(function() {
    redoCounter++;
    globalCounter--;
    quizMe.click();
});



function check(transcript, counter) {
  console.log(somewhat);
  console.log(mostly);

  if(counter >= 0){
    quizMe.text("Next line");
  }

  if (counter == allLines.length) {
    alert.append("This is your last line.")
  }
  //
  // prog.attr('aria-valuenow', globalCounter).css('width', globalCounter+1);
  // prog.attr('aria-valuemax', allLines.length).css('width', allLines.length);


  if (new Levenshtein(transcript, allLines[counter]) == 0) {
    console.log("length " + transcript.length);
    console.log("leven dist " + new Levenshtein(transcript, allLines[counter]));
    alert.text("Perfect!");
    console.log("Perfect");
    alert.removeClass();
    alert.addClass("mt-3 alert alert-success");
    $("."+globalCounter).animate({
            backgroundColor: "#5cb85c",
          }, 1000 );
    $(".masks").css("color", "#5cb85c");
    globalCounter++;
    perfectCounter++;
  } else if (new Levenshtein(transcript, allLines[counter]) < transcript.length * mostly){
    console.log("length " + transcript.length);
    console.log("leven dist " + new Levenshtein(transcript, allLines[counter]));
    alert.text("Good!");
    console.log("good");
    alert.removeClass();
    alert.addClass("mt-3 alert alert-success");
    $("."+globalCounter).animate({
          backgroundColor: "#5cb85c",
        }, 1000 );
    $(".masks").css("color", "#5cb85c");
    globalCounter++;
    goodCounter++;
  } else if (new Levenshtein(transcript, allLines[counter]) < transcript.length * somewhat){
    console.log("length " + transcript.length);
    console.log("leven dist " + new Levenshtein(transcript, allLines[counter]));
    alert.text("Somewhat. Did we miss something?");
    console.log("somewhat");
    alert.removeClass();
    alert.addClass("mt-3 alert alert-warning");
    $(".masks").css("color", "#f0ad4e");
    $("."+globalCounter).animate({
          backgroundColor: "#f0ad4e",
        }, 1000 );
    globalCounter++;
    somewhatCounter++;
  } else {
    console.log("length " + transcript.length);
    console.log("leven dist " + new Levenshtein(transcript, allLines[counter]));
    alert.text("Err...line!");
    console.log("line");
    alert.removeClass();
    alert.addClass("mt-3 alert alert-danger");
    $(".masks").css("color", "#d9534f");
    $("."+globalCounter).animate({
          backgroundColor: "#d9534f",
        }, 1000 );
      globalCounter++;
      notCounter++;
      }

  recognition.stop();

  if(globalCounter == allLines.length){
    alert.text("");
    output.text("");
    alert.append("<br> <h1>Here's how you fared: </h1><br> <h3>On " + thisDiff + " difficulty, <br></h3>" + "<h4>Of " + allLines.length + " lines, you knew " + perfectCounter + " perfectly, <br>" + goodCounter + " well, <br>" + somewhatCounter + " somewhat, <br>" + "and " + notCounter + " not so well. <br> You redid " + redoCounter + " lines. </h4>");
    quizMe.prop('disabled', true);
    redo.prop('disabled', true);
    startOver.removeClass();
    startOver.addClass("mt-3 btn btn-primary");

    if(perfectCounter > allLines.length * .7){
      alert.removeClass();
      alert.addClass("mt-3 alert alert-success");
      alert.append("<br> Great job—break a leg!")
    } else if(goodCounter > allLines.length * .65 && notCounter < alllines.length * .2){
      alert.removeClass();
      alert.addClass("mt-3 alert alert-warning");
      alert.append("<br> Nice work!")
    } else if(somewhatCounter > allLines.length * .70){
      alert.removeClass();
      alert.addClass("mt-3 alert alert-warning");
      alert.append("<br> Keep practicing!")
    }  else if(notCounter > allLines.length * .70) {
      alert.removeClass();
      alert.addClass("mt-3 alert alert-danger");
      alert.append("<br> When's rehearsal?")
    } else{
      console.log("hi");
      alert.removeClass();
      alert.addClass("mt-3 alert alert-info");
      alert.append("<br> Good luck!")
    }
  }
}
