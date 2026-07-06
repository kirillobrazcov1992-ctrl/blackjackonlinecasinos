/* ==========================================
   BlackjackOnlineCasinos.com — i18n System
   6 languages: EN / FR / ES / DE / AR / IT
   ========================================== */

(function() {
  'use strict';

  const STORAGE_KEY = 'bj_lang';
  const DEFAULT_LANG = 'en';

  const LANGUAGES = {
    en: { short: 'EN', flag: '🇬🇧', dir: 'ltr' },
    fr: { short: 'FR', flag: '🇫🇷', dir: 'ltr' },
    es: { short: 'ES', flag: '🇪🇸', dir: 'ltr' },
    de: { short: 'DE', flag: '🇩🇪', dir: 'ltr' },
    ar: { short: 'AR', flag: '🇸🇦', dir: 'rtl' },
    it: { short: 'IT', flag: '🇮🇹', dir: 'ltr' },
  };

  let currentLang = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
  if (!LANGUAGES[currentLang]) currentLang = DEFAULT_LANG;

  // ─── Translations ───
  const TRANSLATIONS = {
    nav_home: {
      en: 'Home', fr: 'Accueil', es: 'Inicio', de: 'Start', ar: 'الرئيسية', it: 'Home'
    },
    nav_learn: {
      en: 'Learn the Game', fr: 'Apprendre le jeu', es: 'Aprende el juego', de: 'Lerne das Spiel', ar: 'تعلم اللعبة', it: 'Impara il gioco'
    },
    nav_rules: {
      en: 'Rules', fr: 'Règles', es: 'Reglas', de: 'Regeln', ar: 'القواعد', it: 'Regole'
    },
    nav_basic_strategy: {
      en: 'Basic Strategy', fr: 'Stratégie de base', es: 'Estrategia básica', de: 'Grundstrategie', ar: 'الاستراتيجية الأساسية', it: 'Strategia di base'
    },
    nav_odds: {
      en: 'Odds & Probability', fr: 'Cotes et probabilités', es: 'Probabilidades', de: 'Gewinnchancen', ar: 'الاحتمالات', it: 'Probabilità'
    },
    nav_variations: {
      en: 'Variations', fr: 'Variantes', es: 'Variaciones', de: 'Varianten', ar: 'الأنواع', it: 'Varianti'
    },
    nav_history: {
      en: 'History', fr: 'Histoire', es: 'Historia', de: 'Geschichte', ar: 'التاريخ', it: 'Storia'
    },
    nav_glossary: {
      en: 'Glossary', fr: 'Glossaire', es: 'Glosario', de: 'Glossar', ar: 'قاموس المصطلحات', it: 'Glossario'
    },
    nav_advanced: {
      en: 'Advanced Play', fr: 'Jeu avancé', es: 'Juego avanzado', de: 'Fortgeschritten', ar: 'لعب متقدم', it: 'Gioco avanzato'
    },
    nav_advanced_strategy: {
      en: 'Advanced Strategy', fr: 'Stratégie avancée', es: 'Estrategia avanzada', de: 'Fortgeschrittene Strategie', ar: 'استراتيجية متقدمة', it: 'Strategia avanzata'
    },
    nav_card_counting: {
      en: 'Card Counting', fr: 'Comptage de cartes', es: 'Conteo de cartas', de: 'Kartenzählen', ar: 'عد البطاقات', it: 'Conteggio carte'
    },
    nav_shuffle_tracking: {
      en: 'Shuffle Tracking', fr: 'Suivi du mélange', es: 'Seguimiento de barajado', de: 'Mischverfolgung', ar: 'تتبع الخلط', it: 'Tracciamento miscuglio'
    },
    nav_side_bets: {
      en: 'Side Bets', fr: 'Paris secondaires', es: 'Apuestas laterales', de: 'Nebenwetten', ar: 'الرهانات الجانبية', it: 'Scommesse laterali'
    },
    nav_tournaments: {
      en: 'Tournaments', fr: 'Tournois', es: 'Torneos', de: 'Turniere', ar: 'البطولات', it: 'Tornei'
    },
    nav_resources: {
      en: 'Resources', fr: 'Ressources', es: 'Recursos', de: 'Ressourcen', ar: 'موارد', it: 'Risorse'
    },
    nav_online: {
      en: 'Online Blackjack', fr: 'Blackjack en ligne', es: 'Blackjack online', de: 'Online Blackjack', ar: 'البلاك جاك أونلاين', it: 'Blackjack online'
    },
    nav_bankroll: {
      en: 'Bankroll Management', fr: 'Gestion de bankroll', es: 'Gestión de fondos', de: 'Bankroll-Management', ar: 'إدارة الرصيد', it: 'Gestione del bankroll'
    },
    nav_myths: {
      en: 'Myths & Misconceptions', fr: 'Mythes et idées reçues', es: 'Mitos y conceptos erróneos', de: 'Mythen und Missverständnisse', ar: 'الخرافات والمفاهيم الخاطئة', it: 'Miti e idee sbagliate'
    },
    nav_etiquette: {
      en: 'Etiquette', fr: 'Étiquette', es: 'Etiqueta', de: 'Etikette', ar: 'آداب اللعبة', it: 'Etichetta'
    },
    nav_faq: {
      en: 'FAQ', fr: 'FAQ', es: 'FAQ', de: 'FAQ', ar: 'الأسئلة الشائعة', it: 'FAQ'
    },
    nav_books: {
      en: 'Best Blackjack Books', fr: 'Meilleurs livres', es: 'Mejores libros', de: 'Beste Bücher', ar: 'أفضل الكتب', it: 'Migliori libri'
    },
    nav_reviews: {
      en: 'Reviews', fr: 'Avis', es: 'Reseñas', de: 'Bewertungen', ar: 'المراجعات', it: 'Recensioni'
    },
    nav_demo: {
      en: 'Demo', fr: 'Démo', es: 'Demo', de: 'Demo', ar: 'تجريبي', it: 'Demo'
    },
    nav_contact: {
      en: 'Contact', fr: 'Contact', es: 'Contacto', de: 'Kontakt', ar: 'اتصل بنا', it: 'Contatto'
    },
    hero_badge: {
      en: '#1 Blackjack Resource Online', fr: '#1 Ressource Blackjack en ligne', es: '#1 Recurso de Blackjack Online', de: '#1 Blackjack-Ressource online', ar: '#1 مصدر البلاك جاك أونلاين', it: '#1 Risorsa Blackjack Online'
    },
    hero_title: {
      en: 'Master Blackjack: <span class="gold-text animate-neon">Rules, Strategy &amp; Best Casinos</span>',
      fr: 'Maîtrisez le Blackjack&nbsp;: <span class="gold-text animate-neon">Règles, Stratégie et Meilleurs Casinos</span>',
      es: 'Domina el Blackjack: <span class="gold-text animate-neon">Reglas, Estrategia y Mejores Casinos</span>',
      de: 'Meistere Blackjack: <span class="gold-text animate-neon">Regeln, Strategie und beste Casinos</span>',
      ar: 'أتقن البلاك جاك: <span class="gold-text animate-neon">القواعد والاستراتيجية وأفضل الكازينوهات</span>',
      it: 'Padroneggia il Blackjack: <span class="gold-text animate-neon">Regole, Strategia e Migliori Casinò</span>'
    },
    hero_subtitle: {
      en: "Whether you're a complete beginner or a seasoned player — we've got you covered. Learn the game, sharpen your strategy, and find the best online casinos to play for real money.",
      fr: 'Que vous soyez débutant ou joueur expérimenté — nous avons ce qu\'il vous faut. Apprenez le jeu, affinez votre stratégie et trouvez les meilleurs casinos en ligne pour jouer avec de l\'argent réel.',
      es: 'Ya seas un principiante o un jugador experimentado — lo tenemos cubierto. Aprende el juego, perfecciona tu estrategia y encuentra los mejores casinos online para jugar con dinero real.',
      de: 'Egal, ob Anfänger oder erfahrener Spieler — wir haben alles für Sie. Lernen Sie das Spiel, verfeinern Sie Ihre Strategie und finden Sie die besten Online-Casinos, um mit echtem Geld zu spielen.',
      ar: 'سواء كنت مبتدئًا تمامًا أو لاعبًا متمرسًا — لدينا ما يناسبك. تعلم اللعبة، وشحذ استراتيجيتك، واعثر على أفضل الكازينوهات عبر الإنترنت للعب بأموال حقيقية.',
      it: 'Che tu sia un principiante o un giocatore esperto — abbiamo quello che fa per te. Impara il gioco, affina la tua strategia e trova i migliori casinò online per giocare con soldi veri.'
    },
    hero_btn_rules: {
      en: '<i class="fas fa-book"></i> Learn the Rules',
      fr: '<i class="fas fa-book"></i> Apprendre les règles',
      es: '<i class="fas fa-book"></i> Aprende las reglas',
      de: '<i class="fas fa-book"></i> Regeln lernen',
      ar: '<i class="fas fa-book"></i> تعلم القواعد',
      it: '<i class="fas fa-book"></i> Impara le regole'
    },
    hero_btn_strategy: {
      en: '<i class="fas fa-chess"></i> Master Strategy',
      fr: '<i class="fas fa-chess"></i> Maîtriser la stratégie',
      es: '<i class="fas fa-chess"></i> Dominar la estrategia',
      de: '<i class="fas fa-chess"></i> Strategie meistern',
      ar: '<i class="fas fa-chess"></i> إتقان الاستراتيجية',
      it: '<i class="fas fa-chess"></i> Padroneggia la strategia'
    },
    intro_title: {
      en: 'Welcome to BlackjackOnlineCasinos.com',
      fr: 'Bienvenue sur BlackjackOnlineCasinos.com',
      es: 'Bienvenido a BlackjackOnlineCasinos.com',
      de: 'Willkommen bei BlackjackOnlineCasinos.com',
      ar: 'مرحبًا بكم في BlackjackOnlineCasinos.com',
      it: 'Benvenuto su BlackjackOnlineCasinos.com'
    },
    intro_text1: {
      en: 'Your trusted source for all blackjack information — from rules to detailed strategies and the best tips for playing online! We provide many useful tips and recommendations so you can study the game with confidence.',
      fr: 'Votre source fiable pour toutes les informations sur le blackjack — des règles aux stratégies détaillées et aux meilleurs conseils pour jouer en ligne ! Nous fournissons de nombreux conseils utiles pour que vous puissiez étudier le jeu en toute confiance.',
      es: 'Tu fuente confiable para toda la información sobre blackjack — desde reglas hasta estrategias detalladas y los mejores consejos para jugar online! Proporcionamos muchos consejos útiles para que puedas estudiar el juego con confianza.',
      de: 'Ihre vertrauenswürdige Quelle für alle Blackjack-Informationen — von den Regeln über detaillierte Strategien bis hin zu den besten Tipps für das Online-Spiel! Wir bieten viele nützliche Tipps und Empfehlungen, damit Sie das Spiel selbstbewusst lernen können.',
      ar: 'مصدرك الموثوق لجميع معلومات البلاك جاك — من القواعد إلى الاستراتيجيات المفصلة وأفضل النصائح للعب عبر الإنترنت! نقدم العديد من النصائح والتوصيات المفيدة حتى تتمكن من دراسة اللعبة بثقة.',
      it: 'La tua fonte affidabile per tutte le informazioni sul blackjack — dalle regole alle strategie dettagliate e i migliori consigli per giocare online! Forniamo molti suggerimenti utili e raccomandazioni per permetterti di studiare il gioco con sicurezza.'
    },
    intro_btn: {
      en: 'Read Full Guide <i class="fas fa-arrow-right"></i>',
      fr: 'Lire le guide complet <i class="fas fa-arrow-right"></i>',
      es: 'Leer la guía completa <i class="fas fa-arrow-right"></i>',
      de: 'Vollständigen Leitfaden lesen <i class="fas fa-arrow-right"></i>',
      ar: 'اقرأ الدليل الكامل <i class="fas fa-arrow-right"></i>',
      it: 'Leggi la guida completa <i class="fas fa-arrow-right"></i>'
    },
    intro_text2: {
      en: 'We recommend you choose a casino from the list below. All our recommended casinos are <strong>licensed, safe, offer lucrative bonuses, and guarantee all payouts</strong> in over 4 currencies. Apply long-term strategies to improve your earnings.',
      fr: 'Nous vous recommandons de choisir un casino dans la liste ci-dessous. Tous nos casinos recommandés sont <strong>agréés, sûrs, offrent des bonus lucratifs et garantissent tous les paiements</strong> dans plus de 4 devises. Appliquez des stratégies à long terme pour améliorer vos gains.',
      es: 'Te recomendamos elegir un casino de la lista a continuación. Todos nuestros casinos recomendados son <strong>licenciados, seguros, ofrecen bonos lucrativos y garantizan todos los pagos</strong> en más de 4 monedas. Aplica estrategias a largo plazo para mejorar tus ganancias.',
      de: 'Wir empfehlen Ihnen, ein Casino aus der Liste unten auszuwählen. Alle unsere empfohlenen Casinos sind <strong>lizenziert, sicher, bieten lukrative Boni und garantieren alle Auszahlungen</strong> in über 4 Währungen. Wenden Sie langfristige Strategien an, um Ihre Gewinne zu verbessern.',
      ar: 'نوصيك باختيار كازينو من القائمة أدناه. جميع الكازينوهات التي نوصي بها <strong>مرخصة وآمنة وتقدم مكافآت مربحة وتضمن جميع المدفوعات</strong> بأكثر من 4 عملات. طبق استراتيجيات طويلة الأجل لتحسين أرباحك.',
      it: 'Ti consigliamo di scegliere un casinò dalla lista qui sotto. Tutti i nostri casinò consigliati sono <strong>autorizzati, sicuri, offrono bonus vantaggiosi e garantiscono tutti i pagamenti</strong> in oltre 4 valute. Applica strategie a lungo termine per migliorare i tuoi guadagni.'
    },
    intro_text3: {
      en: 'While blackjack uses luck, <strong>skill matters more</strong>. To increase your chances of winning we recommend you play perfect strategy, count cards, and learn the steps for improving your stiff and pat hands. Always play at licensed casinos — they guarantee all payouts and offer around-the-clock customer support, along with online security.',
      fr: 'Bien que le blackjack fasse appel à la chance, <strong>la compétence compte plus</strong>. Pour augmenter vos chances de gagner, nous vous recommandons de jouer avec une stratégie parfaite, de compter les cartes et d\'apprendre les étapes pour améliorer vos mains. Jouez toujours dans des casinos agréés — ils garantissent tous les paiements et offrent un support client 24h/24, ainsi qu\'une sécurité en ligne.',
      es: 'Aunque el blackjack usa la suerte, <strong>la habilidad importa más</strong>. Para aumentar tus posibilidades de ganar, te recomendamos jugar con estrategia perfecta, contar cartas y aprender los pasos para mejorar tus manos. Juega siempre en casinos con licencia — garantizan todos los pagos y ofrecen atención al cliente las 24 horas, junto con seguridad en línea.',
      de: 'Obwohl Blackjack Glück beinhaltet, <strong>zählt Können mehr</strong>. Um Ihre Gewinnchancen zu erhöhen, empfehlen wir Ihnen, mit perfekter Strategie zu spielen, Karten zu zählen und die Schritte zur Verbesserung Ihrer Hände zu lernen. Spielen Sie immer in lizenzierten Casinos — sie garantieren alle Auszahlungen und bieten rund um die Uhr Kundensupport sowie Online-Sicherheit.',
      ar: 'على الرغم من أن البلاك جاك يعتمد على الحظ، <strong>إلا أن المهارة更重要</strong>. لزيادة فرصك في الفوز، نوصيك باللعب باستراتيجية مثالية، وعد البطاقات، وتعلم خطوات تحسين أوراقك. العب دائمًا في الكازينوهات المرخصة — فهي تضمن جميع المدفوعات وتقدم دعم العملاء على مدار الساعة، بالإضافة إلى الأمان عبر الإنترنت.',
      it: 'Anche se il blackjack usa la fortuna, <strong>l\'abilità conta di più</strong>. Per aumentare le tue possibilità di vincita, ti consigliamo di giocare con una strategia perfetta, contare le carte e imparare i passaggi per migliorare le tue mani. Gioca sempre in casinò autorizzati — garantiscono tutti i pagamenti e offrono assistenza clienti 24 ore su 24, insieme alla sicurezza online.'
    },
    stat_perfect_hand: {
      en: 'The Perfect Hand', fr: 'La main parfaite', es: 'La mano perfecta', de: 'Die perfekte Hand', ar: 'اليد المثالية', it: 'La mano perfetta'
    },
    stat_house_edge: {
      en: 'House Edge with Basic Strategy', fr: 'Avantage de la maison avec stratégie de base', es: 'Ventaja de la casa con estrategia básica', de: 'Hausvorteil mit Grundstrategie', ar: 'ميزة الكازينو مع الاستراتيجية الأساسية', it: 'Vantaggio del banco con strategia di base'
    },
    stat_casinos_reviewed: {
      en: 'Online Casinos Reviewed', fr: 'Casinos en ligne évalués', es: 'Casinos online revisados', de: 'Online-Casinos bewertet', ar: 'الكازينوهات التي تمت مراجعتها', it: 'Casinò online recensiti'
    },
    ticker_title: {
      en: 'Top Rated Blackjack Casinos', fr: 'Meilleurs casinos de blackjack', es: 'Los mejores casinos de blackjack', de: 'Top-bewertete Blackjack-Casinos', ar: 'أفضل كازينوهات البلاك جاك', it: 'I migliori casinò di blackjack'
    },
    ticker_subtitle: {
      en: 'Play at the best online casinos — tested and approved by our experts.',
      fr: 'Jouez dans les meilleurs casinos en ligne — testés et approuvés par nos experts.',
      es: 'Juega en los mejores casinos online — probados y aprobados por nuestros expertos.',
      de: 'Spielen Sie in den besten Online-Casinos — getestet und von unseren Experten genehmigt.',
      ar: 'العب في أفضل الكازينوهات عبر الإنترنت — تم اختبارها والموافقة عليها من قبل خبرائنا.',
      it: 'Gioca nei migliori casinò online — testati e approvati dai nostri esperti.'
    },
    ticker_btn: {
      en: 'View All Casino Reviews <i class="fas fa-arrow-right"></i>',
      fr: 'Voir tous les avis <i class="fas fa-arrow-right"></i>',
      es: 'Ver todas las reseñas <i class="fas fa-arrow-right"></i>',
      de: 'Alle Bewertungen anzeigen <i class="fas fa-arrow-right"></i>',
      ar: 'عرض جميع المراجعات <i class="fas fa-arrow-right"></i>',
      it: 'Vedi tutte le recensioni <i class="fas fa-arrow-right"></i>'
    },
    explore_title: {
      en: 'Explore Blackjack', fr: 'Explorez le Blackjack', es: 'Explora el Blackjack', de: 'Blackjack entdecken', ar: 'استكشف البلاك جاك', it: 'Esplora il Blackjack'
    },
    explore_subtitle: {
      en: 'Everything you need to know about the game, all in one place.',
      fr: 'Tout ce que vous devez savoir sur le jeu, en un seul endroit.',
      es: 'Todo lo que necesitas saber sobre el juego, todo en un solo lugar.',
      de: 'Alles, was Sie über das Spiel wissen müssen, an einem Ort.',
      ar: 'كل ما تحتاج لمعرفته عن اللعبة، في مكان واحد.',
      it: 'Tutto ciò che devi sapere sul gioco, tutto in un unico posto.'
    },
    cat_rules_title: {
      en: 'Rules &amp; Basics', fr: 'Règles et bases', es: 'Reglas y conceptos básicos', de: 'Regeln und Grundlagen', ar: 'القواعد والأساسيات', it: 'Regole e basi'
    },
    cat_rules_desc: {
      en: 'Learn how to play blackjack — card values, dealing, splitting, doubling down, and insurance explained simply.',
      fr: 'Apprenez à jouer au blackjack — valeurs des cartes, distribution, split, double et assurance expliqués simplement.',
      es: 'Aprende a jugar al blackjack — valores de las cartas, reparto, división, doblar y seguro explicados de forma sencilla.',
      de: 'Lernen Sie Blackjack zu spielen — Kartenwerte, Austeilen, Splitten, Verdoppeln und Versicherung einfach erklärt.',
      ar: 'تعلم كيفية لعب البلاك جاك — قيم البطاقات، والتوزيع، والتقسيم، والمضاعفة، والتأمين بشرح بسيط.',
      it: 'Impara a giocare a blackjack — valori delle carte, distribuzione, split, raddoppio e assicurazione spiegati semplicemente.'
    },
    cat_rules_link: {
      en: 'Learn Rules <i class="fas fa-arrow-right"></i>',
      fr: 'Apprendre les règles <i class="fas fa-arrow-right"></i>',
      es: 'Aprende reglas <i class="fas fa-arrow-right"></i>',
      de: 'Regeln lernen <i class="fas fa-arrow-right"></i>',
      ar: 'تعلم القواعد <i class="fas fa-arrow-right"></i>',
      it: 'Impara le regole <i class="fas fa-arrow-right"></i>'
    },
    cat_strategy_title: {
      en: 'Blackjack Strategy', fr: 'Stratégie de blackjack', es: 'Estrategia de blackjack', de: 'Blackjack-Strategie', ar: 'استراتيجية البلاك جاك', it: 'Strategia del blackjack'
    },
    cat_strategy_desc: {
      en: 'Master basic strategy, card counting, bankroll management, and advanced tactics to minimize the house edge.',
      fr: 'Maîtrisez la stratégie de base, le comptage de cartes, la gestion de bankroll et les tactiques avancées pour minimiser l\'avantage de la maison.',
      es: 'Domina la estrategia básica, el conteo de cartas, la gestión de fondos y las tácticas avanzadas para minimizar la ventaja de la casa.',
      de: 'Meistern Sie die Grundstrategie, Kartenzählen, Bankroll-Management und fortgeschrittene Taktiken, um den Hausvorteil zu minimieren.',
      ar: 'أتقن الاستراتيجية الأساسية، وعد البطاقات، وإدارة الرصيد، والتكتيكات المتقدمة لتقليل ميزة الكازينو.',
      it: 'Padroneggia la strategia di base, il conteggio delle carte, la gestione del bankroll e le tattiche avanzate per minimizzare il vantaggio del banco.'
    },
    cat_strategy_link: {
      en: 'Explore Strategy <i class="fas fa-arrow-right"></i>',
      fr: 'Explorer la stratégie <i class="fas fa-arrow-right"></i>',
      es: 'Explorar estrategia <i class="fas fa-arrow-right"></i>',
      de: 'Strategie erkunden <i class="fas fa-arrow-right"></i>',
      ar: 'استكشف الاستراتيجية <i class="fas fa-arrow-right"></i>',
      it: 'Esplora la strategia <i class="fas fa-arrow-right"></i>'
    },
    cat_reviews_title: {
      en: 'Casino Reviews', fr: 'Avis sur les casinos', es: 'Reseñas de casinos', de: 'Casino-Bewertungen', ar: 'مراجعات الكازينوهات', it: 'Recensioni dei casinò'
    },
    cat_reviews_desc: {
      en: 'Honest, expert reviews of the best online casinos to play blackjack for real money. Bonuses, game variety, payout speed.',
      fr: 'Avis honnêtes et experts des meilleurs casinos en ligne pour jouer au blackjack avec de l\'argent réel. Bonus, variété de jeux, rapidité de paiement.',
      es: 'Reseñas honestas y expertas de los mejores casinos online para jugar blackjack con dinero real. Bonos, variedad de juegos, velocidad de pago.',
      de: 'Ehrliche, fachkundige Bewertungen der besten Online-Casinos für Blackjack mit echtem Geld. Boni, Spielvielfalt, Auszahlungsgeschwindigkeit.',
      ar: 'مراجعات صادقة وخبيرة لأفضل الكازينوهات عبر الإنترنت للعب البلاك جاك بأموال حقيقية. المكافآت، تنوع الألعاب، سرعة الدفع.',
      it: 'Recensioni oneste ed esperte dei migliori casinò online per giocare a blackjack con soldi veri. Bonus, varietà di giochi, velocità di pagamento.'
    },
    cat_reviews_link: {
      en: 'View Reviews <i class="fas fa-arrow-right"></i>',
      fr: 'Voir les avis <i class="fas fa-arrow-right"></i>',
      es: 'Ver reseñas <i class="fas fa-arrow-right"></i>',
      de: 'Bewertungen anzeigen <i class="fas fa-arrow-right"></i>',
      ar: 'عرض المراجعات <i class="fas fa-arrow-right"></i>',
      it: 'Vedi recensioni <i class="fas fa-arrow-right"></i>'
    },
    cat_glossary_title: {
      en: 'Glossary', fr: 'Glossaire', es: 'Glosario', de: 'Glossar', ar: 'قاموس المصطلحات', it: 'Glossario'
    },
    cat_glossary_desc: {
      en: 'Complete dictionary of blackjack terms — from "Action" to "Yo" — so you never feel lost at the table.',
      fr: 'Dictionnaire complet des termes du blackjack — de "Action" à "Yo" — pour ne jamais vous sentir perdu à la table.',
      es: 'Diccionario completo de términos de blackjack — desde "Action" hasta "Yo" — para que nunca te sientas perdido en la mesa.',
      de: 'Vollständiges Wörterbuch der Blackjack-Begriffe — von "Action" bis "Yo" — damit Sie sich am Tisch nie verloren fühlen.',
      ar: 'قاموس كامل لمصطلحات البلاك جاك — من "Action" إلى "Yo" — حتى لا تشعر بالضياع على الطاولة أبدًا.',
      it: 'Dizionario completo dei termini del blackjack — da "Action" a "Yo" — per non sentirsi mai persi al tavolo.'
    },
    cat_glossary_link: {
      en: 'Browse Terms <i class="fas fa-arrow-right"></i>',
      fr: 'Parcourir les termes <i class="fas fa-arrow-right"></i>',
      es: 'Explorar términos <i class="fas fa-arrow-right"></i>',
      de: 'Begriffe durchsuchen <i class="fas fa-arrow-right"></i>',
      ar: 'تصفح المصطلحات <i class="fas fa-arrow-right"></i>',
      it: 'Sfoglia i termini <i class="fas fa-arrow-right"></i>'
    },
    providers_title: {
      en: 'Recommended Live Dealer Blackjack Software Providers',
      fr: 'Fournisseurs de logiciels de blackjack en direct recommandés',
      es: 'Proveedores de software de blackjack en vivo recomendados',
      de: 'Empfohlene Live-Dealer-Blackjack-Softwareanbieter',
      ar: 'موفرو برامج البلاك جاك المباشر الموصى بهم',
      it: 'Fornitori di software blackjack dal vivo consigliati'
    },
    providers_subtitle: {
      en: "We only recommend games from the industry's most trusted and licensed providers.",
      fr: 'Nous ne recommandons que des jeux provenant des fournisseurs les plus fiables et agréés du secteur.',
      es: 'Solo recomendamos juegos de los proveedores más confiables y con licencia de la industria.',
      de: 'Wir empfehlen nur Spiele der vertrauenswürdigsten und lizenzierten Anbieter der Branche.',
      ar: 'نوصي فقط بألعاب من أكثر مقدمي الخدمات الموثوقين والمرخصين في الصناعة.',
      it: 'Raccomandiamo solo giochi dei fornitori più affidabili e autorizzati del settore.'
    },
    provider_desc_live: {
      en: 'Live Dealer Blackjack Online Casinos',
      fr: 'Blackjack en direct dans les casinos en ligne',
      es: 'Blackjack en vivo en casinos online',
      de: 'Live-Dealer-Blackjack in Online-Casinos',
      ar: 'بلاك جاك مباشر في الكازينوهات عبر الإنترنت',
      it: 'Blackjack dal vivo nei casinò online'
    },
    why_title: {
      en: 'Why Play at Licensed Casinos?', fr: 'Pourquoi jouer dans des casinos agréés ?', es: '¿Por qué jugar en casinos con licencia?', de: 'Warum in lizenzierten Casinos spielen?', ar: 'لماذا تلعب في الكازينوهات المرخصة؟', it: 'Perché giocare nei casinò autorizzati?'
    },
    why_subtitle: {
      en: 'Licensed casinos guarantee fair play, secure transactions, and reliable payouts.',
      fr: 'Les casinos agréés garantissent un jeu équitable, des transactions sécurisées et des paiements fiables.',
      es: 'Los casinos con licencia garantizan juego limpio, transacciones seguras y pagos confiables.',
      de: 'Lizenzierte Casinos garantieren faires Spiel, sichere Transaktionen und zuverlässige Auszahlungen.',
      ar: 'الكازينوهات المرخصة تضمن اللعب النظيف، والمعاملات الآمنة، والمدفوعات الموثوقة.',
      it: 'I casinò autorizzati garantiscono gioco equo, transazioni sicure e pagamenti affidabili.'
    },
    why_licensed_title: {
      en: 'Licensed &amp; Regulated', fr: 'Agréé et réglementé', es: 'Con licencia y regulado', de: 'Lizenziert und reguliert', ar: 'مرخص ومنظم', it: 'Autorizzato e regolamentato'
    },
    why_licensed_text: {
      en: 'All recommended casinos are fully licensed, secure, and guarantee all payouts with around-the-clock customer support.',
      fr: 'Tous les casinos recommandés sont entièrement agréés, sécurisés et garantissent tous les paiements avec un support client 24h/24.',
      es: 'Todos los casinos recomendados están completamente licenciados, son seguros y garantizan todos los pagos con atención al cliente las 24 horas.',
      de: 'Alle empfohlenen Casinos sind vollständig lizenziert, sicher und garantieren alle Auszahlungen mit rund um die Uhr erreichbarem Kundensupport.',
      ar: 'جميع الكازينوهات الموصى بها مرخصة بالكامل وآمنة وتضمن جميع المدفوعات مع دعم العملاء على مدار الساعة.',
      it: 'Tutti i casinò consigliati sono completamente autorizzati, sicuri e garantiscono tutti i pagamenti con assistenza clienti 24 ore su 24.'
    },
    why_bonuses_title: {
      en: 'Lucrative Bonuses', fr: 'Bonus lucratifs', es: 'Bonos lucrativos', de: 'Lukrative Boni', ar: 'مكافآت مربحة', it: 'Bonus vantaggiosi'
    },
    why_bonuses_text: {
      en: 'Welcome bonuses, free spins, and regular promotions. Play with extra value and increase your bankroll from day one.',
      fr: 'Bonus de bienvenue, tours gratuits et promotions régulières. Jouez avec une valeur ajoutée et augmentez votre bankroll dès le premier jour.',
      es: 'Bonos de bienvenida, giros gratis y promociones regulares. Juega con valor extra y aumenta tu bankroll desde el primer día.',
      de: 'Willkommensboni, Freispiele und regelmäßige Aktionen. Spielen Sie mit Mehrwert und erhöhen Sie Ihr Bankroll von Tag eins an.',
      ar: 'مكافآت الترحيب، والدورات المجانية، والعروض الترويجية المنتظمة. العب بقيمة إضافية وزد رصيدك من اليوم الأول.',
      it: 'Bonus di benvenuto, giri gratuiti e promozioni regolari. Gioca con valore extra e aumenta il tuo bankroll dal primo giorno.'
    },
    why_currency_title: {
      en: 'Multi-Currency Support', fr: 'Support multi-devises', es: 'Soporte multimoneda', de: 'Multiwährungsunterstützung', ar: 'دعم العملات المتعددة', it: 'Supporto multivaluta'
    },
    why_currency_text: {
      en: 'Deposits and withdrawals in over 4 currencies. Play from anywhere in the world without worrying about exchange rates.',
      fr: 'Dépôts et retraits dans plus de 4 devises. Jouez de n\'importe où dans le monde sans vous soucier des taux de change.',
      es: 'Depósitos y retiros en más de 4 monedas. Juega desde cualquier lugar del mundo sin preocuparte por los tipos de cambio.',
      de: 'Ein- und Auszahlungen in über 4 Währungen. Spielen Sie von überall auf der Welt, ohne sich um Wechselkurse sorgen zu müssen.',
      ar: 'الإيداع والسحب بأكثر من 4 عملات. العب من أي مكان في العالم دون القلق بشأن أسعار الصرف.',
      it: 'Depositi e prelievi in oltre 4 valute. Gioca da qualsiasi parte del mondo senza preoccuparti dei tassi di cambio.'
    },
    why_support_title: {
      en: '24/7 Customer Support', fr: 'Support client 24/7', es: 'Atención al cliente 24/7', de: 'Kundensupport rund um die Uhr', ar: 'دعم العملاء على مدار الساعة', it: 'Assistenza clienti 24/7'
    },
    why_support_text: {
      en: 'Round-the-clock support via live chat, email, and phone. Get help whenever you need it.',
      fr: 'Support 24h/24 par chat en direct, email et téléphone. Obtenez de l\'aide quand vous en avez besoin.',
      es: 'Soporte las 24 horas a través de chat en vivo, correo electrónico y teléfono. Obtén ayuda cuando la necesites.',
      de: 'Rund-um-die-Uhr-Support per Live-Chat, E-Mail und Telefon. Holen Sie sich Hilfe, wann immer Sie sie brauchen.',
      ar: 'دعم على مدار الساعة عبر الدردشة المباشرة والبريد الإلكتروني والهاتف. احصل على المساعدة عندما تحتاجها.',
      it: 'Supporto 24 ore su 24 tramite chat dal vivo, email e telefono. Ottieni aiuto quando ne hai bisogno.'
    },
    testimonials_title: {
      en: 'What Players Say', fr: 'Ce que disent les joueurs', es: 'Lo que dicen los jugadores', de: 'Was Spieler sagen', ar: 'ماذا يقول اللاعبون', it: 'Cosa dicono i giocatori'
    },
    testimonials_subtitle: {
      en: 'Real feedback from our community of blackjack players.',
      fr: 'Retours réels de notre communauté de joueurs de blackjack.',
      es: 'Comentarios reales de nuestra comunidad de jugadores de blackjack.',
      de: 'Echtes Feedback aus unserer Community von Blackjack-Spielern.',
      ar: 'تعليقات حقيقية من مجتمعنا من لاعبي البلاك جاك.',
      it: 'Feedback reali dalla nostra comunità di giocatori di blackjack.'
    },
    testimonial_1: {
      en: '"This site helped me go from a total beginner to winning consistently. The basic strategy charts are gold!"<br><span class="ticker-author">— Alex K., London</span>',
      fr: '"Ce site m\'a aidé à passer de débutant total à gagnant régulier. Les tableaux de stratégie de base sont en or!"<br><span class="ticker-author">— Alex K., Londres</span>',
      es: '"Este sitio me ayudó a pasar de principiante total a ganar consistentemente. ¡Los cuadros de estrategia básica son oro!"<br><span class="ticker-author">— Alex K., Londres</span>',
      de: '"Diese Seite hat mir geholfen, vom totalen Anfänger zum konsequenten Gewinner zu werden. Die Grundstrategietabellen sind Gold wert!"<br><span class="ticker-author">— Alex K., London</span>',
      ar: '"ساعدني هذا الموقع في الانتقال من مبتدئ تمامًا إلى ربح مستمر. جداول الاستراتيجية الأساسية من ذهب!"<br><span class="ticker-author">— أليكس ك.، لندن</span>',
      it: '"Questo sito mi ha aiutato a passare da principiante assoluto a vincitore costante. I grafici della strategia di base sono d\'oro!"<br><span class="ticker-author">— Alex K., Londra</span>'
    },
    testimonial_2: {
      en: '"Best blackjack resource I\'ve found online. The casino reviews saved me from signing up at some shady places."<br><span class="ticker-author">— Marcus J., Sydney</span>',
      fr: '"La meilleure ressource de blackjack que j\'ai trouvée en ligne. Les avis sur les casinos m\'ont évité de m\'inscrire dans des endroits douteux."<br><span class="ticker-author">— Marcus J., Sydney</span>',
      es: '"El mejor recurso de blackjack que he encontrado en línea. Las reseñas de casinos me salvaron de registrarme en lugares sospechosos."<br><span class="ticker-author">— Marcus J., Sídney</span>',
      de: '"Die beste Blackjack-Ressource, die ich online gefunden habe. Die Casino-Bewertungen haben mich davor bewahrt, mich bei zwielichtigen Orten anzumelden."<br><span class="ticker-author">— Marcus J., Sydney</span>',
      ar: '"أفضل مصدر للبلاك جاك وجدته على الإنترنت. أنقذتني مراجعات الكازينو من التسجيل في بعض الأماكن المشبوهة."<br><span class="ticker-author">— ماركوس ج.، سيدني</span>',
      it: '"La migliore risorsa sul blackjack che abbia trovato online. Le recensioni dei casinò mi hanno salvato dall\'iscrivermi in posti loschi."<br><span class="ticker-author">— Marcus J., Sydney</span>'
    },
    testimonial_3: {
      en: '"Card counting guide finally made it click for me. Been practicing every day. Great stuff!"<br><span class="ticker-author">— Dmitry S., Toronto</span>',
      fr: '"Le guide de comptage de cartes m\'a enfin fait comprendre. Je m\'entraîne tous les jours. Super contenu!"<br><span class="ticker-author">— Dmitry S., Toronto</span>',
      es: '"La guía de conteo de cartas finalmente me hizo entender. He estado practicando todos los días. ¡Grandioso!"<br><span class="ticker-author">— Dmitry S., Toronto</span>',
      de: '"Der Leitfaden zum Kartenzählen hat es mir endlich klar gemacht. Ich übe jeden Tag. Tolles Zeug!"<br><span class="ticker-author">— Dmitry S., Toronto</span>',
      ar: '"دليل عد البطاقات جعلني أخيرًا أفهم. أتدرب كل يوم. محتوى رائع!"<br><span class="ticker-author">— دميتري س.، تورونتو</span>',
      it: '"La guida al conteggio delle carte mi ha finalmente fatto capire. Mi sono allenato ogni giorno. Roba fantastica!"<br><span class="ticker-author">— Dmitry S., Toronto</span>'
    },
    testimonial_4: {
      en: '"I\'ve been playing blackjack for 10 years and still learned new things from the strategy section. Highly recommend."<br><span class="ticker-author">— Carlos M., Barcelona</span>',
      fr: '"Je joue au blackjack depuis 10 ans et j\'ai encore appris de nouvelles choses dans la section stratégie. Je recommande vivement."<br><span class="ticker-author">— Carlos M., Barcelone</span>',
      es: '"He estado jugando blackjack durante 10 años y todavía aprendí cosas nuevas de la sección de estrategia. Muy recomendado."<br><span class="ticker-author">— Carlos M., Barcelona</span>',
      de: '"Ich spiele seit 10 Jahren Blackjack und habe im Strategiebereich noch Neues gelernt. Sehr empfehlenswert."<br><span class="ticker-author">— Carlos M., Barcelona</span>',
      ar: '"ألعب البلاك جاك منذ 10 سنوات وما زلت أتعلم أشياء جديدة من قسم الاستراتيجية. أوصي بشدة."<br><span class="ticker-author">— كارلوس م.، برشلونة</span>',
      it: '"Gioco a blackjack da 10 anni e ho ancora imparato cose nuove dalla sezione strategia. Altamente raccomandato."<br><span class="ticker-author">— Carlos M., Barcellona</span>'
    },
    testimonial_5: {
      en: '"Live dealer section is spot on. Found my new favourite casino through the reviews. Thanks team!"<br><span class="ticker-author">— Emma W., Dublin</span>',
      fr: '"La section croupier en direct est parfaite. J\'ai trouvé mon nouveau casino préféré grâce aux avis. Merci l\'équipe!"<br><span class="ticker-author">— Emma W., Dublin</span>',
      es: '"La sección de crupier en vivo es perfecta. Encontré mi nuevo casino favorito a través de las reseñas. ¡Gracias equipo!"<br><span class="ticker-author">— Emma W., Dublín</span>',
      de: '"Der Live-Dealer-Bereich ist perfekt. Habe mein neues Lieblingscasino durch die Bewertungen gefunden. Danke Team!"<br><span class="ticker-author">— Emma W., Dublin</span>',
      ar: '"قسم الموزع المباشر ممتاز. وجدت كازينو المفضل الجديد من خلال المراجعات. شكرًا للفريق!"<br><span class="ticker-author">— إيما و.، دبلن</span>',
      it: '"La sezione del croupier dal vivo è perfetta. Ho trovato il mio nuovo casinò preferito grazie alle recensioni. Grazie squadra!"<br><span class="ticker-author">— Emma W., Dublino</span>'
    },
    review_title: {
      en: 'Leave Your Review', fr: 'Laissez votre avis', es: 'Deja tu reseña', de: 'Hinterlassen Sie Ihre Bewertung', ar: 'اترك مراجعتك', it: 'Lascia la tua recensione'
    },
    review_subtitle: {
      en: 'Share your experience with the blackjack community.',
      fr: 'Partagez votre expérience avec la communauté du blackjack.',
      es: 'Comparte tu experiencia con la comunidad de blackjack.',
      de: 'Teilen Sie Ihre Erfahrung mit der Blackjack-Community.',
      ar: 'شارك تجربتك مع مجتمع البلاك جاك.',
      it: 'Condividi la tua esperienza con la comunità del blackjack.'
    },
    review_name_label: {
      en: 'Your Name', fr: 'Votre nom', es: 'Tu nombre', de: 'Ihr Name', ar: 'اسمك', it: 'Il tuo nome'
    },
    review_name_placeholder: {
      en: 'e.g. John D.', fr: 'Ex: Jean D.', es: 'Ej: Juan G.', de: 'z.B. Max M.', ar: 'مثال: أحمد م.', it: 'Es: Marco R.'
    },
    review_email_label: {
      en: 'Email (not published)', fr: 'Email (non publié)', es: 'Email (no publicado)', de: 'E-Mail (nicht veröffentlicht)', ar: 'البريد الإلكتروني (غير منشور)', it: 'Email (non pubblicato)'
    },
    review_message_label: {
      en: 'Your Review', fr: 'Votre avis', es: 'Tu reseña', de: 'Ihre Bewertung', ar: 'مراجعتك', it: 'La tua recensione'
    },
    review_message_placeholder: {
      en: 'Tell us about your experience playing blackjack...',
      fr: 'Parlez-nous de votre expérience au blackjack...',
      es: 'Cuéntanos tu experiencia jugando al blackjack...',
      de: 'Erzählen Sie uns von Ihren Blackjack-Erfahrungen...',
      ar: 'أخبرنا عن تجربتك في لعب البلاك جاك...',
      it: 'Raccontaci la tua esperienza giocando a blackjack...'
    },
    review_btn: {
      en: '<i class="fas fa-paper-plane"></i> Submit Review',
      fr: '<i class="fas fa-paper-plane"></i> Soumettre l\'avis',
      es: '<i class="fas fa-paper-plane"></i> Enviar reseña',
      de: '<i class="fas fa-paper-plane"></i> Bewertung absenden',
      ar: '<i class="fas fa-paper-plane"></i> إرسال المراجعة',
      it: '<i class="fas fa-paper-plane"></i> Invia recensione'
    },
    review_success: {
      en: 'Thank you! Your review has been submitted.',
      fr: 'Merci ! Votre avis a été soumis.',
      es: '¡Gracias! Tu reseña ha sido enviada.',
      de: 'Vielen Dank! Ihre Bewertung wurde eingereicht.',
      ar: 'شكرًا لك! تم إرسال مراجعتك.',
      it: 'Grazie! La tua recensione è stata inviata.'
    },
    cta_title: {
      en: 'Play Live Dealer Blackjack Today',
      fr: 'Jouez au Blackjack en direct aujourd\'hui',
      es: 'Juega al Blackjack en vivo hoy',
      de: 'Spielen Sie noch heute Live-Dealer-Blackjack',
      ar: 'العب بلاك جاك مباشر اليوم',
      it: 'Gioca al Blackjack dal vivo oggi'
    },
    cta_text: {
      en: 'Experience the thrill of real blackjack with professional live dealers, HD streaming, and interactive gameplay from the comfort of your home.',
      fr: 'Vivez le frisson du vrai blackjack avec des croupiers en direct professionnels, du streaming HD et un gameplay interactif depuis le confort de votre maison.',
      es: 'Experimenta la emoción del blackjack real con crupieres en vivo profesionales, transmisión HD y juego interactivo desde la comodidad de tu hogar.',
      de: 'Erleben Sie den Nervenkitzel des echten Blackjack mit professionellen Live-Dealern, HD-Streaming und interaktivem Gameplay bequem von zu Hause aus.',
      ar: 'اختبر إثارة البلاك جاك الحقيقي مع موزعين مباشرين محترفين، وبث عالي الدقة، ولعب تفاعلي من راحة منزلك.',
      it: 'Vivi l\'emozione del vero blackjack con croupier dal vivo professionisti, streaming HD e gameplay interattivo comodamente da casa tua.'
    },
    cta_btn: {
      en: '<i class="fas fa-trophy animate-glow"></i> See Recommended Casinos',
      fr: '<i class="fas fa-trophy animate-glow"></i> Voir les casinos recommandés',
      es: '<i class="fas fa-trophy animate-glow"></i> Ver casinos recomendados',
      de: '<i class="fas fa-trophy animate-glow"></i> Empfohlene Casinos anzeigen',
      ar: '<i class="fas fa-trophy animate-glow"></i> عرض الكازينوهات الموصى بها',
      it: '<i class="fas fa-trophy animate-glow"></i> Vedi i casinò consigliati'
    },
    footer_desc: {
      en: 'Your trusted source for all blackjack information — from rules to detailed strategies and the best tips for playing online.',
      fr: 'Votre source fiable pour toutes les informations sur le blackjack — des règles aux stratégies détaillées et aux meilleurs conseils pour jouer en ligne.',
      es: 'Tu fuente confiable para toda la información sobre blackjack — desde reglas hasta estrategias detalladas y los mejores consejos para jugar online.',
      de: 'Ihre vertrauenswürdige Quelle für alle Blackjack-Informationen — von den Regeln über detaillierte Strategien bis hin zu den besten Tipps für das Online-Spiel.',
      ar: 'مصدرك الموثوق لجميع معلومات البلاك جاك — من القواعد إلى الاستراتيجيات المفصلة وأفضل النصائح للعب عبر الإنترنت.',
      it: 'La tua fonte affidabile per tutte le informazioni sul blackjack — dalle regole alle strategie dettagliate e i migliori consigli per giocare online.'
    },
    footer_quick_links: {
      en: 'Quick Links', fr: 'Liens rapides', es: 'Enlaces rápidos', de: 'Schnelllinks', ar: 'روابط سريعة', it: 'Link rapidi'
    },
    footer_resources: {
      en: 'Resources', fr: 'Ressources', es: 'Recursos', de: 'Ressourcen', ar: 'الموارد', it: 'Risorse'
    },
    footer_contact: {
      en: 'Contact Us', fr: 'Nous contacter', es: 'Contáctanos', de: 'Kontaktieren Sie uns', ar: 'اتصل بنا', it: 'Contattaci'
    },
    footer_privacy: {
      en: 'Privacy Policy', fr: 'Politique de confidentialité', es: 'Política de privacidad', de: 'Datenschutz', ar: 'سياسة الخصوصية', it: 'Informativa sulla privacy'
    },
    footer_terms: {
      en: 'Terms of Use', fr: 'Conditions d\'utilisation', es: 'Términos de uso', de: 'Nutzungsbedingungen', ar: 'شروط الاستخدام', it: 'Termini di utilizzo'
    },
    footer_responsible: {
      en: 'Responsible Gaming', fr: 'Jeu responsable', es: 'Juego responsable', de: 'Verantwortungsvolles Spielen', ar: 'اللعب المسؤول', it: 'Gioco responsabile'
    },
    footer_disclaimer: {
      en: '<strong>Disclaimer and Terms:</strong> This website is for informational purposes only. No guarantees of accuracy, completeness, or reliability of content are made. Use of this site is at your own risk. BlackjackOnlineCasinos.com may receive compensation for third party content and outgoing affiliate links posted on this website.',
      fr: '<strong>Avertissement et conditions :</strong> Ce site web est à titre informatif uniquement. Aucune garantie d\'exactitude, d\'exhaustivité ou de fiabilité du contenu n\'est faite. L\'utilisation de ce site est à vos propres risques. BlackjackOnlineCasinos.com peut recevoir une compensation pour le contenu tiers et les liens d\'affiliation sortants publiés sur ce site.',
      es: '<strong>Descargo de responsabilidad y términos:</strong> Este sitio web es solo para fines informativos. No se ofrecen garantías de precisión, integridad o confiabilidad del contenido. El uso de este sitio es bajo su propio riesgo. BlackjackOnlineCasinos.com puede recibir compensación por contenido de terceros y enlaces de afiliados salientes publicados en este sitio web.',
      de: '<strong>Haftungsausschluss und Bedingungen:</strong> Diese Website dient nur zu Informationszwecken. Es werden keine Garantien für die Richtigkeit, Vollständigkeit oder Zuverlässigkeit des Inhalts übernommen. Die Nutzung dieser Website erfolgt auf eigenes Risiko. BlackjackOnlineCasinos.com kann eine Vergütung für Inhalte Dritter und ausgehende Affiliate-Links auf dieser Website erhalten.',
      ar: '<strong>إخلاء المسؤولية والشروط:</strong> هذا الموقع لأغراض إعلامية فقط. لا نقدم أي ضمانات بشأن دقة أو اكتمال أو موثوقية المحتوى. استخدام هذا الموقع على مسؤوليتك الخاصة. قد يحصل BlackjackOnlineCasinos.com على تعويض عن محتوى الطرف الثالث والروابط التابعة الصادرة المنشورة على هذا الموقع.',
      it: '<strong>Disclaimer e termini:</strong> Questo sito web è solo a scopo informativo. Non vengono fornite garanzie di accuratezza, completezza o affidabilità dei contenuti. L\'uso di questo sito è a proprio rischio. BlackjackOnlineCasinos.com potrebbe ricevere un compenso per contenuti di terze parti e link di affiliazione in uscita pubblicati su questo sito web.'
    },
    footer_cookie: {
      en: '<strong>Cookie Policy:</strong> We use cookies to analyze website traffic and optimize your website experience. By using this site, you consent to our use of cookies.',
      fr: '<strong>Politique de cookies :</strong> Nous utilisons des cookies pour analyser le trafic du site et optimiser votre expérience. En utilisant ce site, vous consentez à notre utilisation des cookies.',
      es: '<strong>Política de cookies:</strong> Utilizamos cookies para analizar el tráfico del sitio web y optimizar su experiencia. Al usar este sitio, usted acepta nuestro uso de cookies.',
      de: '<strong>Cookie-Richtlinie:</strong> Wir verwenden Cookies, um den Website-Traffic zu analysieren und Ihr Website-Erlebnis zu optimieren. Durch die Nutzung dieser Website stimmen Sie der Verwendung von Cookies zu.',
      ar: '<strong>سياسة ملفات تعريف الارتباط:</strong> نستخدم ملفات تعريف الارتباط لتحليل حركة مرور الموقع وتحسين تجربتك. باستخدام هذا الموقع، فإنك توافق على استخدامنا لملفات تعريف الارتباط.',
      it: '<strong>Politica sui cookie:</strong> Utilizziamo i cookie per analizzare il traffico del sito web e ottimizzare la tua esperienza. Utilizzando questo sito, acconsenti all\'uso dei cookie.'
    },
    footer_rights: {
      en: 'All Rights Reserved.', fr: 'Tous droits réservés.', es: 'Todos los derechos reservados.', de: 'Alle Rechte vorbehalten.', ar: 'جميع الحقوق محفوظة.', it: 'Tutti i diritti riservati.'
    },
    footer_18: {
      en: '18+ Only. Please gamble responsibly. If you or someone you know has a gambling problem, seek help. Gambling should be entertaining and played within your limits.',
      fr: '18+ Uniquement. Jouez de façon responsable. Si vous ou quelqu\'un que vous connaissez avez un problème de jeu, demandez de l\'aide. Le jeu doit être divertissant et pratiqué dans les limites de vos moyens.',
      es: 'Solo 18+. Juegue responsablemente. Si usted o alguien que conoce tiene un problema con el juego, busque ayuda. El juego debe ser entretenido y jugado dentro de sus límites.',
      de: 'Nur 18+. Bitte spielen Sie verantwortungsvoll. Wenn Sie oder jemand, den Sie kennen, ein Spielproblem hat, suchen Sie Hilfe. Glücksspiel sollte unterhaltsam sein und innerhalb Ihrer Grenzen gespielt werden.',
      ar: 'فقط 18+. يرجى المقامرة بمسؤولية. إذا كنت أنت أو أي شخص تعرفه يعاني من مشكلة مقامرة، فاطلب المساعدة. يجب أن تكون المقامرة ترفيهية وتلعب ضمن حدودك.',
      it: 'Solo 18+. Gioca responsabilmente. Se tu o qualcuno che conosci hai un problema con il gioco d\'azzardo, chiedi aiuto. Il gioco d\'azzardo dovrebbe essere divertente e praticato entro i propri limiti.'
    },
  };

  // ─── Translate a single key ───
  function t(key) {
    const entry = TRANSLATIONS[key];
    if (!entry) return key;
    return entry[currentLang] || entry[DEFAULT_LANG] || key;
  }

  // ─── Apply translations ───
  function applyTranslations() {
    // Translate innerHTML elements (can contain icons)
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      el.innerHTML = t(key);
    });

    // Translate text-only elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const translated = t(key);
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        if (el.hasAttribute('placeholder')) {
          el.setAttribute('placeholder', translated);
        } else {
          el.value = translated;
        }
      } else {
        el.innerHTML = translated;
      }
    });

    // Update html lang and dir
    document.documentElement.lang = currentLang;
    document.documentElement.dir = LANGUAGES[currentLang].dir;

    // Update language selector
    const langBtn = document.getElementById('langBtn');
    if (langBtn) {
      langBtn.innerHTML = `${LANGUAGES[currentLang].flag} ${LANGUAGES[currentLang].short} <i class="fas fa-chevron-down"></i>`;
    }
    document.querySelectorAll('.lang-option').forEach(opt => {
      opt.classList.toggle('active', opt.dataset.lang === currentLang);
    });
  }

  // ─── Change language ───
  function setLang(lang) {
    if (!LANGUAGES[lang]) return;
    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    applyTranslations();
    const dd = document.getElementById('langDropdown');
    if (dd) dd.classList.remove('active');
  }

  // ─── Init ───
  function init() {
    const container = document.getElementById('langSwitcher');
    if (container && !container.hasAttribute('data-done')) {
      container.setAttribute('data-done', '1');
      container.innerHTML = [
        '<button class="lang-btn" id="langBtn" aria-label="Select language">',
          `${LANGUAGES[currentLang].flag} ${LANGUAGES[currentLang].short} <i class="fas fa-chevron-down"></i>`,
        '</button>',
        '<div class="lang-dropdown" id="langDropdown">',
          Object.entries(LANGUAGES).map(([code, lang]) =>
            `<button class="lang-option ${code === currentLang ? 'active' : ''}" data-lang="${code}">${lang.flag} ${lang.short} — ${lang.flag === '🇸🇦' ? 'العربية' : code === 'en' ? 'English' : code === 'fr' ? 'Français' : code === 'es' ? 'Español' : code === 'de' ? 'Deutsch' : 'Italiano'}</button>`
          ).join(''),
        '</div>'
      ].join('');

      // Toggle + outside click
      document.getElementById('langBtn').addEventListener('click', function(e) {
        e.stopPropagation();
        document.getElementById('langDropdown').classList.toggle('active');
      });
      document.addEventListener('click', () => {
        const dd = document.getElementById('langDropdown');
        if (dd) dd.classList.remove('active');
      });

      // Delegate clicks on lang-option
      container.addEventListener('click', function(e) {
        const opt = e.target.closest('.lang-option');
        if (opt && opt.dataset.lang) {
          setLang(opt.dataset.lang);
        }
      });
    }

    applyTranslations();
  }

  // ─── Boot ───
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.i18nSetLang = setLang;
})();
