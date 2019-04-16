const request = require("sync-request")

module.exports = {
  getNext(source, options) {
    try {
      const dataRaw = request('GET', source.source)
      const data = JSON.parse(dataRaw.getBody('utf8'))
      if (data.date > new Date().getTime()) {
        return data
      }
    } catch (e) {
      console.log(e)
    }

    return []
  }
}