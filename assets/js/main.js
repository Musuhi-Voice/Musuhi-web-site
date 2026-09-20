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
      'header.nav.whyNow': 'なぜ今',
      'header.nav.philosophy': 'Musuhiの考え',
      'header.nav.appExperience': 'アプリ体験',
      'header.nav.story': 'Musuhiの原点',
      'header.cta': 'App Store',
      'header.ctaHref': 'https://apps.apple.com/jp/app/musuhi/id6808240697',

      'hero.title': 'その瞬間の気持ちを、<span class="hero__title-accent">声と写真</span>で残す',
      'hero.lead': '<span class="ln"><span class="ph">Musuhiは、</span><span class="ph">日々の気持ちを</span><span class="ph">声と写真で残し、</span></span><span class="ln"><span class="ph">AIと振り返りながら</span><span class="ph">自分自身を</span><span class="ph">より深く知り、</span></span><span class="ln"><span class="ph">その想いを</span><span class="ph">大切な人へ</span><span class="ph">届けることができる</span><span class="ph">ジャーナリング型</span><span class="ph">ライフログサービスです</span></span>',
      'hero.jingle': '音声ジャーナリングで、<br class="br-sp">心が豊かになる新しい習慣を',

      'why.title': 'なぜ、「声」なのか',
      'why.statement': '写真も、文字も残る<br>でも、その時の気持ちは、<br class="br-sp">残りにくい',
      'why.keepLabel': '残るもの',
      'why.keepBody': 'スマートフォンには写真や動画が残る<br>SNSには投稿が残る<br>出来事の記録は、いくつも積み重なっていく',
      'why.lostLabel': '残りにくいもの',
      'why.lostBody': '「あの日、自分は何を感じていたんだろう。」<br>誰かに伝えたかった想い。嬉しかったこと、悔しかったこと、感謝したこと、心が揺れたこと。その瞬間に確かにあった<strong>感情</strong>は、意外なほど残っていません。',
      'why.voice': '写真や動画には、その瞬間の景色や姿を残せます。一方で、自分の気持ちや、まだ言葉になりきっていない想いを残したいとき、カメラに向かって話すのは少し照れくさく感じることもあります。声なら、誰かに見せるためではなく、自分に話しかけるように、その時の感情を自然に残せます。',
      'why.closing': '<span class="ln"><span class="ph">声なら、</span><span class="ph">自分に話しかけるように、</span><span class="ph">その時の気持ちを</span><span class="ph">残せる</span></span><span class="ln"><span class="ph">あとから聞き返したとき、</span><span class="ph">言葉だけでは</span><span class="ph">思い出せなかった、</span><span class="ph">あの日の自分の</span><span class="ph">気持ちまで</span><span class="ph">振り返れる</span></span><span class="ln"><span class="ph">だからMusuhiは、</span><span class="ph"><span class="why__accent">声で残すジャーナリング</span></span><span class="ph">に着目しました</span></span>',

      'whyNow.title': '<span class="ph">便利で快適になった</span><span class="ph">毎日の中で、</span><span class="ph">見えにくくなったもの</span>',
      'whyNow.g1': '<span class="ln">暮らしは、ますます速く、便利で快適になり、デジタル化も進んでいます。</span><span class="ln">私たちは、いつでも誰かとつながり、これまで以上に多くの情報や出来事を残せるようになりました。</span>',
      'whyNow.g2': '<span class="ln">その一方で、</span><span class="ln">自分自身と向き合う時間は、意識しなければ、日々の中に埋もれてしまいがちです。</span>',
      'whyNow.q1': '<span class="ln"><span class="ph">自分は今、</span><span class="ph">何を感じているのか</span></span><span class="ln"><span class="ph">何を大切にしたいのか</span></span><span class="ln"><span class="ph">何に喜び、</span><span class="ph">何に迷い、</span><span class="ph">何を願っているのか</span></span>',
      'whyNow.g3': '<span class="ln">そして、人といつでもつながれる時代になっても、</span><span class="ln">本当に伝えたい気持ちまで、いつも伝えられているとは限りません。</span>',
      'whyNow.e1': '<span class="ln"><span class="ph">感謝や励まし、</span><span class="ph">愛情、</span><span class="ph">寂しさ、</span><span class="ph">モヤモヤ</span></span>',
      'whyNow.g4': 'そうした気持ちは、言葉にされないまま心の中に残ることがあります。',
      'whyNow.e2': '<span class="ln"><span class="ph">つながる手段は</span><span class="ph">増えた</span></span>',
      'whyNow.g5': '<span class="ln">けれど、自分の気持ちを理解することや、</span><span class="ln">大切な人と心を深く通わせることは、</span><span class="ln">便利さだけでは生まれません。</span>',
      'whyNow.q2': '<span class="ln"><span class="ph">自分の感情に</span><span class="ph">気づくこと</span></span><span class="ln"><span class="ph">自分にとって</span><span class="ph">本当に大切なものを</span><span class="ph">知ること</span></span><span class="ln"><span class="ph">そして、</span><span class="ph">その気持ちを</span><span class="ph">大切な人と</span><span class="ph">分かち合うこと</span></span>',
      'whyNow.g6': '<span class="ln">そうした目には見えにくい心の豊かさも、</span><span class="ln">私たちがよりよく生きていくための大切な一部だと、</span><span class="ln">Musuhiは考えています。</span>',
      'whyNow.closing': '<span class="ln"><span class="ph">Musuhiは、</span></span><span class="ln"><span class="ph">自分を知ることと、</span><span class="ph">大切な人へ</span><span class="ph">想いを伝えることが、</span></span><span class="ln"><span class="ph">日々の暮らしに</span><span class="ph">自然に溶け込み、</span></span><span class="ln"><span class="ph">習慣として</span><span class="ph">根づく世界を</span><span class="ph">つくるために</span><span class="ph">生まれました</span></span>',

      'philosophy.title': '<span class="ln">より豊かな人生は、</span><span class="ln"><span class="ph">自分を知り、</span><span class="ph">大切な人と</span><span class="ph">深くつながることから</span></span>',
      'philosophy.lead1': '<span class="ln"><span class="ph">Musuhiは、</span><span class="ph">ウェルビーイングを</span></span><span class="ln"><span class="ph">「より深い自己理解」と</span><span class="ph">「大切な人との</span><span class="ph">より深いつながり」</span></span><span class="ln"><span class="ph">という二つの方向から</span><span class="ph">捉え、</span><span class="ph">その積み重ねが、</span></span>',
      'philosophy.lead2': '<span class="ln"><span class="ph">心の豊かさに</span><span class="ph">つながっていくと</span><span class="ph">考えています</span></span>',
      'philosophy.b1.title': '自分との対話',
      'philosophy.b1.body': '日々の感情や出来事を残し、振り返ることで、自分が何を感じ、何を大切にし、どのように変化しているのかに気づいていく。',
      'philosophy.b2.title': '人とのつながり',
      'philosophy.b2.body': '普段は言葉にできない感謝や愛情、励ましや想いを声にして届けることで、すでにそこにある大切な関係を、さらに深めていく。',

      'voiceAlbum.title': '<span class="ph">その瞬間の気持ちを、</span><span class="ph">残しておく</span>',
      'voiceAlbum.p1': '<span class="ln">私たちは毎日、</span><span class="ln">簡単には言葉にできないさまざまな感情を抱えながら生きています。</span>',
      'voiceAlbum.p2': '<span class="ln">Voice Albumでは、</span><span class="ln">その瞬間に感じていたことを、</span><span class="ln">自分の声と写真で残します。</span>',
      'voiceAlbum.p3': '上手な文章を書く必要はありません。',
      'voiceAlbum.em1': '<span class="ln"><span class="ph">ただ、</span><span class="ph">話せばいい</span></span>',
      'voiceAlbum.p4': '<span class="ln">日々の声が積み重なることで、</span><span class="ln">それは「何が起きたか」だけではなく、</span>',
      'voiceAlbum.em2': 'その人生をどのように感じながら生きていたのか',
      'voiceAlbum.p5': 'という記録になっていきます。',

      'weeklyReflection.title': '<span class="ph">AIが、</span><span class="ph">人生にそっと寄り添う</span><span class="ph">伴走者になる</span>',
      'weeklyReflection.p1': '<span class="ln">Weekly Reflectionでは、AIが1週間に残された声や感情を横断して振り返ります。</span>',
      'weeklyReflection.pts': '<span class="ln"><span class="ph">繰り返し現れる</span><span class="ph">感情や出来事</span></span><span class="ln"><span class="ph">大切にしている</span><span class="ph">価値観</span></span><span class="ln"><span class="ph">日々の中では</span><span class="ph">気づきにくい、</span><span class="ph">小さな変化</span></span>',
      'weeklyReflection.p2': '<span class="ln">Musuhiでは、AIを診断や評価、正解を与えるために使うのではなく、</span>',
      'weeklyReflection.p3': '<span class="ln"><span class="ph">自分自身の人生を</span><span class="ph">少し違う角度から</span><span class="ph">見つめるための、</span></span><span class="ln"><span class="ph">もうひとつの視点を、</span><span class="ph">そっと提示する</span><span class="ph">存在として</span><span class="ph">設計しています</span></span>',
      'weeklyReflection.p4': '<span class="ln"><span class="ph">何を大切にしていたのか</span></span><span class="ln"><span class="ph">何が少しずつ</span><span class="ph">変わってきたのか</span></span><span class="ln"><span class="ph">そして、</span><span class="ph">自分自身でも</span><span class="ph">まだ気づいていなかった、</span></span><span class="ln"><span class="ph">自分とは</span><span class="ph">どのような人なのか</span></span>',
      'weeklyReflection.p5': '<span class="ln">そうした気づきのきっかけを届けることが、Weekly Reflectionの役割です。</span>',
      'weeklyReflection.closing': '<span class="ln"><span class="ph">積み重なった気持ちは、</span></span><span class="ln"><span class="ph">思い出から、</span><span class="ph">より深い自己理解へ</span></span>',

      'connection.title': '大切な関係を、より深く',
      'connection.intro1': '<span class="ln">心の豊かさは、</span><span class="ln">自分自身を理解することだけで完結するものではありません。</span>',
      'connection.intro2': '<span class="ln">人生の豊かさは、</span><span class="ln">誰と、どのような関係を築いているかにも深く影響されます。</span>',
      'connection.gift.b1': 'Voice Letterでは、大切な人へ、普段はなかなか言葉にできない想いを、自分自身の声で届けます。',
      'connection.gift.pts': '<span class="ln"><span class="ph">感謝</span></span><span class="ln"><span class="ph">励まし</span></span><span class="ln"><span class="ph">愛情</span></span><span class="ln"><span class="ph">尊敬</span></span><span class="ln"><span class="ph">あるいは、</span><span class="ph">文字だけでは</span><span class="ph">伝えきれない想い</span></span>',
      'connection.gift.b2': '<span class="ph">その気持ちは、</span><span class="ph">今届けることも、</span><span class="ph">未来の日に向けて</span><span class="ph">残しておくことも</span><span class="ph">できます</span>',
      'connection.book.b1': 'Voice Bookでは、家族や友人、仲間たちの声と写真、思い出をひとつに集め、',
      'connection.book.b2': '<span class="ln"><span class="ph">大切な人への、</span><span class="ph">かけがえのない</span><span class="ph">贈りものに</span></span>',
      'connection.closing': '<span class="ln"><span class="ph">Musuhiが目指しているのは、</span></span><span class="ln"><span class="ph">すでにそこにある</span><span class="ph">大切な関係を、</span><span class="ph">より深くすることです</span></span>',
      'connection.brand': '<span class="ln"><span class="ph">残す・振り返る・贈る——</span><span class="ph">声を通して</span></span><span class="ln"><span class="ph">過去の自分・</span><span class="ph">未来の自分・</span><span class="ph">大切な人が</span><span class="ph">結ばれていく</span></span><span class="ln"><span class="ph">それが、</span><span class="ph"><span class="chapter__brand-accent">Musuhi</span></span><span class="ph">です</span></span>',
      'connection.book.tag1': '結婚式',
      'connection.book.tag2': '卒業',
      'connection.book.tag3': '転勤・異動',
      'connection.book.tag4': '退職',
      'connection.book.tag5': '記念日',


      'vision.title': 'Musuhiが描く未来',
      'vision.v1': '<span class="ln"><span class="ph">日々の中で、</span><span class="ph">自分の気持ちに気づき、</span></span><span class="ln"><span class="ph">自分にとって</span><span class="ph">大切なものを確かめ、</span></span><span class="ln"><span class="ph">大切な人へ</span><span class="ph">想いを伝える</span></span>',
      'vision.v2': '<span class="ln"><span class="ph">そんな習慣が</span><span class="ph">積み重なることで、</span></span>',
      'vision.v3': '<span class="ln"><span class="ph">自分らしく</span><span class="ph">人生を歩み、</span></span><span class="ln"><span class="ph">自分自身の人生を、</span><span class="ph">もっと大切に</span><span class="ph">感じられる人が</span><span class="ph">増えていく</span></span>',
      'vision.v4': '<span class="ln">Musuhiは、そんな未来を描いています。</span>',
      'vision.v5': '<span class="ln"><span class="ph">自分自身の</span><span class="ph">感情や価値観に</span><span class="ph">気づくこと</span></span><span class="ln"><span class="ph">まだ気づいていなかった</span><span class="ph">自分を発見すること</span></span><span class="ln"><span class="ph">消えてしまうかもしれなかった</span><span class="ph">想いを届けること</span></span><span class="ln"><span class="ph">大切な人との</span><span class="ph">関係をより</span><span class="ph">深めていくこと</span></span>',
      'vision.v6': '<span class="ln">そうした体験を通じて、</span><span class="ln">Musuhiは、心の豊かさとウェルビーイングに貢献していきたいと考えています。</span>',
      'vision.v7': '<span class="ln"><span class="ph">スピードや</span><span class="ph">便利さが</span><span class="ph">これからも</span><span class="ph">増していく</span><span class="ph">世界だからこそ、</span></span>',
      'vision.v8': '<span class="ln"><span class="ph">自分の気持ちを</span><span class="ph">大切にしながら、</span></span><span class="ln"><span class="ph">自分らしく、</span><span class="ph">心豊かに</span><span class="ph">生きられる</span><span class="ph">毎日へ</span></span>',
      'vision.end1': '<span class="ln"><span class="ph">今日残した声が、</span></span><span class="ln"><span class="ph">明日の自分を</span><span class="ph">理解する</span><span class="ph">きっかけになるかもしれない</span></span>',
      'vision.end2': '<span class="ln"><span class="ph">そして今日伝えた想いが、</span></span><span class="ln"><span class="ph">大切な人との</span><span class="ph">関係を、</span></span><span class="ln"><span class="ph">これから何年も</span><span class="ph">深めていくかもしれない</span></span>',

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
      'ctaFinal.button': 'App StoreでMusuhiをはじめる',
      'ctaFinal.buttonHref': 'https://apps.apple.com/jp/app/musuhi/id6808240697',
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
      'header.nav.whyNow': 'Why Now',
      'header.nav.philosophy': 'Our Philosophy',
      'header.nav.appExperience': 'Experience Musuhi',
      'header.nav.story': 'The Story Behind Musuhi',
      'header.cta': 'App Store',
      'header.ctaHref': 'https://apps.apple.com/us/app/musuhi/id6808240697',

      'hero.title': 'Capture how you feel,\u00a0in <span class="hero__title-accent">your voice and\u00a0photos</span>.',
      'hero.lead': 'Musuhi is a voice journaling app that helps you capture everyday feelings through your voice and photos, reflect with AI to understand yourself more deeply, and share what you feel with the people who matter to you.',
      'hero.jingle': 'Make voice journaling a meaningful part of your everyday life.',

      'why.title': 'Why Voice?',
      'why.statement': '<span class="ln">Photos and words can preserve what happened.</span><span class="ln">But how you felt in that moment can easily fade.</span>',
      'why.keepLabel': 'What We Keep',
      'why.keepBody': 'Photos and videos stay on our phones.<br>Posts remain on social media.<br>We collect countless records of what happened.',
      'why.lostLabel': 'What Often Gets Lost',
      'why.lostBody': '“How did I actually feel that day?”<br>The things we wanted to tell someone. The joy, frustration, gratitude, and moments that moved us. The <strong>feelings</strong> that were so real in the moment are often the easiest things to lose.',
      'why.voice': 'Photos and videos are great at preserving what we saw and where we were. But when it comes to our feelings — especially the ones we haven’t quite found the words for yet — speaking to a camera can feel a little\u00a0uncomfortable.<br>With voice, you can simply talk to yourself. No posing. No performing. Just the way you feel in that\u00a0moment.',
      'why.closing': '<span class="ln">Voice lets you capture how you feel, as naturally as talking to yourself.</span><span class="ln">When you listen back later, you can reconnect with feelings that words alone may not bring back.</span><span class="ln">That’s why Musuhi is built around <span class="why__accent">voice journaling</span>.</span>',

      'whyNow.title': 'What We Lose Sight of in a\u00a0Faster, More Convenient Life',
      'whyNow.g1': '<span class="ln">Life is becoming faster, more convenient, more comfortable, and increasingly digital.</span><span class="ln">We can stay connected to people at any time and preserve more information and moments than ever before.</span>',
      'whyNow.g2': 'At the same time, time to be with ourselves can easily get buried in the pace of everyday life.',
      'whyNow.q1': '<span class="ln">What am I feeling right now?</span><span class="ln">What truly matters to me?</span><span class="ln">What brings me joy, what am I unsure about, and what am I hoping for?</span>',
      'whyNow.g3': 'And even in a world where we can always reach one another, it does not mean we always express what we truly want to say.',
      'whyNow.e1': 'Gratitude, encouragement, love, loneliness, unease.',
      'whyNow.g4': 'Some feelings remain inside us without ever being put into words.',
      'whyNow.e2': 'We have more ways to stay connected.',
      'whyNow.g5': 'But convenience alone does not help us understand ourselves or deepen the relationships that matter.',
      'whyNow.q2': '<span class="ln">Noticing our emotions.</span><span class="ln">Understanding what truly matters to us.</span><span class="ln">And sharing those feelings with the people we care about.</span>',
      'whyNow.g6': 'These less visible parts of our inner lives are also an important part of living well.',
      'whyNow.closing': '<span class="ln">Musuhi was created to help make understanding ourselves</span><span class="ln">and expressing what we feel to the people who matter</span><span class="ln">a natural part of everyday life —</span><span class="ln">habits that become woven into the way we live.</span>',

      'philosophy.title': 'A richer life begins with understanding yourself more deeply and connecting more deeply with the people who matter to you.',
      'philosophy.lead1': '<span class="ln">Musuhi approaches wellbeing through two connected directions:</span><span class="ln">deeper self-understanding</span><span class="ln">and deeper connection with the people who matter to you.</span>',
      'philosophy.lead2': '<span class="ln">We believe that nurturing both can lead to</span><span class="ln">a richer and more meaningful inner life.</span>',
      'philosophy.b1.title': 'A conversation with yourself',
      'philosophy.b1.body': 'By preserving and reflecting on everyday feelings and experiences, you can begin to notice what you feel, what you value, and how you are changing over time.',
      'philosophy.b2.title': 'Connection with others',
      'philosophy.b2.body': 'By giving voice to gratitude, love, encouragement, and feelings that can be difficult to put into words, you can deepen the relationships that already matter.',

      'voiceAlbum.title': 'Preserve how the moment felt',
      'voiceAlbum.p1': 'Every day, we experience feelings that are not always easy to put into words.',
      'voiceAlbum.p2': 'With Voice Album, you can preserve how you felt in a moment through your own voice and a photo.',
      'voiceAlbum.p3': 'You do not need to write a perfect journal entry.',
      'voiceAlbum.em1': 'Just speak.',
      'voiceAlbum.p4': 'As those voices accumulate, they become more than a record of what happened.',
      'voiceAlbum.em2': 'They become a record of how life actually felt.',
      'voiceAlbum.p5': '',

      'weeklyReflection.title': 'AI as a gentle companion on your life journey',
      'weeklyReflection.p1': 'Weekly Reflection looks across a week of recorded voices and feelings.',
      'weeklyReflection.pts': '<span class="ln">Recurring emotions and experiences.</span><span class="ln">Values that matter to you.</span><span class="ln">Small changes that are easy to miss in everyday life.</span>',
      'weeklyReflection.p2': '<span class="ln">At Musuhi, AI is not designed to diagnose,</span><span class="ln">evaluate, or give you the “right” answer.</span>',
      'weeklyReflection.p3': '<span class="ln">Instead, it is designed to gently offer another perspective —</span><span class="ln">a way to look at your own life from a slightly different angle.</span>',
      'weeklyReflection.p4': '<span class="ln">What has mattered to you?</span><span class="ln">What has been changing?</span><span class="ln">And what parts of yourself</span><span class="ln">might you not have noticed yet?</span>',
      'weeklyReflection.p5': '<span class="ln">Weekly Reflection is designed to create moments</span><span class="ln">that help you notice those things.</span>',
      'weeklyReflection.closing': '<span class="ln">As feelings accumulate,</span><span class="ln">they become more than memories —</span><span class="ln">they become a path to deeper self-understanding.</span>',

      'connection.title': 'Deepen the relationships that already matter',
      'connection.intro1': '<span class="ln">A meaningful life is shaped not only by how well we understand ourselves,</span><span class="ln">but also by the quality of our relationships with other people.</span>',
      'connection.intro2': '',
      'connection.gift.b1': 'Voice Letter lets you share feelings that can be difficult to put into words, in your own voice.',
      'connection.gift.pts': '<span class="ln">Gratitude.</span><span class="ln">Encouragement.</span><span class="ln">Love.</span><span class="ln">Appreciation.</span><span class="ln">Or something that feels too meaningful for text alone.</span>',
      'connection.gift.b2': 'That feeling can be shared now, or saved for a future day.',
      'connection.book.b1': 'Voice Book brings together voices, photos, and memories from family, friends, or colleagues',
      'connection.book.b2': '<span class="ln">A one-of-a-kind gift for someone who matters</span>',
      'connection.closing': '<span class="ln">Musuhi is designed to deepen</span><span class="ln">the relationships that already matter in our lives.</span>',
      'connection.brand': '<span class="ln">Capture. Reflect. Gift.</span><span class="ln">Through voice, Musuhi connects who you were,</span><span class="ln">who you are becoming, and the people who matter to you.</span><span class="ln">That is <span class="chapter__brand-accent">Musuhi</span>.</span>',
      'connection.book.tag1': 'Weddings',
      'connection.book.tag2': 'Graduations',
      'connection.book.tag3': 'Farewells & New Beginnings',
      'connection.book.tag4': 'Retirement',
      'connection.book.tag5': 'Anniversaries',


      'vision.title': 'The Future Musuhi Wants to Create',
      'vision.v1': '<span class="ln">By making space each day to notice how we feel, recognize what truly matters,</span><span class="ln">and express what we feel to the people we care about,</span>',
      'vision.v2': '<span class="ln">these small habits can shape the way we live.</span>',
      'vision.v3': '<span class="ln">Musuhi imagines a future where more people can live more fully as themselves</span><span class="ln">and feel a deeper appreciation for the life they are living.</span>',
      'vision.v4': '',
      'vision.v5': '<span class="ln">Noticing our emotions and values.</span><span class="ln">Discovering parts of ourselves we had not recognized before.</span><span class="ln">Expressing feelings that might otherwise disappear.</span><span class="ln">Deepening the relationships that matter.</span>',
      'vision.v6': '<span class="ln">Through these experiences,</span><span class="ln">Musuhi aims to contribute to greater emotional richness and wellbeing.</span>',
      'vision.v7': '<span class="ln">As speed and convenience continue to grow,</span><span class="ln">we want everyday life to leave room for something equally important:</span>',
      'vision.v8': '<span class="ln">to honor how we feel,</span><span class="ln">to live more fully as ourselves,</span><span class="ln">and to experience a\u00a0deeper sense of wellbeing.</span>',
      'vision.end1': '<span class="ln">A voice recorded today can help you understand yourself tomorrow.</span>',
      'vision.end2': '<span class="ln">And a feeling shared today can deepen a relationship for years to come.</span>',

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
      'story.signature': 'Musuhi\u00a0— Toshiyasu\u00a0Nakamura',

      'ctaFinal.title': 'What moved you today?',
      'ctaFinal.list': 'Something that made you happy　Something you’re grateful for　Something you tried　A moment that moved you',
      'ctaFinal.lead': 'Why not capture that moment in your voice and a photo?<br>Your first Moment can start with how you feel today.',
      'ctaFinal.button': 'Download Musuhi on the App Store',
      'ctaFinal.buttonHref': 'https://apps.apple.com/us/app/musuhi/id6808240697',
      'ctaFinal.brandLine': 'A conversation with yourself.<br>A connection with someone you care\u00a0about.<br>It all begins with your voice.',

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
