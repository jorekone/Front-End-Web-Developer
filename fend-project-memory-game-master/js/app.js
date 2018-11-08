// Create a list that holds all of your cards
let original_deck = [
    'diamond',
    'paper-plane-o',
    'anchor',
    'bolt',
    'cube',
    'bomb',
    'leaf',
    'bicycle',
    'diamond',
    'paper-plane-o',
    'anchor',
    'bolt',
    'cube',
    'bomb',
    'leaf',
    'bicycle'
];

let open_cards_array = [];
let moves = 0;
let time = 0;
let timerId;
let clockOff = true;

const deck_of_cards = document.querySelector('.deck');
const restart_icon = document.querySelector('.restart');
let restart_button = document.querySelector('.button');

reset_game();

function reset_game() {
    stopTimer();
    time = 0;
    clockOff = true;
    document.querySelector('.deck').setAttribute("style", "display: '';");
    document.querySelector('.timer').innerHTML = `0:00`;

    open_cards_array = [];
    moves = 0;
    document.querySelector('.moves').textContent = `${moves}`;
    deck_array = shuffle(original_deck);

    let fragment = document.createDocumentFragment();

    for (let i = 0; i < deck_array.length; i++) {
        const card_li = document.createElement('li');
        card_li.className = 'card';

        const card_i = document.createElement('i');
        card_i.classList = `fa fa-${deck_array[i]}`;

        card_li.appendChild(card_i);
        fragment.appendChild(card_li);
    }
    div_winner = document.querySelector('.winner_state');
    if (div_winner != null) {
      div_winner.remove();
    }

    restart_button.setAttribute("style", "display: none;");
    document.querySelector('.score-panel').setAttribute("style", "display: '';")

    restore_stars();
    remove_deck();
    deck_of_cards.appendChild(fragment);
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Removes the deck of cards
function remove_deck() {
    deck_of_cards.innerHTML ='';
}

// EVENT - Restart icon
restart_icon.addEventListener('click', function(evt) {
    if (evt.target.className == 'restart' || evt.target.className == 'fa fa-repeat') {
        reset_game();
    }
});

// EVENT - Restart button
restart_button.addEventListener('pointerdown', function(evt) {
  if (evt.target.className == 'button') {
    reset_game();
  }
})

// EVENT - Click on card
deck_of_cards.addEventListener('click', function(evt) {
    if (evt.target.className == 'card') {
        const card = evt.target;

        add_card_to_list_of_open_cards(card);

        setTimeout(function() {
            check_if_cards_do_not_match();
        }, 2000);

        if (clockOff) {
            startTimer();
            clockOff = false;
        }
    }
});

function add_card_to_list_of_open_cards(card) {
    if (open_cards_array.length < 2) {
        card.classList.add("open", "show");
        open_cards_array.push(card);

        check_if_cards_match();
      }
    }

// Check if cards match
function check_if_cards_match() {
    if (open_cards_array.length >= 2) {
        increment_move_counter();
        if (open_cards_array[0].querySelector('i').className == open_cards_array[1].querySelector('i').className) {
            for (let i=0; i < open_cards_array.length; i++) {
                open_cards_array[i].className = "card match";
            }
            // if the player wins the game
            if (do_all_cards_match()) {
                stopTimer();
                console.log(`All cards MATCHED IN JUST ${moves} MOVES`);
                deck_of_cards.setAttribute("style", "display: none;");
                winTheGame();
              }
        }
    }
}

function  do_all_cards_match() {
    const deck = document.querySelectorAll('.card');
    all_matched = true;

    for (let i=0; i < deck.length; i++) {
        if (deck[i].className != 'card match') {
            all_matched = false;
            break;
        }
    }
    return all_matched;
}

function check_if_cards_do_not_match() {
    if (open_cards_array.length >= 2) {
        for (let i=0; i < open_cards_array.length; i++) {
            open_cards_array[i].classList.remove("open", "show");
        }
        open_cards_array = [];
    }
}

// Increase move counter
function increment_move_counter() {
    moves += 1;
    document.querySelector('.moves').textContent = `${moves} Moves`;
    calculate_stars();
}

// Calculate stars
function calculate_stars() {
  if (moves == 12 || moves == 16 || moves == 20) {
    document.querySelector('.fa.fa-star').remove();
  }
}

// Restore stars
function restore_stars() {
  let star_count = document.getElementsByClassName('fa fa-star').length;
  const stars = document.querySelector('.stars');

  while (star_count < 3) {
    const li = document.createElement('li');
    const i = document.createElement('i');

    i.className = 'fa fa-star';
    li.appendChild(i);
    stars.appendChild(li);

    star_count++;
  }
}

// Timer functions
function startTimer() {
    timerId = setInterval(() => {
        time++;
        displayTimer();
    }, 1000);
}

function stopTimer() {
    clearInterval(timerId);
  }

function displayTimer () {
    const timer = document.querySelector('.timer');
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    if (seconds < 10) {
        timer.innerHTML = `${minutes}:0${seconds}`;
    } else {
        timer.innerHTML = `${minutes}:${seconds}`;
        }
      }

// This function creates the winning window and hides the deck and the score panel
function winTheGame() {
  document.querySelector('.deck').setAttribute("style", "display: none;")
  document.querySelector('.score-panel').setAttribute("style", "display: none;")
  let star_count = document.getElementsByClassName("fa fa-star").length;
  let time_count = document.querySelector(".timer").innerText;
  let move_count = document.querySelector(".moves").innerText;

  let div_winner = document.createElement('div');
  let h1_congratulations_message = document.createElement('h1');
  let h3_score_moves_stars_message = document.createElement('h3');
  let h3_time_message = document.createElement('h3');
  // let button = document.createElement('div');

  div_winner.className = 'winner_state';
  h1_congratulations_message.className = 'congratulations';
  h3_score_moves_stars_message.className = 'score_moves_stars';
  h3_time_message.className = 'score_time';
  // button.className = 'button';

  h1_congratulations_message.textContent = `Congratulations! You won!`;
  h3_score_moves_stars_message.textContent = `With ${move_count} moves and ${star_count} stars.`;
  h3_time_message.textContent = `In just ${time_count}`;
  // button.textContent = `Play again`;

  div_winner.appendChild(h1_congratulations_message);
  div_winner.appendChild(h3_score_moves_stars_message);
  div_winner.appendChild(h3_time_message);
  div_winner.appendChild(restart_button);

  restart_button.setAttribute("style", "display: '';");

  div_winner.setAttribute("style", "background: mediumpurple;")

  document.body.appendChild(div_winner);
}
