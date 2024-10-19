// Función para actualizar el carrito
async function updateCart(productId, quantity) {
    try {
        const response = await fetch('/cart/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId, quantity }),
        });
        const data = await response.json();
        location.reload();  // Recargar la página para reflejar los cambios
    } catch (error) {
        console.error('Error al actualizar el carrito:', error);
    }
}

// Función para eliminar un producto del carrito
async function removeFromCart(productId) {
    try {
        const response = await fetch('/cart/remove', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ productId }),
        });
        const data = await response.json();
        location.reload();  // Recargar la página para reflejar los cambios
    } catch (error) {
        console.error('Error al eliminar del carrito:', error);
    }
}


// Función para agregar un producto al carrito
async function addToCart(productId, price, imageUrl, quantity) {
    fetch('/cart/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            productId,
            price,
            imageUrl,
            quantity
        })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        window.location.href = '/cart';
    })
    .catch(error => {
        console.error('Error al agregar el producto al carrito:', error);
        alert('Error al agregar el producto al carrito');
    });
}



function checkout() {
    alert('¡Gracias por tu compra!');  
}
