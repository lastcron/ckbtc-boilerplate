const customVerify = (req: any, res: any, buf: any, encoding: any) => {
    if (buf && buf.length) {
        req.rawBody = buf.toString('utf8')
    }
}

export { customVerify };