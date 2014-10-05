$('#toggle').click(function() {
  $.post('/toggle', {}, function(data) {
    console.log(data);
  });
})