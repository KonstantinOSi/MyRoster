// weaponSelector.js
function initWeaponSelectors() {
    // Обработчик кликов по картинкам оружия
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('weapon-image')) {
            const card = e.target.closest('.card');
            if (!card) return;

            const unitId = card.dataset.unitId;
            const selectedWeapon = e.target.dataset.weapon;
            const weaponType = e.target.dataset.type;

            // Обновляем выбор
            selectWeapon(unitId, selectedWeapon, weaponType);

            // Сохраняем выбор
            saveWeaponChoice(unitId, selectedWeapon, weaponType);
        }
    });

    // Восстанавливаем сохранённые выборы
    restoreWeaponChoices();
}

function selectWeapon(unitId, selectedWeapon, weaponType) {
    const card = document.querySelector(`.card[data-unit-id="${unitId}"]`);
    if (!card) return;

    // Убираем выделение со всех картинок этого типа
    const selector = `.weapon-image[data-type="${weaponType}"]`;
    card.querySelectorAll(selector).forEach(img => {
        img.classList.remove('selected');
        const weaponId = img.dataset.weapon;
        // Меняем на не выбранную картинку
        img.src = 'assets/images/blood-drop.png';
    });

    // Добавляем выделение выбранной картинке
    const selectedImg = card.querySelector(`.weapon-image[data-weapon="${selectedWeapon}"]`);
    if (selectedImg) {
        selectedImg.classList.add('selected');
        selectedImg.src = 'assets/images/blood-drop-selected.png';
    }

    // Обновляем подсветку в таблице
    updateWeaponHighlight(unitId, selectedWeapon, weaponType);
}

function saveWeaponChoice(unitId, weaponId, weaponType) {
    const storageKey = weaponType === 'melee' ? 'meleeWeaponChoices' : 'rangeWeaponChoices';
    const weaponChoices = JSON.parse(localStorage.getItem(storageKey) || '{}');
    weaponChoices[unitId] = weaponId;
    localStorage.setItem(storageKey, JSON.stringify(weaponChoices));
}

function restoreWeaponChoices() {
    document.querySelectorAll('.card').forEach(card => {
        const unitId = card.dataset.unitId;
        if (!unitId) return;

        const unit = window.unitData[unitId];
        if (!unit) return;

        // Восстанавливаем дальнобойное оружие
        const rangeWeaponChoices = JSON.parse(localStorage.getItem('rangeWeaponChoices') || '{}');
        const savedRangeWeapon = rangeWeaponChoices[unitId];
        if (savedRangeWeapon) {
         //   updateWeaponHighlight(unitId, rangeWeaponChoices[unitId]);
            updateWeaponHighlight(unitId, savedRangeWeapon, 'range');
        } else if (unit.defaultRange) {
            updateWeaponHighlight(unitId, unit.defaultRange);
            saveRangeWeaponChoice(unitId, unit.defaultRange);
        }

        // Восстанавливаем ближнее оружие
        const meleeWeaponChoices = JSON.parse(localStorage.getItem('meleeWeaponChoices') || '{}');
        const savedMeleeWeapon = meleeWeaponChoices[unitId];
        if (savedMeleeWeapon) {
            updateWeaponHighlight(unitId, meleeWeaponChoices[unitId]);
        } else if (unit.defaultMelee) {
            updateWeaponHighlight(unitId, unit.defaultMelee);
            saveMeleeWeaponChoice(unitId, unit.defaultMelee);
        }
    });
}

function restoreWeaponChoicesForCard(unitId) {
    const unit = window.unitData[unitId];
    if (!unit) return;

    // Восстанавливаем дальнобойное оружие
    const rangeWeaponChoices = JSON.parse(localStorage.getItem('rangeWeaponChoices') || '{}');
    if (rangeWeaponChoices[unitId]) {
        updateWeaponHighlight(unitId, rangeWeaponChoices[unitId]);
    } else if (unit.defaultRange) {
        updateWeaponHighlight(unitId, unit.defaultRange);
        saveRangeWeaponChoice(unitId, unit.defaultRange);
    }

    // Восстанавливаем ближнее оружие
    const meleeWeaponChoices = JSON.parse(localStorage.getItem('meleeWeaponChoices') || '{}');
    if (meleeWeaponChoices[unitId]) {
        updateWeaponHighlight(unitId, meleeWeaponChoices[unitId]);
    } else if (unit.defaultMelee) {
        updateWeaponHighlight(unitId, unit.defaultMelee);
        saveMeleeWeaponChoice(unitId, unit.defaultMelee);
    }
}

function updateWeaponHighlight(unitId, selectedWeapon, weaponType) {
    if (!unitId) return;

    const card = document.querySelector(`.card[data-unit-id="${unitId}"]`);
    if (!card) {
        console.warn('Card not found for unit:', unitId);
        return;
    }

    // Убираем выделение только для этого типа оружия
    const selector = weaponType === 'melee' ? '.melee-option' : '.range-option';
    card.querySelectorAll(selector).forEach(row => {
        row.classList.remove('selected');
    });
    // Добавляем выделение выбранному оружию
    const selectedRow = card.querySelector(`[data-weapon="${selectedWeapon}"]`);
    console.log('Selected row:', selectedRow);

    if (selectedRow) {
        selectedRow.classList.add('selected');
        console.log('Row highlighted');
    } else {
        console.warn('Row not found for weapon:', selectedWeapon);
    }

    // Отмечаем выбранный радио-баттон
    const radio = card.querySelector(`input[value="${selectedWeapon}"]`);
    if (radio) {
        radio.checked = true;
    }
}

function saveMeleeWeaponChoice(unitId, weaponId) {
    const weaponChoices = JSON.parse(localStorage.getItem('meleeWeaponChoices') || '{}');
    weaponChoices[unitId] = weaponId;
    localStorage.setItem('meleeWeaponChoices', JSON.stringify(weaponChoices));
}

function saveRangeWeaponChoice(unitId, weaponId) {
    const weaponChoices = JSON.parse(localStorage.getItem('rangeWeaponChoices') || '{}');
    weaponChoices[unitId] = weaponId;
    localStorage.setItem('rangeWeaponChoices', JSON.stringify(weaponChoices));
}

// Делаем функции доступными глобально
window.initWeaponSelectors = initWeaponSelectors;
window.restoreWeaponChoices = restoreWeaponChoices;
window.restoreWeaponChoicesForCard = restoreWeaponChoicesForCard;
window.saveWeaponChoice = saveWeaponChoice;
//window.saveMeleeWeaponChoice = saveMeleeWeaponChoice;
//window.saveRangeWeaponChoice = saveRangeWeaponChoice;
window.updateWeaponHighlight = updateWeaponHighlight;