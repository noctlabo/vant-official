if('scrollRestoration' in history)history.scrollRestoration='manual';
window.__vantTop=1;
document.addEventListener('touchstart',function(){},{passive:true});
addEventListener('load',()=>{if(!location.hash)window.scrollTo(0,0)});
const header=document.querySelector('[data-header]'),menu=document.querySelector('.menu'),nav=document.querySelector('#nav');
const closeMenu=()=>{menu?.setAttribute('aria-expanded','false');nav?.classList.remove('open');document.body.classList.remove('locked')};
menu?.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);document.body.classList.toggle('locked',open)});nav?.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));addEventListener('scroll',()=>header?.classList.toggle('scrolled',scrollY>40),{passive:true});
const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches,items=document.querySelectorAll('.reveal');if(reduced||!('IntersectionObserver'in window))items.forEach(x=>x.classList.add('visible'));else{const observer=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.08,rootMargin:'0px 0px -5%'});items.forEach(x=>observer.observe(x));const revealNow=()=>items.forEach(x=>{if(x.classList.contains('visible'))return;const r=x.getBoundingClientRect();if(r.top<innerHeight*.95&&r.bottom>-40)x.classList.add('visible')});addEventListener('scroll',revealNow,{passive:true});addEventListener('resize',revealNow);addEventListener('load',revealNow);requestAnimationFrame(()=>requestAnimationFrame(revealNow))}
document.querySelectorAll('[data-filter]').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(b=>{b.classList.remove('active');b.setAttribute('aria-pressed','false')});btn.classList.add('active');btn.setAttribute('aria-pressed','true');document.querySelectorAll('.post').forEach(p=>p.hidden=btn.dataset.filter!=='all'&&p.dataset.category!==btn.dataset.filter)}));
const profiles={waka:{index:'01 / SILVER',name:'若｜WAKA',title:'DOMINANCE',images:['./assets/waka-01.png','./assets/waka-02.png','./assets/waka-03.png','./assets/waka-04.png','./assets/waka-05.png'],details:[['HEIGHT','196 CM'],['ROLE','LEADER / VOCAL'],['STYLE','KRUMP / HIPHOP'],['COLOR','SILVER'],['BIRTHDAY','11.18'],['BLOOD TYPE','A'],['FROM','FUKUOKA, JP']],copy:'196cmの長身。KRUMPを中心とした重さ、圧、表現力、ステージを掌握する存在感が武器。重さ・圧・統率・VISION。'},ina:{index:'02 / BLUE',name:'稲｜INA',title:'GENTLEMAN',images:['./assets/ina-01.png','./assets/ina-02.png','./assets/ina-03.png','./assets/ina-04.png','./assets/ina-05.png'],details:[['HEIGHT','188 CM'],['ROLE','ALL ROUNDER / VOCAL'],['STYLE','ALL GENRE / POP'],['COLOR','BLUE'],['BIRTHDAY','02.07'],['BLOOD TYPE','O'],['FROM','KANAGAWA, JP']],copy:'あらゆるジャンルを高いレベルで踊るオールラウンダー。高速で細かなダンスと、紳士のような丁寧でスマートな佇まい。速さ・技術・万能・VIBE。'},kuma:{index:'03 / RED',name:'隈｜KUMA',title:'IMPACT',images:['./assets/kuma-01.png','./assets/kuma-02.png','./assets/kuma-03.png','./assets/kuma-04.png','./assets/kuma-05.png'],details:[['HEIGHT','178 CM'],['ROLE','PHYSICAL / BREAK'],['STYLE','BREAK / ACROBAT / HIPHOP'],['COLOR','RED'],['BIRTHDAY','06.17'],['BLOOD TYPE','A'],['FROM','KANAGAWA, JP']],copy:'鍛えた身体と身体能力を武器にするフィジカル担当。パワームーブ、フリーズ、ジャンプ、アクロバット。強さ・肉体・爆発力・VITALITY。'}};
const dialog=document.querySelector('#profile');let lastTrigger=null;
const showShot=(p,n)=>{const m=dialog.querySelector('[data-dialog-image]');m.src=p.images[n];m.alt=p.name+' 写真 '+(n+1);dialog.querySelectorAll('[data-dialog-thumbs] button').forEach((b,k)=>b.setAttribute('aria-current',String(k===n)))};
document.querySelectorAll('.member').forEach(card=>{const b=card.querySelector('[data-profile]');if(b)card.addEventListener('click',e=>{if(!e.target.closest('[data-profile]'))b.click();});});
document.querySelectorAll('[data-profile]').forEach(b=>b.addEventListener('click',()=>{
  const p=profiles[b.dataset.profile];lastTrigger=b;
  dialog.querySelector('[data-dialog-index]').textContent=p.index;
  dialog.querySelector('[data-dialog-name]').textContent=p.name;
  dialog.querySelector('[data-dialog-title]').textContent=p.title;
  dialog.querySelector('[data-dialog-details]').innerHTML=p.details.map(([a,v])=>`<div><dt>${a}</dt><dd>${v}</dd></div>`).join('');
  dialog.querySelector('[data-dialog-copy]').textContent=p.copy;
  const th=dialog.querySelector('[data-dialog-thumbs]');
  th.innerHTML=p.images.map((s,n)=>`<button type="button" aria-label="写真 ${n+1}"><img src="${s}" alt=""></button>`).join('');
  th.querySelectorAll('button').forEach((btn,n)=>btn.addEventListener('click',()=>showShot(p,n)));
  dialog.querySelectorAll('[data-ja]').forEach(e=>e.removeAttribute('data-ja'));
  showShot(p,0);applyJa(dialog);
  dialog.showModal();document.body.classList.add('locked');dialog.querySelector('.dialog-close').focus();
}));
dialog?.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
dialog?.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
dialog?.addEventListener('close',()=>{document.body.classList.remove('locked');lastTrigger?.focus()});

