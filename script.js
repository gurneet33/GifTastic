// Initial array of foods
var foods = ["Chicken", "Seafood", "Pasta","Steak"];
var foodImage;
var still;

// Function for dumping the JSON content for each button into the div
function displayfoodInfo() {
var foodRef;

  // for holding JSON
foodRef =  $(this).attr("data-name");



//  URL
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +foodRef + "&api_key=Jx5HQQ2iUxEKCavBkuKcVI4yvipzVMRu&limit=10";

$.ajax({
url: queryURL,
method: "GET"
}) .then(function(response) {
    var results = response.data;
      
    for (var i = 0; i < results.length; i++) {
      
      var gifDiv = $('<div>',{ 'class': 'displayDiv' });
      var rating = results[i].rating;

      var p = $("<p>").text("Rating: " + rating);

      foodImage = $("<img>,{ 'class': 'imgDisplay' }");
      foodImage.attr("src", results[i].images.fixed_height_still.url);
      foodImage.attr("data-still",results[i].images.fixed_height_still.url);
      foodImage.attr("data-animate",results[i].images.fixed_height.url);
      foodImage.attr("data-state","still");
      
      gifDiv.prepend(foodImage);
      gifDiv.prepend(p);
      $("#food-view").prepend(gifDiv);
    }
  });

}

// Function for displaying food data
function renderButtons() {

  // Deleting the buttons prior to adding new foods
 
  $("#buttons-view").empty();

  // Looping through the array of foods
  for (var i = 0; i < foods.length; i++) {

    // Then dynamicaly generating buttons for each food in the array
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

renderButtons();

//when the gif image is pressed
$("#food-view").on("click","img", function() {
  still = $(this).attr("data-still");
  anim = $(this).attr("data-animate");
  state = $(this).attr("data-state");

  //for animating still image
  if(state==="still"){
    $(this).attr("src",anim);
    $(this).attr("data-state","animate");
  }
  //for making anomating image still
  else if(state==="animate"){
    $(this).attr("src",still);
    $(this).attr("data-state","still")
  }
});
