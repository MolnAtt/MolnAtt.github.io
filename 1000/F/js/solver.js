'use strict';
// Minden számítás egész BigInt értékekkel történik, lebegőpontos kerekítési hiba nélkül.
function parseDecimal(raw){const s=raw.trim().replace(',','.');if(!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(s)||s.length>260)throw Error('Adj meg egy decimális számot (legfeljebb 260 karakter).');const neg=s.startsWith('-');const [a,b='']=s.replace(/^[+-]/,'').split('.');return {num:BigInt((a||'0')+b)*(neg?-1n:1n),den:10n**BigInt(b.length)};}
function decimal(n,d=1n){const sign=n<0n?'−':'';if(n<0n)n=-n;let out=String(n/d),r=n%d;if(r){out+=',';while(r){r*=10n;out+=String(r/d);r%=d;}}return sign+out;}
function solve(raw,N,P){if(!Number.isInteger(N)||N<8||N>64||!Number.isInteger(P)||P<1||P>N)throw Error('A bitszám 8–64, a pont helye 1 és a bitszám között lehet.');const {num,den}=parseDecimal(raw), F=N-P, scale=1n<<BigInt(F), limit=1n<<BigInt(N-1), abs=num<0n?-num:num;const scaled=abs*scale;let mag=scaled/den;const rem=scaled%den;if(rem*2n>=den)mag++;const q=num<0n?-mag:mag;if(q< -limit||q>=limit)throw Error('A szám kerekített értéke nem fér el. Tartomány: '+decimal(-limit,scale)+' … '+decimal(limit-1n,scale)+'.');return {num,den,N,P,F,scale,limit,abs,mag,q,rem,rounded:rem!==0n,bits:encode(q,N),magBits:encode(mag,N)};}
function encode(q,N){return BigInt.asUintN(N,q).toString(2).padStart(N,'0');}
function dotted(s,P){return s.slice(0,P)+(P<s.length?','+s.slice(P):'');}
if(typeof module!=='undefined')module.exports={solve,decimal,dotted,encode};
