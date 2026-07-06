
    /**
     * Átalakítja az ifm-et sugárra logaritmikus függvénnyel.
     * @param {number} ifm - az ifm érték
     * @returns {number} a sugar érték
     */
    function ifm2sugar(ifm) {
        const ifmStr = String(ifm ?? "").replaceAll(' ', '').trim();
        let result = 0;
        if (ifmStr === "n.a."){
            result = 1;
        } else if (ifmStr === ""){
            result = 1.5;
        } else {
            const ifmSzam = Number(ifmStr.replace(',', '.'));
            if (!Number.isFinite(ifmSzam) || ifmSzam < 0) {
                return 1;
            }
            result = 5 * Math.log2(1 + ifmSzam);
            // result = Math.sqrt(parseFloat(ifm)/Math.PI);
            // result = 0.1*parseFloat(ifm);
        }
        return Number.isFinite(result) && result > 0 ? result : 1;
    }

    function point2color(p){
        const ifmStr = String(p.ifm ?? "").replaceAll(' ', '').trim();
        if (ifmStr == "n.a.")
            return "black";
        if (ifmStr == "")
            return "yellow";
        if (p.tipus == "k")
            return "brown";
        if (p.tipus == "mv")
            return "green";
        if (p.tipus == "kmv")
            return "purple";
        return "magenta";
    }

    function escapeHtml(value) {
        return String(value ?? "")
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#39;");
    }

    function felirat(p){
        const nev = escapeHtml(p.nev);
        const megye = escapeHtml(p.megye);
        const mettol = escapeHtml(p.mettol);
        const meddig = escapeHtml(p.meddig);
        const ifm = escapeHtml(p.ifm);
        const kjifm = escapeHtml(p.kjifm);

        return `
            <div class="tooltip-nev">${nev}</div>
            <div class="tooltip-megye">${megye.toLowerCase()}</div>
            <div class="tooltip-ev">${mettol} - ${meddig}</div>
            <div class="tooltip-ifm">${ifm} ifm (körjegyzőség: ${kjifm})</div>
        `;
    }

    function intervallumMetsz(intervallum1, intervallum2) {        // Két zárt intervallum metszete nem üres: [mettol, meddig] és [evszazadTol, evszazadIg]
        let [mettol, meddig] = intervallum1;
        let [evszazadTol, evszazadIg] = intervallum2;
        return mettol <= evszazadIg && meddig >= evszazadTol;
    }

    function rajzol(points){

        points = points.filter(p => {
            if (p.tipus == "k" && !chb_tipus_k.checked) return false;
            if (p.tipus == "mv" && !chb_tipus_mv.checked) return false;
            if (p.tipus == "kmv" && !chb_tipus_kmv.checked) return false;
            return true;
        }).filter(p => {
            const mettol = Number(p.mettol);
            const meddig = Number(p.meddig);

            if (!Number.isFinite(mettol) || !Number.isFinite(meddig)) {
                return false;
            }

            return (
               (!chb_evkor18.checked || intervallumMetsz([mettol, meddig], [1700, 1799]))
            && (!chb_evkor19.checked || intervallumMetsz([mettol, meddig], [1800, 1899]))
            && (!chb_evkor20.checked || intervallumMetsz([mettol, meddig], [1900, 1999]))
            );
        });

        let kihagyott = 0;
        for (const p of points) {
            const lat = Number(String(p.lat ?? "").replace(',', '.'));
            const lon = Number(String(p.lon ?? "").replace(',', '.'));
            const radius = ifm2sugar(p.ifm);

            if (!Number.isFinite(lat) || !Number.isFinite(lon) || !Number.isFinite(radius) || radius <= 0) {
                kihagyott++;
                console.warn("Kihagyott hibas pont:", p);
                continue;
            }

            const szin = point2color(p);
            const marker = L.circleMarker([lat, lon], {
                radius: radius,
                stroke:false,
                fill: true,
                fillColor: szin,
                fillOpacity: 0.5,
                interactive: true,
            }).addTo(pontLayer);
    
            marker.bindTooltip(felirat(p), {
                permanent: false,
                sticky: true,
                direction: "top",
                opacity: 0.9,
                className: "telepules-tooltip"
            });

            marker.on("click", function () {
                alert("klikk!");
            });

            marker.on("mouseover", function () {
                this.openTooltip();
                this.setStyle({ fillOpacity: 0.9 });
            });
    
            marker.on("mouseout", function () {
                this.closeTooltip();
                this.setStyle({ fillOpacity: 0.5 });
            });
            
        }

        if (kihagyott > 0) {
            console.warn(`Rajzolas kozben ${kihagyott} hibas pont ki lett hagyva.`);
        }
    }

    function torolRajzoltPontok() {
        pontLayer.clearLayers();
    }


    console.log("verzió: 2024.07.04 6:42");

    const hely = [47.482663388987206, 19.087897524361903];

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


    setTimeout(() => map.invalidateSize(), 200);



    let chb_tipus_k = document.getElementById("chb_tipus_k");
    let chb_tipus_mv = document.getElementById("chb_tipus_mv");
    let chb_tipus_kmv = document.getElementById("chb_tipus_kmv");
    let chb_evkor18 = document.getElementById("chb_evkor18");
    let chb_evkor19 = document.getElementById("chb_evkor19");
    let chb_evkor20 = document.getElementById("chb_evkor20");

    let checkboxok = [chb_tipus_k, chb_tipus_mv, chb_tipus_kmv, chb_evkor18, chb_evkor19, chb_evkor20];

    for (const chb of checkboxok) {
        chb.addEventListener("change", () => {
            torolRajzoltPontok();
            rajzol(points);
        });
    }

    rajzol(points);


    // let mindengomb = document.getElementById("mindengomb");
    // let kgomb = document.getElementById("kgomb");
    // let kgomb18 = document.getElementById("kgomb18");
    // let kgomb19 = document.getElementById("kgomb19");
    // let kgomb20 = document.getElementById("kgomb20");
    // let mvgomb = document.getElementById("mvgomb");
    // let mvgomb18 = document.getElementById("mvgomb18");
    // let mvgomb19 = document.getElementById("mvgomb19");
    // let mvgomb20 = document.getElementById("mvgomb20");
    // let semmigomb = document.getElementById("semmigomb");


    // mindengomb.addEventListener("click", () => {
    //     torolRajzoltPontok();
    //     rajzol(points);
    // });

    // semmigomb.addEventListener("click", () => {
    //     torolRajzoltPontok();
    // });

    // kgomb.addEventListener("click", () => {
    //     const kpoints = points.filter(p => p.tipus == "k");
    //     torolRajzoltPontok();
    //     rajzol(kpoints);
    // });

    // kgomb18.addEventListener("click", () => {
    //     const kpoints = points.filter(p => p.tipus == "k" && Number(p.mettol) >= 1700);
    //     torolRajzoltPontok();
    //     rajzol(kpoints);
    // });

    // kgomb19.addEventListener("click", () => {
    //     const kpoints = points.filter(p => p.tipus == "k" && Number(p.mettol) >= 1800);
    //     torolRajzoltPontok();
    //     rajzol(kpoints);
    // });

    // kgomb20.addEventListener("click", () => {
    //     const kpoints = points.filter(p => p.tipus == "k" && Number(p.mettol) >= 1900);
    //     torolRajzoltPontok();
    //     rajzol(kpoints);
    // });

    // mvgomb.addEventListener("click", () => {
    //     const mvpoints = points.filter(p => p.tipus == "mv" || p.tipus == "kmv");
    //     torolRajzoltPontok();
    //     rajzol(mvpoints);
    // });

    // mvgomb18.addEventListener("click", () => {
    //     const mvpoints = points.filter(p => (p.tipus == "mv" || p.tipus == "kmv") && Number(p.mettol) >= 1700);
    //     torolRajzoltPontok();
    //     rajzol(mvpoints);
    // });

    // mvgomb19.addEventListener("click", () => {
    //     const mvpoints = points.filter(p => (p.tipus == "mv" || p.tipus == "kmv") && Number(p.mettol) >= 1800);
    //     torolRajzoltPontok();
    //     rajzol(mvpoints);
    // });

    // mvgomb20.addEventListener("click", () => {
    //     const mvpoints = points.filter(p => (p.tipus == "mv" || p.tipus == "kmv") && Number(p.mettol) >= 1900);
    //     torolRajzoltPontok();
    //     rajzol(mvpoints);
    // });
    

