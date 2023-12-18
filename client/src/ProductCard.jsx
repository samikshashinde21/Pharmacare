    import React from "react";
    import { useNavigate } from "react-router-dom";
    import styles from "./ProductCard.css";

    const ProductCard = ({ product }) => {
    const { img1, title, discount, strike, mrp } = product;
    const navigate = useNavigate();

    return (
        <div
        onClick={() => {
            navigate(`/productdetails/${title}`);
            localStorage.setItem("frequently", JSON.stringify("Covid Essentials"));
        }}
        className={styles.card}
        >
        <div>
            <div className={styles.discount}>{discount}% OFF</div>
            <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "90%",
            }}
            >
            <div style={{ padding: "80px", boxSizing: "border-box" }}>
                <img
                style={{ maxWidth: "90%", maxHeight: "90%" }}
                src={img1} 
                alt={title}
                />
            </div>
            </div>
        </div>
        <p>{title}</p>
        <div style={{ color: "gray" }}>
            MRP <s>${strike}</s>
        </div>
        <div style={{ fontWeight: "bold", color: "#55585e" }}>
            Price: ${mrp}
        </div>
        </div>
    );
    };

    export default ProductCard;
