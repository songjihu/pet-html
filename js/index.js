App = {
 

  init: async function() {
    // Load pets.
	
    $.getJSON('news.json', function(data) {
		
      var petsRow = $('#news-title');
      var petTemplate = $('#body');

      for (i = 0; i < data.length; i ++) {
				
				petTemplate.find('img').attr('src', data[i].image);
        petTemplate.find('.news-title').text(data[i].tltle);       
        petTemplate.find('.news-outline').text(data[i].outline);
        petTemplate.find('.news-author').text(data[i].author);
        petTemplate.find('.news-time').text(data[i].time);
				petTemplate.find('.btn').attr('value', data[i].id);
				 
        
        petsRow.append(petTemplate.html());
      }
			
			 $(".col-md-12").on("click",".btn",function(){
				 alert(this.value);
				 document.cookie=this.value;
				 window.open("news.html");
			});
    });
  
    return false;
  }
}
$(function() {
  $(window).load(function() {
  App.init();
	
	});

  });
	

