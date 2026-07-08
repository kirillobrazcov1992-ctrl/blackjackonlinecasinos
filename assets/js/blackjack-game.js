/* ==========================================
   BlackjackOnlineCasinos.com — Blackjack Game
   Full-featured, 6-deck, H17, DAS, No RSA
   ========================================== */

(function () {
  'use strict';

  // ===== CONFIG =====
  const CONFIG = {
    DECKS: 6,
    MIN_BET: 1,
    MAX_BET: 500,
    STARTING_BALANCE: 1000,
    BLACKJACK_PAYOUT: 1.5, // 3:2
  };

  // ===== DOM refs =====
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => document.querySelectorAll(s);

  const DOM = {};

  function cacheDOM() {
    DOM.dealerCards = $('#dealerCards');
    DOM.dealerValue = $('#dealerValue');
    DOM.dealerResult = $('#dealerResult');
    DOM.playerCards = $('#playerCards');
    DOM.playerValue = $('#playerValue');
    DOM.playerResult = $('#playerResult');
    DOM.playerCards2 = $('#playerCards2');
    DOM.playerValue2 = $('#playerValue2');
    DOM.playerResult2 = $('#playerResult2');
    DOM.splitArea = $('#splitArea');
    DOM.primaryArea = $('#primaryArea');
    DOM.message = $('#bjMessage');
    DOM.balanceEl = $('#bjBalance');
    DOM.betEl = $('#bjBet');
    DOM.history = $('#bjHistory');
    DOM.rulesBtn = $('#bjRulesBtn');
    DOM.rulesFlyout = $('#bjRulesFlyout');

    DOM.btnDeal = $('#bjDeal');
    DOM.btnHit = $('#bjHit');
    DOM.btnStand = $('#bjStand');
    DOM.btnDouble = $('#bjDouble');
    DOM.btnSplit = $('#bjSplit');
    DOM.btnInsurance = $('#bjInsurance');
    DOM.btnNewGame = $('#bjNewGame');
    DOM.chips = $$('.bj-chip');
    DOM.currentBetEl = $('#bjCurrentBet');
  }

  // ===== GAME STATE =====
  let state = {};

  function initState() {
    state = {
      balance: CONFIG.STARTING_BALANCE,
      bet: 0,
      insuranceBet: 0,
      shoe: [],
      dealerHand: [],
      playerHands: [[]],
      currentHand: 0, // index into playerHands
      phase: 'betting', // 'betting' | 'insurance' | 'playing' | 'dealer' | 'done'
      isSplit: false,
      isDouble: false,
      hasInsurance: false,
      history: [],
      handsPlayed: 0,
      handsWon: 0,
      handsLost: 0,
      handsPushed: 0,
      blackjacks: 0,
    };
  }

  // ===== SHOE =====
  const SUITS = ['♠', '♥', '♦', '♣'];
  const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

  function createDeck() {
    const deck = [];
    for (const suit of SUITS) {
      for (const rank of RANKS) {
        deck.push({ rank, suit, value: cardValue(rank) });
      }
    }
    return deck;
  }

  function cardValue(rank) {
    if (rank === 'A') return 11;
    if (['K', 'Q', 'J'].includes(rank)) return 10;
    return parseInt(rank);
  }

  function shuffle(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  }

  function buildShoe() {
    let cards = [];
    for (let i = 0; i < CONFIG.DECKS; i++) {
      cards = cards.concat(createDeck());
    }
    return shuffle(cards);
  }

  function drawCard() {
    if (state.shoe.length < 20) {
      // Reshoe when low
      state.shoe = buildShoe();
    }
    return state.shoe.pop();
  }

  // ===== HAND CALC =====
  function handValue(hand) {
    let val = hand.reduce((s, c) => s + c.value, 0);
    let aces = hand.filter((c) => c.rank === 'A').length;
    while (val > 21 && aces > 0) {
      val -= 10;
      aces--;
    }
    return val;
  }

  function isBlackjack(hand) {
    return hand.length === 2 && handValue(hand) === 21;
  }

  function isBust(hand) {
    return handValue(hand) > 21;
  }

  function canDouble(hand) {
    return hand.length === 2;
  }

  function canSplit(hand) {
    return (
      hand.length === 2 &&
      hand[0].value === hand[1].value &&
      state.playerHands.length < 2
    );
  }

  // ===== RENDER =====
  function cardHTML(card, faceDown = false) {
    if (faceDown) {
      return `<div class="bj-card bj-card--face-down"></div>`;
    }
    const color = card.suit === '♥' || card.suit === '♦' ? 'red' : 'black';
    return `<div class="bj-card bj-card--${color}">
      <span class="bj-card-rank">${card.rank}</span>
      <span class="bj-card-suit">${card.suit}</span>
    </div>`;
  }

  function renderHand(hand, container, valueEl, resultEl, faceDown = false) {
    container.innerHTML = hand
      .map((c, i) => {
        // First card of dealer is face-down during insurance/playing phase
        const fd = faceDown && i === 0 && hand === state.dealerHand;
        return cardHTML(c, fd);
      })
      .join('');

    const val = handValue(hand);
    valueEl.textContent = val > 0 ? val : '';
    valueEl.classList.toggle('visible', hand.length > 0);

    // Result
    resultEl.textContent = '';
    resultEl.className = 'bj-hand-result';
  }

  function render() {
    const dealerFD =
      state.phase === 'insurance' || state.phase === 'playing';

    // Dealer
    renderHand(
      state.dealerHand,
      DOM.dealerCards,
      DOM.dealerValue,
      DOM.dealerResult,
      dealerFD
    );

    // Player primary hand
    const h0 = state.playerHands[0] || [];
    renderHand(h0, DOM.playerCards, DOM.playerValue, DOM.playerResult);

    // Split hand
    if (state.isSplit && state.playerHands.length > 1) {
      DOM.splitArea.style.display = 'flex';
      const h1 = state.playerHands[1] || [];
      renderHand(h1, DOM.playerCards2, DOM.playerValue2, DOM.playerResult2);

      // Highlight current hand
      DOM.playerCards.closest('.bj-hand-area').classList.toggle('bj-hand-current', state.currentHand === 0);
      DOM.playerCards2.closest('.bj-hand-area').classList.toggle('bj-hand-current', state.currentHand === 1);
    } else {
      DOM.splitArea.style.display = 'none';
    }

    // Update balances
    DOM.balanceEl.textContent = state.balance;
    DOM.betEl.textContent = state.bet;

    // Update buttons
    updateButtons();
  }

  function updateButtons() {
    const p = state.phase;
    const hand = state.playerHands[state.currentHand] || [];
    const val = handValue(hand);
    const hasBet = state.bet > 0;
    const isDone = p === 'done';

    DOM.btnDeal.disabled = !hasBet || p !== 'betting';
    DOM.btnDeal.textContent = state.bet > 0 ? 'Deal' : 'Place Bet';

    DOM.btnHit.disabled = p !== 'playing' || isDone || isBust(hand) || val === 21;
    DOM.btnStand.disabled = p !== 'playing' || isDone || isBust(hand) || val === 21;
    DOM.btnDouble.disabled = p !== 'playing' || isDone || !canDouble(hand) || isBust(hand) || val === 21 || state.isSplit;
    DOM.btnSplit.disabled = p !== 'playing' || isDone || !canSplit(hand) || state.balance < state.bet;
    DOM.btnInsurance.disabled = state.phase !== 'insurance';
    DOM.btnNewGame.disabled = p !== 'done' && p !== 'betting';

    // Show/hide deal button text
    if (p === 'betting' && state.bet > 0) {
      DOM.btnDeal.classList.add('btn--primary');
    } else {
      DOM.btnDeal.classList.remove('btn--primary');
    }
  }

  // ===== MESSAGES =====
  function setMessage(msg, isGood = true) {
    DOM.message.textContent = msg;
    DOM.message.style.color = isGood ? 'var(--color-gold)' : 'var(--color-danger)';
  }

  // ===== GAME ACTIONS =====
  function deal() {
    if (state.phase !== 'betting' || state.bet <= 0) return;

    // Deduct bet
    state.balance -= state.bet;
    state.insuranceBet = 0;
    state.dealerHand = [drawCard(), drawCard()];
    state.playerHands = [[drawCard(), drawCard()]];
    state.currentHand = 0;
    state.isSplit = false;
    state.isDouble = false;
    state.hasInsurance = false;

    // Check insurance
    if (state.dealerHand[0].rank === 'A') {
      state.phase = 'insurance';
      DOM.btnInsurance.style.display = 'inline-flex';
    } else {
      state.phase = 'playing';
      DOM.btnInsurance.style.display = 'none';
      checkInitial();
    }

    render();
  }

  function checkInitial() {
    const dealerBJ = isBlackjack(state.dealerHand);
    const playerBJ = isBlackjack(state.playerHands[0]);

    if (dealerBJ && playerBJ) {
      endHand('push', 0, 'Both have Blackjack! Push');
      return;
    }
    if (dealerBJ) {
      endHand('lose', 0, 'Dealer has Blackjack!');
      return;
    }
    if (playerBJ) {
      endHand('win', 0, 'Blackjack! You win!', true);
      return;
    }

    // If dealer shows a 10-value card, check for peek (standard)
    // Auto-advance to playing
    state.phase = 'playing';
    render();

    // Auto check for 21
    if (handValue(state.playerHands[0]) === 21) {
      stand();
    }
  }

  function takeInsurance(choice) {
    if (state.phase !== 'insurance') return;
    DOM.btnInsurance.style.display = 'none';
    state.hasInsurance = choice;

    if (choice) {
      state.insuranceBet = Math.floor(state.bet / 2);
      state.balance -= state.insuranceBet;
    }

    // Peek at dealer's hole card
    const holeCard = state.dealerHand[1];
    const hasBJ = isBlackjack(state.dealerHand);

    if (hasBJ) {
      // Dealer has blackjack
      if (choice) {
        // Insurance pays 2:1
        state.balance += state.insuranceBet * 2 + state.insuranceBet;
        setMessage('Insurance pays! Dealer has Blackjack.');
      } else {
        setMessage('Dealer has Blackjack!', false);
      }

      const playerBJ = isBlackjack(state.playerHands[0]);
      if (playerBJ) {
        endHand('push', 0, 'Push — both have Blackjack.');
      } else {
        endHand('lose', 0, 'Dealer Blackjack.');
      }
    } else {
      // No blackjack
      if (choice) {
        setMessage('No Blackjack — insurance lost.');
      }
      state.phase = 'playing';
      checkInitial();
    }

    render();
  }

  function hit() {
    if (state.phase !== 'playing') return;
    const hand = state.playerHands[state.currentHand];
    hand.push(drawCard());

    const val = handValue(hand);

    if (val > 21) {
      // Bust
      if (state.isSplit) {
        setMessage(`Hand ${state.currentHand + 1} bust!`, false);
        advanceOrStand();
      } else {
        endHand('lose', state.currentHand, 'Bust!');
      }
    } else if (val === 21) {
      setMessage('21!');
      if (state.isSplit) {
        advanceOrStand();
      } else {
        stand();
      }
    } else {
      setMessage('');
    }

    render();
  }

  function stand() {
    if (state.phase !== 'playing') return;
    if (state.isSplit) {
      advanceOrStand();
    } else {
      dealerPlay();
    }
  }

  function doubleDown() {
    if (state.phase !== 'playing') return;
    const hand = state.playerHands[state.currentHand];
    if (!canDouble(hand) || state.balance < state.bet) return;

    state.isDouble = true;
    state.balance -= state.bet;
    state.bet *= 2;
    hand.push(drawCard());

    const val = handValue(hand);
    if (val > 21) {
      endHand('lose', state.currentHand, 'Bust on double!');
    } else {
      dealerPlay();
    }

    render();
  }

  function splitHand() {
    if (state.phase !== 'playing') return;
    const hand = state.playerHands[0];
    if (!canSplit(hand) || state.balance < state.bet) return;

    state.balance -= state.bet;
    state.isSplit = true;
    const card1 = hand[0];
    const card2 = hand[1];
    state.playerHands = [
      [card1, drawCard()],
      [card2, drawCard()],
    ];
    state.currentHand = 0;

    setMessage('Split! Play hand 1.');
    render();

    // Check for 21 on split hands
    if (handValue(state.playerHands[0]) === 21) {
      advanceOrStand();
    }
  }

  function advanceOrStand() {
    // Move to next hand or dealer play
    if (state.currentHand < state.playerHands.length - 1) {
      state.currentHand++;
      setMessage(`Play hand ${state.currentHand + 1}.`);
      render();

      // Auto-stand if 21
      if (handValue(state.playerHands[state.currentHand]) === 21) {
        advanceOrStand();
      }
    } else {
      dealerPlay();
    }
  }

  function dealerPlay() {
    state.phase = 'dealer';

    // Reveal dealer's hole card
    const hand = state.dealerHand;
    while (handValue(hand) < 17) {
      hand.push(drawCard());
    }

    const dealerVal = handValue(hand);
    const dealerBJ = hand.length === 2 && dealerVal === 21;
    const dealerBust = dealerVal > 21;

    // Settle all player hands
    DOM.dealerValue.classList.toggle('visible', true);

    for (let i = 0; i < state.playerHands.length; i++) {
      const ph = state.playerHands[i];
      const pv = handValue(ph);
      const pBJ = ph.length === 2 && pv === 21 && !state.isSplit;

      if (pv > 21) {
        // Already lost
        continue;
      }

      if (dealerBust) {
        state.balance += state.bet * 2;
        endHand('win', i, 'Dealer busts! You win!');
      } else if (pv > dealerVal) {
        state.balance += state.bet * 2;
        endHand('win', i, 'You win!');
      } else if (pv === dealerVal) {
        if (pBJ && !dealerBJ) {
          state.balance += state.bet * 2;
          endHand('win', i, 'Blackjack beats dealer!');
        } else {
          state.balance += state.bet;
          endHand('push', i, 'Push.');
        }
      } else {
        endHand('lose', i, 'Dealer wins.');
      }
    }

    state.phase = 'done';
    DOM.btnInsurance.style.display = 'none';
    render();
    DOM.btnDeal.disabled = false;
  }

  function endHand(type, handIdx, message, isBJ = false) {
    const els = handIdx === 0
      ? { result: DOM.playerResult, area: DOM.playerCards.closest('.bj-hand-area') }
      : { result: DOM.playerResult2, area: DOM.playerCards2.closest('.bj-hand-area') };

    const labels = {
      win: isBJ ? 'Blackjack!' : 'Win',
      lose: 'Lose',
      push: 'Push',
    };

    const classes = {
      win: isBJ ? 'bj-hand-result--bj' : 'bj-hand-result--win',
      lose: 'bj-hand-result--lose',
      push: 'bj-hand-result--push',
    };

    els.result.textContent = labels[type];
    els.result.className = `bj-hand-result ${classes[type]}`;

    setMessage(message, type !== 'lose');

    // Stats
    state.handsPlayed++;
    if (type === 'win') {
      state.handsWon++;
      if (isBJ) state.blackjacks++;
      addHistoryDot(isBJ ? 'bj' : 'w');
    } else if (type === 'lose') {
      state.handsLost++;
      addHistoryDot('l');
    } else {
      state.handsPushed++;
      addHistoryDot('p');
    }

    updateStats();
  }

  function addHistoryDot(type) {
    const dot = document.createElement('span');
    dot.className = `bj-history-dot bj-history-dot--${type === 'w' ? 'win' : type === 'l' ? 'lose' : type === 'p' ? 'push' : 'bj'}`;
    dot.textContent =
      type === 'w' ? 'W' : type === 'l' ? 'L' : type === 'p' ? 'P' : 'BJ';
    DOM.history.appendChild(dot);
    DOM.history.scrollTop = DOM.history.scrollHeight;
  }

  function updateStats() {
    const el = $('#bjStats');
    if (!el) return;
    el.innerHTML = `
      <span class="bj-stat">Played: <span>${state.handsPlayed}</span></span>
      <span class="bj-stat">Won: <span>${state.handsWon}</span></span>
      <span class="bj-stat">Lost: <span>${state.handsLost}</span></span>
      <span class="bj-stat">Push: <span>${state.handsPushed}</span></span>
      <span class="bj-stat">BJ: <span>${state.blackjacks}</span></span>
    `;
  }

  // ===== BETTING =====
  function placeBet(amount) {
    if (state.phase !== 'betting') return;
    if (state.bet + amount > CONFIG.MAX_BET) return;
    if (state.balance < amount) {
      setMessage('Not enough balance!', false);
      return;
    }

    state.balance -= amount;
    state.bet += amount;
    render();
    setMessage('');
  }

  function clearBet() {
    if (state.phase !== 'betting' || state.bet === 0) return;
    state.balance += state.bet;
    state.bet = 0;
    render();
  }

  function newGame() {
    // Reset everything but keep balance and history
    const oldBalance = state.balance;
    const oldHistory = state.history;
    const oldStats = {
      handsPlayed: state.handsPlayed,
      handsWon: state.handsWon,
      handsLost: state.handsLost,
      handsPushed: state.handsPushed,
      blackjacks: state.blackjacks,
    };

    initState();
    state.balance = oldBalance;
    state.history = oldHistory;
    state.handsPlayed = oldStats.handsPlayed;
    state.handsWon = oldStats.handsWon;
    state.handsLost = oldStats.handsLost;
    state.handsPushed = oldStats.handsPushed;
    state.blackjacks = oldStats.blackjacks;

    DOM.dealerCards.innerHTML = '';
    DOM.playerCards.innerHTML = '';
    DOM.playerCards2.innerHTML = '';
    DOM.dealerValue.textContent = '';
    DOM.playerValue.textContent = '';
    DOM.playerValue2.textContent = '';
    DOM.dealerValue.classList.toggle('visible', false);
    DOM.playerResult.textContent = '';
    DOM.playerResult.className = 'bj-hand-result';
    DOM.playerResult2.textContent = '';
    DOM.playerResult2.className = 'bj-hand-result';
    DOM.dealerResult.textContent = '';
    DOM.dealerResult.className = 'bj-hand-result';
    DOM.btnInsurance.style.display = 'none';

    setMessage('Place your bet!');
    render();
  }

  function resetAll() {
    initState();
    DOM.history.innerHTML = '';
    DOM.balanceEl.textContent = CONFIG.STARTING_BALANCE;
    DOM.betEl.textContent = '0';
    DOM.dealerCards.innerHTML = '';
    DOM.playerCards.innerHTML = '';
    DOM.playerCards2.innerHTML = '';
    DOM.dealerValue.textContent = '';
    DOM.playerValue.textContent = '';
    DOM.playerValue2.textContent = '';
    DOM.dealerResult.textContent = '';
    DOM.dealerResult.className = 'bj-hand-result';
    DOM.playerResult.textContent = '';
    DOM.playerResult.className = 'bj-hand-result';
    DOM.playerResult2.textContent = '';
    DOM.playerResult2.className = 'bj-hand-result';
    setMessage('Welcome! Place your bet.');
    updateStats();
    render();
  }

  // ===== EVENTS =====
  function bindEvents() {
    DOM.btnDeal.addEventListener('click', deal);
    DOM.btnHit.addEventListener('click', hit);
    DOM.btnStand.addEventListener('click', stand);
    DOM.btnDouble.addEventListener('click', doubleDown);
    DOM.btnSplit.addEventListener('click', splitHand);
    DOM.btnNewGame.addEventListener('click', newGame);

    DOM.btnInsurance.addEventListener('click', () => takeInsurance(true));

    // "No Insurance" — click deal again
    DOM.btnDeal.addEventListener('dblclick', () => {
      if (state.phase === 'insurance') takeInsurance(false);
    });

    // Chips
    DOM.chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        const val = parseInt(chip.dataset.value);
        placeBet(val);
      });
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      switch (e.key.toLowerCase()) {
        case 'd':
          if (!DOM.btnDeal.disabled) deal();
          break;
        case 'h':
          if (!DOM.btnHit.disabled) hit();
          break;
        case 's':
          if (!DOM.btnStand.disabled) stand();
          break;
        case 'x':
          if (!DOM.btnDouble.disabled) doubleDown();
          break;
        case '/':
          if (!DOM.btnSplit.disabled) splitHand();
          break;
        case 'i':
          if (!DOM.btnInsurance.disabled) takeInsurance(true);
          break;
        case 'n':
          if (!DOM.btnNewGame.disabled) newGame();
          break;
        case 'c':
          clearBet();
          break;
      }
    });

    // Rules toggle
    if (DOM.rulesBtn && DOM.rulesFlyout) {
      DOM.rulesBtn.addEventListener('click', () => {
        DOM.rulesFlyout.classList.toggle('open');
      });
      document.addEventListener('click', (e) => {
        if (!DOM.rulesFlyout.contains(e.target) && e.target !== DOM.rulesBtn && !DOM.rulesBtn.contains(e.target)) {
          DOM.rulesFlyout.classList.remove('open');
        }
      });
    }
  }

  // ===== BOOT =====
  function init() {
    cacheDOM();
    initState();
    setMessage('Place your bet!');
    updateStats();
    render();
    bindEvents();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose for UI buttons
  window.bjTakeInsurance = takeInsurance;
  window.bjClearBet = clearBet;
  window.bjNewGame = newGame;
  window.bjDeal = deal;

  // Expose game state for AI Coach integration
  window.gameAPI = {
    getState: () => ({ ...state }),
    getPlayerHands: () => state.playerHands.map(h => [...h]),
    getDealerHand: () => [...state.dealerHand],
    getPhase: () => state.phase,
    getBet: () => state.bet,
    getBalance: () => state.balance,
    isSplit: () => state.isSplit,
    isDouble: () => state.isDouble,
    getCurrentHand: () => state.currentHand,
    getStats: () => ({
      handsPlayed: state.handsPlayed,
      handsWon: state.handsWon,
      handsLost: state.handsLost,
      handsPushed: state.handsPushed,
      blackjacks: state.blackjacks,
    }),
  };
})();
