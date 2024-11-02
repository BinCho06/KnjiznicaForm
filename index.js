let primary="#fff", secondary="#000";
function changeTheme() {
    const icon = document.getElementById("theme-icon");
    if (icon.src.endsWith("sun.ico")) {
        applyLightModeStyles();
        icon.src = "slike/moon.ico";
        icon.style.filter = "invert(0)";
    } else {
        applyDarkModeStyles();
        icon.src = "slike/sun.ico";
        icon.style.filter = "invert(1)";
    }
}
function applyDarkModeStyles() {
    document.body.style.backgroundColor = "#000";
    document.body.style.color = "#fff";
    document.documentElement.style.setProperty('--primary-color', "#111");
    document.documentElement.style.setProperty('--secondary-color', "#fff");
    primary="#000";
    secondary="#fff";
}
function applyLightModeStyles() {
    document.body.style.backgroundColor = "#fff";
    document.body.style.color = "#000";
    document.documentElement.style.setProperty('--primary-color', "#fff");
    document.documentElement.style.setProperty('--secondary-color', "#000");
    primary="#fff";
    secondary="#000";
}

function showKartica() {
    document.querySelector('.kartica').style.display = 'block';
}
function hideKartica() {
    document.querySelector('.kartica').style.display = 'none';
}

function showClanstvo() {
    document.getElementById("clanstvo").style.display = 'block';
    document.getElementById("izposoja").style.display = 'none';
    document.getElementById("menu-clanstvo").classList.add('active');
    document.getElementById("menu-izposoja").classList.remove('active');
}
function showIzposoja() {
    document.getElementById("clanstvo").style.display = 'none';
    document.getElementById("izposoja").style.display = 'block';
    document.getElementById("menu-clanstvo").classList.remove('active');
    document.getElementById("menu-izposoja").classList.add('active');
}


function initializeFlatpickr(element, setDateToday = false) {
    const instance = flatpickr(element, {
        dateFormat: "d-m-Y",
        minDate: "today",
    });
    if (setDateToday) {
        instance.setDate(new Date());
    }
    return instance;
}

// inicializiraj datepicker(Flatpickr) za privzeta prva 2 datuma
const firstDateInputs = document.querySelectorAll('.date-picker');
initializeFlatpickr(firstDateInputs[0], true);
initializeFlatpickr(firstDateInputs[1]);

document.getElementById('addButton').addEventListener('click', function() {
    const container = document.getElementById('repeaterContainer');
    const newField = document.createElement('div');
    newField.classList.add('repeater-field');
    newField.innerHTML = `
        <span class="name-only">Knjiga</span>
        <div class="field-content">
            <div class="solo">
                <label for="bookSelect">Knjiga:</label>
                <select name="book" class="bookSelect" required>
                <option value="">Izberi knjigo</option>
                <option value="Harry Potter">Harry Potter</option>
                <option value="Zverinicek">Zverinicek</option>
                <option value="Mali princ">Mali princ</option>
                <option value="Trije mušketirji">Trije mušketirji</option>
                <option value="Gospodar prstanov">Gospodar prstanov</option>
                </select>
            </div>
            <div class="duo">
                <div>
                    <label for="date1">Datum 1:</label>
                    <input type="text" name="date1[]" class="date-picker" placeholder="Izberite datum">
                </div>
                <div>
                    <label for="date2">Datum 2:</label>
                    <input type="text" name="date2[]" class="date-picker" placeholder="Izberite datum">
                </div>
            </div>
        </div>
        <button type="button" class="toggle-button">Skrij</button>
        <button type="button" class="delete-button">Izbriši</button>
    `;
    container.appendChild(newField);

    // inicializiraj datepicker(Flatpickr) za dodane knjige
    const newDateInputs = newField.querySelectorAll('.date-picker');
    initializeFlatpickr(newDateInputs[0], true);
    initializeFlatpickr(newDateInputs[1]);
});

document.getElementById('repeaterContainer').addEventListener('click', function(e) {
    if (e.target.classList.contains('delete-button')) {
        const fieldToRemove = e.target.parentElement;
        fieldToRemove.remove();
    }

    if (e.target.classList.contains('toggle-button')) {
        const fieldGroup = e.target.parentElement;
        const inputs = fieldGroup.querySelector('.field-content');
        const nameOnly = fieldGroup.querySelector('.name-only');
        const bookSelect = fieldGroup.querySelector('.bookSelect');

        if (inputs.style.display=="none") {
            inputs.style.display = 'block';
            nameOnly.style.display = 'none';
            e.target.textContent = 'Skrij';
        } else {
            inputs.style.display = 'none';
            if(bookSelect.value==""){
                nameOnly.textContent = "Nobena knjiga ni izbrana!";
            }else{
                nameOnly.textContent = "Knjiga: "+bookSelect.value;
            }
            nameOnly.style.display = 'inline';
            e.target.textContent = 'Prikaži';
        }
    }

    // Update name display on select change
    if (e.target.classList.contains('bookSelect')) {
        const fieldGroup = e.target.closest('.repeater-field');
        const nameOnly = fieldGroup.querySelector('.name-only');
        nameOnly.textContent = "Knjiga: "+e.target.value;
    }
});


//number input handling
document.getElementById('phone').addEventListener('input', function(e) {
    let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,3})/); //x je array [123456789, 123, 456, 789]
    e.target.value = !x[2] ? x[1] : !x[3] ? x[1]+"-"+x[2] : x[1]+"-"+x[2]+"-"+x[3];
});
document.getElementById('expiration-date').addEventListener('input', function(e) {
    let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,2})/);
    e.target.value = !x[2] ? x[1] : x[1]+"/"+x[2];
    
});
document.getElementById('card-number').addEventListener('input', function(e) {
    let x = e.target.value.replace(/\D/g, '').match(/(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})/);
    e.target.value = !x[2] ? x[1] : !x[3] ? x[1]+" "+x[2] : !x[4] ? x[1]+" "+x[2]+" "+x[3] : x[1]+" "+x[2]+" "+x[3]+" "+x[4];
}); 

