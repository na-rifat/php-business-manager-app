$(document).ready(function(){   
    //selection disable
    $('.noselect').on('selectstart', false).css('cursor', 'context-menu');     
    var pr=window.parent.$;
    var btni=0;
    //menu toggle 
    pr("#mnshowbutton img").on("click",function(){       
        var bt=pr("#mnshowbutton img");
        if(btni==0){
            bt.css("transform","rotate(90deg)");               
            btni=1;
        }else{                
            bt.css("transform","rotate(0deg)");
            btni=0;        
        }
        pr("#navig").toggle(800);
    }); 
    //logout
    $('#itm > ul > li').eq($('#itm > ul > li').length-1).click(function(){       
        var fdata= new FormData();
        fdata.append('pageindex', 'logout');
        $.ajax({
            url: 'main.php',
            type: 'POST',
            data: fdata,
            contentType: false,
            processData: false,
            success:(d)=>{        
                eval(d);
            },
            error:()=>{
                alert('There was an error establishing connection with the server. Please try again.');
            }
        });
    });
    //get profile info
    var prfdata=new FormData();
    prfdata.append('pageindex', 'getuser');
    prfdata.append('type', 'nav');
    $.ajax({
        url: 'main.php',
        type: 'POST',
        data: prfdata,
        contentType: false,
        processData: false,
        success: (d)=>{           
            $('#prfpanel').html(d);       
            //selection disable
            $('.noselect').on('selectstart', false).css('cursor', 'context-menu');     
        },
        error: ()=>{

        }
    });
    //non selection
    for(i=0; i< $('li').length; i++){
        $('li').eq(i).on('selectstart', false);
    }
    applypremission();
    isadmin();
});
//sub button toggle
function hide_set_button(){      
    var mbutton=$('#itm > ul > li');
    for(i=0;i<mbutton.length;i++){
        if(i%2==1 && i!=0 && i!=(mbutton.length-1) && mbutton.eq(i).text() != 'Profile'){           
            mbutton.eq(i).addClass("mainmenubutton").next().css({
                padding:"0",
                border: 'none',
                backgroundColor: 'rgb(24, 98, 168)',  
                color: 'white',          
            }).hide();      
        }
    }
    $(".mainmenubutton").on("click", function(){
        $(this).next().toggle(500);
        var th=$('.mainmenubutton');
        for(i=0;i<$('.mainmenubutton').length;i++){         
            if($(this).text() !== th.eq(i).text()){
                th.eq(i).next().hide(500);
            }                   
        }       
    });    
}
//page navigation
function nv(s, el, tool=true){  
    waittillload(); 
    pr=window.parent.$;
    if(pr('#bodyframe').attr('src') != (s + '.html')){
        pr('#bodyframe').attr('src', s + '.html');
    }    
    if(!tool){        
        pr('#searchbarid').hide(300);
    }else{
        pr('#searchbarid').show(300);
    }
    $(this).css('backgroundColor', 'red');
    pr('#pageheader > h4').text($(el).text());
}
//details page navigation
function dnv(li, el, autol, autodl, showsearch=true){    
    waittillload();
    pr=window.parent.$;
    var autoelem="";
    for(i=0;i<autol.length;i++){
        autoelem += "<option value=" + autodl[i] + ">" + autol[i] + "</option>"
    }
    pr('#filterbyid').html(autoelem);
    if(showsearch && $(el).is(':visible')){        
        pr('#searchbarid').show(300);
    }else{  
        pr('#searchbarid').hide(300);
    }
    var fdata=new FormData();
    fdata.append('pageindex', li);   
    $.ajax({
        url: 'main.php',
        type: 'POST',
        contentType: false,
        processData: false,
        data: fdata,
        success: (d)=>{                
            pr('#bodyframe').attr('src', li + '.html' + '?rand=' + Math.round(Math.random() * 10000000));                                     
        },
        error:()=>{
            alert('error happen');
        }
    });
    pr('#pageheader > h4').text($(el).text());
}

//function applypremission
function applypremission(){
    var fdata=new FormData();
    fdata.append('pageindex', 'applypermission');
    $.ajax({
        url: 'main.php',
        type: 'POST',
        contentType: false,
        processData: false,
        data: fdata,
        success:(d)=>{     
            d=d.split(', ');
            var elem=$('#menubar > li');            
            for(i=0;i<elem.length;i++)if(d.indexOf(elem.eq(i).text().trim()) > -1 && elem.eq(i).text().trim() != 'Sale' && elem.eq(i).text().trim() != 'Bank account'){                   
                    elem.eq(i).remove();
                    elem.eq(i+1).remove()
                }else if(d.indexOf(elem.eq(i).text().trim()) > -1 && elem.eq(i).text().trim() == 'Sale' && elem.eq(i).text().trim() != 'Bank account'){
                    elem.eq(i).remove();
                    elem.eq(i+1).remove()
                    $('#delivery').remove();
                }else if(d.indexOf('Bank account') > -1){
                    $('.bank').remove();
                }
        }
    });
}
//is admin
function isadmin(){
    var fdata=new FormData();
    fdata.append('pageindex', 'isadmin');
    $.ajax({
        url: 'main.php',
        type: 'POST',
        contentType: false,
        processData: false,
        data: fdata,
        success: (d)=>{          
            if(d.length == 0){            
                $('.setting').remove();
            }
        }
    });
}
//load
function waittillload(){ 
    window.parent.$('#bodyframe').contents().find('head').append('<style>.loaddiv{\
        background-color: white;\
        width: 100%;\
        height: 100%;\
    }\
    .loaddiv img{\
        position: absolute;\
        top: 50%;\
        left: 50%;\
        transform: translate(-50%, -50%);\
        height: 400px;\
        width: 400px;\
    }</style>');
    window.parent.$('#bodyframe').contents().find('body').append('<div class="loaddiv"><img src="load.webp"/></div>');
}