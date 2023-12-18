import Slider from "react-slick";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
// import slider_img from "../assets/slider_img.jpg";

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <IoIosArrowForward
      className={className}
      style={{
        ...style,
        display: "block",
        color: "white",
        height: "2.5rem",
        marginRight: "2rem",
        background: "none",
        width: "2.5rem",
        zIndex: 50,
      }}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <IoIosArrowBack
      className={className}
      style={{
        ...style,
        display: "block",
        marginLeft: "2rem",
        background: "none",
        color: "white",
        height: "2.5rem",
        width: "2.5rem",
        zIndex: 50,
      }}
      onClick={onClick}
    />
  );
}
const TopSlider = () => {
  var settings = {
    // dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };
  return (
    <div style={{ backgroundColor: "white", height: "300px" }}>
      <div
        style={{
          // backgroundColor: "whitesmoke",
          paddingBottom: "30px",
          width: "100%",
          margin: "auto",
        }}
      >
        <Slider {...settings}>
          <div>
            <img
              style={{ width: "100%" }}
              src="https://onemg.gumlet.io/4acb8fba-e1db-4476-b36c-9aa4c5b09290_1702377120.jpg?w=1013&h=250&format=auto"
              alt=""
            />
          </div>
          <div>
            <img
              style={{ width: "100%" }}
              src="https://onemg.gumlet.io/71ee04a4-ec19-4267-8efd-cd59901623d5_1701342578.jpg?w=1013&h=250&format=auto"
              alt=""
            />
          </div>
          <div>
            <img
              style={{ width: "100%" }}
              src="https://onemg.gumlet.io/3ec82d3d-8cd3-4611-b276-4daaa27bf60b_1702798478.png?w=1013&h=250&format=auto"
              alt=""
            />
          </div>
          {/* <div>
            <img
              style={{ width: "100%" }}
              src={slider_img}
              alt=""
            />
          </div> */}
        </Slider>
      </div>
    </div>
  );
};

export { TopSlider };
