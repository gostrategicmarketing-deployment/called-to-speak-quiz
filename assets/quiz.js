document.addEventListener('DOMContentLoaded', function () {
  var C = window.CTS, app = document.getElementById('app'), note = document.getElementById('hdrNote'), E = C.esc;
  var Q = [
    { t: 'When someone hands you the mic, your first thought is...', o: [['"Don’t mess this up."', 'P'], ['"How much of my story is too much?"', 'K'], ['"Let me give them everything I know."', 'T'], ['"I hope this doesn’t sound like a pitch."', 'H']] },
    { t: 'After you speak, people usually...', o: [['Tell you how polished and professional you were', 'P'], ['Say they wish they knew more about you', 'K'], ['Take notes, thank you, and leave', 'T'], ['Ask what you do, and you change the subject', 'H']] },
    { t: 'How do you prepare for a talk or interview?', o: [['I script and rehearse every word', 'P'], ['I plan it, then quietly cut the hardest parts of my story', 'K'], ['I add more slides and more content', 'T'], ['I prepare everything except how I’ll mention my offer', 'H']] },
    { t: 'Your biggest fear when you speak is...', o: [['Forgetting what to say or looking unprepared', 'P'], ['Being judged for my past', 'K'], ['Not delivering enough value', 'T'], ['Sounding braggy or salesy', 'H']] },
    { t: 'Right before you speak, your prayer usually sounds like...', o: [['"Lord, please don’t let me mess this up."', 'P'], ['"Give me courage... maybe I’ll share that part next time."', 'K'], ['"Help me cover everything they need."', 'T'], ['"Don’t let me come across the wrong way."', 'H']] },
    { t: 'What do you sense the Holy Spirit nudging you toward?', o: [['Trusting Him with the words instead of my script', 'P'], ['Telling the story I’ve kept hidden', 'K'], ['Saying less and connecting more', 'T'], ['Boldly inviting people into what I offer', 'H']] },
    { t: 'Your content online is...', o: [['Polished, but it doesn’t really sound like me', 'P'], ['Safe. Nothing too personal', 'K'], ['Educational. Lots of saves, very few DMs', 'T'], ['Helpful, but I rarely mention how to work with me', 'H']] },
    { t: 'Last two. What is your business’s current monthly revenue?', o: [['Under $5K', 'R:under5'], ['$5K to $10K', 'R:5to10'], ['$10K to $25K', 'R:10to25'], ['$25K+', 'R:25plus']] },
    { t: 'If the right mentor showed you how to free your voice, are you in a position to invest in yourself right now?', o: [['Yes, I’m ready', 'I:yes'], ['Yes, with a payment plan', 'I:plan'], ['Not right now', 'I:no']] }
  ];
  var R = {
    P: { name: 'The Polished Performer', short: 'Polished Performer', summary: 'You are prepared, capable and professional. But you are carrying the whole message yourself, and the room can feel you managing it.', looks: 'Scripts, rehearsal and a running checklist in your head. "Did I say it right? Did they like me?" You leave the stage replaying every line.', costs: 'People admire you but don’t feel close to you. Polite applause, few bookings, and a voice that doesn’t sound like you anymore.', shift: 'Surrender the script. Pray over the room, ask the Holy Spirit what it needs to hear, and trust that the words are already inside you.', start: 'Source and Sound', verse: 'Now therefore go, and I will be with thy mouth, and teach thee what thou shalt say.', ref: 'Exodus 4:12', prayer: 'Holy Spirit, I lay down my script and my need to get it perfect. Be with my mouth. Teach me what to say, and let this room meet You, not my performance. Amen.' },
    K: { name: 'The Quiet Keeper', short: 'Quiet Keeper', summary: 'You have a testimony that could set someone free. But you edit the truth so nobody feels uncomfortable, including you.', looks: 'You share the safe version of your story. The breakthrough without the breakdown. The lesson without the kitchen floor.', costs: 'Your audience never sees themselves in you, so they never fully trust you. The story God gave you stays locked inside.', shift: 'Your testimony carries a code. Ask the Holy Spirit which story He is highlighting, and tell it with courage before fear talks you out of it.', start: 'Stories', verse: 'And they overcame him by the blood of the Lamb, and by the word of their testimony.', ref: 'Revelation 12:11', prayer: 'Holy Spirit, show me the story You want told. Give me courage to tell the whole truth with grace, and let my testimony set someone else free. Amen.' },
    T: { name: 'The Generous Teacher', short: 'Generous Teacher', summary: 'You love to serve, so you give and give. People leave full of notes, but not connected to you.', looks: 'Packed slides, frameworks and tips. Lots of saves and "this was so helpful." Very few people raising their hand.', costs: 'Information doesn’t transform people. Encounter does. When they feel full, they don’t feel the need to work with you.', shift: 'Say less and let the Spirit move more. Trade one more teaching point for one story told with presence, so people feel it in their spirit.', start: 'Stories and Scale', verse: 'And my speech and my preaching was not with enticing words of man’s wisdom, but in demonstration of the Spirit and of power.', ref: '1 Corinthians 2:4', prayer: 'Holy Spirit, I don’t need to give them everything. Show me the one thing this room needs, and move in the space I leave for You. Amen.' },
    H: { name: 'The Humble Holdback', short: 'Humble Holdback', summary: 'You are called and gifted, but you hide the very thing that would help people most: the invitation to work with you.', looks: 'You skip the offer, rush past your success, and change the subject when someone asks what you do.', costs: 'If your offer genuinely helps people, hiding it means withholding help God meant for them. And your business stays stuck.', shift: 'Inviting is stewardship, not selling. When the Holy Spirit leads the message, the next step feels obvious, and you can offer it with peace.', start: 'Stewardship', verse: 'Neither do men light a candle, and put it under a bushel, but on a candlestick; and it giveth light unto all that are in the house.', ref: 'Matthew 5:15', prayer: 'Holy Spirit, I won’t hide what You placed in my hands. Give me boldness to invite and peace to let people choose. Let my offer be an act of service. Amen.' }
  };
  var qi = 0, answers = [], who = {};
  var STAR = '<svg width="34" height="34" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3c-1.6 2.6-1.6 4.4 0 6c1.6-1.6 1.6-3.4 0-6z M12 9v12 M8 13c1.2 1.6 2.6 2.4 4 2.4s2.8-.8 4-2.4" fill="none" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  function focusH() { var h = app.querySelector('h1,h2'); if (h) { h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); } window.scrollTo(0, 0); }

  function best() {
    var c = { P: 0, K: 0, T: 0, H: 0 };
    answers.forEach(function (a) { if (c[a] !== undefined) c[a]++; });
    var b = 'P'; ['P', 'K', 'T', 'H'].forEach(function (k) { if (c[k] > c[b]) b = k; });
    return b;
  }
  function qualified() { return answers.indexOf('I:no') === -1 && answers.indexOf('R:under5') === -1; }

  function intro() {
    note.textContent = 'Free voice quiz';
    app.innerHTML = '<section class="stage" style="padding:72px 24px 96px"><div class="col c g24" style="max-width:820px;gap:24px;align-items:center;text-align:center">' +
      '<p class="eyebrow">Free 2-minute quiz</p><h1 style="font-size:clamp(44px,6vw,76px)">What’s holding your <em>voice</em> back?</h1>' +
      '<p class="lead" style="max-width:640px">Every speaker who loves God has a message. Most have one habit that keeps the Holy Spirit from moving through it. Answer 9 quick questions to find your voice type, the scripture for it, and a prayer to release the voice God gave you.</p>' +
      '<button type="button" class="btn lg" id="go">Start the quiz</button>' +
      '<div class="col c g8" style="margin-top:16px;padding-top:28px;border-top:1px solid var(--ink);max-width:620px">' + STAR + '<p style="font-size:26px;line-height:1.25">"For it is not ye that speak, but the Spirit of your Father which speaketh in you."</p><p class="eyebrow">Matthew 10:20</p></div>' +
      '<p class="mute-d" style="font-size:15px">Created by Meghan Stimmel, speaker, psychotherapist and author of <em>Called to Speak</em></p>' +
      '<figure style="max-width:560px"><blockquote style="font-size:17px;color:var(--t-dark)">"She is the teacher I’ve been praying for!"</blockquote><figcaption style="font-size:14px;color:#9A9893;margin-top:6px">Chelsea, verified Amazon review of Called to Speak</figcaption></figure></div></section>';
    document.getElementById('go').onclick = function () { qi = 0; answers = []; question(); C.track('QuizStart', {}, true); };
    window.scrollTo(0, 0);
  }

  function question() {
    var q = Q[qi], pct = Math.round(((qi + 1) / Q.length) * 100);
    note.textContent = '2 minutes';
    app.innerHTML = '<section class="stage"><div><div class="col g12"><div class="prog"><span>Question ' + (qi + 1) + ' of ' + Q.length + '</span><span>' + pct + '% complete</span></div><div class="bar" role="progressbar" aria-valuenow="' + pct + '" aria-valuemin="0" aria-valuemax="100"><i style="width:' + pct + '%"></i></div></div>' +
      '<h2 style="font-size:clamp(32px,4vw,46px);line-height:1.1">' + E(q.t) + '</h2><div class="opts">' + q.o.map(function (o, k) { return '<button type="button" class="opt" data-k="' + k + '">' + E(o[0]) + '</button>'; }).join('') + '</div>' +
      (qi > 0 ? '<button type="button" class="link-btn" id="bk">Back</button>' : '') + '</div></section>';
    app.querySelectorAll('[data-k]').forEach(function (b) {
      b.onclick = function () { answers = answers.slice(0, qi).concat([q.o[+b.dataset.k][1]]); if (qi + 1 >= Q.length) capture(); else { qi++; question(); } };
    });
    var bk = document.getElementById('bk'); if (bk) bk.onclick = function () { qi--; question(); };
    focusH();
  }

  function capture() {
    note.textContent = 'Almost done';
    var pr = C.privacyUrl ? ' <a href="' + E(C.privacyUrl) + '">Privacy Policy</a>' : '';
    app.innerHTML = '<section class="stage" style="padding:72px 24px 96px"><div style="max-width:560px"><h2 class="center" style="font-size:clamp(36px,4.5vw,52px)">Your voice type is ready.</h2><p class="center" style="color:var(--t-dark)">Where should we send your full result, your scripture and prayer, and Meghan’s free training?</p>' +
      '<form class="form" id="f" novalidate><label>First name<input type="text" name="first_name" autocomplete="given-name" required></label><label>Email<input type="email" name="email" autocomplete="email" required></label>' +
      '<label><span>Phone <span style="font-weight:400;color:var(--t-mute)">(optional, for call reminders)</span></span><input type="tel" name="phone" autocomplete="tel"></label>' +
      '<label class="consent"><input type="checkbox" name="sms">I agree to receive text messages from Meghan. Message and data rates may apply. Reply STOP to opt out.</label>' +
      '<div id="err"></div><button type="submit" class="btn lg">Show my result</button>' +
      '<p class="fine">You’ll also get Meghan’s emails on Spirit-Led Storytelling. Unsubscribe anytime. We never sell your information.' + pr + '</p></form></div></section>';
    document.getElementById('f').onsubmit = function (ev) {
      ev.preventDefault();
      var f = ev.target; who = { first_name: f.elements.first_name.value.trim(), email: f.elements.email.value.trim(), phone: f.elements.phone.value.trim(), sms: f.elements.sms.checked };
      if (!who.first_name || !/^\S+@\S+\.\S+$/.test(who.email)) { document.getElementById('err').innerHTML = '<p class="err" role="alert">Please add your first name and a valid email.</p>'; return; }
      var t = best(), ok = qualified(), r = R[t];
      var rev = (answers.filter(function (a) { return a.indexOf('R:') === 0; })[0] || '').slice(2), inv = (answers.filter(function (a) { return a.indexOf('I:') === 0; })[0] || '').slice(2);
      C.store.set('cts_quiz', { first_name: who.first_name, email: who.email, phone: who.phone, type: t, type_name: r.name });
      C.post({
        source: 'cts-voice-quiz', submitted_at: new Date().toISOString(), page: location.href,
        first_name: who.first_name, email: who.email, phone: who.phone, sms_consent: who.sms,
        voice_type: r.name, voice_type_code: t, monthly_revenue: rev, ready_to_invest: inv, qualified: ok,
        tags: ['cts-quiz', 'cts-quiz-' + r.short.toLowerCase().replace(/ /g, '-'), ok ? 'cts-quiz-qualified' : 'cts-quiz-academy'],
        utm: { source: C.qs('utm_source'), medium: C.qs('utm_medium'), campaign: C.qs('utm_campaign'), content: C.qs('utm_content'), term: C.qs('utm_term') }
      });
      C.track('Lead', { content_name: 'Voice quiz' }); C.track(ok ? 'QuizQualified' : 'QuizAcademy', { voice_type: t }, true);
      result(t, ok);
    };
    focusH();
  }

  function result(t, ok) {
    var r = R[t]; note.textContent = 'Your result';
    var close = ok
      ? '<section class="dark" style="padding:72px 24px 88px"><div class="col c g24" style="max-width:820px;margin:0 auto"><p class="eyebrow">You qualify for a private call</p><h2 style="font-size:clamp(36px,4.5vw,54px)">Let’s free your voice, together.</h2><p style="color:var(--t-dark);max-width:660px">Based on your answers, you’re a fit for a Voice Breakthrough Call with Meghan. In 45 minutes you’ll unpack your ' + E(r.short) + ' pattern, hear what the Holy Spirit may be stirring in your message, and see whether her private mentorship is your next step.</p><a class="btn lg" href="book/" id="bookCta">Book my Voice Breakthrough Call</a><p class="mute-d" style="font-size:15px">No cost for the call. If it’s not a fit, Meghan will tell you and point you to the right next step. <span data-cfg-text="scarcity" hidden></span></p>' +
        '<figure class="card" style="max-width:620px;padding:24px 28px;text-align:left"><blockquote style="font-size:22px;line-height:1.3">"Because of you, I’ve been able to take what was building up inside of me and finally give it a voice."</blockquote><figcaption style="font-size:14px;color:var(--t-mute);margin-top:10px">Heather S., Meghan’s client</figcaption></figure><button type="button" class="link-btn" id="again" style="align-self:center">Retake the quiz</button></div></section>'
      : '<section class="dark" style="padding:72px 24px 88px"><div style="max-width:1040px;margin:0 auto"><div class="grid g2" style="gap:40px;align-items:center"><div class="col g16"><p class="eyebrow">Your next step</p><h2 style="font-size:clamp(36px,4.5vw,54px)">Called to Speak Academy 2.0</h2><p style="color:var(--t-dark)">Four live weeks with Meghan to master the 5 S’s of Spirit-Led Storytelling, built for ' + E(r.short) + 's ready to stop performing and let the Holy Spirit lead their message.</p><ul class="chk" style="color:var(--t-dark)"><li>Your Core Message and Story Bank</li><li>Your Signature Story and Signature Sound</li><li>Live teaching on Zoom plus community on Telegram</li><li>Bonus: Speaking Leverage Map and Body-of-Work Roadmap</li></ul></div>' +
        '<div class="card col g16" style="background:#fff;color:#000;border:0;border-radius:18px;padding:36px">' + (C.academyCohort ? '<p class="eyebrow">' + E(C.academyCohort) + '</p>' : '') + '<p style="font-size:56px;line-height:1">$1,999</p><p style="color:#4A4846">or 2 payments of $1,000</p><a class="btn blk" href="https://apricity.myflodesk.com/hnvf9k12ar">Join the Academy</a><a href="https://www.amazon.com/dp/B0H7PR1XRG" style="font-size:15px;text-align:center">Not ready? Start with the book, Called to Speak</a></div></div><div class="col c" style="margin-top:24px"><button type="button" class="link-btn" id="again">Retake the quiz</button></div></div></section>';
    app.innerHTML = '<section style="padding:64px 24px 72px"><div class="col c g16" style="max-width:860px;margin:0 auto;gap:20px"><p class="eyebrow">Your voice type</p><h1 style="font-size:clamp(48px,6.5vw,84px);line-height:1">' + E(r.name) + '</h1><p class="lead" style="max-width:680px;font-size:21px">' + E(r.summary) + '</p></div></section>' +
      '<section class="light" style="padding:64px 24px"><div class="wrap grid g3"><div class="card col g12"><p class="eyebrow">What it looks like</p><p>' + E(r.looks) + '</p></div><div class="card col g12"><p class="eyebrow">What it costs you</p><p>' + E(r.costs) + '</p></div><div class="card k col g12"><p class="eyebrow">Your Spirit-led shift</p><p>' + E(r.shift) + '</p><p style="font-size:22px">Start with: ' + E(r.start) + '</p></div></div></section>' +
      '<section class="light" style="padding:0 24px 64px"><div class="wrap grid g2"><figure class="card o col g16" style="padding:36px"><svg width="34" height="34" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3c-1.6 2.6-1.6 4.4 0 6c1.6-1.6 1.6-3.4 0-6z M12 9v12 M8 13c1.2 1.6 2.6 2.4 4 2.4s2.8-.8 4-2.4" fill="none" stroke="#000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg><p class="eyebrow">Your scripture</p><blockquote style="font-size:28px;line-height:1.22">"' + E(r.verse) + '"</blockquote><figcaption class="cap mute">' + E(r.ref) + '</figcaption></figure><div class="card k col g16" style="padding:36px"><p class="eyebrow">A prayer for your voice</p><p style="font-size:24px;line-height:1.35;font-style:italic">' + E(r.prayer) + '</p></div></div></section>' + close;
    var a = document.getElementById('again'); if (a) a.onclick = intro;
    var b = document.getElementById('bookCta'); if (b) b.addEventListener('click', function () { C.track('QuizBookClick', { voice_type: t }, true); });
    document.querySelectorAll('[data-cfg-text]').forEach(function (n) { var v = C[n.getAttribute('data-cfg-text')]; if (v) { n.textContent = v; n.hidden = false; } });
    focusH();
  }
  intro();
});
