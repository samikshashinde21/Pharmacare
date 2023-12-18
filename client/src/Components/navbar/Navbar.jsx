import styles from "./navbar.module.css";
import oxanto_logo from "../assets/oxanto_logo.png";
import {
  // Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  // DrawerFooter,
  // DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  HStack,
  // Image,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  // InputRightElement,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  PinInput,
  PinInputField,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import {  SearchIcon } from "@chakra-ui/icons";
// import { ArrowDownIcon } from "@chakra-ui/icons";
import SelectPin from "./SelectPin";
import Select from "react-select";
import { useContext, useRef, useState } from "react";
// import { TbDiscount2 } from "react-icons/tb";
import { RiUser5Fill } from "react-icons/ri";
import { HiShoppingCart } from "react-icons/hi";
import { FiMail } from "react-icons/fi";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { useEffect } from "react";

const options = [
  {
    value: "Episoft cleansing lotion",
    label: "Episoft cleansing lotion",
  },
  {
    value: "Venusia Max Intensive Moisturizing Lotion, Repairs Dry Skin, Provides Soft & Smooth Skin, 300gm",
    label: "Venusia Max Intensive Moisturizing Lotion, Repairs Dry Skin, Provides Soft & Smooth Skin, 300gm",
  },
  {
    value: "Veet Pure Hair Removal Cream For Women With No Ammonia Smell, Sensitive Skin - 50 G",
    label: "Veet Pure Hair Removal Cream For Women With No Ammonia Smell, Sensitive Skin - 50 G",
  },
  // {
  //   value: "Pharmeasy Multivitamin",
  //   label: "Pharmeasy Multivitamin",
  // },
  {
    value: "Ethiglo Skin Whitening Face Wash-70 G",
    label: "Ethiglo Skin Whitening Face Wash-70 G",
  },
  // { value: "Pharmeasy Multivitamin", label: "Pharmeasy Multivitamin" },
  {
    value: "Nivea Aloe Mosturizing Creme Bottle Of 200 Ml",
    label: "Nivea Aloe Mosturizing Creme Bottle Of 200 Ml",
  },

  {
    value: "La Shield Fisico Sunscreen Spf 50 Matte Tube Of 50 G",
    label: "La Shield Fisico Sunscreen Spf 50 Matte Tube Of 50 G",
  },
  {
    value: "Dettol Intense Cool Bathing Soap Bar With Menthol- Buy 4 Get 1 Free - 125g Each",
    label: "Dettol Intense Cool Bathing Soap Bar With Menthol- Buy 4 Get 1 Free - 125g Each",
  },
  {
    value: "Lacto Calamine Daily Cleansing Face Wipes With Aloe Vera Cucumber And Vitamin E - 25 Wipes",
    label: "Lacto Calamine Daily Cleansing Face Wipes With Aloe Vera Cucumber And Vitamin E - 25 Wipes",
  },
  {
    value: "Ezee Bio-Degradable Large Garbage Bags (24 X 32 Inches) Packet Of 15",
    label: "Ezee Bio-Degradable Large Garbage Bags (24 X 32 Inches) Packet Of 15",
  },
  {
    value: "Baby Dove Rich Moisture Wipes 50 Pcs",
    label: "Baby Dove Rich Moisture Wipes 50 Pcs",
  },
  { value: "Dettol Disinfectant Sanitizer Spray Bottle -Spring Blossom, 225ml)", 
    label: "Dettol Disinfectant Sanitizer Spray Bottle -Spring Blossom, 225ml)" },
  {
    value: "D Acne Soft Foaming Face Wash Tube Of 100 G",
    label: "D Acne Soft Foaming Face Wash Tube Of 100 G",
  },

  {
    value:
      "Dettol Antiseptic Liquid Bottle Of 550 Ml",
    label:
      "Dettol Antiseptic Liquid Bottle Of 550 Ml",
  },
  {
    value: "Godrej Good Knight Gold Flash Mosquito Repellent (Machine + 2 Refills) - Combo Pack-1 Unit",
    label: "Godrej Good Knight Gold Flash Mosquito Repellent (Machine + 2 Refills) - Combo Pack-1 Unit",
  },
  {
    value: "Lizol Floral Disinfectant Floor Cleaner Liquid Bottle Of 200 Ml",
    label: "Lizol Floral Disinfectant Floor Cleaner Liquid Bottle Of 200 Ml",
  },
  {
    value: "Harpic Lemon Bathroom Cleaner Bottle Of 500 Ml",
    label: "Harpic Lemon Bathroom Cleaner Bottle Of 500 Ml",
  },
  {
    value: "Domex Disinfectant Expert Toilet Cleaner - 500 Ml",
    label: "Domex Disinfectant Expert Toilet Cleaner - 500 Ml",
  },
  {
    value:
      "Luxor Nano Mobile Disinfectant Cleaner - 10ml On-The-Go",
    label:
      "Luxor Nano Mobile Disinfectant Cleaner - 10ml On-The-Go",
  },
  {
    value:
      "Dettol Liquid Disinfectant For Floor Cleaner, Surface Disinfection Personal Hygiene Lime Fresh 500ml",
    label:
      "Dettol Liquid Disinfectant For Floor Cleaner, Surface Disinfection Personal Hygiene Lime Fresh 500ml",
  },
];

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    background: "#fff",
    borderColor: "#9e9e9e",
    minHeight: "30px",
    height: "3rem",
    boxShadow: state.isFocused ? null : null,
  }),

  valueContainer: (provided, state) => ({
    ...provided,
    height: "30px",
    padding: "0 6px",
  }),

  input: (provided, state) => ({
    ...provided,
    margin: "0px",
  }),
  indicatorSeparator: (state) => ({
    display: "none",
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    height: "3rem",
  }),
};
const Navbar = () => {
  const [val, setVal] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [email, setEmail] = useState("");
  const btnRef = useRef();
  const [otpState, setOtpState] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otp1, setOtp1] = useState(0);
  const [otp2, setOtp2] = useState(0);
  const [otp3, setOtp3] = useState(0);
  const [otp4, setOtp4] = useState(0);
  const [emptyError, setEmptyError] = useState(false);
  const toast = useToast();
  const value = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (values) => {
    setVal(values);
  };

  var details = val.value;

  useEffect(() => {
    if (details) {
      navigate(`/productdetails/${details}`);
    }
  }, [details]);

  const sendMail = async (mail) => {
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:4000/api/user/mail",
        {
          mail,
        }
      );
      localStorage.setItem("user_id", res.data.id);
      setOtpState(true);
      setLoading(false);
    } catch (err) {
      setOtpState(false);
      setLoading(false);
      toast({
        title: `Try Again`,
        status: "error",
        isClosable: true,
      });
    }
  };
  const sendOtp = async () => {
    setLoading(true);
    try {
      let otp = "";
      otp += otp1 + otp2 + otp3 + otp4;
      const user_id = localStorage.getItem("user_id");
      console.log("Before sending OTP request");
      const res = await axios.post(
        `http://localhost:4000/api/user/verify/${user_id}`,
        { otp: Number(otp) }
      );
      console.log("After sending OTP request", res);
      if (res.status === 200) {
        onClose();
        setLoading(false);
        localStorage.setItem("logIn", true);
        value.setAuthState(true);
        toast({
          title: `User LoggedIn successfully`,
          status: "success",
          isClosable: true,
        });
      }
    } catch (err) {
      toast({
        title: `Otp is Wrong`,
        status: "error",
        isClosable: true,
      }); 
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div
        onClick={() => {
          navigate("/");
        }}
      >
         <img src={oxanto_logo} alt="" className={styles.image}/>
        {/* <Text className={styles.text}>  
        Oxanto LifeSciences
      </Text> */}
        {/* <img
          // src="https://assets.pharmeasy.in/web-assets/dist/fca22bc9.png"
          alt=""
        /> */}
      </div>

      <div>
        <div>
          <InputGroup size="lg" width={"75%"}>
            <InputLeftAddon children={<SelectPin />} />

            <div
              style={{ width: "40rem", height: "3rem", objectFit: "contain" }}
            >
              <Select
                onChange={handleChange}
                placeholder="Search medicines/Healthcare products"
                svg=""
                options={options}
                color={"black"}
                styles={customStyles}
              />
            </div>
            <InputRightAddon children={<SearchIcon h={8} color="gray.500" />} />
          </InputGroup>
        </div>
        <div className={styles.tabContainer}>
          <div>
            <div>
              <Link to="/allproducts">All Products</Link>
            </div>
            <div>
              <Link to="/healthcare">Categories</Link>
            </div>
            {/* <div>
              <Link to="/labtest">Lab tests</Link>
            </div> */}
            {/* <div>
              <Link to="/rtpcr">RTPCR</Link>
            </div> */}
          </div>
          <Flex marginRight={"2rem"}>
            <Flex>
              {/* <TbDiscount2
                style={{ marginTop: "0.2rem", marginRight: "0.4rem" }}
                size="23px"
              /> */}
              {/* <p style={{ cursor: "pointer", color: "white" }}>Offers</p> */}
            </Flex>
            <Flex>
              <RiUser5Fill
                style={{ marginTop: "0.2rem", marginRight: "0.4rem" }}
                size="23px"
              />
              <Menu>
                <MenuButton
                  style={{ cursor: "pointer", color: "white" }}
                  ref={btnRef}
                  onClick={onOpen}
                >
                  {value.authState ? "User" : "Login / Signup"}
                </MenuButton>
                {value.authState ? (
                  <>
                    <MenuList>
                      <MenuItem
                        onClick={() => navigate("/myorders")}
                        color="black"
                        _hover={{ color: "teal.500" }}
                      >
                        My Orders
                      </MenuItem>
                      <MenuItem
                        onClick={() => navigate("/myrefills")}
                        color="black"
                        _hover={{ color: "teal.500" }}
                      >
                        My Refills
                      </MenuItem>
                      <MenuItem
                        onClick={() => navigate("/medicalrecord")}
                        color="black"
                        _hover={{ color: "teal.500" }}
                      >
                        Medical Records
                      </MenuItem>
                      <MenuItem
                        onClick={() => navigate("/myprofile")}
                        color="black"
                        _hover={{ color: "teal.500" }}
                      >
                        My Profile
                      </MenuItem>
                      {/* <MenuItem
                        onClick={() => navigate("/wallet")}
                        color="black"
                        _hover={{ color: "teal.500" }}
                      >
                        Wallet
                      </MenuItem> */}
                      <MenuItem
                        onClick={() => navigate("/refer")}
                        color="black"
                        _hover={{ color: "teal.500" }}
                      >
                        Refer & Earn
                      </MenuItem>
                      {/* <MenuItem
                        onClick={() => navigate("/")}
                        color="black"
                        _hover={{ color: "teal.500" }}
                      >
                        Notification
                      </MenuItem> */}
                      <MenuItem
                        onClick={() => {
                          localStorage.removeItem("user_id");
                          localStorage.removeItem("logIn");
                          value.setAuthState(false);
                        }}
                        color="black"
                        _hover={{ color: "teal.500" }}
                      >
                        Log Out
                      </MenuItem>
                    </MenuList>
                  </>
                ) : (
                  <Drawer
                    isOpen={isOpen}
                    placement="right"
                    onClose={onClose}
                    size="sm"
                    finalFocusRef={btnRef}
                  >
                    <DrawerOverlay />
                    <DrawerContent>
                      <DrawerCloseButton />
                      {/* <DrawerHeader> */}
                        {/* <Flex bg="teal.500" height="100px"> */}
                          {/* <Box marginTop={"1rem"} marginLeft={"1rem"}> */}
                            {/* <h1 color={"white"} fontSize={"12"}>Oxanto LifeSciences</h1> */}
                            {/* <Image
                              src="D:/Onkar/Study/Projects/Oxanto LifeSciences/client/src/Components/assets/oxanto_logo.png"
                              alt=""
                              width={"50rem"}
                            /> */}
                            <img src={oxanto_logo} alt="" width={"100%"}/>
                          {/* </Box> */}

                          {/* <Box marginTop={"1rem"} marginLeft={"3rem"}>
                            <Image
                              src="	https://assets.pharmeasy.in/web-assets/dist/1fe1322a.svg"
                              alt=""
                              width={"8rem"}
                            />
                          </Box> */}
                        {/* </Flex> */}
                      {/* </DrawerHeader> */}
                      {otpState ? (
                        <DrawerBody>
                          <Heading size="md">Enter OTP sent to {email}</Heading>
                          <br />

                          <HStack>
                            <PinInput size="lg">
                              <PinInputField
                                onChange={(e) => setOtp1(e.target.value)}
                              />
                              <PinInputField
                                onChange={(e) => setOtp2(e.target.value)}
                              />
                              <PinInputField
                                onChange={(e) => setOtp3(e.target.value)}
                              />
                              <PinInputField
                                onChange={(e) => setOtp4(e.target.value)}
                              />
                            </PinInput>
                          </HStack>
                          <Button
                            onClick={() => {
                              let otp = "";
                              otp += otp1 + otp2 + otp3 + otp4;
                              if (otp !== "") {
                                sendOtp();
                              } else {
                                setEmptyError(true);
                              }
                            }}
                            isLoading={loading ? true : false}
                            colorScheme="teal"
                            size="lg"
                            style={{ marginTop: "1rem" }}
                            width={"25rem"}
                          >
                            Submit
                          </Button>
                        </DrawerBody>
                      ) : (
                        <DrawerBody>
                          <Heading size="md"> Quick Login / Register</Heading>
                          <br />
                          <InputGroup>
                            <InputLeftAddon children={<FiMail />} />
                            <Input
                              type="email"
                              required
                              isInvalid={emptyError ? true : false}
                              errorBorderColor={emptyError ? "red.300" : ""}
                              placeholder="Email"
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </InputGroup>
                          <br />
                          <Button
                            onClick={() => {
                              if (email !== "") {
                                sendMail(email);
                              } else {
                                setEmptyError(true);
                              }
                            }}
                            isLoading={loading ? true : false}
                            colorScheme="teal"
                            size="lg"
                            width={"25rem"}
                          >
                            Send Otp
                          </Button>
                          <br />
                          <br />
                          <Text fontSize="sm" color="teal.500">
                            By clicking continue, you agree with our Privacy
                            Policy
                          </Text>
                        </DrawerBody>
                      )}
                    </DrawerContent>
                  </Drawer>
                )}
              </Menu>
            </Flex>

            <Flex>
              <HiShoppingCart
                style={{ cursor:"pointer", marginTop: "0.2rem", marginRight: "0.4rem" }}
                size="23px"
              />
              <Link to="/cart">Cart</Link>
            </Flex>
          </Flex>
        </div>
      </div>
    </div>
  );
};

export { Navbar };
