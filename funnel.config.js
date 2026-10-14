/* ============================================================================
 * THE ONLY FILE YOU EDIT PER CLIENT (quiz-booking-funnel skill pattern).
 *
 * Meghan Stimmel / Called to Speak: voice quiz. 9 questions -> email capture ->
 * result page (voice type, scripture, prayer) -> book a Voice Breakthrough Call
 * (qualified) or the $1,999 Academy (not). Rules and unconfirmed items:
 * Meghan Stimmel/CLAUDE.md and brand/verified-facts.md.
 *
 * HARD RULES here (from the skill + the client file):
 *  - Never invent proof. Quotes below are verbatim from her Academy page / Amazon.
 *  - Question keys (`q`) are GHL field names: permanent, never rename.
 *  - Empty id/url = that pipe is skipped silently. Unconfirmed claims stay OFF.
 * ==========================================================================*/
window.FUNNEL = {

  brand: {
    name: 'Called to Speak',
    title: 'What’s holding your voice back? Free voice quiz',
    description: 'A free 2-minute quiz from Meghan Stimmel. Find your voice type, a scripture for it, and a prayer for your voice.'
  },

  /* GHL Inbound Webhook (one per funnel). Empty = lead is NOT posted (console warns). */
  webhook: { url: '', platform: 'Facebook' },

  /* Pages that share this config: book/ and booked/ read `pages` through assets/cts.js. */
  pages: {
    calendarUrl: '',        // GHL calendar widget URL for the QUIZ path (its post-booking redirect = .../booked/)
    welcomeVideoUrl: '',    // Meghan's 2-3 min welcome video (booked/)
    privacyUrl: '',         // NO privacy policy exists yet; link hidden until set
    chapterPdfUrl: '',      // chapter 1 PDF gift (card hidden until set)
    portraitUrl: '',        // real portrait only, never AI
    academyCohort: '',      // e.g. 'Next cohort Nov 10' once confirmed
    showFox2: false,        // UNCONFIRMED credential
    showWotY: false,        // UNCONFIRMED credential
    scarcity: ''            // only with a real number
  },

  routes: { qualified: 'book/', dq: '' },

  /* Not right now (invest) or Under $5K (revenue) = Academy. Everyone else books. */
  qualify: function (a) {
    return a.invest_value !== 0 && a.revenue_value !== 0;
  },

  /* Most-picked type wins; ties go to the first type listed (Polished Performer). */
  typeOf: function (a) {
    var c = { P: 0, K: 0, T: 0, H: 0 };
    Object.keys(a).forEach(function (k) { if (/_t$/.test(k) && c[a[k]] !== undefined) c[a[k]]++; });
    var best = 'P';
    ['P', 'K', 'T', 'H'].forEach(function (k) { if (c[k] > c[best]) best = k; });
    return best;
  },

  tags: {
    all: 'cts-quiz',
    qualified: 'cts-quiz-qualified',
    dq: 'cts-quiz-academy',
    type: { P: 'cts-quiz-polished-performer', K: 'cts-quiz-quiet-keeper', T: 'cts-quiz-generous-teacher', H: 'cts-quiz-humble-holdback' }
  },

  /* Leave a value empty to skip that destination. Tracking is off on localhost. */
  tracking: {
    ga4: '', gtm: '', clarity: '', metaPixel: '',
    googleAds: { id: '', lead: '', booking: '' },
    events: { qualified: 'QuizQualified', dq: 'QuizAcademy' }
  },

  kicker: 'Free 2-minute quiz',
  hook: 'Every speaker who loves God has a message. Most have one habit that keeps the Holy Spirit from moving through it. Find yours.',
  qualifier: 'Created by Meghan Stimmel, speaker, psychotherapist and author of Called to Speak.',
  verse: { text: 'For it is not ye that speak, but the Spirit of your Father which speaketh in you.', ref: 'Matthew 10:20' },
  byline: { quote: 'She is the teacher I’ve been praying for!', by: 'Chelsea, verified Amazon review of Called to Speak' },

  quiz: {
    intro: '9 quick questions',
    slides: [
      { q: 'mic_thought', type: 'choice', title: 'When someone hands you the mic, your first thought is...', options: [
        { label: '"Don’t mess this up."', t: 'P' }, { label: '"How much of my story is too much?"', t: 'K' },
        { label: '"Let me give them everything I know."', t: 'T' }, { label: '"I hope this doesn’t sound like a pitch."', t: 'H' } ] },
      { q: 'after_talk', type: 'choice', title: 'After you speak, people usually...', options: [
        { label: 'Tell you how polished and professional you were', t: 'P' }, { label: 'Say they wish they knew more about you', t: 'K' },
        { label: 'Take notes, thank you, and leave', t: 'T' }, { label: 'Ask what you do, and you change the subject', t: 'H' } ] },
      { q: 'prepare', type: 'choice', title: 'How do you prepare for a talk or interview?', options: [
        { label: 'I script and rehearse every word', t: 'P' }, { label: 'I plan it, then quietly cut the hardest parts of my story', t: 'K' },
        { label: 'I add more slides and more content', t: 'T' }, { label: 'I prepare everything except how I’ll mention my offer', t: 'H' } ] },
      { q: 'fear', type: 'choice', title: 'Your biggest fear when you speak is...', options: [
        { label: 'Forgetting what to say or looking unprepared', t: 'P' }, { label: 'Being judged for my past', t: 'K' },
        { label: 'Not delivering enough value', t: 'T' }, { label: 'Sounding braggy or salesy', t: 'H' } ] },
      { q: 'prayer', type: 'choice', title: 'Right before you speak, your prayer usually sounds like...', options: [
        { label: '"Lord, please don’t let me mess this up."', t: 'P' }, { label: '"Give me courage... maybe I’ll share that part next time."', t: 'K' },
        { label: '"Help me cover everything they need."', t: 'T' }, { label: '"Don’t let me come across the wrong way."', t: 'H' } ] },
      { q: 'nudge', type: 'choice', title: 'What do you sense the Holy Spirit nudging you toward?', options: [
        { label: 'Trusting Him with the words instead of my script', t: 'P' }, { label: 'Telling the story I’ve kept hidden', t: 'K' },
        { label: 'Saying less and connecting more', t: 'T' }, { label: 'Boldly inviting people into what I offer', t: 'H' } ] },
      { q: 'content', type: 'choice', title: 'Your content online is...', options: [
        { label: 'Polished, but it doesn’t really sound like me', t: 'P' }, { label: 'Safe. Nothing too personal', t: 'K' },
        { label: 'Educational. Lots of saves, very few DMs', t: 'T' }, { label: 'Helpful, but I rarely mention how to work with me', t: 'H' } ] },
      { q: 'revenue', type: 'choice', title: 'Last two. What is your business’s current monthly revenue?', options: [
        { label: 'Under $5K', value: 0 }, { label: '$5K to $10K', value: 1 }, { label: '$10K to $25K', value: 1 }, { label: '$25K+', value: 1 } ] },
      { q: 'invest', type: 'choice', title: 'If the right mentor showed you how to free your voice, are you in a position to invest in yourself right now?', options: [
        { label: 'Yes, I’m ready', value: 1 }, { label: 'Yes, with a payment plan', value: 1 }, { label: 'Not right now', value: 0 } ] },
      { q: 'contact', type: 'contact', title: 'Your voice type is ready.',
        note: 'Where should we send your full result, your scripture and your prayer? You’ll also get Meghan’s emails on Spirit-Led Storytelling. Unsubscribe anytime. We never sell your information.',
        submitLabel: 'Show my result', privacyUrl: '' }
    ]
  },

  /* ---- the four voice types (copy from the 2026-10-14 design canvas) ------- */
  types: {
    P: { name: 'The Polished Performer', short: 'Polished Performer',
      summary: 'You are prepared, capable and professional. But you are carrying the whole message yourself, and the room can feel you managing it.',
      looks: 'Scripts, rehearsal and a running checklist in your head. "Did I say it right? Did they like me?" You leave the stage replaying every line.',
      costs: 'People admire you but don’t feel close to you. Polite applause, few bookings, and a voice that doesn’t sound like you anymore.',
      shift: 'Surrender the script. Pray over the room, ask the Holy Spirit what it needs to hear, and trust that the words are already inside you.', start: 'Source and Sound',
      verse: 'Now therefore go, and I will be with thy mouth, and teach thee what thou shalt say.', ref: 'Exodus 4:12',
      prayer: 'Holy Spirit, I lay down my script and my need to get it perfect. Be with my mouth. Teach me what to say, and let this room meet You, not my performance. Amen.' },
    K: { name: 'The Quiet Keeper', short: 'Quiet Keeper',
      summary: 'You have a testimony that could set someone free. But you edit the truth so nobody feels uncomfortable, including you.',
      looks: 'You share the safe version of your story. The breakthrough without the breakdown. The lesson without the kitchen floor.',
      costs: 'Your audience never sees themselves in you, so they never fully trust you. The story God gave you stays locked inside.',
      shift: 'Your testimony carries a code. Ask the Holy Spirit which story He is highlighting, and tell it with courage before fear talks you out of it.', start: 'Stories',
      verse: 'And they overcame him by the blood of the Lamb, and by the word of their testimony.', ref: 'Revelation 12:11',
      prayer: 'Holy Spirit, show me the story You want told. Give me courage to tell the whole truth with grace, and let my testimony set someone else free. Amen.' },
    T: { name: 'The Generous Teacher', short: 'Generous Teacher',
      summary: 'You love to serve, so you give and give. People leave full of notes, but not connected to you.',
      looks: 'Packed slides, frameworks and tips. Lots of saves and "this was so helpful." Very few people raising their hand.',
      costs: 'Information doesn’t transform people. Encounter does. When they feel full, they don’t feel the need to work with you.',
      shift: 'Say less and let the Spirit move more. Trade one more teaching point for one story told with presence, so people feel it in their spirit.', start: 'Stories and Scale',
      verse: 'And my speech and my preaching was not with enticing words of man’s wisdom, but in demonstration of the Spirit and of power.', ref: '1 Corinthians 2:4',
      prayer: 'Holy Spirit, I don’t need to give them everything. Show me the one thing this room needs, and move in the space I leave for You. Amen.' },
    H: { name: 'The Humble Holdback', short: 'Humble Holdback',
      summary: 'You are called and gifted, but you hide the very thing that would help people most: the invitation to work with you.',
      looks: 'You skip the offer, rush past your success, and change the subject when someone asks what you do.',
      costs: 'If your offer genuinely helps people, hiding it means withholding help God meant for them. And your business stays stuck.',
      shift: 'Inviting is stewardship, not selling. When the Holy Spirit leads the message, the next step feels obvious, and you can offer it with peace.', start: 'Stewardship',
      verse: 'Neither do men light a candle, and put it under a bushel, but on a candlestick; and it giveth light unto all that are in the house.', ref: 'Matthew 5:15',
      prayer: 'Holy Spirit, I won’t hide what You placed in my hands. Give me boldness to invite and peace to let people choose. Let my offer be an act of service. Amen.' }
  },

  results: {
    qualified: { eyebrow: 'You qualify for a private call', h: 'Let’s free your voice, together.',
      p: 'Based on your answers, you’re a fit for a Voice Breakthrough Call with Meghan. In 45 minutes you’ll unpack your {short} pattern, hear what the Holy Spirit may be stirring in your message, and see whether her private mentorship is your next step.',
      cta: 'Book my Voice Breakthrough Call',
      fine: 'No cost for the call. If it’s not a fit, Meghan will tell you and point you to the right next step.',
      quote: 'Because of you, I’ve been able to take what was building up inside of me and finally give it a voice.', quoteBy: 'Heather S., Meghan’s client' },
    academy: { eyebrow: 'Your next step', h: 'Called to Speak Academy 2.0',
      p: 'Four live weeks with Meghan to master the 5 S’s of Spirit-Led Storytelling, built for {short_plural} ready to stop performing and let the Holy Spirit lead their message.',
      bullets: ['Your Core Message and Story Bank', 'Your Signature Story and Signature Sound', 'Live teaching on Zoom plus community on Telegram', 'Bonus: Speaking Leverage Map and Body-of-Work Roadmap'],
      cohort: '', price: '$1,999', priceNote: 'or 2 payments of $1,000',
      url: 'https://apricity.myflodesk.com/hnvf9k12ar', cta: 'Join the Academy',
      bookUrl: 'https://www.amazon.com/dp/B0H7PR1XRG', bookLabel: 'Not ready? Start with the book, Called to Speak' }
  },

  variants: { _default: {} },

  /* Proof is verbatim from her Academy page. Empty arrays render nothing. */
  sections: [
    { type: 'covers', title: 'What you’ll get', items: [
      { title: 'Your voice type', body: 'Which of four habits is keeping the Holy Spirit’s message from landing through your voice.' },
      { title: 'A scripture for it', body: 'One verse chosen for your voice type.' },
      { title: 'A prayer for your voice', body: 'A short prayer to release the voice God gave you.' } ] },
    { type: 'proof', title: 'From women who’ve done this work', items: [
      { quote: 'You activate it in me, girl! Unlike anyone else (including pastors and priests).', who: 'Katelyn Pennell, founder of Body Based Scaling' },
      { quote: 'Because of you, I’ve been able to take what was building up inside of me and finally give it a voice.', who: 'Heather S.' } ] },
    { type: 'faq', title: 'Questions', items: [
      { q: 'How long does it take?', a: 'Nine short questions, about two minutes.' },
      { q: 'Is it free?', a: 'Yes. The quiz and your result are free.' },
      { q: 'What happens after I finish?', a: 'You see your result right away. If you’re a fit for a private call, you can book a free 45-minute Voice Breakthrough Call with Meghan. If not, you’ll see ways to start with her method.' },
      { q: 'Is this therapy?', a: 'No. Meghan is a psychotherapist and that training shapes how she coaches, but this is coaching and mentorship, not therapy.' } ] },
    { type: 'finalcta', title: 'Find your voice type', body: 'Two minutes. Nine questions. Free.', cta: 'Start the quiz' }
  ]
};
