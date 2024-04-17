const mongoose = require('mongoose');
const nodemailer = require("nodemailer");
const userModel = require("../models/user");
const hbs = require("handlebars");
require("dotenv").config();
const transport = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  port: 465, //465:ssl , 587 :tsl
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
  host: "smtp.gmail.com",
});

const userMail = async (req, res) => {
  try {
    const oldUser = await userModel.findOne({ mail: req.body.mail });

    if (!oldUser) {
      const newUser = new userModel({ ...req.body });
      await newUser.save();

      const content = `<div>
                          <h1>hello</h1>
                          <p>thank you for signing up, here is your {{otp}}</p>
                        </div>`;

      const template = hbs.compile(content);

      const otp = Math.floor(1000 + Math.random() * 9000);
      await userModel.updateOne({ _id: newUser._id }, { $push: { otp: otp } }); //first otp is db, second otp is the value from the frontend

      await transport.sendMail({
        from: process.env.EMAIL,
        to: req.body.mail,
        subject: "here is your otp.",
        html: template({ otp: otp }),
      });

      return res.send({
        message: "user signup successfully",
        id: newUser._id,
      });
    } else {
      const content = `<div>
                            <h1>hello</h1>
                            <p>thank you for signing up, here is your {{otp}}</p>
                        </div>`;

      const template = hbs.compile(content);

      const otp = Math.floor(1000 + Math.random() * 9000);
      await userModel.updateOne({ _id: oldUser._id }, { $push: { otp: otp } });

      await transport.sendMail({
        from: process.env.EMAIL,
        to: req.body.mail,
        subject: "here is your otp.",
        html: template({ otp: otp }),
      });

      return res.send({
        message: "user signup successfully",
        id: oldUser._id,
      });
    }
  } catch (error) {
    console.error("Error in userMail:", error);
    return res.status(500).send("Internal Server Error");
  }
};

async function userVerify(req, res) {
  try {
    const { id } = req.params;
  

    // Validate if id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send("Invalid ID format");
    }

    // Use email as a unique identifier instead of _id
    const otpObj = await userModel.findOne({ email: id });
    // console.log("fnd")

    if (!otpObj) {
      console.error(`User with email ${id} not found`);
      return res.status(404).send("User not found");
    }

    const otpArr = otpObj.otp;

    // Assuming you have the OTP value from the request body
    const { otp } = req.body;
    
    if (otpArr[otpArr.length - 1] === otp) {
      // console.log("correct otp");
      return res.status(200).send("Your OTP has been verified!");
      
    } else {
      console.error(`Incorrect OTP for user email ${id}`);
      return res.status(400).send("Incorrect OTP");
    }
  } catch (error) {
    console.error("Error in userVerify:", error);
    return res.status(500).send("Internal Server Error");
  }
}

module.exports = { userMail, userVerify }; 