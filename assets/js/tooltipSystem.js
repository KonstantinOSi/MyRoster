// tooltipSystem.js

// База данных подсказок
const tooltipData = {
    // Оружейные ключевые слова
    "PISTOL": "This weapon can be fired even if the bearer moved during the Movement phase.",
    "RAPID FIRE 2": "This weapon makes 2 attacks instead of 1 when firing at targets within half range.",
    "DEVASTATING WOUNDS": "Each time an attack is made with this weapon, a Critical Wound inflicts D3 mortal wounds.",
    "ANTI-INFANTRY 4+": "Each time an attack is made with this weapon against an INFANTRY unit, on a hit roll of 4+, that attack has a Damage characteristic of 2.",
    "HAZARDOUS": "After this model shoots with this weapon, it suffers 1 mortal wound.",
    "PSYCHIC": "This weapon can target units that are within 12\" of an enemy unit and not within 1\" of any enemy models.",
    "SUSTAINED HITS 1": "Each time an attack is made with this weapon, on a wound roll of 6+, that attack scores one additional hit.",
    "SUSTAINED HITS 3": "Each time an attack is made with this weapon, on a wound roll of 4+, that attack scores one additional hit.",
    "MELTA 2": "Each time an attack is made with this weapon against a unit within half range, that attack has a Damage characteristic of 3.",
    "EXTRA ATTACKS": "The bearer fights with this weapon at the end of the Fight phase, after all other models have fought.",
    "LETHAL HITS": "Each time an attack is made with this weapon, on a wound roll of 6+, that attack inflicts a mortal wound.",
    "ASSAULT":"sdfsdfsdfsdfdsf",
    "HEAVY":"asdadaq111",

    // Способности
    "FEEL NO PAIN 4+": "Each time this model would lose a wound, roll one D6: on a 4+, that wound is not lost.",
    "FIGHTS FIRST": "This model fights at the start of the Fight phase, before models that do not have this ability.",
    "LONE OPERATIVE": "This model cannot be part of a unit that contains more than one model.",
    "DEEP STRIKE": "During deployment, this model can be set up in reserve.",
    "LEADER": "This model can be attached to certain units as a Leader.",

    // Другие ключевые слова
    "INFANTRY": "This unit is an INFANTRY unit.",
    "CHARACTER": "This unit is a CHARACTER unit.",
    "EPIC HERO": "This model has the EPIC HERO keyword.",
    "PSYKER": "This model has the PSYKER keyword.",
    "GRENADES": "This model has the GRENADES keyword.",
    "IMPERIUM": "This model has the IMPERIUM keyword.",
    "TACTICUS": "This model has the TACTICUS keyword.",
    "GRAVIS": "This model has the GRAVIS keyword.",
    "TERMINATOR": "This model has the TERMINATOR keyword.",
    "DEATHWING": "This model has the DEATHWING keyword."
};

function initTooltips() {
    // Добавляем подсказки ко всем существующим карточкам
    document.querySelectorAll('.card').forEach(card => {
        addTooltipsToCard(card);
    });
}

function addTooltipsToCard(card) {
    if (!card) return;

    // Ищем все ячейки с текстом
    const textElements = card.querySelectorAll('td, th, .card-footer');

    textElements.forEach(element => {
        let text = element.textContent;
        let hasReplacements = false;
        let newText = text;

        // 1. Обрабатываем ключевые слова в квадратных скобках (включая несколько слов)
        const bracketRegex = /\[([^\]]+)\]/g;
        newText = newText.replace(bracketRegex, (match, content) => {
            // Разбиваем содержимое скобок по запятым
            const keywords = content.split(',').map(k => k.trim());
            let replacedContent = content;

            // Заменяем каждое ключевое слово
            keywords.forEach(keyword => {
                if (tooltipData[keyword]) {
                    hasReplacements = true;
                    const tooltipHtml = `<span class="tooltip-word">${keyword}
            <span class="tooltip-popup">${tooltipData[keyword]}</span>
          </span>`;
                    replacedContent = replacedContent.replace(keyword, tooltipHtml);
                }
            });

            return `[${replacedContent}]`;
        });

        // 2. Обрабатываем ключевые слова между запятыми (вне скобок)
        const commaRegex = /(^|,\s*)([A-Z][A-Z0-9\s]+?)(?=\s*(,|$))/g;
        newText = newText.replace(commaRegex, (match, prefix, keyword, suffix) => {
            const cleanKeyword = keyword.trim();
            if (tooltipData[cleanKeyword] && !match.includes('[')) { // Не обрабатываем то, что уже в скобках
                hasReplacements = true;
                return `${prefix}<span class="tooltip-word">${keyword}
          <span class="tooltip-popup">${tooltipData[cleanKeyword]}</span>
        </span>`;
            }
            return match;
        });

        if (hasReplacements) {
            element.innerHTML = newText;
        }
    });

// Добавляем обработчики для адаптивного позиционирования
card.querySelectorAll('.tooltip-word').forEach(tooltipWord => {
    tooltipWord.addEventListener('mouseenter', adjustTooltipPosition);
});
}

function adjustTooltipPosition(e) {
    const tooltipWord = e.target;
    const tooltip = tooltipWord.querySelector('.tooltip-popup');
    if (!tooltip) return;

    // Получаем позиции
    const rect = tooltipWord.getBoundingClientRect();
    const tooltipRect = tooltip.getBoundingClientRect();
    const viewportWidth = window.innerWidth;

    // Сбрасываем позиционирование
    tooltip.style.left = '50%';
    tooltip.style.transform = 'translateX(-50%)';
    tooltip.style.right = 'auto';

    // Проверяем, выходит ли за правую границу
    if (rect.left + tooltipRect.width / 2 > viewportWidth - 10) {
        tooltip.style.left = 'auto';
        tooltip.style.right = '0';
        tooltip.style.transform = 'none';
    }
    // Проверяем, выходит ли за левую границу
    else if (rect.left - tooltipRect.width / 2 < 10) {
        tooltip.style.left = '0';
        tooltip.style.transform = 'none';
    }
}


// Делаем функции доступными глобально
window.initTooltips = initTooltips;
window.addTooltipsToCard = addTooltipsToCard;