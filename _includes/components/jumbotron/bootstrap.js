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
    if (item.torrents[currentLang]) {
      for (var resolution = 0; resolution < movieResolutions.length; resolution++){
        const currentRes = movieResolutions[resolution];
        buttons += item.torrents[currentLang][currentRes]
          ? `{% include components/buttons/download.html %}`
          : '';
      }
    }
  }

  return buttons;
}
