const vaszon = document.getElementById("simulation-svg");
const startbtn = document.getElementById("start-btn");
const stopbtn = document.getElementById("pause-btn");
const resetbtn = document.getElementById("reset-btn");
const bolygobtn = document.querySelector("#new-body-form button[type='submit']");
const sulypontbtn = document.getElementById("sulypont-btn");
const speedInput = document.getElementById("simulation-speed");
const speedValue = document.getElementById("speed-value");
const showTrails = document.getElementById("show-trails");
const presetSelect = document.getElementById("preset-select");
const loadPresetBtn = document.getElementById("load-preset-btn");
const statusText = document.getElementById("simulation-status-text");
const elapsedOutput = document.getElementById("elapsed-time");
const bodyCountOutput = document.getElementById("body-count");
const previousBodyBtn = document.getElementById("previous-body-btn");
const nextBodyBtn = document.getElementById("next-body-btn");
const bodyIndexLabel = document.getElementById("body-index");
const infoName = document.getElementById("info-name");
const infoColorSwatch = document.getElementById("info-color-swatch");
const infoColor = document.getElementById("info-color");
const infoDensity = document.getElementById("info-density");
const infoMass = document.getElementById("info-mass");
const infoPosition = document.getElementById("info-position");
const infoVelocity = document.getElementById("info-velocity");

let galaxis = new Galaxis("Kistejút");
let globalID;
let running = false;
let elapsedTime = 0;
let selectedBodyIndex = 0;
let presetLista = [];


async function presetListaBetoltese() {
    const fallback = GALAXISOK;
    try {
        const response = await fetch("galaxisok.json", { cache: "no-store" });
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        const adatok = await response.json();
        const forras = Array.isArray(adatok) ? adatok : (Array.isArray(adatok.presetek) ? adatok.presetek : fallback);
        presetLista = forras.length ? forras : fallback;
    } catch (error) {
        presetLista = fallback;
    }

    presetSelect.innerHTML = "";
    for (const preset of presetLista) {
        const option = document.createElement("option");
        option.value = preset.id;
        option.textContent = preset.nev || preset.id;
        if (preset.id === "nyolcasrendszer") {
            option.selected = true;
        }
        presetSelect.appendChild(option);
    }

    if (!presetSelect.value && presetLista.length) {
        presetSelect.value = presetLista[0].id;
    }
}

function aktualis_egitest() {
    if (!galaxis || !galaxis.egitestei.length) {
        return null;
    }
    if (!galaxis.egitestei[selectedBodyIndex]) {
        selectedBodyIndex = 0;
    }
    return galaxis.egitestei[selectedBodyIndex];
}

function updateSpeedLabel() {
    speedValue.textContent = `${Number(speedInput.value).toFixed(1).replace('.', ',')}×`;
}

function setVelocityVisibility(show) {
    if (!galaxis) {
        return;
    }
    for (const egitest of galaxis.egitestei) {
        if (egitest && egitest.svgnyil) {
            egitest.svgnyil.classList.toggle('lathatatlan', !show);
        }
    }
    for (const egitest of galaxis.nem_kezelt_egitestei) {
        if (egitest && egitest.svgnyil) {
            egitest.svgnyil.classList.toggle('lathatatlan', !show);
        }
    }
}

function frissit_kijelolt_bolygok() {
    for (let i = 0; i < galaxis.egitestei.length; i += 1) {
        const body = galaxis.egitestei[i];
        if (!body || !body.selectionRing) {
            continue;
        }
        const selected = i === selectedBodyIndex;
        body.selectionRing.classList.toggle('lathatatlan', !selected);
        body.selectionRing.setAttribute('cx', body.p.x);
        body.selectionRing.setAttribute('cy', body.p.y);
        body.selectionRing.setAttribute('r', body.sugar + 8);
    }
}

