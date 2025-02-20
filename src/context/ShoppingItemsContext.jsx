import {createContext, useContext, useState, useEffect} from "react";
import {demoProducts} from "../data/demoProducts";

const ShoppingItemsContext = createContext({});

export function useShoppingItems() {
    return useContext(ShoppingItemsContext);
}

export function ShoppingItemsProvider({children}) {
    const [products, setProducts] = useState([]);
    const [isLoadingProducts, setIsLoadingProducts] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Simulate API loading delay
        const loadProducts = async () => {
            try {
                setIsLoadingProducts(true);
                // Simulate network delay
                await new Promise(resolve => setTimeout(resolve, 1000));
                setProducts(demoProducts);
                setError(null);
            } catch (err) {
                setError("Failed to load products");
                console.error("Error loading products:", err);
            } finally {
                setIsLoadingProducts(false);
            }
        };

        loadProducts();
    }, []);

    async function addProduct(product) {
        try {
            const newProduct = {
                ...product,
                id: products.length + 1,
                createdAt: new Date().toISOString()
            };
            setProducts(prevProducts => [...prevProducts, newProduct]);
            return newProduct;
        } catch (error) {
            console.error("Error adding product:", error);
            throw error;
        }
    }

    async function updateProduct(id, updatedProduct) {
        try {
            setProducts(prevProducts =>
                prevProducts.map(product =>
                    product.id === id ? { ...product, ...updatedProduct } : product
                )
            );
        } catch (error) {
            console.error("Error updating product:", error);
            throw error;
        }
    }

    async function deleteProduct(id) {
        try {
            setProducts(prevProducts =>
                prevProducts.filter(product => product.id !== id)
            );
        } catch (error) {
            console.error("Error deleting product:", error);
            throw error;
        }
    }

    return (
        <ShoppingItemsContext.Provider
            value={{
                products,
                isLoadingProducts,
                error,
                addProduct,
                updateProduct,
                deleteProduct
            }}
        >
            {children}
        </ShoppingItemsContext.Provider>
    );
}