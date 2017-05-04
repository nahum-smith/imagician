$ (() => {
  console.log('JS scripts file')
  $('#post-comment').hide()
  $('#btn-comment').on('click', (event) => {
      event.preventDefault()
      $('#post-comment').show()
  });

  $('#btn-like').on('click', (event) => {
      event.preventDefault()
      console.log($(this).data())
      // var imgId = $(this).data('id')
      // console.log(imgId)
      // $.post('/images/' + imgId + '/like')
      // .done((data) => {
      //     $('.likes-count').text(data.likes)
      //   })
    })
})
