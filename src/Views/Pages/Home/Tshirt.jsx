import React, { useState } from 'react';
import './Tshirt.css';

const Tshirt = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortBy, setSortBy] = useState('featured');
    
    // Sample product data with categories
    const products = [
        {
            id: 1,
            name: "Naruto Uzumaki",
            price: 24.99,
            originalPrice: 35.99,
            category: "naruto",
            image: "https://thecoup.in/wp-content/uploads/2023/04/anme-1.jpg",
            description: "Premium quality anime t-shirt with HD print",
            isNew: false,
            discount: 30
        },
        {
            id: 2,
            name: "Goku Ultra Instinct",
            price: 29.99,
            category: "dragon-ball",
            image: "https://www.jiomart.com/images/product/original/rvc5gr5nsr/euroqu-unisex-anime-back-printed-oversized-t-shirt-white-size-large-product-images-rvc5gr5nsr-0-202211270738.jpg?im=Resize=(500,630)",
            description: "Limited edition Dragon Ball Z merchandise",
            isNew: true
        },
        {
            id: 3,
            name: "Survey Corps",
            price: 27.99,
            originalPrice: 32.99,
            category: "attack-on-titan",
            image: "https://assets.myntassets.com/h_1440,q_100,w_1080/v1/assets/images/24915222/2023/10/20/e7895058-eacf-4959-989f-b40f7eeeb4f41697781696906-Crazymonk-Jujutsu-Kaisen-Gojo-Satoru-Anime-Printed-Cotton-Ov-4.jpg",
            description: "Official Attack on Titan collection",
            isNew: false
        }
    ];

    // Filter and sort products
    const filteredProducts = products
        .filter(product => 
            selectedCategory === 'all' || product.category === selectedCategory
        )
        .sort((a, b) => {
            if(sortBy === 'price-low') return a.price - b.price;
            if(sortBy === 'price-high') return b.price - a.price;
            return 0;
        });

    return (
        <div className="tshirt-container">
            <h1 className="tshirt-heading">Anime Collection</h1>
            
            {/* Filters Section */}
            <div className="filters-container">
                <div className="categories-filter">
                    <button 
                        className={selectedCategory === 'all' ? 'active' : ''}
                        onClick={() => setSelectedCategory('all')}
                    >
                        All
                    </button>
                    <button 
                        className={selectedCategory === 'naruto' ? 'active' : ''}
                        onClick={() => setSelectedCategory('naruto')}
                    >
                        Naruto
                    </button>
                    <button 
                        className={selectedCategory === 'dragon-ball' ? 'active' : ''}
                        onClick={() => setSelectedCategory('dragon-ball')}
                    >
                        Dragon Ball
                    </button>
                    <button 
                        className={selectedCategory === 'attack-on-titan' ? 'active' : ''}
                        onClick={() => setSelectedCategory('attack-on-titan')}
                    >
                        Attack on Titan
                    </button>
                </div>
                
                <div className="sort-filter">
                    <select 
                        value={sortBy} 
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="featured">Featured</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                    </select>
                </div>
            </div>

            <div className="tshirt-grid">
                {filteredProducts.map((product) => (
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
    );
};

export default Tshirt;