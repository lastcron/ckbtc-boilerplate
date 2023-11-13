const customVerify = (req: any, res: any, buf: any, encoding: any) => {
  if (buf && buf.length) {
    req.rawBody = buf.toString('utf8')
  }
}

const stringToHex = (str: string) => {
  let hex = ''
  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i)
    const hexValue = charCode.toString(16)

    // Pad with zeros to ensure two-digit representation
    hex += hexValue.padStart(2, '0')
  }
  return hex
}

export { customVerify, stringToHex }
