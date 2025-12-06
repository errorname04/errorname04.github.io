// Card suits and ranks
const suits = ['♠', '♥', '♦', '♣'];
const ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

// Game state
let currentRound = 1;
let pot = 0;
let playerCards = [];
let communityCards = [];
let deck = [];

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

// Deal initial hand (2 player cards + 5 community cards)
function dealHand() {
    const newDeck = createDeck();
    const shuffled = shuffleDeck(newDeck);
    
    // Deal 2 player cards
    playerCards = [shuffled[0], shuffled[1]];
    
    // Deal 5 community cards
    communityCards = [shuffled[2], shuffled[3], shuffled[4], shuffled[5], shuffled[6]];
    
    deck = shuffled;
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

// Update the display based on current round
function updateDisplay() {
    // Display player cards (always visible)
    displayCard(document.getElementById('card1'), playerCards[0]);
    displayCard(document.getElementById('card2'), playerCards[1]);
    
    // Display community cards based on round
    // Round 1: No community cards
    // Round 2: 3 cards (flop)
    // Round 3: 4 cards (flop + turn)
    // Round 4: 5 cards (flop + turn + river)
    
    const communityCardElements = [
        document.getElementById('community1'),
        document.getElementById('community2'),
        document.getElementById('community3'),
        document.getElementById('community4'),
        document.getElementById('community5')
    ];
    
    let cardsToShow = 0;
    if (currentRound >= 2) cardsToShow = 3; // Flop
    if (currentRound >= 3) cardsToShow = 4; // Turn
    if (currentRound >= 4) cardsToShow = 5; // River
    
    for (let i = 0; i < 5; i++) {
        if (i < cardsToShow) {
            displayCard(communityCardElements[i], communityCards[i]);
        } else {
            // Show card back
            communityCardElements[i].innerHTML = '<div class="card-back">?</div>';
            communityCardElements[i].classList.add('card-back');
            communityCardElements[i].classList.remove('red', 'black');
        }
    }
    
    // Update round number
    document.getElementById('roundNumber').textContent = currentRound;
    
    // Update pot display
    document.getElementById('potAmount').textContent = pot;
    
    // Disable next round button after round 4
    const nextRoundButton = document.getElementById('nextRoundButton');
    if (currentRound >= 4) {
        nextRoundButton.disabled = true;
        nextRoundButton.textContent = 'Game Complete';
    } else {
        nextRoundButton.disabled = false;
        nextRoundButton.textContent = 'Next Round';
    }
}

// Add bet to pot
function addToPot() {
    const betInput = document.getElementById('betAmount');
    const betAmount = parseFloat(betInput.value) || 0;
    
    if (betAmount > 0) {
        pot += betAmount;
        betInput.value = 0;
        updateDisplay();
    }
}

// Move to next round
function nextRound() {
    if (currentRound < 4) {
        currentRound++;
        updateDisplay();
    }
}

// Initialize the game
function initGame() {
    // Deal initial hand
    dealHand();
    
    // Set up event listeners
    document.getElementById('betButton').addEventListener('click', addToPot);
    document.getElementById('nextRoundButton').addEventListener('click', nextRound);
    
    // Allow Enter key to add to pot
    document.getElementById('betAmount').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addToPot();
        }
    });
    
    // Initial display
    updateDisplay();
}

// Start the game when the page loads
document.addEventListener('DOMContentLoaded', initGame);
