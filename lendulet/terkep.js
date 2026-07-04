
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

    function rajzol(points){
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
            }).addTo(map);
    
            marker.bindTooltip(p.felirat, {
                permanent: false,
                sticky: true,
                direction: "top",
                opacity: 0.9
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


    setTimeout(() => map.invalidateSize(), 200);


    rajzol(points);

