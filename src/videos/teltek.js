const rssParser = require('rss-parser')
const parser = new rssParser()

module.exports = {
  async getVideos(source, limit, options) {
    let results = []
    let feed = await parser.parseURL(source.source);

    feed.items.forEach(item => {
      try {
        results.push({
          player: 'native',
          id: item.guid.match(/pumukit\/(.*)\/(.*)\.mp4/)[2],
          src: item.link,
          title: item.title,
          pubDate: new Date(item.pubDate).getTime(),
          thumbnail: item.itunes.image
        })
      } catch (e) {
        console.log('Error getting Teltek videos')
      }
    });
    return results
  }
}
