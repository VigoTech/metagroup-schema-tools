const request = require("sync-request")

module.exports = {
  getNext(source, options) {
    const nextEvents = []

    if (!options.hasOwnProperty('eventbriteToken')) {
      throw new Error('Property \'eventbriteToken\' is required in options object')
    }

    if (source.eventbriteid !== undefined && source.eventbriteid !== '') {
      try {
        const res = request('GET', 'https://www.eventbriteapi.com/v3/events/search/', {
          qs: {
            'organizer.id': source.eventbriteid
          },
          headers: {
            'Authorization': `Bearer ${options.eventbriteToken}`,
          }
        })

        const data = JSON.parse(res.getBody('utf8'))

        data.events.forEach(item => {
          nextEvents.push({
            title: item.name.text,
            date: new Date(item.start.utc).getTime(),
            url: item.url
          })
        })
      } catch (e) {
        console.log(e)
      }
    }

    return nextEvents
  }
}
