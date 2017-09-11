var BGENJS = {
	bhold: $("#buttonholder"),
	gifhold: $("#gifholder"),
	query: "",
	topics: ["shiba", "shiina ringo", "dota 2", "league of legends", "path of exile", "fullmetal alchemist"],
	initialize: function () {
		BGENJS.bhold.empty();
		BGENJS.gifhold.empty();
		let temp;
		for (let i = 0; i < BGENJS.topics.length;i++){
			temp = $("<button>")
			temp.text(BGENJS.topics[i]);
			temp.addClass("btn btn-default");
			temp.on("click", BGENJS.gifSearch);
			BGENJS.bhold.append(temp);
		}
	},
	createButton: function (){
		console.log("createButton Entered");
		let temp = $("<button>");
		//console.log($("#query").val());
		temp.text($("#query").val());
		temp.addClass("btn btn-default");
		temp.on("click", BGENJS.gifSearch);
		BGENJS.bhold.append(temp);
	},
	gifSearch: function (){
		console.log("gifSearch Entered");
		BGENJS.gifhold.empty();
		BGENJS.query = "https://api.giphy.com/v1/gifs/search?q=" + this.innerHTML + "&api_key=35598e4e3a96453e8df9ef8087ea89d0&limit=10";
		$.ajax({	
			url: BGENJS.query,
			method: "GET"
		}).done(function (response){
			console.log(response);
			let temp = response.data;
			let tempdiv;
			let temp2;
			for (let i = 0; i < temp.length; i++){
				tempdiv = $("<div>");
				tempdiv.addClass("gifDiv");				
				temp2 = $("<div>");
				temp2.append("Rating: " + temp[i].rating);
				tempdiv.append(temp2);
				// temp2 = $("<div>");
				// temp2.html(temp[i].rating);
				// temp2.addClass("giflabel");
				// tempdiv.append(temp2);

				temp2 = $("<img>");
				temp2.attr("src", temp[i].images.original_still.url);
				temp2.addClass("gifPrev");
				tempdiv.append(temp2);
				tempdiv.data("still", temp[i].images.original_still.url);
				tempdiv.data("gif", temp[i].images.original.url);
				tempdiv.data("toggle", false);
				tempdiv.on("click", BGENJS.gifPlay);

				console.log(tempdiv);
				BGENJS.gifhold.append(tempdiv);
			}
		});
	},
	gifPlay: function (){
		if($(this).data("toggle")){
			$(this).children("img").prop("src", $(this).data("still"));
			$(this).data("toggle", false);
		} else { 
			$(this).children("img").prop("src", $(this).data("gif"));
			$(this).data("toggle", true);
		}
	}
}

BGENJS.initialize();
$("#searchButton").on("click", BGENJS.createButton);