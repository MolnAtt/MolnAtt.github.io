class PolarVektor{
    /**
     * 
     * @param {number} f - a szög fokban
     * @param {number} r - a vektor hossza
     */
    constructor(f,r){
        this.f = f; 
        this.r = r;
    }

    /**
     * A megadott szöggel elforgatja a vektort.
     * @param {number} f - a forgatási szög fokban
     * @returns {PolarVektor}
     */
    forgatott(f){
        // 1. feladat
    }
    
    /**
     * Descartes-féle koordinátákra váltja a polárkoordinátákkal megadott (polár)vektort.
     * @returns {Vektor}
     */
    to_cartesian(){
        // 2. feladat
    }
}

/**
 * A radiánban megadott szöget átváltja fokba
 * @param {number} radian 
 * @returns {number}
 */
function to_degree(radian){
    // 3. feladat
}

/**
 * a fokban megadott szöget átváltja radiánba
 * @param {number} degree 
 * @returns {number}
 */
function to_radian(degree){
    // 4. feladat
}

class Vektor{
    /**
     * Létrehoz egy új vektort a megadott x és y Descartes-koordinátákkal.
     * @param {number} x 
     * @param {number} y 
     */
    constructor(x,y){
        this.x = x;
        this.y = y;
    }

    /**
     * Összead két vektort, és visszaadja az eredményt. Nem változtatja meg a paramétereket.
     * @param {Vektor} u 
     * @param {Vektor} v 
     * @returns {Vektor}
     */
    static plus(u,v){
        // 5. feladat
    }

    /**
     * Ez felel meg a vektoroknál a += műveletnek, de amúgy vissza is adja az új vektort. Megváltoztatja az aktuális vektort, és hozzáadja a paraméterként kapott vektort.
     * @param {Vektor} that 
     * @returns {Vektor}
     */
    hozzaad(that){
        // 6. feladat
    }

    /**
     * Kivonja a paraméterként kapott vektort az aktuális vektorból. Megváltoztatja az aktuális vektort, és visszaadja az új vektort. ez a -=-nek felel meg,
     * @param {Vektor} that 
     * @returns {Vektor}
     */
    csokkent(that){
        // 7. feladat
    }

    /**
     * Kivon két vektort, és visszaadja az eredményt. Nem változtatja meg a paramétereket.
     * ez a statikus metódus, így hívható: Vektor.minus(u,v), de a vektorinstancia metódus 
     * @param {Vektor} u 
     * @param {Vektor} v 
     * @returns {Vektor}
     */
    static minus(u,v){
        // 8. feladat
    }

    /**
     * Kivon két vektort, és visszaadja az eredményt. Nem változtatja meg a paramétereket. 
     * ez a vektorinstancia metódus, így hívható: u.minus(v) ez a - műveletnek felel meg.
     * @param {Vektor} u 
     * @param {Vektor} v 
     * @returns {Vektor}
     */
    minus(that){
        // 9. feladat
    }

    /**
     * Visszaadja a vektor ellentettjét. Nem változtatja meg a paramétert. Ez egy statikus metódus, a Vektor.ellentett(u) hívással érhető el.
     * @param {Vektor} u 
     * @returns {Vektor}
     */
    static ellentett(u){
        // 10. feladat
    }

    /**
     * Visszaadja a vektor ellentettjét. Nem változtatja meg a vektort. Ez a vektorinstancia metódusa, v.ellentett() hívással érhető el.
     * @returns {Vektor}
     */
    ellentett(){
        // 11. feladat
    }


    /**
     * Balra forgatja a vektort 90 fokkal. Nem változtatja meg a paramétert.
     * Ez egy statikus metódus, a Vektor.balraforgat90(u) hívással érhető el.
     * @param {Vektor} u 
     * @returns {Vektor}
     */
    static balraforgat90(u){
        // 12. feladat
    }

    /**
     * Balra forgatja a vektort 90 fokkal. Nem változtatja meg a paramétert. Ez a vektorinstancia metódusa, v.balraforgat90() hívással érhető el.
     * @returns {Vektor}
     */
    balraforgat90(){
        // 13. feladat
    }


