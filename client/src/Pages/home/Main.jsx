import { useEffect } from "react";
import { AppDownload } from "./AppDownload";
import { ChooseUs } from "./ChooseUs";
import { Customer } from "./Customer";
import { DealsOfDay } from "./DealsOfDay";
import { FeaturedBrand } from "./FeaturedBrand";
import { HealthArticles } from "./HealthArticles";
import { JustOffer } from "./JustOffer";
import { LabTest } from "./LabTest";
import { OfferCards } from "./OfferCards";
import { PharmEasyPlus } from "./PharmEasyPlus";
import { QAns } from "./QAns";
import { TopSlider } from "./TopSlider";
import axios from "axios";

const fetchData = async() =>{
  const res = await axios.get("http://localhost:4000/api/product/all");
  console.log("res",res.data)
}

const Main = () => {
  useEffect(()=>{
  fetchData()
  },[])
  return (
    <>
      <TopSlider />
      <OfferCards />
      <PharmEasyPlus />
      <JustOffer />
      <LabTest />
      <FeaturedBrand />
      <DealsOfDay />
      <HealthArticles />
      <ChooseUs />
      <Customer />
      <AppDownload />
      <QAns />
    </>
  );
};

export { Main };
