$('#bootstrapModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget)
  var modal = $(this)

  function appendRow() {
    var rows = '';

    for (var i = 0; i < button.data('episodes'); i++) {
      rows += `
        <tr>
          <th scope="row">${i+1}</th>
          <td id="dataEpisodeNum${i}"></td>
          <td id="dataEpisodeFirstAired${i}"></td>
          <td id="dataEpisodeTitle${i}"></td>
          <td id="dataEpisodeOverview${i}"></td>
        </tr>
      `;;
    }

    return rows;
  }

  document.querySelector('.modal-body').innerHTML = `
    {% include components/tables/shows.html %}
  `;

  // Extract info from data-* attributes
  const timeZoneOffSet = new Date().getTimezoneOffset();
  modal.find('.modal-title span').text(button.data('title'))
  for (var i = 0; i < button.data('episodes'); i++) {
    modal.find(`#dataEpisodeNum${i}`).text(button.data(`episode-num-${i}`)).attr('title', 'TVDB ID: ' + button.data(`episode-id-${i}`))
    modal.find(`#dataEpisodeFirstAired${i}`).text(new Date((button.data(`episode-first-aired-${i}`)+timeZoneOffSet*60)*1000).toDateString())
    modal.find(`#dataEpisodeTitle${i}`).text(button.data(`episode-title-${i}`))
    modal.find(`#dataEpisodeOverview${i}`).text(button.data(`episode-overview-${i}`))
  }
})
