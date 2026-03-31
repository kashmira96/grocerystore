import React, { useState } from "react";
import "./App.css";

function App() {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    { id: 1, name: "Fruits", icon: "🍎", color: "#ff6b6b" },
    { id: 2, name: "Vegetables", icon: "🥬", color: "#51cf66" },
    { id: 3, name: "Dairy", icon: "🥛", color: "#339af0" },
    { id: 4, name: "Bakery", icon: "🍞", color: "#f59f00" },
    { id: 5, name: "Snacks", icon: "🍿", color: "#ff6b9d" },
    { id: 6, name: "Beverages", icon: "🧃", color: "#20c997" },
    { id: 7, name: "Staples", icon: "🌾", color: "#845ef7" }
  ];

  const products = [
    {
      id: 1,
      name: "Fresh Apples",
      price: 120,
      originalPrice: 150,
      unit: "kg",
      img: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce",
      category: "Fruits",
      discount: 20
    },
    {
      id: 2,
      name: "Bananas",
      price: 60,
      originalPrice: 80,
      unit: "dozen",
      img: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e",
      category: "Fruits",
      discount: 25
    },
    {
      id: 3,
      name: "Milk",
      price: 55,
      originalPrice: 65,
      unit: "litre",
      img: "https://images.unsplash.com/photo-1563636619-e9143da7973b",
      category: "Dairy",
      discount: 15
    },
    {
      id: 4,
      name: "Bread",
      price: 40,
      originalPrice: 50,
      unit: "piece",
      img: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec",
      category: "Bakery",
      discount: 20
    },
    {
      id: 5,
      name: "Tomatoes",
      price: 35,
      originalPrice: 45,
      unit: "kg",
      img: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337",
      category: "Vegetables",
      discount: 22
    },
    {
      id: 6,
      name: "Potatoes",
      price: 30,
      originalPrice: 40,
      unit: "kg",
      img: "https://images.unsplash.com/photo-1518977676601-b53f82aba655",
      category: "Vegetables",
      discount: 25
    },
    {
      id: 7,
      name: "Rice",
      price: 120,
      originalPrice: 150,
      unit: "kg",
      img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
      category: "Staples",
      discount: 20
    },
    {
      id: 8,
      name: "Eggs",
      price: 80,
      originalPrice: 100,
      unit: "dozen",
      img: "https://images.unsplash.com/photo-1518569656558-1f25e69d93d7",
      category: "Dairy",
      discount: 20
    },
    {
      id: 9,
      name: "Butter",
      price: 250,
      originalPrice: 300,
      unit: "500g",
      img: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e",
      category: "Dairy",
      discount: 17
    },
    {
      id: 10,
      name: "Orange Juice",
      price: 120,
      originalPrice: 150,
      unit: "litre",
      img: "https://images.unsplash.com/photo-1600271886742-f049cd451bba",
      category: "Beverages",
      discount: 20
    }
  ];

  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const getCartItemCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-brand">
          <span className="logo">🛒</span>
          <span className="brand-name">GreenBasket Grocery Mart</span>
        </div>
        
        <div className="search-container">
          <input
            type="text"
            placeholder="Search groceries..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar"
          />
        </div>
        
        <div className="cart-icon">
          <span className="cart-symbol">🛒</span>
          <span className="cart-count">{getCartItemCount()}</span>
        </div>
      </nav>

      <section className="hero-banner">
        <div className="hero-content">
          <h1>Fresh Groceries Delivered to Your Door</h1>
          <p>Quality products, unbeatable prices, fast delivery</p>
          <button className="cta-button">Shop Now</button>
        </div>
        <div className="hero-image">
          <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1000&h=700&fit=crop" alt="Fresh groceries" />
        </div>
      </section>

      <section className="categories-section">
        <h2>Shop by Category</h2>
        <div className="categories-container">
          {categories.map(category => (
            <div key={category.id} className="category-card">
              <div className="category-icon" style={{ backgroundColor: category.color }}>
                {category.icon}
              </div>
              <span className="category-name">{category.name}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="products-section">
        <div className="section-header">
          <h2>Popular Products</h2>
          <p>Fresh from farm to your table</p>
        </div>
        
        <div className="products-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image-container">
                <img src={product.img} alt={product.name} className="product-image" />
                {product.discount && (
                  <span className="discount-badge">-{product.discount}%</span>
                )}
              </div>
              
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <div className="product-price">
                  <span className="current-price">₹{product.price}/{product.unit}</span>
                  {product.originalPrice && (
                    <span className="original-price">₹{product.originalPrice}/{product.unit}</span>
                  )}
                </div>
                
                <div className="product-actions">
                  <div className="quantity-selector">
                    <button 
                      className="quantity-btn"
                      onClick={() => {
                        const cartItem = cart.find(item => item.id === product.id);
                        if (cartItem && cartItem.quantity > 1) {
                          updateQuantity(product.id, cartItem.quantity - 1);
                        }
                      }}
                    >
                      -
                    </button>
                    <span className="quantity-display">
                      {cart.find(item => item.id === product.id)?.quantity || 0}
                    </span>
                    <button 
                      className="quantity-btn"
                      onClick={() => {
                        const cartItem = cart.find(item => item.id === product.id);
                        if (cartItem) {
                          updateQuantity(product.id, cartItem.quantity + 1);
                        } else {
                          addToCart(product, 1);
                        }
                      }}
                    >
                      +
                    </button>
                  </div>
                  
                  <button 
                    className="add-to-cart-btn"
                    onClick={() => addToCart(product, 1)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
