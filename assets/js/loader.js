// loader.js

async function loadCard(unitId) {
    try {
        const response = await fetch(`assets/cards/${unitId}.html`);
        if (!response.ok) throw new Error("Не удалось загрузить карточку");
        const cardHtml = await response.text();

        const unit = window.unitData[unitId];
        if (!unit) {
            console.warn(`Данные для юнита ${unitId} не найдены`);
            return cardHtml;
        }

        const parser = new DOMParser();
        const doc = parser.parseFromString(cardHtml, 'text/html');
        const header = doc.querySelector('.card-header');

        if (header) {
            header.innerHTML = `
        <strong>${unit.name}</strong>
        <span>${unit.points} pts</span>
      `;
        }

        return doc.body.innerHTML;
    } catch (error) {
        console.error("Ошибка загрузки карточки:", error);
        return null;
    }
}

async function loadSelectedCards() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    const container = document.getElementById('cards-container');
    container.innerHTML = '';

    for (const checkbox of checkboxes) {
        const unitId = checkbox.dataset.unit;
        const cardHtml = await loadCard(unitId);
        if (cardHtml) {
            const cardDiv = document.createElement('div');
            cardDiv.className = 'card';
            cardDiv.innerHTML = cardHtml;
            cardDiv.dataset.unitId = unitId;
            container.appendChild(cardDiv);

            // Восстанавливаем выбор оружия для этой карточки
            setTimeout(() => {
                window.addTooltipsToCard(cardDiv);
                restoreWeaponChoicesForCard(unitId);
            }, 10);
        }
    }

    attachToggleHandlers();
}

function attachToggleHandlers() {
    document.querySelectorAll('.card-header').forEach(header => {
        header.addEventListener('click', () => {
            const card = header.closest('.card');
            const body = card.querySelector('.card-body');

            if (body.classList.contains('show')) {
                body.classList.remove('show');
                header.classList.add('collapsed');
            } else {
                body.classList.add('show');
                header.classList.remove('collapsed');
            }
        });
    });
}

// Делаем функции доступными глобально
window.loadCard = loadCard;
window.loadSelectedCards = loadSelectedCards;
window.attachToggleHandlers = attachToggleHandlers;