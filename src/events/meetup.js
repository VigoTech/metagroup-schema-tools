const request = require("sync-request")

module.exports = {
  getNext(source, options) {
    const nextEvents = []
    try {
      const dataRaw = request('GET', `http://api.meetup.com/${source.meetupid}/events`)
      const data = JSON.parse(dataRaw.getBody('utf8'))

      Object.keys(data).forEach(key => {
        let item = data[key]
        nextEvents.push({
          title: item.name,
          date: item.time,
          url: item.link
        })
      })
    } catch (e) {
      console.log(e)
    }

    return nextEvents
  }
}