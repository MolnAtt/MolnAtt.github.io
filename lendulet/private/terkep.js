
console.log("verzió: 2026.07.07. 22:03");

const ZOOM_MERET_SZORZO_LEPESENKENT = 1.5;

/**
 * megadja a pont színét az ifm és a tipus alapján.
 * @param {Object} p 
 * @returns {string} a szín érték
 */
function point2color(p){
    const ifmStr = String(p.ifm ?? "").replaceAll(' ', '').trim();
    if (ifmStr == "")
        return "black";
    if (p.tipus == "k")
        return "brown";
    if (p.tipus == "mv")
        return "green";
    if (p.tipus == "kmv")
        return "purple";
    if (ifmStr == "n.a.")
        return "black";
    return "magenta";
}

/**
 * 
 * @param {string} value 
 * @returns {string} escaped HTML string
 */
function escapeHtml(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#39;");
}

/**
 * 
 * @param {object} p 
 * @param {Number} index 
 * @returns {string} HTML string for the tooltip content
 */
function felirat(p, index = null) {
    const nev = escapeHtml(p.nev);
    const megye = escapeHtml(p.megye);
    const mettol = escapeHtml(p.mettol);
    const meddig = escapeHtml(p.meddig);
    const elsodleges_iratanyag_html = `<div class="tooltip-ifm">elsődleges iratanyag: ${escapeHtml(p.ifm ? `${p.ifm} ifm` : "-")}</div>`;
    const korjegyzoseg_iratanyag_html = p.korjegyzoseg ? `<div class="tooltip-korjegyzoseg">körjegyzőség iratanyag: ${escapeHtml(`${p.korjegyzoseg} ifm`)} </div>` : "";

    return `
        <div class="tooltip-nev">${nev}</div>
        <div class="tooltip-megye">${megye.toLowerCase()}</div>
        <div class="tooltip-ev">${mettol} - ${meddig}</div>
        ${elsodleges_iratanyag_html}
        ${korjegyzoseg_iratanyag_html}
        <div class="tooltip-index">index: ${index}</div>
        <div class="tooltip-id">ID: ${p.id}</div>
    `;
}

/**
 * 
 * @param {Array<number>} intervallum1 
 * @param {Array<number>} intervallum2 
 * @returns {boolean} true ha az intervallumok metszik egymást, különben false
 */
function intervallumMetsz(intervallum1, intervallum2) {        // Két zárt intervallum metszete nem üres: [mettol, meddig] és [evszazadTol, evszazadIg]
    let [mettol, meddig] = intervallum1;
    let [evszazadTol, evszazadIg] = intervallum2;
    return mettol <= evszazadIg && meddig >= evszazadTol;
}


/**
 * 
 * @param {Array<object>} points 
 * @returns {Array<object>} a szűrt pontok tömbje a checkboxok állapota alapján
 */
function szures_checkboxok_alapjan(points) {
    const csuszka_mettol = Number(mettol_csuszka.value);
    const csuszka_meddig = Number(meddig_csuszka.value);
    return points.filter(p => {
        if (p.tipus == "k" && !chb_tipus_k.checked) return false;
        if (p.tipus == "mv" && !chb_tipus_mv.checked) return false;
        if (p.tipus == "kmv" && !chb_tipus_kmv.checked) return false;
        if (!lathatoMegye(p.megye)) return false;
        return true;
    }).filter(p => {
        const telepules_mettol = Number(p.mettol);
        const telepules_meddig = Number(p.meddig);

        if (!Number.isFinite(telepules_mettol) || !Number.isFinite(telepules_meddig)) {
            return false;
        }

        return intervallumMetsz([telepules_mettol, telepules_meddig], [csuszka_mettol, csuszka_meddig]);
    });
}


/**
 * Átalakítja az ifm-et sugárra logaritmikus függvénnyel.
 * @param {number} ifm - az ifm érték
 * @returns {number} a sugar érték
 */
function ifm2meret(ifm) {
    const ifmStr = String(ifm ?? "").replaceAll(' ', '').trim();
    
    if (ifmStr === "n.a.")
        return 0;
    else if (ifmStr === "")
        return 0;
    else if (ifmStr === "i")
        return 0;
    else
        return Math.log2(1 + Number(ifmStr.replace(',', '.')));
}

