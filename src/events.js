const EventsJson = require('./events/json.js')
const EventsMeetup = require('./events/meetup.js')
const EventsEventbrite = require('./events/eventbrite.js')
const e = require('events')
let eventEmitter

const Events  = {
  getEventsEmitter () {
    eventEmitter = eventEmitter || new e.EventEmitter()
    return eventEmitter
  },
  getGroupNextEvents (sources, options) {
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
  getNextFromSource (source, options) {
    let nextEvents = []
    const eventEmitter = Events.getEventsEmitter()
    eventEmitter.emit('getNextFromSourceInit', source, options)

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

    eventEmitter.emit('getNextFromSourceCompleted', nextEvents, options)

    return nextEvents
  },
  sortByDate (events) {
    return events.sort((a, b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0))
  },
  getGroupPrevEvents (sources, options) {
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
        nextEvents = nextEvents.concat(Events.getPassFromSource(source, options))
      }
    })

    return Events.sortByDate(nextEvents)
  },
  getPassFromSource (source, options) {
    let nextEvents = []
    const eventEmitter = Events.getEventsEmitter()
    eventEmitter.emit('getPrevFromSourceInit', source, options)

    switch (source.type) {
      case 'meetup':
        nextEvents = EventsMeetup.getPrev(source, options)
        break;
      case 'eventbrite':
        nextEvents = EventsEventbrite.getPrev(source, options)
        break;
      case 'json':
        nextEvents = EventsJson.getPrev(source, options)
        break;
    }

    eventEmitter.emit('getPrevFromSourceCompleted', nextEvents, options)

    return nextEvents
  },
}

module.exports = Events


