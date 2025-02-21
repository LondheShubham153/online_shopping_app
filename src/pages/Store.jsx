import { Container, Row, Col, Button } from "react-bootstrap";
import { StoreItem } from "../components/StoreItem";
import { useShoppingItems } from "../context/ShoppingItemsContext";
import { SearchBar } from "../components/SearchBar";
import { useState, useMemo } from "react";

export default function Store() {
    const { products, isLoadingProducts } = useShoppingItems();
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilters, setActiveFilters] = useState(null);
    const [visibleProducts, setVisibleProducts] = useState(20);

    const filteredProducts = useMemo(() => {
        let filtered = products;

        if (searchQuery.trim()) {
            const searchLower = searchQuery.toLowerCase().trim();
            filtered = filtered.filter(product => (
                product.name.toLowerCase().includes(searchLower) ||
                product.brand.toLowerCase().includes(searchLower) ||
                product.category.toLowerCase().includes(searchLower) ||
                product.description.toLowerCase().includes(searchLower)
            ));
        }

        if (activeFilters) {
            if (activeFilters.category.length > 0) {
                filtered = filtered.filter(product =>
                    activeFilters.category.includes(product.category)
                );
            }

            if (activeFilters.priceRange.min) {
                filtered = filtered.filter(product =>
                    product.price >= Number(activeFilters.priceRange.min)
                );
            }
            if (activeFilters.priceRange.max) {
                filtered = filtered.filter(product =>
                    product.price <= Number(activeFilters.priceRange.max)
                );
            }

            if (activeFilters.rating > 0) {
                filtered = filtered.filter(product =>
                    product.rating >= activeFilters.rating
                );
            }
        }

        return filtered;
    }, [products, searchQuery, activeFilters]);

    const displayedProducts = filteredProducts.slice(0, visibleProducts);

    const loadMore = () => {
        setVisibleProducts(prev => prev + 20);
    };

    if (isLoadingProducts) {
        return (
            <Container className="text-center mt-5">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </Container>
        );
    }

    return (
        <Container>
            <SearchBar 
                onSearch={setSearchQuery} 
                onFilter={setActiveFilters}
            />
            <Row xs={1} sm={2} lg={3} xl={4} className="g-4">
                {displayedProducts.map(product => (
                    <Col key={product.id}>
                        <StoreItem {...product} />
                    </Col>
                ))}
            </Row>
            
            <div className="load-more-section">
                {filteredProducts.length === 0 && (searchQuery || activeFilters) ? (
                    <div className="text-center">
                        <h3>No products found</h3>
                        <p>Try adjusting your search criteria or filters</p>
                    </div>
                ) : filteredProducts.length > visibleProducts ? (
                    <>
                        <Button 
                            onClick={loadMore}
                            className="load-more-btn"
                        >
                            Load More Products
                        </Button>
                        <div className="products-shown-text">
                            Showing {displayedProducts.length} of {filteredProducts.length} products
                        </div>
                    </>
                ) : (
                    <div className="products-shown-text">
                        All {filteredProducts.length} products are displayed
                    </div>
                )}
            </div>
        </Container>
    );
}
