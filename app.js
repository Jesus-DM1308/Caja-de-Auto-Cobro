// ===== BASE DE DATOS DE MEDICAMENTOS =====
const allMedications = [
    {
        id: 1,
        name: 'Salpifar 500mg',
        description: 'Analgésico y antipirético',
        price: 100,
        image: 'images/paracetamol_pisa.jpg',
        activos: ['Paracetamol'],
        farmaceutica: 'Pisa',
        instrucciones: 'Tomar 1 tableta cada 6-8 horas. No exceder 4 gramos al día.',
        advertencias: 'No consumir con alcohol. Consultar al médico en caso de enfermedad hepática.'
    },
    {
        id: 2,
        name: 'Dolprofen 400mg',
        description: 'Antiinflamatorio no esteroideo',
        price: 100,
        image: 'images/ibuprofeno400mg_collins.jpeg',
        activos: ['Ibuprofeno'],
        farmaceutica: 'Collins',
        instrucciones: 'Tomar 1 tableta cada 8 horas con alimentos.',
        advertencias: 'No usar en caso de úlcera gástrica. Evitar durante el embarazo.'
    },
    {
        id: 3,
        name: 'Vitamina C 1000mg',
        description: 'Suplemento vitamínico',
        price: 100,
        image: 'images/vitaminaC1000mg_naturallife.jpg',
        activos: ['Ácido Ascórbico'],
        farmaceutica: 'Natural Life',
        instrucciones: 'Tomar 1 tableta al día preferentemente con alimentos.',
        advertencias: 'Dosis altas pueden causar malestar estomacal.'
    },
    {
        id: 4,
        name: 'Amoxicilina 500mg',
        description: 'Antibiótico de amplio espectro',
        price: 100,
        image: 'images/amoxicilina500mg_pisa.jpg',
        activos: ['Amoxicilina'],
        farmaceutica: 'Pisa',
        instrucciones: 'Tomar 1 cápsula cada 8 horas durante 7-10 días. Completar el tratamiento.',
        advertencias: 'No usar si es alérgico a penicilinas. Consultar al médico durante el embarazo.'
    },
    {
        id: 5,
        name: 'Omeprazol 40mg',
        description: 'Inhibidor de la bomba de protones',
        price: 100,
        image: 'images/omeprazol40mg_amsa.png',
        activos: ['Omeprazol'],
        farmaceutica: 'Amsa',
        instrucciones: 'Tomar 1 cápsula en ayunas, 30 minutos antes del desayuno.',
        advertencias: 'Uso prolongado puede afectar la absorción de vitamina B12 y magnesio.'
    },
    {
        id: 6,
        name: 'Losartán 50mg',
        description: 'Antihipertensivo',
        price: 100,
        image: 'images/losartan50mg_pisa.jpeg',
        activos: ['Losartán'],
        farmaceutica: 'Pisa',
        instrucciones: 'Tomar 1 tableta al día a la misma hora.',
        advertencias: 'No recomendado para mujeres embarazadas. Puede causar mareos al inicio.'
    },
    {
        id: 7,
        name: 'Metformina 850mg',
        description: 'Antidiabético oral',
        price: 100,
        image: 'images/metformina850mg_amsa.jpg',
        activos: ['Metformina'],
        farmaceutica: 'Amsa',
        instrucciones: 'Tomar 1 tableta con alimentos, 2-3 veces al día según indicación médica.',
        advertencias: 'Puede causar malestar gastrointestinal. No consumir alcohol.'
    },
    {
        id: 8,
        name: 'Teinemia 20mg',
        description: 'Reductor de colesterol',
        price: 100,
        image: 'images/teinemia20mg_pisa.jpg',
        activos: ['Atorvastatina'],
        farmaceutica: 'Pisa',
        instrucciones: 'Tomar 1 tableta al día, preferentemente por la noche.',
        advertencias: 'Evitar consumo excesivo de toronja. Reportar dolor muscular inusual.'
    },
    {
        id: 9, 
        name: 'Laritol 10mg',
        description: 'Antihistamínico',
        price: 100,
        image: 'images/laritol_maver.jpg',
        activos: ['Loratadina'],
        farmaceutica: 'Maver',
        instrucciones: 'Tomar 1 tableta al día. No causa somnolencia en la mayoría de personas.',
        advertencias: 'Consultar al médico si tiene enfermedad hepática.'
    },
    {
        id: 10,
        name: 'Ranitidina 300mg',
        description: 'Antiulceroso y antiácido',
        price: 100,
        image: 'images/ranitidina300mg_amsa.png',
        activos: ['Ranitidina'],
        farmaceutica: 'Amsa',
        instrucciones: 'Tomar 1 tableta 30 minutos antes de las comidas o al acostarse.',
        advertencias: 'Consultar al médico si los síntomas persisten más de 2 semanas.'
    },
    {
        id: 11,
        name: 'Diclofenaco 50mg',
        description: 'Antiinflamatorio potente',
        price: 100,
        image: 'images/diclofenaco50mg_amsa.png',
        activos: ['Diclofenaco'],
        farmaceutica: 'Amsa',
        instrucciones: 'Tomar 1 tableta cada 8-12 horas con alimentos.',
        advertencias: 'No usar en caso de úlcera gástrica. Evitar durante el embarazo y lactancia.'
    },
    {
        id: 12,
        name: 'Caridoxen',
        description: 'Relajante muscular con analgésico',
        price: 100,
        image: 'images/caridoxen_mavi.jpg',
        activos: ['Naproxeno', 'Carisoprodol'],
        farmaceutica: 'Mavi',
        instrucciones: 'Tomar 1 tableta cada 8 horas. Tratamiento no debe exceder 2-3 semanas.',
        advertencias: 'Puede causar somnolencia. No conducir ni operar maquinaria. No consumir alcohol.'
    }
];

