var currentMenuId;
var menuOpen = false;
var favorites = [];
var products = [];
var productCards = [];
var productObj = {
    brand: "AXESS",
	model: "SPBT1031-RD",
	price: 129.99, 
	imageUrl: "https://images-na.ssl-images-amazon.com/images/I/41u8vEGE9QL.jpg",
	averageRating: 3.5, 
	reviews: [
        {"rating":3,
		"title":"Better options available for less money",
		"description":"Disappointing, for several reasons:1. Vocals are kind of muddy; sounds like the speaker is playing from inside of a cardboard box (as if the speaker was put in a box & then put on play...weird-sounding like that, like it's a bit boxed in).2. Nearly zero bass. I'm really surprised at how little bass there is; I've built Sonosubs before (subwoofers in tubes) & would have thought it would have had at least SOME bass or mid-bass in this. Nope. Stuff that's a bit more acoustic like George Ezra's \"Budapest\" sounds pretty good, but throwing on something like Soulja Boy is pretty disappointing. All that volume & no thump :(3. Doesn't get nearly as loud as I'd like. I was hoping to use this for outdoor movies with a mini LED Android projector, but the volume combined with the lack of bass is just disappointing. My little palm-sized Bluetooth speakers are nearly as loud as this is. I think part of the problem is that there's a speaker on each end, so you don't really get the full effect of a left & right speaker if you place it horizontally (the manual shows it in both horizontal & vertical configurations, with the vertical pointing the control button side up). I've found it actually sounds better standing up vertical in kind of an omni-speaker setup - not to compare it to a high-end Linkwitz, but kind of the same idea where it can at least disperse the sound a bit better. Oddly enough, it sounds best with the control button side down - gives it a throatier sound (especially for male voices, like Hozier's \"Take me to church\"), which actually points the drivers down & the \"sub\" up.On the plus side...it does work, it's a cool design (feels fairly durable!), and the price is pretty decent.Read more"},
        {"rating":4,
		"title":"Better options available for less money",
		"description":"Disappointing, for several reasons:1. Vocals are kind of muddy; sounds like the speaker is playing from inside of a cardboard box (as if the speaker was put in a box & then put on play...weird-sounding like that, like it's a bit boxed in).2. Nearly zero bass. I'm really surprised at how little bass there is; I've built Sonosubs before (subwoofers in tubes) & would have thought it would have had at least SOME bass or mid-bass in this. Nope. Stuff that's a bit more acoustic like George Ezra's \"Budapest\" sounds pretty good, but throwing on something like Soulja Boy is pretty disappointing. All that volume & no thump :(3. Doesn't get nearly as loud as I'd like. I was hoping to use this for outdoor movies with a mini LED Android projector, but the volume combined with the lack of bass is just disappointing. My little palm-sized Bluetooth speakers are nearly as loud as this is. I think part of the problem is that there's a speaker on each end, so you don't really get the full effect of a left & right speaker if you place it horizontally (the manual shows it in both horizontal & vertical configurations, with the vertical pointing the control button side up). I've found it actually sounds better standing up vertical in kind of an omni-speaker setup - not to compare it to a high-end Linkwitz, but kind of the same idea where it can at least disperse the sound a bit better. Oddly enough, it sounds best with the control button side down - gives it a throatier sound (especially for male voices, like Hozier's \"Take me to church\"), which actually points the drivers down & the \"sub\" up.On the plus side...it does work, it's a cool design (feels fairly durable!), and the price is pretty decent.Read more"}
    ],
	favorite: false,
	specifications: {"Product Dimensions":"11.4 x 6.2 x 6.6 inches",
        "Item Weight":"3.5 pounds",
        "Manufacturer":"AXESS",
        "Batteries":"1 Lithium ion batteries required. (included)"}
};

function product(brand, model, price, imageUrl, averageRating, reviews, favorite, specifications, id) {
    this.brand = brand;
	this.model = model;
	this.price = price;
	this.imageUrl = imageUrl;
	this.averageRating = averageRating;
	this.reviews = reviews;
	this.favorite = favorite;
	this.specifications = specifications;
    this.id = id;
}

for (i = 0; i < 5; i++)
{
	products.push(new product("AXESS", "SPBT1031-RD", 119.99 - (25 * i), 
		"https://images-na.ssl-images-amazon.com/images/I/41u8vEGE9QL.jpg",
		1 + (0.5 * (i + 1)), productObj.reviews, false, productObj.specifications, "product" + i));
}

