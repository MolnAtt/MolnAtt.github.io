'use strict';

// Minden értéket a legkisebb lépés egész számú többszöröseként tárolunk.
// Csak az SVG pixelkoordinátáihoz használunk lebegőpontos számokat.
function rangeModel(n, p) {
  if (!Number.isInteger(n) || n < 8 || n > 64 || !Number.isInteger(p) || p < 1 || p > n)
    throw new Error('A bitszám 8–64, a pont helye 1 és a bitszám közötti egész szám lehet.');
  const half = 1n << BigInt(n - 1);
  return { n, p, f: n - p, min: -half, max: half - 1n, count: 2n * half };
}
function decimal(k, f) {
  const negative = k < 0n;
  const digits = ((negative ? -k : k) * 5n ** BigInt(f)).toString().padStart(f + 1, '0');
  if (!f) return (negative ? '−' : '') + digits;
  const tail = digits.slice(-f).replace(/0+$/, '');
  return (negative ? '−' : '') + digits.slice(0, -f) + (tail ? ',' + tail : '');
}
function grouped(k) { return k.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '\u202f'); }
const clamp = (x, min, max) => x < min ? min : x > max ? max : x;
const abs = x => x < 0n ? -x : x;
// A nézet független a választott számformátumtól: 2^-80 egységek.
// Így a bitmélység megváltoztatása nem változtatja meg a léptéket.
const VIEW_F = 80;
const MIN_SPAN = 2n;
const MAX_SPAN = 1n << BigInt(VIEW_F + 70);
const unit = model => 1n << BigInt(VIEW_F - model.f);
const fullSpan = model => 1n << BigInt(VIEW_F + model.p);
function windowAt(focus, span) {
  span = clamp(span, MIN_SPAN, MAX_SPAN);
  return {lo:focus-span/2n, hi:focus+span/2n};
}
function floorDiv(x, y) { return x >= 0n ? x / y : (x - y + 1n) / y; }
function visibleGrid(model, lo, hi) {
  const u = unit(model);
  const first = model.min > -floorDiv(-lo,u) ? model.min : -floorDiv(-lo,u);
  const last = model.max < floorDiv(hi,u) ? model.max : floorDiv(hi,u);
  return {first,last,u,count:last>=first?last-first+1n:0n};
}
function nearestGrid(model, coordinate) {
  const u=unit(model);
  const k=floorDiv(coordinate+u/2n,u);
  return clamp(k,model.min,model.max);
}
function parseTarget(raw, model) {
  const s = raw.trim().replace(/−/g, '-').replace(',', '.');
  if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(s) || s.length > 256)
    throw new Error('Adj meg egy decimális számot, például −24,1.');
  const negative = s.startsWith('-');
  const [whole, frac = ''] = s.replace(/^[+-]/, '').split('.');
  const denominator = 10n ** BigInt(frac.length);
  const numerator = BigInt((whole || '0') + frac) * (negative ? -1n : 1n);
  const scaled = numerator * (1n << BigInt(model.f));
  if (scaled < model.min * denominator || scaled > model.max * denominator)
    throw new Error('Ez az érték kívül esik az ábrázolható tartományon.');
  // Legközelebbi rácspont; felezőpontban a nullától távolodva.
  const a = abs(scaled);
  const k = (a / denominator + (2n * (a % denominator) >= denominator ? 1n : 0n)) * (negative ? -1n : 1n);
  return { k, exact: scaled === k * denominator };
}
if (typeof module !== 'undefined') module.exports = {rangeModel, decimal, windowAt, visibleGrid, parseTarget, unit, fullSpan, nearestGrid, VIEW_F};