function zoomSugar(ifm) {
    return ifm2meret(ifm) * Math.pow(ZOOM_MERET_SZORZO_LEPESENKENT, map.getZoom() - 8);
}

function zoomMeretSzorzo() {
    return Math.pow(ZOOM_MERET_SZORZO_LEPESENKENT, map.getZoom() - 8);
}

function normalizaltKorjegyzosegErtek(value) {
    return String(value ?? "").replaceAll(' ', '').trim().toLowerCase();
}

function normalizaltMegyeKod(megyeNev) {
    const elsoSzo = String(megyeNev ?? "").trim().split(/[-\s]+/)[0] ?? "";

    return elsoSzo
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

// A kiválasztott megyék kódjai (Set). Ha üres, minden megye látszik.
const kivalasztottMegyek = new Set();

function lathatoMegye(megyeNev) {
    if (kivalasztottMegyek.size === 0) return true;
    const kod = normalizaltMegyeKod(megyeNev);
    return kivalasztottMegyek.has(kod);
}

function vanKorjegyzoseg(value) {
    const normalizalt = normalizaltKorjegyzosegErtek(value);
    return normalizalt !== "" && normalizalt !== "0" && normalizalt !== "n.a.";
}

function korjegyzosegSzam(value) {
    const normalizalt = normalizaltKorjegyzosegErtek(value).replace(',', '.');
    const szam = Number(normalizalt);
    return Number.isFinite(szam) && normalizalt !== "i";
}

function lathatoKorjegyzoseg(value) {
    const normalizalt = normalizaltKorjegyzosegErtek(value);

    if (!vanKorjegyzoseg(normalizalt)) {
        return false;
    }

    if (normalizalt === "i") {
        return chb_korjegyzoseg_i.checked;
    }

    if (korjegyzosegSzam(normalizalt)) {
        return chb_korjegyzoseg_szam.checked;
    }

    return true;
}

function korjegyzosegAlapSzelesseg(value) {
    const normalizalt = normalizaltKorjegyzosegErtek(value);

    if (normalizalt === "i") {
        return 2;
    }

    if (!vanKorjegyzoseg(value)) {
        return 0;
    }

    return ifm2meret(value);
}


let elsodlegesMarkers = [];  
let korjegyzosegMarkers = [];  

const tooltip_setup = {
    permanent: false,
    sticky: true,
    direction: "top",
    opacity: 0.9,
    className: "telepules-tooltip"
}   

function tooltipeles(marker, p, index) {
    marker.bindTooltip(felirat(p, index), tooltip_setup);

    marker.on('mouseover', function () {
        this.openTooltip();
        // this.setStyle({ fillOpacity: 0.9 });
    });

    marker.on('mouseout', function () {
        this.closeTooltip();
        // this.setStyle({ fillOpacity: marker === elsodleges_iratanyag_marker ? { fillOpacity: 0.5 } : { fillOpacity: 0.2 } });
    });
}

/**
 * 
 * @param {Array<object>} points 
 */
function rajzol(points){
    elsodlegesMarkers = [];
    korjegyzosegMarkers = [];

    points = szures_checkboxok_alapjan(points);

    let kihagyott = 0;



    for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const lat = Number(String(p.lat ?? "").replace(',', '.'));
        const lon = Number(String(p.lon ?? "").replace(',', '.'));
        const elsodleges_minMeret = 2;
        const korjegyzoseg_minMeret = 0;
        const nagyitas = 1;
        const szin = point2color(p);
        const alapSugar = elsodleges_minMeret + nagyitas * ifm2meret(p.ifm);
        const korjegyzosegSzelesseg = korjegyzosegAlapSzelesseg(p.korjegyzoseg);
        const alapKorjegyzosegSugar = vanKorjegyzoseg(p.korjegyzoseg)
            ? korjegyzoseg_minMeret + nagyitas * (alapSugar + korjegyzosegSzelesseg / 2)
            : 0;
        const zoomSzorzo = zoomMeretSzorzo();
        const sugar = alapSugar * zoomSzorzo;
        const korjegyzoseg_sugar = alapKorjegyzosegSugar * zoomSzorzo;
        
        if (!Number.isFinite(lat) || !Number.isFinite(lon) || !Number.isFinite(sugar) || sugar < 0) {
            kihagyott++;
            console.warn("Kihagyott hibas pont:", p);
            continue;
        }

        const elsodleges_iratanyag_marker = L.circleMarker([lat, lon], {
            radius: sugar,
            stroke: false,
            fill: true,
            fillColor: szin,
            fillOpacity: 0.5,
            interactive: true,
        }).addTo(pontLayer);
        elsodleges_iratanyag_marker.alapSugar = alapSugar;
        elsodlegesMarkers.push(elsodleges_iratanyag_marker);
        tooltipeles(elsodleges_iratanyag_marker, p, i);

        if (lathatoKorjegyzoseg(p.korjegyzoseg)) {
            const korjegyzosegAktualisSzelesseg = korjegyzosegSzelesseg * zoomSzorzo;
            const korjegyzosegAktualisSugar = korjegyzoseg_sugar;

            const korjegyzoseg_iratanyag_marker = L.circleMarker([lat, lon], {
                radius: korjegyzosegAktualisSugar,
                stroke: true,
                color: p.korjegyzoseg == "i" ? "blue" : szin,
                weight: korjegyzosegAktualisSzelesseg,
                fill: false,
                opacity: 0.2,
                interactive: true,
            }).addTo(pontLayer);
            korjegyzoseg_iratanyag_marker.alapSugar = alapKorjegyzosegSugar;
            korjegyzoseg_iratanyag_marker.alapSzelesseg = korjegyzosegSzelesseg;
            korjegyzosegMarkers.push(korjegyzoseg_iratanyag_marker);
            tooltipeles(korjegyzoseg_iratanyag_marker, p, i);
        }
        
        

    } // end of for

    if (kihagyott > 0) {
        console.warn(`Rajzolas kozben ${kihagyott} hibas pont ki lett hagyva.`);
    }
}

