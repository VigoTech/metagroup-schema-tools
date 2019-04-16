const YoutubeVideos = require('./videos/youtube.js')
const TeltekVideos = require('./videos/teltek.js')
const colors = require('colors')


const Videos = {
  getGroupVideos(sources, limit, options) {
    let videos = []

    sources = sources || [{
      type: null
    }]

    // Isn't array, convert it
    if (sources.length === undefined) {
      sources = [sources]
    }

    sources.forEach(source => {
      if (source.type !== null) {
        videos = videos.concat(Videos.getVideosFromSource(source, limit, options))
      }
    })

  },
  getVideosFromSource(source, limit, options) {
    let videos = []

    switch (source.type) {
      case 'youtube':
        videos = YoutubeVideos.getChannelVideos(source, limit, options)
        break;
      case 'teltek':
        videos = TeltekVideos.getVideos(source, limit, options);
        break;
    }

    return videos
  }
}

module.exports = Videos