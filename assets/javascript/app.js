

//initial array of gifs

var wordList = ["surfing", "tuna", "pineapple", "dolphin", "aloha", "turtle", "reef", "fishing", "luau"];

//function for displaying string value buttons

$("#add-gif").on("click", function(event) {
    event.preventDefault();
 
     var userAdded =  $("#gif-input").val().trim();
      console.log(userAdded);
 
      
      $("#button-view").empty();
      wordList.push(userAdded);
      console.log(wordList);
      renderButtons();
 });










function renderButtons(){
    for (var i = 0; i < wordList.length; i++) {
      
        var button = $('<button>');
        button.addClass("btn");
        button.text(wordList[i]);
        button.css("background", "blue");
        button.mouseover(function() {
            $(this).css("background-color","white");
        });
        button.mouseout(function() {
            $(this).css("background-color", "magenta").css("color", "teal");
        });
            $('#button-view').append(button);

    }

    $(".btn").on("click", function() {
        $("#display").css("display","unset");
        userInput = ($(this).text());
        console.log(userInput);
        var apiKey = "RZuVrcxRsnYkZyjfAORpDZe91c1ocg0v"
        var searchURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${userInput}&limit=12&offset=0&rating=R&lang=en`;

        $.ajax({
                url: searchURL,
                method: "GET"
            }).then(function(response) {
                console.log(response);
                $("#display").empty();
                for (let i = 0; i < response.data.length; i++) {
                    var div = $("<div>").addClass("pic");
                    var p = $("<p>").html("Rating: "+ response.data[i].rating+"<br>"+" Title: " +response.data[i].title);
                   
                      
                    var image = $("<img>")
                        .attr("src", response.data[i].images.fixed_height_still.url)
                        .attr("data-url", response.data[i].images.fixed_height.url);
                    div.append(p).append(image);


                    
                    $("#display").append(div);
                }
                $("img").on('click', function(){
                    console.log("hello");
                    let gif = $(this)
                    let nextURL = gif.attr("data-url");
                    
                    gif.attr("data-url", gif.attr("src"))
                    gif.attr("src", nextURL);
            
            
                });
            });
    
        });
            
   

}


renderButtons();
   










//     renderButtons();



// });

// renderButtons();
 
// function getGifs () {
//     //this is my query url with my API key
//     var userInput = $('#user-input').val();
    
// $('#userBtn').on('click', getGifs);