if (typeof document !== 'undefined') {
  const $ = id => document.getElementById(id);
  const svg = $('number-line'), plot = $('range-plot');
  const nInput = $('range-bits'), pInput = $('range-point');
  let model = rangeModel(16, 12), focus = 0n, span = fullSpan(model);
  let view = windowAt(focus, span);
  const fmt = k => decimal(k, model.f);
  const NS = 'http://www.w3.org/2000/svg';
  function node(parent, tag, text, cls) {
    const el = document.createElement(tag);
    if (text !== undefined) el.textContent = text;
    if (cls) el.className = cls;
    parent.append(el); return el;
  }
  function S(parent, tag, attrs = {}, text) {
    const el = document.createElementNS(NS, tag);
    for (const [key,value] of Object.entries(attrs)) el.setAttribute(key, String(value));
    if (text !== undefined) el.textContent = text;
    parent.append(el); return el;
  }
  function power(parent, exp, neg = false) {
    parent.append(document.createTextNode((neg ? '−' : '') + '2'));
    node(parent, 'sup', String(exp).replace('-', '−'));
  }
  function bitString(k) {
    const raw = (k < 0n ? k + model.count : k).toString(2).padStart(model.n, '0');
    return raw.slice(0, model.p) + (model.f ? ',' + raw.slice(model.p) : '');
  }
  function bits(parent, raw) {
    parent.replaceChildren();
    raw = raw.replace(',', '');
    [...raw].forEach((b,i) => {
      if (i === model.p) node(parent,'span',',','point');
      const cell = node(parent,'div',undefined,'bit' + (i === 0 ? ' sign' : i >= model.p ? ' fraction' : ''));
      node(cell,'span',b,'digit');
      power(node(cell,'span',undefined,'weight'), model.p - i - 1, i === 0);
    });
    if (!model.f) node(parent,'span',',','point');
  }
  function calculations() {
    $('range-question').textContent = `${model.n} biten ábrázolunk törtszámokat úgy, hogy a ${model.p}. bit után van a kettedespont. Mi a legkisebb és a legnagyobb ábrázolható szám, és mekkora két szomszédos ábrázolható szám távolsága?`;
    $('range-format').textContent = `${model.p} egész bit · ${model.f} törtbit`;
    bits($('range-bits-view'), 'b'.repeat(model.n));
    $('axis-min').textContent = fmt(model.min);
    $('axis-max').textContent = fmt(model.max);
    const result = $('range-results'); result.replaceChildren();
    for (const [label,k,cls] of [['Legkisebb szám',model.min,'min'],['Legnagyobb szám',model.max,'max'],['Felbontás (Δ)',1n,'delta']]) {
      const card = node(result,'div',undefined,'range-stat '+cls);
      node(card,'small',label); node(card,'strong',fmt(k)); node(card,'code',bitString(k));
    }
    const c = $('range-calculations'); c.replaceChildren();
    const a = node(c,'section',undefined,'step');
    node(a,'h2','1. Legkisebb ábrázolható szám');
    node(a,'p','Az első bit helyiértéke negatív. Ha ez 1, és az összes többi bit 0, akkor kapjuk a legkisebb számot.');
    bits(node(a,'div',undefined,'bits range-bits range-calculation-bits'),bitString(model.min));
    let eq = node(a,'p',undefined,'range-formula'); power(eq,model.p-1,true); eq.append(' = '+fmt(model.min));
    const b = node(c,'section',undefined,'step');
    node(b,'h2','2. Legnagyobb ábrázolható szám');
    node(b,'p','Az első bit 0, a többi bit 1. Így minden pozitív helyiértéket összeadunk.');
    bits(node(b,'div',undefined,'bits range-bits range-calculation-bits'),bitString(model.max));
    eq = node(b,'p',undefined,'range-formula'); power(eq,model.p-1); eq.append(' − '); power(eq,-model.f); eq.append(' = '+fmt(model.max));
    const d = node(c,'section',undefined,'step');
    node(d,'h2','3. Két szomszédos szám távolsága');
    node(d,'p','A legkisebb pozitív helyiérték az utolsó bithez tartozik. Ennyivel változik az érték két egymást követő ábrázolható szám között.');
    bits(node(d,'div',undefined,'bits range-bits range-calculation-bits'),bitString(1n));
    eq = node(d,'p',undefined,'range-formula'); eq.append('Δ = '); power(eq,-model.f); eq.append(' = '+fmt(1n));
    const total = node(c,'div',undefined,'range-total');
    node(total,'strong','Hány különböző szám ábrázolható?');
    eq = node(total,'p',undefined,'range-formula'); power(eq,model.n); eq.append(' = '+grouped(model.count));
    node(total,'p','Mindegyik bitsorozat egyetlen különböző számot kódol. A pont helye a tartományt és a felbontást változtatja meg, nem a számok darabszámát.','hint');
  }
  function plotRender() {
    const {lo,hi} = view;
    const {first,last,u,count} = visibleGrid(model,lo,hi);
    const width = Math.max(680, Math.floor(plot.clientWidth || 900));
    const left = 36, right = width-36, axisWidth = right-left;
    const y = 100;
    const x = coordinate => left+Number(coordinate-lo)/Number(hi-lo)*axisWidth;
    const gx = k => x(k*u);
    const spacing = Number(u)/Number(hi-lo)*axisWidth;
    const vf = k => decimal(k,VIEW_F);
    svg.replaceChildren();
    svg.setAttribute('width',width);
    // A számegyenes az ábrázolható tartományon kívül is folytatódik.
    S(svg,'title',{},`Látható értékek: ${vf(lo)} – ${vf(hi)}. ${grouped(count)} ábrázolható szám.`);
    const marks = S(svg,'g',{'aria-label':'Az összes látható ábrázolható érték', 'data-count':count.toString()});
    if(count && spacing < 1 && count > 1n) {
      // Egy pixel vastag, egymásra fedő függőleges vonalak uniója.
      // Nem mintavétel: az egész rács egyetlen tömör alakzattá olvad.
      const a=gx(first), b=gx(last);
      S(marks,'rect',{x:a-.5,y:y-14,width:b-a+1,height:28,class:'grid-saturated'});
      marks.dataset.mode='overlap';
    } else if(count) {
      // Legalább egy pixelre vannak egymástól: minden vonal külön SVG-elem.
      // A darabszám ilyenkor a nézet szélességével korlátos.
      for(let k=first;k<=last;k++) {
        const px=gx(k);
        const line=S(marks,'line',{x1:px,y1:y-14,x2:px,y2:y+14,class:'axis-tick','data-value':fmt(k)});
        S(line,'title',{},fmt(k));
      }
      marks.dataset.mode='individual';
    }
    S(svg,'line',{x1:left-12,y1:y,x2:right+12,y2:y,class:'axis'});
    S(svg,'path',{d:`M ${left-12} ${y} l 8 -4 M ${left-12} ${y} l 8 4 M ${right+12} ${y} l -8 -4 M ${right+12} ${y} l -8 4`,class:'axis-arrow'});
    // A három kitüntetett érték külön sorban feliratozva, sosem körrel.
    const specials=[[model.min,'min','MIN',25],[0n,'zero','NULLA',48],[model.max,'max','MAX',71]];
    const specialSet=new Set();
    for(const [k,kind,name,ty] of specials) {
      if(k*u<lo || k*u>hi) continue;
      specialSet.add(k);
      const px=gx(k), g=S(svg,'g',{class:`tick-hit tick-special tick-${kind}`,role:'button',tabindex:0,'aria-label':`${name}: ${fmt(k)}`});
      S(g,'line',{x1:px,y1:y-21,x2:px,y2:y+21,class:'axis-tick'});
      const label=`${name}: ${fmt(k)}`;
      const half=Math.min(width/2-8,label.length*3.8+5);
      const lx=Math.max(half+6,Math.min(width-half-6,px));
      S(g,'path',{d:`M ${px} ${y-23} L ${px} ${ty+5} L ${lx} ${ty+5}`,class:'special-guide'});
      S(g,'text',{x:lx,y:ty,'text-anchor':'middle',class:'axis-special'},label);
      S(g,'title',{},`${fmt(k)} (${bitString(k)})`);
      g.addEventListener('click',()=>select(k));
      g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();select(k);plot.focus({preventScroll:true});}});
    }
    // Ha kevés érték látszik, mindegyiket pontosan feliratozzuk.
    // Sűrű nézetben csak a feliratok ritkulnak, a vonalak nem.
    const labels=[];
    if(count<=12n) {
      for(let k=first;k<=last;k++) if(!specialSet.has(k)) labels.push(k);
    } else {
      const maxLen=Math.max(fmt(first).length,fmt(last).length,4);
      const desired=Math.max(2,Math.floor(axisWidth/(maxLen*7.5+24)));
      let step=1n;
      while(step*BigInt(desired)<count) step*=2n;
      for(let k=-floorDiv(-first,step)*step;k<=last;k+=step) if(!specialSet.has(k)) labels.push(k);
    }
    const laneEnds=[];
    for(const k of labels) {
      const px=gx(k), label=fmt(k), half=Math.min(width/2-8,label.length*3.8+6);
      const lx=Math.max(half+6,Math.min(width-half-6,px));
      let lane=laneEnds.findIndex(end=>end<lx-half-5);
      if(lane<0) lane=laneEnds.length;
      laneEnds[lane]=lx+half;
      const ty=y+42+lane*23;
      const g=S(svg,'g',{class:'tick-hit',role:'button',tabindex:0,'aria-label':`${label} – nagyítási középpont`});
      S(g,'path',{d:`M ${px} ${y+15} L ${px} ${ty-12} L ${lx} ${ty-12}`,class:'label-guide'});
      S(g,'text',{x:lx,y:ty,'text-anchor':'middle',class:'axis-label'},label);
      S(g,'title',{},`${label} (${bitString(k)})`);
      g.addEventListener('click',()=>select(k));
      g.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();select(k);plot.focus({preventScroll:true});}});
    }
    // Kattintás vagy rámutatás: a legközelebbi tényleges rácspont pontos értéke.
    const hit=S(svg,'rect',{x:left-3,y:y-15,width:axisWidth+6,height:30,fill:'transparent',class:'axis-hit'});
    const cursor=S(svg,'line',{x1:x(focus),y1:y-25,x2:x(focus),y2:y+25,class:'focus-marker','pointer-events':'none'});
    function pick(e) {
      const rect=svg.getBoundingClientRect();
      const px=(e.clientX-rect.left)*width/rect.width;
      const ratio=Math.max(0,Math.min(1,(px-left)/axisWidth));
      const coordinate=lo+(hi-lo)*BigInt(Math.round(ratio*1000000000))/1000000000n;
      if(!count) return null;
      return clamp(nearestGrid(model,coordinate),first,last);
    }
    hit.addEventListener('pointermove',e=>{
      const k=pick(e); if(k===null)return;
      const px=gx(k); cursor.setAttribute('x1',px);cursor.setAttribute('x2',px);
      $('hover-value').textContent=fmt(k)+' · '+bitString(k);
    });
    hit.addEventListener('pointerleave',()=>{
      cursor.setAttribute('x1',x(focus));cursor.setAttribute('x2',x(focus));
      $('hover-value').textContent='Mutass a számegyenesre egy pontos érték kiolvasásához.';
    });
    hit.addEventListener('click',e=>{const k=pick(e);if(k!==null)select(k);});
    const bottom=y+42+Math.max(1,laneEnds.length)*23;
    S(svg,'text',{x:left,y:bottom+8,class:'plot-caption'},count===0n?'Ebben a nézetben nincs ábrázolható szám.':spacing<1&&count>1n?'Az egymásra fedő vonalak sűrű sávot alkotnak.':'Minden látható értékhez külön függőleges vonal tartozik.');
    const height=bottom+24;
    svg.setAttribute('height',height); svg.setAttribute('viewBox',`0 0 ${width} ${height}`);
    $('visible-range').textContent=vf(lo)+' … '+vf(hi);
    $('zoom-center').textContent=vf(focus);
    $('visible-count').textContent=grouped(count)+' db';
    $('axis-span').textContent=vf(span);
    $('hover-value').textContent='Mutass a számegyenesre egy pontos érték kiolvasásához.';
    const allLabels=BigInt(labels.length+specialSet.size)===count;
    $('plot-note').textContent=count===0n?'A számegyenes ezen részén nincs ábrázolható érték. Kicsinyíts vagy mozdulj el.':
      `${grouped(count)} látható ábrázolható szám, mindegyik jelölve. A szomszédos vonalak távolsága: ${fmt(1n)}. `+
      (spacing<1&&count>1n?'A vonalak egy képpontnál közelebb vannak, ezért összefolynak. ':'')+
      (allLabels?'Minden érték feliratozva.':'A feliratok az olvashatóság miatt ritkábbak; nagyíts tovább a részletekért.');
    const level=fullSpan(model).toString(2).length-span.toString(2).length;
    const sup=String(level).replace(/-/g,'⁻').replace(/\d/g,d=>'⁰¹²³⁴⁵⁶⁷⁸⁹'[Number(d)]);
    $('zoom-level').textContent=level===0?'Teljes lépték':`Nagyítás: 2${sup}×`;
    $('zoom-in').disabled=span<=MIN_SPAN; $('zoom-out').disabled=span>=MAX_SPAN;
    for(const [id,k] of [['go-min',model.min],['go-zero',0n],['go-max',model.max]]) $(id).setAttribute('aria-pressed',String(focus===k*u));
  }
  function updateView() { view=windowAt(focus,span); plotRender(); }
  function select(k) { focus=k*unit(model); updateView(); }
  function zoom(direction) {
    span=clamp(direction>0?span/2n:span*2n,MIN_SPAN,MAX_SPAN); updateView();
  }
  function pan(direction) { focus+=BigInt(direction)*span/2n; updateView(); }
  function reset() { focus=0n; span=fullSpan(model); updateView(); }
  function neighbors() { span=8n*unit(model); updateView(); }
  function settings() {
    const n=nInput.valueAsNumber;
    const err=$('range-error');
    if(!Number.isInteger(n)||n<8||n>64){err.textContent='A bitszám 8 és 64 közötti egész szám legyen.';err.hidden=false;return;}
    pInput.max=String(n);
    let p=pInput.valueAsNumber;
    if(p>n && Number.isInteger(p)){p=n;pInput.value=String(n);}
    if(!Number.isInteger(p)||p<1||p>n){err.textContent=`A pont helye 1 és ${n} közötti egész szám legyen.`;err.hidden=false;return;}
    err.hidden=true;
    if(n===model.n&&p===model.p)return;
    model=rangeModel(n,p);
    $('jump-message').textContent=''; calculations();
    updateView();
  }
  nInput.addEventListener('input',settings); pInput.addEventListener('input',settings);
  for(const [id,fn] of [['zoom-in',()=>zoom(1)],['zoom-out',()=>zoom(-1)],['pan-left',()=>pan(-1)],['pan-right',()=>pan(1)],['reset-view',reset],['near-view',neighbors],['go-min',()=>select(model.min)],['go-zero',()=>select(0n)],['go-max',()=>select(model.max)]]) $(id).addEventListener('click',fn);
  plot.addEventListener('keydown',e=>{
    const fn={'+':()=>zoom(1),'=':()=>zoom(1),'-':()=>zoom(-1),'−':()=>zoom(-1),ArrowLeft:()=>pan(-1),ArrowRight:()=>pan(1)}[e.key];
    if(fn){e.preventDefault();fn();}
  });
  $('jump-form').addEventListener('submit',e=>{
    e.preventDefault();const msg=$('jump-message');
    try{const {k,exact}=parseTarget($('jump-value').value,model);select(k);msg.textContent=exact?'Kiválasztott érték: '+fmt(k):'A megadott szám nem ábrázolható pontosan. A legközelebbi ábrázolható érték: '+fmt(k);msg.classList.remove('error');}
    catch(err){msg.textContent=err.message;msg.classList.add('error');}
  });
  calculations();reset();
  if(typeof ResizeObserver!=='undefined'){
    let last=plot.clientWidth;
    new ResizeObserver(()=>{if(plot.clientWidth!==last){last=plot.clientWidth;plotRender();}}).observe(plot);
  }
}
