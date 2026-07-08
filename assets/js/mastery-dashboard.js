/* ========================================
   BlackjackOnlineCasinos.com — Mastery Dashboard
   UI: player badge, dashboard modal, home stats, toasts
   ======================================== */

const MasteryDashboard = (() => {
    'use strict';

    let initialized = false;

    // ===== PLAYER BADGE =====
    function updatePlayerBadge() {
        const badge = document.getElementById('playerBadge');
        if (!badge) return;
        const profile = PlayerProfile.getProfile();
        if (!profile) {
            badge.style.display = 'none';
            return;
        }
        const title = PlayerProfile.getTitle();
        const level = profile.level;
        const xp = profile.xp;
        const xpMax = PlayerProfile.xpForLevel(level);
        const pct = Math.min(100, Math.round((xp / xpMax) * 100));
        const initial = profile.name.charAt(0).toUpperCase();

        badge.style.display = 'inline-flex';
        const avatarEl = document.getElementById('badgeAvatar');
        const levelEl = document.getElementById('badgeLevel');
        const xpFill = document.getElementById('badgeXpFill');
        const xpText = document.getElementById('badgeXpText');

        if (avatarEl) avatarEl.textContent = initial;
        if (levelEl) levelEl.textContent = `Lv.${level}`;
        if (xpFill) xpFill.style.width = `${pct}%`;
        if (xpText) xpText.textContent = `${xp}/${xpMax} XP`;
        badge.setAttribute('title', `${title.title} — Level ${level}`);
    }

    function initPlayerBadge() {
        const badge = document.getElementById('playerBadge');
        if (!badge) return;
        badge.addEventListener('click', (e) => {
            e.preventDefault();
            openDashboard();
        });
        updatePlayerBadge();
    }

    // ===== DASHBOARD MODAL =====
    function openDashboard() {
        const existing = document.getElementById('dashboardOverlay');
        if (existing) {
            existing.classList.add('open');
            return;
        }

        const overlay = document.createElement('div');
        overlay.className = 'dashboard-overlay';
        overlay.id = 'dashboardOverlay';
        overlay.innerHTML = buildDashboardHTML();
        document.body.appendChild(overlay);

        // Force reflow then show
        requestAnimationFrame(() => {
            overlay.classList.add('open');
        });

        // Close on overlay click
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) closeDashboard();
        });

        // Bind tabs
        bindDashboardTabs(overlay);
    }

    function closeDashboard() {
        const overlay = document.getElementById('dashboardOverlay');
        if (overlay) {
            overlay.classList.remove('open');
            setTimeout(() => overlay.remove(), 300);
        }
    }

    function buildDashboardHTML() {
        const profile = PlayerProfile.getProfile();
        if (!profile) return '<div class="dashboard-modal"><p>Loading...</p></div>';

        const title = PlayerProfile.getTitle();
        const stats = profile.stats;
        const level = profile.level;
        const xp = profile.xp;
        const xpMax = PlayerProfile.xpForLevel(level);
        const pct = Math.min(100, Math.round((xp / xpMax) * 100));
        const initial = profile.name.charAt(0).toUpperCase();
        const accuracy = (stats.correctPlays + stats.incorrectPlays) > 0
            ? Math.round((stats.correctPlays / (stats.correctPlays + stats.incorrectPlays)) * 100)
            : 0;
        const totals = profile.totalPlayTime || 0;
        const hours = Math.floor(totals / 3600);
        const mins = Math.floor((totals % 3600) / 60);
        const winRate = stats.handsPlayed > 0
            ? Math.round((stats.handsWon / stats.handsPlayed) * 100)
            : 0;

        const achievements = PlayerProfile.getAllAchievements();
        const unlocked = achievements.filter(a => a.unlocked).length;
        const total = achievements.length;

        const challenges = PlayerProfile.getChallenges();

        // Recent hands
        const recent = profile.recentHands || [];
        const recentHTML = recent.slice(0, 20).map(h => {
            const cls = h.result === 'win' ? 'win' : h.result === 'lose' ? 'lose' : h.result === 'push' ? 'push' : '';
            const label = h.isBJ ? 'BJ' : h.result === 'win' ? 'W' : h.result === 'lose' ? 'L' : 'P';
            return `<span class="dashboard-home__recent-dot dashboard-home__recent-dot--${cls}">${label}</span>`;
        }).join('');

        // Achievement mini icons
        const recentAch = PlayerProfile.getUnlockedAchievements().slice(0, 5);
        const achHTML = recentAch.map(a =>
            `<div class="dashboard-home__ach-mini"><i class="fas ${a.icon}"></i><span>${a.title}</span></div>`
        ).join('');

        // Challenges HTML
        const challengesHTML = challenges.map(ch => {
            const pctC = ch.target > 0 ? Math.min(100, Math.round((ch.progress / ch.target) * 100)) : 0;
            return `
                <div class="challenge-card ${ch.completed ? 'challenge-card--completed' : ''}">
                    <div class="challenge__icon"><i class="fas ${ch.icon}"></i></div>
                    <div class="challenge__info">
                        <div class="challenge__title">${ch.title}</div>
                        <div class="challenge__progress">${Math.min(ch.progress, ch.target)} / ${ch.target}</div>
                        <div class="challenge__progress-bar">
                            <div class="challenge__progress-fill" style="width:${pctC}%"></div>
                        </div>
                    </div>
                    <div class="challenge__reward">${ch.completed ? '✓ Done' : `+${ch.xp} XP`}</div>
                </div>
            `;
        }).join('');

        // Achievements HTML (unlocked + locked)
        const achGridHTML = achievements.map(a => `
            <div class="achievement-card ${a.unlocked ? 'achievement-card--unlocked' : ''}">
                <div class="achievement__icon"><i class="fas ${a.icon}"></i></div>
                <div class="achievement__info">
                    <div class="achievement__title">${a.unlocked ? a.title : '???'}</div>
                    <div class="achievement__desc">${a.unlocked ? a.desc : 'Keep playing to unlock'}</div>
                    ${a.unlocked && a.data ? `<div class="achievement__date">${new Date(a.data.unlockedAt).toLocaleDateString()}</div>` : ''}
                </div>
            </div>
        `).join('');

        return `
            <div class="dashboard-modal">
                <button class="dashboard-close" onclick="MasteryDashboard.closeDashboard()"><i class="fas fa-times"></i></button>

                <!-- Header -->
                <div class="dashboard-header">
                    <div class="dashboard-avatar">${initial}</div>
                    <div class="dashboard-info">
                        <div class="dashboard-info__title">${title.title}</div>
                        <div class="dashboard-info__name">${profile.name}</div>
                        <div class="dashboard-info__level">Level ${level} · ${xp}/${xpMax} XP</div>
                        <div class="dashboard-xp-bar">
                            <div class="dashboard-xp-fill" style="width:${pct}%"></div>
                        </div>
                    </div>
                </div>

                <!-- Tabs -->
                <div class="dashboard-tabs">
                    <button class="dashboard-tab dashboard-tab--active" data-tab="stats">📊 Stats</button>
                    <button class="dashboard-tab" data-tab="achievements">🏆 Achievements (${unlocked}/${total})</button>
                    <button class="dashboard-tab" data-tab="challenges">🎯 Challenges</button>
                    <button class="dashboard-tab" data-tab="history">📋 History</button>
                </div>

                <!-- Panel: Stats -->
                <div class="dashboard-panel dashboard-panel--active" id="panel-stats">
                    <div class="dashboard-stats-grid">
                        <div class="dashboard-stat-card">
                            <div class="dashboard-stat-card__value">${stats.handsPlayed}</div>
                            <div class="dashboard-stat-card__label">Hands Played</div>
                        </div>
                        <div class="dashboard-stat-card">
                            <div class="dashboard-stat-card__value">${stats.handsWon}</div>
                            <div class="dashboard-stat-card__label">Wins</div>
                        </div>
                        <div class="dashboard-stat-card">
                            <div class="dashboard-stat-card__value">${winRate}%</div>
                            <div class="dashboard-stat-card__label">Win Rate</div>
                        </div>
                        <div class="dashboard-stat-card">
                            <div class="dashboard-stat-card__value">${stats.blackjacks}</div>
                            <div class="dashboard-stat-card__label">Blackjacks</div>
                        </div>
                        <div class="dashboard-stat-card">
                            <div class="dashboard-stat-card__value">${stats.bestStreak}</div>
                            <div class="dashboard-stat-card__label">Best Streak</div>
                        </div>
                        <div class="dashboard-stat-card">
                            <div class="dashboard-stat-card__value">${accuracy}%</div>
                            <div class="dashboard-stat-card__label">Accuracy</div>
                        </div>
                        <div class="dashboard-stat-card">
                            <div class="dashboard-stat-card__value">${hours}h ${mins}m</div>
                            <div class="dashboard-stat-card__label">Play Time</div>
                        </div>
                        <div class="dashboard-stat-card">
                            <div class="dashboard-stat-card__value">${profile.totalXPEarned}</div>
                            <div class="dashboard-stat-card__label">Total XP</div>
                        </div>
                    </div>
                </div>

                <!-- Panel: Achievements -->
                <div class="dashboard-panel" id="panel-achievements">
                    <div class="achievements-grid">${achGridHTML}</div>
                </div>

                <!-- Panel: Challenges -->
                <div class="dashboard-panel" id="panel-challenges">
                    <p style="color:var(--color-text-muted); font-size:0.82rem; margin-bottom:16px;">
                        <i class="fas fa-sync-alt" style="color:var(--color-gold);"></i> Weekly challenges reset every Monday
                    </p>
                    <div class="challenges-list">${challengesHTML}</div>
                </div>

                <!-- Panel: History -->
                <div class="dashboard-panel" id="panel-history">
                    ${recent.length > 0 ? `
                        <div style="display:flex;flex-wrap:wrap;gap:4px;">
                            ${recentHTML}
                        </div>
                        <p style="color:var(--color-text-muted); font-size:0.75rem; margin-top:12px;">
                            Showing last ${Math.min(recent.length, 20)} hands
                        </p>
                    ` : `
                        <p style="color:var(--color-text-muted); font-size:0.9rem;">
                            No hands played yet. <a href="blackjack-game.html" style="color:var(--color-gold);">Play now!</a>
                        </p>
                    `}
                </div>
            </div>
        `;
    }

    function bindDashboardTabs(overlay) {
        const tabs = overlay.querySelectorAll('.dashboard-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const panelId = 'panel-' + tab.dataset.tab;
                tabs.forEach(t => t.classList.remove('dashboard-tab--active'));
                tab.classList.add('dashboard-tab--active');
                overlay.querySelectorAll('.dashboard-panel').forEach(p => p.classList.remove('dashboard-panel--active'));
                const panel = overlay.getElementById(panelId);
                if (panel) panel.classList.add('dashboard-panel--active');
            });
        });
    }

    // ===== XP TOAST =====
    let xpToastTimeout = null;

    function showXPToast(amount, source) {
        const existing = document.getElementById('xpToast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = 'xp-toast';
        toast.id = 'xpToast';
        const sourceLabel = source === 'achievement' ? 'Achievement' :
                            source === 'challenge' ? 'Challenge' : 'Hand';
        toast.innerHTML = `
            <div>+${amount} XP</div>
            <div class="xp-toast__sub">${sourceLabel}</div>
        `;
        document.body.appendChild(toast);

        requestAnimationFrame(() => {
            toast.classList.add('xp-toast--visible');
        });

        if (xpToastTimeout) clearTimeout(xpToastTimeout);
        xpToastTimeout = setTimeout(() => {
            toast.classList.remove('xp-toast--visible');
            setTimeout(() => toast.remove(), 500);
        }, 1500);
    }

    // ===== LEVEL UP OVERLAY =====
    function showLevelUp(oldLevel, newLevel) {
        const existing = document.getElementById('levelUpOverlay');
        if (existing) existing.remove();

        const overlay = document.createElement('div');
        overlay.className = 'level-up-overlay';
        overlay.id = 'levelUpOverlay';
        const title = PlayerProfile.getTitleForLevel(newLevel);
        overlay.innerHTML = `
            <div class="level-up-box">
                <div class="level-up-box__icon"><i class="fas fa-arrow-up"></i></div>
                <div class="level-up-box__title">LEVEL UP!</div>
                <div class="level-up-box__title" style="font-size:1.4rem;">${oldLevel} → ${newLevel}</div>
                <div class="level-up-box__sub">${title.title} <i class="fas ${title.icon}"></i></div>
                <button class="level-up-box__btn" onclick="this.closest('.level-up-overlay').remove()">
                    Continue Playing
                </button>
            </div>
        `;
        document.body.appendChild(overlay);

        requestAnimationFrame(() => {
            overlay.classList.add('level-up-overlay--visible');
        });
    }

    // ===== ACHIEVEMENT TOAST =====
    let achToastTimeout = null;

    function showAchievementToast(id, def) {
        const existing = document.getElementById('achievementToast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.className = 'achievement-toast';
        toast.id = 'achievementToast';
        toast.innerHTML = `
            <div class="achievement-toast__icon"><i class="fas ${def.icon}"></i></div>
            <div class="achievement-toast__info">
                <div class="achievement-toast__title">🏆 Achievement Unlocked!</div>
                <div class="achievement-toast__name">${def.title}</div>
                <div class="achievement-toast__desc">${def.desc}${def.xp > 0 ? ` · +${def.xp} XP` : ''}</div>
            </div>
        `;
        document.body.appendChild(toast);

        requestAnimationFrame(() => {
            toast.classList.add('achievement-toast--visible');
        });

        if (achToastTimeout) clearTimeout(achToastTimeout);
        achToastTimeout = setTimeout(() => {
            toast.classList.remove('achievement-toast--visible');
            setTimeout(() => toast.remove(), 500);
        }, 4000);
    }

    // ===== CHALLENGE COMPLETE TOAST =====
    function showChallengeToast(challenge) {
        showXPToast(challenge.xp, 'challenge');
    }

    // ===== PLAYER GREETING =====
    function showGreeting() {
        if (PlayerProfile.hasSeenGreeting()) return;

        const overlay = document.createElement('div');
        overlay.className = 'player-greeting';
        overlay.id = 'playerGreeting';
        overlay.innerHTML = `
            <div class="player-greeting__box">
                <div class="player-greeting__icon"><i class="fas fa-crown"></i></div>
                <div class="player-greeting__title">Welcome to Your Blackjack Journey!</div>
                <div class="player-greeting__text">
                    You now have a <strong style="color:var(--color-gold);">player profile</strong> that tracks every hand you play.
                    Earn <strong style="color:var(--color-gold);">XP</strong>, level up, unlock <strong style="color:var(--color-gold);">achievements</strong>,
                    and use the <strong style="color:var(--color-gold);">AI Coach</strong> to perfect your strategy.
                    <br><br>Ready to become a Blackjack Pro?
                </div>
                <button class="player-greeting__btn" id="greetingBtn">
                    Let's Go! 🃏
                </button>
            </div>
        `;
        document.body.appendChild(overlay);

        requestAnimationFrame(() => {
            overlay.classList.add('player-greeting--visible');
        });

        overlay.querySelector('#greetingBtn').addEventListener('click', () => {
            overlay.classList.remove('player-greeting--visible');
            PlayerProfile.markGreetingSeen();
            setTimeout(() => overlay.remove(), 500);
        });
    }

    // ===== INIT =====
    function init() {
        if (initialized) return;
        initialized = true;

        // Wait for PlayerProfile
        if (!window.PlayerProfile) {
            console.warn('PlayerProfile not found, dashboard delayed');
            setTimeout(init, 500);
            return;
        }

        // Init PlayerProfile first
        if (typeof PlayerProfile.init === 'function') {
            PlayerProfile.init();
        }

        // Show greeting on first visit
        setTimeout(showGreeting, 800);

        // Init badge (already in HTML)
        initPlayerBadge();

        // Listen for XP events
        PlayerProfile.onEvent((type, data) => {
            if (type === 'xp') {
                updatePlayerBadge();
                if (data.amount > 0 && data.amount < 50) {
                    showXPToast(data.amount, data.source);
                }
            }
            if (type === 'levelup') {
                updatePlayerBadge();
                showLevelUp(data.oldLevel, data.newLevel);
            }
            if (type === 'achievement') {
                showAchievementToast(data.id, data.def);
                updatePlayerBadge();
            }
            if (type === 'challenge_complete') {
                showChallengeToast(data.challenge);
            }
            if (type === 'hand') {
                updatePlayerBadge();
            }
        });

        // Auto-refresh dashboard if open
        setInterval(() => {
            const overlay = document.getElementById('dashboardOverlay');
            if (overlay && overlay.classList.contains('open')) {
                // Refresh stats silently
                updatePlayerBadge();
            }
        }, 5000);
    }

    // ===== PUBLIC API =====
    return {
        init,
        openDashboard,
        closeDashboard,
        updatePlayerBadge,
        showXPToast,
        showLevelUp,
        showAchievementToast,
    };
})();

// Expose globally (for inline scripts that reference window.MasteryDashboard)
window.MasteryDashboard = MasteryDashboard;
