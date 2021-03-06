var appHelper = (function (){
	
	function checkConnection() {
		var networkState = navigator.connection.type;
		var states = {};
		states[Connection.UNKNOWN]  = 'Unknown connection';
		states[Connection.ETHERNET] = 'Ethernet connection';
		states[Connection.WIFI]     = 'WiFi connection';
		states[Connection.CELL_2G]  = 'Cell 2G connection';
		states[Connection.CELL_3G]  = 'Cell 3G connection';
		states[Connection.CELL_4G]  = 'Cell 4G connection';
		states[Connection.CELL]     = 'Cell generic connection';
		states[Connection.NONE]     = 'No network connection';
	
		return states[networkState];
	}
	
	function loadPromos(data) {
		console.log("START LOADING_PROMOS");
		for (var i=0, index=1; i<data.length; i++) {
			if (data[i].promoStatus === "1") {
				addPromoCarouselIndicator(index);
				addPromoCarruselItems(index, data[i].promoHeader, data[i].promoP1, data[i].promoP2);
				loadImg(data[i].promoImg, index);
				console.log(data[i].promoImg);
				index ++;
			}	
		}
		console.log("END LOADING_PROMOS");
	}
	
	function addPromoCarouselIndicator (index) {
		$( "#promoCarruselIndicator" ).append('<li data-target="#promoCarrusel" data-slide-to="'+index+'"></li>');
	}
			
	function addPromoCarruselItems (index, promoHeader, promoP1, promoP2) {
		$( "#promoCarruselItems" ).append('<div class="item"><img id="imgItem'+index+'" src="" alt=""><div class="container"><div class="carousel-caption"><h1>'+promoHeader+'</h1><p>'+promoP1+'</p><p>'+promoP2+'</p></div></div></div>');
	}
	
	function loadImg (imgName, index) {
		$("#imgItem"+index).attr("src",imgName);
	}
	
	function refreshCarousel(){
		console.log("refreshCarousel STARTED btn ...");
		if (checkConnection() !== "No network connection") {
			carouselInit();
			getAvailablePromos();
		} else {
			navigator.notification.alert(
				'No hay conexión a Internet!',  // message
				null,         // callback
				'Six Manantiales',    // title
				null                  // buttonName
			);
		}
		console.log("refreshCarousel after...");
	}

	function carouselInit(){
		console.log("carouselInit() STARTED...");
		$("#promoCarruselSix").carousel("pause").removeData();
		$("#promoCarruselSix")[0].innerHTML = "";
		$("#promoCarruselSix").append('<ol id="promoCarruselIndicator" class="carousel-indicators"><li data-target="#promoCarrusel" data-slide-to="0" class="active"></li></ol>');
		$("#promoCarruselSix").append('<div id="promoCarruselItems" class="carousel-inner"><div class="item active"><img data-src="holder.js/900x500/auto/#666:#6a6a6a/text:Bienvenido" alt=""><div class="container"><div class="carousel-caption"><h1>Six Mobile App</h1><p>Encuentra las mejores promociones y productos de la mejor calidad.</p><p><a class="btn btn-lg btn-success" href="javascript:appHelper.refreshCarousel();" role="button">Actualizar Promos</a></p></div></div></div></div>');	
		$("#promoCarruselSix").append('<a class="left carousel-control" href="#promoCarruselSix" data-slide="prev"><span class="glyphicon glyphicon-chevron-left"></span></a><a class="right carousel-control" href="#promoCarruselSix" data-slide="next"><span class="glyphicon glyphicon-chevron-right"></span></a>');
		console.log("carouselInit() ENDED...");
	}

	function initGoogleMap() {
		console.log("GoogleMaps INIT X");

		var myLatlng = new google.maps.LatLng(20.412866, -100.000060);

		var mapOptions = {
		zoom: 16,
		center: myLatlng
		};

		var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

		var marker = new google.maps.Marker({
			position: myLatlng,
			title:"Six Manantiales!"
		});

		marker.setMap(map);

		var contentString = '<div id="content">'+
	      '<div id="siteNotice">'+
	      '</div>'+
	      '<h4 id="firstHeading" class="firstHeading">Six Manantiales</h4>'+
	      '<div id="bodyContent">'+
	      '<p>Calle Tehuacán #311</p>'+
	      '<p>Colonia Manantiales de San Juan</p>'+
	      '<p>Cel. 427 126 4727</p>'+
	      '</div>'+
	      '</div>';

		var infowindow = new google.maps.InfoWindow({
			content: contentString
		});

		google.maps.event.addListener(marker, 'click', function() {
			infowindow.open(map,marker);
		});
	}

	function loadGoogleMapScript(googleMapInjected) {
	console.log("GoogleMaps INIT");
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&callback=initGoogleMap';
		document.body.appendChild(script);
		googleMapInjected = true;
	}
	
	function getAvailablePromos() {
		console.log("getAvailablePromos() STARTED in FILE...");
		$.ajax({url: "http://six-mobile-app.herokuapp.com/promos",
			dataType: "jsonp",
			jsonpCallback: 'successCallback',
			async: true,
			success: function (data) {
				loadPromos(data);
			},
			error: function (request,error) {
				navigator.notification.alert(
					'Problemas al actualizar los promos, intenta otra vez!',  // message
					null,         // callback
					'Six Manantiales',    // title
					null                  // buttonName
				);
			}
		});
	}
	
	return {
		checkConnection: function() {
			console.debug("DEBUG:module implementation...");
			checkConnection();
		},
		
		getAvailablePromos: function() {
			getAvailablePromos();
		},
		
		refreshCarousel: function() {
			refreshCarousel();
		},

		initGoogleMap: function () {
			initGoogleMap();
		}
	}
})();