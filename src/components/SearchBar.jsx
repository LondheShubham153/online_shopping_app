import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes, faFilter } from '@fortawesome/free-solid-svg-icons';
import { Modal, Form, Button, Row, Col } from 'react-bootstrap';

export function SearchBar({ onSearch, onFilter }) {
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        category: [],
        brand: [],
        rating: 0,
        priceRange: { min: '', max: '' }
    });

    const categories = [
        'Smartphones',
        'Laptops',
        'PC Accessories',
        'Smartphone Accessories',
        'Audio',
        'Gaming',
        'Wearables'
    ];

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        onSearch(value);
    };

    const clearSearch = () => {
        setQuery('');
        onSearch('');
    };

    const handleFilterChange = (type, value) => {
        setFilters(prev => ({
            ...prev,
            [type]: value
        }));
    };

    const handleCategoryChange = (category) => {
        setFilters(prev => ({
            ...prev,
            category: prev.category.includes(category)
                ? prev.category.filter(c => c !== category)
                : [...prev.category, category]
        }));
    };

    const applyFilters = () => {
        onFilter(filters);
        setShowFilters(false);
    };

    const resetFilters = () => {
        setFilters({
            category: [],
            brand: [],
            rating: 0,
            priceRange: { min: '', max: '' }
        });
        onFilter(null);
    };

    return (
        <>
            <div className="search-container">
                <form onSubmit={(e) => e.preventDefault()} className={`search-form ${isFocused ? 'focused' : ''}`}>
                    <FontAwesomeIcon icon={faSearch} className="search-icon" />
                    <input
                        type="text"
                        value={query}
                        onChange={handleChange}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder="Search products by name, brand, or category..."
                        className="search-input"
                        autoComplete="off"
                    />
                    {query && (
                        <button
                            type="button"
                            onClick={clearSearch}
                            className="clear-button"
                            aria-label="Clear search"
                        >
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    )}
                    <button
                        type="button"
                        onClick={() => setShowFilters(true)}
                        className="filter-button"
                        aria-label="Show filters"
                    >
                        <FontAwesomeIcon icon={faFilter} />
                    </button>
                </form>
            </div>

            <Modal 
                show={showFilters} 
                onHide={() => setShowFilters(false)}
                className="filter-modal"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Filter Products</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-4">
                            <Form.Label>Categories</Form.Label>
                            <div className="category-grid">
                                {categories.map(category => (
                                    <Form.Check
                                        key={category}
                                        type="checkbox"
                                        label={category}
                                        checked={filters.category.includes(category)}
                                        onChange={() => handleCategoryChange(category)}
                                        className="category-checkbox"
                                    />
                                ))}
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label>Price Range</Form.Label>
                            <Row>
                                <Col>
                                    <Form.Control
                                        type="number"
                                        placeholder="Min"
                                        value={filters.priceRange.min}
                                        onChange={(e) => handleFilterChange('priceRange', { 
                                            ...filters.priceRange, 
                                            min: e.target.value 
                                        })}
                                    />
                                </Col>
                                <Col>
                                    <Form.Control
                                        type="number"
                                        placeholder="Max"
                                        value={filters.priceRange.max}
                                        onChange={(e) => handleFilterChange('priceRange', { 
                                            ...filters.priceRange, 
                                            max: e.target.value 
                                        })}
                                    />
                                </Col>
                            </Row>
                        </Form.Group>

                        <Form.Group className="mb-4">
                            <Form.Label>Minimum Rating</Form.Label>
                            <Form.Range
                                min={0}
                                max={5}
                                step={0.5}
                                value={filters.rating}
                                onChange={(e) => handleFilterChange('rating', parseFloat(e.target.value))}
                            />
                            <div className="d-flex justify-content-between">
                                <span>Any</span>
                                <span>{filters.rating} Stars</span>
                            </div>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={resetFilters}>
                        Reset Filters
                    </Button>
                    <Button variant="primary" onClick={applyFilters}>
                        Apply Filters
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
} 