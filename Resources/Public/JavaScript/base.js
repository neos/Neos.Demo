/**
* hoverIntent r5 // 2007.03.27 // jQuery 1.1.2+
* <http://cherne.net/brian/resources/jquery.hoverIntent.html>
* 
* @param  f  onMouseOver function || An object with configuration options
* @param  g  onMouseOut function  || Nothing (use configuration options object)
* @author    Brian Cherne <brian@cherne.net>
*/
(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:100,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY;};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev]);}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev]);};var handleHover=function(e){var p=(e.type=="mouseover"?e.fromElement:e.toElement)||e.relatedTarget;while(p&&p!=this){try{p=p.parentNode;}catch(e){p=this;}}if(p==this){return false;}var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);}if(e.type=="mouseover"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob);},cfg.timeout);}}};return this.mouseover(handleHover).mouseout(handleHover);};})(jQuery);

/**
* Base.JS
* @author kieran heyase
*/

var loginregister = false;
var dropdownmenu = false;
var sitemap = false;
var sitemapHTML = false;
			
var DKD = new Object();
DKD.log = function(debug) {
	if (console != null) {
		console.log(debug);
	}
}
				
DKD.debug = function(debug){
	if (console != null) {
		console.debug(debug);
	}
}
			
$(document).ready(function(){
	$("#sitemaptrigger").click(function() {
		$("#mainoverlay").click();
		if(sitemap) {
			$("#sitemap").slideUp();
			$("#sitemaptrigger").removeClass("sitemapClose");
			$("#sitemaptrigger").addClass("sitemapOpen");
			sitemap = false;
		} else {
			if (sitemapHTML == false) {
				$("#sitemaptrigger").removeClass("sitemaptriggeroff");
				$("#sitemaptrigger").addClass("sitemapLoad");
				$.ajax({
					type: "GET",
					url: "/ajax/sitemapfb/sitemap/visible/",
					success: function(data){
						$("#sitemap").html(data).hide().slideDown();
						sitemapHTML = true;
						activateSitemapIcons();
						$("#sitemaptrigger").removeClass("sitemapLoad");
						$("#sitemaptrigger").addClass("sitemapClose");
					}
				});
			} else {
				$("#sitemap").slideDown();
				$("#sitemaptrigger").removeClass("sitemapLoad");
				$("#sitemaptrigger").addClass("sitemapClose");
			}
					
			sitemap = true;
				
		}
		return false;
	});
    
	/* news block */
	 
	$("div.news-list-item").hover(
		function(){
			if($(this).find("table").hasClass("news-title-wrapper") == true){
				$(this).find("div.news-teaser").addClass("hover");
				$(this).find("table").addClass("title-hover");
			} else {
				$(this).find("div.news-teaser").addClass("hover");
				$(this).find("table").addClass("title-hover");
			}
		},
        function(){
			$("div.news-list-item").find("div.news-teaser").removeClass("hover");
			$("div.news-list-item").find("table").removeClass("title-hover");
		}
	);
	
	$("div.news-list-item").click(
		function(){
			if($(this).find("table").hasClass("news-title-wrapper") == true){
				window.location.href = "http://" + self.location.host + "/" + $(this).find("table").find("tr").find("td.news-title").find("a:first").attr("href");
			} else {
				window.location.href = "http://" + self.location.host + "/" + $(this).find("table").find("tr").find("td.news-title").find("a:first").attr("href");
			}
		}
	);

	/* punkt.de GSA-SHOP Articleitem -> */
	
	$("div.shop-item").hover(
		function(){
			if($(this).find("table").hasClass("item-title-wrapper") == true){
				$(this).find("div.item-teaser").addClass("hover");
				$(this).find("table").addClass("title-hover");
			} else {
				$(this).find("div.item-teaser").addClass("hover");
				$(this).find("table").addClass("title-hover");
			}
		},
        
        function(){
			$("div.shop-item").find("div.item-teaser").removeClass("hover");
			$("div.shop-item").find("table").removeClass("title-hover");
		}
	);
	
	/**
	$("div.shop-item").click(
		function(){
			if($(this).find("table").hasClass("item-title-wrapper") == true){
				window.location.href = "http://" + self.location.host ;
			} else {
				window.location.href = "http://" + self.location.host ;
			}
		}
	);
	*/
	/* <- punkt.de GSA-SHOP Articleitem */

    /* TODO: Better Hover with Child object and delay ... but works strange ...
	$("#banner").hoverIntent({
		sensitivity: 7,
		interval: 100,
		timeout: 500,
		over: function(){
			$("#banner").animate({
				opacity: "0.99"
			}, 750);
		},
		out: function(){
			$("#banner").animate({
				opacity: "0.50"
			}, 750);
		}
	});
	*/
		
	$("#banner").hover(
		function(){
			$("#banner").animate({
				opacity: "0.99"
			}, 750);
		}, function(){
			$("#banner").animate({
				opacity: "0.50"
			}, 750);
		}
	);
				
	$("#big-search-input input").focus(function(){   
    	$("#big-search-input").addClass("focus");
	});
    
	$("#big-search-input input").blur(function(){
		$("#big-search-input").removeClass("focus");
	});
    
	$("div.tx-indexedsearch-res table tr").hover(
		function(){
			if($(this).hasClass("header")==true){
				$(this).addClass("hover");
				//$(this).next("tr.content").addClass("hover");
				$(this).next("tr.content").animate({"backgroundColor": "#636363"},500);
			} else {
				$(this).addClass("hover");
				$(this).prev("tr.header").addClass("hover");
			}
		},
        
        function(){
			$("div.tx-indexedsearch-res table tr").removeClass("hover");
		}
	);

	$("div.tx-indexedsearch-res tr").click(
		function(){
			if($(this).hasClass("header")==true){
				window.location.href = "http://" + self.location.host + "/" + $(this).find("a:first").attr("href");
			} else {
				window.location.href = "http://" + self.location.host + "/" + $(this).prev("tr.header").find("a:first").attr("href");
			}
		},

		function(){
			$("div.tx-indexedsearch-res table tr").removeClass("hover");
		}
	);
     
	$(".tx-indexedsearch-browsebox ul").each(function(){
		$(this).find("li:first").before("<li><span>Page:</span></li>");
	});
    
	$("ul.browsebox").css("display","inline"); $("ul.browsebox").css("float","left"); $("ul.browsebox").css("float","left");   
	$("div.tx-indexedsearch-browsebox").append("<div class='info-field' style='float:right'><a class='top' href='#'>TOP</a>&nbsp;&nbsp;&nbsp;</div>");   
	$("div.tx-indexedsearch-browsebox").append("<div class='clear-all'></div>");  
	
	var info = $("div.tx-indexedsearch-browsebox p:first").html();
	$("div.tx-indexedsearch-browsebox div.info-field").append(info);
     
	$("a.top").click(function(){
		$("input.tx-indexedsearch-searchbox-sword").focus();
		return false;
	});
    
	$("div.startpage-smallbox").hover(
		function(){
			//$(this).addClass("startpage-smallbox-hover");
			$(this).animate({marginTop: "10px"},"fast")
			$(this).find("div.bottom-shadow").fadeIn("fast");
		},
		
		function(){
			$(this).animate({marginTop: "12px"},"fast");
			//$(this).removeClass("startpage-smallbox-hover");
			$(this).find("div.bottom-shadow").fadeOut("fast");
		}
	);
    				
	//Login - Register
	if ($("#loginregister a").children().attr("class") != "loggedIn") {
		$('#loginregister a').each(function(){
			$(this).replaceWith( $(this).children() );
		});

		$("#loginregister").click(function(){
			if (loginregister == false) {
				fadeOutContentArea({
					mode: "loginregister"
				});
			} else {
				$("#mainoverlay").fadeOut("fast", function(){
					loginregister = false;
				});
			}
		});
	}
    		
	$("#mainoverlay, #dropdownmenu-links h3 span").click(function(){
		$(".gfxheadertab").animate({
			opacity: "1.0"
		}, "normal");
		
		$("#mainoverlay").fadeOut("fast", function(){
			loginregister = false;
			dropdownmenu = false
		});
		$("#login-register-box, #dropdownmenu-links").slideUp("fast");
	});

	$("#searchbox input, #login-register-box input").toggleValue();
	$("#big-search-input input.tx-indexedsearch-searchbox-sword").toggleValue();
	$("#searchbox input, #login-register-box input").focus(function(){$(this).removeClass("blur")});
	$("#searchbox input, #login-register-box input").blur(function(){$(this).addClass("blur")});
					
	$("div.startpage-smallbox").click(function(){
		var link = $(this).find("a:first").attr("href");
		if(link != "undefined"){
			window.location.href = "http://" + self.location.host + "/" + link;
		}
	});
					
	$("#dropdownmenu a").click(function(){
		if (dropdownmenu == false) {
			fadeOutContentArea({
				mode: "dropdownmenu"
			});
			dropdownmenu = true;
		} else {
			dropdownmenu = false;
		}
		return false;
	});
          
	$("#dropdownmenu-links ul li").hover(    //mouseover
		function(){
			$(this).addClass("hover");
		},    //mouseout
		function(){
			$(this).removeClass("hover");
		}
	);
	
	$("#dropdownmenu-links ul li").click(function(event){	//click
		event.preventDefault();
		var link = $(this).find("a:first");
		if (link.length > 0) {
			window.open(link.attr("href"), '_blank');
		}
	});
	
	$(window).resize(function(){
		var content = $("#topmenu").offset();
		$("#login-register-box, #dropdownmenu-links").css("left", content.left);
	});	
	
	activateSitemapIcons();	
	if($("#banner").height() > $("#master").height()){	
		$("#banner").height( $("#master").height( $("#banner").height() +50))	
	}	
					
});
      
