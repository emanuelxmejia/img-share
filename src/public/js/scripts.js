$('#btn-like').click(function(e){
    e.preventDefault();

    let imageid = $(this).data('id');
    // console.log(imageid);

    $.post('/images/' + imageid + '/like')
        .done(data => {
            console.log(data);
            $('.likes-count').text(data.likes);
        });
});
