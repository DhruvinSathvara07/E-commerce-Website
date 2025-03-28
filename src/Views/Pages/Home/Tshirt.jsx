import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Form from 'react-bootstrap/Form';

const Tshirt = () => {
    const [showFilter, setShowFilter] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('featured');
    const [tshirt, setTshirt] = useState([]);
    const [filteredTshirts, setFilteredTshirts] = useState([]);

    const products = async () => {
        try {
            const response = await axios.get(`http://localhost:3000/tshirts`)
            setTshirt(response.data)
            setFilteredTshirts(response.data)
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }

    useEffect(() => {
        products();
    }, [])

    // Filter and Sort Function
    useEffect(() => {
        let result = [...tshirt];

        // Category Filtering
        if (selectedCategory !== 'all') {
            result = result.filter(product =>
                product.category.toLowerCase() === selectedCategory.toLowerCase()
            );
        }

        // Sorting
        switch (sortBy) {
            case 'price-low-to-high':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-high-to-low':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'newest':
                result.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
                break;
            default: // featured
                // You might want to implement a specific logic for featured products
                break;
        }

        setFilteredTshirts(result);
    }, [selectedCategory, sortBy, tshirt]);

    return (
        <div className="tshirt-container">
            <h1 className="tshirt-heading">Anime Collection</h1>

            {/* Filter Button */}
            <div className="container">
                <span
                    className='ms-5 ps-5 fw-bolder fs-5 filter-button'
                    onClick={() => setShowFilter(true)}
                >
                    Filter
                </span>
            </div>

            {/* Filter Offcanvas */}
            <Offcanvas show={showFilter} onHide={() => setShowFilter(false)} placement="end">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Filter Products</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    {/* Category Filter */}
                    <div className="mb-4">
                        <h5>Category</h5>
                        <Form.Select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="all">All Categories</option>
                            <option value="men">Men</option>
                            <option value="women">Women</option>
                            <option value="unisex">Unisex</option>
                        </Form.Select>
                    </div>

                    {/* Sort Filter */}
                    <div className="mb-4">
                        <h5>Sort By</h5>
                        <Form.Select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="featured">Featured</option>
                            <option value="price-low-to-high">Price: Low to High</option>
                            <option value="price-high-to-low">Price: High to Low</option>
                            <option value="newest">Newest Arrivals</option>
                        </Form.Select>
                    </div>
                </Offcanvas.Body>
            </Offcanvas>

            {/* Product Grid */}
            <div className="tshirt-container">
                <div className="tshirt-grid mt-4">
                    {filteredTshirts.map((product) => (
                        <div className="tshirt-card" key={product.id}>
                            <div className="card-media">
                                {product.discount && (
                                    <span className="card-badge">{product.discount}% OFF</span>
                                )}
                                {product.isNew && (
                                    <span className="card-badge new">NEW</span>
                                )}
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="card-image"
                                />
                                <div className="image-overlay"></div>
                            </div>

                            <div className="card-content">
                                <h3 className="card-title">{product.name}</h3>
                                <p className="card-description">{product.description}</p>

                                <div className="card-footer">
                                    <div className="price-container">
                                        <span className="current-price">${product.price}</span>
                                        {product.originalPrice && (
                                            <span className="original-price">${product.originalPrice}</span>
                                        )}
                                    </div>
                                    <div className="card-actions">
                                        <button className="cart-button">
                                            <span>Add to Cart</span>
                                            <i className="cart-icon">🛒</i>
                                        </button>
                                        <button className="wishlist-button">❤️</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Tshirt;