function frissitKorMeretekZoomAlapjan() {
    const zoomSzorzo = zoomMeretSzorzo();

    for (const marker of elsodlegesMarkers) {
        marker.setRadius(marker.alapSugar * zoomSzorzo);
    }

    for (const marker of korjegyzosegMarkers) {
        marker.setRadius(marker.alapSugar * zoomSzorzo);
        if (Number.isFinite(marker.alapSzelesseg)) {
            marker.setStyle({ weight: marker.alapSzelesseg * zoomSzorzo });
        }
    }
}

function torolRajzoltPontok() {
    pontLayer.clearLayers();
    elsodlegesMarkers = [];
    korjegyzosegMarkers = [];
}

let meret = 1;

// const hely = [47.180102654846685, 19.504011519869753];
const hely = [47.334286998205826, 19.951559635596578];

const map = L.map('map', {
    center: hely,
    zoom: 9,
    scrollWheelZoom: true
});


// Csempeválasztó dropdown

const CARTO_API_KEY = "cb1_496l_1_19493acc3f7411b849230888";

const CSEMPE_STILUSOK = {
    osm: {
        url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
        options: { maxZoom: 19, attribution: '&copy; OpenStreetMap közreműködők' }
    },
    carto: {
        url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" + (CARTO_API_KEY ? `?key=${CARTO_API_KEY}` : ""),
        options: { subdomains: "abcd", maxZoom: 20, attribution: '&copy; OpenStreetMap contributors &copy; CARTO' }
    },
    esri: {
        url: "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
        options: { maxZoom: 19, attribution: '&copy; Esri, HERE, Garmin, OpenStreetMap contributors' }
    },
    osmgray: {
        url: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
        options: { maxZoom: 19, attribution: '&copy; OpenStreetMap közreműködők', className: 'leaflet-tile-gray' }
    }
};

let aktivCsempeLayer = null;

/**
 * Beállítja a térkép háttércsempéit a kiválasztott stílus alapján.
 * @param {string} stilusKulcs - a CSEMPE_STILUSOK kulcsa
 */
function csempeBeallit(stilusKulcs) {
    if (aktivCsempeLayer) {
        map.removeLayer(aktivCsempeLayer);
    }
    const stilus = CSEMPE_STILUSOK[stilusKulcs];
    if (!stilus) return;
    aktivCsempeLayer = L.tileLayer(stilus.url, stilus.options).addTo(map);
}