function activateSitemapIcons(){
	//Sitemap
	$(".trigger").click(function(){
		var className = $(this).parent().attr("class") == "suboff" ? "subon" : "suboff";
		$(this).parent().attr("class", className);
	});
}
			
function fadeOutContentArea(options){
	// Nifty default options
	var defaults = {
		mode: "loginregister"
	}
          
	var opts = $.extend(defaults, options);
	
	// Getting top, left from #topmenu		
	var content = $("#topmenu").offset();
	
	$("#login-register-box").css("left", content.left -3);
	$("#dropdownmenu-links").css("left", content.left -3);
	$("#mainoverlay").width(985);
	$("#mainoverlay").css("left", "0");
	$("#mainoverlay").height($("#master").height() - $("#topcontainer").height() -2);

	switch (opts.mode) {
		case "dropdownmenu":
			if($("#dropdownmenu-links").height() > $("#mainoverlay").height()){
				$("#mainoverlay").height($("#dropdownmenu-links").height());										
			}
			
			$("#dropdownmenu-links").css("top", content.top  + $("#level1menu").height());
			$("#mainoverlay").css("top", 98);
			$("#dropdownmenu-links").slideDown("fast");
			break;
		
		case "loginregister":
			$("#login-register-box").css("top", content.top);
			$("#mainoverlay").css("top", 98);
			$("#login-register-box").slideDown("fast");
			break;
	}
          
	$("#mainoverlay").css("opacity", "0.4");
	$(".gfxheadertab").animate({
		opacity: "0.4"
	}, "normal");
          
	$("#mainoverlay").fadeIn("normal", function(){
		loginregister = true;
	});
		
}
      
      
      
      $.fn.extend({
          toggleValue: function(){
          
              return this.each(function(){
                  if ($(this).val() == '') {
                      $(this).addClass("grey");
                      $(this).val($(this).attr('title'));
                      $(this).parents('form').submit(function(){
                          $(this).find('input, textarea').each(function(){
                              if ($(this).val() == $(this).attr('title')) 
                                  $(this).val('');
                          });
                      });
                  }
                  $(this).focus(function(){
                      if ($(this).val() == $(this).attr('title')) {
                          $(this).val('');
                          $(this).removeClass("grey");
                      }
                      $(this).blur(function(){
                          if ($.trim($(this).val()) == '' && !$(this).hasClass('no-refill')) {
                              $(this).addClass("grey");
                              $(this).val($(this).attr('title'));
                          }
                      });
                  });
              });
          }
      });