const medications = allMedications.slice(0, 4); // Solo los primeros 4 para bestsellers

// ===== ESTADO DEL CARRITO =====
let cart = [];

// ===== ESTADO DEL FILTRO =====
let currentFilter = 'medicamento';

// ===== TECLADO VIRTUAL =====
const keyboardNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

const keyboardLetters = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Ñ'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫'],
    ['ESPACIO', 'LIMPIAR']
];

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', () => {
    initializeBestsellers();
    initializeKeyboard();
    initializeFilter();
    loadCartFromStorage();
});

// ===== RENDERIZAR MEDICAMENTOS MÁS VENDIDOS =====
function initializeBestsellers() {
    const carousel = document.getElementById('bestsellersCarousel');

    medications.forEach((med, index) => {
        const card = createMedicationCard(med, index);
        carousel.appendChild(card);
    });
}

function createMedicationCard(medication, index) {
    const card = document.createElement('div');
    card.className = 'medication-card';
    card.style.animation = `fadeInUp 0.6s ease ${index * 0.1}s backwards`;

    card.innerHTML = `
        <img src="${medication.image}" alt="${medication.name}" class="medication-image">
        <h3 class="medication-name">${medication.name}</h3>
        <p class="medication-description">${medication.farmaceutica}</p>
        <div class="medication-footer">
            <span class="medication-price">$${medication.price.toFixed(2)}</span>
            <button class="add-to-cart-btn" data-id="${medication.id}">
                Ver más
            </button>
        </div>
    `;

    // Al hacer clic en la tarjeta, agregar al carrito
    card.addEventListener('click', (e) => {
        // Solo si no se hizo clic en el botón "Ver más"
        if (!e.target.closest('.add-to-cart-btn')) {
            addToCart(medication);
            showAddedFeedback(card);
        }
    });

    // Al hacer clic en "Ver más", abrir modal
    const viewMoreButton = card.querySelector('.add-to-cart-btn');
    viewMoreButton.addEventListener('click', (e) => {
        e.stopPropagation();
        openProductModal(medication);
    });

    return card;
}

