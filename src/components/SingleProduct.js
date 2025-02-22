import {
  CCard,
  CCardImage,
  CCardBody,
  CCardTitle,
  CCardText,
  CButton,
  CBadge,
} from "@coreui/react";
import { CartState } from "../context/Context";
import Rating from "./Rating";

const SingleProduct = ({ prod }) => {
  const {
    state: { cart },
    dispatch,
  } = CartState();

  return (
    <CCard className="shadow-sm border-0 rounded-3 p-2 product-card">
      {/* Product Image */}
      <CCardImage
        orientation="top"
        src={prod.image}
        alt={prod.name}
        className="rounded-top product-image"
      />

      <CCardBody className="text-center">
        {/* Product Name */}
        <CCardTitle className="fs-5 fw-bold">{prod.name}</CCardTitle>

        {/* Product Price */}
        <CCardText className="text-success fs-6 fw-bold">
          ₹ {prod.price.split(".")[0]}
        </CCardText>

        {/* Delivery Info */}
        <CCardText>
          {prod.fastDelivery ? (
            <CBadge color="success">🚀 Fast Delivery</CBadge>
          ) : (
            <CBadge color="warning">⏳ 4 Days Delivery</CBadge>
          )}
        </CCardText>

        {/* Product Rating */}
        <CCardText>
          <Rating rating={prod.ratings} />
        </CCardText>

        {/* Add/Remove from Cart Button */}
        {cart.some((p) => p.id === prod.id) ? (
          <CButton
            color="danger"
            className="w-100 fw-bold py-2 shadow-sm"
            onClick={() =>
              dispatch({
                type: "REMOVE_FROM_CART",
                payload: prod,
              })
            }
          >
            ❌ Remove from Cart
          </CButton>
        ) : (
          <CButton
            color={prod.inStock ? "primary" : "secondary"}
            className="w-100 fw-bold py-2 shadow-sm"
            onClick={() =>
              dispatch({
                type: "ADD_TO_CART",
                payload: prod,
              })
            }
            disabled={!prod.inStock}
          >
            {prod.inStock ? "🛒 Add to Cart" : "❌ Out of Stock"}
          </CButton>
        )}
      </CCardBody>
    </CCard>
  );
};

export default SingleProduct;
