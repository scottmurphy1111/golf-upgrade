import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { stripHtml } from 'string-strip-html';
import { Button, Form, Icon, Input } from 'semantic-ui-react';
import { CHEC_BASE_URL, HEADERS } from '../../utils/constants';
import axios from 'axios';
import { useStore } from '../../state/store';

const ProductPage = ({ onAddToCart, onUpdateCartQty }) => {
  const product = useStore(useCallback((state) => state.product, []));

  console.log('product', product);
  const [loading, setLoading] = useState(true);
  const [description, setDescription] = useState('');

  const [imageVars, setImageVars] = useState([
    { source: 'mc-image.jpg', id: '111' },
    { source: 'mc-image2.jpg', id: '112' },
    { source: 'mc-image3.jpg', id: '113' },
  ]);
  const [selectedImage, setSelectedImage] = useState(imageVars[0]);
  const [colorVars, setColorVars] = useState([]);
  const [selectedColor, setSelectedColor] = useState({});
  const [sizeVars, setSizeVars] = useState([]);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  const imageThumbRef = useRef();

  // useEffect(() => {
  //   const { result } = stripHtml(product.description);
  //   setDescription(result);
  // }, [product]);

  useEffect(() => {
    const url = new URL(
      `${CHEC_BASE_URL}/products/${product.id}/variant_groups`
    );

    axios
      .get(url, {
        headers: HEADERS,
      })
      .then((res) => res.data)
      .then((json) => {
        const { data } = json;
        if (data) {
          let colors;
          let sizes;

          colors = data.find((group) => {
            if (group.name.toLowerCase().includes('color')) {
              return group;
            }
            return null;
          });
          sizes = data.find((group) => {
            if (group.name.toLowerCase().includes('size')) {
              return group;
            }
            return null;
          });

          setColorVars(colors);
          setSizeVars(sizes);
        }
      })
      .then(() => {
        setLoading(false);
      });
  }, [product.id]);

  const handleQuantityClick = (quantity, type) => {
    if (type === 'decrease' && quantity > 1) {
      setQuantity(quantity - 1);
    }
    if (type === 'increase') {
      setQuantity(quantity + 1);
    }
  };

  const handleColorClick = (color) => {
    setSelectedColor(color);
  };

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  const handleImageSelect = (key) => {
    const imageSelection = imageVars.find((image) => {
      return image.id === key;
    });

    setSelectedImage(imageSelection);
  };

  return (
    <>
      {!Object.values(product).length ? (
        <p>
          {' '}
          There was an error loading the product, please{' '}
          <Link to="/">Start Over</Link>
        </p>
      ) : (
        <>
          <div className="product-page__wrapper">
            <div className="image-viewer">
              <ul>
                {imageVars.map((image) => (
                  <li
                    key={image.id}
                    ref={imageThumbRef}
                    data-image={image.id}
                    onClick={() => handleImageSelect(image.id)}
                  >
                    <img
                      src={`${process.env.PUBLIC_URL}/${image.source}`}
                      alt={image.source}
                    />
                  </li>
                ))}
              </ul>
              <div
                className="product-page__active-image"
                data-active-image={selectedImage}
              >
                <img
                  src={`${process.env.PUBLIC_URL}/${selectedImage.source}`}
                  alt={selectedImage.source}
                />
              </div>
            </div>
            <div className="product-page__details">
              <h2>{product.name}</h2>
              <h3 className="price">{product.price.formatted_with_symbol}</h3>
              <br />
              <div className="product-page__make-selections">
                <h3>Make Your Selections:</h3>
                {colorVars.options && colorVars.options.length > 0 && !loading && (
                  <div className="colors">
                    {colorVars.options.map((color) => (
                      <span
                        data-active={`${
                          selectedColor === color ? true : false
                        }`}
                        key={color.id}
                        data-value={color.name.toLowerCase()}
                        title={color.name}
                        style={{ backgroundColor: color.name.toLowerCase() }}
                        onClick={() => handleColorClick(color)}
                      ></span>
                    ))}
                    <div className="product-page__selection">
                      {selectedColor.name}
                    </div>
                  </div>
                )}
                {sizeVars.options && sizeVars.options.length > 0 && !loading && (
                  <div className="sizes">
                    {sizeVars.options.map((size) => (
                      <span
                        data-active={`${selectedSize === size ? true : false}`}
                        key={size.id}
                        data-value={size.name}
                        onClick={() => handleSizeClick(size)}
                      >
                        {size.name}
                      </span>
                    ))}
                    <div className="product-page__selection">
                      {selectedSize.name}
                    </div>
                  </div>
                )}
              </div>
              <div className="product-page__actions">
                <div className="quantity-container">
                  <Button
                    className="quantity-button"
                    onClick={() => handleQuantityClick(quantity, 'decrease')}
                    title="Reduce quantity"
                  >
                    -
                  </Button>
                  <p className="quantity-display">{quantity}</p>
                  <Button
                    className="quantity-button"
                    onClick={() => handleQuantityClick(quantity, 'increase')}
                    title="Increase quantity"
                  >
                    +
                  </Button>
                </div>
                <Button
                  fluid
                  primary
                  size="massive"
                  onClick={() => onAddToCart(product.id, quantity)}
                >
                  <Icon name="lock" />
                  Add to Cart
                </Button>
              </div>
              <hr />
              <p>{description}</p>
            </div>
          </div>
          <Link to={`/products/shop-all`}>back to products</Link>
        </>
      )}
    </>
  );
};

export default ProductPage;