document.getElementById('phone').addEventListener('keypress', function(e) {
    if(!/^\d$/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') {
        e.preventDefault();
    }
});
document.getElementById('postal-code').addEventListener('keypress', function(e) {
    if(!/^\d$/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') {
        e.preventDefault();
    }
});
document.getElementById('expiration-date').addEventListener('keypress', function(e) {
    if(!/^\d$/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') {
        e.preventDefault();
        return;
    }
    let position = e.target.selectionStart;
    let value = e.target.value;
    if(parseInt(e.key) > 1 && (position == 0 || position == 2)){
        e.target.value += "0";
    }
    if((position == 1 && value[0] == "1" || position == 4 && value[3] == "1")  && parseInt(e.key) > 2){
        e.preventDefault();
    }
});
document.getElementById('card-number').addEventListener('keypress', function(e) {
    if(!/^\d$/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') {
        e.preventDefault();
    }
});
document.getElementById('cvv').addEventListener('keypress', function(e) {
    if(!/^\d$/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') {
        e.preventDefault();
    }
});

function validateClanstvo(event){
    event.preventDefault();

    const requiredFields = document.querySelectorAll("#clanstvo [required]");
    let allFiled = true;

    requiredFields.forEach( (field) => {
        if(!field.value.trim()){
            allFiled = false;
        }
    });

    if(!allFiled){
        Swal.fire({
            background: primary,
            color: secondary,
            title: 'Napaka!',
            text: 'Prosimo, izpolnite vsa polja!',
            icon: 'error',
            confirmButtonText: 'OK'
        })
        return;
    }
    if(!/^\S+@\S+\.\S+$/.test(document.getElementById('email').value.trim())){
        Swal.fire({
            background: primary,
            color: secondary,
            title: 'Napaka!',
            text: 'Prosimo, vnesite veljavni e-mail naslov!',
            icon: 'error',
            confirmButtonText: 'OK'
        })
        return;
    }
    if(document.getElementById('postal-code').value.trim().length !== 4){
        Swal.fire({
            background: primary,
            color: secondary,
            title: 'Napaka!',
            text: 'Prosimo, vnesite veljavno poštno številko!',
            icon: 'error',
            confirmButtonText: 'OK'
        })
        return;
    }
    if(document.getElementById('phone').value.trim().length !== 11){
        Swal.fire({
            background: primary,
            color: secondary,
            title: 'Napaka!',
            text: 'Prosimo, vnesite veljavno telefonsko številko!',
            icon: 'error',
            confirmButtonText: 'OK'
        })
        return;
    }
    if(document.getElementById('kartica').checked){
        if(document.getElementById('expiration-date').value.trim().length !== 5){
            Swal.fire({
                background: primary,
                color: secondary,
                title: 'Napaka!',
                text: 'Prosimo, vnesite veljavni datum poteka!',
                icon: 'error',
                confirmButtonText: 'OK'
            })
            return;
        }
        if(document.getElementById('card-number').value.trim().length !== 19){
            Swal.fire({
                background: primary,
                color: secondary,
                title: 'Napaka!',
                text: 'Prosimo, vnesite veljavno številko kartice!',
                icon: 'error',
                confirmButtonText: 'OK'
            })
            return;
        }
        if(document.getElementById('cvv').value.trim().length !== 3){
            Swal.fire({
                background: primary,
                color: secondary,
                title: 'Napaka!',
                text: 'Prosimo, vnesite veljaven CVV!',
                icon: 'error',
                confirmButtonText: 'OK'
            })
            return;
        }
    }

    Swal.fire({
        background: primary,
        color: secondary,
        title: 'Uspešna včlanitev!',
        text: 'Vaše včlanitev v knjižnico je bila uspešno oddana!',
        icon: 'success',
        confirmButtonText: 'OK'
    }).then(() => {
        location.reload();
    });
}

function validateIzposoja(event){
    event.preventDefault();

    const requiredFields = document.querySelectorAll("#izposoja [required]");
    let allFiled = true;

    if(requiredFields.length == 0){
        Swal.fire({
            background: primary,
            color: secondary,
            title: 'Napaka!',
            text: 'Prosimo, dodaj kakšno knjigo!',
            icon: 'error',
            confirmButtonText: 'OK'
        })
        return;
    }

    requiredFields.forEach( (field) => {
        if(!field.value.trim()){
            allFiled = false;
        }
    });

    if(!allFiled){
        Swal.fire({
            background: primary,
            color: secondary,
            title: 'Napaka!',
            text: 'Prosimo, izpolnite vsa polja!',
            icon: 'error',
            confirmButtonText: 'OK'
        })
        return;
    }

    Swal.fire({
        background: primary,
        color: secondary,
        title: 'Uspešna izposoja!',
        text: 'Vaše izposoja knjig je bilo uspešno oddana!',
        icon: 'success',
        confirmButtonText: 'OK'
    }).then(() => {
        location.reload();
    });
}

document.getElementById('explain-cvv').addEventListener('click', function() {
    Swal.fire({
        background: primary,
        color: secondary,
        title: 'CVV (Card Verification Value)',
        text: 'je 3 ali 4-mestna številka, ki se nahaja na vaši kreditni kartici.',
        icon: 'info',
        confirmButtonText: 'OK'
    })    
});