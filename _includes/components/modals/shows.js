$('#bootstrapModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget)
  var modal = $(this)

  // Extract info from data-* attributes
  modal.find('.modal-title').text(button.data('title'))
  for (var i = 0; i < button.data('episodes'); i++) {
    modal.find(`#dataTitleEpisode${i}`).text(button.data(`title-episode-${i}`))
  }
})