/* ---- 日本語表記ヒント（既定ON / ヘッダーはオンマウスで日本語に切替） ---- */
const JA={'POST':'投稿','MEMBER BLOG':'メンバーブログ','OTHER POSTS':'ほかの投稿','ΛLLY LOGIN':'ΛLLY ログイン','← POST 一覧へ':'投稿一覧に戻る','OFFICIAL FAN COMMUNITY':'公式ファンコミュニティ','COMMENTS':'コメント数','POST REPLY':'返信を投稿','REPLY':'返信','BACK TO ΛLLY LOUNGE →':'ラウンジ一覧に戻る','ATTACH IMAGE':'画像を添付','＋ ATTACH IMAGE':'画像を添付','＋ ADD TO CART':'カートに入れる','ADD TO CART':'カートに入れる','WAKA / STAGE':'若／ステージ','INA / STAGE':'稲／ステージ','KUMA / STAGE':'隈／ステージ','VΛNT / 3MAN':'ヴァント／3人','STAGE VIEW':'ステージ全景','AFTER LIVE':'ライブ終わり','WAKA / PORTRAIT':'若／ポートレート','INA / PORTRAIT':'稲／ポートレート','KUMA / PORTRAIT':'隈／ポートレート','VΛNT // NIGHT SESSION #17':'ヴァント／ナイト セッション 第17回','VΛNT // NIGHT SESSION #16':'ヴァント／ナイト セッション 第16回','VΛNT // NIGHT SESSION #18':'ヴァント／ナイト セッション 第18回','VΛNT // NIGHT SESSION #19':'ヴァント／ナイト セッション 第19回','AFTER LIVE TALK':'ライブ後トーク','ΛLLY PLAYGROUND #3':'アリー プレイグラウンド 第3回','ΛLLY PLAYGROUND':'アリー プレイグラウンド — 交流会','SOLO TALK':'ソロトーク — ひとりの配信','WAKA // LATE NIGHT TALK':'若／深夜のひとり語り','INA // SPEED TALK':'稲／速さのひとり語り','KUMA // IMPACT TALK':'隈／衝撃のひとり語り','STREET SHOWCASE':'ストリート ショーケース — 路上公演','LIVE ARCHIVE':'ライブ アーカイブ — 過去配信','PHOTO':'フォト — 写真','WAKA / KRUMP SESSION':'若／クランプ セッション — 路上前のソロ','INA / SPEED DANCE':'稲／スピード ダンス — 高速ソロ','KUMA / BREAK TRAINING':'隈／ブレイク トレーニング — 基礎練','VΛNT / 3MAN SESSION':'ヴァント／3人セッション','VΛNT / AFTER LIVE TALK':'ヴァント／ライブ後トーク','VΛNT / STREET SHOW CUT':'ヴァント／路上ショー抜粋','01 / ABOUT':'01／アバウト — VΛNTについて','02 / MEMBER':'02／メンバー','03 / SOCIAL':'03／ソーシャル — 動画','04 / LIVE':'04／ライブ','05 / UPDATE':'05／お知らせ','06 / NEXT MOVE':'06／次の展開','07 / SHOP':'07／ショップ — 物販','ΛLLY ONLY':'アリー限定 — 会員向け','DANCE':'ダンス','TRAINING':'トレーニング — 鍛える','TALK':'トーク — 喋る','BACKSTAGE':'バックステージ — 舞台裏','ONLINE LIVE':'オンライン ライブ — 配信','FREE LIVE':'フリー ライブ — 無料公演','FAN MEETING':'ファン ミーティング — 交流会','STREET SHOW':'ストリート ショー — 路上','MORE FROM VΛNT FEED':'ほかの動画','MORE IN ARCHIVE':'ほかのアーカイブ','WEEKLY ROUTINE':'毎週の定番 — 曜日ごとの配信','NEXT DATES':'次回の日程','WATCH ON ZATAGRAM ↗':'ゼタグラムで見る','BACK TO VΛNT FEED →':'動画一覧に戻る','VΛNT LOGO HOODIE / BLACK':'ヴァント ロゴ パーカー／黒','VΛNT LOGO TEE / BLACK':'ヴァント ロゴ Tシャツ／黒','VΛNT CHEVRON TEE / WHITE':'ヴァント シェブロン（山形）Tシャツ／白','VΛNT L/S SHIRT / WHITE':'ヴァント 長袖シャツ／白','VΛNT LOGO CAP / BLACK':'ヴァント ロゴ キャップ（帽子）／黒','ΛLLY LOGO HOODIE / WHITE':'アリー ロゴ パーカー／白','ΛLLY LOGO TEE / BLACK':'アリー ロゴ Tシャツ／黒','ΛLLY CHEVRON TEE / WHITE':'アリー シェブロン（山形）Tシャツ／白','ΛLLY L/S SHIRT / BLACK':'アリー 長袖シャツ／黒','ΛLLY LOGO CAP / BLACK':'アリー ロゴ キャップ（帽子）／黒','ACRYLIC KEYCHAIN (3 TYPES)':'アクリル キーホルダー（全3種）','STICKER SHEET (10 TYPES)':'ステッカー シート（全10種）','VΛNT PLAYING CARDS':'ヴァント トランプ','CAN BADGE SET (4 TYPES)':'缶バッジ セット（全4種）','SMARTPHONE CASE (5 TYPES)':'スマホケース（全5種）','CHIBI PLUSH DOLL (3 TYPES)':'ミニ ぬいぐるみ（全3種）','VΛNT LOGO MUG / BLACK':'ヴァント ロゴ マグカップ／黒','VΛNT FACE TOWEL / BLACK':'ヴァント フェイスタオル／黒','ΛLLY LOGO MUG / WHITE':'アリー ロゴ マグカップ／白','ΛLLY FACE TOWEL / WHITE':'アリー フェイスタオル／白','ΛLLY PENDANT NECKLACE':'アリー ペンダント ネックレス','CHEVRON EARRINGS / SILVER':'シェブロン（山形）イヤリング／銀','ΛLLY SIGNET RING':'アリー シグネット リング（印台指輪）','ΛLLY CHARM KEYRING':'アリー チャーム キーリング','VΛNT PENDANT NECKLACE':'ヴァント ペンダント ネックレス','VΛNT DROP EARRINGS':'ヴァント ドロップ イヤリング','VΛNT SIGNET RING':'ヴァント シグネット リング（印台指輪）','VΛNT CHARM KEYRING':'ヴァント チャーム キーリング','VΛNT LOGO SOCKS':'ヴァント ロゴ ソックス（靴下）','CART':'カート — 買い物かご','SHOPPING CART':'ショッピングカート — 買い物かご','ORDER DETAILS.':'ご注文内容の入力','ORDER':'オーダー — ご注文','07 / SHOP — CART':'07／ショップ — 買い物かご','07 / SHOP — ORDER':'07／ショップ — ご注文','SUBTOTAL — 小計':'小計','SHIPPING — 送料':'送料','TOTAL — 合計（税込）':'合計（税込）','01 / SHIPPING — お届け先':'お届け先の入力','02 / PAYMENT — お支払い方法':'お支払い方法の選択','03 / NOTE — 備考':'備考・ご要望','ORDER SUMMARY — ご注文内容':'ご注文内容の確認','CREDIT CARD':'クレジットカード','CONVENIENCE STORE':'コンビニ決済','BANK TRANSFER':'銀行振込','QTY':'数量','APPAREL':'アパレル — 衣類','GOODS':'グッズ — 雑貨','ACCESSORY':'アクセサリー — 装飾品','ALL':'すべて','ABOUT':'アバウト — VΛNTについて','MEMBER':'メンバー','VΛNT FEED':'ヴァント フィード — 動画一覧','LIVE':'ライブ','SCHEDULE':'スケジュール — 日程','NEWS':'ニュース — お知らせ','NEXT MOVE':'ネクスト ムーブ — 次の展開','SHOP':'ショップ — 物販','ΛLLY SIDE':'アリー サイド — ファン向けページ','ΛLLY HOME':'アリー ホーム','ΛLLY LOUNGE':'アリー ラウンジ — ファンの交流掲示板','ΛLLY LOGIN':'アリー ログイン','PHOTO':'フォト — 写真','BACKSTAGE':'バックステージ — 舞台裏','BACK STAGE':'バックステージ — 舞台裏','LIVE ARCHIVE':'ライブ アーカイブ — 過去配信','TOP':'トップページ','MENU':'メニュー',
'DANCE PERFORMANCE TEAM / SINCE 2024':'ダンスパフォーマンスチーム／2024年始動','SAME DREAM. DIFFERENT VIBES.':'同じ夢。違うバイブス（持ち味）。','DANCE / TRAINING / TALK / AND YOU.':'踊る／鍛える／喋る／そして、あなた。','WHO IS VΛNT?':'ヴァントとは？','THREE VIBES. ONE CREW.':'三つの個性、ひとつのチーム。','THREE WAYS TO MEET.':'会い方は三通り。','SCHEDULE & NEWS':'日程とお知らせ','ORIGINAL MUSIC':'オリジナル音楽','WEAR THE MOVEMENT.':'この動きを、着る。','MEET THE 3 MEMBERS →':'3人のメンバーを見る','NEXT: SEE THEM LIVE →':'次はライブを見る','VIEW SHOP →':'ショップを見る','ENTER ΛLLY SIDE →':'アリーサイドへ入る','VIEW PROFILE →':'プロフィールを見る','VIEW ALL SCHEDULE →':'スケジュールをすべて見る','VIEW ALL NEWS →':'ニュースをすべて見る','COMING SOON.':'近日公開','WE ARE VΛNT.':'私たちがヴァント。','VΛNT × ΛLLY':'ヴァント × アリー','ZATAGRAM ↗':'ゼタグラム（SNS）','YOUTUBE ↗':'ユーチューブ',
'MEMBERS':'人数','YEARS':'活動年数','TOTAL FOLLOWERS':'総フォロワー数','DOMINANCE':'ドミナンス — 支配力・圧','GENTLEMAN':'ジェントルマン — 紳士','IMPACT':'インパクト — 衝撃力','LEADER / VOCAL':'リーダー／ボーカル','ALL ROUNDER / VOCAL':'オールラウンダー／ボーカル','PHYSICAL / BREAK':'フィジカル（身体能力）／ブレイク','KRUMP / HIPHOP':'クランプ／ヒップホップ','ALL GENRE / POP':'全ジャンル／ポップ','BREAK / ACROBAT / HIPHOP':'ブレイク／アクロバット／ヒップホップ','01 / SILVER':'01／担当色 シルバー','02 / BLUE':'02／担当色 ブルー','03 / RED':'03／担当色 レッド',
'HEIGHT':'身長','ROLE':'担当','STYLE':'ダンススタイル','COLOR':'担当色','BIRTHDAY':'誕生日','BLOOD TYPE':'血液型','FROM':'出身','SILVER':'シルバー','BLUE':'ブルー','RED':'レッド',
'ALL':'すべて','HOT':'注目','DANCE':'ダンス','TRAINING':'トレーニング — 鍛える','TALK':'トーク — 雑談','EVENT':'イベント','TOPIC':'話題','WELCOME':'初心者歓迎','INFO':'インフォメーション — 案内','SOCIAL':'SNS','ONLINE LIVE':'オンラインライブ','FAN MEETING':'ファンミーティング','FREE LIVE':'フリーライブ — 無料配信','STREET SHOW':'ストリートショー — 路上ショー','PERFORMANCE':'パフォーマンス','ENTERTAINMENT':'エンターテインメント','OFFICIAL GOODS':'公式グッズ','OFFICIAL FAN COMMUNITY':'公式ファンコミュニティ','MEMBERS ONLY':'会員限定','ΛLLY ONLY':'アリー会員限定','NOW IN LOUNGE':'ラウンジの最新','APPAREL':'アパレル — 衣類','GOODS':'グッズ — 雑貨','ACCESSORY':'アクセサリー','PASSWORD':'パスワード','ΛLLY ID / MAIL':'アリーID／メールアドレス',
'STAGE LIVE':'ステージライブ — 会場公演','POSTER / DOWNLOAD':'ポスター配布 — ダウンロード','VERTICAL POSTER':'縦長ポスター','HORIZONTAL KEY VISUAL':'横長キービジュアル','DOWNLOAD (PNG) ↓':'PNG をダウンロード','VENUE':'会場','DOORS / START':'開場／開演','TICKET':'チケット','MORE FROM VΛNT FEED':'VΛNT FEED の他の投稿','WHAT IT IS':'内容','NEXT DATES':'次回日程','WATCH ON ZATAGRAM ↗':'ゼタグラムで見る','JOIN THE LIVE →':'ライブに参加する','BACK TO VΛNT FEED →':'VΛNT FEED に戻る','BACK TO LIVE →':'LIVE に戻る','SEE THE SCHEDULE →':'スケジュールを見る','HOW TO JOIN':'参加方法','DURATION':'所要時間','WHERE':'配信・会場'};
const JA_NAV={'ABOUT':'紹介','MEMBER':'メンバー','VΛNT FEED':'動画','LIVE':'ライブ','SCHEDULE':'日程','NEWS':'お知らせ','NEXT MOVE':'次の展開','SHOP':'物販','ΛLLY SIDE':'ファン向け','MENU':'メニュー'};
const JA_NORM=t=>(t||'').replace(/\s+/g,' ').trim().toUpperCase();
const JA_DICT={},JA_NAV_DICT={};
for(const k in JA)JA_DICT[JA_NORM(k)]=JA[k];
for(const k in JA_NAV)JA_NAV_DICT[JA_NORM(k)]=JA_NAV[k];
function applyJa(root){
  root.querySelectorAll('a,button,h1,h2,h3,span,b,strong,em,i,small,p,label,dt,dd').forEach(el=>{
    if(el.closest('.ticker')||el.hasAttribute('data-ja'))return;
    if(el.classList.contains('nav-en')||el.classList.contains('nav-ja'))return;
    if([...el.children].some(c=>c.tagName!=='BR'&&!c.classList.contains('ext')))return;
    const raw=[...el.childNodes].map(n=>n.nodeName==='BR'?' ':(n.nodeType===1&&n.classList.contains('ext')?'':(n.textContent||''))).join('');
    const inNav=!!(el.closest('.header')&&el.closest('nav'));
    if(inNav){
      const ja=JA_NAV_DICT[JA_NORM(raw)];
      if(!ja||el.querySelector('.nav-en'))return;
      el.innerHTML='<span class="nav-en"></span><span class="nav-ja"></span>';
      el.querySelector('.nav-en').textContent=raw.trim();
      el.querySelector('.nav-ja').textContent=ja;
      return;
    }
    const ja=JA_DICT[JA_NORM(raw)];
    if(ja)el.setAttribute('data-ja',ja);
  });
}
(()=>{
  applyJa(document);
  const t=document.querySelector('.ja-toggle');if(!t)return;
  const set=on=>{document.body.classList.toggle('ja-on',on);t.setAttribute('aria-pressed',String(on));try{localStorage.setItem('vant-ja',on?'1':'0')}catch(e){}};
  let saved=null;try{saved=localStorage.getItem('vant-ja')}catch(e){}
  set(saved!=='0');
  t.addEventListener('click',()=>set(t.getAttribute('aria-pressed')!=='true'));
})();

