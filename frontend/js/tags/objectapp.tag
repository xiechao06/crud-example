<objectapp>
<loader if={ this.loading }></loader>
<div class="ui top attached green message">
  <span if={ this.student }>Edit</span>
  <span if={ !this.student }>Create</span>
  <span>student</span>
  <div class="ui red label" if={ this.student }>{ student.name }</div>
</div>
<div class="ui attached segment">
<form class="ui form" if={ student }>
  <div class="field">
    <label for="">Name</label>
    <input type="text" name="name" placeholder="your name here..." value="{ student && student.name }" autofocus onblur={ this.student && this.updateName }>
  </div>
  <div class="field">
    <label for="">description</label>
    <textarea name="description" cols="30" rows="10" onblur={ this.student && this.updateDescription }>{ student && student.description }</textarea>
  </div>
  <div class="field">
    <label for="">extra</label>
    <textarea name="extra" cols="30" rows="10" onblur={ this.student && this.updateExtra }>{ student && student.extra }</textarea>
  </div>
  <input type="hidden" name="images" value="{ JSON.stringify(student.images) }" >
  <div class="field">
    <label for="">images</label>
    <gallery images={ student.images }></gallery>
  </div>
  <hr>

  <button class="ui button" type="submit" if={ !student }>Submit</button>
  <a href="#list" class="ui button">返回</a>
</form>
</div>
<script>
  var self = this;
  RiotControl.student.on('object.loading', function (student) {
    self.loading = true;
    self.update();
  });
  RiotControl.student.on('object.fetched', function (student) {
    self.loading = false;
    self.student = student.data;
    self.update();
    self.committed = _.object($(self.root).find('form.form').serializeArray().map(function (i) {
      return [i.name, i.value];
    }));
  });
  this.updateName = function (e) {
    var val = e.target.value;
    var name = e.target.name;
    self.doUpdate({name: val});
  }
  this.updateDescription = function (e) {
    self.doUpdate({ description: $(e.target).val() });
  }
  this.updateExtra = function (e) {
    self.doUpdate({ extra: $(e.target).val() });
  }

  doUpdate(data) {
    for (var k in data) {
      var val = data[k];
      (val === self.committed[k]) && delete data[k];
    }
    if ($.isEmptyObject(data)) {
      return;
    }
    self.loading = true;
    self.update();
    $.ajax({
      url: 'http://127.0.0.1:8081/object/' + self.student.id,
      type: 'PUT',
      data: JSON.stringify(data),
      contentType: 'application/json; charset=utf-8',
      dataType: 'json',
    }).done(function () {
      for (var k in data) {
        self.committed[k] = data[k];
      }
      toastr.success('updated', '', {
        positionClass: 'toast-bottom-center',
        timeOut: 1000,
      });
    }).fail(function () {
      toastr.error('error', '', {
        positionClass: 'toast-bottom-center',
        timeOut: 1000,
      });
    }).always(function () {
      self.loading = false;
      self.update();
    })
  }
</script>
</objectapp>
