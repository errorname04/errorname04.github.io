// Card suits and ranks
const suits = ['♠', '♥', '♦', '♣'];
const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

// Create a deck of 52 cards
function createDeck() {
    const deck = [];
    for (let suit of suits) {
        for (let rank of ranks) {
            deck.push({ suit, rank });
        }
    }
    return deck;
}

// Shuffle deck using Fisher-Yates algorithm
function shuffleDeck(deck) {
    const shuffled = [...deck];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Deal two random cards from the deck
function dealCards() {
    const deck = createDeck();
    const shuffled = shuffleDeck(deck);
    return [shuffled[0], shuffled[1]];
}

// Check if a card is red (hearts or diamonds)
function isRedCard(card) {
    return card.suit === '♥' || card.suit === '♦';
}

// Display a card on the screen
function displayCard(cardElement, card) {
    // Remove card-back class if present
    cardElement.innerHTML = '';
    cardElement.classList.remove('card-back');
    
    // Add color class
    if (isRedCard(card)) {
        cardElement.classList.add('red');
        cardElement.classList.remove('black');
    } else {
        cardElement.classList.add('black');
        cardElement.classList.remove('red');
    }
    
    // Create card structure
    const rankTop = document.createElement('div');
    rankTop.className = 'card-rank-top';
    rankTop.textContent = card.rank;
    
    const suitCenter = document.createElement('div');
    suitCenter.className = 'card-suit-center';
    suitCenter.textContent = card.suit;
    
    const rankBottom = document.createElement('div');
    rankBottom.className = 'card-rank-bottom';
    rankBottom.textContent = card.rank;
    
    cardElement.appendChild(rankTop);
    cardElement.appendChild(suitCenter);
    cardElement.appendChild(rankBottom);
}

// Initialize the game
function initGame() {
    const card1Element = document.getElementById('card1');
    const card2Element = document.getElementById('card2');
    const dealButton = document.getElementById('dealButton');
    
    // Deal initial cards
    const cards = dealCards();
    displayCard(card1Element, cards[0]);
    displayCard(card2Element, cards[1]);
    
    // Add event listener to deal button
    dealButton.addEventListener('click', () => {
        const newCards = dealCards();
        displayCard(card1Element, newCards[0]);
        displayCard(card2Element, newCards[1]);
    });
}

// Start the game when the page loads
document.addEventListener('DOMContentLoaded', initGame);

