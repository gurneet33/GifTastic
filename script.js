// Initial array of foods
var foods = ["Chicken", "Seafood", "Pasta","Steak"];

// Function for dumping the JSON content for each button into the div
function displayfoodInfo() {
var foodRef;
  // YOUR CODE GOES HERE!!! HINT: You will need to create a new div to hold the JSON.
//adding JSON

foodRef =  $(this).attr("data-name");
console.log(foodRef);


// Here we construct our URL
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +foodRef + "&api_key=Jx5HQQ2iUxEKCavBkuKcVI4yvipzVMRu&limit=10";

$.ajax({
url: queryURL,
method: "GET"
}) .then(function(response) {
    var results = response.data;

      console.log(response); 
    for (var i = 0; i < results.length; i++) {
      
      var gifDiv = $('<div>',{ 'class': 'displayDiv' });
      var rating = results[i].rating;

      var p = $("<p>").text("Rating: " + rating);

      var foodImage = $("<img>");
      foodImage.attr("src", results[i].images.fixed_height.url);

      
      gifDiv.prepend(foodImage);
      gifDiv.prepend(p);
      $("#food-view").prepend(gifDiv);
    }
  });

}

// Function for displaying food data
function renderButtons() {

  // Deleting the buttons prior to adding new foods
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();

  // Looping through the array of foods
  for (var i = 0; i < foods.length; i++) {

    // Then dynamicaly generating buttons for each food in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $("<button>");
    // Adding a class of food to our button
    a.addClass("food");
    // Adding a data-attribute
    a.attr("data-name", foods[i]);
    // Providing the initial button text
    a.text(foods[i]);
    // Adding the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

// This function handles events where one button is clicked
$("#add-food").on("click", function(event) {
  event.preventDefault();

  // This line grabs the input from the textbox
  var food = $("#food-input").val().trim();

  // The food from the textbox is then added to our array
  foods.push(food);

  // Calling renderButtons which handles the processing of our food array
  renderButtons();

});

// Generic function for displaying the foodInfo
$(document).on("click", ".food", displayfoodInfo);

// Calling the renderButtons function to display the intial buttons
renderButtons();