function frissit_bolygoinformacio() {
    const body = aktualis_egitest();
    bodyCountOutput.textContent = String(galaxis.egitestei.length);

    if (!body) {
        bodyIndexLabel.textContent = '00 / 00';
        infoName.textContent = 'Nincs égitest';
        infoColorSwatch.style.setProperty('--swatch', '#ffffff');
        infoColor.textContent = '#FFFFFF';
        infoDensity.textContent = '0';
        infoMass.textContent = '0';
        infoPosition.textContent = '(0, 0)';
        infoVelocity.textContent = '(0, 0)';
        frissit_kijelolt_bolygok();
        return;
    }

    const bodyIndexValue = galaxis.egitestei.length ? selectedBodyIndex + 1 : 0;
    bodyIndexLabel.textContent = `${String(bodyIndexValue).padStart(2, '0')} / ${String(galaxis.egitestei.length).padStart(2, '0')}`;
    infoName.textContent = body.nev;
    infoColorSwatch.style.setProperty('--swatch', body.belszin || '#ffffff');
    infoColor.textContent = body.belszin.toUpperCase();
    infoDensity.textContent = String(body.suruseg ?? 0.02);
    infoMass.textContent = String(body.tomeg);
    infoPosition.textContent = `(${body.p.x.toFixed(2)}, ${body.p.y.toFixed(2)})`;
    infoVelocity.textContent = `(${body.v.x.toFixed(2)}, ${body.v.y.toFixed(2)})`;
    frissit_kijelolt_bolygok();
}

function betolt_preset(presetKey = presetSelect.value) {
    const preset = presetLista.find((item) => item.id === presetKey) || presetLista[0] || GALAXISOK[0];
    if (!preset) {
        return;
    }

    if (running) {
        cancelAnimationFrame(globalID);
        running = false;
    }

    if (galaxis && galaxis.egitestei.length) {
        for (const egitest of [...galaxis.egitestei]) {
            if (egitest && egitest.svgnyil) {
                egitest.svgnyil.remove();
            }
            if (egitest && egitest.svgobject) {
                egitest.svgobject.remove();
            }
            if (egitest && egitest.selectionRing) {
                egitest.selectionRing.remove();
            }
        }
    }

    galaxis = new Galaxis(preset.nev || preset.id);
    selectedBodyIndex = 0;
    elapsedTime = 0;
    elapsedOutput.textContent = "0.00";

    for (const bolygó of preset.bolygok || []) {
        const p = new Vektor(Number(bolygó.p?.x ?? 0), Number(bolygó.p?.y ?? 0));
        const v = new Vektor(Number(bolygó.v?.x ?? 0), Number(bolygó.v?.y ?? 0));
        const szin = bolygó.szin || "#9b8cff";
        const suruseg = Number(bolygó.suruseg ?? 0.02);
        new Egitest(bolygó.nev, Number(bolygó.tomeg ?? 30), p, v, szin, szin, galaxis, true, suruseg);
    }

    galaxis.nyilak_update();
    sulypontReset();
    setVelocityVisibility(showTrails.checked);
    frissit_bolygoinformacio();
    statusText.textContent = "Készen áll";
}

function inicializalas() {
    betolt_preset("nyolcasrendszer");
}

function szimulacios_lepes() {
    if (!galaxis || !galaxis.egitestei.length) {
        return;
    }

    galaxis.utkozeses_kolcsonhatas();
    galaxis.gravitacios_kolcsonhatas();
    galaxis.mozgat();
    galaxis.nyilak_update();
    elapsedTime += 0.016 * Number(speedInput.value);
    elapsedOutput.textContent = elapsedTime.toFixed(2);
    frissit_bolygoinformacio();
}

function update() {
    const multiplier = Math.max(1, Math.round(Number(speedInput.value)));
    for (let i = 0; i < multiplier; i += 1) {
        szimulacios_lepes();
    }
    globalID = requestAnimationFrame(update);
}

function start() {
    if (!galaxis || !galaxis.egitestei.length) {
        inicializalas();
    }
    animacio_inditasa();
}

function animacio_inditasa() {
    if (!running) {
        running = true;
        statusText.textContent = "Szimuláció fut";
        globalID = requestAnimationFrame(update);
    }
}

function animacio_leallitasa() {
    if (running) {
        cancelAnimationFrame(globalID);
        running = false;
        statusText.textContent = "Szüneteltetve";
    }
}

function getViewCenter() {
    const viewBox = vaszon.viewBox.baseVal || vaszon.viewBox.animVal;
    return new Vektor(viewBox.x + viewBox.width / 2, viewBox.y + viewBox.height / 2);
}

function sulypontReset() {
    if (!galaxis || !galaxis.egitestei.length) {
        return;
    }

    const s = galaxis.sulypont();
    const center = getViewCenter();
    const toCenter = Vektor.minus(center, s);

    galaxis.eltol(toCenter);
    galaxis.nyilak_update();
    frissit_bolygoinformacio();
}

