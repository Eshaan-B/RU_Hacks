require('dotenv').config({path:'./keys.env'});
const {Openscreen} = require('@openscreen/sdk')

const PROJECT_ID =  '9bc2845b-1ed8-449e-a737-327cc55836dd' // add project ID from openscreen dashboard

const os = new Openscreen().config({ // add from openscreen dashboard
  key: '6wfuSGve45zXcMZEvq',
  secret: 'SeUUWcnxFO9FAX71nBm8QIvG',
})


async function myFirstQRCode(event) {
  const res = await os
    .project(PROJECT_ID)
    .assets()
    .create({
      name: 'Openscreen website',
      description: 'Dynamic QR code to https://openscreen.com',
      qrCodes: [
        {
          intent: 'https://openscreen.com',
          intentType: 'DYNAMIC_REDIRECT',
        },
      ],
    })

  const {qrCodeId} = res.asset.qrCodes[0]

  const qrCode = await os.qrCode(qrCodeId).get({format: 'PNG', dataUrl: true})

  await os.saveQrImageDataToFile(qrCode, 'my-first-qr.png')
}

myFirstQRCode().catch(console.error)