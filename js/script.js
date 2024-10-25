// Seleciona elementos necessários
const cartBtn = document.getElementById('cart-btn');
const confirmBtn = document.getElementById('confirm-btn');
const cartItemsContainer = document.querySelector('.cart-items-container');
const totalElement = document.querySelector('.total');
const cartItems = [];

// Função para adicionar um item ao carrinho
function addToCart(name, price) {
    const existingItem = cartItems.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        const item = { name, price: parseFloat(price), quantity: 1 };
        cartItems.push(item);
    }
    renderCartItems();
}

// Função para renderizar os itens do carrinho e calcular o total
function renderCartItems() {
    const cartItemsElement = document.querySelector('.cart-items');
    cartItemsElement.innerHTML = ''; // Limpa apenas a área de itens
    let total = 0;

    // Verifica se o carrinho está vazio
    if (cartItems.length === 0) {
        cartItemsElement.innerHTML = '<p class="empty-cart-message">Seu carrinho está vazio.</p>';
        confirmBtn.style.display = 'none'; // Esconde o botão de confirmar pedido
        totalElement.innerHTML = 'Total: R$0.00';
        return;
    }

    // Caso o carrinho tenha itens, renderiza-os
    cartItems.forEach((item, index) => {
        total += item.price * item.quantity;
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <span class="fas fa-times" onclick="removeFromCart(${index})"></span>
            <div class="content">
                <h3>${item.name} (x${item.quantity})</h3>
                <div class="price">R$${(item.price * item.quantity).toFixed(2)}</div>
            </div>
        `;
        cartItemsElement.appendChild(cartItem);
    });

    // Atualiza o total e exibe o botão de confirmar pedido
    totalElement.innerHTML = `Total: R$${total.toFixed(2)}`;
    confirmBtn.style.display = 'block';
}

// Função para remover um item do carrinho
function removeFromCart(index) {
    if (index >= 0 && index < cartItems.length) {
        cartItems[index].quantity -= 1;
        if (cartItems[index].quantity <= 0) {
            cartItems.splice(index, 1);
        }
        renderCartItems();
    }
}

// Adiciona eventos de clique às caixas de produtos
document.querySelectorAll('.box').forEach(box => {
    box.addEventListener('click', (event) => {
        const name = box.querySelector('[data-name]').dataset.name;
        const price = parseFloat(box.querySelector('[data-price]').dataset.price);
        addToCart(name, price);
    });
});

// Alterna a visibilidade do carrinho
cartBtn.addEventListener('click', () => {
    cartItemsContainer.classList.toggle('active');
});

// Função para mostrar o modal com a confirmação do pedido
function showModal(itemsList, totalValue) {
    const modal = document.getElementById('modal-confirmacao');
    const itensPedido = document.getElementById('itens-pedido');
    const totalPedido = document.getElementById('total-pedido');
    
    itensPedido.innerText = `Itens:\n${itemsList}`;
    totalPedido.innerText = `Total: R$${totalValue}`;
    
    modal.style.display = 'block';
    
    document.querySelector('.close-btn').onclick = () => {
        modal.style.display = 'none';
    };

    // Fecha o modal ao clicar fora dele
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
}

// Evento para confirmar o pedido
confirmBtn.addEventListener('click', () => {
    if (cartItems.length === 0) {
        alert("Seu carrinho está vazio! Adicione itens antes de confirmar o pedido.");
        return;
    }

    const itemsList = cartItems.map(item => `${item.name} (x${item.quantity})`).join("\n");
    const totalValue = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
    
    showModal(itemsList, totalValue);

    // Sua chave Pix
    const chavePix = '09311101907'; // Substitua pela sua chave Pix

    // Gera o QR Code para pagamento Pix
    const pixText = `00020101021126330014br.gov.bcb.pix0111${chavePix}5204000053039865802BR5919Leonardo Luis Klein6008BRASILIA62070503***6304AD00`; // Modifique conforme necessário

    $("#qrcode").empty(); // Limpa o QR Code anterior
    $("#qrcode").qrcode({
        text: pixText,
        width: 128,
        height: 128
    });
});


// Oculta o carrinho e a navbar ao rolar a página
window.onscroll = () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.classList.remove('active');
    }
    cartItemsContainer.classList.remove('active');
};

// Evento para fechar o carrinho
const closeCartBtn = document.getElementById('close-cart-btn');
closeCartBtn.addEventListener('click', () => {
    cartItemsContainer.classList.remove('active');
});

// Função para copiar a chave Pix
function copyToClipboard(text) {
    const tempInput = document.createElement('input');
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    alert('Chave Pix copiada!');
}

// Evento de clique no botão para copiar a chave Pix
document.getElementById('copy-pix-btn').addEventListener('click', () => {
    const chavePix = document.getElementById('chave-pix').innerText;
    copyToClipboard(chavePix);
});