    /**
     * Jobbra forgatja a vektort 90 fokkal. Nem változtatja meg a paramétert.
     * @param {Vektor} u 
     * @returns {Vektor}
     */
    static jobbraforgat90(u){
        // 14. feladat
    }

    /**
     * Jobbra forgatja a vektort 90 fokkal. Nem változtatja meg a paramétert. Ez a vektorinstancia metódusa, v.jobbraforgat90() hívással érhető el.
     * @returns {Vektor}
     */
    jobbraforgat90(){
        // 15. feladat
    }


    /**
     * Ez a skalárszorzás (jobbról). Visszaadja a vektor és a szám szorzatát. Nem változtatja meg a paramétereket. Ez egy statikus metódus, a Vektor.szamszoroz(u,a) hívással érhető el.
     * @param {Vektor} u 
     * @param {number} a 
     * @returns {Vektor}
     */
    static szor(u,a){
        // 16. feladat
    }

    /**
     * Ez a skalárszorzás (jobbról). Visszaadja a vektor és a szám szorzatát. Nem változtatja meg a paramétereket. Ez a vektorinstancia metódusa, v.szamszoroz(a) hívással érhető el.
     * @param {number} a 
     * @returns {Vektor}
     */
    szor(a){
        // 17. feladat
    }


    /**
     * Ez a skalárosztás (jobbról). Visszaadja a vektor és a szám hányadosát. Nem változtatja meg a paramétereket. Ez a vektorinstancia metódusa, v.oszt(a) hívással érhető el.
     * @param {number} a 
     * @returns {Vektor}
     */
    oszt(a){
        // 18. feladat
    }

    /**
     * Ez a skalárosztás (jobbról). Visszaadja a vektor és a szám hányadosát. Nem változtatja meg a paramétereket. Ez egy statikus metódus, a Vektor.szamoszt(u,a) hívással érhető el.
     * @param {Vektor} u 
     * @param {number} a 
     * @returns {Vektor}
     */
    static oszt(u,a){
        // 19. feladat
    }

    /**
     * Visszaadja a Descartes-koordinátákkal megadott vektor polárkoordinátás reprezentációját.
     * @returns {PolarVektor}
     */
    to_polar(){
        // 20. feladat
    }

    /**
     * Megadja a vektor hosszát. Nem változtatja meg a paramétert. Ez a vektorinstancia metódusa, v.hossz() hívással érhető el.
     * @returns {number}
     */
    hossz(){
        // 21. feladat
    }

    /**
     * Megadja a vektor hosszának négyzetét. Nem változtatja meg a paramétert. Ez a vektorinstancia metódusa, v.hossznegyzet() hívással érhető el.
     * @returns {number}
     */
    hossznegyzet(){
        // 22. feladat
    }

    /**
     * Elforgatja a vektort a megadott szöggel. Nem változtatja meg a paramétert. Ez egy statikus metódus, a Vektor.forgatott(u,fok) hívással érhető el.
     * @param {Vektor} u 
     * @param {number} fok 
     * @returns {Vektor}
     */
    static forgatott(u, fok){
        // 23. feladat
    }
    
    /**
     * Elforgatja a vektort a megadott szöggel. Nem változtatja meg a paramétert. Ez a vektorinstancia metódusa, v.forgatott(fok) hívással érhető el.
     * @param {number} fok 
     * @returns {Vektor}
     */
    forgatott(fok){
        // 24. feladat
    }
    

    /**
     * Visszaadja a vektor egységvektorát. Nem változtatja meg a paramétert. Ez a vektorinstancia metódusa, v.egysegvektora() hívással érhető el.
     * @returns {Vektor}
     */
    egysegvektora(){
        // 25. feladat
    }

    /**
     * Lemásolja a vektort, és visszaadja az új vektort. Nem változtatja meg a paramétert. Ez a vektorinstancia metódusa, v.masolat() hívással érhető el.
     * @returns {Vektor}
     */
    masolat(){
        // 26. feladat
    }
}