$(document).ready(()=>{  
    var fdata=new FormData();
    fdata.append('pageindex', 'getreport');
    fdata.append('date', isodate());
    $.ajax({
        url: 'main.php',
        type: 'POST',
        contentType: false,
        processData: false,
        data: fdata,        
        success: (d)=>{                      
            var data=d.split(":::");
            var caption=data[0].split(', ');
            var value=data[1].split(', ');                  
            for(i=0;i<caption.length;i++){            
                ad(caption[i], parseFloat(value[i]));              
            }
        }
    })
    setvaluecurrency();
});
//add report
function ad(caption, value){
    
    if(value.toString() == 'NaN')value=0;     
    if(caption == '-'){
        $('#report').append('<br/>');        
    }else{
        $('#report').append('<div class="cell"><div class="captioncell">' + caption + '</div><br/><div class="valuecell">' + value.toFixed(2) + '</div></div>')
    }
    
}
//get date with iso format
function isodate(){
    var currentdate= new Date();
    return currentdate.getFullYear() + "-" + ("0" + (currentdate.getMonth() + 1)) + "-" + ("0" + currentdate.getDate());
}
//get currency
function setvaluecurrency(){  
    var fdata=new FormData();    
    fdata.append('pageindex', 'getcurrency');
    $.ajax({
        url: 'main.php',
        type: 'POST',
        contentType: false,
        processData: false,
        data: fdata,
        success:(d)=>{                                 
           var elem=$('.valuecell');
           for(i=0; i<elem.length;i++){
               elem.eq(i).text(elem.eq(i).text() + d);
           }

        }
    });   
}