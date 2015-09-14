<list>
<loader if={ loading } />
<div class="ui items">
  <div class="item" each={ students }>
    <div class="image">
      <img src="http://127.0.0.1:8081/{image.path}">
    </div>
    <div class="content">
      <a class="header">{ name }</a>
      <div class="meta">
        <span>Description</span>
      </div>
      <div class="description">
        <p>{ description }</p>
      </div>
      <div class="extra">
        { extra }
      </div>
    </div>
  </div>
</div>
<script>
  var self = this;
  RiotControl.on('loading', function () {
    self.loading = true;
    self.update();
  });
  RiotControl.on('fetched', function (students) {
      self.loading = false;
      self.students = students.data.data;
      self.update();
  });
</script>
</list>
