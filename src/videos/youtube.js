const request = require("sync-request")
const { google } = require('googleapis');

module.exports = {
  async getChannelVideos(source, limit, options) {

    if (!options.hasOwnProperty('youtubeApiKey')) {
      throw new Error('Property \'youtubeApiKey\' is required in options object')
    }


    if (!source.channel_id) {
      return []
    }
    const YouTube = google.youtube('v3');
    const videos = []

    const channelResults = await YouTube.channels.list({
      part: 'contentDetails',
      id: source.channel_id,
      limit,
      auth: options.youtubeApiKey
    })

    const channelItems = channelResults.data.items;
    for(let i in channelItems) {
      const channelItem = channelItems[i]
      const playlistId = channelItem.contentDetails.relatedPlaylists.uploads

      const playlistResults = await YouTube.playlistItems.list({
        part: 'snippet',
        playlistId: playlistId,
        maxResults: limit,
        auth: options.youtubeApiKey
      });

      const playlistItems = playlistResults.data.items;
      for(let j in playlistItems) {
        const playlistItem = playlistItems[j]

        videos.push({
          player: 'youtube',
          id: playlistItem.snippet.resourceId.videoId,
          title: playlistItem.snippet.title,
          pubDate: new Date(playlistItem.snippet.publishedAt).getTime(),
          thumbnails: playlistItem.snippet.thumbnails
        })
      }

    }

    return videos
  }
}
