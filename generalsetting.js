$(document).ready(()=>{
    var elem=$('#gsetting');
    ad(elem, 'Shop name: ', 'text', 'shopname', 'Rifat Traders');
    ad(elem, 'Work detail: ', 'text', 'workdetail', 'Fresh fruits seller');
    ad(elem, 'Currency: ', 'text', 'currency', '৳');
    ad(elem, 'Physical address: ', 'text', 'address', 'College road, Lakshmipur, Bangladesh');
    ad(elem, 'Mobile: ', 'text', 'mobile', '+8801723456789');
    ad(elem, 'Email: ', 'text', 'email', 'someone@example.com');
    ad(elem, 'Website: ', 'text', 'website', 'https://www.example.com');
    ad(elem, 'Animate the shop name header', 'checkbox', 'animate', '');
    ad(elem, 'Hide the menu when application loaded', 'checkbox', 'hidemenu', '');
    $('input[name=animate], input[name=hidemenu]').attr('value', '1');
    adsub($('#options'), 'Edit', 'edit');
    adsub($('#options'), 'Save', 'save');
    $('input[type=text], input[type=checkbox], input[name=save]').attr('disabled', 'disabled');
    $('input[name=edit]').click(()=>{
        $('input[type=text], input[type=checkbox], input[name=save]').removeAttr('disabled');
        $('input[name=edit]').attr('disabled', 'disabled');
    });
    $('input[name=save]').click(()=>{
        //save settings
        var fdata=new FormData(document.getElementsByTagName('form')[0]);
        fdata.append('pageindex', 'savesetting');
        $.ajax({
            url: 'main.php',
            type: 'POST',
            contentType: false,
            processData: false,
            data: fdata,
            success:(d)=>{             
                alert('Your general settings saved');
            }
        });

        $('input[type=text], input[type=checkbox], input[name=save]').attr('disabled', 'disabled');
        $('input[name=edit]').removeAttr('disabled');
    });
    getinfo('shopinfo', 'shopname, workdetail, currency, shopaddress, mobile, email, website, animateheader, hidemenufirstload');
});
//buttons
function adsub(elem, caption, name){
    elem.append("<input type='button' value='" + caption + "' name='" + name + "' id='" + name + "' class='subbutton'/>");
}
//input maker
function ad(el, lb, typ, nm , pl){
    el.append('<tr>\
    <td>\
    <label for="'+ nm + '">' + lb + '</label>\
    </td>\
    <td>\
    <input type="' + typ + '" name="' + nm + '" id="' + nm + '" placeholder="' + pl + '"/>\
    </td>\
    </tr>'    
    );
    if(typ=='date')  {
        var now = new Date();

        var day = ("0" + now.getDate()).slice(-2);
        var month = ("0" + (now.getMonth() + 1)).slice(-2);

        var today = now.getFullYear()+"-"+(month)+"-"+(day) ;        
        $('#' + nm).attr('value', today);
    }
}

//getinfo
function getinfo(tbl, itm, start=0){  
    itmarr=itm.split(', ');        

    var fdata= new FormData();
    fdata.append('pageindex', 'edt');
    fdata.append('tbl', tbl);
    fdata.append('id', '1');
    fdata.append('data', itmarr.toString());
    $.ajax({
        url: 'main.php',
        type: 'POST',
        contentType: false,
        processData: false,
        data: fdata,
        success: (dtarr)=>{     
                dtarr=dtarr.split(', ');
                var elem=$('input'); 
                
                if(elem.length>0){                
                    for(i=start;i<elem.length;i++){                        
                        if(elem.eq(i).attr('type') != 'button' 
                        && elem.eq(i).attr('type') != 'radio'
                        && elem.eq(i).attr('type') != 'checkbox'){
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
                        }
                    }             
                }else{                                   
                    setTimeout(()=>{                        
                        for(i=start;i<elem.length;i++){                        
                            if(elem.eq(i).attr('type') != 'button' 
                            && elem.eq(i).attr('type') != 'radio'
                            && elem.eq(i).attr('type') != 'checkbox'){
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
                            }
                        }             
                    }, 100);
                }                             
           
        } 
    });

}