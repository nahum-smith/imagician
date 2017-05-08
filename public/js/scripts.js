$(() => {
  console.log('JS scripts file')
  $('#post-comment').hide()

  $('#btn-comment').on('click', (event) => {
      event.preventDefault()
      $('#post-comment').show()
  });

  $('#btn-like').on('click', function (event) {
      event.preventDefault()
      console.log($(this).data('id'))
      let imgId = $(this).data('id')
      $.post('/images/' + imgId + '/like')
      .done((data) => {
        console.log(data)
           $('.likes-count').text(data.likes)
         })
    })
  $('#btn-delete').on('click', function (event) {
      event.preventDefault()
      let $this = $(this)
      let remove = confirm('Are you sure you want to delete this image?');
      console.log(remove)
      if (remove) {
        let imgId = $(this).data('id')
        console.log(imgId)
        $.ajax({
            url: `/images/${imgId}`,
            type: 'DELETE'
            })
          .done((result) => {
            console.log(result)
              if (result) {
                  $this.removeClass('btn-danger').addClass('btn-success')
                  $this.find('i').removeClass('fa-times').addClass('fa-check')
                  $this.append('<span> Deleted!</span>')
                  
              }
          })
      }
    })
})
