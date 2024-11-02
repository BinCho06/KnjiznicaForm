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

function applyDarkModeStyles() {
    document.body.style.backgroundColor = "#000";
    document.body.style.color = "#fff";
    document.documentElement.style.setProperty('--primary-color', "#111");
    document.documentElement.style.setProperty('--secondary-color', "#fff");
}

function applyLightModeStyles() {
    document.body.style.backgroundColor = "#fff";
    document.body.style.color = "#000";
    document.documentElement.style.setProperty('--primary-color', "#fff");
    document.documentElement.style.setProperty('--secondary-color', "#000");
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
            console.log(bookSelect.value);
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