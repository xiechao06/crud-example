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
  self.students = [];
  self.on('list.loading', function () {
    self.loading = true;
    self.update();
  }).on('list.fetched', function (students) {
      self.loading = false;
      self.students = students.data.data;
      self.update();
  }).on('mount', function () {
    riotBus.register(self);
  }).on('unmount', function () {
    riotBus.unregister(self);
  });
</script>
</list>
