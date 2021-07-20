/* eslint-disable no-console */
const fs = require('fs')
const path = require('path')

function generateServiceAccountFile() {
  const root = path.resolve(__dirname, '..')

  const serviceAccountPath = path.resolve(root, 'serviceAccount.json')

  const serviceAccount = Object.entries(process.env).reduce(
    (obj, [key, value]) => {
      if (key.startsWith('FIREBASE_ADMIN_')) {
        const normedKey = key.replace(/^FIREBASE_ADMIN_/, '').toLowerCase()
        obj[normedKey] = value.toString().replace(/\\n/g, '\n')
      }
      return obj
    },
    {}
  )

  const serviceAccountStringified = JSON.stringify(serviceAccount, null, 2)

  fs.writeFile(
    serviceAccountPath,
    serviceAccountStringified,
    { encoding: 'utf-8' },
    err => {
      if (err) {
        console.log(
          '\x1b[31m%s\x1b[0m',
          `Couldn't generate service account file ${serviceAccountPath} 🤦 . Error: ${err.message}`
        )
        return
      }
      console.log(
        '\x1b[32m%s\x1b[0m',
        `Generate service account file ${serviceAccountPath} success 😎 `
      )
    }
  )
}

module.exports = generateServiceAccountFile
