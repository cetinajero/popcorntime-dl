function magnetLanguages() {

  const movieLanguages = [
    'en',
    'es',
    'fr',
    'de',
    'nl',
  ]

  const movieResolutions = [
    '2160p',
    '1080p',
    '720p',
  ]

  var buttons = '';

  for (var lang = 0; lang < movieLanguages.length; lang++){
    const currentLang = movieLanguages[lang];
    if (item.torrents) { // is a movie
      if (item.torrents[currentLang]) {
        for (var resolution = 0; resolution < movieResolutions.length; resolution++){
          const currentRes = movieResolutions[resolution];
          buttons += item.torrents[currentLang][currentRes]
            ? `{% include components/buttons/download-movie.html %}`
            : '';
        }
      }
    }
  }

  if (item.episodes) { // is a show
    buttons += `{% include components/buttons/view-episodes.html %}`;
  }

  return buttons;
}

function magnetShows() {
  var attributes = '';

  for (var i = 0; i < item.episodes.length; i++) {
    attributes += `
      data-episode-num-${i}="${item.episodes[i].season}x${item.episodes[i].episode}"
      data-episode-id-${i}="${item.episodes[i].tvdb_id}"
      data-episode-first-aired-${i}="${item.episodes[i].first_aired}"
      data-episode-title-${i}="${item.episodes[i].title}"
      data-episode-overview-${i}="${item.episodes[i].overview}"
      data-episode-torrents-${i}='${JSON.stringify(item.episodes[i].torrents)}'
    `;
  }

  return attributes;

}