const csempeSelect = document.getElementById("csempe_stilus");
csempeSelect.addEventListener("change", () => csempeBeallit(csempeSelect.value));
csempeBeallit(csempeSelect.value); // kezdőbetöltés

const pontLayer = L.layerGroup().addTo(map);

map.on("zoom", frissitKorMeretekZoomAlapjan);


setTimeout(() => map.invalidateSize(), 200);


// Településtípus checkboxok kezelőfelülete

let chb_tipus_k = document.getElementById("chb_tipus_k");
let chb_tipus_mv = document.getElementById("chb_tipus_mv");
let chb_tipus_kmv = document.getElementById("chb_tipus_kmv");
let chb_korjegyzoseg_i = document.getElementById("chb_korjegyzoseg_i");
let chb_korjegyzoseg_szam = document.getElementById("chb_korjegyzoseg_szam");
let checkboxok = [chb_tipus_k, chb_tipus_mv, chb_tipus_kmv, chb_korjegyzoseg_i, chb_korjegyzoseg_szam];

for (const chb of checkboxok) {
    chb.addEventListener("change", () => {
        torolRajzoltPontok();
        rajzol(points);
    });
}

// Megyeválasztó SVG-térkép

// A path id-kat a megyek.svg-ből geometriai súlypont alapján azonosítottuk be.
// Budapest (path2230) Pest megyéhez tartozik, mert a data.js-ben nincs külön Budapest megye.
const PATH_MEGYE_KOD = {
    path1349: "borsod",
    path2293: "szabolcs",
    path1315: "hajdu",
    path3097: "bekes",
    path4015: "csongrad",
    path4896: "bacs",
    path1331: "baranya",
    path1337: "somogy",
    path2219: "zala",
    path2235: "vas",
    path2218: "gyor",
    path2229: "komarom",
    path7536: "tolna",
    path2221: "veszprem",
    path7528: "fejer",
    path3992: "pest",
    path2230: "pest",
    path4010: "jasz",
    path4022: "heves",
    path5788: "nograd"
};

const MEGYE_NEV = {
    szabolcs: "Szabolcs-Szatmár-Bereg",
    borsod: "Borsod-Abaúj-Zemplén",
    hajdu: "Hajdú-Bihar",
    bekes: "Békés",
    csongrad: "Csongrád-Csanád",
    bacs: "Bács-Kiskun",
    baranya: "Baranya",
    somogy: "Somogy",
    zala: "Zala",
    vas: "Vas",
    gyor: "Győr-Moson-Sopron",
    komarom: "Komárom-Esztergom",
    tolna: "Tolna",
    veszprem: "Veszprém",
    fejer: "Fejér",
    pest: "Pest",
    jasz: "Jász-Nagykun-Szolnok",
    heves: "Heves",
    nograd: "Nógrád"
};

/**
 * Betölti a megyek.svg-t, és minden megye-pathhoz kattintáskezelést rendel.
 */
async function megysTerkepBetoltes() {
    const resp = await fetch("megyek.svg");
    const szoveg = await resp.text();
    const holder = document.getElementById("megyeterkep");
    holder.innerHTML = szoveg;
    const svg = holder.querySelector("svg");
    if (!svg) return;
    svg.removeAttribute("width");
    svg.removeAttribute("height");
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    // viewBox beállítása, ha nincs
    if (!svg.getAttribute("viewBox")) {
        const paths = Array.from(svg.querySelectorAll("path"));
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
        for (const p of paths) {
            const bb = p.getBBox();
            minX = Math.min(minX, bb.x); minY = Math.min(minY, bb.y);
            maxX = Math.max(maxX, bb.x + bb.width); maxY = Math.max(maxY, bb.y + bb.height);
        }
        svg.setAttribute("viewBox", `${minX} ${minY} ${maxX - minX} ${maxY - minY}`);
    }

    for (const [pathId, megyeKod] of Object.entries(PATH_MEGYE_KOD)) {
        const path = svg.querySelector("#" + pathId);
        if (!path) continue;
        path.style.cursor = "pointer";
        path.title = MEGYE_NEV[megyeKod] ?? megyeKod;
        path.addEventListener("click", () => {
            if (kivalasztottMegyek.has(megyeKod)) {
                kivalasztottMegyek.delete(megyeKod);
            } else {
                kivalasztottMegyek.add(megyeKod);
            }
            // szín frissítése
            const aktiv = kivalasztottMegyek.has(megyeKod);
            for (const [pid, kod] of Object.entries(PATH_MEGYE_KOD)) {
                const p = svg.querySelector("#" + pid);
                if (!p) continue;
                p.style.fill = kivalasztottMegyek.has(kod) ? "#4488ff" : "#ffffff";
            }
            torolRajzoltPontok();
            rajzol(points);
        });
    }
}