// ===== FILTRO =====
function initializeFilter() {
    const filterButton = document.getElementById('filterButton');
    const filterDropdown = document.getElementById('filterDropdown');
    const filterOptions = document.querySelectorAll('.filter-option');
    const filterText = document.getElementById('filterText');

    // Toggle dropdown
    filterButton.addEventListener('click', (e) => {
        e.stopPropagation();
        filterDropdown.classList.toggle('active');
    });

    // Cerrar dropdown al hacer clic fuera
    document.addEventListener('click', () => {
        filterDropdown.classList.remove('active');
    });

    // Seleccionar filtro
    filterOptions.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();
            const filter = option.dataset.filter;
            currentFilter = filter;

            // Actualizar texto del botón
            if (filter === 'medicamento') {
                filterText.textContent = 'Medicamento';
            } else if (filter === 'activo') {
                filterText.textContent = 'Activo';
            } else if (filter === 'farmaceutica') {
                filterText.textContent = 'Farmacéutica';
            }

            // Cerrar dropdown
            filterDropdown.classList.remove('active');

            // Realizar búsqueda con el nuevo filtro
            performRealtimeSearch();
        });
    });
}

// ===== TECLADO VIRTUAL =====
function initializeKeyboard() {
    const keyboardContainer = document.getElementById('keyboardContainer');
    const searchInput = document.getElementById('searchInput');
    const searchInputMain = document.getElementById('searchInputMain');
    const searchContainerMain = document.getElementById('searchContainerMain');
    const virtualKeyboard = document.getElementById('virtualKeyboard');
    const keyboardClose = document.getElementById('keyboardClose');
    const mainContent = document.getElementById('mainContent');
    const searchResultsOverlay = document.getElementById('searchResultsOverlay');

    // Crear contenedor de letras
    const lettersDiv = document.createElement('div');
    lettersDiv.className = 'keyboard-letters';

    keyboardLetters.forEach(row => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'keyboard-row';

        row.forEach(key => {
            const keyButton = document.createElement('button');
            keyButton.className = 'key';
            keyButton.textContent = key;

            // Clases especiales
            if (key === 'ESPACIO') {
                keyButton.className += ' space';
                keyButton.textContent = 'ESPACIO';
            } else if (key === '⌫') {
                keyButton.className += ' backspace';
            } else if (key === 'LIMPIAR') {
                keyButton.className += ' clear';
            }

            keyButton.addEventListener('click', () => handleKeyPress(key));
            rowDiv.appendChild(keyButton);
        });

        lettersDiv.appendChild(rowDiv);
    });

    // Crear contenedor de números (una sola fila arriba)
    const numbersDiv = document.createElement('div');
    numbersDiv.className = 'keyboard-numbers';

    const numbersRow = document.createElement('div');
    numbersRow.className = 'keyboard-row';

    keyboardNumbers.forEach(key => {
        const keyButton = document.createElement('button');
        keyButton.className = 'key number';
        keyButton.textContent = key;

        keyButton.addEventListener('click', () => handleKeyPress(key));
        numbersRow.appendChild(keyButton);
    });

    numbersDiv.appendChild(numbersRow);

    // Agregar números primero (arriba), luego letras
    keyboardContainer.appendChild(numbersDiv);
    keyboardContainer.appendChild(lettersDiv);

    // Abrir teclado al hacer clic en el input principal o el contenedor
    searchInputMain.addEventListener('click', () => {
        virtualKeyboard.classList.add('active');
        searchResultsOverlay.classList.add('active');
        searchResultsOverlay.classList.add('with-keyboard');
        mainContent.classList.add('hidden');
        searchInput.focus();
    });

    searchContainerMain.addEventListener('click', () => {
        virtualKeyboard.classList.add('active');
        searchResultsOverlay.classList.add('active');
        searchResultsOverlay.classList.add('with-keyboard');
        mainContent.classList.add('hidden');
        searchInput.focus();
    });

    // Búsqueda en tiempo real mientras se escribe
    searchInput.addEventListener('input', () => {
        performRealtimeSearch();
    });

    // Cerrar teclado con lógica inteligente
    keyboardClose.addEventListener('click', () => {
        const hasSearchText = searchInput.value.trim() !== '';
        const stickySearchBar = document.getElementById('stickySearchBar');
        const stickySearchInput = document.getElementById('stickySearchInput');

        // Cerrar el teclado
        virtualKeyboard.classList.remove('active');
        searchResultsOverlay.classList.remove('with-keyboard');

        if (hasSearchText) {
            // Si hay texto, mantener la pantalla de resultados
            searchResultsOverlay.classList.add('active');
            mainContent.classList.add('hidden');

            // Mostrar buscador sticky
            stickySearchBar.classList.add('active');
            stickySearchInput.value = searchInput.value;
        } else {
            // Si no hay texto, volver a la pantalla de bienvenida
            searchResultsOverlay.classList.remove('active');
            mainContent.classList.remove('hidden');
            stickySearchBar.classList.remove('active');
            clearSearchResults();
        }
    });

    // Abrir teclado desde sticky search bar
    const stickySearchBar = document.getElementById('stickySearchBar');
    const stickySearchContainer = document.getElementById('stickySearchContainer');
    const stickySearchInput = document.getElementById('stickySearchInput');

    stickySearchContainer.addEventListener('click', () => {
        virtualKeyboard.classList.add('active');
        searchResultsOverlay.classList.add('with-keyboard');
        stickySearchBar.classList.remove('active');
        searchInput.focus();
    });

    stickySearchInput.addEventListener('click', () => {
        virtualKeyboard.classList.add('active');
        searchResultsOverlay.classList.add('with-keyboard');
        stickySearchBar.classList.remove('active');
        searchInput.focus();
    });
}

