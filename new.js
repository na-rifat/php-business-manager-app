var operationmode='new';
var id=0;
$(document).ready(()=>{
    if(dis('newproduct')){     
        //alert(window.location.href.split('/').pop().replace('.html', ''))     ;
        //auto
        getauto('category', 'productcategory', 'category');
        getauto('company', 'company', 'companyname');

        var elem=$('#newproduct');
        ad(elem, 'Product name: ', 'text', 'productname', 'Biscuit');
        ad(elem, 'Company: ', 'text', 'company', 'Some company Ltd.');
        ad(elem, 'Category: ', 'text', 'category', 'Drinks');        
        ad(elem, 'Purchase price: ', 'number', 'purchaseprice', '10$');
        ad(elem, 'Profit: ', 'number', 'profit', '5%');
        ad(elem, 'Sell price: ', 'number', 'sellprice', '10.5$');
        ad(elem, 'Product photo: ', 'file', 'productphoto', '');    
        adremark(elem, 'Remark', 'remark', 'Write any details info/comment/remark about this product');
        adsub(elem);        
        submt([2, 5, 1, 1, 1, 1, 0, 0], 'newproduct', 'Products');                
        //calculation
        var purchaseprice=$('#purchaseprice');
        var profit=$('#profit');
        var sellprice=$('#sellprice');
        purchaseprice.keyup(()=>{
            try{
                sellprice.val(parseFloat((purchaseprice.val() * (profit.val()/100)) + parseFloat(purchaseprice.val())));
            }catch(ex){
                
            }
        });
        profit.keyup(()=>{
            try{
                sellprice.val(parseFloat((purchaseprice.val() * (profit.val()/100)) + parseFloat(purchaseprice.val())));
            }catch(ex){

            }
        });
        sellprice.keyup(()=>{
            try{
                profit.val(parseFloat(
                    ((parseFloat(sellprice.val())-parseFloat(purchaseprice.val())) * 100) / parseFloat(purchaseprice.val())
                ));
            }catch(ex){
                
            }
        });
    }else if(dis('newsale')){        
        var prar=new Array();
        var elem=$('#newsale');
        ad(elem, 'Invoice NO: ', 'text', 'invoiceno', "0001");
        ad(elem, 'Date: ', 'date', 'invoicedate', "");
        ad(elem, 'Customer name: ', 'text', 'customername', "Ahmed Shah");
        ad(elem, 'Total price: ', 'number', 'invoicetotalprice', '100$');
        ad(elem, 'Discount(%): ', 'number', 'invoicediscount', '5');
        ad(elem, 'Net price: ', 'number', 'invoicenetprice', '95');
        ad(elem, 'Paid: ', 'number', 'invoicepaid', '90');
        ad(elem, 'Due: ', 'number', 'invoicedue', '5');
        adr(elem, 'Payment method: ', 'paymentmethod', ['Cash', 'Bank']);
        adsub(elem, 'Sell');
        //product
        var elem2=$('#newsaleproduct');
        ad(elem2, 'Product name: ', 'text', 'productname', 'Biscuits');
        ad(elem2, 'Company: ', 'text', 'company', 'Meta trader Ltd.');
        ad(elem2, 'Unit price: ', 'number', 'unitprice', '10$');
        ad(elem2, 'Quantity: ', 'number', 'quantity', '100');
        ad(elem2, 'Total price: ', 'number', 'totalprice', '1000$');        
        adsub(elem2, '+', 50);
        adlist(elem2);
        valit([2, 5, 1, 1, 1], $('td:nth-child(1) > form input'));
        valit([1, 1, 0, 1, 0, 1, 1, 1, 1], $('td:nth-child(2) > form input'));
    
        //auto complete
        getauto('productname', 'product', 'productname');       
        getauto('customername', 'customer', 'shopname');        
        //auto import
        getc('productname', 'company',  'product', 'company', 'productname');
        getc('productname', 'unitprice', 'product', 'sellprice', 'productname');
        //insert auto id
        autoid('saleinvoice', 'invoiceno');

        //add product
        $('input[name=sub]').eq(0).click(()=>{
            try{                             
                if($('#invoicetotalprice').val() == ''){
                    $('#invoicetotalprice').val(0);
                }
                 $('#invoicetotalprice').val(      
                        parseFloat($('#invoicetotalprice').val()) + parseFloat($('#totalprice').val())
                    );
            }catch(ex){
                
            }           
            prar.push([]);
            prar=addsellproduct($('#plist'), prar);                
        });
        //submit invoice
        $('input[name=sub]').eq(1).click(()=>{
            minus_product(prar, 1, 4);
            fill_blank_number('invoicediscount');
            if(testdcol([1, 1, 0, 1, 1, 1, 1, 1, 1]) && prar.length>0){
                sp(prar, 'saleproduct', 'newsale');            
            }
        });
        
        var totalprice=$('#invoicetotalprice'), discount=$('#invoicediscount'), netprice=$('#invoicenetprice'), paid=$('#invoicepaid'), due=$('#invoicedue');
        //read only
        totalprice.attr('readonly', 'readonly');
        rdo('unitprice');
        rdo('totalprice');
        rdo('company');
        rdo('invoiceno');

        $('#quantity').keyup(()=>{                          
            var fdata=new FormData();
            fdata.append('pageindex', 'getstock');
            fdata.append('productname', $('#productname').val());
            $.ajax({
                url: 'main.php',
                type: 'POST',
                contentType: false,
                processData: false,
                data: fdata,              
                success: (d)=>{                   
                    if(parseInt(d) >= $('#quantity').val()){
                        $('#totalprice').val(
                            parseFloat(parseFloat($('#unitprice').val()) * parseFloat($('#quantity').val())).toFixed(2)
                        );
                    }else{
                        alert('You don\'t have enough product, buy more then try again.');
                        $('#quantity').val(d);
                        $('#totalprice').val(
                            parseFloat(parseFloat($('#unitprice').val()) * parseFloat($('#quantity').val())).toFixed(2)
                        );
                    }
                }
            });
            
        });
        discount.keyup(()=>{
            try{
                netprice.val(
                    parseFloat(parseFloat(totalprice.val()) - (parseFloat(totalprice.val())*(parseFloat(discount.val()) / 100))).toFixed(2)
                );
            }catch(ex){

            }
        });
        netprice.keyup(()=>{
            try{
                discount.val(
                    parseFloat(
                        ((parseFloat(totalprice.val()) - parseFloat(netprice.val())) * 100) / parseFloat(totalprice.val())
                    ).toFixed(2)
                );
            }catch(ex){
              
            }
        });
        paid.keyup(()=>{
            try{
                due.val(
                    parseFloat(
                        parseFloat(netprice.val()) - parseFloat(paid.val())
                    ).toFixed(2)
                );         
            }catch(ex){

            }
        });
        due.keyup(()=>{
            paid.val(
                parseFloat(
                    parseFloat(netprice.val()) - parseFloat(due.val())
                ).toFixed(2)
            );
        });
    }else if(dis('newpurchase')){      
        var prar=new Array();
        var elem=$('#newpurchase');
        ad(elem, 'Invoice NO: ', 'text', 'invoiceno', "0001");
        ad(elem, 'Date: ', 'date', 'invoicedate', "");
        ad(elem, 'Company name: ', 'text', 'companyname', "Meta trader ltd.");
        ad(elem, 'Total price: ', 'number', 'invoicetotalprice', '100$');
        ad(elem, 'Discount: ', 'number', 'invoicediscount', '5/5%');
        ad(elem, 'Net price: ', 'number', 'invoicenetprice', '95');
        ad(elem, 'Paid: ', 'number', 'invoicepaid', '90');
        ad(elem, 'Due: ', 'number', 'invoicedue', '5');
        adr(elem, 'Payment method: ', 'paymentmethod', ['Cash', 'Bank']);
        adsub(elem, 'Buy');
        //product
        var elem2=$('#newpurchaseproduct');
        ad(elem2, 'Product name: ', 'text', 'productname', 'Biscuits');        
        ad(elem2, 'Unit price: ', 'number', 'unitprice', '10$');
        ad(elem2, 'Quantity: ', 'number', 'quantity', '100');
        ad(elem2, 'Total price: ', 'number', 'totalprice', '1000$');
        adsub(elem2, '+', 50);
        adlist(elem2);
        valit([2, 1, 1, 1], $('td:nth-child(1) > form input'));
        valit([1, 1, 0, 1, 1, 1, 1, 1, 1], $('td:nth-child(2) > form input'));

        //auto complete
        getauto('productname', 'product', 'productname');
        getauto('companyname', 'company', 'companyname');        
        //auto import
        getc('productname', 'unitprice', 'product', 'purchaseprice', 'productname');
        //get auto id
        autoid('purchaseinvoice', 'invoiceno');
        
        $('input[name=sub]').eq(0).click(()=>{
            try{                             
                if($('#invoicetotalprice').val() == ''){
                    $('#invoicetotalprice').val(0);
                }
                 $('#invoicetotalprice').val(      
                               parseFloat($('#invoicetotalprice').val()) + parseFloat($('#totalprice').val())
                    );
            }catch(ex){
                
            }  
            prar.push([]);
            prar=addsellproduct($('#plist'), prar);   
       
        });
    
        $('input[name=sub]').eq(1).click(()=>{     
            plus_product(prar, 1, 4);
            if(testdcol([1, 1, 0, 1, 1, 1, 1, 1, 1])){
                sp(prar, 'purchaseproduct', 'newpurchase');     
            }
        });
        var totalprice=$('#invoicetotalprice'), discount=$('#invoicediscount'), netprice=$('#invoicenetprice'), paid=$('#invoicepaid'), due=$('#invoicedue');
        //readonly
        totalprice.attr('readonly', 'readonly');
        rdo('unitprice');
        rdo('totalprice');
        rdo('invoiceno');
    
        discount.keyup(()=>{
            try{
                netprice.val(
                    parseFloat(parseFloat(totalprice.val()) - (parseFloat(totalprice.val())*(parseFloat(discount.val()) / 100))).toFixed(2)
                );
            }catch(ex){

            }
        });
        netprice.keyup(()=>{
            try{
                discount.val(
                    parseFloat(
                        ((parseFloat(totalprice.val()) - parseFloat(netprice.val())) * 100) / parseFloat(totalprice.val())
                    ).toFixed(2)
                );
            }catch(ex){
              
            }
        });
        paid.keyup(()=>{
            try{
                due.val(
                    parseFloat(
                        parseFloat(netprice.val()) - parseFloat(paid.val())
                    ).toFixed(2)
                );
            }catch(ex){

            }
        });
        due.keyup(()=>{
            paid.val(
                parseFloat(
                    parseFloat(netprice.val()) - parseFloat(due.val())
                ).toFixed(2)
            );
        });
        $('#quantity').keyup(()=>{
            $('#totalprice').val(
                parseFloat(parseFloat($('#unitprice').val()) * parseFloat($('#quantity').val())).toFixed(2)
            );
        });
    }else if(dis('newtransaction')){
        var elem=$('#newtransaction')
        ad(elem, 'Transaction date: ', 'date', 'transactiondate', '');
        ad(elem, 'Related person/company/shop: ', 'text', 'relatedperson', 'Ahmed Rafiq');
        adr(elem, 'Transaction type: ', 'transactiontype', ['Cash in', 'Cash out']);
        adr(elem, 'Transaction media: ', 'transactionmedia', ['Cash', 'Bank']);
        ad(elem, 'Amount: ', 'number', 'amount', '10$');
        adremark(elem, 'Remark', 'remark', "Write something about this transaction.");
        adsub(elem, 'Confirm'); 
        submt([1, 0, 1, 1, 1, 1, 1, 0], 'newtransaction', 'Transactions')
    }else if(dis('newcompany')){
        var elem=$('#newcompany');
        ad(elem, 'Company name: ', 'text', 'companyname', 'Meta traders ltd.');
        ad(elem, 'Contact person: ', 'text', 'contactperson', 'Mr. Alex');
        ad(elem, 'Office address: ', 'text', 'officeaddress', 'Dhaka, Bangladesh');
        ad(elem, 'Mobile: ', 'text', 'mobile', '+880 17123456789');
        ad(elem, 'Email', 'email', 'email', 'alex@example.com');
        ad(elem, 'Opening due accounts: ', 'number', 'openingdue', '10$');
        adremark(elem, 'Remark', 'remark', 'Write something about this company.');
        adsub(elem);
        submt([2, 0, 0, 0, 0, 1, 0], 'newcompany', 'Company');
    }
    else if(dis('newcustomer')){
        var elem=$('#newcustomer');
        ad(elem, 'Shop name: ', 'text', 'shopname', 'Ms. Alex traders');
        ad(elem, 'Owner name: ', 'text', 'ownername', 'Mr. Alex');
        ad(elem, 'Address: ', 'text', 'address', 'College road, Lakshmipur, Bangladesh');
        ad(elem, 'Mobile: ', 'text', 'mobile', '+880 17123456789');
        ad(elem, 'Email', 'email', 'email', 'alex@example.com');
        ad(elem, 'Opening due accounts: ', 'number', 'openingdue', '10$');
        adremark(elem, 'Remark', 'remark', 'Write something about this customer.');
        adsub(elem);
        submt([2, 0, 0, 0, 0, 1, 0], 'newcompany', 'Companies');
    }else if(dis('newemployee')){
        var elem=$('#newemployee');
        ad(elem, 'Employee name: ', 'text', 'employeename', 'Mr. Sumon');
        ad(elem, 'Employee post: ', 'text', 'employeepost', 'Manager');
        ad(elem, 'ID: ', 'number', 'employeeid', '0001');
        ad(elem, 'Birthday: ', 'date', 'birthday', '');
        ad(elem, 'Mobile: ', 'text', 'mobile', '+880 17123456789');
        adr(elem, 'Gender: ', 'gender', ['Male', 'Female', '3rd Gender']);
        ad(elem, 'NID number: ', 'text', 'nid', '102030405060708090');
        ad(elem, 'Employee photo: ', 'file', 'photo', '');
        adremark(elem, 'Remark', 'remark', 'Write something about this employee.');
        adsub(elem, 'Join');
        submt([2, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0], 'newemployee', 'Employees');
    }else if(dis('newasset')){
        var elem=$('#newasset');
        ad(elem, 'Asset name: ', 'text', 'assetname', 'Computer table');
        ad(elem, 'Price: ', 'number', 'price', '100$');
        ad(elem, 'Purchase date: ', 'date', 'purchasedate', '');
        ad(elem, 'Purchase document: ', 'file', 'purchasedocument', '');
        adsub(elem);
        submt([2, 1, 1, 0], 'newasset', 'Assets');
    }else if(dis('userprofile')){
        var elem=$('#userprofile');
        var fdata=new FormData();
        fdata.append('pageindex', 'getuser');
        fdata.append('type', 'pp');

        $.ajax({
            url: 'main.php',
            type: 'POST',
            contentType: false,
            processData: false,
            data: fdata,
            success:(d)=>{               
                elem.append("\
                <div style='width: 100px; height: 100px; border: 5px solid black; margin: 20px; margin-left: 30%; display: inline-block'>" + d + "</div>\
                ");
                ad(elem, 'Profile picture', 'file', 'pp', '');
                ad(elem, 'Name: ', 'text', 'username', 'Noor Rifat');
                ad(elem, 'ID: ', 'text', 'userid', 'user.admin');
                ad(elem, 'Address: ', 'text', 'useraddress', 'Lakshmipur, Chittagong, Bangladesh');
                ad(elem, 'Email: ', 'text', 'useremail', 'someone@example.com');
                ad(elem, 'Mobile: ', 'text', 'usermobile', '+8801754654674');
                adr(elem, 'Gender: ', 'gender', ['Male', 'Female', '3rd Gender']);
                ad(elem, "NID: ", 'date', 'birthday', '');
                ad(elem, "NID: ", 'text', 'nid', '102030405060708090');
                ad(elem, "Password", "password", "password", '********');       
                adsub(elem, "Save");   
                submt([0, 2, 1, 1, 1, 1, 0, 0, 0, 1, 5, 6], 'userprofile', 'User profile');
                
                getinfo('userinfo', 'username, username, userid, useraddress, useremail, usermobile, usergender, usergender, usergender, birthdate, usernid, userpassword', 1);            
            }
        });       
    }else if(dis('newbankaccount')){
        var elem=$('#newbankaccount');
        ad(elem, 'Account holder name: ', 'text', 'accountholdername', 'Mr. Rifat');
        ad(elem, 'Bank name: ', 'text', 'bankname', 'American Int. Bank Ltd.');
        ad(elem, 'Branch: ', 'text', 'branch', 'Uttara, Dhaka, Bangladesh');
        ad(elem, 'Account NO: ', 'text', 'accountno', '10203040506708090');
        ad(elem, 'Current balance: ', 'number', 'balance', '5000$');
        adsub(elem);
        submt([2, 2, 2, 2, 0], 'newbankaccount', 'Bank accounts');
    }else if(dis('newnotice')){
        var elem=$('#newnotice');
        ad(elem, 'Date: ', 'date', 'startdate', '');
        ad(elem, 'Expire date: ', 'date', 'enddate', '');
        adremark(elem, 'Notice text: ', 'noticetext', 'Today is holiday.');
        adsub(elem, 'Create notice');
        submt([1, 1, 2], 'newnotice', '');
    }

    //selection disable
    $('.noselect').on('selectstart', false).css('cursor', 'context-menu');
    //disable on click
    cod($('#sub'));
});
//checkpage
function dis(s){    
    var documentname=document.location.href.split('/').pop().replace('.html', '').split('?')[0];
    if(documentname==s){
        return true;
    }else{
        return false;
    }
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
//remark maker
function adremark(el, lb='Remark', nm, pl){
    el.append('<tr>\
    <td>\
    <label for="'+ nm + '">' + lb + '</label>\
    </td>\
    <td>\
    <textarea name="' + nm + '" id="' + nm + '" placeholder="' + pl + '" style="height: 80px;" rows="10"></textarea>\
    </td>\
    </tr>'    
    );               
}
//readio maker
function adr(el, lb, nm, val){
    var itmstr="";
    for(i=0;i<val.length;i++){
        if(i===0){
            itmstr += "<input type='radio' checked name='" + nm + "' id='" + nm + i.toString() + "' value='" + val[i]  + "'/>\
            <label for='" + nm + i.toString() + "'>" + val[i] + "</label><br/>";
        }else{
            itmstr += "<input type='radio' name='" + nm + "' id='" + nm + i.toString() + "' value='" + val[i]  + "'/>\
            <label for='" + nm + i.toString() + "'>" + val[i] + "</label><br/>";
        }
    }
    el.append('<tr>\
    <td>\
    <label for="'+ nm + '">' + lb + '</label>\
    </td>\
    <td><div class="rdr" style="width: 69.5%; border: 1px solid black; border-radius: 5px; margin-bottom: 4px; padding-top: 2px; padding-bottom: 4px;">' +
    itmstr +
    '</div></td>\
    </tr>'
    );

}
//submit button maker
function adsub(el, txt='Add', wd=250){    
    if(operationmode != 'new'){
        txt='Update';
    }
    el.append('<tr>\
    <td colspan="2" style="text-align: center;">\
    <br>\
    <input type="button" name="sub" id="sub" class="submitbutton" value="' + txt + '" style="width:' + wd + '"/>\
    </td>\
    </tr>'
    );
}
//product list maker
function adlist(el){
    el.append('\
    <td colspan="2">\
    <div style="overflow: auto; height: 400px;"><table class="plist noselect" id="plist"><tr>\
    <th>#SL</th>\
    <th>Product name</th>\
    <th>Qunatity</th>\
    <th>Total price</th>\
    <tr></table><div></td>\
    ');
}
//product list inserter
function adp(elem, ar){
    elem.append('\
    <tr>\
    <td>' + ar[ar.length -1][0] + '</td>\
    <td>' + ar[ar.length -1][1] + '</td>\
    <td>' + ar[ar.length -1][4] + '</td>\
    <td>' + ar[ar.length -1][5] + '</td>\
    </tr>\
    ');
}
//product array inserter
function addsellproduct(el, ar){
    var aar=ar;  
    aar[ar.length-1][0]=ar.length;
    aar[ar.length-1][1]=$('#productname').val();
    aar[ar.length-1][2]=$('#company').val();
    aar[ar.length-1][3]=$('#unitprice').val();
    aar[ar.length-1][4]=$('#quantity').val();
    aar[ar.length-1][5]=$('#totalprice').val();

    $('#productname').val('')
    $('#company').val('');
    $('#unitprice').val('');
    $('#quantity').val('');
    $('#totalprice').val('');
    adp(el, ar);
    return aar;
}
//text vaidation
function validt(str, minlength){
    if(!str=='' && str.length >= minlength){
        return true;
    }else{
        return false;
    }
}
//fill blank number field
function fill_blank_number(el){
    if($(el).val()==''){
        $(el).val(0);
    }
}
//submission validation
function submt(ar, pageindex, txt, frm=$('input, textarea')){
    $('form input[type=button]').click(()=>{       
        var tester=true;
        el=$('form input');
    
        for(i=0; i<el.length; i++){
           if(el.eq(i).attr('type')!='button' && el.eq(i).attr('type')!='radio' && el.eq(i).val().length < ar[i]){
                tester=true;                                              
                break;              
           }
           if(i==el.length-1){                          
               //submit data
                var fdata=new FormData(document.getElementsByTagName('form')[0]);
                fdata.append('pageindex', pageindex);
                fdata.append('operationmode', operationmode);
                fdata.append('id', id);                
                $.ajax({
                        url: 'main.php',
                        type: 'POST',
                        contentType: false,
                        processData: false,
                        data: fdata,
                        success: (dat)=>{     
                                                             
                            if(pageindex == 'newnotice'){
                                nv('dashboard', this, false);
                                return -1;
                            }                                                                  
                            if(!dis('userprofile')){
                                dnv(pageindex.replace('new', ''), txt);
                            }else if(dis('userprofile')){
                                nv('dashboard', this, false);
                            }
                        },
                        error: ()=>{
                            alert('There was an error establishing connection with the server. Please try again.');
                        }
                    });                          
           }
       }
    });
    valit(ar, frm);
}
//post sell/purchaseproducts
function sp(ar, pageindex, navindex){
    var frmitm=[];    
    var el=$(('td:nth-child(1) form input'));   
    
    for(i=0; i<el.length+1;i++){
            frmitm.push(el.eq(i).attr('name')); 
    }  
    for(i=0; i<ar.length; i++){        
        var fdata=new FormData();
        for(j=0;j<ar[i].length;j++){                     
               if(pageindex=='purchaseproduct'){
                    if(j<1){
                        fdata.append(frmitm[j], ar[i][j + 1]);                      
                    }else if(j>1){
                        fdata.append(frmitm[j-1], ar[i][j + 1]);                      
                    }
               }else{
                    fdata.append(frmitm[j], ar[i][j + 1]);                      
               }
        }
        fdata.append('invoiceno', $('input[name=invoiceno]').val());
        fdata.append('invoicedate', $('input[name=invoicedate]').val());
        fdata.append('pageindex', pageindex);       
        $.ajax({
            url: 'main.php',
            type:'post',
            contentType: false, 
            processData: false,
            data: fdata,
            success:(d)=>{
          
            }
        });      
        if(i==ar.length-1){        
            submtdcol(ar, navindex);
        }
    }        

}
//page navigation
function nv(s, el, tool=true){    
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
//submission validation double col
function submtdcol(ar, pageindex){    
        var tester=true;
        el=$('td:nth-child(2) > form input');       
        for(i=0; i<el.length; i++){
           if(el.eq(i).attr('type')!='button' && el.eq(i).attr('type')!='radio' && el.eq(i).val().length < ar[i]){
                tester=false;                       
                break;              
           }
           if(i==el.length-1 && tester){                 
               //submit data
               var fdata=new FormData(document.getElementsByTagName('form')[1]);
               fdata.append('pageindex', pageindex);
               
               $.ajax({
                url: 'main.php',
                type: 'POST',
                contentType: false,
                processData: false,
                data: fdata,
                success: (d)=>{                                     
                  //navigate to detail page
                     var pr=window.parent.$;
                     if(pageindex=='newsale'){
                         dnv(pageindex.replace('new', ''), "Sale");
                     }else{
                         dnv(pageindex.replace('new', ''), 'Purchase');
                     }
                },
                error: ()=>{
                     alert('There was an error establishing connection with the server. Please try again.');
                }
            });
           }
       }      
}
//dobule column data 
function testdcol(ar){
    elem=$('td:nth-child(2) > form input'); 
    for(i=0;i<elem.length;i++){
        if(elem.eq(i).attr('type') != 'button' && elem.eq(i).val().length < ar[i]){         
            return false;
        }      
    }
    return true;
}
//check validatoin
function checkvalidation(nm, limit, frm, ar){
    $('#' + nm).on("change paste keyup", ()=>{        
                    if($('#' + nm).val().length < limit){
                        $('#' + nm).addClass('redplace').removeClass('blackplace');
                    }else{
                        $('#' + nm).addClass('blackplace').removeClass('redplace');
                    }
                   
                   setTimeout(()=>{
                        for(i=0;i<frm.length;i++){                       
                            if(frm.eq(i).val().length < ar[i]){
                                $('input[type=button]').attr('disabled', 'disabled');            
                                break;                            
                            }
                            if(i==ar.length-1){
                                $('input[type=button]').removeAttr('disabled');
                            }
                        }
                   }, 100);
                });
                
}
//input data validator
function valit(ar, frm){    
    for(i=0;i<frm.length;i++){
        if(frm.eq(i).attr('type')!='button'){
                checkvalidation(frm.eq(i).attr('id'), ar[i], frm, ar);                
        }        
        if(frm.eq(i).attr('type')=='button'){        
            frm.eq(i).attr('disabled','disabled');
        }
    }
}

//details page navigation
function dnv(li, el, showsearch=true){
    pr=window.parent.$;  
    if(showsearch){        
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
    pr('#pageheader > h4').text(el);
}
//cateogry page navigation
function cnv(li, showsearch=true){
    pr=window.parent.$;
    if(showsearch){        
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
            pr('#cframe').attr('src', li + '.html' + '?rand=' + Math.round(Math.random() * 10000000));                  
        },
        error:()=>{
            alert('error happen');
        }
    });
    pr('#pageheader > h4').text($(el).text());
}
//get auto complete
function getauto(id, tablename, colname){
    var pr=window.parent.$;
    var fdata = new FormData();
    fdata.append('pageindex', 'getauto');
    fdata.append('tablename', tablename);
    fdata.append('colname', colname);
    fdata.append('id', id);
    $.ajax({
        url: "main.php",
        type: "POST",
        contentType: false,
        processData: false,
        data: fdata,
        success: (d)=>{
            $('form').append(d);
            $('#' + id).attr('list', 'auto' + id);
        }
    });
}
//get correntfu
function getc(src, destination, table, datacol, selectcol){
    var src=$('#' + src);
    var destination=$('#' + destination);
     
    src.on('change paste keyup', ()=>{
        var fdata=new FormData();
        fdata.append('pageindex', 'getc');
        fdata.append('value', src.val());
        fdata.append('table', table);
        fdata.append('datacol', datacol);
        fdata.append('selectcol', selectcol);
        $.ajax({
            url: 'main.php',
            type: 'POST',
            contentType: false,
            processData: false,
            data: fdata,
            success:(d)=>{                 
                destination.val(d);
            }
        });
    });
}
//minus product
function minus_product(arr, productindex, quantityindex){
    var productname=[];
    var quantity=[];
    for(i=0;i<arr.length;i++){
        productname.push(arr[i][productindex]);
        quantity.push(arr[i][quantityindex]);
    } 
    var fdata=new FormData();
    fdata.append('pageindex', 'minusproduct');
    fdata.append('product', productname.toString());
    fdata.append('quantity', quantity.toString());
    $.ajax({
        url: 'main.php',
        type: 'POST',
        contentType: false,
        processData: false,
        data: fdata,
        success: (d)=>{
           
        }
    });
}
//plus product
function plus_product(arr, productindex, quantityindex){    
    var productname=[];
    var quantity=[];
    for(i=0;i<arr.length;i++){
        productname.push(arr[i][productindex]);
        quantity.push(arr[i][quantityindex]);
    }

    var fdata=new FormData();
    fdata.append('pageindex', 'plusproduct');
    fdata.append('product', productname.toString());
    fdata.append('quantity', quantity.toString());
    $.ajax({
        url: 'main.php',
        type: 'POST',
        contentType: false,
        processData: false,
        data: fdata,
        success: (d)=>{
         
        }
    });
}
//insert auto id
function autoid(tablename, destination){
    var fdata=new FormData();
    fdata.append('pageindex', 'getid');
    fdata.append('tablename', tablename);
    $.ajax({
        url: 'main.php',
        type: 'POST',
        contentType: false,
        processData: false,
        data: fdata,
        success:(d)=>{
            $('#' + destination).val(d);
        }
    });
}
//read only
function rdo(elem){
    $('#' + elem).attr('readonly', 'readonly');
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
                        if(elem.eq(i).attr('type') != 'button' && elem.eq(i).attr('type') != 'radio'){                      
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
                            if(elem.eq(i).attr('type') != 'button' && elem.eq(i).attr('type') != 'radio'){                      
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
//db spell check
function checkspell(string, tbname, colname, id){
    
}
//click on disable
function cod(elem){
    elem.removeClass('wait');
    elem.click(()=>{
    elem.prop('disabled', true);
    elem.addClass('wait');
    waittillload()
}); 
}
function waittillload(){
    window.parent.$('#bodyframe').contents().find('body').append('<div class="loaddiv"><img src="load.webp"/></div>');  
}