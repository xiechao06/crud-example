<paginator>
<div class="ui basic center aligned segment" if={ pagination }>
  <div class="ui centered pagination menu">
    <a class="{ pagination.hasPrev? '': 'disabled' } icon item"
      href="{ pagination.urlFor(pagination.currentPage - 1) }" >
      <i class="left arrow icon"></i>
    </a>

    <raw each="{ page in pagination.pages }">
    <a href="{ pagination.urlFor(page) }" class="{ page === pagination.currentPage? 'disabled': ''} item" if={ page != null }>{ page }</a>
    <div class="disable item" if={ page === null }>...</div>
    </raw>

    <a href="{ pagination.urlFor(pagination.currentPage + 1) }" aria-label="Next"
      class="{ pagination.hasNext? '': 'disabled' } icon item">
      <i class="right arrow icon"></i>
    </a>
  </div>
</div>


<script>
  var self = this;
  RiotControl.student.on('list.fetched', function (students) {
    self.pagination = new Pagination({
      currentPage: students.state.currentPage,
      totalCount: students.state.totalCount,
      perPage: students.state.perPage,
      leftEdge: 2,
      leftCurrent: 2,
      rightCurrent: 3,
      rightEdge: 2,
    }).toJSON();
    self.pagination.urlFor = function (page) {
      var query = url('?', url('hash')) || {};
      query.page = page;
      return '#list?' + _.pairs(query).map(function (pair) {
        return pair.join('=');
      }).join('&');
    };
    self.update();
  });
</script>
</paginator>
