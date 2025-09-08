// script.js

document.addEventListener('DOMContentLoaded', () => {
    const totalPointsElement = document.getElementById('total-points');

    // Функция подсчёта очков
    function updateTotalPoints() {
        let sum = 0;
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                const unitId = checkbox.dataset.unit;
                const unit = window.unitData[unitId];
                if (unit && unit.points !== undefined) {
                    sum += unit.points;
                }
            }
        });
        totalPointsElement.textContent = sum;
    }

    // Делаем доступной глобально
    window.updateTotalPoints = updateTotalPoints;

    // Инициализация
    if (window.unitData) {
        window.generateUnitList();
        window.loadSelectedCards(); // Загружаем карточки
        window.initTooltips(); // Инициализируем подсказки
        setTimeout(() => {
            window.initWeaponSelectors(); // Инициализируем выбор оружия

        }, 100); // Ждём 100 мс, чтобы карточки загрузились
    } else {
        console.error("unitData не загружены");
    }

    updateTotalPoints();
});