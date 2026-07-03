
async function telepulesKoordinatak(telepulesNev) {
    const url =
        "https://nominatim.openstreetmap.org/search?" +
        new URLSearchParams({
            city: telepulesNev,
            country: "Hungary",
            format: "jsonv2",
            limit: 1
        });

    const response = await fetch(url, {
        headers: {
            "Accept": "application/json"
        }
    });

    if (!response.ok) throw new Error("Hálózati hiba.");

    const data = await response.json();

    return data.length
        ? [Number(data[0].lat), Number(data[0].lon)]
        : null;
}

function zarojeles_resze(s){
    let match = s.match(/\(([^)]+)\)/);
    return match ? match[1] : null;
}

function zarojel_elotti_resze(s){
    let match = s.match(/^(.*?)\s*\(/);
    return match ? match[1] : null;
}



async function ellenorzes(p) {
    document.getElementById("telepulesnev").textContent = p.nev;
    let geonames_point = [p.lat, p.lon];
    document.getElementById("geonames_coord").textContent = `Geonames koordináták: ${geonames_point}`;
    document.getElementById("info").textContent = `tipus: ${p.tipus}, ifm: ${p.ifm}, szin: ${point2color(p)}, felirat: ${p.felirat}`;

    let OSM_point = await telepulesKoordinatak(p.nev);

    if (OSM_point === null) {
        let zarojeles_resz = zarojeles_resze(p.nev);
        if (zarojeles_resz) {
            OSM_point = await telepulesKoordinatak(zarojeles_resz.trim());
        }
    }

    if (OSM_point === null) {
        let zarojel_elotti_resz = zarojel_elotti_resze(p.nev);
        if (zarojel_elotti_resz) {
            const keresendo = zarojel_elotti_resz.trim();
            if (keresendo && keresendo !== p.nev.trim()) {
                OSM_point = await telepulesKoordinatak(keresendo);
            }
        }
    }

    
    if (!OSM_point) {
        document.getElementById("osm_coord").textContent = `OSM koordináták: Nincs adat`;
        document.getElementById("tavolsag").textContent = `Távolság: Nincs adat`;
        document.getElementById("figyelmezteto").textContent = "Figyelem! Nincs adat az OSM-ben!";
        document.getElementById("figyelmezteto").style.color = "red";
        return null;
    }
    document.getElementById("osm_coord").textContent = `OSM koordináták: ${OSM_point[0]}, ${OSM_point[1]}`;
    let tav = map.distance(geonames_point, OSM_point);
    document.getElementById("tavolsag").textContent = `Távolság: ${(tav/1000).toFixed(2)} km`;
    if (tav > 5000) {
        document.getElementById("figyelmezteto").textContent = "Figyelem! Az eltérés több, mint 5 km!";
        document.getElementById("figyelmezteto").style.color = "red";
    } else if (tav > 1000) {
        document.getElementById("figyelmezteto").textContent = "Figyelem! Az eltérés több, mint 1 km!";
        document.getElementById("figyelmezteto").style.color = "orange";
    } else {
        document.getElementById("figyelmezteto").textContent = "Ez OK";
        document.getElementById("figyelmezteto").style.color = "black";
    }

    // console.log(`Település: ${p.nev}`);
    // console.log(`Geonames koordináták: ${geonames_point}`);
    // console.log(`OSM koordináták: ${OSM_point}`);
    // console.log(`Távolság: ${tav} m`);
    // console.log(`tipus: ${p.tipus}, ifm: ${p.ifm}, szin: ${point2color(p)}, felirat: ${p.felirat}`);
    // console.log(p);
    return tav;
}


document.getElementById("kovgomb").addEventListener("click", async function () {
    let i = document.getElementById("telepulesindex").value++;
    let p = points[i];
    await ellenorzes(p);
});

async function ellenorzesMinden() {
    for (const p of points) {
        await ellenorzes(p);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Várakozás 1 másodpercig a következő lekérés előtt
    }
}

function ugrik_str(str, zoom = map.getZoom()) {
    let [lat_str, lon_str] = str.split(':')[1].split(',');
    console.log(`ugrik_str: lat_str=${lat_str}, lon_str=${lon_str}`);
    const lat = parseFloat(lat_str);
    const lon = parseFloat(lon_str);
    map.setView([lat, lon], zoom);
}

document.getElementById("geonamesgomb").addEventListener("click", async function () {
    ugrik_str(document.getElementById("geonames_coord").textContent);
});

document.getElementById("osmgomb").addEventListener("click", async function () {
    ugrik_str(document.getElementById("osm_coord").textContent);
});

async function auto_ellenorzes(mettol, meddig) {
    let gyanus = [];
    let rossz = [];
    let nemtalalt = [];
    let jo = [];
    for (let i = mettol; i <= meddig; i++) {
        let p = points[i];
        let tav = await ellenorzes(p);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Várakozás 1 másodpercig a következő lekérés előtt

        if (tav === null) {
            
            console.log(`${i.toString().padStart(4, '0')} / ${meddig}: Nincs adat: ${p.nev}`);
            nemtalalt.push({index : i, point : p});
        } else if (tav > 5000) {
            console.log(`${i.toString().padStart(4, '0')} / ${meddig}: Túl nagy eltérés: ${p.nev}, távolság: ${tav} m`);
            rossz.push({index : i, point : p});
        } else if (tav > 1000) {
            console.log(`${i.toString().padStart(4, '0')} / ${meddig}: Figyelmeztetés: ${p.nev}, távolság: ${tav} m`);
            gyanus.push({index : i, point : p});
        } else {
            console.log(`${i.toString().padStart(4, '0')} / ${meddig}: Rendben: ${p.nev}, távolság: ${tav} m`);
            jo.push({index : i, point : p});
        }
    }
    return {
        gyanus: gyanus, 
        rossz: rossz, 
        nemtalalt: nemtalalt, 
        jo: jo
    };
}
