// Carregar componentes
document.addEventListener('DOMContentLoaded', function() {
    // Carregar header
    fetch('components/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-component').innerHTML = data;
            initMenu();
            updateActiveMenu();
            loadFontAwesome();
        })
        .catch(error => console.error('Erro ao carregar header:', error));

    // Carregar footer
    fetch('components/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-component').innerHTML = data;
        })
        .catch(error => console.error('Erro ao carregar footer:', error));

    // Garantir que os ícones permaneçam visíveis
    const observer = new MutationObserver(function() {
        document.querySelectorAll('.redes-sociais i').forEach(icon => {
            icon.style.display = 'inline-block';
            icon.style.visibility = 'visible';
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});

// Carregar Font Awesome dinamicamente
function loadFontAwesome() {
    if (!document.querySelector('.fa-bars')) {
        const faScript = document.createElement('script');
        faScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/js/all.min.js';
        document.head.appendChild(faScript);
    }
}

// Inicializar menu mobile
function initMenu() {
    const menuIcon = document.querySelector('.menu-icon');
    const closeIcon = document.querySelector('.close-icon');
    const menu = document.querySelector('.menu-navegacao');
    
    if(menuIcon) {
        menuIcon.addEventListener('click', () => {
            menu.classList.add('active');
        });
    }
    
    if(closeIcon) {
        closeIcon.addEventListener('click', () => {
            menu.classList.remove('active');
        });
    }
    
    // Fechar menu ao clicar nos links
    const navLinks = document.querySelectorAll('.lista-navegacao a');
    if(navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if(menu) menu.classList.remove('active');
            });
        });
    }
}

// Atualizar menu ativo
function updateActiveMenu() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.lista-navegacao a');
    
    if(navLinks.length > 0) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });
    }
}

// Função para corrigir CORS em ambiente local
function fixLocalCORS() {
    if (window.location.protocol === 'file:') {
        const originalFetch = window.fetch;
        window.fetch = function(url, options) {
            if (typeof url === 'string' && url.endsWith('.html')) {
                if (!options) options = {};
                if (!options.headers) options.headers = new Headers();
                options.headers.set('Access-Control-Allow-Origin', '*');
            }
            return originalFetch(url, options);
        };
    }
}

// Aplicar correção antes de carregar componentes
fixLocalCORS();