var min = 0;
var sec = 0;
var hours = 0;
var Stop = 0;
window.onload = function () {
	setInterval(function () {
		if (Stop !== 1) {
			sec++;
			if (sec === 60) {
				min++;
				sec = 0;
			}
			if (min === 60) {
				hours++;
				min = 0;
				sec = 0;
			}
			$(".timer").html(hours + ":" + min + ":" + sec);
			// if(Stop === 1)
			// {
			//     break;
			// }
			console.log(min);
			console.log(sec);
		}
	}, 1000);
};

/*
 * Create a list that holds all of your cards
 */
var cards = [];
var NameCards = [
	"fa fa-diamond",
	"fa fa-paper-plane-o",
	"fa fa-anchor",
	"fa fa-bolt",
	"fa fa-cube",
	"fa fa-anchor",
	"fa fa-leaf",
	"fa fa-bicycle",
	"fa fa-diamond",
	"fa fa-bomb",
	"fa fa-leaf",
	"fa fa-bomb",
	"fa fa-bolt",
	"fa fa-bicycle",
	"fa fa-paper-plane-o",
	"fa fa-cube",
];
var CardsOpen = [];
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
$(".deck").each(function () {
	$(this)
		.find("li")
		.each(function () {
			cards.push($(this));
		});
});
var temp = 0;

NameCards = shuffle(NameCards);

var NumberCards = 0;
$(".deck").each(function () {
	$(this)
		.find("li")
		.find("i")
		.each(function () {
			$(this).removeAttr("class");
			$(this).addClass(NameCards[NumberCards]);
			NumberCards++;
		});
});

//console.log($($(cards[0][0]).find('i')[0]).attr('class'));
$(".deck").each(function () {
	$(this)
		.find("li")
		.find("i")
		.each(function () {
			var tempClass = $($(cards[temp][0]).find("i")[0]).attr("class");
			$(this).removeAttr("class");
			$(this).addClass(tempClass);
			temp++;
		});
});
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
	var currentIndex = array.length,
		temporaryValue,
		randomIndex;

	while (currentIndex !== 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue;
	}

	return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
var moves = 0,
	stars = 3;

removeProperties = function (prop) {
	setTimeout(function () {
		prop.removeClass("show open animated wobble");
		CardsOpen[0].removeClass("show open animated wobble");
		CardsOpen = [];
	}, 400);
};

showCardOnClick = function (clickEvent) {
	clickEvent.on("click", function () {
		moves++;
		if (moves === 16) {} else if (moves > 16 && moves <= 25) {
			$("section ul li").hide();
			$("section ul").append('<li><i class="fa fa-star"></i></li>');
			$("section ul").append('<li><i class="fa fa-star"></i></li>');
			stars = 2;
		} else if (moves > 25) {
			$("section ul li").hide();
			$("section ul").append('<li><i class="fa fa-star"></i></li>');
			stars = 1;
		}
		$(".moves").html(moves);
		if (CardsOpen.length % 2 === 0) {
			$(this).addClass("show open animated wobble");
			$(this).off("click");
			CardsOpen.push($(this));
		} else if (CardsOpen.length !== 0) {
			$(this).addClass("show open animated wobble");

			var self = $(this);
			for (var i = 0; i < CardsOpen.length; i++) {
				if (CardsOpen[i].find("i").attr("class") === self.find("i").attr("class")) {
					// CardsOpen.push(self);
					self.removeClass("animated wobble");
					self.addClass("show match animated rubberBand");
					CardsOpen[i].removeClass("animated wobble");
					CardsOpen[i].addClass("show match animated rubberBand");
					console.log("match");
					$(this).off("click");
					//CardsOpen.push(self);
					CardsOpen = [];
					break;
				} else {
					self.addClass("show open animated wobble");
					removeProperties(self);
					CardsOpen[0].on("click", showCardOnClick(CardsOpen[0]));
					console.log("no match");
				}
			}
		}
		if ($(".deck").find(".match").length === 16) {
			setTimeout(function () {
				$(".deck").each(function () {
					// $(this).find('li').hide();
					swal({
						title: "Congratulations",
						type: "success",
						text: "You have won the game . Moves conceded are " + moves + ". You have got " + stars + " Stars Time taken is " + hours + " Hours " + min + " Minutes and " + sec + " Seconds",
						allowOutsideClick: false,
						showCancelButton: true,
						confirmButtonText: "Play Again",
						confirmButtonColor: "#0000FF",
						cancelButtonText: "Close",
						cancelButtonColor: "#FF0000",
					}).then(
						function () {
							location.reload();
						},
						function (dismiss) {
							console.log("Yes");
						}
					);
				});
			}, 300);
			Stop = 1;
			$(".timer").hide();
			$(".timer").html("0:0:0");
			$(".timer").show();
		}
	});
};

for (var i = 0; i < cards.length; i++) {
	cards[i].on("click", showCardOnClick(cards[i]));
}

$(".restart").on("click", function () {
	location.reload();
});