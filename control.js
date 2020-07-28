var currentuser='';
$(document).ready(()=>{
    var fdata=new FormData();
    fdata.append('pageindex', 'getuserforcontrol');
    $.ajax({
        url: 'main.php',
        type: 'POST',
        contentType: false,
        processData: false,
        data: fdata,
        success:(d)=>{
            $('#pushuser').html(d);
            $('.optionbutton').attr("onclick", "showoption(this)");
        }
    });    
    window.parent.$('#pageheader h4').text('Control manager');
    addh('User registration');
    addco('Register as authorised user', 'register');
    addb();
    addh('User access permission');
    addco('Products', 'product');
    addco('Sales', 'sale');
    addco('Purchases', 'purchase');
    addco('Transactions', 'transaction');
    addco('Bank accounts', 'bankaccount');
    addco('Company', 'company');
    addco('Customer', 'customer');
    addco('Employee', 'employee');
    addco('Asset', 'asset');
    addco('Reports', 'report');
    addb();
    addh('Admin access');   
    addco('Make this user admin', 'isadmin');
    $('#showoption table').append("<tr><td  colspan='2'><br/><input type='button' value='Apply' class='apply'/></td></tr>");
    $('#showoption table').append("<tr><td  colspan='2'><input type='button' value='Delete' class='delete'/></td></tr>");
    //function it
    $('#isadmin').change(()=>{     
        if($('#isadmin').is(":checked")){
           var routeelem=$('input[type=checkbox]');
           for(i=0;i<routeelem.length-1;i++){
               routeelem.eq(i).prop("checked", true);
           }
        }else{          
            checkcheck(1);           
        }
    });
    $('.apply').click(()=>{
        $('#showoption').hide();
        var afdata=new FormData(document.getElementById('frm'));
        afdata.append('pageindex', 'updateuserpermission');
        afdata.append('user', currentuser);
        $.ajax({
            url: 'main.php',
            type: 'POST',
            contentType: false,
            processData: false,
            data: afdata,
            success: (d)=>{
                  
            }
        });
    });
    $('.closebutton').click(()=>$('#showoption').hide());
    $('#showoption').hide();
    $('.delete').click(()=>{
        var fdata=new FormData();
        fdata.append('pageindex', 'deleteuser');
        fdata.append('user', currentuser);
        if(confirm('Are you sure you want to delete this user?')){
            $.ajax({
                url: 'main.php',
                type: 'POST',
                contentType: false,
                processData: false,
                data: fdata,
                success:(d)=>{
                    if(d.length>0 && d==0){
                        alert("You cannot delete this admin account.");
                    }else{
                        $('#showoption').hide();

                        var fdata=new FormData();
                        fdata.append('pageindex', 'getuserforcontrol');
                        $.ajax({
                            url: 'main.php',
                            type: 'POST',
                            contentType: false,
                            processData: false,
                            data: fdata,
                            success:(d)=>{
                                $('#pushuser').html(d);
                                $('.optionbutton').attr("onclick", "showoption(this)");
                            }
                        });  
                    }
             
                }
            });
        }
    });
});
function showoption(nm){ 
    currentuser=nm.name;   
    $('#showoption').show();
    checkcheck(0);
}
function addb(){
    $('#showoption table').append("<br/>");
}
function addco(label, name){
    var elem=$('#showoption table');
    elem.append('<tr>\
    <td class"popoptions"><label for="' +  name + '">' + label + '</label></td><td><input type="checkbox" value="1" name="' + name + '" id="' + name + '"/></td>\
</tr>');    
}
function addh(text){
    $('#showoption table').append("<tr><td colspan='2'><h6 style='display: inline;'>" + text + "</h6></td></tr>");
}
function checkcheck(j){
    var fdata=new FormData();
    fdata.append('pageindex', 'checkcheck');
    fdata.append('user', currentuser);
    $.ajax({
        url: 'main.php',
        type: 'POST',
        contentType: false,
        processData: false,
        data: fdata,
        success: (d)=>{        
            d=d.split(', ');                   
            $('input[type=checkbox]').prop('checked', false);
            for(i=0;i<d.length-j;i++)if($('input[type=checkbox]').eq(i).val() == d[i])$('input[type=checkbox]').eq(i).prop('checked', true);            
        }
    });
}
function apply(){

}