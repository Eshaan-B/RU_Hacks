require("dotenv").config({ path: "../keys.env" });
const { Openscreen } = require("@openscreen/sdk");

const PROJECT_ID = '9bc2845b-1ed8-449e-a737-327cc55836dd';

const os = new Openscreen().config({
  key: process.env.OS_API_KEY,
  secret: process.env.OS_API_SECRET,
});

exports.testRoute = (req, res, next) => {
  console.log(process.env.OS_API_KEY);
  console.log(process.env.OS_API_SECRET);
  res.end();
};

exports.createQR = async (req, res, next) => {
  try {
      console.log(req.body.name,req.body.description,req.bodyintent);
    res = await os
      .project(PROJECT_ID)
      .assets()
      .create({
        name: req.body.name,
        description: req.body.description,
        qrCodes: [
          {
            intent: req.body.intent,
            intentType: "DYNAMIC_REDIRECT",
          },
        ],
      });
      console.log("QR generated successfully")
  } catch (err) {
    console.log("Error in creating QR CODE");
    console.error(err.message);
  }
// THIS DOWNLOADS THE QR CODE TO YOUR SERVER

//   try {
//     const { qrCodeId } = res.asset.qrCodes[0];

//     const qrCode = await os
//       .qrCode(qrCodeId)
//       .get({ format: "PNG", dataUrl: true });

//     await os.saveQrImageDataToFile(qrCode, "my-first-qr.png");
//   } catch (err) {
//     console.log("Error in fetching generated QR");
//     console.error(err);
//   }

  res.status(200).send("Creation successful");
};


//myFirstQRCode().catch(console.error)
