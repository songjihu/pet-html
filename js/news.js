App = {
 

  init: async function() {
    // Load pets.
	var id=document.cookie;

    $.getJSON('news.json', function(data) {
      var petsRow = $('#news');
      var petTemplate = $('#body');
// 
// 				

				 petTemplate.find('img').attr('src', data[id].image);
				 petTemplate.find('.img-circle').attr('src', data[id].image);
         petTemplate.find('.text-center').text(data[id].tltle);
       
         // petTemplate.find('.news-outline').text(data[id].outline);
         // petTemplate.find('.news-author').text(data[id].author);
         petTemplate.find('.txt').text(data[id].body);
				
// // 
//         
        petsRow.append(petTemplate.html());
// 			
// 			 $(".col-md-12").on("click",".btn",function(){
// 				 alert(this.value);
// 				 document.cookie=this.value;
// 				 window.open("news.html");
			// });
    });
  
    return false;
  }
}
$(function() {
  $(window).load(function() {
  App.init();
	
	});

  });
	

