

//initial array of gifs

var wordList = ["surfing", "tuna", "pineapple", "dolphin", "aloha", "turtle", "reef", "fishing", "luau","poop","rainbow", "surf board", "spear-fishing"];
var count = 0;
//function for displaying string value buttons

$("#add-gif").on("click", function(event) {
    event.preventDefault();
    if ($("#gif-input").val() == "") {
        alert("You need to type something in the search bar first genius!");
    } else {

 
     var userAdded =  $("#gif-input").val().trim();
      console.log(userAdded);
 
      
      $("#button-view").empty();
      wordList.push(userAdded);
      console.log(wordList);
      renderButtons();
    }
 });
            //you can use the es6 function arrow unless you are using the $this feature

            //extract out the info in a funtion so it can build out the image
    $("#favorite").on('click',() => {
      
        
        $("#display").css("display", "unset");
        $("#display").empty();
        let gifs = JSON.parse(localStorage.getItem('gifs'));
        if (gifs){ 
            gifs.forEach(gif => {
                
                console.log(gif.still);

                let div = $("<div>").addClass("pic");
                let p = $("<p>").html("Rating: "+ gif.rating+"<br>"+"Title: " +gif.title);
                

                var image = $("<img>")
                        .attr("src", gif.still)
                        .attr("data-url", gif.original);
                   
                    div.append(p).append(image);

                    
                    $("#display").append(div);

                   




            });

        } else {
            alert("You have not picked any favorite Giphys yet!")
        }

        $("img").on('click', function(){

            console.log(this);
            let gif = $(this);
            let nextURL = gif.attr("data-url");
            
            gif.attr("data-url", gif.attr("src"));
            gif.attr("src", nextURL);
          
        });

    });

$("#clear").on('click', () =>{
        localStorage.clear();
        $("#display").empty();
        count = 0;
        $("#count").html(count);
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
        var apiKey = key
        var searchURL = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${userInput}&limit=12&offset=0&rating=R&lang=en`;

        $.ajax({
                url: searchURL,
                method: "GET"
            }).then(function(response) {
                console.log(response);
                $("#display").empty();
                for (let i = 0; i < response.data.length; i++) {
                    let div = $("<div>").addClass("pic");
                    let { title, rating, images } = response.data[i];
                    let p = $("<p>").html("Rating: "+ response.data[i].rating+"<br>"+"Title: " +response.data[i].title);
                    let fav =$("<p>").html("Add Favorite").addClass("icon");
                    
                    fav.on('click', function() {
                            count ++;
                            $("#count").html(count);
                            
                            const gifData = localStorage.getItem('gifs');
                            let gifs;

                            if (gifData) {
                                console.log(gifData)
                                gifs = JSON.parse(gifData);
                            } else {
                                gifs = [];
                            }

                            const data = {
                                title,
                                rating,
                                still: images.fixed_height_still.url,
                                original: images.fixed_height.url,
                            }

                            gifs.push(data);

                            localStorage.setItem('gifs', JSON.stringify(gifs));
                            




                    });

                   
                      
                    var image = $("<img>")
                        .attr("src", response.data[i].images.fixed_height_still.url)
                        .attr("data-url", response.data[i].images.fixed_height.url);
                    div.append(p).append(fav).append(image);


                    
                    $("#display").append(div);
                }
                //if I use image for the icon be sure not to use the same onclick listener
                $("img").on('click', function(){
                    console.log("hello");
                    let gif = $(this)
                    let nextURL = gif.attr("data-url");
                    
                    gif.attr("data-url", gif.attr("src"));
                    gif.attr("src", nextURL);
            
            
                });
            });
    
        });
            
   

}


renderButtons();
   













