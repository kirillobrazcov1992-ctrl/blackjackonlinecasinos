/* ==========================================
   BlackjackOnlineCasinos.com — Card Counting Trainer
   Hi-Lo system: 2-6 = +1, 7-9 = 0, 10-A = -1
   ========================================== */

(function () {
  'use strict';

  // ===== CONFIG =====
  const CONFIG = {
    ROUNDS_DEFAULT: 20,
    SPEED_DEFAULT: 1500, // ms between cards
    DECK_PENETRATION: 0.75,
  };

  // ===== DOM =====
  const $ = (s) => document.querySelector(s);
  const $$ = (s) => document.querySelectorAll(s);

  const DOM = {};

  function cacheDOM() {
    DOM.timer = $('#ccTimer');
    DOM.runningCount = $('#ccRunningCount');
    DOM.trueCount = $('#ccTrueCount');
    DOM.cardDisplay = $('#ccCardDisplay');
    DOM.cardHistory = $('#ccCardHistory');
    DOM.feedback = $('#ccFeedback');
    DOM.score = $('#ccScore');
    DOM.rounds = $('#ccRounds');
    DOM.btnStart = $('#ccStart');
    DOM.btnSubmit = $('#ccSubmit');
    DOM.btnNext = $('#ccNext');
    DOM.btnReset = $('#ccReset');
    DOM.speedRange = $('#ccSpeed');
    DOM.speedLabel = $('#ccSpeedLabel');
    DOM.roundsSelect = $('#ccRoundsSelect');
    DOM.decksSelect = $('#ccDecksSelect');
    DOM.streak = $('#ccStreak');
    DOM.bestStreak = $('#ccBestStreak');
    DOM.totalRounds = $('#ccTotalRounds');
    DOM.accuracy = $('#ccAccuracy');
    DOM.chart = $('#ccChart');
  }

  // ===== GAME STATE =====
  let state = {};

  function initState() {
    state = {
      phase: 'idle', // 'idle' | 'showing' | 'guessing' | 'result'
      cards: [],
      index: 0,
      runningCount: 0,
      decksRemaining: 6,
      correct: 0,
      wrong: 0,
      streak: 0,
      bestStreak: 0,
      totalRounds: 0,
      totalCorrect: 0,
      totalWrong: 0,
      history: [],
      timer: null,
      speed: CONFIG.SPEED_DEFAULT,
      rounds: CONFIG.ROUNDS_DEFAULT,
      decks: 6,
      chartData: [],
    };
  }

  // ===== CARDS =====
  const SUITS = ['♠', '♥', '♦', '♣'];
  const RANKS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

  function randomCard() {
    return {
      rank: RANKS[Math.floor(Math.random() * RANKS.length)],
      suit: SUITS[Math.floor(Math.random() * SUITS.length)],
    };
  }

  function hiLoValue(rank) {
    if (['2', '3', '4', '5', '6'].includes(rank)) return 1;
    if (['7', '8', '9'].includes(rank)) return 0;
    return -1; // 10, J, Q, K, A
  }

  function cardColor(suit) {
    return suit === '♥' || suit === '♦' ? 'red' : 'black';
  }

  function generateCards(count) {
    const cards = [];
    for (let i = 0; i < count; i++) {
      cards.push(randomCard());
    }
    return cards;
  }

  // ===== RENDER =====
  function renderCard(card) {
    if (!DOM.cardDisplay) return;
    const color = cardColor(card.suit);
    DOM.cardDisplay.innerHTML = `
      <div class="cc-card cc-card--${color}" style="animation: cardDeal 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; opacity:0;">
        <span class="cc-card__rank">${card.rank}</span>
        <span class="cc-card__suit">${card.suit}</span>
      </div>
    `;
    DOM.cardDisplay.style.display = 'flex';
  }

  function clearCard() {
    DOM.cardDisplay.innerHTML = '';
    DOM.cardDisplay.style.display = 'none';
  }

  function addHistoryDot(card, value) {
    if (!DOM.cardHistory) return;
    const dot = document.createElement('span');
    const color = cardColor(card.suit);
    dot.className = `cc-history-dot cc-history-dot--${value > 0 ? 'plus' : value < 0 ? 'minus' : 'neutral'}`;
    dot.innerHTML = `<span class="cc-history-dot__card" style="color:${color === 'red' ? '#dc2626' : '#1a1a1a'}">${card.rank}${card.suit}</span>
      <span class="cc-history-dot__val">${value > 0 ? '+' : ''}${value}</span>`;
    DOM.cardHistory.appendChild(dot);
    DOM.cardHistory.scrollTop = DOM.cardHistory.scrollHeight;
  }

  function updateDisplay() {
    DOM.runningCount.textContent = state.runningCount;
    const rc = state.runningCount;
    DOM.runningCount.style.color = rc > 0 ? '#22c55e' : rc < 0 ? '#ef4444' : 'var(--color-gold)';

    const decks = Math.max(1, state.decks - (state.index / 52) * state.decks);
    const tc = decks > 0 ? Math.round(rc / decks) : 0;
    DOM.trueCount.textContent = tc;
    DOM.trueCount.style.color = tc > 0 ? '#22c55e' : tc < 0 ? '#ef4444' : 'var(--color-text-muted)';

    DOM.rounds.textContent = `${Math.min(state.index, state.cards.length)} / ${state.cards.length}`;
  }

  function updateScore() {
    DOM.score.textContent = `${state.correct} / ${state.correct + state.wrong}`;
    DOM.streak.textContent = state.streak;
    DOM.bestStreak.textContent = state.bestStreak;
    DOM.totalRounds.textContent = state.totalRounds;
    const acc = state.totalRounds > 0 ? Math.round((state.totalCorrect / state.totalRounds) * 100) : 0;
    DOM.accuracy.textContent = `${acc}%`;
  }

  function updateChart() {
    if (!DOM.chart) return;
    // Simple bar chart using divs
    const data = state.chartData.slice(-20);
    DOM.chart.innerHTML = data
      .map((d) => {
        const h = Math.min(Math.abs(d) * 10, 60);
        const color = d > 0 ? '#22c55e' : d < 0 ? '#ef4444' : 'var(--color-gold)';
        return `<div class="cc-chart-bar" style="height:${Math.max(h, 4)}px;background:${color};" title="Running count: ${d}"></div>`;
      })
      .join('');
  }

  function setFeedback(msg, type) {
    DOM.feedback.textContent = msg;
    DOM.feedback.className = 'cc-feedback';
    if (type) DOM.feedback.classList.add(`cc-feedback--${type}`);
  }

  // ===== GAME LOGIC =====
  function startRound() {
    if (state.phase !== 'idle') return;

    const count = parseInt(DOM.roundsSelect.value) || CONFIG.ROUNDS_DEFAULT;
    const decks = parseInt(DOM.decksSelect.value) || 6;
    state.rounds = count;
    state.decks = decks;
    state.cards = generateCards(count);
    state.index = 0;
    state.runningCount = 0;
    state.correct = 0;
    state.wrong = 0;
    state.streak = 0;
    state.history = [];
    state.chartData = [];

    DOM.cardHistory.innerHTML = '';
    clearCard();
    DOM.btnStart.style.display = 'none';
    DOM.btnSubmit.style.display = 'none';
    DOM.btnNext.style.display = 'none';
    DOM.btnReset.style.display = 'inline-flex';
    DOM.speedRange.disabled = true;
    DOM.roundsSelect.disabled = true;
    DOM.decksSelect.disabled = true;
    DOM.timer.style.display = 'block';

    setFeedback('Watch the cards and keep the running count...');
    updateDisplay();
    updateScore();

    state.phase = 'showing';
    showNextCard();
  }

  function showNextCard() {
    if (state.index >= state.cards.length) {
      // Show guess phase
      state.phase = 'guessing';
      DOM.timer.style.display = 'none';
      clearCard();
      setFeedback('What is the final running count?');
      DOM.btnSubmit.style.display = 'inline-flex';
      DOM.btnSubmit.disabled = false;
      DOM.btnSubmit.innerHTML = '<i class="fas fa-check"></i> Submit Count';
      DOM.btnSubmit.className = 'btn btn--primary';

      // Show input
      let input = document.getElementById('ccGuessInput');
      if (!input) {
        input = document.createElement('div');
        input.id = 'ccGuessInput';
        input.className = 'cc-guess-input';
        input.style.cssText = 'text-align:center;margin:16px 0;display:flex;gap:10px;justify-content:center;align-items:center;flex-wrap:wrap;';
        DOM.feedback.parentNode.insertBefore(input, DOM.feedback.nextSibling);
      }
      input.innerHTML = `
        <label style="color:var(--color-text-muted);font-family:var(--font-primary);font-weight:600;font-size:0.95rem;">Running Count:</label>
        <input type="number" id="ccGuessValue" class="form-control" style="width:100px;text-align:center;font-size:1.2rem;font-weight:700;" value="0" autofocus>
      `;
      input.style.display = 'flex';

      DOM.btnNext.style.display = 'none';
      return;
    }

    const card = state.cards[state.index];
    const val = hiLoValue(card.rank);
    state.runningCount += val;
    state.chartData.push(state.runningCount);

    renderCard(card);
    addHistoryDot(card, val);
    updateDisplay();
    updateChart();

    state.index++;

    state.timer = setTimeout(() => {
      showNextCard();
    }, state.speed);
  }

  function submitGuess() {
    if (state.phase !== 'guessing') return;

    const input = document.getElementById('ccGuessValue');
    const guess = parseInt(input?.value);
    if (isNaN(guess)) {
      setFeedback('Enter a number!', 'error');
      return;
    }

    const actual = state.runningCount;
    const correct = guess === actual;

    state.phase = 'result';

    // Hide input
    const inputWrap = document.getElementById('ccGuessInput');
    if (inputWrap) inputWrap.style.display = 'none';

    DOM.btnSubmit.style.display = 'none';
    DOM.btnNext.style.display = 'inline-flex';
    DOM.btnNext.innerHTML = '<i class="fas fa-redo"></i> Next Round';
    DOM.btnNext.className = 'btn btn--primary';

    state.totalRounds++;
    if (correct) {
      state.totalCorrect++;
      state.correct++;
      state.streak++;
      if (state.streak > state.bestStreak) state.bestStreak = state.streak;
      setFeedback(`✅ Correct! Running count was ${actual >= 0 ? '+' : ''}${actual}. ${actual > 0 ? 'Deck is hot! 🔥' : actual < 0 ? 'Cold deck. 🥶' : 'Neutral deck.'}`, 'success');
    } else {
      state.totalWrong++;
      state.wrong++;
      state.streak = 0;
      setFeedback(`❌ Incorrect. Actual count: ${actual >= 0 ? '+' : ''}${actual}`, 'error');
    }

    updateScore();
    DOM.btnNext.disabled = false;
  }

  function nextRound() {
    if (state.phase === 'result') {
      // Reset for new round
      state.phase = 'idle';
      state.speed = parseInt(DOM.speedRange.value) * 100 || CONFIG.SPEED_DEFAULT;
      DOM.btnStart.style.display = 'inline-flex';
      DOM.btnNext.style.display = 'none';
      DOM.btnReset.style.display = 'inline-flex';
      DOM.roundsSelect.disabled = false;
      DOM.decksSelect.disabled = false;
      DOM.speedRange.disabled = false;
      DOM.cardHistory.innerHTML = '';
      clearCard();
      DOM.runningCount.textContent = '0';
      DOM.runningCount.style.color = 'var(--color-gold)';
      DOM.trueCount.textContent = '0';
      DOM.trueCount.style.color = 'var(--color-text-muted)';
      DOM.rounds.textContent = '0 / 0';
      DOM.chartData = [];
      updateChart();
      setFeedback('Ready! Click "Start Round" to begin.');
    }
  }

  function resetTrainer() {
    if (state.timer) clearTimeout(state.timer);
    initState();
    DOM.cardHistory.innerHTML = '';
    clearCard();
    DOM.btnStart.style.display = 'inline-flex';
    DOM.btnSubmit.style.display = 'none';
    DOM.btnNext.style.display = 'none';
    DOM.timer.style.display = 'none';
    DOM.roundsSelect.disabled = false;
    DOM.decksSelect.disabled = false;
    DOM.speedRange.disabled = false;
    DOM.runningCount.textContent = '0';
    DOM.runningCount.style.color = 'var(--color-gold)';
    DOM.trueCount.textContent = '0';
    DOM.trueCount.style.color = 'var(--color-text-muted)';
    DOM.rounds.textContent = '0 / 0';
    DOM.score.textContent = '0 / 0';
    DOM.streak.textContent = '0';
    DOM.chartData = [];
    updateChart();
    setFeedback('Reset. Click "Start Round" to begin.');

    const inputWrap = document.getElementById('ccGuessInput');
    if (inputWrap) inputWrap.style.display = 'none';
  }

  // ===== EVENTS =====
  function bindEvents() {
    DOM.btnStart.addEventListener('click', startRound);
    DOM.btnSubmit.addEventListener('click', submitGuess);
    DOM.btnNext.addEventListener('click', nextRound);
    DOM.btnReset.addEventListener('click', resetTrainer);

    // Speed slider
    if (DOM.speedRange && DOM.speedLabel) {
      DOM.speedRange.addEventListener('input', () => {
        const val = parseInt(DOM.speedRange.value);
        DOM.speedLabel.textContent = val + 's';
        state.speed = val * 1000;
      });
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      switch (e.key.toLowerCase()) {
        case 's':
          if (state.phase === 'idle') startRound();
          break;
        case 'enter':
          if (state.phase === 'guessing') submitGuess();
          break;
        case 'n':
          if (state.phase === 'result') nextRound();
          break;
        case 'r':
          resetTrainer();
          break;
      }
    });

    // Enter key on guess input
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && state.phase === 'guessing') {
        const input = document.getElementById('ccGuessValue');
        if (input && document.activeElement === input) {
          submitGuess();
        }
      }
    });
  }

  // ===== BOOT =====
  function init() {
    cacheDOM();
    initState();
    setFeedback('Ready! Select rounds and speed, then click "Start Round".');
    DOM.btnStart.style.display = 'inline-flex';
    DOM.btnSubmit.style.display = 'none';
    DOM.btnNext.style.display = 'none';
    DOM.timer.style.display = 'none';

    // Speed label
    if (DOM.speedRange && DOM.speedLabel) {
      DOM.speedLabel.textContent = DOM.speedRange.value + 's';
      state.speed = parseInt(DOM.speedRange.value) * 1000;
    }

    bindEvents();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
