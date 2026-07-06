/* ==========================================
   BlackjackOnlineCasinos.com — i18n System
   6 languages: EN / FR / ES / DE / AR / IT
   ========================================== */

const i18n = (() => {
  const STORAGE_KEY = 'bj_lang';

  const LANGUAGES = {
    en: { label: '🇬🇧 English', dir: 'ltr' },
    fr: { label: '🇫🇷 Français', dir: 'ltr' },
    es: { label: '🇪🇸 Español', dir: 'ltr' },
    de: { label: '🇩🇪 Deutsch', dir: 'ltr' },
    ar: { label: '🇸🇦 العربية', dir: 'rtl' },
    it: { label: '🇮🇹 Italiano', dir: 'ltr' },
  };

  const DEFAULT_LANG = 'en';
  let currentLang = localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;

  // ─── Translations ───
  const TRANSLATIONS = {
    // ════════════════════════
    //  GLOBAL (nav, footer, shared)
    // ════════════════════════
    nav_home: {
      en: 'Home', fr: 'Accueil', es: 'Inicio', de: 'Start', ar: 'الرئيسية', it: 'Home'
    },
    nav_learn: {
      en: 'Learn the Game', fr: 'Apprendre le jeu', es: 'Aprende el juego', de: 'Lerne das Spiel', ar: 'تعلم اللعبة', it: 'Impara il gioco'
    },
    nav_advanced: {
      en: 'Advanced Play', fr: 'Jeu avancé', es: 'Juego avanzado', de: 'Fortgeschritten', ar: 'لعب متقدم', it: 'Gioco avanzato'
    },
    nav_resources: {
      en: 'Resources', fr: 'Ressources', es: 'Recursos', de: 'Ressourcen', ar: 'موارد', it: 'Risorse'
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

    // Hero
    hero_badge: {
      en: '#1 Blackjack Resource Online', fr: '#1 Ressource Blackjack en ligne', es: '#1 Recurso de Blackjack Online', de: '#1 Blackjack-Ressource online', ar: '#1 مصدر البلاك جاك أونلاين', it: '#1 Risorsa Blackjack Online'
    },
    hero_title_prefix: {
      en: 'Master Blackjack: ',
      fr: 'Maîtrisez le Blackjack : ',
      es: 'Domina el Blackjack: ',
      de: 'Meistere Blackjack: ',
      ar: 'أتقن البلاك جاك: ',
      it: 'Padroneggia il Blackjack: '
    },
    hero_title_suffix: {
      en: 'Rules, Strategy & Best Casinos',
      fr: 'Règles, Stratégie et Meilleurs Casinos',
      es: 'Reglas, Estrategia y Mejores Casinos',
      de: 'Regeln, Strategie und beste Casinos',
      ar: 'القواعد والاستراتيجية وأفضل الكازينوهات',
      it: 'Regole, Strategia e Migliori Casinò'
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
      en: 'Learn the Rules', fr: 'Apprendre les règles', es: 'Aprende las reglas', de: 'Regeln lernen', ar: 'تعلم القواعد', it: 'Impara le regole'
    },
    hero_btn_strategy: {
      en: 'Master Strategy', fr: 'Maîtriser la stratégie', es: 'Dominar la estrategia', de: 'Strategie meistern', ar: 'إتقان الاستراتيجية', it: 'Padroneggia la strategia'
    },

    // Intro section
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
    intro_read_guide: {
      en: 'Read Full Guide', fr: 'Lire le guide complet', es: 'Leer la guía completa', de: 'Vollständigen Leitfaden lesen', ar: 'اقرأ الدليل الكامل', it: 'Leggi la guida completa'
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

    // Casino ticker
    ticker_title: {
      en: 'Top Rated Blackjack Casinos',
      fr: 'Meilleurs casinos de blackjack',
      es: 'Los mejores casinos de blackjack',
      de: 'Top-bewertete Blackjack-Casinos',
      ar: 'أفضل كازينوهات البلاك جاك',
      it: 'I migliori casinò di blackjack'
    },
    ticker_subtitle: {
      en: 'Play at the best online casinos — tested and approved by our experts.',
      fr: 'Jouez dans les meilleurs casinos en ligne — testés et approuvés par nos experts.',
      es: 'Juega en los mejores casinos online — probados y aprobados por nuestros expertos.',
      de: 'Spielen Sie in den besten Online-Casinos — getestet und von unseren Experten genehmigt.',
      ar: 'العب في أفضل الكازينوهات عبر الإنترنت — تم اختبارها والموافقة عليها من قبل خبرائنا.',
      it: 'Gioca nei migliori casinò online — testati e approvati dai nostri esperti.'
    },
    ticker_view_all: {
      en: 'View All Casino Reviews', fr: 'Voir tous les avis', es: 'Ver todas las reseñas', de: 'Alle Bewertungen anzeigen', ar: 'عرض جميع المراجعات', it: 'Vedi tutte le recensioni'
    },

    // Categories
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
      en: 'Rules & Basics', fr: 'Règles et bases', es: 'Reglas y conceptos básicos', de: 'Regeln und Grundlagen', ar: 'القواعد والأساسيات', it: 'Regole e basi'
    },
    cat_rules_desc: {
      en: 'Learn how to play blackjack — card values, dealing, splitting, doubling down, and insurance explained simply.',
      fr: 'Apprenez à jouer au blackjack — valeurs des cartes, distribution, split, double et assurance expliqués simplement.',
      es: 'Aprende a jugar al blackjack — valores de las cartas, reparto, división, doblar y seguro explicados de forma sencilla.',
      de: 'Lernen Sie Blackjack zu spielen — Kartenwerte, Austeilen, Splitten, Verdoppeln und Versicherung einfach erklärt.',
      ar: 'تعلم كيفية لعب البلاك جاك — قيم البطاقات، والتوزيع، والتقسيم، والمضاعفة، والتأمين بشرح بسيط.',
      it: 'Impara a giocare a blackjack — valori delle carte, distribuzione, split, raddoppio e assicurazione spiegati semplicemente.'
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
    cat_rules_link: {
      en: 'Learn Rules', fr: 'Apprendre les règles', es: 'Aprende reglas', de: 'Regeln lernen', ar: 'تعلم القواعد', it: 'Impara le regole'
    },
    cat_strategy_link: {
      en: 'Explore Strategy', fr: 'Explorer la stratégie', es: 'Explorar estrategia', de: 'Strategie erkunden', ar: 'استكشف الاستراتيجية', it: 'Esplora la strategia'
    },
    cat_reviews_link: {
      en: 'View Reviews', fr: 'Voir les avis', es: 'Ver reseñas', de: 'Bewertungen anzeigen', ar: 'عرض المراجعات', it: 'Vedi recensioni'
    },
    cat_glossary_link: {
      en: 'Browse Terms', fr: 'Parcourir les termes', es: 'Explorar términos', de: 'Begriffe durchsuchen', ar: 'تصفح المصطلحات', it: 'Sfoglia i termini'
    },

    // Providers
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

    // Why us
    why_title: {
      en: 'Why Play at Licensed Casinos?',
      fr: 'Pourquoi jouer dans des casinos agréés ?',
      es: '¿Por qué jugar en casinos con licencia?',
      de: 'Warum in lizenzierten Casinos spielen?',
      ar: 'لماذا تلعب في الكازينوهات المرخصة؟',
      it: 'Perché giocare nei casinò autorizzati?'
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
      en: 'Licensed & Regulated', fr: 'Agréé et réglementé', es: 'Con licencia y regulado', de: 'Lizenziert und reguliert', ar: 'مرخص ومنظم', it: 'Autorizzato e regolamentato'
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

    // Testimonials
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

    // Review form
    review_form_title: {
      en: 'Leave Your Review', fr: 'Laissez votre avis', es: 'Deja tu reseña', de: 'Hinterlassen Sie Ihre Bewertung', ar: 'اترك مراجعتك', it: 'Lascia la tua recensione'
    },
    review_form_subtitle: {
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
    review_submit: {
      en: 'Submit Review', fr: 'Soumettre l\'avis', es: 'Enviar reseña', de: 'Bewertung absenden', ar: 'إرسال المراجعة', it: 'Invia recensione'
    },
    review_success: {
      en: 'Thank you! Your review has been submitted.',
      fr: 'Merci ! Votre avis a été soumis.',
      es: '¡Gracias! Tu reseña ha sido enviada.',
      de: 'Vielen Dank! Ihre Bewertung wurde eingereicht.',
      ar: 'شكرًا لك! تم إرسال مراجعتك.',
      it: 'Grazie! La tua recensione è stata inviata.'
    },

    // CTA
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
      en: 'See Recommended Casinos', fr: 'Voir les casinos recommandés', es: 'Ver casinos recomendados', de: 'Empfohlene Casinos anzeigen', ar: 'عرض الكازينوهات الموصى بها', it: 'Vedi i casinò consigliati'
    },

    // Footer
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
      en: 'Disclaimer and Terms: This website is for informational purposes only. No guarantees of accuracy, completeness, or reliability of content are made. Use of this site is at your own risk. BlackjackOnlineCasinos.com may receive compensation for third party content and outgoing affiliate links posted on this website.',
      fr: 'Avertissement et conditions : Ce site web est à titre informatif uniquement. Aucune garantie d\'exactitude, d\'exhaustivité ou de fiabilité du contenu n\'est faite. L\'utilisation de ce site est à vos propres risques. BlackjackOnlineCasinos.com peut recevoir une compensation pour le contenu tiers et les liens d\'affiliation sortants publiés sur ce site.',
      es: 'Descargo de responsabilidad y términos: Este sitio web es solo para fines informativos. No se ofrecen garantías de precisión, integridad o confiabilidad del contenido. El uso de este sitio es bajo su propio riesgo. BlackjackOnlineCasinos.com puede recibir compensación por contenido de terceros y enlaces de afiliados salientes publicados en este sitio web.',
      de: 'Haftungsausschluss und Bedingungen: Diese Website dient nur zu Informationszwecken. Es werden keine Garantien für die Richtigkeit, Vollständigkeit oder Zuverlässigkeit des Inhalts übernommen. Die Nutzung dieser Website erfolgt auf eigenes Risiko. BlackjackOnlineCasinos.com kann eine Vergütung für Inhalte Dritter und ausgehende Affiliate-Links auf dieser Website erhalten.',
      ar: 'إخلاء المسؤولية والشروط: هذا الموقع لأغراض إعلامية فقط. لا نقدم أي ضمانات بشأن دقة أو اكتمال أو موثوقية المحتوى. استخدام هذا الموقع على مسؤوليتك الخاصة. قد يحصل BlackjackOnlineCasinos.com على تعويض عن محتوى الطرف الثالث والروابط التابعة الصادرة المنشورة على هذا الموقع.',
      it: 'Disclaimer e termini: Questo sito web è solo a scopo informativo. Non vengono fornite garanzie di accuratezza, completezza o affidabilità dei contenuti. L\'uso di questo sito è a proprio rischio. BlackjackOnlineCasinos.com potrebbe ricevere un compenso per contenuti di terze parti e link di affiliazione in uscita pubblicati su questo sito web.'
    },
    footer_cookie: {
      en: 'Cookie Policy: We use cookies to analyze website traffic and optimize your website experience. By using this site, you consent to our use of cookies.',
      fr: 'Politique de cookies : Nous utilisons des cookies pour analyser le trafic du site et optimiser votre expérience. En utilisant ce site, vous consentez à notre utilisation des cookies.',
      es: 'Política de cookies: Utilizamos cookies para analizar el tráfico del sitio web y optimizar su experiencia. Al usar este sitio, usted acepta nuestro uso de cookies.',
      de: 'Cookie-Richtlinie: Wir verwenden Cookies, um den Website-Traffic zu analysieren und Ihr Website-Erlebnis zu optimieren. Durch die Nutzung dieser Website stimmen Sie der Verwendung von Cookies zu.',
      ar: 'سياسة ملفات تعريف الارتباط: نستخدم ملفات تعريف الارتباط لتحليل حركة مرور الموقع وتحسين تجربتك. باستخدام هذا الموقع، فإنك توافق على استخدامنا لملفات تعريف الارتباط.',
      it: 'Politica sui cookie: Utilizziamo i cookie per analizzare il traffico del sito web e ottimizzare la tua esperienza. Utilizzando questo sito, acconsenti all\'uso dei cookie.'
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

  // ─── Get translation ───
  function t(key) {
    const entry = TRANSLATIONS[key];
    if (!entry) return key;
    return entry[currentLang] || entry[DEFAULT_LANG] || key;
  }

  // ─── Apply translations to the page ───
  function applyTranslations() {
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
        el.textContent = translated;
      }
    });

    // Update HTML lang attribute
    document.documentElement.lang = currentLang;

    // Update RTL
    document.documentElement.dir = LANGUAGES[currentLang].dir;

    // Update language selector button
    const langBtn = document.getElementById('langBtn');
    if (langBtn) {
      langBtn.textContent = LANGUAGES[currentLang].label;
    }

    // Update active class in dropdown
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
    // Close dropdown
    const dropdown = document.getElementById('langDropdown');
    if (dropdown) dropdown.classList.remove('active');
  }

  // ─── Init ───
  function init() {
    // Build language switcher if container exists
    const container = document.getElementById('langSwitcher');
    if (container && !container.hasAttribute('data-initialized')) {
      container.setAttribute('data-initialized', 'true');
      container.innerHTML = `
        <button class="lang-btn" id="langBtn" aria-label="Select language">
          ${LANGUAGES[currentLang].label}
          <i class="fas fa-chevron-down" style="font-size:10px;margin-left:4px;"></i>
        </button>
        <div class="lang-dropdown" id="langDropdown">
          ${Object.entries(LANGUAGES).map(([code, lang]) => `
            <button class="lang-option ${code === currentLang ? 'active' : ''}" data-lang="${code}" onclick="window.i18nSetLang('${code}')">
              ${lang.label}
            </button>
          `).join('')}
        </div>
      `;

      // Toggle dropdown
      document.getElementById('langBtn').addEventListener('click', (e) => {
        e.stopPropagation();
        document.getElementById('langDropdown').classList.toggle('active');
      });

      // Close on outside click
      document.addEventListener('click', () => {
        document.getElementById('langDropdown')?.classList.remove('active');
      });
    }

    applyTranslations();
  }

  // ─── Init on DOM ready ───
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  return { t, setLang, init, currentLang: () => currentLang, languages: LANGUAGES };
})();

// Make setLang available globally
window.i18nSetLang = (lang) => i18n.setLang(lang);
