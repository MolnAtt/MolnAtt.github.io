melyikfeladatgomb.addEventListener('click', katt);

let t = [' MÁJUSI RENDES', ' MÁJUSI IDEGEN NYELVŰ', 'z OKTÓBERI'];

function katt(e){
    let g = gepszaminput.value;
    if(g==0){
        alert('előbb add meg a gép számát, anélkül nehéz lesz kitalálnom.');
    } else {
        alert(`A ${2010+Math.floor(g/3)}. évi érettségiből kellene a${t[g%3]} érettségi adatbáziskezelésről szóló feladatát kidolgoznod.`);
    }
}