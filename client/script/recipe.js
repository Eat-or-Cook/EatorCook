
var url = `http://localhost:3000`
var cardColumns = $("#cardColumns")
var template = `<div class="card">
          <img class="card-img-top" src="..." alt="Card image cap">
          <div class="card-body">
            <h5 class="card-title">Card title that wraps to a new line</h5>
            <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
          </div>
        </div>`

// cardColumns.show()

$("#form-search").on("submit", function(e) {
  $('#cardColumns').empty()
  e.preventDefault()
  console.log($("#input-search").val())
  $.ajax({
    type: "GET",
    url: `http://localhost:3000`,
    headers: {
      token: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJtYXJjZWwubXAxMDAwQGdtYWlsLmNvbSIsImlhdCI6MTU4MTA1MzU0Nn0.zhwcN_bXJKRslKfbNFft9kzjBnIVKNSsL3ap_UzwxqU`
    },
    data:{

      find: $("#input-search").val()
    }
  })
  .done(res=>{
  res.forEach(element => {
    
    let strIngredient = ""
      element.ingredient.forEach(ingredients =>{
        strIngredient += ingredients+"<br>"
      })
      $("#cardColumns").append(
      `<div class="card mb-3" style="background-color: #dc3545!important;display: inline-block; width: 90%;">
        <img class="card-img-top" src="${element.image}" alt="Card image cap text-white bg-danger" style="height:30vh";>
        <div class="card-body" style="width: 18rem;background-color: #dc3545!important;" >
          <h5 class="card-title" style="background-color: #dc3545!important;color=white;">${element.label}</h5>
          <p class="card-text" style="color: white;">${strIngredient}</p>
          <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
        </div>
        <div class="card-footer text-center" id="likeorDislike">
                  <button class="btn text-danger" onClick="like(${element.label})">Like</button>
                  </div>          
              </div>`
        )

                  // <button class="btn text-danger" id="btn-dislike" data-id="btn-dislike-${element.label}" onClick="">Dislike</button>
    });
      
    // console.log(strIngredient)
})
.fail(err=>{
    console.log(err, "<<<<<<<<")
})
 
})
$(document).ready()
function like(label) {
    $.ajax({
      method: "POST",
      url:`http://localhost:3000`,
      headers: {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJtYXJjZWwubXAxMDAwQGdtYWlsLmNvbSIsImlhdCI6MTU4MTA1MzU0Nn0.zhwcN_bXJKRslKfbNFft9kzjBnIVKNSsL3ap_UzwxqU"
      },
      data:{
        food: label
    }
})
    .done(result=>{
        $("#likeorDislike").empty()
        $("#likeorDislike").append(
        `<button class="btn text-danger" onClick="dislike(${label})">Dislike</button>`
        )
    })
    .fail(err=>{
        console.log
    })
}

function dislike(label) {
    $.ajax({
        method:"DELETE",
        url:`http://localhost:3000`,
    })    
}

// recipes()