function handleKeyPress(key) {
    const searchInput = document.getElementById('searchInput');
    let currentValue = searchInput.value;

    if (key === '⌫') {
        // Backspace
        searchInput.value = currentValue.slice(0, -1);
    } else if (key === 'LIMPIAR') {
        // Limpiar todo
        searchInput.value = '';
        clearSearchResults();
    } else if (key === 'ESPACIO') {
        searchInput.value = currentValue + ' ';
    } else {
        searchInput.value = currentValue + key;
    }

    // Realizar búsqueda en tiempo real
    performRealtimeSearch();
}

// ===== BÚSQUEDA EN TIEMPO REAL =====
function performRealtimeSearch() {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim().toUpperCase();
    const resultsGrid = document.getElementById('resultsGridKeyboard');
    const resultsCount = document.getElementById('resultsCountKeyboard');

    if (query === '') {
        resultsCount.textContent = 'Escribe para buscar medicamentos';
        resultsGrid.innerHTML = '';
        return;
    }

    // Filtrar medicamentos según el filtro actual
    const results = allMedications.filter(med => {
        if (currentFilter === 'medicamento') {
            return med.name.toUpperCase().includes(query) ||
                med.description.toUpperCase().includes(query);
        } else if (currentFilter === 'activo') {
            return med.activos.some(activo => activo.toUpperCase().includes(query));
        } else if (currentFilter === 'farmaceutica') {
            return med.farmaceutica.toUpperCase().includes(query);
        }
        return false;
    });

    if (results.length > 0) {
        resultsCount.textContent = `${results.length} resultado${results.length !== 1 ? 's' : ''} encontrado${results.length !== 1 ? 's' : ''}`;

        // Limpiar resultados anteriores
        resultsGrid.innerHTML = '';

        // Mostrar nuevos resultados
        results.forEach((med, index) => {
            const card = createMedicationCard(med, index);
            resultsGrid.appendChild(card);
        });
    } else {
        resultsCount.textContent = 'No se encontraron resultados';
        resultsGrid.innerHTML = '<p style="text-align: center; color: var(--text-gray); padding: var(--spacing-xl); grid-column: 1 / -1;">Intenta con otro término de búsqueda</p>';
    }
}

