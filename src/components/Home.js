import { CartState } from "../context/Context";
import Filters from "./Filters";
import SingleProduct from "./SingleProduct";
import { CContainer, CRow, CCol, CCard, CCardBody, CCardHeader } from "@coreui/react";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap for styling
import "./styles.css"; // Additional custom styles

const Home = () => {
  const {
    state: { products },
    productState: { sort, byStock, byFastDelivery, byRating, searchQuery },
  } = CartState();

  const transformProducts = () => {
    let sortedProducts = products;

    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }

    if (!byStock) {
      sortedProducts = sortedProducts.filter((prod) => prod.inStock);
    }

    if (byFastDelivery) {
      sortedProducts = sortedProducts.filter((prod) => prod.fastDelivery);
    }

    if (byRating) {
      sortedProducts = sortedProducts.filter(
        (prod) => prod.ratings >= byRating
      );
    }

    if (searchQuery) {
      sortedProducts = sortedProducts.filter((prod) =>
        prod.name.toLowerCase().includes(searchQuery)
      );
    }

    return sortedProducts;
  };

  return (
    <CContainer fluid className="home-container">
      <CRow className="mt-4">
        {/* Filters Sidebar */}
        <CCol md={3}>
          <CCard className="shadow-sm filter-card">
            <CCardHeader className="bg-primary text-white text-center">
              Filter Products
            </CCardHeader>
            <CCardBody>
              <Filters />
            </CCardBody>
          </CCard>
        </CCol>

        {/* Product Grid */}
        <CCol md={9}>
          <CRow className="g-4">
            {transformProducts().map((prod) => (
              <CCol xs={12} sm={6} md={4} lg={3} key={prod.id}>
                <SingleProduct prod={prod} />
              </CCol>
            ))}
          </CRow>
        </CCol>
      </CRow>
    </CContainer>
  );
};

export default Home;
