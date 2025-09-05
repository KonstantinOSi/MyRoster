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

        // Вставляем название и очки в карточку
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

       // return cardHtml;
    } catch (error) {
        console.error("Ошибка загрузки карточки:", error);
        return null;
    }
}

// Глобальная функция для загрузки всех выбранных карточек
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
            container.appendChild(cardDiv);
        }
    }

    // Привязываем поведение сворачивания/разворачивания
    attachToggleHandlers();
}

function attachToggleHandlers() {
    document.querySelectorAll('.card-header').forEach(header => {
        header.addEventListener('click', () => {
            const card = header.closest('.card');
            const body = card.querySelector('.card-body');
            const footer = card.querySelector('.card-footer');

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