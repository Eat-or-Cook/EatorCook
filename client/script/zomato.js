var data = []
  var $zomato = $('#zomato-list')
  var $google = $("#google-map")
  var $zomatoItems = $('#zomato-items')
  searchZomato()
  //helper
  $(window).scroll(function() {
    if($(window).scrollTop() + $(window).height() == $(document).height()) { 
      if(data.length > 0 && $zomato.is(":visible")){
        searchZomato(data.length)
      }
    }
  });
  
  
  function closeDetail(){
    $zomato.show()
    $google.hide()
  }
  ////
  function detail(id){
    $zomato.hide()
    $google.show()
    token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ0ZXN0QGdtYWlsLmNvbSIsImlhdCI6MTU4MTA0MjU5NH0.Lv4R7J2cahV4d7S_rrN-QtF3fD6iq__yS9DTxQ02nlo"
    $.ajax(`http://localhost:3000/zomato/${id}`,{
      method: "GET",
      headers:{
        token
      }
    })
    .done(function(result){
      console.log(result)
      var template = `
                        <div class="card text-white bg-danger" >
                          <img class="card-img" src="" alt="Card image cap" style="height:30vh;">
                          <div class="card-body">
                            <h4 class="card-title">
                            </h4>
                            <small class="card-rating">
                              <span id="review"></span>
                              <span class="fa fa-star" id="s1"></span>
                              <span class="fa fa-star" id="s2"></span>
                              <span class="fa fa-star" id="s3"></span>
                              <span class="fa fa-star" id="s4"></span>
                              <span class="fa fa-star" id="s5"></span>
                              <span id="votes"></span>
                            </small>
                            <h6 id="cuisine"></h6>
                            <p class="card-text">
                              <table class="table text-light">
                                <tr>
                                  <td>Address</td>
                                  <td id="address"></td>
                                </tr>
                                <tr>
                                  <td>Homepage</td>
                                  <td id="homepage"></td>
                                </tr>
                                <tr>
                                  <td>Phone Number</td>
                                  <td id="phone_number"></td>
                                </tr>
                              </table>
                            </p>
                          </div>
                          <div class="card-footer text-center">
                            <button class="btn btn-light" id="like">text</button>
                            <button class="btn btn-light" onClick="" type="button" id="close">Close</button>
                          </div>
                        </div>
                      </div>`
      var $detail = $('#detail')
      $detail.empty()
      var $item = $(template)
      console.log(result)
      $item.find('.card-title').append(result.name)
      $item.find('#review').append(result.user_rating.aggregate_rating)
      for (var i = 0; i < Math.floor(result.user_rating.aggregate_rating); i++){
        $item.find(`#s${i+1}`).addClass("checked")  
      }
      $item.find('#votes').append(`(${result.user_rating.votes})`)
      $item.find('#cuisine').append(`${result.cuisines}`)
      $item.find('#address').append(`${result.location.address}`)
      var link = `<a href="${result.url}" class="text-light">${result.name}</a>`
      $item.find('#homepage').append(link)
      $item.find('#close').attr('onClick',`closeDetail()`)
      $item.find('#phone_number').append(`${result.phone_numbers}`)
      $item.find('.card-img').attr('src',result.featured_image)

      newLocation(Number(result.location.latitude),Number(result.location.longitude))
      calcRoute(Number(result.location.latitude),Number(result.location.longitude))
      $detail.append($item)
      console.log(result.userFavorite)
      if(!result.userFavorite){
        $item.find('#like').attr('id',`like${result.id}`)
        var $btnfavorite = $(`#like${result.id}`)
        $item.find(`#like${result.id}`).html('Like')
        $btnfavorite.on('click',function(e){
          e.preventDefault();
          likeFavorite(result.id)
        })
      }else{
        $item.find('#like').attr('id',`dislike${result.id}`)
        var $btnfavorite = $(`#dislike${result.id}`)
        $item.find(`#dislike${result.id}`).html('Dislike')
        $btnfavorite.on('click',function(e){
          e.preventDefault();
          dislikeFavorite(result.userFavorite.RestaurantId,result.id)
        })
      }
      
    })
    .fail(function(err){
      console.log(err)
    })
    
  }

  function likeFavorite(id){
    token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ0ZXN0QGdtYWlsLmNvbSIsImlhdCI6MTU4MTA0MjU5NH0.Lv4R7J2cahV4d7S_rrN-QtF3fD6iq__yS9DTxQ02nlo"
    $.ajax('http://localhost:3001/restaurant',{
      method : "POST",
      headers : {
        token : token
      },
      data : {
        name : id
      }
    })
    .done(function(result){
      closeDetail()
      detail(id)
      console.log(result.data)
    })
    .fail(function(err){
      console.log(err)
    })
  }

  function dislikeFavorite(id,zomatoId){
    token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ0ZXN0QGdtYWlsLmNvbSIsImlhdCI6MTU4MTA0MjU5NH0.Lv4R7J2cahV4d7S_rrN-QtF3fD6iq__yS9DTxQ02nlo"
    $.ajax(`http://localhost:3001/restaurant/${id}`,{
      method : "DELETE",
      headers : {
        token : token
      },
    })
    .done(function(result){
      closeDetail()
      detail(zomatoId)
      console.log(result)
    })
    .fail(function(err){
      console.log(err)
    })
  }

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
                  <button type="button" class="btn btn-light" onClick="">Click for detail</button>
              </div>
            </div>
          </div>`
    
    $zomatoItems.empty()
    for (var i = 0; i < data.length; i++){
      $item = $(template)
      $item.find('.card-title').append(data[i].restaurant.name)
      $item.find('.card-text').append(data[i].restaurant.cuisines)
      $item.find('.card-img-top').attr('src',data[i].restaurant.featured_image)
      $item.find('.btn.btn-light').attr('onClick',`detail(${data[i].restaurant.id})`)
      $zomatoItems.append($item)
      //console.log(data[i].restaurant)
    }
  }

  function searchZomato(start=0){
    $.ajax(`http://localhost:3000/zomato?start=${start}`,{
      method: "GET"
    })
    .done(function(result){
        $('.spinner-grow').hide()
        $zomato.show()
        data = data.concat(result.restaurants)
        loadZomato()
    })
    .fail(function(err){
      console.log(err)
    })
  }