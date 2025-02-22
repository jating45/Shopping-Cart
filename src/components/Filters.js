import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CFormCheck,
  CFormLabel,
  CRow,
  CCol,
} from "@coreui/react";
import { CartState } from "../context/Context";
import Rating from "./Rating";
import { useCallback } from "react";

const Filters = () => {
  const {
    productDispatch,
    productState: { byStock, byFastDelivery, sort, byRating },
  } = CartState();

  // ✅ Use useCallback to prevent unnecessary re-renders
  const handleSort = useCallback(
    (type) => {
      if (sort !== type) {
        productDispatch({ type: "SORT_BY_PRICE", payload: type });
      }
    },
    [sort, productDispatch]
  );

  const handleStockChange = useCallback(() => {
    productDispatch({ type: "FILTER_BY_STOCK" });
  }, [productDispatch]);

  const handleDeliveryChange = useCallback(() => {
    productDispatch({ type: "FILTER_BY_DELIVERY" });
  }, [productDispatch]);

  const handleRatingChange = useCallback(
    (i) => {
      if (byRating !== i + 1) {
        productDispatch({ type: "FILTER_BY_RATING", payload: i + 1 });
      }
    },
    [byRating, productDispatch]
  );

  return (
    <CCard className="border-0 shadow-sm rounded-3">
      <CCardHeader className="bg-dark text-white text-center py-3 fs-5 fw-bold">
        🛒 Filter Products
      </CCardHeader>

      <CCardBody className="p-4">
        {/* Sorting */}
        <CRow className="mb-3 align-items-center">
          <CCol>
            <CFormCheck
              label="Price: Low to High"
              type="radio"
              name="priceSort"
              id="sortLowToHigh"
              className="fs-6"
              onChange={() => handleSort("lowToHigh")}
              checked={sort === "lowToHigh"}
              aria-label="Sort by Low to High"
            />
          </CCol>
          <CCol>
            <CFormCheck
              label="Price: High to Low"
              type="radio"
              name="priceSort"
              id="sortHighToLow"
              className="fs-6"
              onChange={() => handleSort("highToLow")}
              checked={sort === "highToLow"}
              aria-label="Sort by High to Low"
            />
          </CCol>
        </CRow>

        {/* Stock & Delivery */}
        <CRow className="mb-3">
          <CCol>
            <CFormCheck
              label="Include Out of Stock"
              type="checkbox"
              id="includeOutOfStock"
              className="fs-6"
              onChange={handleStockChange}
              checked={byStock}
              aria-label="Include out-of-stock products"
            />
          </CCol>
        </CRow>

        <CRow className="mb-3">
          <CCol>
            <CFormCheck
              label="Fast Delivery Only"
              type="checkbox"
              id="fastDelivery"
              className="fs-6"
              onChange={handleDeliveryChange}
              checked={byFastDelivery}
              aria-label="Filter by fast delivery"
            />
          </CCol>
        </CRow>

        {/* Rating */}
        <CRow className="mb-4 align-items-center">
          <CCol xs="6">
            <CFormLabel className="fs-6 fw-bold">Rating:</CFormLabel>
          </CCol>
          <CCol xs="6">
            <Rating
              rating={byRating}
              onClick={handleRatingChange}
              style={{ cursor: "pointer", marginLeft: 10 }}
            />
          </CCol>
        </CRow>

        {/* Clear Filters */}
        <CButton
          color="danger"
          className="w-100 py-2 fw-bold text-uppercase shadow-sm"
          onClick={() => productDispatch({ type: "CLEAR_FILTERS" })}
        >
          🔄 Clear Filters
        </CButton>
      </CCardBody>
    </CCard>
  );
};

export default Filters;

