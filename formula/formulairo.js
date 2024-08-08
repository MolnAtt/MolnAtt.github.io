class Formulairo {
    constructor(div) {
        this.div = div;
        this.F = ''; 
        this.I = 0;
    }
    
    static szotar = { 
        A:'∀', 
        E:'∃', 
        k:'→', 
        b:'↔', 
        '=':'=', 
        // '!':'', 
        n:'¬', 
        v:'∨', 
        é:'∧',
        1:'⊤', 
        0:'⊥', 
        '(':'(', 
        ')':')',
        // 
        a:'a', 
        // b:'b', 
        c:'c', 
        d:'d', 
        e:'e', 
        f:'f', 
        g:'g', 
        h:'h', 
        i:'i', 
        j:'j', 
        // k:'k', 
        l:'l', 
        m:'m', 
        // n:'n', 
        o:'o', 
        p:'p', 
        q:'q', 
        r:'r', 
        s:'s', 
        t:'t', 
        u:'u', 
        w:'w', 
        x:'x', 
        y:'y', 
        z:'z',         
        // A:'A', 
        B:'B', 
        C:'C', 
        D:'D', 
        // E:'E', 
        F:'F', 
        G:'G', 
        H:'H', 
        I:'I', 
        J:'J', 
        K:'K', 
        L:'L', 
        M:'M', 
        N:'N', 
        O:'O', 
        P:'P', 
        Q:'Q', 
        R:'R', 
        S:'S', 
        T:'T', 
        U:'U', 
        V:'V', 
        W:'W', 
        X:'X', 
        Y:'Y', 
        Z:'Z', 
    };

    leut(s){
        console.log(s);
        if (s === 'ArrowLeft' && 0 < this.I){
            this.I--;
        }

        if (s === 'ArrowUp'){
            this.I = 0;
        }

        if (s === 'ArrowRight' && this.I < this.F.length){
            this.I++;
        }


        if (s === 'ArrowDown'){
            this.I = this.F.length - 1;
        }


        if (s === 'Backspace' && 0 < this.I){
            this.F = this.F.slice(0,this.I-1) + this.F.slice(this.I);
            this.I--;
        }

        if (s === 'Delete'){
            this.F = this.F.slice(0,this.I) + this.F.slice(this.I+1);
        }

        let c = Formulairo.szotar[s];
        if (c!=undefined){
            this.F = this.F.slice(0,this.I) + c + this.F.slice(this.I);
            this.I++;
        }

        this.frissit();
    }

    frissit(){
        this.div.innerHTML = this.F.slice(0,this.I) + '|' + this.F.slice(this.I);
    }

}
