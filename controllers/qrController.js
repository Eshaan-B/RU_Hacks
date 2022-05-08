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
      accessToken = res.token;
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

  // try {
  //   const { qrCodeId } = res.asset.qrCodes[0];
  //   const qrCode = await os
  //     .qrCode(qrCodeId)
  //     .get({ format: "PNG", dataUrl: true });
  //   await os.saveQrImageDataToFile(qrCode, "my-first-qr.png");
  // }

  // catch (err) {
  //   console.log("Error in fetching generated QR");
  //   console.error(err);
  // }

  res.status(200).send("Creation successful");
};

exports.getQRCodes = async (req, res, next) => {
  sdk.auth('eyJraWQiOiJ4ZFFwRkoxVDRRWnJMWXJYVHR4VVA5SVUxMGh3M240K0FTS1hWcWxaZkNJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIwNzUzZDg3ZS1kY2MwLTRlM2QtYTUyMy02OWQ0ZWUzN2VjZGUiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9Bd2ZOUzA4bHMiLCJjbGllbnRfaWQiOiI2MXJrM3JhOW9sbjJhMDhlMm9oNG12dnE3ayIsIm9yaWdpbl9qdGkiOiJhNmNlYmM5Ni02MjNlLTRiNTktYmYzNS1lNWQ5NjU0NjBmMWUiLCJldmVudF9pZCI6IjQ0MmY4ZTcyLWQ1NmMtNDU5ZC1hZTUwLTZjNzM2ZmIyZTRmZCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2NTE5ODY4MzUsImV4cCI6MTY1MjAzMDAzNCwiaWF0IjoxNjUxOTg2ODM1LCJqdGkiOiI3ZTRhZGI0Yy0xNzE0LTRkYzYtYmY5MC0wMTU1MTFjZGJlN2UiLCJ1c2VybmFtZSI6IjZ3ZnVzZ3ZlNDV6eGNtemV2cSJ9.hGt6gilc6i8otQQU22Qp9XtpSIuyO-1Jsk5KJRC3DT46JpUsLZ8sTiK65bnyw6dPOwsDVth-ymdmJ98MDf8unOQwmUZBEKypAvNlIAmHtJNy9N9N4bVQF-NBlUTIPZcfYqf3bovw8yKQv4jvKIz4o5o7wZk5fw-hAP-z9fajA2NcwXOhw79BKmT7OicWcwQy787aGYu0Q_n5DHa6JeiBiAqmEUe5KB63uEfW4vJKSP39kAdBcGKm5NE34eYWZVF1lHix3OAVoR_j8g8z6PJNJCHrT9HtjmGIuuBL3sCHxEMO3wOrXrXvWF0avlnLX8t8N0ia6L9a79O85CXBYxLODw');
  sdk.GetQrCodesByProjectId({ limit: '10', projectId: '9bc2845b-1ed8-449e-a737-327cc55836dd' })
    .then(res => {
      console.log(res.qrCodes);
      var qrCodes = res.qrCodes;
      
      //saving qrcode images
      (qrCodes).forEach(async (qrCodes) =>  {
        
        var qrId = qrCodes.qrCodeId;

        try {
       
          const qrCode = await os
            .qrCode(qrId)
            .get({ format: "PNG", dataUrl: true });
          await os.saveQrImageDataToFile(qrCode, `qrImages/${qrId}.png`);
          console.log(`${qrId} saved\n`);
        }
      
        catch (err) {
          console.log("Error in fetching generated QR");
          console.error(err);
        }
        
       // ===============================
        
      });
    })
    .catch(err => console.error(err));
  // TODO: SEND THE IMAGE
};


