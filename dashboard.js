$(document).ready(()=>{
    addash('Bank balance', 'bankaccount', 'balance', '');
    addash('Asset', 'asset', 'price', '');
    addash('Total sale', 'saleinvoice', 'netprice', getisodate());
    addash('Total purchase', 'purchaseinvoice', 'netprice', getisodate());
    addash('Cash balance', 'allreport', 'cashbalance', getisodate());
    addash('Credit due', 'allreport', 'creditdue', getisodate());

    getnotice();
    route('.dashitem', '#tbldash > tbody > tr', 8000);
    route('#notice > li', '#notice', 5000);    
});
//route function
function route(routeelem, parentelem, interval){
    var randomelem=[];
    setInterval(() => {  
      
       if($(routeelem).length>0){
        if(randomelem.length == 0){          
            for(i=0;i < $(routeelem).length;i++){
                randomelem.push($(routeelem).eq(i).clone());            
            }
        }  
            var firstelem=randomelem[0];                
            for(i=1;i<randomelem.length;i++){
                randomelem[i-1]=randomelem[i];
            }
           
            randomelem[randomelem.length-1]=firstelem;
          
            $(routeelem).eq(0).hide(1500, ()=>{                       
                    $(parentelem).html(randomelem);         
                    $(routeelem).eq($(routeelem).length-1).show(1500);                            
            });                        
       }
    }, interval);
}
//add dashboard status item
function addash(caption, table, col, datecol){
    var elem=$('#tbldash > tbody  > tr');
    var fdata = new FormData();
    fdata.append('pageindex', 'getdash');
    fdata.append('table', table);
    fdata.append('col', col);
    fdata.append('datecol', datecol);
    fdata.append('date', getisodate());
    $.ajax({
        url: 'main.php',
        type: 'POST',
        contentType: false,
        processData: false,
        data: fdata,
        success: (d)=>{              
            elem.append("<td class='dashitem' onmouseover='msover(this)' onmouseleave='msleave(this)' onclick='msover(this)'>\
            <div class='mainpanel'><div class='updowndiv'><span class='dashheader'>" + caption + "</span></div>\
            <div class='leftdiv'></div>\
            <div class='container'><span class='dashvalue'>" + d + "</span></div>\
            <div class='rightdiv'></div></div>\
            </td>");                  
        }
    });

}
//dash mouse over
function msover(elem){   
        $(elem).find('.updowndiv').slideUp(1000);      
}
//dash mouse leave
function msleave(elem){   
    $(elem).find('.updowndiv').stop(true);      
    $(elem).find('.updowndiv').slideDown(1000);      
}
//get date
function getisodate(){
    var now = new Date();

    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);

    var today = now.getFullYear()+"-"+(month)+"-"+(day) ;        
    return today;
}
//get notice
function getnotice(){
    var fdata=new FormData();
    fdata.append('pageindex', 'getnotice');
    fdata.append('date', getisodate());
    $.ajax({
        url: 'main.php',
        type: 'POST',
        contentType: false,
        processData: false,
        data: fdata,
        success:(d)=>{       
           
            if(d.length>3){
            
            d=d.split(':::');
            var date, data;
          
            date=d[0].split(', ');
            data=d[1].split(', ');  
                  
            for(i=0;i<data.length;i++){
                $('#notice').append('<li class="noticeholder">' + '<span class="noticedate"><span>' + date[i] + '</span></span><span class="noticedata">' + data[i] + '</span></li>');                
            }
        }
    }
    })
}