$(document).ready(function(){
    $("#createidbutton").click(function(){
     
        var isok=true;
        //form validation
        //name
        if($("input[name=employeename]").val().length<2){            
            $("input[name=employeename]").removeClass('blackplace').addClass("redplace").attr("placeholder","Please write your name").attr("title", "You must need to write your name").val("");
            rtrv("input[name=employeename]", "Your name");
            isok=false;
        }
        //userid
        if($("input[name=userid]").val().length==0){
            $("input[name=userid]").removeClass('blackplace').addClass("redplace").attr("placeholder", "You must write an user ID").attr("title", "You must write an user ID.").val("");
            rtrv("input[name=userid]", "user.admin");
            isok=false;
        }      
        var checkuserform= new FormData();
        checkuserform.append('checkuserid', $("input[name=userid]").val());
        checkuserform.append('pageindex', 'isuser');
        $.ajax({
            url: 'main.php',
            type: 'POST',
            data: checkuserform,
            contentType: false,
            processData: false,
            async: false,
            success: (d)=>{            
                if(d==="0"){
                    $("input[name=userid]").removeClass('blackplace').addClass("redplace").attr("placeholder", "User ID taken, try another").attr("title", "This user ID taken, Please try another.").val("");
                    rtrv("input[name=userid]", "user.admin");
                    isok=false;
                }
            },
            error: ()=>{

            }
        });
      
        //address
        if($("input[name=employeeaddress]").val().length<2){
            $("input[name=employeeaddress]").removeClass('blackplace').addClass("redplace").attr("placeholder", "You must write an address").attr("title", "You must write an address").val("");
            rtrv('input[name=employeeaddress]', 'Lakshmipur, Chottogram, Bangladesh');
            isok=false;
        }
        //email
        if($('input[name=employeemail]').val().length==0){
            $('input[name=employeemail]').removeClass('blackplace').addClass('redplace').attr("placeholder", "You must provide an email").attr("title", "You must provie an email").val("");
            rtrv('input[name=employeemail]', 'example@domain.com');
            isok=false;
        }
        //birthdate
        if($('input[name=birthdate]').val().length==0){
            $("input[name=birthdate]").removeClass('blackplace').addClass("redplace").attr("title", "You have to enter your birthdate.");
            rtrv('input[name=birthdate]', '');
            isok=false;
        }
        //mobile        
        if($('input[name=mobile]').val().length===11){              
            var tmpmobile=$('input[name=mobile]').val();
            $("input[name=mobile]").val("+88" + tmpmobile);
        }else if($('input[name=mobile]').val().length!==14){
            $('input[name=mobile]').removeClass('blackplace').addClass('redplace').attr("placeholder", "You must provide your mobile phone number").attr("title", "You must provide your mobile phone number");
            rtrv('input[name=mobile]', '+8801712345678');
            isok=false;
        }
        //nid validation
        if($('input[name=employeenid]').val().length<10){
            $("input[name=employeenid]").removeClass('blackplace').addClass("redplace").attr("placeholder", "Provide your NID number").attr('title', 'Provide you NID number');
            rtrv("input[name=employeenid]", "123456789");
            isok=false;
        }
        //file verification
        var ext = $('input[name=pp]').val().split('.').pop().toLowerCase();
        if($.inArray(ext, ['jpg', 'jpeg', 'png', 'bmp']) == -1){
        //    alert($.inArray(ext, ['jpg', 'jpeg', 'png', 'bmp']));
            $('input[name=pp]').removeClass('blackplace').addClass("redplace").val("").attr("title", "Please select an image with JPG, JPEG, PNG or BMP format.");
            //retrieve
            $("input[name=pp]").change(function(){                
                $("input[name=pp]").css({
                    color: "white",
                    padding: "5px",
                    margin: "2px",
                    width: "100%",
                    border: "1px solid #00cc00",
                    "border-radius": "3px",                   
                }).removeClass("redplace");
            });
            isok=false;
        }
        //password
        if($('input[name=employeepass]').val()<6){
            $('input[name=employeepass]').removeClass('blackplace').addClass('redplace').attr("placeholder", "Enter a password with correct format");
            rtrv("input[name=employeepass]", "********");
            isok=false;
        }
        //is employee
        if($('input[name=isemployee]').val().length==0){
            $('input[name=isemployee]').addClass('redplace');
            rtrv('input[name=isemployee]', '');
            isok=false;
        }
        //sign up attempt
      if(isok){        
          var frmdata=new FormData(document.getElementById('cacid'));
          frmdata.append('pageindex', 'createac');
          $.ajax({
                url: "main.php",
                type: "POST",
                data: frmdata,              
                contentType: false,
                processData: false,                                           
                success: (dat) => {                                  
                    if(dat==0){
                        alert("There is some client side script error, reload the page and try again.");
                    }else{                 
                        try{
                            eval(dat);
                        }catch(ex){

                        }
                    }
                },
                error: ()=>{
                        alert("There is a problem with establishing a connection with server.");
                }                         
          });
      }
    });
    //get input value by name
    function gt(st, isnext=1){
        if(isnext===1){
            return $('input[name=' + st + ']').attr('name') + '=' + $(st).val() + '&';
        }else{
            return $(st).attr('name') + '=' + $(st).val();
        }
    }
    //show/hide password
    $("input[name=showpass]").change(function(){
        if($(this).prop("checked")){
            $("input[name=employeepass]").attr("type", "text");
        }else{
            $("input[name=employeepass]").attr("type", "password");
        }
    });
    //retrieve style
    function rtrv(el, rs){
        $(el).keyup(function(){
            $(el).removeClass('redplace').addClass("blackplace").attr("placeholder", rs).attr("title", "");
        });
    }
});