function clearSearchResults() {
    const searchInput = document.getElementById('searchInput');
    const resultsGrid = document.getElementById('resultsGridKeyboard');
    const resultsCount = document.getElementById('resultsCountKeyboard');

    searchInput.value = '';
    resultsCount.textContent = 'Escribe para buscar medicamentos';
    resultsGrid.innerHTML = '';
}

// ===== MODAL DE PRODUCTO =====
function openProductModal(medication) {
    const modal = document.getElementById('productModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalActivos = document.getElementById('modalActivos');
    const modalFarmaceutica = document.getElementById('modalFarmaceutica');
    const modalInstrucciones = document.getElementById('modalInstrucciones');
    const modalAdvertencias = document.getElementById('modalAdvertencias');
    const modalPrice = document.getElementById('modalPrice');
    const modalAddBtn = document.getElementById('modalAddBtn');

    // Llenar datos del modal
    modalImage.src = medication.image;
    modalImage.alt = medication.name;
    modalTitle.textContent = medication.name;
    modalDescription.textContent = medication.description;

    // Mostrar activos (puede ser uno o varios)
    modalActivos.textContent = medication.activos.join(', ');

    // Mostrar farmacéutica
    modalFarmaceutica.textContent = medication.farmaceutica;

    // Mostrar instrucciones
    modalInstrucciones.textContent = medication.instrucciones;

    // Mostrar advertencias
    modalAdvertencias.textContent = medication.advertencias;

    modalPrice.textContent = `$${medication.price.toFixed(2)}`;

    // Mostrar modal
    modal.classList.add('active');

    // Event listener para agregar desde el modal
    const addHandler = () => {
        addToCart(medication);
        closeProductModal();
        modalAddBtn.removeEventListener('click', addHandler);
    };
    modalAddBtn.addEventListener('click', addHandler);
}

function closeProductModal() {
    const modal = document.getElementById('productModal');
    modal.classList.remove('active');
}

// Event listeners para cerrar el modal
document.getElementById('modalClose').addEventListener('click', closeProductModal);
document.getElementById('modalOverlay').addEventListener('click', closeProductModal);

// Feedback visual al agregar desde la tarjeta
function showAddedFeedback(card) {
    card.style.transform = 'scale(0.95)';
    card.style.borderColor = 'var(--success-green)';

    setTimeout(() => {
        card.style.transform = '';
        card.style.borderColor = '';
    }, 300);
}

// ===== CARRITO =====
function addToCart(medication) {
    // Verificar si el medicamento ya está en el carrito
    const existingItem = cart.find(item => item.id === medication.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...medication,
            quantity: 1
        });
    }

    updateCartDisplay();
    saveCartToStorage();
}

function updateCartDisplay() {
    const cartFloat = document.getElementById('cartFloat');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');

    if (cart.length === 0) {
        cartFloat.style.display = 'none';
        return;
    }

    // Mostrar carrito flotante
    cartFloat.style.display = 'flex';

    // Calcular total de items
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    // Calcular total de precio
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `$${totalPrice.toFixed(2)}`;

    // Agregar evento click al carrito flotante para abrir vista del carrito
    cartFloat.onclick = () => {
        if (cart.length > 0) {
            showCartView(cart[cart.length - 1]); // Mostrar con el último producto agregado
        }
    };
}

function saveCartToStorage() {
    localStorage.setItem('pharmacyCart', JSON.stringify(cart));
}

function loadCartFromStorage() {
    const savedCart = localStorage.getItem('pharmacyCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartDisplay();
    }
}

// ===== CART VIEW FUNCTIONS =====
let lastAddedMedication = null;

