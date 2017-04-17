

function randoo() {
    window.open("https://en.wikipedia.org/wiki/Special:Random","_self");
}




function runScript(e) {

    $('#bouton').click(function(){

        
        $( ".result" ).remove();        
        var searchFor = document.querySelector('input').value;
        searchFor=searchFor.replace(" ", '+');
        var jj = "&callback=JSON_CALLBACK";
        var api="https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&continue=gsroffset%7C%7C&generator=search&utf8=1&formatversion=latest&exsentences=2&exlimit=max&exintro=1&explaintext=1&gsrnamespace=0&gsroffset=10&gsrsearch=";
        var urll = api+searchFor+jj;
        var realpage;
        
        $.ajax({
            url: urll,
            dataType: "jsonp",

            success: function( data ) {
                var title="";
                var text="";
                var div="";
                if(data.query==null)
                {
                    div = document.createElement("div");
                    div.innerHTML = '<h3>Nothing found Sorry ...</h3>';
                    div.className= "result";

                     document.getElementById('results').append(div);
                     return false;
                }
                for (var i = 0; i < 10; i++) {
                    title = data.query.pages[i].title;
                    text = data.query.pages[i].extract;
                    realpage = data.query.pages[i].pageid;
                    div = '<a style="display:none;" target="_blank" href="http://en.wikipedia.org/?curid='+realpage+'"><div class="result" ><h3>'+title+'</h3><p>'+text+'</p></div></a>';
                    $(div).appendTo($('#results')).slideToggle("slow");


                };
                
    
        }
        });

        return false;


    });
    if (e.keyCode == 13) {
        $('#bouton').click();
    }
}
