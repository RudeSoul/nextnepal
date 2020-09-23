import React from "react";
import OwlCarousel from "react-owl-carousel3";
import ProductBox from "../home/ProductBox";
import { instance } from "../../utils/axios/instance";

class CategoriesCarousel extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      category: null,
    };
  }

  componentDidMount() {
    instance
      .post("get-restaurant-category-slides")
      .then((data) => {
        console.log(data);
        this.setState({ category: data.data });
      })
      .catch((err) => {
        alert("Sorry for inconvinience. There has been a error in server.");
      });
  }

  render() {
    if (!this.state.category) return null;

    return (
      <OwlCarousel
        nav
        loop
        {...options}
        className="owl-carousel-category owl-theme"
      >
        {this.state.category &&
          this.state.category.map((category, index) => (
            <div className="item" key={index}>
              <ProductBox
                boxClass="osahan-category-item"
                title={category.name}
                image={`${process.env.REACT_APP_IMAGE_URL}${category.image}`}
                imageClass="img-fluid"
                imageAlt={category.name}
                linkUrl="listing"
              />
            </div>
          ))}
      </OwlCarousel>
    );
  }
}

const options = {
  responsive: {
    0: {
      items: 2,
    },
    600: {
      items: 3,
    },
    1000: {
      items: 4,
    },
    1200: {
      items: 5,
    },
  },
  loop: true,
  lazyLoad: true,
  autoplay: true,
  dots: false,
  autoplaySpeed: 1000,
  autoplayTimeout: 2000,
  autoplayHoverPause: true,
  nav: true,
  navText: [
    "<i class='fa fa-chevron-left'></i>",
    "<i class='fa fa-chevron-right'></i>",
  ],
};

export default CategoriesCarousel;