function showCartView(medication) {
    lastAddedMedication = medication;
    const cartView = document.getElementById('cartView');
    const mainContent = document.getElementById('mainContent');
    const searchResultsOverlay = document.getElementById('searchResultsOverlay');
    const stickySearchBar = document.getElementById('stickySearchBar');
    const virtualKeyboard = document.getElementById('virtualKeyboard');

    // Ocultar otras vistas
    mainContent.classList.add('hidden');
    searchResultsOverlay.classList.remove('active');
    stickySearchBar.classList.remove('active');
    virtualKeyboard.classList.remove('active');

    // Mostrar vista del carrito
    cartView.classList.add('active');

    // Actualizar secciones
    updateRecentMedicationCard(medication);
    updateCartHistoryList();
}

function hideCartView() {
    const cartView = document.getElementById('cartView');
    const mainContent = document.getElementById('mainContent');
    const stickySearchBar = document.getElementById('stickySearchBar');

    cartView.classList.remove('active');
    mainContent.classList.remove('hidden');
    stickySearchBar.classList.remove('active');
}

function updateRecentMedicationCard(medication) {
    const recentCard = document.getElementById('recentMedicationCard');

    recentCard.innerHTML = `
        <img src="${medication.image}" alt="${medication.name}" class="recent-med-image">
        <h3 class="recent-med-name">${medication.name}</h3>
        <p class="recent-med-price">$${medication.price.toFixed(2)}</p>
        <p class="recent-med-added">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6L9 17L4 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
            ¡Agregado al carrito!
        </p>
    `;
}

