import { FaShoppingCart } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import {
  CBadge,
  CButton,
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFormInput,
  CNavbar,
  CNavbarBrand,
  CNavbarNav,
  CNavbarText,
  CNavItem,
} from "@coreui/react";
import { Link, useLocation } from "react-router-dom";
import { CartState } from "../context/Context";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is loaded
import "./styles.css";

const Header = () => {
  const {
    state: { cart },
    dispatch,
    productDispatch,
  } = CartState();

  return (
    <CNavbar expand="lg" colorScheme="dark" className="bg-dark shadow-lg py-3">
      <CContainer fluid>
        {/* Logo */}
        <CNavbarBrand>
          <Link to="/" className="text-white text-decoration-none fs-4 fw-bold">
            🛍️ Shopping Cart
          </Link>
        </CNavbarBrand>

        {/* Search Bar */}
        {useLocation().pathname.split("/")[1] !== "cart" && (
          <CNavbarText className="search w-50">
            <CFormInput
              type="search"
              placeholder="🔍 Search for products..."
              className="w-100 p-2 rounded-3 border-0 shadow-sm"
              aria-label="Search"
              onChange={(e) =>
                productDispatch({
                  type: "FILTER_BY_SEARCH",
                  payload: e.target.value,
                })
              }
            />
          </CNavbarText>
        )}

        {/* Cart Section */}
        <CNavbarNav className="ms-auto">
          <CNavItem>
            <CDropdown>
              <CDropdownToggle color="light" className="d-flex align-items-center gap-2">
                <FaShoppingCart color="black" fontSize="25px" />
                <CBadge color="danger" shape="rounded-pill" className="fs-6">
                  {cart.length}
                </CBadge>
              </CDropdownToggle>

              <CDropdownMenu className="p-3 shadow-lg rounded-3" style={{ minWidth: 400 }}>
                {cart.length > 0 ? (
                  <>
                    {cart.map((prod) => (
                      <CDropdownItem key={prod.id} className="d-flex align-items-center gap-3">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="rounded"
                          style={{ width: 50, height: 50, objectFit: "cover" }}
                        />
                        <div className="flex-grow-1">
                          <h6 className="mb-0 fw-semibold">{prod.name}</h6>
                          <span className="text-muted small">₹ {prod.price.split(".")[0]}</span>
                        </div>
                        <AiFillDelete
                          fontSize="20px"
                          color="red"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            dispatch({
                              type: "REMOVE_FROM_CART",
                              payload: prod,
                            })
                          }
                        />
                      </CDropdownItem>
                    ))}
                    <Link to="/cart">
                      <CButton color="success" className="w-100 mt-2 fw-bold">
                        🛒 Go To Cart
                      </CButton>
                    </Link>
                  </>
                ) : (
                  <CDropdownItem className="text-center text-muted">
                    🛍️ Your cart is empty!
                  </CDropdownItem>
                )}
              </CDropdownMenu>
            </CDropdown>
          </CNavItem>
        </CNavbarNav>
      </CContainer>
    </CNavbar>
  );
};

export default Header;