(function(){
  const wrap=document.querySelector('[data-filter-target]');if(!wrap)return;
  const chips=[...document.querySelectorAll('.chips .chip')];
  const cards=[...wrap.querySelectorAll('[data-cat]')];
  chips.forEach(chip=>{
    chip.setAttribute('role','button');chip.tabIndex=0;
    const run=()=>{
      const key=(chip.dataset.filter||chip.textContent).trim();
      chips.forEach(c=>c.classList.toggle('on',c===chip));
      cards.forEach(c=>{c.style.display=(key==='ALL'||c.dataset.cat===key)?'':'none';});
    };
    chip.addEventListener('click',run);
    chip.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();run();}});
  });
})();

(function(){
  const sel='.media-grid .media img, main figure img, .weekly__fig img';
  const skip=im=>im.closest('.ally-concept')||im.closest('.bpost__hero--locked');
  const imgs=[...document.querySelectorAll(sel)];
  if(!imgs.length) return;
  const box=document.createElement('div');
  box.className='zoom';box.setAttribute('aria-hidden','true');
  box.innerHTML='<button class="zoom__close" aria-label="閉じる">×</button><img alt="">';
  document.body.appendChild(box);
  const pic=box.querySelector('img');
  const close=()=>{box.classList.remove('on');box.setAttribute('aria-hidden','true');document.body.classList.remove('locked')};
  box.addEventListener('click',close);
  box.querySelector('.zoom__close').addEventListener('click',close);
  addEventListener('keydown',e=>{if(e.key==='Escape')close()});
  imgs.forEach(im=>{
    if(im.closest('a')||skip(im)) return;
    const fig=im.closest('.media');
    if(fig){
      fig.style.cursor='zoom-in';
      fig.setAttribute('tabindex','0');
      fig.setAttribute('role','button');
      const openFig=()=>{pic.src=im.currentSrc||im.src;pic.alt=im.alt||'';box.classList.add('on');box.setAttribute('aria-hidden','false');document.body.classList.add('locked')};
      fig.addEventListener('click',openFig);
      fig.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openFig()}});
      im.removeAttribute('tabindex');
      return;
    }
    im.style.cursor='zoom-in';
    im.setAttribute('tabindex','0');
    im.setAttribute('role','button');
    const open=()=>{pic.src=im.currentSrc||im.src;pic.alt=im.alt||'';box.classList.add('on');box.setAttribute('aria-hidden','false');document.body.classList.add('locked')};
    im.addEventListener('click',open);
    im.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open()}});
  });
})();

