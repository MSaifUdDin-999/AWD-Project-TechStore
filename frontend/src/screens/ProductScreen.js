import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css'; 

const ProductScreen = () => {
  const [product, setProduct] = useState({});
  const [qty, setQty] = useState(1);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${id}`);
        setProduct(data);
        setQty(1);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduct();
  }, [id]);

  // --- MODIFIED: NOW SAVES TO LOCAL STORAGE ---
  const addToCartHandler = () => {
    // 1. Create the item object
    const newItem = {
      product: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      countInStock: product.countInStock,
      qty: Number(qty)
    };

    // 2. Get existing cart from Local Storage (or empty array)
    const existingCart = JSON.parse(localStorage.getItem('cartItems')) || [];

    // 3. Check if item already exists
    const existItem = existingCart.find((x) => x.product === newItem.product);

    let updatedCart;
    if (existItem) {
      // If it exists, update it with the new details/qty
      updatedCart = existingCart.map((x) => 
        x.product === existItem.product ? newItem : x
      );
    } else {
      // If not, add it to the list
      updatedCart = [...existingCart, newItem];
    }

    // 4. Save back to Local Storage
    localStorage.setItem('cartItems', JSON.stringify(updatedCart));

    // 5. Navigate to Cart Page
    navigate('/cart');
  };

  const increaseQty = () => {
    if (product.countInStock && qty < product.countInStock) setQty(qty + 1);
  };

  const decreaseQty = () => {
    if (qty > 1) setQty(qty - 1);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <Link to="/" className="btn-shop" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: '20px' }}>
        Go Back
      </Link>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px' }}>
        
        {/* Image */}
        <div style={{ flex: '1 1 400px' }}>
          <img src={product.image} alt={product.name} style={{ width: '100%', borderRadius: '10px' }} />
        </div>

        {/* Details */}
        <div style={{ flex: '1 1 300px' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '10px', color: '#34495E' }}>{product.name}</h2>
          <p style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#555' }}>Price: ${product.price}</p>
          <p style={{ lineHeight: '1.6', color: '#666', marginTop: '20px' }}>{product.description}</p>
        </div>

        {/* Action Box */}
        <div style={{ flex: '0 0 300px' }}>
          <div style={{ border: '1px solid #ddd', borderRadius: '10px', padding: '20px', background: '#fff' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <span>Price:</span>
              <strong>${product.price}</strong>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <span>Status:</span>
              <span style={{ color: product.countInStock > 0 ? 'green' : 'red' }}>
                {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            {/* --- CLEANER QUANTITY SECTION --- */}
            {product.countInStock > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'center' }}>
                <span style={{ fontWeight: 'bold' }}>Quantity:</span>
                
                <div className="qty-group">
                  <button 
                    onClick={decreaseQty} 
                    className="btn-qty" 
                    disabled={qty === 1}
                  >-</button>

                  <span className="qty-text">{qty}</span>

                  <button 
                    onClick={increaseQty} 
                    className="btn-qty" 
                    disabled={qty === product.countInStock}
                  >+</button>
                </div>
              </div>
            )}

            <button 
              onClick={addToCartHandler} 
              className="btn-add-cart" 
              disabled={product.countInStock === 0}
              style={{ opacity: product.countInStock === 0 ? 0.5 : 1 }}
            >
              {product.countInStock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;