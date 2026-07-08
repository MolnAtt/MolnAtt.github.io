
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


// terepes
// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//   maxZoom: 19,
//   attribution: '&copy; OpenStreetMap közreműködők'
// }).addTo(map);

// utakhoz
// L.tileLayer("https://tiles.stadiamaps.com/tiles/stamen_toner_lite/{z}/{x}/{y}{r}.png", {
// attribution: '&copy; Stadia Maps &copy; Stamen Design &copy; OpenMapTiles &copy; OpenStreetMap contributors',
// maxZoom: 20
// }).addTo(map);

L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
subdomains: "abcd",
maxZoom: 20
}).addTo(map);

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


// RAJZOLÁS

rajzol(points);