megysTerkepBetoltes();

// Időintervallum kezelőfelület

/**
 * Összeköti a két inputot.
 * @param {HTMLInputElement} csuszka 
 * @param {HTMLInputElement} szam 
 */
function osszekot(csuszka, szam) {
    csuszka.addEventListener("input", () => {
        szam.value = csuszka.value;
    });

    szam.addEventListener("input", () => {
        csuszka.value = szam.value;
    });
}


const mettol_csuszka = document.getElementById("mettol_csuszka");
const mettol_ertek = document.getElementById("mettol_ertek");
const meddig_csuszka = document.getElementById("meddig_csuszka");
const meddig_ertek = document.getElementById("meddig_ertek");
const idointervallum_gomb = document.getElementById("idointervallum_gomb");

osszekot(mettol_csuszka, mettol_ertek);
osszekot(meddig_csuszka, meddig_ertek);

idointervallum_gomb.addEventListener("click", () => {
    torolRajzoltPontok();
    rajzol(points);
});


// Település kereső mező

/**
 * Ékezetmentesíti a szöveget, hogy a keresés ne ütközzön ékezetekbe.
 * @param {string} szoveg 
 * @returns {string} ékezetmentes szöveg
 */
function ekezetMentesit(szoveg) {
    return String(szoveg ?? "")
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
}

const telepuleskereso_input = document.getElementById("telepuleskereso_input");
const telepuleslista = document.getElementById("telepuleslista");

/**
 * Frissíti a datalist opcióit a beírt szöveg alapján.
 */
function frissitTelepulesLista() {
    const keresett = ekezetMentesit(telepuleskereso_input.value);
    telepuleslista.innerHTML = "";
    if (!keresett) return;

    const talalatok = points.filter(p => ekezetMentesit(p.nev).startsWith(keresett));
    for (const p of talalatok) {
        const opt = document.createElement("option");
        opt.value = p.nev;
        opt.dataset.id = p.id;
        telepuleslista.appendChild(opt);
    }
}

/**
 * Úgy ugrik a pontra, hogy az a látható terület közepére kerüljön,
 * ne a teljes ablak közepére (a vezérlőpult a térkép jobb szélét takarja).
 * @param {number} lat
 * @param {number} lon
 * @param {number} zoom
 */
function ugrikPontra(lat, lon, zoom) {
    const pult = document.getElementById("vezerlopult");
    const takartSzelesseg = pult ? pult.offsetWidth + 20 : 0; // panel + jobb margó
    const celPont = map.project([lat, lon], zoom);
    const etoltPont = celPont.add([takartSzelesseg / 2, 0]); // középpontot keletre toljuk, így a pont balra, a látható középre kerül
    map.setView(map.unproject(etoltPont, zoom), zoom);
}

/**
 * A kiválasztott településhez ugrik a térkép.
 */
function telepulesKivalasztva() {
    const kivalasztottNev = telepuleskereso_input.value;
    const option = Array.from(telepuleslista.options).find(o => o.value === kivalasztottNev);
    if (!option) return;
    const p = points.find(p => p.id === Number(option.dataset.id));
    if (!p) return;
    const lat = Number(String(p.lat ?? "").replace(',', '.'));
    const lon = Number(String(p.lon ?? "").replace(',', '.'));
    if (Number.isFinite(lat) && Number.isFinite(lon)) {
        ugrikPontra(lat, lon, Math.max(map.getZoom(), 13));
    }
}

telepuleskereso_input.addEventListener("input", frissitTelepulesLista);
telepuleskereso_input.addEventListener("change", telepulesKivalasztva);


// RAJZOLÁS

rajzol(points);
