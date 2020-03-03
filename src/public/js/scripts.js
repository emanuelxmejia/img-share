$('#post-comment').hide();
$('#btn-toggle-comment').click(e => {
    e.preventDefault();

    $('#post-comment').slideToggle();
});

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

$('#btn-delete').click(function(e){
    e.preventDefault();

    // save the html element
    let $this = $(this);

    const response =  confirm('Are you sure want to delete this image?');

    if(response) {
        let imageid =  $this.data('id');
        $.ajax({
            url: '/images/' + imageid,
            type: 'DELETE'
        })        
        .done(function(result) {
            $this.removeClass('btn-danger').addClass('btn-success');
            $this.find('i').removeClass('fa-times').addClass('fa-check');
            $this.append('<span>Deleted!</span>');
        });
    }
});