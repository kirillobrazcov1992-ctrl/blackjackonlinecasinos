/* ========================================
   Blackjack Strategy Calculator
   Interactive tool for basic strategy decisions
   ======================================== */

const StrategyCalc = (() => {
    // Strategy tables for 6-deck H17 DAS
    // H=Hit, S=Stand, D=Double, P=Split, RH=Surrender/Hit, RS=Surrender/Stand
    // Rows: player hand, Cols: dealer upcard (2-11 where 11=Ace)
    
    const HARD = {
        '17':  ['S','S','S','S','S','S','S','S','S','S'],
        '16':  ['S','S','S','S','S','H','H','RH','RH','RH'],
        '15':  ['S','S','S','S','S','H','H','RH','RH','RH'],
        '14':  ['S','S','S','S','S','H','H','H','H','H'],
        '13':  ['S','S','S','S','S','H','H','H','H','H'],
        '12':  ['H','H','S','S','S','H','H','H','H','H'],
        '11':  ['D','D','D','D','D','D','D','D','D','H'],
        '10':  ['D','D','D','D','D','D','D','D','H','H'],
        '9':   ['H','D','D','D','D','H','H','H','H','H'],
        '8':   ['H','H','H','H','H','H','H','H','H','H'],
        '7':   ['H','H','H','H','H','H','H','H','H','H'],
        '6':   ['H','H','H','H','H','H','H','H','H','H'],
        '5':   ['H','H','H','H','H','H','H','H','H','H'],
    };

    const SOFT = {
        'A9':  ['S','S','S','S','S','S','S','S','S','S'],
        'A8':  ['S','S','S','S','D','S','S','S','S','S'],
        'A7':  ['S','D','D','D','D','S','S','H','H','H'],
        'A6':  ['H','D','D','D','D','H','H','H','H','H'],
        'A5':  ['H','H','D','D','D','H','H','H','H','H'],
        'A4':  ['H','H','D','D','D','H','H','H','H','H'],
        'A3':  ['H','H','H','D','D','H','H','H','H','H'],
        'A2':  ['H','H','H','D','D','H','H','H','H','H'],
    };

    const PAIRS = {
        'A,A': ['P','P','P','P','P','P','P','P','P','P'],
        '10,10': ['S','S','S','S','S','S','S','S','S','S'],
        '9,9':  ['P','P','P','P','P','S','P','P','S','S'],
        '8,8':  ['P','P','P','P','P','P','P','P','P','P'],
        '7,7':  ['P','P','P','P','P','P','H','H','H','H'],
        '6,6':  ['P','P','P','P','P','H','H','H','H','H'],
        '5,5':  ['D','D','D','D','D','D','D','D','H','H'],
        '4,4':  ['H','H','H','P','P','H','H','H','H','H'],
        '3,3':  ['P','P','P','P','P','P','H','H','H','H'],
        '2,2':  ['P','P','P','P','P','P','H','H','H','H'],
    };

    const DEALER = ['2','3','4','5','6','7','8','9','10','A'];

    function getAction(card1, card2, dealerIdx) {
        // card1, card2: values like 'A', '2'-'10', 'J', 'Q', 'K'
        // dealerIdx: 0-9 (2-11)
        const c1 = card1 === 'A' ? 11 : parseInt(card1) || 10;
        const c2 = card2 === 'A' ? 11 : parseInt(card2) || 10;
        
        // Check pairs first
        if (c1 === c2 && ['2','3','4','5','6','7','8','9','10','A'].includes(card1)) {
            const pairKey = card1 + ',' + card1;
            if (PAIRS[pairKey]) return PAIRS[pairKey][dealerIdx];
        }

        // Check soft hands (has Ace)
        const hasAce = card1 === 'A' || card2 === 'A';
        if (hasAce) {
            const other = card1 === 'A' ? c2 : c1;
            const softTotal = 11 + other;
            if (softTotal >= 19) return 'S';
            if (softTotal <= 17) {
                const key = 'A' + (other >= 10 ? '9' : other);
                if (SOFT[key]) return SOFT[key][dealerIdx];
            }
            if (softTotal === 18) {
                return SOFT['A8'][dealerIdx];
            }
        }

        // Hard hands
        const total = c1 + c2;
        if (total >= 17) return 'S';
        if (total <= 8) return 'H';
        const key = String(total);
        if (HARD[key]) return HARD[key][dealerIdx];
        return 'H';
    }

    function actionLabel(action) {
        const labels = {
            'H': 'Hit',
            'S': 'Stand',
            'D': 'Double Down',
            'P': 'Split',
            'RH': 'Surrender (or Hit)',
            'RS': 'Surrender (or Stand)'
        };
        return labels[action] || action;
    }

    function actionColor(action) {
        const colors = {
            'H': '#60a5fa',
            'S': '#22c55e',
            'D': '#f59e0b',
            'P': '#a78bfa',
            'RH': '#ef4444',
            'RS': '#ec4899'
        };
        return colors[action] || '#fff';
    }

    function actionIcon(action) {
        const icons = {
            'H': 'fa-hand',
            'S': 'fa-hand-peace',
            'D': 'fa-arrow-up',
            'P': 'fa-columns',
            'RH': 'fa-flag',
            'RS': 'fa-flag'
        };
        return icons[action] || 'fa-question';
    }

    return { getAction, actionLabel, actionColor, actionIcon, DEALER };
})();