(function(){
  const form=document.querySelector('.thread__reply');if(!form)return;
  const row=document.createElement('div');row.className='attach';
  row.innerHTML='<label class="attach__btn" for="reply-img">＋ ATTACH IMAGE</label><input id="reply-img" type="file" accept="image/*" multiple hidden><small>画像は端末内でプレビューされるだけで、送信はされません（ダミー）。</small><div class="attach__list"></div>';
  form.insertBefore(row, form.querySelector('button'));
  const list=row.querySelector('.attach__list');
  const input=row.querySelector('input');
  input.addEventListener('change',e=>{
    list.innerHTML='';
    [...e.target.files].slice(0,4).forEach(f=>{
      const fig=document.createElement('figure');
      const im=document.createElement('img');im.alt=f.name;im.src=URL.createObjectURL(f);
      const cap=document.createElement('figcaption');cap.textContent=f.name;
      const del=document.createElement('button');del.type='button';del.className='attach__del';del.setAttribute('aria-label',f.name+' を削除');del.textContent='×';del.style.cssText='position:absolute;top:4px;right:4px;width:16px;height:16px;min-height:0;min-width:0;padding:0;margin:0;display:flex;align-items:center;justify-content:center;border-radius:50%;background:rgba(9,10,12,.78);border:1px solid rgba(255,255,255,.5);color:#f4f4f2;font-size:9px;line-height:1;cursor:pointer;opacity:0;transition:opacity .18s';const touch=!matchMedia('(hover:hover)').matches;if(touch){del.style.opacity='1';del.style.width='44px';del.style.height='44px';del.style.fontSize='20px';del.style.top='0';del.style.right='0';del.style.borderRadius='0 0 0 4px';fig.style.width='128px';im.style.width='128px';im.style.height='128px'}else{fig.addEventListener('pointerenter',()=>del.style.opacity='1');fig.addEventListener('pointerleave',()=>del.style.opacity='0')}del.addEventListener('focus',()=>del.style.opacity='1');del.addEventListener('blur',()=>del.style.opacity='0');
      del.addEventListener('click',()=>{URL.revokeObjectURL(im.src);fig.remove();if(!list.children.length)input.value=''});
      fig.append(im,del,cap);list.appendChild(fig);
    });
  });
  if(window.applyJa)applyJa(row);
})();

