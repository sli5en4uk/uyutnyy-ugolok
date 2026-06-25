$(document).ready(function () {

    // Защита — код работает только на странице блога
    if (!$('.blog-article').length) {
        return;
    }

    const jsonData = [
        {
            image: "portfolio/01.png",
            title: "Как правильно варить эспрессо дома",
            text: "Многие думают, что хороший эспрессо можно получить только в кофейне...",
            date: "3 дня назад",
            tags: ["кофе", "рецепты", "эспрессо"]
        },
        {
            image: "portfolio/02.png",
            title: "5 лучших сортов кофе для капучино",
            text: "Выбор зерна сильно влияет на вкус напитка...",
            date: "1 неделю назад",
            tags: ["кофе", "капучино"]
        },
        {
            image: "portfolio/03.png",
            title: "Почему мы не используем сиропы",
            text: "История о натуральных ингредиентах...",
            date: "2 недели назад",
            tags: ["натуральное"]
        },
        {
            image: "portfolio/04.png",
            title: "Осеннее меню уже в Уютном уголке",
            text: "Тыквенный латте, имбирный раф...",
            date: "3 недели назад",
            tags: ["меню", "осень"]
        }
    ];

    const cardHtml = `
        <section class="blog-card">
            <div class="blog-cover"></div>
            <div class="blog-body">
                <div class="blog-title"><h2></h2></div>
                <p class="blog-text"></p>
                <div class="blog-tags"><ul></ul></div>
            </div>
            <div class="blog-footer">
                <span class="blog-published-date"></span>
            </div>
        </section>
    `;

    function drawCards(data) {
        $('.blog-container').html('');
        data.forEach(item => {
            let card = $(cardHtml);
            card.find('.blog-cover').css('background-image', `url('img/${item.image}')`);
            card.find('.blog-title h2').text(item.title);
            card.find('.blog-text').text(item.text);
            card.find('.blog-published-date').text(item.date);

            let tagsHtml = '';
            item.tags.forEach(tag => {
                tagsHtml += `<li><a href="#" class="blog-tag">${tag}</a></li>`;
            });
            card.find('.blog-tags ul').html(tagsHtml);

            $('.blog-container').append(card);
        });
    }

    // Поиск по кнопке
    $('.search-do').on('click', function () {
        const searchValue = $('#search-text').val().trim().toLowerCase();
        if (searchValue === '') {
            drawCards(jsonData);
            return;
        }
        filter(searchValue, jsonData);
    });

    // Поиск по Enter
    $('#search-text').on('keypress', function (e) {
        if (e.which === 13) {
            const searchValue = $(this).val().trim().toLowerCase();
            filter(searchValue, jsonData);
        }
    });

    function filter(value, data) {
        const newData = data.filter(item =>
            item.title.toLowerCase().includes(value) ||
            item.text.toLowerCase().includes(value) ||
            item.tags.some(tag => tag.toLowerCase().includes(value))
        );
        drawCards(newData);
    }

    // Инициализация
    drawCards(jsonData);
});