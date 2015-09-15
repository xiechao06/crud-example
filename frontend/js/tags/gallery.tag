<gallery>
<loader if={ loading }></loader>

<div class="ui segment">
  <div class="ui small images">
    <img class="ui image" each={ opts.images } src="http://127.0.0.1:8081{ path }">
    <div class="circular ui green massive icon button">
      <i class="plus icon"></i>
      <input type="file" onchange={ change }>
    </div>
  </div>
</div>

<script>
  change(e) {
    var file = e.currentTarget.files[0];
    var fr = new FileReader();
    fr.onload = function (e) {
      var fd = new FormData();
      fd.append('file', file);
      $.ajax({
        url: 'http://127.0.0.1:8081/upload',
        type: 'POST',
        data: fd,
        processData: false,
        contentType: false,
        cache: false,
      }).done(function (data) {
        console.log('ok');
      }).fail(function () {
      }).always(function () {
        $(e.currentTarget).val('');  // allow upload the same file for multiple times
      });
    };

    fr.readAsDataURL(file);
  }
</script>

</gallery>
