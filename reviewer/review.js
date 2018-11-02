'use strict';

Parse.initialize("nWwh2FOePljPev8ChKy5XyMdRXEwVMVWKRA7wgvl", "iJC3TTiKB01kr45asLTCuyvjOZMoomceErxMUivw");

var average = 0; // needs to change TO AVERAGE OF STARS

var mathAve = 0;

var scoreOfstar;

var Review = Parse.Object.extend("Review");
var myReview = new Review();
var query = new Parse.Query(Review);

$('#star2').raty({
	click: function(score, evt){
		scoreOfstar = score;
	}
}); 
$('#done').click(function(event){
	var reviewTitle = $('.reviewTitle').val();
	var reviewText = $('.reviewText').val();

	myReview.save({
		score: scoreOfstar,
		title: reviewTitle,
		text: reviewText
	}, {
		success: function(myInput) {
			alert('Thanks for your input!');
		},
		error: function(myInput, error) {
			alert('Failed to create Object ' + error.message);
		}
	});
});

query.find({
	success: function(solution) {
		for (var i = 0; i < solution.length; i++) {
			contruct(solution[i]);
        };
		average = mathAve / solution.length;
		$('#starAve').raty({ 
			readOnly : true,
			score : average
		});
	},
    error: function(error) {
       	alert("Error: " + error.message);
    }
});

var contruct = function(object){
	var value = object.id;
	var score = Number(object.get('score'));
	var theirTitle = object.get('title');
	var theirText = object.get('text');
	// I HAVE TRIED TO FIGURE THIS OUT FOR FOREVER
	// I cant seem to get the numbers to become not a "NaN"
	// I want to intialize thumbUp and thumbDown as 0, but it wouldnt work. 
	var thumbUp = object.get('thumbUp');
    var thumbDown = object.get('thumbDown');
    var total = 0;
    total = thumbUp + thumbDown;

    mathAve += score;

	jQuery('<div/>', {
		id: value,
		class: 'review container'
	}).appendTo('#prior');

	$('#' + value).append('<div id="star-' + object.id + '"data-score=' + score + '>');
	$('#star-' + object.id).raty({score});
	$('#star-' + object.id).append(theirTitle);
	$('#' + value).append('<p>' + theirText + '</p>');
	$('#' + value).append('<i class="fa fa-thumbs-up" id="thumbUp' + value +'"></i> <i class="fa fa-thumbs-down"id="thumbDown' + value +'"></i>');
    $('#' + value).append('<p class="vote">' + thumbUp + ' out of ' + total + ' found this review helpful</p>');
    $('#' + value).append('<i class="fa fa-trash-o" id="trash_' + value + '"></i>');


    $('#thumbUp' + value).click(function(){
        object.increment('thumbUp');
        object.save();
    });
    $('#thumbDown' + value).click(function(){
        object.increment('thumbDown');
        object.save();
    });
    $('#trash_' + value).click(function(){
        object.destroy({
          success: function(object) {
            alert('You deleted the comment "' + theirTitle + '." Refresh your page.');
          },
          error: function(object, error) {
            alert('Delete Failed');
          }
        });
    });
}
