// Cardápio gratuito com pratos para cada dia e turno
const freeMenuItems = {
    'segunda-feira': {
        'Manhã': [
            { id: 1, nome: 'Feijoada', foto: 'imagens/FeA.jpg?text=Feijoada' }
        ],
        'Tarde': [
            { id: 2, nome: 'Polenta', foto: 'imagens/polenta.jpg?text=Polenta' }
        ],
        'Noite': [
            { id: 3, nome: 'Frango Desfiado', foto: 'imagens/frango_desfiado.jpg?text=Frango+desfiado' }    
        ]
    },
    'terça-feira': {
        'Manhã': [
            { id: 4, nome: 'Macaronada', foto: 'imagens/macar.jpg?text=Macaronada' }
        ],
        'Tarde': [
            { id: 5, nome: 'Mandioca', foto: 'imagens/mandiocada.jpg?text=Mandioca' }
        ],
        'Noite': [
            { id: 6, nome: 'Torta Salgada', foto: 'imagens/torta_salgada.jpg?text=Torta+salgada' }
        ]
    },
    'quarta-feira': {
        'Manhã': [
            { id: 7, nome: 'Strogonoff', foto: 'imagens/strong.jpg?text=Strogonoff' }
        ],
        'Tarde': [
            { id: 8, nome: 'Carne Moida', foto: 'imagens/carne_moida.jpg?text=Carne+moida' }
        ],
        'Noite': [
            { id: 9, nome: 'Sopa', foto: 'imagens/sopa.jpg?text=Sopa' }
        ]
    },
    'quinta-feira': {
        'Manhã': [
            { id: 10, nome: 'Peixe Frito', foto: 'imagens/pf.jpg?text=Peixe+frito' }
        ],
        'Tarde': [
            { id: 11, nome: 'Cachorro Quente', foto: 'imagens/cachorro_quente.jpg?text=Cachorro+quente' }
        ],
        'Noite': [
            { id: 12, nome: 'Risoto', foto: 'imagens/risoto.jpg?text=Risoto' }
        ]
    },
    'sexta-feira': {
        'Manhã': [
            { id: 13, nome: 'Empanados', foto: 'imagens/empanado.png?text=Empanados' }
        ],
        'Tarde': [
            { id: 14, nome: 'Salada', foto: 'imagens/salada.jpg?text=Salada' }
        ],
        'Noite': [
            { id: 15, nome: 'Lasanha', foto: 'imagens/lasanha.jpg?text=Lasanha' }
        ]
    }
};

// Função para renderizar o cardápio gratuito baseado no dia e turno selecionado
function renderFreeMenu(dia, turno) {
    const freeMenuList = document.getElementById('free-menu-list');
    freeMenuList.innerHTML = ''; // Limpa a lista antes de renderizar

    const menu = freeMenuItems[dia][turno];

    menu.forEach(item => {
        const div = document.createElement('div');
        div.className = 'menu-item';
        div.innerHTML = `
            <img src="${item.foto}" alt="${item.nome}">
            <input type="text" value="${item.nome}" data-id="${item.id}" data-day="${dia}" data-shift="${turno}" />
            <input type="file" accept="image/*" data-id="${item.id}" data-day="${dia}" data-shift="${turno}" onchange="atualizarImagem(event, ${item.id}, '${dia}', '${turno}')" />
            <button onclick="salvarEdicao(${item.id}, '${dia}', '${turno}')">Salvar</button>
        `;
        freeMenuList.appendChild(div);
    });
}

// Função para atualizar a imagem
function atualizarImagem(event, id, dia, turno) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const newImageUrl = e.target.result;
            const menu = freeMenuItems[dia][turno];
            const item = menu.find(item => item.id === id);
            item.foto = newImageUrl;
            renderFreeMenu(dia, turno);  // Re-renderiza o menu atualizado
        };
        reader.readAsDataURL(file);
    }
}

// Função para salvar edições de produtos no cardápio
function salvarEdicao(id, dia, turno) {
    const nomeInput = document.querySelector(`input[data-id="${id}"][data-day="${dia}"][data-shift="${turno}"]`);
    const menu = freeMenuItems[dia][turno];
    const item = menu.find(item => item.id === id);
    item.nome = nomeInput.value;
    alert(`Prato ${item.nome} no turno ${turno} da ${dia} atualizado!`);
}

// Renderizar os pratos do cardápio ao selecionar o dia e turno
function handleDayShiftSelection() {
    const dia = document.getElementById('day-select').value;
    const turno = document.getElementById('shift-select').value;
    renderFreeMenu(dia, turno);
}

// Renderizar o cardápio ao carregar a página com o dia e turno padrão (segunda-feira, Manhã)
window.onload = function() {
    renderFreeMenu('segunda-feira', 'Manhã');
    renderOrders();
};

// Exemplo de dados dos pedidos
const orders = [
    { number: 1, student: 'Maria', product: 'Sanduíche', quantity: 2, total: 'R$ 20,00', paid: 'Pago', date: '23/10/2024' },
    { number: 2, student: 'João', product: 'Refrigerante', quantity: 1, total: 'R$ 5,00', paid: 'Falta Pagar', date: '25/10/2024' },
    // Adicione mais pedidos conforme necessário
];

function populateOrderTable() {
    const tbody = document.getElementById('order-table-body');
    tbody.innerHTML = ''; // Limpa o corpo da tabela

    orders.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${order.number}</td>
            <td>${order.student}</td>
            <td>${order.product}</td>
            <td>${order.quantity}</td>
            <td>${order.total}</td>
            <td>${order.paid}</td>
            <td>${order.date}</td>
        `;
        tbody.appendChild(row);
    });
}

// Chama a função para preencher a tabela ao carregar a página
document.addEventListener('DOMContentLoaded', populateOrderTable);