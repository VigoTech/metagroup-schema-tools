const request = require("sync-request")

module.exports = {
  getNext (source, options) {
    const nextEvents = []
    try {
      const dataRaw = request('GET', `http://api.meetup.com/${source.meetupid}/events`)
      const data = JSON.parse(dataRaw.getBody('utf8'))

      Object.keys(data).forEach(key => {
        let item = data[key]
        nextEvents.push({
          title: item.name,
          date: item.time,
          url: item.link,
          location: item.how_to_find_us || ''
        })
      })
    } catch (e) {
      console.log(e)
    }

    return nextEvents
  },

  getPrev (source, options) {
    const prevEvents = []
    try {
      const dataRaw = request('GET', `http://api.meetup.com/${source.meetupid}/events`, {
        qs: {
          status: 'past'
        }
      })
      console.log(`http://api.meetup.com/${source.meetupid}/events`)
      const data = JSON.parse(dataRaw.getBody('utf8'))

      Object.keys(data).forEach(key => {
        let item = data[key]
        prevEvents.push({
          title: item.name,
          date: item.time,
          url: item.link,
          location: item.how_to_find_us || ''
        })
      })
    } catch (e) {
      console.log(e)
    }

    return prevEvents
  }
}
