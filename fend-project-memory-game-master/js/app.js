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

let fragment;
let open_cards_array = [];
let moves = 0;

const deck_of_cards = document.querySelector('.deck');
const restart_button = document.querySelector('.restart');

reset_game();

function reset_game() {
    open_cards_array = [];
    
    deck_array = shuffle(original_deck);    
    fragment = document.createDocumentFragment();
    
    moves = 0;
    document.querySelector('.moves').textContent = `${moves}`;

    for (let i = 0; i < deck_array.length; i++) {
        const card_li = document.createElement('li');
        card_li.className = 'card';

        const card_i = document.createElement('i');
        card_i.classList = `fa fa-${deck_array[i]}`;

        card_li.appendChild(card_i);
        fragment.appendChild(card_li);
    }

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

function remove_deck() {
    deck_of_cards.innerHTML ='';
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

restart_button.addEventListener('click', function(evt) {
    if (evt.target.className == 'restart' || evt.target.className == 'fa fa-repeat') {
        reset_game();
    }
});


deck_of_cards.addEventListener('click', function(evt) {
    if (evt.target.className == 'card') {
        const card = evt.target;
        
        add_card_to_list_of_open_cards(card);

        setTimeout(function() {
            check_if_cards_do_not_match();
        }, 2000);
    }
});

function add_card_to_list_of_open_cards(card) {
    if (open_cards_array.length < 2) {
        card.classList.add("open", "show");
        open_cards_array.push(card); 

        check_if_cards_match();
        increment_move_counter();   
    }
}

function check_if_cards_match() {
    if (open_cards_array.length >= 2) {
        if (open_cards_array[0].querySelector('i').className == open_cards_array[1].querySelector('i').className) {
            for (let i=0; i < open_cards_array.length; i++) {
                open_cards_array[i].className = "card match";
            }
            if (do_all_cards_match()) {
                console.log(`All cards MATCHED IN JUST ${moves} MOVES`)
            }
            do_all_cards_match();
        }
    }

} 

function check_if_cards_do_not_match() {
    if (open_cards_array.length >= 2) {
        for (let i=0; i < open_cards_array.length; i++) {
            open_cards_array[i].classList.remove("open", "show");
        }
        open_cards_array = [];
    }
}

function increment_move_counter() {
    moves += 1; 
    document.querySelector('.moves').textContent = `${moves}`;
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