window.onload = function() {
    var productsContainer = document.getElementById("products-container");
    for (i = 0; i < products.length; i++) {
		var currentProduct = i;
        var productCard = document.createElement("div");
        productCard.className = "product-card";
        
        productCard.id = products[currentProduct].id;

        var container = document.createElement("div");
        container.className += "product-container";

        var imgContainer = document.createElement("div");
        imgContainer.className = "product-image-container";

        var image = document.createElement("img");
        image.src = products[currentProduct].imageUrl;

        var productName = document.createElement("div");
        productName.className = "product-name";
        productName.innerHTML = products[currentProduct].brand + " " + products[currentProduct].model;

        var starAndPriceContainer = document.createElement("div");
        starAndPriceContainer.className = "product-rating-and-price-container";
        
        var stars = document.createElement("div");
        stars.className = "product-rating";

        for (j = 0; j < 5; j++) {
            var star = document.createElement("i");
            if (j + 0.5 < products[currentProduct].averageRating) {
                star.className = "fa fa-star";
            } else if (j + 0.5 == products[currentProduct].averageRating) {
                star.className = "fa fa-star-half-o";
            } else {
                star.className = "fa fa-star-o";
            }
            stars.appendChild(star);
        }

        var price = document.createElement("div");
        price.className = "product-price";
        price.innerHTML = "$"+products[currentProduct].price.toFixed(2);
        
        var circularMenu = document.createElement("div");
        circularMenu.className = "circular-menu";
        
        
        var circle = document.createElement("div");
        circle.className = "circle";
        circle.id = "product" + i + "Menu";
        
        var favorite = document.createElement("i");
        favorite.className = "fa fa-heart-o fa-2x";
        
        var videos = document.createElement("i");
        videos.className = "fa fa-film fa-2x";
        
        var reviews = document.createElement("i");
        reviews.className = "fa fa-star fa-2x";

        var specifications  = document.createElement("i");
        specifications.className = "fa fa-list-ul fa-2x";
        
        var menuItems = [favorite, videos, reviews, specifications];
        for (var j = 0, l = menuItems.length; j < l; j++)
        {
            menuItems[j].style.left = (50 - 35*Math.cos(-0.5 * Math.PI - 2*(1/l)*j*Math.PI)).toFixed(4) + "%";
            menuItems[j].style.top = (50 + 35*Math.sin(-0.5 * Math.PI - 2*(1/l)*j*Math.PI)).toFixed(4) + "%";        
            menuItems[j].onclick = (function() {
                var currentProduct = products[i];
				var iconId = 3-j;
                return function() { 
                    openModal(currentProduct, iconId);
                }
            })();
        }
        
        circle.appendChild(favorite);
        circle.appendChild(videos);
        circle.appendChild(reviews);
        circle.appendChild(specifications);
        circularMenu.appendChild(circle);

        imgContainer.appendChild(image);
        container.appendChild(imgContainer);
        container.appendChild(productName);
        starAndPriceContainer.appendChild(stars);
        starAndPriceContainer.appendChild(price);
        container.appendChild(starAndPriceContainer);
        productCard.appendChild(container);
        productCard.appendChild(circularMenu);
        
        productCard.oncontextmenu = (function() {
            var currentId = productCard.id;
            return function() {
                openCircularMenu(currentId + "Menu");
            }
        })();
        
        productCards.push(productCard);
    }
    
    for (var i = 0; i < productCards.length; i++) {
        productsContainer.appendChild(productCards[i]);
    }
};

function openCircularMenu(menuId)
{
	if (currentMenuId == null)
	{
		currentMenuId = menuId;
        document.getElementById(currentMenuId).classList.toggle('open');
		menuOpen = true;
	}
    else 
	{
		if (currentMenuId == menuId)
		{
			document.getElementById(currentMenuId).classList.toggle('open');
			menuOpen = !menuOpen;
		}
		else
		{
			if (menuOpen)
			{
				document.getElementById(currentMenuId).classList.toggle('open');
				currentMenuId = menuId;
				document.getElementById(currentMenuId).classList.toggle('open');
			}
			else
			{
				currentMenuId = menuId;
				document.getElementById(currentMenuId).classList.toggle('open');
				menuOpen = true;
			}
		}
	}
	
    return false;
}

