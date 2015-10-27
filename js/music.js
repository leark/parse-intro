// Initialize Parse app
Parse.initialize("ECfzzS2R4TTQbhc3cmWvfmFoYG0vhXaJfXayvz6J", "iG3ZJrP6wFPzuKkI6n6WKk39lflwUyIFjjknLgFp");

// Create a new sub-class of the Parse.Object, with name "Music"
var Music = Parse.Object.extend("Music");

// Create a new instance of your Music class 
// var sweetTune = new Music();

// // Set a property 'band' equal to a band name
// sweetTune.set("band", "Mine");

// // Set a property 'website' equal to the band's website
// sweetTune.set("website", "https://www.mine.com");
    
// // Set a property 'song' equal to a song
// sweetTune.set("song", "Mine Song");

// // Save your instance of your song -- and go see it on parse.com!
// sweetTune.save();

// Click event when form is submitted
$('form').submit(function() {

	// Create a new instance of your Music class 
	var submitted = new Music();

	$(this).find("input").each(function() {
		alert($(this).attr("id"));
		submitted.set($(this).attr("id"), $(this).val());
		$(this).val("");
	});
	// For each input element, set a property of your new instance equal to the input's value

	// After setting each property, save your new instance back to your database

	submitted.save(null, {
		success:getData
	});

	return false
})



// Write a function to get data
var getData = function() {
	

	// Set up a new query for our Music class
	var query = new Parse.Query(Music);

	// Set a parameter for your query -- where the website property isn't missing
	query.exists("website");

	/* Execute the query using ".find".  When successful:
	    - Pass the returned data into your buildList function
	*/
	query.find({
		// success:function(results) {
		// 	buildList(results);
		// }
		success:buildList
	});
}

// A function to build your list
var buildList = function(data) {
	// Empty out your unordered list
	$("#list").empty();
	// Loop through your data, and pass each element to the addItem function
	$.each(data, function(i, element) {
		addItem(element);
	});
}


// This function takes in an item, adds it to the screen
var addItem = function(item) {
	// Get parameters (website, band, song) from the data item passed to the function
	var web = item.get("website");
	var band = item.get("band");
	var song = item.get("song");
	
	var button = $("<button>").attr({
		"type": "button",
		"class": "btn btn-default btn-xs btn-danger"
		// "onclick": "remove()"
	});

	var string = band + " " + song + " " + web + " ";
	// Append li that includes text from the data item
	var listEle = $("<li>").text(string);
	listEle.append(button);
	button.click(function() {
		item.destroy({
			success:getData
		})
	})
	// listEle.attr("id", song + "-" + band);
	$("#list").append(listEle);
	
	// Time pending, create a button that removes the data item on click
	
}

// not called
var remove = function() {
	// var item = this.parent.id;
	// $("#list").remove(item);
	$("#list").parent().remove();
}

// Call your getData function when the page loads

window.onload = function() {
	getData();	
};

