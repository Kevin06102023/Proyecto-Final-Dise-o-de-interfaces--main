document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('#productoModal .producto .btn');
    const viewCartButton = document.getElementById('view-cart');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalDisplay = document.getElementById('cart-total');
    const clearCartButton = document.getElementById('clear-cart');
    const payButton = document.getElementById('pay-button');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCartDisplay() {
        cartItemsContainer.innerHTML = '';
        let total = 0;

        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.innerHTML = `${item.name} - $${item.price.toFixed(2)} <button class="btn btn-sm btn-danger remove-item" data-index="${index}">Eliminar</button>`;
            cartItemsContainer.appendChild(li);
            total += item.price;
        });

        cartTotalDisplay.textContent = `Total: $${total.toFixed(2)}`;
        setupRemoveItemButtons();
    }

    function setupRemoveItemButtons() {
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', () => {
                const index = button.getAttribute('data-index');
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                updateCartDisplay();
            });
        });
    }

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const product = button.closest('.producto');
            const name = product.querySelector('h3').innerText;
            const price = parseFloat(product.querySelector('span').innerText.replace('$', ''));

            // Mostrar confirmación con SweetAlert antes de agregar al carrito
            swal({
                title: "¿Desea agregar este producto al carrito?",
                text: `${name} - $${price.toFixed(2)}`,
                icon: "info",
                buttons: {
                    cancel: {
                        text: "No",
                        value: false,
                        visible: true,
                        className: "",
                        closeModal: true,
                    },
                    confirm: {
                        text: "Sí",
                        value: true,
                        visible: true,
                        className: "",
                        closeModal: true
                    }
                },
                dangerMode: false,
            }).then((willAdd) => {
                if (willAdd) {
                    // Usuario hizo clic en "Sí", agregar al carrito
                    cart.push({ name, price });
                    localStorage.setItem('cart', JSON.stringify(cart));

                    // Mostrar mensaje de éxito
                    swal({
                        title: "Producto añadido",
                        text: `${name} ha sido añadido al carrito.`,
                        icon: "success",
                        button: "Aceptar",
                    });

                    // Actualizar la visualización del carrito después de agregar el producto
                    updateCartDisplay();
                } else {
                    // Usuario hizo clic en "No", no hacer nada o mostrar mensaje de cancelación
                    // En este ejemplo, no se hace nada adicional
                }
            });
        });
    });

    viewCartButton.addEventListener('click', () => {
        $('#productoModal').modal('hide');
        $('#carritoModal').modal('show');
        updateCartDisplay();
    });

    clearCartButton.addEventListener('click', () => {
        cart = [];
        localStorage.removeItem('cart');
        updateCartDisplay();
    });

    payButton.addEventListener('click', () => {
        // Aquí se podría realizar un procesamiento adicional antes de mostrar el mensaje de compra exitosa

        // Mostrar mensaje de compra exitosa
        swal({
            title: "¡Compra exitosa!",
            text: "Su compra ha sido procesada correctamente.",
            icon: "success",
            button: "Aceptar",
        });

        // Cerrar automáticamente el modal del carrito después de 3 segundos
        setTimeout(() => {
            $('#carritoModal').modal('hide');
        }, 3000); // 3000 milisegundos = 3 segundos
    });

    updateCartDisplay();
});
