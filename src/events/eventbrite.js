const request = require("sync-request")

module.exports = {
  getNext(source, options) {
    const nextEvents = []

    if (!options.hasOwnProperty('eventbriteToken')) {
      throw new Error('Property \'eventbriteToken\' is required in options object')
    }

    if (source.eventbriteid !== undefined && source.eventbriteid !== '') {
      try {
        const res = request('GET', `https://www.eventbriteapi.com/v3/organizations/${source.eventbriteid}/events/`, {
          qs: {},
          headers: {
            'Authorization': `Bearer ${options.eventbriteToken}`,
          }
        })

        const data = JSON.parse(res.getBody('utf8'))

        data.events.forEach(item => {
          nextEvents.push({
            title: item.name.text,
            date: new Date(item.start.utc).getTime(),
            url: item.url,
            location: `${item.venue.name} - ${item.venue.address.address_1}`
          })
        })
      } catch (e) {
        console.log(e)
      }
    }

    return nextEvents
  },
  getPrev(source, options) {
    const nextEvents = []

    if (!options.hasOwnProperty('eventbriteToken')) {
      throw new Error('Property \'eventbriteToken\' is required in options object')
    }

    if (source.eventbriteid !== undefined && source.eventbriteid !== '') {
      try {
        const res = request('GET', `https://www.eventbriteapi.com/v3/organizations/${source.eventbriteid}/events/`, {
          qs: {
            'status': 'completed'
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
            url: item.url,
            location: `${item.venue.name} - ${item.venue.address.address_1}`
          })
        })
      } catch (e) {
        console.log(e)
      }
    }

    return nextEvents
  }
}
