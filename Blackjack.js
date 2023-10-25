let deckId = '';
const newDeckBtn = document.getElementById('new-deck-btn');
const drawCardBtn = document.getElementById('draw-card-btn');
let cardsContainer = document.getElementById('cards-container');

newDeckBtn.addEventListener('click', () => {
    fetch('https://deckofcardsapi.com/api/deck/new/')
        .then(res => res.json())
        .then(data => {
            console.log(data.deck_id)
            deckId = data.deck_id;
        })
})

drawCardBtn.addEventListener('click', () => {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            for(let i = 0; i < data.cards.length; i++) {
                cardsContainer.children[i].innerHTML = `
                <img src="${data.cards[i].image}"/>
                `
            }
            determineWinner(data.cards[0], data.cards[1])
        })
})

function determineWinner(myCard, botCard) {
    const allCards = ['1', '2', '3', '4', '5', '6', '7', 
        '8', '9', '10', 'JACK', 'QUEEN', 'KING', 'ACE'
    ];
    const myCardValue = allCards.indexOf(myCard.value); 
    const botCardValue = allCards.indexOf(botCard.value); 
    console.log(myCardValue, botCardValue)
    if (myCardValue > botCardValue) {
        console.log("I Won!!");
    } else if (botCardValue > myCardValue) {
        console.log('the Bot Won')
    } else {
        console.log('it"s War')
    }
}
