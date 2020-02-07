var data = []
  var $zomato = $('#zomato-list')
  var $google = $("#google-map")
  var $zomatoItems = $('#zomato-items')
  searchZomato()
  //helper
  $(window).scroll(function() {
    if($(window).scrollTop() + $(window).height() == $(document).height()) { 
      if(data.length > 0 && $zomato.is(":visible"))
      searchZomato(data.length)
    }
  });
  
  
  function closeDetail(){
    // $zomato.show()
    // $google.hide()
  }
  ////

  function loadZomato(){
    var template = `
          <div class="col-4">
            <div class="card text-white bg-danger" style="width: 18rem;">
              <img class="card-img-top" src="..." alt="Card image cap">
              <div class="card-body">
                <h5 class="card-title"></h5>
                <p class="card-text"></p>
              </div>
              <div class="card-footer text-center">
                  <button class="btn text-danger" onClick="">Click for detail</button>
              </div>
            </div>
          </div>`
    
    $zomatoItems.empty()
    for (var i = 0; i < data.length; i++){
      $item = $(template)
      $item.find('.card-title').append(data[i].restaurant.name)
      $item.find('.card-text').append(data[i].restaurant.cuisines)
      $item.find('.card-img-top').attr('src',data[i].restaurant.featured_image)
      $item.find('.btn.text-danger').attr('onClick',`detail(${data[i].restaurant.id})`)
      $zomatoItems.append($item)
      //console.log(data[i].restaurant)
    }
  }

  function searchZomato(start=0){
    $.ajax(`http://localhost:3001/zomato?start=${start}`,{
      method: "GET"
    })
    .done(function(result){
        data = data.concat(result.restaurants)
        loadZomato()
    })
    .fail(function(err){
      console.log(err)
    })
  }