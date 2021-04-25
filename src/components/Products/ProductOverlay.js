import React from 'react';

const ProductOverlay = ({ onAddToCart, setProductId, id, showOverlay }) => {
  return (
    <div className="product__overlay" data-active={`${showOverlay && true}`}>
      <button
        name="product details"
        className="product__btn"
        onClick={() => setProductId(id)}
      >
        Product Details
      </button>
      <button
        name="Add to cart"
        className="product__btn add"
        onClick={onAddToCart}
      >
        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAABmJLR0QA/wD/AP+gvaeTAAAB1ElEQVRIicWWz2pTQRSHv9PYBixWEF1oY4kKPodSN6K2vkSX1k1X+hQuRRQRdOFOsQjiUhQfwiAY68ZN043/4ucik+YaO/feJqI/CNzMnN/5zpk7yQz8I0VVgLoErAKXgDbQSlNd4D3wDHgSER8mqkBdVG+rP6xWX32stvcLuaru1ACMq6eu1IVcTxVOqr66XqeTaSBF2N6dqS3Ll+uVuqweVOfVC+rrkvieemIv0N0KyKx6Xn2UPufUuQrYnWH+SJAloAM0Mqu6DAi8BGbS2M80Pgu8yPj6QDsiukPTagkE4C2wVoCQnteANyW+Rso9kPq8pP1ptTmsCuB0SVU3gGZkBDSBmyX+MzB6Rz3gUCawGRHfCt03ACKiXxhrAl8y/p2IWJjJTO5qDLLAYNN01MOFmK9VeYagT1WBSXPAEeAoMF/TswVwIH3pAGerHBHxWX04eIytmqB3MOpos6YJ4OOwypoa5VZPmj8O5qoyqc2M97va2u0oHVr3M3k2ymBpbiMzfS8iuuOGRQd/hH9L2+rxXHUXS5ZwP+qrV6rWe93pD75rpZACbMXJlnFbvVwLUoAdU2852Dl1unhg7p1Q77rVYnTdOsXv160Og9/J0z921//SL8GX8rhV6oSaAAAAAElFTkSuQmCC" />
        Add to Cart
      </button>
    </div>
  );
};

export default ProductOverlay;
