$(document).ready(function(){
    var elements = [];

    $(".scroll-to-link").click(function(e) { 
        e.preventDefault(); 
        var id = $(this).attr('data-target');
        $('html,body').animate({scrollTop: $("#"+id).offset().top - 20});
        return false;
    });
    
    function calculElements(){
        var total_height = 0;
        elements = [];
        $('.content-section').each(function(){
            var the_section = {};
            the_section.id = $(this).attr('id').replace('content-', '');
            total_height +=  $(this).height();
            the_section.max_height = total_height;
            elements.push(the_section);
        });
    }
    
    function onScroll(){
        var scroll = $(window).scrollTop(); 
        for (var i = 0; i < elements.length; i++) {
            var the_section = elements[i];
            if(scroll <= the_section.max_height){
                $(".content-menu ul li").removeClass('active');
                $( ".content-menu ul li[data-target='"+the_section.id+"']" ).addClass('active');   
                break;
            }
        }
        if(scroll + $(window).height() == $(document).height()) { // end of scroll, last element
            $(".content-menu ul li").removeClass('active');
            $( ".content-menu ul li:last-child" ).addClass('active');   
        }
    }

    calculElements();
    $(window).resize(function(e){
        e.preventDefault(); 
        calculElements();
    });
    
    $(window).on('scroll', function(e) {
        e.preventDefault();
        onScroll();
    });
});