f = new Formulairo(formuladiv);
document.addEventListener('keydown', e => f.leut(e.key));
copyButton.addEventListener('click', vagolapra_masolas);

function vagolapra_masolas(e){
    navigator.clipboard.writeText(formuladiv.innerHTML.replaceAll("|",""));
        // .then(() => {
        //     // Értesítjük a felhasználót a másolás sikerességéről
        //     alert('A tartalom sikeresen másolva a vágólapra.');
        // })
        // .catch(err => {
        //     // Hibakezelés, ha a másolás sikertelen
        //     console.error('Hiba történt a másolás során: ', err);
        // });
    }
