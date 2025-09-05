// unitListGenerator.js

function generateUnitList() {
    const unitListElement = document.getElementById('unit-selection');

    if (!unitListElement) {
        console.error('Элемент #unit-selection не найден!');
        return;
    }

    if (!window.unitData) {
        console.error('unitData не загружен!');
        return;
    }

    // Загрузка сохранённых выбранных юнитов
    function getSavedSelectedUnits() {
        const saved = localStorage.getItem('selectedUnits');
        return saved ? JSON.parse(saved) : [];
    }

    // Сохранение выбранных юнитов
    function saveSelectedUnits() {
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        const selected = [];
        checkboxes.forEach(cb => {
            if (cb.checked) {
                selected.push(cb.dataset.unit);
            }
        });
        localStorage.setItem('selectedUnits', JSON.stringify(selected));
    }

    // Восстановление состояния
    const savedSelected = getSavedSelectedUnits();

    // Генерация списка
    unitListElement.innerHTML = '';
    for (const unitId in window.unitData) {
        const unit = window.unitData[unitId];
        const isChecked = savedSelected.includes(unitId) ? 'checked' : '';
        const li = document.createElement('li');
        li.innerHTML = `
      <label>
        <input type="checkbox" data-unit="${unitId}" ${isChecked} /> ${unit.name} (${unit.points} pts)
      </label>
    `;
        unitListElement.appendChild(li);
    }

    // Назначение событий
    const checkboxes = unitListElement.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            window.updateTotalPoints(); // Вызываем из script.js
            window.loadSelectedCards(); // Вызываем из loader.js
            saveSelectedUnits();
        });
    });
}

// Делаем функцию доступной глобально
window.generateUnitList = generateUnitList;