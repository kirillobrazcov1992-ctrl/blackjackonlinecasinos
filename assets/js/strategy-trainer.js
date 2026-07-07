/* ==========================================
   BlackjackOnlineCasinos.com — Strategy Trainer
   Practice basic blackjack strategy
   ========================================== */

(function () {
  'use strict';

  // ===== DOM =====
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => document.querySelectorAll(s);

  const DOM = {};

  function cacheDOM() {
    DOM.yourCards = $('#stYourCards');
    DOM.yourValue = $('#stYourValue');
    DOM.dealerCard = $('#stDealerCard');
    DOM.dealerValue = $('#stDealerValue');
    DOM.handDesc = $('#stHandDesc');
    DOM.feedback = $('#stFeedback');
    DOM.feedbackBox = $('#stFeedbackBox');
    DOM.score = $('#stScore');
    DOM.streak = $('#stStreak');
    DOM.bestStreak = $('#stBestStreak');
    DOM.totalHands = $('#stTotalHands');
    DOM.accuracy = $('#stAccuracy');
    DOM.cardHistory = $('#stCardHistory');
    DOM.btnHit = $('#stHit');
    DOM.btnStand = $('#stStand');
    DOM.btnDouble = $('#stDouble');
    DOM.btnSplit = $('#stSplit');
    DOM.btnSurrender = $('#stSurrender');
    DOM.btnNext = $('#stNext');
    DOM.btnHint = $('#stHint');
    DOM.hintBox = $('#stHintBox');
  }

  // ===== STATE =====
  let state = {};

  function initState() {
    state = {
      phase: 'idle', // 'idle' | 'playing' | 'result'
      playerHand: [],
      dealerCard: null,
      correctPlay: null,
      correct: 0,
      wrong: 0,
      streak: 0,
      bestStreak: 0,
      totalHands: 0,
      history: [],
      streakHistory: [], // for chart
    };
  }

  // ===== CARDS =====
  const SUITS = ['♠', '♥', '♦', '♣'];
  const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

  function randomCard() {
    return {
      rank: RANKS[Math.floor(Math.random() * RANKS.length)],
      suit: SUITS[Math.floor(Math.random() * SUITS.length)],
      value: cardValue(RANKS[Math.floor(Math.random() * RANKS.length)]),
    };
  }

  function cardValue(rank) {
    if (rank === 'A') return 11;
    if (['K', 'Q', 'J'].includes(rank)) return 10;
    return parseInt(rank);
  }

  function handTotal(hand) {
    let val = hand.reduce((s, c) => s + c.value, 0);
    let aces = hand.filter((c) => c.rank === 'A').length;
    while (val > 21 && aces > 0) {
      val -= 10;
      aces--;
    }
    return val;
  }

  function isSoft(hand) {
    return hand.filter((c) => c.rank === 'A').length > 0 && handTotal(hand) <= 21;
  }

  function cardColor(suit) {
    return suit === '♥' || suit === '♦' ? 'red' : 'black';
  }

  // ===== BASIC STRATEGY =====
  // Returns: 'H' (Hit), 'S' (Stand), 'D' (Double), 'P' (Split), 'U' (Surrender)
  // Based on 6-deck, H17, DAS, no RSA, late surrender
  function getCorrectPlay(playerHand, dealerRank) {
    const dv = cardValue(dealerRank);
    const total = handTotal(playerHand);
    const isSoftHand = isSoft(playerHand);
    const canSplitHand = playerHand.length === 2 && playerHand[0].rank === playerHand[1].rank;
    const isPair = canSplitHand;
    const pRank = playerHand[0].rank;

    // Pairs
    if (isPair) {
      // A-A: always split
      if (pRank === 'A') return 'P';
      // 8-8: always split
      if (pRank === '8') return 'P';
      // 2-2, 3-3: split vs 2-7
      if (['2', '3'].includes(pRank)) {
        if (dv >= 2 && dv <= 7) return 'P';
        return 'H';
      }
      // 4-4: split vs 5-6
      if (pRank === '4') {
        if (dv === 5 || dv === 6) return 'P';
        return 'H';
      }
      // 6-6: split vs 2-6
      if (pRank === '6') {
        if (dv >= 2 && dv <= 6) return 'P';
        return 'H';
      }
      // 7-7: split vs 2-7
      if (pRank === '7') {
        if (dv >= 2 && dv <= 7) return 'P';
        return 'H';
      }
      // 9-9: split vs 2-6, 8-9
      if (pRank === '9') {
        if ((dv >= 2 && dv <= 6) || dv === 8 || dv === 9) return 'P';
        return 'S';
      }
      // 10-10: never split
      if (pRank === '10' || pRank === 'J' || pRank === 'Q' || pRank === 'K') {
        return 'S';
      }
    }

    // Soft hands
    if (isSoftHand) {
      if (total >= 19) {
        return 'S';
      }
      if (total === 18) {
        if (dv >= 3 && dv <= 6) return 'D';
        if (dv === 2 || dv === 7 || dv === 8) return 'S';
        if (dv === 9 || dv === 10 || dv === 1) return 'H';
        return 'H';
      }
      if (total === 17) {
        if (dv >= 3 && dv <= 6) return 'D';
        return 'H';
      }
      if (total === 16 || total === 15) {
        if (dv >= 4 && dv <= 6) return 'D';
        return 'H';
      }
      if (total === 14 || total === 13) {
        if (dv >= 5 && dv <= 6) return 'D';
        return 'H';
      }
      return 'H';
    }

    // Hard hands
    // 17+: always stand
    if (total >= 17) {
      return 'S';
    }

    // 13-16
    if (total >= 13 && total <= 16) {
      if (dv >= 2 && dv <= 6) return 'S';
      // Surrender 15 vs 10, 16 vs 9/10/A
      if (total === 15 && dv === 10) return 'U';
      if (total === 16 && (dv === 9 || dv === 10 || dv === 1)) return 'U';
      return 'H';
    }

    // 12
    if (total === 12) {
      if (dv >= 4 && dv <= 6) return 'S';
      return 'H';
    }

    // 11: double against everything except ace (hit)
    if (total === 11) {
      if (dv === 1) return 'H';
      return 'D';
    }

    // 10: double against 2-9
    if (total === 10) {
      if (dv >= 2 && dv <= 9) return 'D';
      return 'H';
    }

    // 9: double against 3-6
    if (total === 9) {
      if (dv >= 3 && dv <= 6) return 'D';
      return 'H';
    }

    // 8 or less: always hit
    return 'H';
  }

  // ===== GENERATE HAND =====
  function generateHand() {
    const hand = [];
    // Generate a realistic player hand (2 cards)
    const r1 = RANKS[Math.floor(Math.random() * RANKS.length)];
    const r2 = RANKS[Math.floor(Math.random() * RANKS.length)];
    hand.push({ rank: r1, suit: SUITS[Math.floor(Math.random() * SUITS.length)], value: cardValue(r1) });
    hand.push({ rank: r2, suit: SUITS[Math.floor(Math.random() * SUITS.length)], value: cardValue(r2) });

    const dealerRank = RANKS[Math.floor(Math.random() * RANKS.length)];
    const dealerSuit = SUITS[Math.floor(Math.random() * SUITS.length)];

    state.playerHand = hand;
    state.dealerCard = { rank: dealerRank, suit: dealerSuit, value: cardValue(dealerRank) };
    state.correctPlay = getCorrectPlay(hand, dealerRank);
    state.phase = 'playing';
  }

  // ===== RENDER =====
  function renderHand() {
    // Player cards
    DOM.yourCards.innerHTML = state.playerHand
      .map((c) => {
        const color = cardColor(c.suit);
        return `<div class="bj-card bj-card--${color}" style="animation:cardDeal 0.3s ease forwards;opacity:0;">
          <span class="bj-card-rank">${c.rank}</span>
          <span class="bj-card-suit">${c.suit}</span>
        </div>`;
      })
      .join('');

    DOM.yourValue.textContent = handTotal(state.playerHand);
    DOM.yourValue.style.display = 'block';

    // Dealer card
    const dColor = cardColor(state.dealerCard.suit);
    DOM.dealerCard.innerHTML = `<div class="bj-card bj-card--${dColor}" style="animation:cardDeal 0.3s ease forwards;opacity:0;">
      <span class="bj-card-rank">${state.dealerCard.rank}</span>
      <span class="bj-card-suit">${state.dealerCard.suit}</span>
    </div>`;
    DOM.dealerValue.textContent = cardValue(state.dealerCard.rank);
    DOM.dealerValue.style.display = 'block';

    // Hand description
    const card1 = state.playerHand[0];
    const card2 = state.playerHand[1];
    const total = handTotal(state.playerHand);
    const soft = isSoft(state.playerHand);

    let desc = '';
    if (card1.rank === card2.rank && state.playerHand.length === 2) {
      desc = `Pair of ${card1.rank}s`;
    } else if (soft) {
      desc = `Soft ${total}`;
    } else {
      desc = `Hard ${total}`;
    }
    DOM.handDesc.textContent = `${desc} vs Dealer ${state.dealerCard.rank}`;

    // Hide/show controls
    state.phase = 'playing';
    DOM.btnHit.disabled = false;
    DOM.btnStand.disabled = false;
    DOM.btnDouble.disabled = total > 21;
    DOM.btnSplit.disabled = !(card1.rank === card2.rank && state.playerHand.length === 2);
    DOM.btnSurrender.disabled = false;
    DOM.btnNext.style.display = 'none';
    DOM.btnHint.disabled = false;

    DOM.feedbackBox.style.display = 'none';
    DOM.hintBox.classList.remove('open');
  }

  function showResult(isCorrect, correctPlay) {
    state.phase = 'result';
    state.totalHands++;

    const playNames = {
      H: 'Hit',
      S: 'Stand',
      D: 'Double Down',
      P: 'Split',
      U: 'Surrender',
    };

    if (isCorrect) {
      state.correct++;
      state.streak++;
      if (state.streak > state.bestStreak) state.bestStreak = state.streak;
      DOM.feedback.textContent = `✅ Correct! ${playNames[correctPlay]} is the right play.`;
      DOM.feedback.className = 'st-feedback st-feedback--correct';
      addHistoryDot('W');
    } else {
      state.wrong++;
      state.streak = 0;
      DOM.feedback.textContent = `❌ Wrong. The correct play is ${playNames[correctPlay]}.`;
      DOM.feedback.className = 'st-feedback st-feedback--wrong';
      addHistoryDot('L');
    }

    DOM.feedbackBox.style.display = 'block';
    DOM.btnHit.disabled = true;
    DOM.btnStand.disabled = true;
    DOM.btnDouble.disabled = true;
    DOM.btnSplit.disabled = true;
    DOM.btnSurrender.disabled = true;
    DOM.btnHint.disabled = true;
    DOM.btnNext.style.display = 'inline-flex';
    DOM.btnNext.innerHTML = '<i class="fas fa-arrow-right"></i> Next Hand';
    DOM.btnNext.className = 'btn btn--primary';

    updateStats();
  }

  function addHistoryDot(type) {
    const dot = document.createElement('span');
    dot.className = `st-history-dot st-history-dot--${type === 'W' ? 'win' : 'lose'}`;
    dot.textContent = type;
    DOM.cardHistory.appendChild(dot);
    DOM.cardHistory.scrollTop = DOM.cardHistory.scrollHeight;
  }

  function updateStats() {
    DOM.score.textContent = `${state.correct} / ${state.totalHands}`;
    DOM.streak.textContent = state.streak;
    DOM.bestStreak.textContent = state.bestStreak;
    DOM.totalHands.textContent = state.totalHands;
    const acc = state.totalHands > 0 ? Math.round((state.correct / state.totalHands) * 100) : 0;
    DOM.accuracy.textContent = `${acc}%`;
  }

  // ===== ACTIONS =====
  function playerAction(action) {
    if (state.phase !== 'playing') return;
    state.phase = 'result';
    const correct = action === state.correctPlay;
    showResult(correct, state.correctPlay);
  }

  function nextHand() {
    if (state.phase !== 'result') return;
    state.phase = 'idle';
    generateHand();
    renderHand();
  }

  function showHint() {
    if (state.phase !== 'playing') return;
    const playNames = {
      H: 'Hit',
      S: 'Stand',
      D: 'Double Down',
      P: 'Split',
      U: 'Surrender',
    };
    DOM.hintBox.textContent = `💡 Hint: Try "${playNames[state.correctPlay]}"`;
    DOM.hintBox.classList.toggle('open');
  }

  function resetTrainer() {
    if (state.phase === 'result' || state.phase === 'playing') {
      initState();
      DOM.yourCards.innerHTML = '';
      DOM.dealerCard.innerHTML = '';
      DOM.yourValue.style.display = 'none';
      DOM.dealerValue.style.display = 'none';
      DOM.handDesc.textContent = 'Click "New Hand" to start.';
      DOM.feedbackBox.style.display = 'none';
      DOM.btnNext.style.display = 'none';
      DOM.btnHit.disabled = true;
      DOM.btnStand.disabled = true;
      DOM.btnDouble.disabled = true;
      DOM.btnSplit.disabled = true;
      DOM.btnSurrender.disabled = true;
      DOM.btnHint.disabled = true;
      DOM.cardHistory.innerHTML = '';
      DOM.hintBox.classList.remove('open');
      updateStats();
    }
  }

  // ===== EVENTS =====
  function bindEvents() {
    DOM.btnHit.addEventListener('click', () => playerAction('H'));
    DOM.btnStand.addEventListener('click', () => playerAction('S'));
    DOM.btnDouble.addEventListener('click', () => playerAction('D'));
    DOM.btnSplit.addEventListener('click', () => playerAction('P'));
    DOM.btnSurrender.addEventListener('click', () => playerAction('U'));
    DOM.btnNext.addEventListener('click', nextHand);
    DOM.btnHint.addEventListener('click', showHint);

    // "New Hand" button - start first hand
    const newHandBtn = document.getElementById('stNewHand');
    if (newHandBtn) {
      newHandBtn.addEventListener('click', () => {
        if (state.phase === 'idle' || state.phase === 'result') {
          if (state.phase === 'result') {
            initState();
            DOM.cardHistory.innerHTML = '';
          }
          generateHand();
          renderHand();
          updateStats();
        }
      });
    }

    document.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (state.phase !== 'playing') {
        if (e.key.toLowerCase() === 'n' && state.phase === 'result') nextHand();
        return;
      }
      switch (e.key.toLowerCase()) {
        case 'h':
          if (!DOM.btnHit.disabled) playerAction('H');
          break;
        case 's':
          if (!DOM.btnStand.disabled) playerAction('S');
          break;
        case 'd':
          if (!DOM.btnDouble.disabled) playerAction('D');
          break;
        case 'p':
          if (!DOM.btnSplit.disabled) playerAction('P');
          break;
        case 'u':
          if (!DOM.btnSurrender.disabled) playerAction('U');
          break;
        case '?':
          showHint();
          break;
        case 'n':
          if (state.phase === 'result') nextHand();
          break;
      }
    });
  }

  // ===== BOOT =====
  function init() {
    cacheDOM();
    initState();
    DOM.handDesc.textContent = 'Click "New Hand" to start.';
    DOM.btnHit.disabled = true;
    DOM.btnStand.disabled = true;
    DOM.btnDouble.disabled = true;
    DOM.btnSplit.disabled = true;
    DOM.btnSurrender.disabled = true;
    DOM.btnHint.disabled = true;
    DOM.btnNext.style.display = 'none';
    DOM.feedbackBox.style.display = 'none';
    updateStats();
    bindEvents();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
