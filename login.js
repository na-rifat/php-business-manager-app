$(document).ready(function(){
    //login
    cod($('#loginbutton'));
    $("#loginbutton").click(function(){
        var fdata=new FormData(document.getElementsByTagName('form')[0]);
        fdata.append('pageindex', 'login')
        $.ajax({
            url: 'main.php',
            type: 'POST',
            data: fdata,
            contentType: false,
            processData: false,
            success: (d)=>{                             
                if(d==0){
                    //user not found
                    $('input[name=userid]').removeClass('backplace').addClass('redplace').attr('placeholder', 'User not found').attr('title', 'User not found');
                }else if(d==1){
                
                    //user found but wrong pass
                    $('input[name=userid]').removeClass('redplace').attr('title', '');
                    $('input[name=userpass]').removeClass('backplace').addClass('redplace').attr('placeholder', 'Wrong password').attr('title', 'Wrong password').val('');
                    $('input[name=userpass]').keyup(function(){
                        $('input[name=userpass]').removeClass('redplace').addClass('blackplace').attr('placeholder', '********').attr('title', '');
                    });
                }else if(d==2){
                    alert("Your account not registerd yet, please contact authority for registration.");
                }else{
                     try{
                        eval(d);
                     }catch(ex){
                         
                     }
                }
            },
            error: ()=>{
                alert('There was an error establishing connection with the server. Please try again.');
            }
        });
    });


    //show/hide password
    $("input[name=showpass]").change(function(){
        if($(this).prop("checked")){
            $("input[name=userpass]").attr("type", "text");
        }else{
            $("input[name=userpass]").attr("type", "password");
        }
    });
});
//click on disable
function cod(elem){
    elem.click(()=>elem.prop('disabled', true));
}