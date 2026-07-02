
    /**
     * Átalakítja az ifm-et sugárra logaritmikus függvénnyel.
     * @param {number} ifm - az ifm érték
     * @returns {number} a sugar érték
     */
    function ifm2sugar(ifm) {
        let result = 0;
        if (ifm.replaceAll(' ', '') === "n.a."){
            result = 1;
        } else if (ifm.replaceAll(' ', '') === ""){
            result = 1.5;
        } else {
            result = 5*Math.log2(1+parseFloat(ifm));
            // result = Math.sqrt(parseFloat(ifm)/Math.PI);
            // result = 0.1*parseFloat(ifm);
        }
        return result;
    }

    function point2color(p){
        if (p.ifm.replaceAll(' ', '') == "n.a.")
            return "black";
        if (p.ifm.replaceAll(' ', '') == "")
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
        for (const p of points) {
            const szin = point2color(p);
            const marker = L.circleMarker([p.lat, p.lon], {
                radius: ifm2sugar(p.ifm),
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
    }

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
