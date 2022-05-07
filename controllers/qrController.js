require("dotenv").config({ path: "../keys.env" });
const { Openscreen } = require("@openscreen/sdk");
const sdk = require("api")("@os-api/v1.0#134y6gwl26ji0cw");

const PROJECT_ID = "9bc2845b-1ed8-449e-a737-327cc55836dd";

var accessToken;

const os = new Openscreen().config({
  key: process.env.OS_API_KEY,
  secret: process.env.OS_API_SECRET,
});

exports.testRoute = (req, res, next) => {
  console.log(process.env.OS_API_KEY);
  console.log(process.env.OS_API_SECRET);
  res.end();
};

exports.getAccessToken = (req, res, next) => {
  sdk
    .GetAccessToken({
      accessKey: process.env.OS_API_KEY,
      accessSecret: process.env.OS_API_SECRET,
    })
    .then((res) => {
      console.log(res);
      accessToken=res.token;
      console.log(accessToken);

    })
    .catch((err) => console.error(err));
  res.end();
};

exports.createQR = async (req, res, next) => {
  try {
    console.log(req.body.name, req.body.description, req.bodyintent);
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
    console.log("QR generated successfully");
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

exports.getQRCodes = async (req, res, next) => {
  sdk.auth('eyJraWQiOiJ4ZFFwRkoxVDRRWnJMWXJYVHR4VVA5SVUxMGh3M240K0FTS1hWcWxaZkNJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIwNzUzZDg3ZS1kY2MwLTRlM2QtYTUyMy02OWQ0ZWUzN2VjZGUiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9Bd2ZOUzA4bHMiLCJjbGllbnRfaWQiOiI2MXJrM3JhOW9sbjJhMDhlMm9oNG12dnE3ayIsIm9yaWdpbl9qdGkiOiJhMDVlZTJmNS1iNzJiLTQzMGUtODY3Ny05YjhjMGZmMGNkZTQiLCJldmVudF9pZCI6ImYzY2E5Nzc1LTI0MWUtNDIwYi1iNmU2LTM0MTMxNTRiNWU1MSIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2NTE5NDY0NDcsImV4cCI6MTY1MTk4OTY0NywiaWF0IjoxNjUxOTQ2NDQ3LCJqdGkiOiIyYWNkMDdhYy0xMGYxLTRmN2MtYTVkMC05MDg2MTJkMjI4YTAiLCJ1c2VybmFtZSI6IjZ3ZnVzZ3ZlNDV6eGNtemV2cSJ9.ObG3OqhtMHU1g_NBkfFOJ5ZfiLr9ZXy6KyzqXDKVjHfsDLskGqWMykdt5gcTtOFrVOqICGPcah9lk_H2dmjv-auuXpAgBFDXluVVslMGE_jSzS-ULoswO1h4PkEmXZfA8L0XeZFYWzA7E5Fc3x6Sa9nbwjEUoU4rf1j8xKnB6N2tB-k7djdh0kWnA81FrH7tW0CLgZgbU7FAvPOhf516z11LojjGjsRv2r1g7JEaJfNvlpTy3uumtMofFSSXpSS8y1KlqGbry-_F05UD7ygnoXhEkqI9u1qvDnKiMGw6QWOoyZmv7kCM00PtFkWBylSfSiQsjmrNvJ_dUTjjUvt0Vg');
  sdk.GetQrCodesByProjectId({limit: '10', projectId: '9bc2845b-1ed8-449e-a737-327cc55836dd'})
    .then(res => console.log(res))
    .catch(err => console.error(err));
};
