$(document).ready(()=>{
    if(dis('sale')){
        formatdate(1);
        formatpercent(4)
        formatcurrency(3);    
        formatcurrency(5);
        formatcurrency(6);
        formatcurrency(7);
    }else if(dis('purchase')){
        formatdate(1);
        formatpercent(4)
        formatcurrency(3);
        formatcurrency(5);
        formatcurrency(6);
        formatcurrency(7);
    }else if(dis('transaction')){
        formatdate(0);
        formatcurrency(4);
    }else if(dis('employee')){
        formatdate(3);
    }else if(dis('asset')){
        formatdate(2);
        formatcurrency(1);
    }else if(dis('product')){
        formatpercent(4);        
        formatcurrency(3);
        formatcurrency(5);
    }else if(dis('bankaccount')){
        formatcurrency(4);
    }else if(dis('pendingdelivery')){
        formatcurrency(5);
    }else if(dis('confirmdelivery')){
        formatcurrency(5);
    }
});
//delete data
function dlt(nm, tbl){
    if(confirm('Are you sure you want to delete this?')){
        var fdata= new FormData();
        fdata.append('id', nm);
        fdata.append('tbl', tbl);
        fdata.append('pageindex', 'dlt')
        $.ajax({
            url: 'main.php',
            type: 'POST',
            contentType: false,
            processData: false,
            data: fdata,
            success:(d)=>{
                $('tr[name=a'+ nm +']').remove();
            }
        });
    }
}

//show products
function shw(colar, colsize, page, invoice){
    colar= colar.split(', ');
    colsize=colsize.split(', ');
    var elem="<div id='shwpr' class='shwpr' style='width: 600px; position: absolute;\
    top: 50%;\
    left: 50%;\
    transform: translate(-50%, -50%);'>\
    <button onclick='hidepanel()' style='position: absolute; right: 0px; top: 0px;'>X</button>\
    <table style='margin-top: 40px; border-collapse: collapse; background-color: white;'><tr>";
    //header
    for(i=0;i<colar.length;i++){
        elem += "<th style='width: " + colsize[i] + "; max-width: "  + colsize[i] + "'>" + colar[i] + "</th>";
    }
    elem += "</tr>";
    //rows
    var fdata=new FormData();
    fdata.append('page', page);
    fdata.append('pageindex', 'getproduct');
    fdata.append('invoiceno', invoice);
    $.ajax({
        url: "main.php",
        type: "POST",
        contentType: false, 
        processData: false,
        data: fdata,      
        success: (dat)=>{
            elem += dat + "</table></div>";
            $('body').append(elem);
            $('.shwpr').show();
            $('body').css({
                backgroundColor: 'gray',                            
            });          
        }
    });
}
function hidepanel(){    
    $(".shwpr").hide();
    $('body').css({
        backgroundColor: 'white'
    });
}
//date formatting
function formatdate(childno){
    var elem=$('table tr > td:nth-child(' + (childno + 1) + ')');
    for(i=0;i<elem.length;i++){
        elem.eq(i).text(elem.eq(i).text().slice(0, 10));
    }
}
//percent formatting
function formatpercent(childno){
    var elem=$('table tr > td:nth-child(' + (childno + 1) + ')');
    for(i=0;i<elem.length;i++){
        elem.eq(i).text(elem.eq(i).text() + '%');
    }
}
//format currency
function formatcurrency(childno){
    var curreny;
    var fdata=new FormData();    
    fdata.append('pageindex', 'getcurrency');
    $.ajax({
        url: 'main.php',
        type: 'POST',
        contentType: false,
        processData: false,
        data: fdata,
        success:(d)=>{          
            curreny=d;
            var elem=$('table tr > td:nth-child(' + (childno + 1) + ')');   
            for(i=0;i<elem.length;i++){
                elem.eq(i).text(elem.eq(i).text() + ' ' + curreny);
            }
        }
    });   
}
//get index
function dis(pagename){
    var result = window.location.href.split('/').pop().replace('.html', '').split('?')[0];
    if(result==pagename){
        return true;
    }else{
        return false;
    }
}