(function(){
  const likes=[...document.querySelectorAll('.thread__like')];
  if(!likes.length)return;
  likes.forEach((el,i)=>{
    const base=parseInt((el.textContent.match(/\d+/)||[0])[0],10);
    el.setAttribute('role','button');el.tabIndex=0;
    const key='vant-like-'+location.pathname+'-'+i;
    let on=localStorage.getItem(key)==='1';
    const paint=()=>{el.textContent='♡ '+(base+(on?1:0));el.classList.toggle('on',on);el.setAttribute('aria-pressed',on?'true':'false')};
    const toggle=()=>{on=!on;on?localStorage.setItem(key,'1'):localStorage.removeItem(key);paint()};
    el.addEventListener('click',toggle);
    el.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle()}});
    paint();
  });
})();

(function(){
  const list=document.querySelector('[data-arch-list]'),pager=document.querySelector('[data-arch-pager]');
  if(!list||!pager)return;
  const per=+list.dataset.perPage||4,cards=[...list.children],btns=[...pager.querySelectorAll('button')];
  function show(p){
    cards.forEach((c,i)=>{c.style.display=(i>=(p-1)*per&&i<p*per)?'':'none'});
    btns.forEach(b=>{const on=+b.dataset.page===p;b.setAttribute('aria-current',on?'true':'false')});
  }
  btns.forEach(b=>b.addEventListener('click',()=>{show(+b.dataset.page);list.scrollIntoView?null:null;window.scrollTo({top:list.getBoundingClientRect().top+window.scrollY-100,behavior:'smooth'})}));
  show(1);
})();


