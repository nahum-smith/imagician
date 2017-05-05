$ (() => {
  console.log('JS scripts file')
  $('#post-comment').hide()

  $('#btn-comment').on('click', (event) => {
      event.preventDefault()
      $('#post-comment').show()
  });

  $('#btn-like').on('click', function(event) {
      event.preventDefault()
      console.log($(this).data('id'))
      let imgId = $(this).data('id')
      $.post('/images/' + imgId + '/like')
      .done((data) => {
        console.log(data)
           $('.likes-count').text(data.likes)
         })
    })
})
