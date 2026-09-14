// Musuhi LP — JP / EN 言語切替
//
// 方針:
// - ja を key の唯一の SOT（HTML内の原文をそのままコピー）とし、
//   JS側の書き換えは常に「ja へ戻せる」ことを保証する。
// - ページ全体をリロードせず、data-i18n(-html) の要素だけを書き換える
//   （スクロール位置を保持するため）。
// - localStorage に選択言語を保存し、次回訪問・別ページ遷移でも復元する。
(function () {
  var LANG_STORAGE_KEY = 'musuhi-site-language';

  var I18N = {
    ja: {
      'header.nav.why': 'なぜ、「声」なのか',
      'header.nav.features': 'Musuhiができること',
      'header.nav.appExperience': 'アプリ体験',
      'header.nav.story': 'Musuhiの原点',
      'header.cta': 'App Storeでまもなく公開',
      'header.ctaLive': 'App Store',

      'hero.title': 'その瞬間の気持ちを、<span class="hero__title-accent">声と写真</span>で残す',
      'hero.lead': 'Musuhiは、その時に感じた気持ちを声と写真で残し、AIと振り返りながら<br>自分では気づかなかった自分を知る、そして残した声は、<br class="br-tab">大切な人へ贈ることもできる<br>ジャーナリング型ライフログサービスです',
      'hero.jingle': '音声ジャーナリングで、<br class="br-sp">心が豊かになる新しい習慣を',

      'why.title': 'なぜ、「声」なのか',
      'why.statement': '写真も、文字も残る<br>でも、その時の気持ちは、<br class="br-sp">残りにくい',
      'why.keepLabel': '残るもの',
      'why.keepBody': 'スマートフォンには写真や動画が残る<br>SNSには投稿が残る<br>出来事の記録は、いくつも積み重なっていく',
      'why.lostLabel': '残りにくいもの',
      'why.lostBody': '「あの日、自分は何を感じていたんだろう。」<br>誰かに伝えたかった想い。嬉しかったこと、悔しかったこと、感謝したこと、心が揺れたこと。その瞬間に確かにあった<strong>感情</strong>は、意外なほど残っていません。',
      'why.voice': '写真や動画には、その瞬間の景色や姿を残せます。一方で、自分の気持ちや、まだ言葉になりきっていない想いを残したいとき、カメラに向かって話すのは少し照れくさく感じることもあります。声なら、誰かに見せるためではなく、自分に話しかけるように、その時の感情を自然に残せます。',
      'why.closing': '声なら、自分に話しかけるように、その時の気持ちを残せる<br>あとから聞き返したとき、言葉だけでは思い出せなかった、あの日の自分の気持ちまで振り返れる<br>だからMusuhiは、<span class="why__accent">声で残すジャーナリング</span>に着目しました',

      'features.title': 'Musuhiができること',
      'features.intro': '声だから残せて、声だから伝わる<br>Musuhiは、残す・振り返る・贈るという<br class="br-sp">3つの体験で、<br>日々の気持ちを大切に重ねながら、毎日を少しずつ豊かにしていきます',
      'features.card1.title': '残す',
      'features.card1.body': 'その時に感じた気持ちや出来事を、声と写真で残す<br>言葉だけではこぼれてしまう感情まで、その瞬間の記録として積み重ねていきます',
      'features.card2.title': '振り返る',
      'features.card2.body': '1週間の声をAIと振り返り、自分では気づかなかった感情や傾向に気づく<br>今の自分を少し深く知り、自分の気持ちとやさしく向き合うきっかけに',
      'features.card3.title': '贈る',
      'features.card3.body': '大切な人へ、声にのせて気持ちを贈る<br>あなたの声で届けるVoice Gift<br>みんなの声を集めて、ひとつの贈りものとして届けるVoice Book',
      'features.closing': '残す・振り返る・贈る——声を通して<br>過去の自分・未来の自分・大切な人が結ばれていく<br>それが、<span class="features__closing-brand">Musuhi</span>です',

      'appExperience.title': 'Musuhiのアプリ体験',
      'appExperience.copy1': '感じたことを<br>声と写真でそのまま残す',
      'appExperience.copy2': '積み重ねた気持ちを<br>日々の記録に',
      'appExperience.copy3': '1週間の声から<br>気づかなかった自分を知る',
      'appExperience.copy4': '伝えたい気持ちを<br>大切な人へ',
      'appExperience.copy5': 'みんなの想いを<br>ひとつの贈りものに',
      'appExperience.moreEyebrow': '使い続けるほど、育っていく',
      'appExperience.moreLead': '残した声は、ひとつのMomentとして<br class="br-sp">形に残り、積み重ねるほど育っていきます',
      'appExperience.copy6': '残した声は<br>ひとつのMomentとして形に残る',
      'appExperience.copy7': '積み重ねた気持ちが<br>育っていく',
      'appExperience.img1': 'assets/img/app/voice-journal.webp',
      'appExperience.alt1': 'Musuhiで声と写真を記録するVoice Journal画面',
      'appExperience.img2': 'assets/img/app/voice-album.webp',
      'appExperience.alt2': 'MusuhiのVoice Album画面',
      'appExperience.img3': 'assets/img/app/weekly-reflection.webp',
      'appExperience.alt3': 'MusuhiのWeekly Reflection画面',
      'appExperience.img4': 'assets/img/app/voice-gift.webp',
      'appExperience.alt4': 'MusuhiのVoice Gift画面',
      'appExperience.img5': 'assets/img/app/voice-book.webp',
      'appExperience.alt5': 'MusuhiのVoice Book画面',
      'appExperience.img6': 'assets/img/app/journal-detail.webp',
      'appExperience.alt6': 'MusuhiのMoment詳細画面',
      'appExperience.img7': 'assets/img/app/voice-garden.webp',
      'appExperience.alt7': 'MusuhiのVoice Garden画面',

      'story.title': 'Musuhiの原点',
      'story.p1': '私の父は、幼い頃の私へ向けて、「敏康 成長記」と書かれたカセットテープを残してくれていました。',
      'story.p2': 'そこには、写真では伝わらない——父の声、笑い方、話す間、その時の感情や想いが、そのまま残っていました。',
      'story.quote1': '声には、その人の想いまで残る',
      'story.quote2': '人は、直接面と向かっては言わないことでも、<br>何かを媒介することで伝えやすくなる',
      'story.p3': '年月が経ってからその声を聞いたとき、懐かしさとあわせて、父の想いや、自分が大切にされていたことまで伝わってくるように感じました。',
      'story.p4': '声は、時間が経っても、その人の気持ちまで残してくれる。',
      'story.p5': 'そして声には、人の心を支え、前を向く力をくれることがあるのだと感じたことを、今でも覚えています。',
      'story.origin': 'この体験が、Musuhiの原点です',
      'story.signature': 'Musuhi　中村敏康',

      'ctaFinal.title': '今日、あなたの心が<br class="br-sp">動いた瞬間は？',
      'ctaFinal.list': '嬉しかったこと　感謝したこと　挑戦したこと　心が少し揺れたこと',
      'ctaFinal.lead': 'その瞬間を、声と写真で残してみませんか<br>今日の気持ちを、あなたの最初のMomentとして残せます',
      'ctaFinal.button': 'App Storeでまもなく公開',
      'ctaFinal.buttonLive': 'App StoreでMusuhiをはじめる',
      'ctaFinal.brandLine': '声からはじまる、自分との対話　人とのつながり',

      'footer.privacy': 'プライバシーポリシー',
      'footer.terms': '利用規約',
      'footer.contact': 'お問い合わせ',
      'footer.org': '運営：CrossOver',

      'meta.title': 'Musuhi — その瞬間の気持ちを、声と写真で残す。| One Moment. One Voice.',
      'meta.description': 'Musuhiは、その時に感じた気持ちや頭に浮かんだ感情を声と写真で残し、AIで振り返り、大切な人にも贈れるライフログサービスです。',

      'support.metaTitle': 'サポート | Musuhi',
      'support.metaDescription': 'Musuhiのサポート窓口です。お困りのことがありましたら、メールにてお問い合わせください。',
      'support.title': 'サポート',
      'support.lead': 'Musuhiについてお困りのことが<br class="br-sp">ありましたら、<br>下記メールアドレスまで<br class="br-sp">お問い合わせください。',
      'support.contactLabel': 'お問い合わせ先',
      'support.legalPrivacy': 'プライバシーポリシー',
      'support.legalTerms': '利用規約',
      'support.back': '← Musuhi公式サイトへ戻る'
    },
    en: {
      'header.nav.why': 'Why Voice?',
      'header.nav.features': 'What You Can Do',
      'header.nav.appExperience': 'Experience Musuhi',
      'header.nav.story': 'The Story Behind Musuhi',
      'header.cta': 'Coming Soon',
      'header.ctaLive': 'Download on the App Store',

      'hero.title': 'Capture how you feel, in <span class="hero__title-accent">your voice and photos</span>.',
      'hero.lead': 'Musuhi is a voice journaling app that helps you capture how you feel through voice and photos, reflect with AI, and discover things about yourself you may not have noticed before. You can also turn the voices you’ve saved into meaningful gifts for the people you care about.',
      'hero.jingle': 'Make voice journaling a meaningful part of your everyday life.',

      'why.title': 'Why Voice?',
      'why.statement': 'Photos and words can preserve what happened.<br>But how you felt in that moment can easily fade.',
      'why.keepLabel': 'What We Keep',
      'why.keepBody': 'Photos and videos stay on our phones.<br>Posts remain on social media.<br>We collect countless records of what happened.',
      'why.lostLabel': 'What Often Gets Lost',
      'why.lostBody': '“How did I actually feel that day?”<br>The things we wanted to tell someone. The joy, frustration, gratitude, and moments that moved us. The <strong>feelings</strong> that were so real in the moment are often the easiest things to lose.',
      'why.voice': 'Photos and videos are great at preserving what we saw and where we were. But when it comes to our feelings — especially the ones we haven’t quite found the words for yet — speaking to a camera can feel a little uncomfortable.<br>With voice, you can simply talk to yourself. No posing. No performing. Just the way you feel in that moment.',
      'why.closing': 'Voice lets you capture how you feel, as naturally as talking to yourself.<br>When you listen back later, you can reconnect with feelings that words alone may not bring back.<br>That’s why Musuhi is built around <span class="why__accent">voice journaling</span>.',

      'features.title': 'What You Can Do with Musuhi',
      'features.intro': 'Some feelings are easier to keep — and share — in your own voice.<br>Musuhi brings together three experiences — capturing, reflecting, and gifting — to help you hold on to everyday feelings and make each day a little more meaningful.',
      'features.card1.title': 'Capture',
      'features.card1.body': 'Save what happened and how you felt through your voice and photos.<br>Preserve emotions that might otherwise slip through the gaps between words.',
      'features.card2.title': 'Reflect',
      'features.card2.body': 'Reflect on a week of voice journals with AI and notice patterns or feelings you may not have recognized on your own.<br>A gentle way to understand yourself a little better.',
      'features.card3.title': 'Gift',
      'features.card3.body': 'Share what you want someone to know, in your own voice.<br>Send a personal Voice Gift, or gather voices from multiple people into one Voice Book.',
      'features.closing': 'Capture. Reflect. Gift.<br>Through voice, Musuhi connects who you were, who you are becoming, and the people who matter to you.<br>That is <span class="features__closing-brand">Musuhi</span>.',

      'appExperience.title': 'Experience Musuhi',
      'appExperience.copy1': 'Capture the moment<br>with your voice and a photo',
      'appExperience.copy2': 'Turn everyday feelings<br>into a personal timeline',
      'appExperience.copy3': 'Discover what your week<br>of voices can tell you',
      'appExperience.copy4': 'Share what you feel<br>with someone you care about',
      'appExperience.copy5': 'Bring everyone’s voices together<br>into one gift',
      'appExperience.moreEyebrow': 'It grows with you.',
      'appExperience.moreLead': 'Every voice you save becomes a Moment. Over time, those Moments grow into a record of who you were and how you felt.',
      'appExperience.copy6': 'Each voice becomes a Moment<br>you can return to',
      'appExperience.copy7': 'Watch your memories grow<br>as you keep recording',
      'appExperience.img1': 'assets/img/app/en/voice-journal.webp',
      'appExperience.alt1': 'Musuhi Voice Journal screen, capturing a voice and photo',
      'appExperience.img2': 'assets/img/app/en/voice-album.webp',
      'appExperience.alt2': 'Musuhi Voice Album screen',
      'appExperience.img3': 'assets/img/app/en/weekly-reflection.webp',
      'appExperience.alt3': 'Musuhi Weekly Reflection screen',
      'appExperience.img4': 'assets/img/app/en/voice-gift.webp',
      'appExperience.alt4': 'Musuhi Voice Gift screen',
      'appExperience.img5': 'assets/img/app/en/voice-book.webp',
      'appExperience.alt5': 'Musuhi Voice Book screen',
      'appExperience.img6': 'assets/img/app/en/journal-detail.webp',
      'appExperience.alt6': 'Musuhi Moment detail screen',
      'appExperience.img7': 'assets/img/app/en/voice-garden.webp',
      'appExperience.alt7': 'Musuhi Voice Garden screen',

      'story.title': 'The Story Behind Musuhi',
      'story.p1': 'When I was a child, my father recorded my voice on a cassette tape he titled “Toshiyasu — Growing Up.”',
      'story.p2': 'It holds ordinary moments — our voices, laughter, pauses, and conversations from everyday life.',
      'story.quote1': 'A voice can preserve more than words. It can preserve how someone felt.',
      'story.quote2': 'Sometimes, there are things we find difficult to say face-to-face, but easier to express when something helps carry the message.',
      'story.p3': 'Years later, when I listened to that tape again, I felt more than nostalgia. Through my father’s voice, I could sense how he felt and how deeply I had been cared for.',
      'story.p4': 'That experience taught me that a voice can carry someone’s feelings across time.',
      'story.p5': 'And sometimes, hearing a voice again can give us the strength to move forward.',
      'story.origin': 'That experience became the starting point for Musuhi.',
      'story.signature': 'Musuhi — Toshiyasu Nakamura',

      'ctaFinal.title': 'What moved you today?',
      'ctaFinal.list': 'Something that made you happy　Something you’re grateful for　Something you tried　A moment that moved you',
      'ctaFinal.lead': 'Why not capture that moment in your voice and a photo?<br>Your first Moment can start with how you feel today.',
      'ctaFinal.button': 'Coming Soon on the App Store',
      'ctaFinal.buttonLive': 'Download Musuhi on the App Store',
      'ctaFinal.brandLine': 'A conversation with yourself.<br>A connection with someone you care about.<br>It all begins with your voice.',

      'footer.privacy': 'Privacy Policy',
      'footer.terms': 'Terms of Use',
      'footer.contact': 'Contact',
      'footer.org': 'Operated by CrossOver',

      'meta.title': 'Musuhi — Capture How You Feel, in Your Voice and Photos | One Moment. One Voice.',
      'meta.description': 'Musuhi is a voice journaling app that helps you capture how you feel through voice and photos, reflect with AI, and discover things about yourself you may not have noticed before. You can also turn the voices you’ve saved into meaningful gifts for the people you care about.',

      'support.metaTitle': 'Support | Musuhi',
      'support.metaDescription': 'If you have any questions or need help with Musuhi, please contact us at the email address below.',
      'support.title': 'Support',
      'support.lead': 'If you have any questions or need help with Musuhi, please contact us at the email address below.',
      'support.contactLabel': 'Email Us',
      'support.legalPrivacy': 'Privacy Policy',
      'support.legalTerms': 'Terms of Use',
      'support.back': '← Back to Musuhi'
    }
  };

  function t(lang, key) {
    var dict = I18N[lang] || I18N.ja;
    return Object.prototype.hasOwnProperty.call(dict, key) ? dict[key] : (I18N.ja[key] || '');
  }

  function applyLanguage(lang) {
    if (!I18N[lang]) { lang = 'ja'; }

    document.documentElement.lang = lang;

    var textEls = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < textEls.length; i++) {
      var el = textEls[i];
      el.textContent = t(lang, el.getAttribute('data-i18n'));
    }

    var htmlEls = document.querySelectorAll('[data-i18n-html]');
    for (var j = 0; j < htmlEls.length; j++) {
      var htmlEl = htmlEls[j];
      htmlEl.innerHTML = t(lang, htmlEl.getAttribute('data-i18n-html'));
    }

    // data-i18n-attr="attr:key" または "attr1:key1,attr2:key2"（例: imgのsrcとaltを同時に切替）
    var attrEls = document.querySelectorAll('[data-i18n-attr]');
    for (var k = 0; k < attrEls.length; k++) {
      var attrEl = attrEls[k];
      var pairs = attrEl.getAttribute('data-i18n-attr').split(',');
      for (var p = 0; p < pairs.length; p++) {
        var spec = pairs[p].split(':');
        var attrName = spec[0];
        var attrKey = spec[1];
        attrEl.setAttribute(attrName, t(lang, attrKey));
      }
    }

    var toggleBtns = document.querySelectorAll('.lang-toggle__btn');
    for (var m = 0; m < toggleBtns.length; m++) {
      var btn = toggleBtns[m];
      var isActive = btn.getAttribute('data-lang') === lang;
      if (isActive) {
        btn.setAttribute('aria-current', 'true');
      } else {
        btn.removeAttribute('aria-current');
      }
    }
  }

  function initLanguageToggle() {
    var saved = null;
    try {
      saved = window.localStorage.getItem(LANG_STORAGE_KEY);
    } catch (e) {
      saved = null;
    }
    var initialLang = (saved === 'en') ? 'en' : 'ja';

    applyLanguage(initialLang);

    var toggleBtns = document.querySelectorAll('.lang-toggle__btn');
    for (var i = 0; i < toggleBtns.length; i++) {
      toggleBtns[i].addEventListener('click', function (event) {
        var nextLang = event.currentTarget.getAttribute('data-lang');
        applyLanguage(nextLang);
        try {
          window.localStorage.setItem(LANG_STORAGE_KEY, nextLang);
        } catch (e) {
          /* localStorageが使えない環境では保持のみ諦め、表示切替は継続 */
        }
      });
    }
  }

  initLanguageToggle();

  // Musuhi LP — スクロール演出と水引コードの描画
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ヘッダー: スクロールで影をつける
  var header = document.getElementById('site-header');
  var onScroll = function () {
    header.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // .reveal: ビューポートに入ったらフェードイン
  var reveals = document.querySelectorAll('.reveal');
  if (reducedMotion || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );
    reveals.forEach(function (el) { io.observe(el); });
  }

  // .draw-path: 線が自分で描かれていくアニメーション
  var paths = document.querySelectorAll('.draw-path');
  if (!reducedMotion && 'IntersectionObserver' in window) {
    paths.forEach(function (path) {
      var len = path.getTotalLength();
      path.style.strokeDasharray = String(len);
      path.style.strokeDashoffset = String(len);
    });
    var pathIo = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var path = entry.target;
            path.classList.add('is-drawn');
            // 次フレームでオフセットを0にして transition を発火させる
            requestAnimationFrame(function () {
              requestAnimationFrame(function () {
                path.style.strokeDashoffset = '0';
              });
            });
            pathIo.unobserve(path);
          }
        });
      },
      { threshold: 0.4 }
    );
    paths.forEach(function (path) { pathIo.observe(path); });
  }
})();
