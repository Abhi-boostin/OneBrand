import React, { useState } from "react";
import "./ShopDetails.css";

import { useDispatch } from "react-redux";
import { addToCart } from "../../../Features/Cart/cartSlice";

import Filter from "../Filters/Filter";
import { Link } from "react-router-dom";
import StoreData from "../../../Data/StoreData";
import { FiHeart } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { IoFilterSharp } from "react-icons/io5";
import { FaCartPlus } from "react-icons/fa";
import toast from "react-hot-toast";

const ShopDetails = () => {
  const dispatch = useDispatch();

  const [wishList, setWishList] = useState({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [filters, setFilters] = useState({
    categories: [],
    sizes: [],
    brands: [],
    priceRange: [17, 100],
  });

  const handleWishlistClick = (productID) => {
    setWishList((prevWishlist) => ({
      ...prevWishlist,
      [productID]: !prevWishlist[productID],
    }));
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // Filter products based on selected filters
  const filteredProducts = StoreData.filter((product) => {
    // Category filter
    if (
      filters.categories.length > 0 &&
      !filters.categories.includes(product.category)
    ) {
      return false;
    }

    // Size filter
    if (
      filters.sizes.length > 0 &&
      !filters.sizes.some((size) => product.sizes.includes(size))
    ) {
      return false;
    }

    // Brand filter
    if (
      filters.brands.length > 0 &&
      !filters.brands.includes(product.brand)
    ) {
      return false;
    }

    // Price filter
    if (
      product.productPrice < filters.priceRange[0] ||
      product.productPrice > filters.priceRange[1]
    ) {
      return false;
    }

    return true;
  });

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success("Product added to cart!");
  };

  return (
    <>
      <div className="shopDetails">
        <div className="shopDetailMain">
          {/* Left Side - Filters */}
          <div className="shopDetails__left">
            <Filter onFilterChange={handleFilterChange} />
          </div>

          {/* Right Side - Products */}
          <div className="shopDetails__right">
            <div className="shopDetailsSorting">
              <div className="shopDetailsBreadcrumbLink">
                <Link to="/" onClick={scrollToTop}>
                  Home
                </Link>
                &nbsp;/&nbsp;
                <Link to="/shop">The Shop</Link>
              </div>
              <div className="filterLeft" onClick={toggleDrawer}>
                <IoFilterSharp />
                <p>Filter</p>
              </div>
              <div className="shopDetailsSort">
                <select name="sort" id="sort">
                  <option value="default">Default Sorting</option>
                  <option value="Featured">Featured</option>
                  <option value="bestSelling">Best Selling</option>
                  <option value="a-z">Alphabetically, A-Z</option>
                  <option value="z-a">Alphabetically, Z-A</option>
                  <option value="lowToHigh">Price, Low to high</option>
                  <option value="highToLow">Price, high to low</option>
                  <option value="oldToNew">Date, old to new</option>
                  <option value="newToOld">Date, new to old</option>
                </select>
                <div className="filterRight" onClick={toggleDrawer}>
                  <div className="filterSeprator"></div>
                  <IoFilterSharp />
                  <p>Filter</p>
                </div>
              </div>
            </div>

            {/* Product List */}
            <div className="shopDetailsProducts">
              <div className="shopDetailsProductsContainer">
                {filteredProducts.map((product) => (
                  <div key={product.productID} className="sdProductContainer">
                    <div className="sdProductImages">
                      <Link to="/Product" onClick={scrollToTop}>
                        <img
                          src={product.frontImg}
                          alt=""
                          className="sdProduct_front"
                        />
                        <img
                          src={product.backImg}
                          alt=""
                          className="sdProduct_back"
                        />
                      </Link>
                      <h4 onClick={() => handleAddToCart(product)}>
                        Add to Cart
                      </h4>
                    </div>

                    <div
                      className="sdProductImagesCart"
                      onClick={() => handleAddToCart(product)}
                    >
                      <FaCartPlus />
                    </div>

                    <div className="sdProductInfo">
                      <div className="sdProductCategoryWishlist">
                        <p>{product.category}</p>
                        <FiHeart
                          onClick={() => handleWishlistClick(product.productID)}
                          style={{
                            color: wishList[product.productID]
                              ? "red"
                              : "#767676",
                            cursor: "pointer",
                          }}
                        />
                      </div>

                      <div className="sdProductNameInfo">
                        <Link to="/product" onClick={scrollToTop}>
                          <h5>{product.productName}</h5>
                        </Link>
                        <p>${product.productPrice}</p>

                        {/* Rating and Reviews */}
                        <div className="sdProductRatingReviews">
                          <div className="sdProductRatingStar">
                            {[...Array(5)].map((_, i) => (
                              <FaStar
                                key={i}
                                color={
                                  i < product.rating ? "#FEC78A" : "#e0e0e0"
                                }
                                size={10}
                              />
                            ))}
                          </div>
                          <span>({product.reviews} reviews)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {filteredProducts.length === 0 && (
                  <p className="noProducts">No products found.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopDetails;
