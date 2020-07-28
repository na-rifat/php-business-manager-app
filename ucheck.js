$(document).ready(()=>{
    $('head').append("<link rel='icon' href='ico.ico' type='image/x-icon'/ ><title>e-Manager</title><meta charset='UTF-8'/>");
    var fdata=new FormData();
    fdata.append('pageindex', 'isuserlogged');
    $.ajax({
        url: 'main.php',
        type: 'POST',
        contentType: false,
        processData: false,
        data: fdata,
        success:(dat)=>{          
            if(dat==1 && d() == 'login' || d() == 'createac'){
                window.location.replace('profile.html');
            }else if(dat == 0 && d() != 'login' && d() != 'createac'){
                window.location.replace('login.html');
            }
        }
    });
});
//get pagename
function d(){
    return window.location.href.split('/').pop().replace('.html', '');
}
