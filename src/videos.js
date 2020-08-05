const YoutubeVideos = require('./videos/youtube.js')
const TeltekVideos = require('./videos/teltek.js')
const e = require('events')
let eventEmitter

const Videos = {
  getEventsEmitter() {
    eventEmitter = eventEmitter || new e.EventEmitter()
    return eventEmitter
  },
  async getGroupVideos(sources, limit, options) {
    let videos = []

    sources = sources || [{
      type: null
    }]

    // Isn't array, convert it
    if (sources.length === undefined) {
      sources = [sources]
    }

    for(let sourceKey in sources) {
      let source = sources[sourceKey]
      if (source.type !== null) {
        videos = videos.concat(await Videos.getVideosFromSource(source, limit, options))
      }
    }
    return videos

  },
  async getVideosFromSource(source, limit, options) {
    let videos = []
    const eventEmitter = Videos.getEventsEmitter()
    eventEmitter.emit('getVideosFromSourceInit', source, options)

    try {
      switch (source.type) {
        case 'youtube':
          videos = await YoutubeVideos.getChannelVideos(source, limit, options)
          break;
        case 'teltek':
          videos = await TeltekVideos.getVideos(source, limit, options);
          break;
      }
    } catch (e) {
      console.error(source, e)
    }

    eventEmitter.emit('getVideosFromSourceCompleted', videos, options)

    return videos
  }
}

module.exports = Videos