function nagyit(e) {
    const c = 1.1;
    const viewBox = vaszon.viewBox.baseVal || vaszon.viewBox.animVal;
    const center = getViewCenter();

    const nextWidth = e.deltaY < 0 ? viewBox.width / c : viewBox.width * c;
    const nextHeight = e.deltaY < 0 ? viewBox.height / c : viewBox.height * c;

    const nextX = center.x - nextWidth / 2;
    const nextY = center.y - nextHeight / 2;

    vaszon.setAttribute('viewBox', `${nextX} ${nextY} ${nextWidth} ${nextHeight}`);
}

function bolygo_poziciojanak_megadasa(evt) {
    const cursorpt = cursorPoint(evt);
    const innen = new Vektor(cursorpt.x, cursorpt.y);
    document.getElementById('new-x').value = innen.x;
    document.getElementById('new-y').value = innen.y;
}

function bolygo_sebessegenek_megadasa(evt) {
    const cursorpt = cursorPoint(evt);
    const ide = new Vektor(cursorpt.x, cursorpt.y);
    const v = Vektor.minus(ide, new Vektor(parseFloat(document.getElementById('new-x').value), parseFloat(document.getElementById('new-y').value)));
    const sebesseg = v.oszt(100);
    document.getElementById('new-vx').value = sebesseg.x;
    document.getElementById('new-vy').value = sebesseg.y;
}

function bolygo_letevese() {
    const p = new Vektor(parseFloat(document.getElementById('new-x').value), parseFloat(document.getElementById('new-y').value));
    const v = new Vektor(parseFloat(document.getElementById('new-vx').value), parseFloat(document.getElementById('new-vy').value));
    const nev = document.getElementById('new-name').value.trim() || `Bolygó-${galaxis.egitestei.length + 1}`;
    const tomeg = parseFloat(document.getElementById('new-mass').value) || 30;
    const szin = document.getElementById('new-color').value || '#9b8cff';

    const bolygocska = new Egitest(nev, tomeg, p, v, szin, szin, galaxis);
    if (!showTrails.checked) {
        bolygocska.svgnyil.classList.add('lathatatlan');
    }
    galaxis.nyilak_update();
    selectedBodyIndex = galaxis.egitestei.length - 1;
    frissit_bolygoinformacio();
}

function cursorPoint(evt) {
    const pt = vaszon.createSVGPoint();
    pt.x = evt.clientX;
    pt.y = evt.clientY;
    return pt.matrixTransform(vaszon.getScreenCTM().inverse());
}

function selectPreviousBody() {
    if (!galaxis.egitestei.length) {
        return;
    }
    selectedBodyIndex = (selectedBodyIndex - 1 + galaxis.egitestei.length) % galaxis.egitestei.length;
    frissit_bolygoinformacio();
}

function selectNextBody() {
    if (!galaxis.egitestei.length) {
        return;
    }
    selectedBodyIndex = (selectedBodyIndex + 1) % galaxis.egitestei.length;
    frissit_bolygoinformacio();
}

startbtn.addEventListener("click", start);
stopbtn.addEventListener("click", animacio_leallitasa);
resetbtn.addEventListener("click", () => {
    if (running) {
        cancelAnimationFrame(globalID);
    }
    galaxis.reset();
    galaxis.nyilak_update();
    setVelocityVisibility(showTrails.checked);
    selectedBodyIndex = 0;
    frissit_bolygoinformacio();
    statusText.textContent = "Készen áll";
    running = false;
});
sulypontbtn.addEventListener("click", sulypontReset);
vaszon.addEventListener("wheel", nagyit);
vaszon.addEventListener("mousedown", bolygo_poziciojanak_megadasa, false);
vaszon.addEventListener("mouseup", bolygo_sebessegenek_megadasa, false);
document.getElementById("new-body-form").addEventListener("submit", (event) => {
    event.preventDefault();
    bolygo_letevese();
});
loadPresetBtn.addEventListener("click", () => betolt_preset(presetSelect.value));
previousBodyBtn.addEventListener("click", selectPreviousBody);
nextBodyBtn.addEventListener("click", selectNextBody);
showTrails.addEventListener("change", () => setVelocityVisibility(showTrails.checked));
speedInput.addEventListener("input", updateSpeedLabel);

updateSpeedLabel();
(async () => {
    await presetListaBetoltese();
    inicializalas();
    setVelocityVisibility(true);
    frissit_bolygoinformacio();

    const initialCenter = getViewCenter();
    if (galaxis && galaxis.egitestei.length) {
        const s = galaxis.sulypont();
        const toCenter = Vektor.minus(initialCenter, s);
        galaxis.eltol(toCenter);
        galaxis.nyilak_update();
    }
})();
