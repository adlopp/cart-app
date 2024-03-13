import { useState, useEffect } from "react";
import { CartView } from "./Components/CartView";
import { CatalogView } from "./Components/CatalogView";

// Inicializa los cartItems desde sessionStorage o establece un arreglo vacío si no hay datos
const initialCartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];

export const CartApp = () => {
    const [cartItems, setCartItems] = useState(initialCartItems);

    // Función para agregar productos al carrito
    const handlerAddProductCart = (product) => {
        const hasItem = cartItems.find((i) => i.product.id === product.id);

        if (hasItem) {
            const updatedCartItems = cartItems.map((item) => {
                if (item.product.id === product.id) {
                    return {
                        ...item,
                        quantity: item.quantity + 1,
                        total: (item.quantity + 1) * item.product.price,
                    };
                }
                return item;
            });
            
            setCartItems(updatedCartItems);
        } else {
            setCartItems([
                ...cartItems,
                {
                    product,
                    quantity: 1,
                    total: product.price,
                },
            ]);
        }
    };

    // Función para eliminar productos del carrito
    const handlerDeleteProductCart = (id) => {
        setCartItems(currentCartItems =>
            currentCartItems.filter(item => item.product.id !== id)
        );
    };

    // Usar useEffect para guardar los cartItems en sessionStorage cuando cambian
    useEffect(() => {
        sessionStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <>
            <div className="container">
                <h3>Cart App</h3>
                <CatalogView handler={product => handlerAddProductCart(product)} />
                {cartItems?.length > 0 && (
                    <div className="my-4 w-40">
                        <CartView items={cartItems} handlerDelete={handlerDeleteProductCart} />
                    </div>
                )}
            </div>
        </>
    );
};
