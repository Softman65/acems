$(document).ready(function() {

    $.ajax({
        type: "GET",
        url: "/api/asociados" 
    }).done(function( data ) {
        
        //alert('asociados')


        $('.ui.pointing.menu a.item').click(function(){
        
            $('.ui.pointing.menu .item').removeClass('active')
            $(this).addClass('active')
            $('.ui.basic.segment .ui.basic.segment').addClass('hidden')

            if($(this).attr("data")=="inicio"){
            
                $('.ui.basic.segment .ui.basic.segment.inicio').removeClass('hidden')
            } 

            if($(this).attr("data")=="directorio"){
                $('.ui.basic.segment .ui.basic.segment.directorio').removeClass('hidden')
                
                $('.acems .ui.sidebar')
                .sidebar({
                    context: $('.acems')
                })
                .sidebar('attach events', '.acems .menu .item')          
            } 

            if($(this).attr("data")=="map"){
                $('.ui.basic.segment .ui.basic.segment.map').removeClass('hidden')
            } 
        
        })
        
          
    });
  
})