function updateCartHistoryList() {
    const cartItemsList = document.getElementById('cartItemsList');
    const cartItemsCount = document.getElementById('cartItemsCount');
    const cartTotalPrice = document.getElementById('cartTotalPrice');

    // Actualizar contador y total
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    cartItemsCount.textContent = `${totalItems} producto${totalItems !== 1 ? 's' : ''}`;
    cartTotalPrice.textContent = `$${totalPrice.toFixed(2)}`;

    // Limpiar lista
    cartItemsList.innerHTML = '';

    // Agregar items
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';

        cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="quantity-controls">
                    <button class="qty-btn minus" onclick="decreaseQuantity(${item.id})">
                        <svg width="12" height="2" viewBox="0 0 12 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1H11" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    </button>
                    <span class="qty-value">${item.quantity}</span>
                    <button class="qty-btn plus" onclick="increaseQuantity(${item.id})">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 1V11M1 6H11" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</div>
        `;

        cartItemsList.appendChild(cartItem);
    });
}

// Event listeners para la vista del carrito
document.addEventListener('DOMContentLoaded', () => {
    // Botón "Proceder al Pago"
    const cartCheckoutBtn = document.getElementById('cartCheckoutBtn');
    if (cartCheckoutBtn) {
        cartCheckoutBtn.addEventListener('click', () => {
            alert('Función de pago en desarrollo');
        });
    }

    // Buscador del carrito (abre el teclado)
    const cartSearchContainer = document.getElementById('cartSearchContainer');
    const cartSearchInput = document.getElementById('cartSearchInput');

    if (cartSearchContainer) {
        cartSearchContainer.addEventListener('click', () => {
            hideCartView();
            const searchInputMain = document.getElementById('searchInputMain');
            searchInputMain.click();
        });
    }

    if (cartSearchInput) {
        cartSearchInput.addEventListener('click', () => {
            hideCartView();
            const searchInputMain = document.getElementById('searchInputMain');
            searchInputMain.click();
        });
    }
});

// Modificar la función addToCart para mostrar la vista del carrito
function addToCart(medication) {
    // Verificar si el medicamento ya está en el carrito
    const existingItem = cart.find(item => item.id === medication.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...medication,
            quantity: 1
        });
    }

    updateCartDisplay();
    saveCartToStorage();

    // Mostrar vista del carrito
    showCartView(medication);
}

// ===== FUNCIONES DE CONTROL DE CANTIDAD =====
function increaseQuantity(id) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += 1;
        updateCartDisplay();
        saveCartToStorage();
        updateCartHistoryList();
    }
}

function decreaseQuantity(id) {
    const itemIndex = cart.findIndex(item => item.id === id);
    if (itemIndex !== -1) {
        const item = cart[itemIndex];
        if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            // Eliminar del carrito si la cantidad es 1
            cart.splice(itemIndex, 1);
        }
        updateCartDisplay();
        saveCartToStorage();
        updateCartHistoryList();
    }
}

// Exponer funciones al objeto window para que funcionen con onclick
window.increaseQuantity = increaseQuantity;
window.decreaseQuantity = decreaseQuantity;

// ===== PAYMENT FLOW =====
let currentPaymentMethod = null;
let cashAmount = 0;
let cardAmount = 0;

function showPaymentView() {
    const paymentView = document.getElementById('paymentView');
    const cartView = document.getElementById('cartView');
    const paymentTotalAmount = document.getElementById('paymentTotalAmount');
    const stickySearchBar = document.getElementById('stickySearchBar');

    // Calcular total del carrito
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Actualizar vista
    cartView.classList.remove('active');
    paymentView.classList.add('active');
    paymentTotalAmount.textContent = `$${totalPrice.toFixed(2)}`;
    stickySearchBar.classList.remove('active');

    // Resetear estado del pago
    currentPaymentMethod = null;
    cashAmount = 0;
    cardAmount = 0;
    document.getElementById('paymentDetails').innerHTML = '<p style="text-align: center; color: var(--text-gray);">Selecciona un método de pago</p>';
    document.getElementById('confirmPaymentBtn').disabled = true;

    // Remover clases selected
    document.querySelectorAll('.payment-method-btn').forEach(btn => btn.classList.remove('selected'));
}

function hidePaymentView() {
    const paymentView = document.getElementById('paymentView');
    const cartView = document.getElementById('cartView');

    paymentView.classList.remove('active');
    cartView.classList.add('active');
}

function selectPaymentMethod(method) {
    currentPaymentMethod = method;
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Actualizar botones seleccionados
    document.querySelectorAll('.payment-method-btn').forEach(btn => btn.classList.remove('selected'));
    event.target.closest('.payment-method-btn').classList.add('selected');

    const detailsContainer = document.getElementById('paymentDetails');

    if (method === 'card') {
        detailsContainer.innerHTML = `
            <div style="text-align: center;">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin: 0 auto 20px;">
                    <path d="M20 4H4C2.89 4 2.01 4.89 2.01 6L2 18C2 19.11 2.89 20 4 20H20C21.11 20 22 19.11 22 18V6C22 4.89 21.11 4 20 4ZM20 18H4V12H20V18ZM20 8H4V6H20V8Z" fill="var(--primary-blue)"/>
                </svg>
                <p style="font-size: 20px; color: var(--text-dark); margin-bottom: 10px;">Inserta o acerca tu tarjeta</p>
                <p style="font-size: 16px; color: var(--text-gray);">Total a cobrar: <strong>$${totalPrice.toFixed(2)}</strong></p>
            </div>
        `;
        cardAmount = totalPrice;
        document.getElementById('confirmPaymentBtn').disabled = false;
    } else if (method === 'cash') {
        detailsContainer.innerHTML = `
            <div class="payment-input-group">
                <label class="payment-label">Monto Recibido:</label>
                <input type="number" class="payment-input" id="cashInput" placeholder="0.00" min="0" step="0.01" oninput="validateCashPayment()">
            </div>
            <div id="changeDisplay" style="display: none;">
                <div class="payment-info-row highlight">
                    <span>Cambio:</span>
                    <span id="changeAmount">$0.00</span>
                </div>
            </div>
        `;
        document.getElementById('confirmPaymentBtn').disabled = true;
        setTimeout(() => document.getElementById('cashInput').focus(), 100);
    } else if (method === 'mixed') {
        detailsContainer.innerHTML = `
            <div class="payment-input-group">
                <label class="payment-label">Pago en Efectivo:</label>
                <input type="number" class="payment-input" id="mixedCashInput" placeholder="0.00" min="0" step="0.01" oninput="calculateMixedPayment()">
            </div>
            <div class="payment-info-row">
                <span>Restante en Tarjeta:</span>
                <span id="remainingCard">$${totalPrice.toFixed(2)}</span>
            </div>
        `;
        document.getElementById('confirmPaymentBtn').disabled = true;
        setTimeout(() => document.getElementById('mixedCashInput').focus(), 100);
    }
}

function validateCashPayment() {
    const cashInput = document.getElementById('cashInput');
    const cashValue = parseFloat(cashInput.value) || 0;
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (cashValue >= totalPrice) {
        const change = cashValue - totalPrice;
        document.getElementById('changeDisplay').style.display = 'block';
        document.getElementById('changeAmount').textContent = `$${change.toFixed(2)}`;
        document.getElementById('confirmPaymentBtn').disabled = false;
        cashAmount = cashValue;
    } else {
        document.getElementById('changeDisplay').style.display = 'none';
        document.getElementById('confirmPaymentBtn').disabled = true;
    }
}

function calculateMixedPayment() {
    const mixedCashInput = document.getElementById('mixedCashInput');
    const cashValue = parseFloat(mixedCashInput.value) || 0;
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const remaining = totalPrice - cashValue;

    if (remaining > 0 && cashValue > 0) {
        document.getElementById('remainingCard').textContent = `$${remaining.toFixed(2)}`;
        document.getElementById('confirmPaymentBtn').disabled = false;
        cashAmount = cashValue;
        cardAmount = remaining;
    } else if (cashValue >= totalPrice) {
        document.getElementById('remainingCard').textContent = '$0.00';
        document.getElementById('confirmPaymentBtn').disabled = false;
        cashAmount = totalPrice;
        cardAmount = 0;
    } else {
        document.getElementById('confirmPaymentBtn').disabled = true;
    }
}

function processPayment() {
    const confirmBtn = document.getElementById('confirmPaymentBtn');
    confirmBtn.disabled = true;
    confirmBtn.textContent = 'Procesando...';

    // Simular procesamiento de pago
    setTimeout(() => {
        showThankYouView();
    }, 2000);
}

function showThankYouView() {
    const paymentView = document.getElementById('paymentView');
    const thankYouView = document.getElementById('thankYouView');
    const stickySearchBar = document.getElementById('stickySearchBar');

    paymentView.classList.remove('active');
    thankYouView.classList.add('active');
    stickySearchBar.classList.remove('active');

    // Limpiar carrito
    cart = [];
    saveCartToStorage();
    updateCartDisplay();

    // Auto-redirigir después de 10 segundos
    setTimeout(() => {
        resetApp();
    }, 10000);
}

function resetApp() {
    const thankYouView = document.getElementById('thankYouView');
    const mainContent = document.getElementById('mainContent');

    thankYouView.classList.remove('active');
    mainContent.classList.remove('hidden');

    // Resetear todo
    cart = [];
    saveCartToStorage();
    updateCartDisplay();
}

// Modificar event listener del botón "Proceder al Pago"
document.addEventListener('DOMContentLoaded', () => {
    const cartCheckoutBtn = document.getElementById('cartCheckoutBtn');
    if (cartCheckoutBtn) {
        // Remover listener anterior
        cartCheckoutBtn.replaceWith(cartCheckoutBtn.cloneNode(true));
        const newCheckoutBtn = document.getElementById('cartCheckoutBtn');
        newCheckoutBtn.addEventListener('click', showPaymentView);
    }
});

// Exponer funciones al window
window.selectPaymentMethod = selectPaymentMethod;
window.hidePaymentView = hidePaymentView;
window.processPayment = processPayment;
window.resetApp = resetApp;
window.validateCashPayment = validateCashPayment;
window.calculateMixedPayment = calculateMixedPayment;

// ===== FIN DEL CÓDIGO =====