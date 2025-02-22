import { useEffect, useState } from "react";
import {
  CButton,
  CCol,
  CFormSelect,
  CImage,
  CListGroup,
  CListGroupItem,
  CRow,
  CContainer,
  CCard,
  CCardBody,
  CCardTitle,
  CCardText,
  CBadge,
} from "@coreui/react";
import { AiFillDelete } from "react-icons/ai";
import { CartState } from "../context/Context";
import Rating from "./Rating";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is loaded
import "./styles.css";

const Cart = () => {
  const {
    state: { cart },
    dispatch,
  } = CartState();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0));
  }, [cart]);

  return (
    <CContainer className="home mt-4">
      <CRow className="justify-content-center">
        {/* Cart Items Section */}
        <CCol md={8}>
          <CCard className="shadow-lg p-3">
            <CCardTitle className="text-center fs-4 fw-bold mb-3">
              🛒 Your Shopping Cart
            </CCardTitle>
            <CListGroup flush>
              {cart.length > 0 ? (
                cart.map((prod) => (
                  <CListGroupItem key={prod.id} className="d-flex align-items-center gap-3">
                    <CImage src={prod.image} alt={prod.name} className="rounded" width={60} height={60} />
                    
                    <div className="flex-grow-1">
                      <h6 className="mb-1 fw-bold">{prod.name}</h6>
                      <p className="text-muted mb-0">₹ {prod.price}</p>
                    </div>
                    
                    <Rating rating={prod.ratings} />

                    <CFormSelect
                      value={prod.qty}
                      onChange={(e) =>
                        dispatch({
                          type: "CHANGE_CART_QTY",
                          payload: { id: prod.id, qty: e.target.value },
                        })
                      }
                      className="w-auto"
                    >
                      {[...Array(prod.inStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </CFormSelect>

                    <CButton
                      type="button"
                      color="danger"
                      variant="outline"
                      className="rounded-circle"
                      onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: prod })}
                    >
                      <AiFillDelete fontSize="20px" />
                    </CButton>
                  </CListGroupItem>
                ))
              ) : (
                <CListGroupItem className="text-center text-muted">
                  Your cart is empty! 🛍️
                </CListGroupItem>
              )}
            </CListGroup>
          </CCard>
        </CCol>

        {/* Summary Section */}
        <CCol md={4}>
          <CCard className="shadow-lg p-3 bg-light">
            <CCardBody className="text-center">
              <CCardTitle className="fs-4 fw-bold">🧾 Order Summary</CCardTitle>
              <CCardText>
                <span className="fs-5">
                  Subtotal ({cart.length}) items:
                  <CBadge color="primary" className="ms-2 fs-6">₹ {total}</CBadge>
                </span>
              </CCardText>

              <CButton color="success" className="w-100 fw-bold py-2" disabled={cart.length === 0}>
                Proceed to Checkout
              </CButton>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default Cart;
