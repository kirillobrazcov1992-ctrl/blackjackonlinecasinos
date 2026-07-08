/* ========================================
   BlackjackOnlineCasinos.com — AI Coach System
   Real-time strategy analysis & EV-based coaching
   ======================================== */

const AICoach = (() => {
    'use strict';

    // ===== STATE =====
    let enabled = true;
    let hintMode = 'after'; // 'after' | 'during' | 'off'
    let currentAnalysis = null;
    let gameState = null;
    let listeners = [];

    // ===== DEALER UPCARD MAPPING =====
    function dealerUpcardIndex(card) {
        const rank = card.rank;
        if (rank === 'A') return 9;
        const val = parseInt(rank) || 10;
        return val - 2;
    }

    // ===== ANALYZE DECISION =====
    function analyze(playerCards, dealerCard) {
        if (!playerCards || !playerCards.length || !dealerCard) return null;

        const c1 = playerCards[0];
        const c2 = playerCards.length > 1 ? playerCards[1] : null;
        if (!c2) return null;

        const dealerIdx = dealerUpcardIndex(dealerCard);
        if (dealerIdx === undefined) return null;

        const optimalAction = StrategyCalc.getAction(c1.rank, c2.rank, dealerIdx);
        const label = StrategyCalc.actionLabel(optimalAction);
        const color = StrategyCalc.actionColor(optimalAction);
        const icon = StrategyCalc.actionIcon(optimalAction);

        return {
            optimalAction,
            label,
            color,
            icon,
            dealerUpcard: dealerCard.rank,
            playerCards: [c1.rank, c2.rank],
            playerValue: handTotal(playerCards),
            dealerIdx,
        };
    }

    function handTotal(cards) {
        let val = cards.reduce((s, c) => s + c.value, 0);
        let aces = cards.filter(c => c.rank === 'A').length;
        while (val > 21 && aces > 0) { val -= 10; aces--; }
        return val;
    }

    // ===== EV ESTIMATE (simplified but educational) =====
    function estimateEV(playerCards, dealerCard, action) {
        // Simple EV estimation based on basic strategy principles
        const total = handTotal(playerCards);
        const dealerIdx = dealerUpcardIndex(dealerCard);
        const dealerUp = dealerCard.rank;
        const dealerVal = parseInt(dealerUp) || (dealerUp === 'A' ? 11 : 10);

        // Very simplified EV ranges for educational purposes
        // These are approximate values to give players a sense of good/bad decisions
        if (action === 'P') return { value: 0.25, range: '+0.20 to +0.30' };
        if (action === 'D') {
            if (total >= 11 && dealerVal <= 6) return { value: 0.35, range: '+0.30 to +0.40' };
            if (total === 10 || total === 9) return { value: 0.20, range: '+0.15 to +0.25' };
            return { value: 0.15, range: '+0.10 to +0.20' };
        }
        if (action === 'S') {
            if (total >= 17) return { value: 0.15, range: '+0.10 to +0.20' };
            if (total >= 12 && dealerVal <= 6) return { value: 0.10, range: '+0.05 to +0.15' };
            return { value: 0.05, range: '0.00 to +0.10' };
        }
        if (action === 'H') {
            if (total <= 11) return { value: -0.05, range: '-0.10 to 0.00' };
            if (total === 12 && dealerVal >= 7) return { value: -0.15, range: '-0.20 to -0.10' };
            return { value: -0.10, range: '-0.15 to -0.05' };
        }
        if (action === 'RH') return { value: -0.20, range: '-0.25 to -0.15' };
        if (action === 'RS') return { value: -0.25, range: '-0.30 to -0.20' };
        return { value: 0.0, range: '-0.05 to +0.05' };
    }

    // ===== CHECK PLAYER'S DECISION =====
    function checkDecision(playerAction) {
        if (!currentAnalysis) return null;
        const optimal = currentAnalysis.optimalAction;

        let isCorrect = false;
        // Map player action to strategy notation
        const actionMap = {
            'hit': 'H',
            'stand': 'S',
            'double': 'D',
            'split': 'P',
            'surrender': 'RH',
        };
        const mappedAction = actionMap[playerAction] || playerAction;
        isCorrect = mappedAction === optimal;

        return {
            isCorrect,
            optimal,
            playerAction: mappedAction,
            analysis: currentAnalysis,
            ev: estimateEV(
                gameState?.playerCards || currentAnalysis.playerCards.map(r => ({ rank: r, value: parseInt(r) || 10 })),
                gameState?.dealerCard || { rank: currentAnalysis.dealerUpcard, value: parseInt(currentAnalysis.dealerUpcard) || 10 },
                optimal
            ),
        };
    }

    // ===== GENERATE COACH MESSAGE =====
    function generateMessage(result) {
        if (!result) return '';

        const { isCorrect, optimal, analysis, ev } = result;
        const label = StrategyCalc.actionLabel(optimal);
        const evStr = ev && ev.value !== undefined
            ? `EV ${ev.value >= 0 ? '+' : ''}${(ev.value * 100).toFixed(0)}%`
            : '';

        if (isCorrect) {
            return `✅ Correct! ${label} is the optimal play. ${evStr}`;
        } else {
            const correctLabel = StrategyCalc.actionLabel(optimal);
            return `⚠️ Optimal play: ${correctLabel}. You chose: ${result.playerAction}. ${evStr}`;
        }
    }

    // ===== SET GAME STATE =====
    function setGameState(state) {
        gameState = state;
    }

    // ===== ANALYZE CURRENT HAND =====
    function analyzeCurrentHand(playerCards, dealerCard) {
        if (!enabled || hintMode === 'off') return null;
        currentAnalysis = analyze(playerCards, dealerCard);
        return currentAnalysis;
    }

    // ===== TOGGLE =====
    function toggle() {
        enabled = !enabled;
        notifyListeners('toggle', { enabled });
        return enabled;
    }

    function setHintMode(mode) {
        hintMode = mode;
        if (mode === 'off') enabled = false;
        else enabled = true;
        notifyListeners('mode', { mode });
    }

    // ===== EVENTS =====
    function onEvent(callback) {
        listeners.push(callback);
        return () => { listeners = listeners.filter(l => l !== callback); };
    }

    function notifyListeners(type, data) {
        listeners.forEach(l => { try { l(type, data); } catch (e) { /* */ } });
    }

    // ===== INIT =====
    function init() {
        // Load settings from PlayerProfile
        if (window.PlayerProfile) {
            const profile = PlayerProfile.getProfile();
            if (profile) {
                enabled = profile.coachEnabled !== undefined ? profile.coachEnabled : true;
                hintMode = profile.coachHintMode || 'after';
            }
            PlayerProfile.onEvent((type) => {
                if (type === 'load' || type === 'save') {
                    const p = PlayerProfile.getProfile();
                    if (p) {
                        enabled = p.coachEnabled;
                        hintMode = p.coachHintMode || 'after';
                    }
                }
            });
        }
    }

    // ===== PUBLIC API =====
    return {
        init,
        analyze,
        analyzeCurrentHand,
        checkDecision,
        generateMessage,
        estimateEV,
        setGameState,
        toggle,
        setHintMode,
        isEnabled: () => enabled,
        getHintMode: () => hintMode,
        getCurrentAnalysis: () => currentAnalysis,
        onEvent,
    };
})();