function openModal(currentProduct, menuItem)
{
    document.getElementById(currentMenuId).classList.toggle('open');
    currentMenuId = null;
    document.getElementById("modalWindow").style.display="block";
	populateModal(currentProduct);
	document.getElementsByClassName("tablink")[menuItem].click();
}

function populateModal(currentProduct)
{
    document.getElementById("modalImage").src = currentProduct.imageUrl;
    document.getElementById("modalProductName").innerHTML = currentProduct.brand + " " + currentProduct.model;
    document.getElementById("modalPrice").innerHTML = "$"+currentProduct.price.toFixed(2);
    for (i = 1; i <= 5; i++) {
        var star = document.getElementById("modalStar" + i);
        if (i <= currentProduct.averageRating) {
            star.className = "fa fa-star";
        } else if (i == currentProduct.averageRating + 0.5) {
            star.className = "fa fa-star-half-o"
        } else {
            star.className = "fa fa-star-o";
        }
    }
    
    var specsTable = document.getElementById("modalSecificationsTable");
    while (specsTable.firstChild) {
        specsTable.removeChild(specsTable.firstChild);
    }
    for (var i in currentProduct.specifications) {
        var row = document.createElement("tr");
        var spec = document.createElement("td");
        var details = document.createElement("td");
        
        spec.innerHTML = i;
        details.innerHTML = currentProduct.specifications[i];
        
        row.appendChild(spec);
        row.appendChild(details);
        specsTable.appendChild(row);
    }
    
    var reviews = document.getElementById("reviewsContent");
    while (reviews.firstChild) {
        reviews.removeChild(reviews.firstChild);
    }
    for (i = 0; i < currentProduct.reviews.length; i++)
    {
        var review = document.createElement("div");
        review.className = "review";
        
        var stars = document.createElement("div");
        stars.className = "stars";
        for (j = 0; j < 5; j++)
        {
            var star = document.createElement("i");
            if (j < currentProduct.reviews[i]["rating"]) {
                star.className = "fa fa-star";
            } else {
                star.className = "fa fa-star-o";
            }
            stars.appendChild(star);
        }
        review.appendChild(stars);
        
        var title = document.createElement("div");
        title.innerHTML = "<b>" + currentProduct.reviews[i]["title"] + "</b>";
        review.appendChild(title);
        
        var description = document.createElement("div");
        description.appendChild(document.createTextNode(currentProduct.reviews[i]["description"]));
        review.appendChild(description);
        
        reviews.appendChild(review);
    }
    
    var youtubeResultsScript = document.createElement("script");
    youtubeResultsScript.innerHTML = 
            "ytEmbed.init({'block':'ytThumbs','key':'AIzaSyAjRzrFIWUBkzGyca98NFNn3dfwLf6Bvh4','q':'" + currentProduct.brand + " " + 
            currentProduct.model + "','type':'search','results':5,'meta':true,'player':'embed','layout':'full'});";
    document.getElementById("modalVideosContainer").appendChild(youtubeResultsScript);
}

function sortProducts(sortIndex) {
    console.log("before sort");
    for (var i = 0; i < products.length; i++) {
        console.log(products[i]);
    }
    if (sortIndex == 1) {
        console.log("price");
        products.sort(dynamicSort("price"));
    } else if (sortIndex == 2) {
        console.log("-price");
        products.sort(dynamicSort("-price"));
    } else if (sortIndex == 3) {
        console.log("averageRating");
        products.sort(dynamicSort("-averageRating"));        
    } else if (sortIndex == 4) {
        console.log("brand");
        products.sort(dynamicSort("brand"));
    }
    console.log("after sort");
    for (var i = 0; i < products.length; i++) {
         console.log(products[i]);       
    }
}

function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

function openCity(evt, cityName) {
  var i, x, tablinks;
  x = document.getElementsByClassName("city");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < x.length; i++) {
    tablinks[i].classList.remove("w3-light-grey");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.classList.add("w3-light-grey");
}

function toggleFilterCategory(filterCategoryId) {
    var filterCategory = document.getElementById(filterCategoryId);
    if (filterCategory.style.display == "block") {
        filterCategory.style.display = "none";
    } else {
        filterCategory.style.display = "block";        
    }
}