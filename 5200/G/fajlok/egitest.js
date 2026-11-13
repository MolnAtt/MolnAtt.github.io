class Egitest{
    /**
     * Létrehoz egy új égitestet a megadott paraméterekkel. A pozíció és a sebesség vektorokat klónozza, így az égitest belső állapota nem változik meg a paraméterek változásával.
     * @param {string} nev A bolygó neve. A bolygó neve a bolygó tömegének súlyozott átlaga lesz, ha két égitest összeolvad. A súlyozás az égitestek tömegén alapul. A súlyozott átlagot a Egitest.nevatlag() függvény számítja ki.
     * @param {number} tomeg A bolygó tömege.
     * @param {Vektor} p pozícióvektor
     * @param {Vektor} v sebességvektor
     * @param {string} szin Ez a szín a bolygó kitöltésének színe lesz. A körvonal színe a bolygó színe alapján kerül kijelzésre a kiválasztásnál.
     * @param {Galaxis} galaxis Minden egitest egy galaxisban van, a galaxis az égitestek listáját tartalmazza. Fontos számon tartani azt is, hogy az égitestek a galaxisban vannak, mert a galaxis felelős az égitestek közötti gravitációs kölcsönhatásokért és ütközésekért.
     * @param {boolean} eredeti Ez a paraméter azt jelzi, hogy az égitest eredeti-e, vagy egy összeolvadás eredménye. Ha az égitest összeolvad egy másik égitesttel, akkor az új égitest nem lesz eredeti, és a galaxis nem fogja kezelni az új égitestet. Az eredeti égitestek a galaxisban vannak, és a galaxis felelős az égitestek közötti gravitációs kölcsönhatásokért és ütközésekért. 
     */
    constructor(nev, tomeg, p, v, szin, _kulszin, galaxis, eredeti=true, suruseg=0.02){
        this.nev = nev;
        this.tomeg = tomeg;
        this.suruseg = Number(suruseg) || 0.02;
        this.szin = szin;
        this.eredeti = eredeti;
        this.sugar = Egitest.meret_kiszamitasa(this.tomeg, this.suruseg);
        this.kezdopozicio = [p, v];
        this.svgnyil = this.svg_nyil_letrehozasa();
        this.svgobject = this.svg_bolygo_letrehozasa(p);
        this.selectionRing = this.svg_kijeloles_letrehozasa();
        this.pv_inic();
        this.svg_nyil_update();
        this.lerajzol();
        this.galaxis = galaxis;
        galaxis.egitestei.push(this);
        this.svgobject.addEventListener('contextmenu', e => {e.preventDefault(); e.stopPropagation(); this.torol()});
    }

    /**
     * Törli az égitestet a galaxisból és a DOM-ból.
     * @returns {void}
     */
    torol(){
        this.svgnyil.remove();
        this.svgobject.remove();
        if (this.selectionRing) {
            this.selectionRing.remove();
        }
        this.galaxis.egitestei.splice(this.galaxis.egitestei.indexOf(this),1);
        delete this;
    }

    /**
     * Lerajzolja az égitestet a vászonra. A nyilat és a bolygót is hozzáadja a DOM-hoz.
     * @returns {void}
     */
    lerajzol(){
        vaszon.appendChild(this.svgnyil);
        vaszon.appendChild(this.svgobject);
        vaszon.appendChild(this.selectionRing);
    }

    /**
     * Inicializálja az égitest pozícióját és sebességét a kezdőpozíció alapján. A kezdőpozíció egy tömb, amely két Vektor objektumot tartalmaz: az első a pozíciót, a második a sebességet.
     * @returns {void}
     */
    pv_inic(){
        this.svgobject.setAttribute('cx', this.kezdopozicio[0].x);
        this.svgobject.setAttribute('cy', this.kezdopozicio[0].y);
        this.selectionRing.setAttribute('cx', this.kezdopozicio[0].x);
        this.selectionRing.setAttribute('cy', this.kezdopozicio[0].y);
        this.p = this.kezdopozicio[0].masolat();
        this.v = this.kezdopozicio[1].masolat();
    }

    /**
     * Mozgatja az égitestet a sebessége alapján. A pozíciót a sebesség vektorával növeli, majd frissíti a rajzot.
     * @returns {void}
     */
    mozogj(){
        // 1. feladat: A pozíciót a sebesség vektorával növeld, majd frissítsd a rajzot a frissit() metódus segítségével.
    }

    /**
     * Azt válaszolja meg, hogy egy adott égitest ütközik-e egy másikkal.
     * @param {Egitest} egitest 
     * @returns {boolean}
     */
    utkozik(egitest){
        //2. feladat: Két égitest ütközik, ha a távolságuk kisebb, mint a sugaruk összege. Írj függvényt, ami megválaszolja azt a kérdést, hogy ütkötik-e ez az égitest (this) a másikkal (egitest)!
    }

    // under the hood színkeverés HSL színtérben, nem kell érteni, hex kód megy be, hex kódot ad ki (by ChatGPT)
    static szinkever(color1, color2, ratio) {
        ratio = Math.max(0, Math.min(1, ratio)); // Ensure ratio is between 0 and 1
    
        // Convert hex to HSL
        const hexToHsl = (hex) => {
            const bigint = parseInt(hex.slice(1), 16);
            const r = (bigint >> 16) & 255;
            const g = (bigint >> 8) & 255;
            const b = bigint & 255;
    
            const normalizedR = r / 255;
            const normalizedG = g / 255;
            const normalizedB = b / 255;
    
            const max = Math.max(normalizedR, normalizedG, normalizedB);
            const min = Math.min(normalizedR, normalizedG, normalizedB);
    
            let h, s, l = (max + min) / 2;
    
            if (max === min) {
                h = s = 0; // achromatic
            } else {
                const d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                    case normalizedR:
                        h = (normalizedG - normalizedB) / d + (normalizedG < normalizedB ? 6 : 0);
                        break;
                    case normalizedG:
                        h = (normalizedB - normalizedR) / d + 2;
                        break;
                    case normalizedB:
                        h = (normalizedR - normalizedG) / d + 4;
                        break;
                }
                h /= 6;
            }
    
            return { h, s, l };
        };
    
        // Interpolate in HSL
        const hsl1 = hexToHsl(color1);
        const hsl2 = hexToHsl(color2);
    
        const hueDiff = hsl2.h - hsl1.h;
    
        if (Math.abs(hueDiff) > 0.5) {
            // Ensure that interpolation goes the shortest way around the color wheel
            hsl2.h -= Math.sign(hueDiff);
        }
    
        const blendedHsl = {
            h: hsl1.h + hueDiff * ratio,
            s: hsl1.s + (hsl2.s - hsl1.s) * ratio,
            l: hsl1.l + (hsl2.l - hsl1.l) * ratio
        };
    
        // Convert back to hex
        const hslToHex = (hsl) => {
            const hueToRgb = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            };
    
            const { h, s, l } = hsl;
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            const r = hueToRgb(p, q, h + 1 / 3);
            const g = hueToRgb(p, q, h);
            const b = hueToRgb(p, q, h - 1 / 3);
    
            const componentToHex = (c) => {
                const hex = Math.round(c * 255).toString(16);
                return hex.length === 1 ? "0" + hex : hex;
            };
    
            return `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;
        };
    
        return hslToHex(blendedHsl);
    }

    /**
     * Zsolt kódja arra, hogy kiszámítja két név "súlyozott átlagát". Akkor használható, ha két égitest összeolvad, és az új égitest neve a két eredeti név súlyozott átlaga lesz. A súlyozás az égitestek tömegén alapul.
     * @param {string} nev1 
     * @param {number} suly1 
     * @param {string} nev2 
     * @param {number} suly2 
     * @returns {string}
     */
    static nevatlag(nev1, suly1, nev2, suly2) {
        const nev1hossz = nev1.length;
        const nev2hossz = nev2.length;
        const ujnevhossz = Math.round((nev1hossz * suly1 + nev2hossz * suly2) / (suly1 + suly2));
        var ujnev = "";
        for (let i = 0; i < ujnevhossz; i++) {
            ujnev += String.fromCharCode((nev1.charCodeAt(i) * suly1 + nev2.charCodeAt(i) * suly2) / (suly1 + suly2));
        }
        return ujnev;
    }

    /**
     * Beolvasztja a paraméterként kapott égitestet az aktuális égitestbe. A két égitest összeolvad, és egy új égitest jön létre, amelynek tömege, pozíciója, sebessége és színe a két eredeti égitest súlyozott átlaga lesz. Az új égitestet visszaadja.
     * @param {Egitest} egitest 
     * @returns {Egitest}
     */
    beolvaszt(egitest){
        // 3. feladat: egészítsd ki!
        const uj_tomeg = // itt
        const uj_p =  // itt
        const uj_v =  // ittegitest.tomeg)), uj_tomeg); 
        const uj_szin =  // itt
        const uj_nev =  // itt
        const uj_suruseg =  // itt

        const uj_bolygo =  // itt

        // hozzáadás a nem kezeltekhez
        this.galaxis.nem_kezelt_egitestei.push(this);
        egitest.galaxis.nem_kezelt_egitestei.push(egitest);
        // törlés a kezeltekből
        this.galaxis.egitestei.splice(this.galaxis.egitestei.indexOf(this),1);
        egitest.galaxis.egitestei.splice(egitest.galaxis.egitestei.indexOf(egitest),1);
        // törlés a DOM-ból
        this.svgnyil.remove();
        this.svgobject.remove();
        this.selectionRing.remove();
        egitest.svgnyil.remove();
        egitest.svgobject.remove();
        egitest.selectionRing.remove();

        selectedBodyIndex = this.galaxis.egitestei.indexOf(uj_bolygo);
        uj_bolygo.svgnyil.classList.toggle('lathatatlan');
        return uj_bolygo;
    }


    /**
     * Frissíti az égitest pozícióját a DOM-ban a belső pozíció vektor alapján. 
     * A bolygó és a nyíl pozícióját is frissíti.
     * @returns {void}
     */
    frissit(){
        this.svgobject.setAttribute('cx', this.p.x);
        this.svgobject.setAttribute('cy', this.p.y);
        this.selectionRing.setAttribute('cx', this.p.x);
        this.selectionRing.setAttribute('cy', this.p.y);
    }

    static gamma = 1;

    /**
     * Ez a metódus a méretet számítja ki az égitest tömege és sűrűsége alapján. 
     * @param {number} tomeg 
     * @param {number} suruseg
     * @returns {number}
     */
    static meret_kiszamitasa(tomeg, suruseg = 0.02) {
        // 4. feladat: A tömeg és a sűrűség alapján adj képletet arra, hogy mekkora legyen a megjelenítendő égitest sugara! Ezt később lehet próbálgatni, hogy négyzetes, köbös vagy más elv alapján számoljuk a sugár nagyságát. Rád bízom, hogy mit választasz!
    }

    /**
     * Ez a függvény visszaadja a bemenő égitestekre ható KÉT erőt.
     * @param {Egitest} e 
     * @param {Egitest} f 
     * @returns {[Vektor,Vektor]}
     */
    static gravitacios_kolcsonhatas_parra(e, f){
        
        // 5. feladat: A két égitestre ható erőket számítsd ki a gravitációs törvény alapján. A két égitest tömege és pozíciója alapján számítsd ki az erővektorokat, majd add vissza őket egy tömbben. Az első erővektor az e égitestre ható erő, a második erővektor a f égitestre ható erő. A képlet elve a következő:
        // F = G * (m1 * m2) / r^2
        // ahol G a gravitációs állandó, m1 és m2 a két égitest tömege, r pedig a két égitest közötti távolság. Az erő iránya a két égitest közötti vektor irányába mutat.
        const G = Egitest.gamma;

        // ... ide jöhet a kód, ami kiszámítja az erővektorokat ...
        return [elmozdulas_e, elmozdulas_f];
    }


    static planetGradientForColor(color) {
        const normalized = (color || '#9b8cff').replace('#', '').toLowerCase();
        const rgb = normalized.length === 3
            ? normalized.split('').map((ch) => ch + ch).join('')
            : normalized;
        const r = parseInt(rgb.slice(0, 2), 16);
        const g = parseInt(rgb.slice(2, 4), 16);
        const b = parseInt(rgb.slice(4, 6), 16);

        if (r > g && r > b) {
            return 'planet-red';
        }
        if (b > r && b > g) {
            return 'planet-blue';
        }
        return 'planet-gold';
    }

    /**
     * Létrehoz egy SVG kör elemet a bolygó számára a megadott pozícióban.
     * @param {Vektor} p 
     * @returns {SVGCircleElement}
     */
    svg_bolygo_letrehozasa(p){
        let svgo = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
        svgo.setAttribute('r', this.sugar);
        svgo.setAttribute('fill', `url(#${Egitest.planetGradientForColor(this.szin)})`);
        svgo.setAttribute('opacity', '0.98');
        svgo.setAttribute('filter', 'drop-shadow(0 0 12px rgba(150, 210, 255, 0.45))');
        return svgo;
    }

    svg_kijeloles_letrehozasa(){
        let ring = document.createElementNS("http://www.w3.org/2000/svg", 'circle');
        ring.setAttribute('r', this.sugar + 8);
        ring.setAttribute('fill', 'none');
        ring.setAttribute('stroke', this.szin);
        ring.setAttribute('stroke-width', '1.5');
        ring.setAttribute('stroke-dasharray', '4 5');
        ring.setAttribute('opacity', '0.9');
        ring.classList.add('lathatatlan');
        return ring;
    }
    /**
     * Létrehoz egy SVG nyíl elemet a bolygó sebességének vizualizálására.
     * @returns {SVGPathElement}
     */
    svg_nyil_letrehozasa(){
        let svgnyil = document.createElementNS("http://www.w3.org/2000/svg", 'path');
        svgnyil.setAttribute('marker-end', 'url(#head)');
        svgnyil.setAttribute('stroke-width', 2);
        svgnyil.setAttribute('fill', 'none');
        svgnyil.setAttribute('stroke', 'gray');
        svgnyil.setAttribute('stroke-width', '2');
        return svgnyil;
    }

    /**
     * Frissíti az égitesthez tartozó SVG nyíl pozícióját a bolygó aktuális pozíciója és sebessége alapján.
     * @returns {void}
     */
    svg_nyil_update(){
        this.svgnyil.setAttribute('d', `M${this.p.x},${this.p.y} ${this.p.x+this.v.x*100},${this.p.y+this.v.y*100}`);
    }
}
