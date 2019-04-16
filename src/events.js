const EventsJson = require('./events/json.js')
const EventsMeetup = require('./events/meetup.js')
const EventsEventbrite = require('./events/eventbrite.js')

const Events  = {
  getGroupNextEvents(sources, options) {
    sources = sources || [{
      type: null
    }]

    // Isn't array, convert it
    if (sources.length === undefined) {
      sources = [sources]
    }

    let nextEvents = []
    sources.forEach(source => {
      if (source.type !== null) {
        nextEvents = nextEvents.concat(Events.getNextFromSource(source, options))
      }
    })

    return Events.sortByDate(nextEvents)
  },
  getNextFromSource(source, options) {
    let nextEvents = []

    switch (source.type) {
      case 'meetup':
        nextEvents = EventsMeetup.getNext(source, options)
        break;
      case 'eventbrite':
        nextEvents = EventsEventbrite.getNext(source, options)
        break;
      case 'json':
        nextEvents = EventsJson.getNext(source, options)
        break;
    }

    return nextEvents
  },
  sortByDate(events) {
    return events.sort((a, b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0))
  }
}

module.exports = Events


