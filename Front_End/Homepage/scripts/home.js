
localStorage.setItem('matchfound_menu', JSON.stringify(menuItems));

const grid = $('#menu-grid');
menuItems.forEach(item => {
    const card = `
            <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
                <div class="card menu-card shadow-sm text-center">
                    <div class="card-body d-flex flex-column">
                        <div class="menu-title">${item.name}</div>
                        <a href="${item.link}" class="btn menu-button">Acessar</a>
                    </div>
                </div>
            </div>
        `;
    grid.append(card);
});
