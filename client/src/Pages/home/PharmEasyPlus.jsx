import styles from "../../Styles/home/pharmEasyPlus.module.css";

const PharmEasyPlus = () => {
  return (
    <div className={styles.container}>
      <div style={{ flex: "1", marginTop: "26px" }}>
        {/* <img
          width="190px"
          // src="https://assets.pharmeasy.in/web-assets/dist/e3db129c.png"
          alt=""
        /> */}
        <h2 className={styles.plus}>  
        Oxanto Plus*
      </h2>
      </div>
      <div className={styles.line}>
          Safe flat 5% extra on medicines & enjoy FREE delivery with PLUS
          membership
      </div>
      <div style={{ flex: "1" }}>
        <img
          width="130px"
          style={{
            marginTop: "-7px",
            marginLeft: "30%"
          }}
          src="https://assets.pharmeasy.in/web-assets/dist/b20b0932.png"
          alt=""
        />
      </div>
    </div>
  );
};

export { PharmEasyPlus };
