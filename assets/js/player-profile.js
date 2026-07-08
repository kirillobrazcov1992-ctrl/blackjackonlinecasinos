/* ========================================
   BlackjackOnlineCasinos.com — Player Profile System
   XP, Levels, Achievements, Stats, Career Progression
   ======================================== */

const PlayerProfile = (() => {
    'use strict';

    // ===== CONFIG =====
    const CONFIG = {
        STORAGE_KEY: 'bjPlayerProfile',
        XP_PER_LEVEL: 100,
        XP_SCALE: 1.15,
        MAX_LEVEL: 100,
        SAVE_INTERVAL: 30000,
        RECENT_HANDS_MAX: 50,
    };

    // ===== LEVEL TITLES =====
    const LEVEL_TITLES = [
        { min: 1,  title: 'Novice',        icon: 'fa-seedling' },
        { min: 5,  title: 'Apprentice',    icon: 'fa-hat-wizard' },
        { min: 10, title: 'Card Player',   icon: 'fa-club' },
        { min: 15, title: 'Table Regular', icon: 'fa-chair' },
        { min: 20, title: 'Sharp Shooter', icon: 'fa-bullseye' },
        { min: 25, title: 'Strategy Master', icon: 'fa-chess' },
        { min: 30, title: 'Card Counter',  icon: 'fa-calculator' },
        { min: 35, title: 'High Roller',   icon: 'fa-dice' },
        { min: 40, title: 'Blackjack Pro', icon: 'fa-crown' },
        { min: 50, title: 'Casino Legend', icon: 'fa-skull' },
        { min: 65, title: 'Blackjack Royalty', icon: 'fa-gem' },
        { min: 80, title: 'Hall of Famer', icon: 'fa-trophy' },
        { min: 100, title: 'The Unbeatable', icon: 'fa-star' },
    ];

    // ===== ACHIEVEMENTS =====
    const ACHIEVEMENTS = {
        first_hand:      { id: 'first_hand',      title: 'First Steps',          desc: 'Play your first hand of blackjack',         icon: 'fa-hand',            xp: 20 },
        ten_hands:       { id: 'ten_hands',       title: 'Getting Started',      desc: 'Play 10 hands of blackjack',               icon: 'fa-hand-sparkles',   xp: 30 },
        fifty_hands:     { id: 'fifty_hands',     title: 'Regular Player',       desc: 'Play 50 hands',                            icon: 'fa-club',            xp: 50 },
        hundred_hands:   { id: 'hundred_hands',   title: 'Century Club',         desc: 'Play 100 hands',                           icon: 'fa-award',           xp: 100 },
        five_hundred:    { id: 'five_hundred',    title: 'High Volume',          desc: 'Play 500 hands',                           icon: 'fa-certificate',     xp: 200 },
        first_win:       { id: 'first_win',       title: 'First Victory',        desc: 'Win your first hand',                      icon: 'fa-trophy',          xp: 15 },
        ten_wins:        { id: 'ten_wins',        title: 'On a Roll',            desc: 'Win 10 hands',                             icon: 'fa-medal',           xp: 40 },
        first_blackjack: { id: 'first_blackjack', title: 'Natural!',             desc: 'Get a blackjack (Ace + 10-value)',          icon: 'fa-star',            xp: 50 },
        five_blackjacks: { id: 'five_blackjacks', title: 'Lucky Hand',           desc: 'Get 5 blackjacks',                         icon: 'fa-sparkles',        xp: 100 },
        first_push:      { id: 'first_push',      title: 'Close Call',           desc: 'Push (tie with dealer)',                   icon: 'fa-hand-peace',      xp: 10 },
        first_bust:      { id: 'first_bust',      title: 'Oops!',                desc: 'Bust (go over 21)',                        icon: 'fa-bomb',            xp: 5 },
        ten_streak:      { id: 'ten_streak',      title: 'Hot Streak',           desc: 'Win 3 hands in a row',                     icon: 'fa-fire',            xp: 80 },
        five_streak:     { id: 'five_streak',     title: 'On Fire!',             desc: 'Win 5 hands in a row',                     icon: 'fa-fire-flame-curved', xp: 200 },
        double_down:     { id: 'double_down',     title: 'Double or Nothing',    desc: 'Win a hand after doubling down',           icon: 'fa-arrow-up',        xp: 40 },
        split_win:       { id: 'split_win',       title: 'Split Decision',       desc: 'Win a hand after splitting',               icon: 'fa-columns',         xp: 40 },
        big_bet:         { id: 'big_bet',         title: 'High Stakes',          desc: 'Bet 100 or more on a single hand',         icon: 'fa-gem',             xp: 50 },
        max_bet:         { id: 'max_bet',         title: 'All In!',              desc: 'Bet 500 (max bet)',                        icon: 'fa-diamond',         xp: 150 },
        insurance_win:   { id: 'insurance_win',   title: 'Insured',              desc: 'Win an insurance bet',                     icon: 'fa-shield',          xp: 60 },
        perfect_10:      { id: 'perfect_10',      title: 'Perfect Ten',          desc: 'Make 10 correct plays in a row (with AI Coach)', icon: 'fa-check-double', xp: 120 },
        level_5:         { id: 'level_5',         title: 'Level 5',              desc: 'Reach level 5',                            icon: 'fa-arrow-up',        xp: 0 },
        level_10:        { id: 'level_10',        title: 'Level 10',             desc: 'Reach level 10',                           icon: 'fa-arrow-up',        xp: 0 },
        level_25:        { id: 'level_25',        title: 'Level 25',             desc: 'Reach level 25 — Strategy Master',         icon: 'fa-chess',           xp: 0 },
        level_50:        { id: 'level_50',        title: 'Level 50',             desc: 'Reach level 50 — Casino Legend',           icon: 'fa-crown',           xp: 0 },
        coach_mistake:   { id: 'coach_mistake',   title: 'Learning Moment',      desc: 'Make a mistake caught by AI Coach',        icon: 'fa-graduation-cap',  xp: 10 },
        dealer_bust_win: { id: 'dealer_bust_win', title: "Dealer's Downfall",    desc: 'Win 10 hands where dealer busts',          icon: 'fa-skull',           xp: 75 },
        comeback:        { id: 'comeback',        title: 'The Comeback',         desc: 'Win after being down to your last 100 chips', icon: 'fa-arrow-trend-up', xp: 100 },
        first_session:   { id: 'first_session',   title: 'First Session',        desc: 'Complete your first playing session',      icon: 'fa-clock',           xp: 25 },
        play_20_min:     { id: 'play_20_min',     title: 'In the Zone',          desc: 'Play for 20 minutes total',                icon: 'fa-hourglass',       xp: 50 },
        play_60_min:     { id: 'play_60_min',     title: 'Marathon',             desc: 'Play for 1 hour total',                    icon: 'fa-clock',           xp: 150 },
        win_streak_7:    { id: 'win_streak_7',    title: 'Unstoppable',          desc: 'Win 7 hands in a row',                     icon: 'fa-rocket',          xp: 300 },
        push_streak:     { id: 'push_streak',     title: 'Tied Up',              desc: 'Get 3 pushes in a row',                    icon: 'fa-equals',          xp: 50 },
        royal_flush_bj:  { id: 'royal_flush_bj',  title: 'Picture Perfect',     desc: 'Get 21 with 3 cards (7-7-7)',              icon: 'fa-7',               xp: 100 },
        challenge_master:{ id: 'challenge_master',title: 'Challenge Master',     desc: 'Complete 5 weekly challenges',             icon: 'fa-list-check',      xp: 200 },
    };

    // ===== STATE =====
    let profile = null;
    let sessionData = null;
    let saveTimer = null;
    let listeners = [];

    // ===== HELPERS =====
    function getDefaultProfile() {
        return {
            name: 'Player',
            level: 1,
            xp: 0,
            totalXPEarned: 0,
            createdAt: new Date().toISOString(),
            lastPlayed: null,
            totalPlayTime: 0,
            sessionStart: null,
            stats: {
                handsPlayed: 0,
                handsWon: 0,
                handsLost: 0,
                handsPushed: 0,
                blackjacks: 0,
                totalBet: 0,
                totalWon: 0,
                biggestWin: 0,
                currentStreak: 0,
                bestStreak: 0,
                doubleDowns: 0,
                splits: 0,
                insuranceWins: 0,
                dealerBusts: 0,
                correctPlays: 0,
                incorrectPlays: 0,
                comboPlaysCorrect: 0,
                bestComboCorrect: 0,
            },
            recentHands: [],
            achievements: {},
            challenges: {},
            coachEnabled: true,
            coachHintMode: 'after',
            hasSeenGreeting: false,
        };
    }

    function xpForLevel(level) {
        return Math.floor(CONFIG.XP_PER_LEVEL * Math.pow(CONFIG.XP_SCALE, level - 1));
    }

    function getTitleForLevel(level) {
        let best = LEVEL_TITLES[0];
        for (const t of LEVEL_TITLES) {
            if (level >= t.min) best = t;
        }
        return best;
    }

    // ===== SAVE / LOAD =====
    function save() {
        if (!profile) return;
        try {
            localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(profile));
        } catch (e) { /* quota */ }
    }

    function load() {
        try {
            const raw = localStorage.getItem(CONFIG.STORAGE_KEY);
            if (raw) {
                profile = JSON.parse(raw);
                const def = getDefaultProfile();
                for (const key in def) {
                    if (!(key in profile)) profile[key] = def[key];
                }
                for (const key in def.stats) {
                    if (!(key in profile.stats)) profile.stats[key] = def.stats[key];
                }
                return true;
            }
        } catch (e) { /* corrupted */ }
        profile = getDefaultProfile();
        save();
        return false;
    }

    // ===== XP & LEVELING =====
    function addXP(amount, source) {
        if (!profile) return null;
        const oldLevel = profile.level;
        profile.xp += amount;
        profile.totalXPEarned += amount;

        let leveledUp = false;
        while (profile.level < CONFIG.MAX_LEVEL && profile.xp >= xpForLevel(profile.level)) {
            profile.xp -= xpForLevel(profile.level);
            profile.level++;
            leveledUp = true;
            checkLevelAchievements();
        }

        save();
        notifyListeners('xp', { amount, source, oldLevel, newLevel: profile.level, leveledUp });
        if (leveledUp) {
            notifyListeners('levelup', { oldLevel, newLevel: profile.level });
        }
        return { leveledUp, oldLevel, newLevel: profile.level };
    }

    function checkLevelAchievements() {
        const checks = { 5: 'level_5', 10: 'level_10', 25: 'level_25', 50: 'level_50' };
        if (checks[profile.level]) unlockAchievement(checks[profile.level]);
    }

    // ===== ACHIEVEMENTS =====
    function unlockAchievement(id) {
        if (!profile || profile.achievements[id]) return false;
        const def = ACHIEVEMENTS[id];
        if (!def) return false;
        profile.achievements[id] = { unlockedAt: new Date().toISOString(), id };
        if (def.xp > 0) addXP(def.xp, 'achievement');
        save();
        notifyListeners('achievement', { id, def });
        return true;
    }

    function checkAchievement(id, condition) {
        if (!condition) return false;
        return unlockAchievement(id);
    }

    function getUnlockedAchievements() {
        if (!profile) return [];
        return Object.keys(profile.achievements)
            .map(id => ({ id, ...ACHIEVEMENTS[id], data: profile.achievements[id] }))
            .sort((a, b) => new Date(b.data.unlockedAt) - new Date(a.data.unlockedAt));
    }

    function getLockedAchievements() {
        if (!profile) return [];
        return Object.keys(ACHIEVEMENTS)
            .filter(id => !profile.achievements[id])
            .map(id => ({ id, ...ACHIEVEMENTS[id] }));
    }

    function getAllAchievements() {
        return Object.keys(ACHIEVEMENTS).map(id => ({
            id,
            ...ACHIEVEMENTS[id],
            unlocked: profile ? !!profile.achievements[id] : false,
            data: profile ? profile.achievements[id] : null,
        }));
    }

    function isAchievementUnlocked(id) {
        return profile && !!profile.achievements[id];
    }

    // ===== STATS =====
    function recordHand(result, bet, isBJ, isDouble, isSplit) {
        if (!profile) return;
        const stats = profile.stats;
        stats.handsPlayed++;

        if (result === 'win') {
            stats.handsWon++;
            stats.totalWon += bet * (isBJ ? 2.5 : 2);
            if (bet * 2 > stats.biggestWin) stats.biggestWin = bet * 2;
            stats.currentStreak = Math.max(0, stats.currentStreak) + 1;
            if (stats.currentStreak > stats.bestStreak) stats.bestStreak = stats.currentStreak;
        } else if (result === 'lose') {
            stats.handsLost++;
            stats.currentStreak = Math.min(0, stats.currentStreak) - 1;
        } else if (result === 'push') {
            stats.handsPushed++;
            stats.currentStreak = 0;
        }

        if (isBJ) stats.blackjacks++;
        if (isDouble) stats.doubleDowns++;
        if (isSplit) stats.splits++;
        stats.totalBet += bet;

        profile.recentHands.unshift({ result, bet, isBJ, isDouble, isSplit, timestamp: new Date().toISOString() });
        if (profile.recentHands.length > CONFIG.RECENT_HANDS_MAX) profile.recentHands.length = CONFIG.RECENT_HANDS_MAX;
        profile.lastPlayed = new Date().toISOString();

        checkAchievement('first_hand', stats.handsPlayed === 1);
        checkAchievement('ten_hands', stats.handsPlayed === 10);
        checkAchievement('fifty_hands', stats.handsPlayed === 50);
        checkAchievement('hundred_hands', stats.handsPlayed === 100);
        checkAchievement('five_hundred', stats.handsPlayed === 500);
        checkAchievement('first_win', stats.handsWon === 1);
        checkAchievement('ten_wins', stats.handsWon === 10);
        checkAchievement('first_blackjack', isBJ && stats.blackjacks === 1);
        checkAchievement('five_blackjacks', stats.blackjacks === 5);
        checkAchievement('first_push', result === 'push' && stats.handsPushed === 1);
        checkAchievement('first_bust', result === 'lose');
        checkAchievement('ten_streak', stats.currentStreak === 3);
        checkAchievement('five_streak', stats.currentStreak === 5);
        checkAchievement('win_streak_7', stats.currentStreak === 7);
        checkAchievement('double_down', isDouble && result === 'win');
        checkAchievement('split_win', isSplit && result === 'win');
        checkAchievement('big_bet', bet >= 100);
        checkAchievement('max_bet', bet >= 500);
        checkAchievement('dealer_bust_win', stats.dealerBusts >= 10);

        save();
        notifyListeners('hand', { result, bet, isBJ, isDouble, isSplit, stats });
        return stats;
    }

    function recordDealerBustHand() {
        if (!profile) return;
        profile.stats.dealerBusts++;
        checkAchievement('dealer_bust_win', profile.stats.dealerBusts >= 10);
        save();
    }

    function recordCoachDecision(correct) {
        if (!profile) return;
        const stats = profile.stats;
        if (correct) {
            stats.correctPlays++;
            stats.comboPlaysCorrect++;
            if (stats.comboPlaysCorrect > stats.bestComboCorrect) stats.bestComboCorrect = stats.comboPlaysCorrect;
            checkAchievement('perfect_10', stats.comboPlaysCorrect >= 10);
        } else {
            stats.incorrectPlays++;
            stats.comboPlaysCorrect = 0;
            checkAchievement('coach_mistake', stats.incorrectPlays === 1);
        }
        save();
    }

    function recordInsuranceWin() {
        if (!profile) return;
        profile.stats.insuranceWins++;
        checkAchievement('insurance_win', profile.stats.insuranceWins === 1);
        save();
    }

    function recordTotalPlayTime(seconds) {
        if (!profile) return;
        profile.totalPlayTime += seconds;
        const totalMin = Math.floor(profile.totalPlayTime / 60);
        checkAchievement('play_20_min', totalMin >= 20);
        checkAchievement('play_60_min', totalMin >= 60);
        save();
    }

    // ===== CHALLENGES =====
    function getChallenges() {
        if (!profile) return [];
        const now = new Date();
        const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
        const storedWeek = profile.challenges.weekStart ? new Date(profile.challenges.weekStart) : null;

        if (!storedWeek || storedWeek < weekStart) {
            const all = [
                { id: 'ch_play_50',  title: 'Volume Player',    desc: 'Play 50 hands',            icon: 'fa-hand',        target: 50,  type: 'hands',   xp: 100 },
                { id: 'ch_win_20',   title: 'Win Streak',       desc: 'Win 20 hands',             icon: 'fa-trophy',      target: 20,  type: 'wins',    xp: 120 },
                { id: 'ch_bj_3',     title: 'Natural Born',     desc: 'Get 3 blackjacks',         icon: 'fa-star',        target: 3,   type: 'bj',      xp: 150 },
                { id: 'ch_double_5', title: 'Double Up',        desc: 'Win 5 double downs',       icon: 'fa-arrow-up',    target: 5,   type: 'double',  xp: 130 },
                { id: 'ch_split_5',  title: 'Split Master',     desc: 'Win 5 split hands',        icon: 'fa-columns',     target: 5,   type: 'split',   xp: 130 },
                { id: 'ch_bet_2000', title: 'High Roller',      desc: 'Bet 2000 chips total',     icon: 'fa-gem',         target: 2000, type: 'bet',    xp: 200 },
                { id: 'ch_correct_20', title: 'Perfect Play',   desc: 'Make 20 correct decisions',icon: 'fa-check-double', target: 20,  type: 'correct', xp: 180 },
            ];
            const selected = all.sort(() => Math.random() - 0.5).slice(0, 4);
            profile.challenges = {
                weekStart: weekStart.toISOString(),
                list: selected.map(c => ({ ...c, progress: 0, completed: false })),
            };
            save();
        }
        return profile.challenges.list || [];
    }

    function updateChallengeProgress(type, amount) {
        if (!profile || !profile.challenges?.list) return;
        amount = amount || 1;
        profile.challenges.list.forEach(ch => {
            if (ch.completed || ch.type !== type) return;
            ch.progress = Math.min(ch.target, ch.progress + amount);
            if (ch.progress >= ch.target) {
                ch.completed = true;
                addXP(ch.xp, 'challenge');
                notifyListeners('challenge_complete', { challenge: ch });
            }
        });
        const completed = profile.challenges.list.filter(c => c.completed).length;
        checkAchievement('challenge_master', completed >= 5);
        save();
    }

    // ===== SESSION =====
    function startSession() {
        sessionData = { startTime: Date.now(), handsPlayed: 0, handsWon: 0, profit: 0 };
    }

    function endSession() {
        if (!sessionData || !profile) return;
        const elapsed = Math.floor((Date.now() - sessionData.startTime) / 1000);
        recordTotalPlayTime(elapsed);
        checkAchievement('first_session', true);
        sessionData = null;
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
        const existed = load();
        if (saveTimer) clearInterval(saveTimer);
        saveTimer = setInterval(save, CONFIG.SAVE_INTERVAL);
        startSession();

        window.addEventListener('beforeunload', () => { endSession(); save(); });

        let lastVisible = Date.now();
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                const elapsed = Math.floor((Date.now() - lastVisible) / 1000);
                if (elapsed > 5) recordTotalPlayTime(elapsed);
            } else {
                lastVisible = Date.now();
            }
        });

        return existed;
    }

    // ===== PUBLIC API =====
    return {
        init, save, load,
        getProfile: () => profile,
        getStats: () => profile?.stats || null,
        getLevel: () => profile?.level || 1,
        getXP: () => profile?.xp || 0,
        getXPForLevel: () => profile ? xpForLevel(profile.level) : 100,
        getTitle: () => profile ? getTitleForLevel(profile.level) : LEVEL_TITLES[0],
        getTitleForLevel, xpForLevel,
        addXP, recordHand, recordDealerBust: recordDealerBustHand,
        recordCoachDecision, recordInsuranceWin, recordTotalPlayTime,
        startSession, endSession,
        unlockAchievement, isAchievementUnlocked,
        getUnlockedAchievements, getLockedAchievements, getAllAchievements,
        getAchievementDef: (id) => ACHIEVEMENTS[id] || null,
        ACHIEVEMENTS, getChallenges, updateChallengeProgress,
        onEvent, notifyListeners,
        setProfileProp: (key, val) => { if (profile) { profile[key] = val; save(); } },
        getProfileProp: (key) => profile ? profile[key] : null,
        hasSeenGreeting: () => profile ? profile.hasSeenGreeting : false,
        markGreetingSeen: () => { if (profile) { profile.hasSeenGreeting = true; save(); } },
        LEVEL_TITLES,
        XP_HAND_PLAYED: 3, XP_HAND_WON: 5, XP_BLACKJACK: 10,
        XP_DOUBLE_WIN: 8, XP_SPLIT_WIN: 8, XP_CORRECT_PLAY: 2,
        XP_BIG_BET: 5, XP_DEALER_BUST: 4,
    };
})();