/* ---- SHOP カート（ダミー / localStorage 保存） ---- */
(function(){
  const KEY='vant-cart';
  const list=()=>window.PRODUCTS||[];
  const byId=id=>list().find(p=>p.id===id);
  const yen=n=>'¥'+Number(n).toLocaleString('ja-JP');
  const SEED=[{id:'app1',size:'L',qty:1},{id:'app3',size:'M',qty:2},{id:'acc5',size:'',qty:1}];
  function read(){try{const v=JSON.parse(localStorage.getItem(KEY));return Array.isArray(v)?v:null;}catch(e){return null;}}
  function get(){let c=read();if(!c){c=SEED.filter(i=>byId(i.id));write(c);}return c.filter(i=>byId(i.id));}
  function write(c){localStorage.setItem(KEY,JSON.stringify(c));paintCount();}
  function add(id,size,variant){
    const p=byId(id); if(!p) return;
    const c=get(), key=size||'', vk=variant||'';
    const hit=c.find(i=>i.id===id&&(i.size||'')===key&&(i.variant||'')===vk);
    if(hit) hit.qty++; else c.push({id:id,size:key,variant:vk,qty:1});
    write(c); renderCart();
  }
  function paintCount(){
    const n=(read()||[]).reduce((s,i)=>s+i.qty,0);
    document.querySelectorAll('[data-cart-count]').forEach(el=>{el.textContent=n;});
  }

  /* SHOP 一覧の ADD TO CART */
  document.addEventListener('click',e=>{
    const a=e.target.closest('[data-add]');
    if(!a) return;
    e.preventDefault(); e.stopPropagation();
    const id=a.getAttribute('data-add'), p=byId(id);
    const needsPick=p&&((Array.isArray(p.variants)&&p.variants.length>1)||(Array.isArray(p.sizes)&&p.sizes.length>1));
    if(needsPick){
      location.href='product.html?id='+id; return;
    }
    add(id,'');
    const t=a.textContent; a.textContent='✓ ADDED';
    setTimeout(()=>{a.textContent=t;},1200);
  });

  /* 商品詳細 */
  function renderProduct(){
    const host=document.querySelector('[data-p="add"]'); if(!host) return;
    const id=new URLSearchParams(location.search).get('id')||'app1';
    const p=byId(id)||byId('app1'); if(!p) return;
    const set=(k,v)=>document.querySelectorAll('[data-p="'+k+'"]').forEach(el=>{el.textContent=v;el.removeAttribute('data-ja');});
    set('cat',p.cat); set('head',p.name.replace(/\s*\/\s*(BLACK|WHITE|SILVER)$/,''));
    set('name',p.name); set('desc',p.desc); set('lead',p.lead);
    set('price',yen(p.price)); set('size',p.size); set('color',p.color);
    set('mat',p.mat); set('ship',p.ship);
    document.querySelectorAll('[data-p="color"]').forEach(el=>{
      const row=el.closest('div'); if(row) row.hidden=!p.color;
    });
    const img=document.querySelector('[data-p="img"]');
    if(img){img.src=p.img; img.alt=p.name;}
    document.title=p.name+' | SHOP';
    let size='', variant='';
    function group(sel,opts,onPick){
      const box=document.querySelector('[data-p="'+sel+'"]');
      const wrap=document.querySelector('[data-p="'+(sel==='sizes'?'size-group':'variant-group')+'"]');
      if(!box) return '';
      if(!opts||opts.length<2){box.innerHTML=''; if(wrap) wrap.hidden=true; return '';}
      if(wrap) wrap.hidden=false;
      box.innerHTML=opts.map((o,n)=>'<span class="chip'+(n===0?' on':'')+'" role="button" tabindex="0">'+o+'</span>').join('');
      box.addEventListener('click',e=>{
        const c=e.target.closest('.chip'); if(!c) return;
        box.querySelectorAll('.chip').forEach(x=>x.classList.remove('on'));
        c.classList.add('on'); onPick(c.textContent);
      });
      return opts[0];
    }
    size=group('sizes',Array.isArray(p.sizes)?p.sizes:[],v=>{size=v;});
    const vl=document.querySelector('[data-p="variant-label"]');
    if(vl&&p.variantLabel) vl.textContent=p.variantLabel;
    variant=group('variants',Array.isArray(p.variants)?p.variants:[],v=>{variant=v;});
    host.addEventListener('click',()=>{
      add(p.id,size,variant);
      const t=host.textContent; host.textContent='✓ カートに追加しました';
      setTimeout(()=>{host.textContent=t;},1400);
    });
    if(typeof applyJa==='function') applyJa(document.body);
  }

  /* カート */
  function renderCart(){
    const box=document.querySelector('[data-cart-rows]'); if(!box) return;
    const c=get();
    if(!c.length){
      box.innerHTML='<p class="cart__empty">カートに商品がありません。<a href="shop.html">SHOP で商品を見る →</a></p>';
    }else{
      box.innerHTML=c.map((it,n)=>{
        const p=byId(it.id);
        const col=(p.color&&!/TYPES?$/.test(p.color))?p.color:'';
        const meta=[it.size?'SIZE: '+it.size:'',it.variant?'TYPE: '+it.variant:'',(!it.variant&&col)?'COLOR: '+col:''].filter(Boolean).join(' / ')||p.mat;
        return '<div class="cart__row">'+
          '<div class="cart__ph"><img src="'+p.img+'" alt="" width="800" height="800" loading="lazy" decoding="async"></div>'+
          '<div class="cart__info"><span>'+p.cat+'</span><b>'+p.name+'</b><small>'+meta+'</small></div>'+
          '<div class="cart__qty"><span>QTY</span><div class="qty"><button type="button" data-q="-1" data-i="'+n+'" aria-label="数量を減らす">−</button><b>'+it.qty+'</b><button type="button" data-q="1" data-i="'+n+'" aria-label="数量を増やす">＋</button></div></div>'+
          '<div class="cart__price">'+yen(p.price*it.qty)+'<button type="button" class="cart__del" data-del="'+n+'">削除</button></div>'+
        '</div>';
      }).join('');
    }
    paintTotals();
    paintCount();
    if(typeof applyJa==='function') applyJa(box);
  }

  function paintTotals(){
    const c=get();
    const sub=c.reduce((s,it)=>s+byId(it.id).price*it.qty,0);
    const ship=c.length?800:0;
    const put=(k,v)=>document.querySelectorAll('[data-cart-'+k+']').forEach(el=>{el.textContent=yen(v);});
    put('sub',sub); put('ship',ship); put('total',sub+ship);
  }

  /* 注文手続きのご注文内容 */
  function renderOrder(){
    const box=document.querySelector('[data-order-items]'); if(!box) return;
    const c=get();
    box.innerHTML=c.length?c.map(it=>{
      const p=byId(it.id);
      const col=(p.color&&!/TYPES?$/.test(p.color))?p.color:'';
      const spec=[it.size?'SIZE '+it.size:'',it.variant||'',(!it.size&&!it.variant)?(col||p.mat):''].filter(Boolean).join(' / ')+' × '+it.qty;
      return '<div><b>'+p.name+'</b><small>'+spec+'</small><i>'+yen(p.price*it.qty)+'</i></div>';
    }).join(''):'<div><b>カートに商品がありません</b><small>SHOP で商品を選んでください</small><i>¥0</i></div>';
    paintTotals();
    if(typeof applyJa==='function') applyJa(box);
  }
  document.addEventListener('click',e=>{
    const q=e.target.closest('[data-q]'), d=e.target.closest('[data-del]');
    if(!q&&!d) return;
    const c=get();
    if(q){const i=+q.dataset.i; c[i].qty=Math.max(1,c[i].qty+ +q.dataset.q);}
    else{c.splice(+d.dataset.del,1);}
    write(c); renderCart();
  });

  paintCount(); renderProduct(); renderCart(); renderOrder();
})();


/* ---- POST: 限定投稿のポップアップ / コメントのハート ---- */
(function(){
  const dlg=document.getElementById('lock-dlg');
  if(dlg){
    document.addEventListener('click',e=>{
      const a=e.target.closest('[data-locked]');
      if(!a) return;
      e.preventDefault();
      if(typeof dlg.showModal==='function') dlg.showModal(); else location.href='login.html';
    });
    const close=()=>dlg.close();
    dlg.querySelector('.dialog-close')?.addEventListener('click',close);
    dlg.querySelector('[data-lock-close]')?.addEventListener('click',close);
    dlg.addEventListener('click',e=>{if(e.target===dlg)close();});
  }
  document.addEventListener('click',e=>{
    const b=e.target.closest('.cmt__like'); if(!b) return;
    const on=b.getAttribute('aria-pressed')==='true';
    const num=b.querySelector('span');
    const n=parseInt(num.textContent,10)||0;
    b.setAttribute('aria-pressed',String(!on));
    num.textContent=on?n-1:n+1;
  });
})();
