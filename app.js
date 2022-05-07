const {Openscreen} = require('@openscreen/sdk')

const PROJECT_ID = '**PROJECT_ID**' // add project ID from openscreen dashboard

const os = new Openscreen().config({ // add from openscreen dashboard
  key: '**KEY**',
  secret: '**SECRET**',
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