userBtn.addEventListener('click', () => {
    alunoContainer.classList.toggle('active');
});

const closeCartBtn = document.getElementById('close-cart-btn');
closeCartBtn.addEventListener('click', () => {
    cartItemsContainer.classList.remove('active');
});