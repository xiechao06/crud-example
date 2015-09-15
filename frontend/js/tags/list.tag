<list>
<loader if={ loading } />
<div class="ui items">
  <div class="item" each={ students }>
    <div class="image">
      <img src="http://127.0.0.1:8081{images[0] && images[0].path}">
    </div>
    <div class="content">
      <a class="header" href="#object/{id}">{ name }</a>
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
  this.students = [];
  RiotControl.student.on('list.loading', function () {
    self.loading = true;
    self.update();
  });
  RiotControl.student.on('list.fetched', function (students) {
      self.loading = false;
      self.students = students.data.data;
      self.update();
  });
</script>
</list>
