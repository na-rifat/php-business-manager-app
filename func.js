$(document).ready(function(){     
    setInterval(function(){    
        $('#hdname').animate({'letter-spacing' : '20px', 'font-style' : 'italic'}, 1500, ()=>{$('#hdname').animate({'letter-spacing' : '0px', 'font-stye' : 'normal'}, 1500)});
            //$("#hdname").hide(2000, ()=>{ $("#hdname").show(500, ()=>{$('#hdname').animate({'letter-spacing':'20px'}, 1500, ()=>{$('#hdname').animate({'letter-spacing' : '0px'}, 1500)})});}); 
    }, 4000);    
    $('#bodyframe').on('load', ()=>{        
        $("#bodyframe").contents().find('body').css({
            'overflow-x': 'hidden',            
        });
    });
    document.title="e-Manager";
    //selection disable
    $('.noselect').on('selectstart', false).css('cursor', 'context-menu');         
    //get shop name
    var fdata=new FormData();
    fdata.append('pageindex', 'getshopname');
    $.ajax({
        url: 'main.php',
        type: 'POST',
        contentType: false,
        processData: false,
        data: fdata,
        success: (d)=>{
            $('#hdname').text(d);
        }
    });

});
//edit 
function edt(id, tbl, page, itm, category=false){  
    itmarr=itm.slice(0, itm.length-2).split(', ');    
    
    var fdata= new FormData();
    fdata.append('pageindex', 'edt');
    fdata.append('tbl', tbl);
    fdata.append('id', id);
    fdata.append('data', itmarr.toString());
    $.ajax({
        url: 'main.php',
        type: 'POST',
        contentType: false,
        processData: false,
        data: fdata,
        success: (dtarr)=>{                                        
            dtarr=dtarr.split(', ');
            if(!category){             
                $('#bodyframe').attr('src', 'new' + page + '.html');  

                $('#bodyframe').on('load', ()=>{                     
                    //check and manage form              
                    if($("#bodyframe").contents().find('form').length==1){                 
                        var elem=$("#bodyframe").contents().find('input');    
                    }else if($("#bodyframe").contents().find('form').length == 2){                
                        var elem=$("#bodyframe").contents().find('td:nth-child(2) > form input');                    
                    }              
                    if(elem.length>0){                   
                        for(i=0;i<elem.length;i++){                                
                            if(elem.eq(i).attr('type') != 'button' 
                            && elem.eq(i).attr('type') != 'radio' 
                            && elem.eq(i).attr('type') != 'checkbox'
                            && elem.eq(i).attr('type') != 'date'){                      
                                elem.eq(i).val(dtarr[i]);
                            }else if(elem.eq(i).attr('type') == 'radio'){
                                if(elem.eq(i).val() == dtarr[i]){
                                    elem.eq(i).attr('checked', 'checked');
                                }else{
                                    elem.eq(i).removeAttr('checked');
                                }
                            }else if(elem.eq(i).attr('type') == 'checkbox'){
                                if(elem.eq(i).val() == dtarr[i]){
                                    elem.eq(i).attr('checked', 'checked');
                                }else{
                                    elem.eq(i).removeAttr('checked');
                                }
                            }else if(elem.eq(i).attr('type') == 'button'){                       
                                elem.eq(i).val('Update');
                            }else if(elem.eq(i).attr('type') == 'date'){                                
                                elem.eq(i).val(dtarr[i].slice(0, 10));
                            }
                        }
                        $('#bodyframe').off('load');
                    }else{                                   
                        setTimeout(()=>{                        
                            for(i=0;i<elem.length;i++){                          
                                if(elem.eq(i).attr('type') != 'button' 
                                && elem.eq(i).attr('type') != 'radio' 
                                && elem.eq(i).attr('type') != 'checkbox'
                                && elem.eq(i).attr('type') != 'date'){                      
                                    elem.eq(i).val(dtarr[i]);
                                }else if(elem.eq(i).attr('type') == 'radio'){
                                    if(elem.eq(i).val() == dtarr[i]){
                                        elem.eq(i).attr('checked', 'checked');
                                    }else{
                                        elem.eq(i).removeAttr('checked');
                                    }
                                }else if(elem.eq(i).attr('type') == 'checkbox'){
                                    if(elem.eq(i).val() == dtarr[i]){
                                        elem.eq(i).attr('checked', 'checked');
                                    }else{
                                        elem.eq(i).removeAttr('checked');
                                    }
                                }else if(elem.eq(i).attr('type') == 'button'){                       
                                    elem.eq(i).val('Update');
                                }else if(elem.eq(i).attr('type') == 'date'){                                
                                    elem.eq(i).val(dtarr[i].slice(0, 10));
                                }
                            }
                            $('#bodyframe').off('load');
                        }, 200);
                    }  
                        //operation mode   
                        document.getElementById('bodyframe').contentWindow.operationmode='edit'; 
                        document.getElementById('bodyframe').contentWindow.id=id;                                                      
                });
            }else{           
                 //check and manage form              
                 if($("#bodyframe").contents().find('form').length==1){                 
                    var elem=$("#bodyframe").contents().find('input');    
                }else if($("#bodyframe").contents().find('form').length == 2){                
                    var elem=$("#bodyframe").contents().find('td:nth-child(2) > form input');                    
                }              
                if(elem.length>0){                   
                    for(i=0;i<elem.length;i++){                                
                        if(elem.eq(i).attr('type') != 'button' 
                        && elem.eq(i).attr('type') != 'radio' 
                        && elem.eq(i).attr('type') != 'checkbox'
                        && elem.eq(i).attr('type') != 'date'){                      
                            elem.eq(i).val(dtarr[i]);
                        }else if(elem.eq(i).attr('type') == 'radio'){
                            if(elem.eq(i).val() == dtarr[i]){
                                elem.eq(i).attr('checked', 'checked');
                            }else{
                                elem.eq(i).removeAttr('checked');
                            }
                        }else if(elem.eq(i).attr('type') == 'checkbox'){
                            if(elem.eq(i).val() == dtarr[i]){
                                elem.eq(i).attr('checked', 'checked');
                            }else{
                                elem.eq(i).removeAttr('checked');
                            }
                        }else if(elem.eq(i).attr('type') == 'button'){                       
                            elem.eq(i).val('Update');
                        }else if(elem.eq(i).attr('type') == 'date'){                                
                            elem.eq(i).val(dtarr[i].slice(0, 10));
                        }
                    }
                    $('#bodyframe').off('load');
                }else{                                   
                    setTimeout(()=>{                        
                        for(i=0;i<elem.length;i++){                          
                            if(elem.eq(i).attr('type') != 'button' 
                            && elem.eq(i).attr('type') != 'radio' 
                            && elem.eq(i).attr('type') != 'checkbox'
                            && elem.eq(i).attr('type') != 'date'){                      
                                elem.eq(i).val(dtarr[i]);
                            }else if(elem.eq(i).attr('type') == 'radio'){
                                if(elem.eq(i).val() == dtarr[i]){
                                    elem.eq(i).attr('checked', 'checked');
                                }else{
                                    elem.eq(i).removeAttr('checked');
                                }
                            }else if(elem.eq(i).attr('type') == 'checkbox'){
                                if(elem.eq(i).val() == dtarr[i]){
                                    elem.eq(i).attr('checked', 'checked');
                                }else{
                                    elem.eq(i).removeAttr('checked');
                                }
                            }else if(elem.eq(i).attr('type') == 'button'){                       
                                elem.eq(i).val('Update');
                            }else if(elem.eq(i).attr('type') == 'date'){                                
                                elem.eq(i).val(dtarr[i].slice(0, 10));
                            }
                        }
                        $('#bodyframe').off('load');
                    }, 200);
                }  
                    //operation mode                       
                    document.getElementById('bodyframe').contentWindow.operationmode='edit'; 
                    document.getElementById('bodyframe').contentWindow.id=id;     
            }            
        } 
    });
}
