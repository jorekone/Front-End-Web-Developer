
// var cats = $(".cat");
// var buttons = $("button");

// function hideAllCats(){
// 	for (var i=0; i<cats.length; i++){
// 		$(cats[i]).hide();
// 	}
// }

// function bindButtonToCat(idNumber){
// 	$("#button"+idNumber).click(function(){
// 		hideAllCats();
// 		$("#cat"+idNumber).show();
// 	})
// }

// function bindCounterToCat(idNumber){
// 	var cat = "#cat"+idNumber
// 	$(cat).click(function(){
// 		var count = $(cat+" > .counter").text();
// 		count = parseInt(count) + 1;
// 		$(cat+" > .counter").text(count);
// 	})
// }

// for (var i=1; i<=buttons.length; i++){
// 	bindButtonToCat(i);
// }

// for (var i=1; i<=cats.length; i++){
// 	bindCounterToCat(i);
// }

// hideAllCats();
// $("#cat1").show();



$(function(){
	var model = {
		currentCat: null,
		cats: [
			{
				name: 'cat1',
				count: 0,
				src: 'img/cat_picture1.jpg'
			},
			{
				name: 'cat2',
				count: 0,
				src: 'img/cat_picture2.jpeg'
			},
			{
				name: 'cat3',
				count: 0,
				src: 'img/cat_picture3.jpeg'
			},
			{
				name: 'cat4',
				count: 0,
				src: 'img/cat_picture4.jpeg'
			},
			{
				name: 'cat5',
				count: 0,
				src: 'img/cat_picture5.jpeg'
			}
		]
	};

	var octopus = {
		getCats: function () {
			return model.cats;
		},

		getCurrentCat: function() {
			return model.currentCat;
		},

		setCurrentCat: function(cat) {
			model.currentCat = cat;
		},

		renderCatProfile: function(cat) {
			catView.renderCurrentCat(cat);
		},

		incrementCounter: function() {
			model.currentCat.count++;
		},

		init: function() {
			cats = octopus.getCats();
			octopus.setCurrentCat(cats[0]);
			
			listView.init();
			catView.init();
		}
	};

	var listView = {
		init: function() {
			cats = octopus.getCats();

			for (let i = 0; i < cats.length; i++) {
				button = document.createElement('button');
				button.id = `button${i+1}`
				button.innerText = cats[i].name;

				button.addEventListener('click', (function(cat) {
					console.log('hose');
					return function() {
						octopus.setCurrentCat(cat);
						octopus.renderCatProfile(cat);
					};
				})(cats[i]));

				catList = document.querySelector('#catlist');
				catList.appendChild(button);
			}
		}
	};

	var catView = {
		init: function() {
			this.counter = document.querySelector('.counter');
			this.img = document.querySelector('.clicker');

			this.img.addEventListener('click', function() {
				octopus.incrementCounter();
				octopus.renderCatProfile();
			});
		},
		
		renderCurrentCat: function() {
			currentCat = octopus.getCurrentCat();

			this.counter.innerText = currentCat.count;			
			this.img.src = currentCat.src;
		}
	}
	octopus.init();	
}());