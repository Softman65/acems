$(document).ready(function() {

    $.ajax({
        type: "GET",
        url: "/api/asociados" 
    }).done(function( data ) {
        
        function paintMenu($container){
            $container.html('')
            var _type=""
            var _Menu = null
            var $group = null

            var $ac = $('<div class="active content">')
            var $uf = $('<div class="ui form">')
            var $g = $('<div class="grouped fields">')
            var $fl = $('<div class="field">')
            var $rc = $('<div class="ui radio checkbox">')
            var $input = $('<input type="checkbox"  name="size">')
            var $l = $('<label>')
            const  _item = function(obj, record){
                return obj.append($fl.clone().append($rc.clone().append($input.clone().val(record.id_area)).append($l.clone().html(record.area))))
            } 
            const  _constructor = function(){
                return _Menu.append($ac.clone().append($uf.clone().append($group)))
            } 
            _.each(data.records[0], function(record){
                console.log(_type,record.id_area,record.sector,record.area)
                if(_type!=record.sector){
                    _type = record.sector
                    if(_Menu!=null){
                        //.item
                        //a.active.title
                        //  i.dropdown.icon
                        //  |  COMERCIOS
                        $container.append(_constructor())
                    } 
                    _Menu = $('<div class="item">').append( $('<a class="active title">').append( $('<i class="dropdown icon">') ).append(record.sector) )

                    $group = _item($g.clone(), record) 
                
                }else{
                    

                    //var $input = $('<input type="checkbox"  name="size">').val(record.id_area)
                    
                    
                    
                    $group = _item($group, record)

                    //$g.append($fl.clone().append($rc.clone().append($input.clone().val(record.id_area)).append($l.html(record.area))))

                    //.field
                    //.ui.radio.checkbox
                    //  input(type='checkbox', name='size', value='small')
                    //  label ALIMENTACIÓN

                    
                }
            })
            $container.append(_constructor())

        }
        paintMenu($('.ui.vertical.accordion.menu'))

        $('.ui.pointing.menu a.item').click(function(){
        
            $('.ui.pointing.menu .item').removeClass('active')
            $(this).addClass('active')
            $('.ui.basic.segment .ui.basic.segment').addClass('hidden')


            if($(this).attr("data")=="inicio"){
                $('.ui.basic.segment .ui.basic.segment.inicio').removeClass('hidden')
                $('.context.example .ui.sidebar').removeClass('visible')
            } 

            if($(this).attr("data")=="directorio"){
                $('.ui.basic.segment .ui.basic.segment.directorio').removeClass('hidden')
                if($('.context.example .ui.sidebar').hasClass('visible')){
                    $('.context.example .ui.sidebar').removeClass('visible')
                }else{
                    $('.context.example .ui.sidebar').addClass('visible')
                }
              ;         
            } 

            if($(this).attr("data")=="map"){
                $('.ui.basic.segment .ui.basic.segment.map').removeClass('hidden')
                $('.context.example .ui.sidebar').removeClass('visible')
            } 
        
        })
        
          
    });
  
})