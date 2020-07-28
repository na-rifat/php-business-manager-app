<?php
##########################################      global variables        ##########################################
//global variables
$servername="localhost";
$serveruser="root";
$serverpass="";
$dbname="maindata";
##########################################      database        ##########################################
//connect with database
$conn=new mysqli($servername, $serveruser, $serverpass);
//try to create database if not exist
$createdbquery="CREATE DATABASE maindata;";
$conn->query($createdbquery);
//try to connect database if exist
$conn->close();
$conn=new mysqli($servername, $serveruser, $serverpass, $dbname);

//try to create table userinfo if not exist
$createuserinfoquery="CREATE TABLE IF NOT EXISTS userinfo(
    id INT(5) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(80) NOT NULL,
    userid VARCHAR(200) NOT NULL,
    userpost VARCHAR(200),
    useraddress VARCHAR(200) NOT NULL,
    useremail VARCHAR(200) NOT NULL,
    birthdate VARCHAR(100) NOT NULL,
    usermobile VARCHAR(14) NOT NULL,
    usergender VARCHAR(6) NOT NULL,
    usernid VARCHAR(40) NOT NULL,
    userimage LONGBLOB NOT NULL,
    userpassword VARCHAR(200) NOT NULL,
    register BOOLEAN NOT NULL,
    isemployee BOOLEAN NOT NULL,
    product BOOLEAN NOT NULL,
    sale BOOLEAN NOT NULL,
    purchase BOOLEAN NOT NULL,
    transaction BOOLEAN NOT NULL,
    bankaccount BOOLEAN NOT NULL,
    company BOOLEAN NOT NULL,
    customer BOOLEAN NOT NULL,
    employee BOOLEAN NOT NULL,  
    asset BOOLEAN NOT NULL,
    report BOOLEAN NOT NULL,
    isadmin BOOLEAN NOT NULL,
    regdate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);";
$conn->query($createuserinfoquery);
//try to create c_users if not exist
$createc_usersquery='CREATE TABLE IF NOT EXISTS c_users(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    userid VARCHAR(200) NOT NULL,
    sessionid VARCHAR(200) NOT NULL,
    expire_date TIMESTAMP NOT NULL
);';
$conn->query($createc_usersquery);
//trying to create product table if doesn't exist
$createtblproductquery="CREATE TABLE IF NOT EXISTS product(
    id INT(50) UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
    productname VARCHAR(200) NOT NULL,
    company VARCHAR(200) NOT NULL,
    category VARCHAR(200) NOT NULL,   
    purchaseprice DOUBLE(50, 2) NOT NULL,
    profit DOUBLE(50, 2) NOT NULL,
    sellprice DOUBLE(50, 2) NOT NULL,
    photo LONGBLOB,
    remark VARCHAR(400),
    stock INT(50),
    regdate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);";
$conn->query($createtblproductquery);
//trying to create transaction table if doesn't exist
$createtbltransactionquery="CREATE TABLE IF NOT EXISTS transaction(
    id INT(50) UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
    transactiondate TIMESTAMP NOT NULL,
    relatedperson VARCHAR(200),
    transactiontype VARCHAR(200) NOT NULL,
    transactionmedia VARCHAR(200) NOT NULL,
    transactioncategory VARCHAR(200) NOT NULL,
    bankaccountno VARCHAR(200) NOT NULL,    
    amount DOUBLE(50, 2) NOT NULL,
    remark VARCHAR(400)
);";
$conn->query($createtbltransactionquery);
//trying to create company table if not exits
$createcompanyquery="CREATE TABLE IF NOT EXISTS company(
    id INT(50) UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
    companyname VARCHAR(200) NOT NULL,
    officeaddress VARCHAR(200),
    contactperson VARCHAR(200),
    mobile VARCHAR(200),
    email VARCHAR(200),
    website VARCHAR(200),
    due DOUBLE(50, 2),
    remark VARCHAR(400)
);";
$conn->query($createcompanyquery);
//trying to create customer table if not exist
$createtblcustomerquery="CREATE TABLE IF NOT EXISTS customer(
    id INT(50) UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
    shopname VARCHAR(200) NOT NULL,
    ownername VARCHAR(200),
    shopaddress VARCHAR(200),
    mobile VARCHAR(200),
    email VARCHAR(200),
    due DOUBLE(50, 2),
    remark VARCHAR(400),
    regdate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);";
$conn->query($createtblcustomerquery);
//trying to create employee table if not exist
$createtblemployeequery="CREATE TABLE IF NOT EXISTS employee(
    id INT(50) UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
    employeename VARCHAR(500) NOT NULL,
    post VARCHAR(200) NOT NULL,
    employeeid INT(50) NOT NULL,
    birthday TIMESTAMP,
    mobile VARCHAR(200),
    gender VARCHAR(200),
    nid VARCHAR(200),
    photo LONGBLOB,
    regdate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);";
$conn->query($createtblemployeequery);
//trying to create asset table if not exist
$createtblassetquery="CREATE TABLE IF NOT EXISTS asset(
    id INT(50) UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
    assetname VARCHAR(200) NOT NULL,
    price DOUBLE(50, 2) NOT NULL,
    purchasedate TIMESTAMP,
    purchasedocument LONGBLOB,
    remark VARCHAR(400),
    regdate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);";
$conn->query($createtblassetquery);
// trying to create sell invoice table if not exist
$createtblsellinvoicequery="CREATE TABLE IF NOT EXISTS saleinvoice(
    id INT(50) UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
    invoiceno INT(50) NOT NULL,
    invoicedate TIMESTAMP NOT NULL,
    customername VARCHAR(200),
    totalprice DOUBLE(50, 2) NOT NULL,
    discount DOUBLE(50, 2) NOT NULL,
    netprice DOUBLE(50, 2) NOT NULL,
    paid DOUBLE(50, 2) NOT NULL,
    due DOUBLE(50, 2) NOT NULL,
    customerid INT(50) NOT NULL
);";
$conn->query($createtblsellinvoicequery);
//trying to create sell product table if not exist
$createtblsaleproductquery="CREATE TABLE IF NOT EXISTS saleproduct(
    id INT(50) UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
    productname VARCHAR(200) NOT NULL,
    company VARCHAR(200) NOT NULL,
    unitprice DOUBLE(50, 2) NOT NULL,
    quantity DOUBLE(50, 2) NOT NULL,
    totalprice DOUBLE(50, 2) NOT NULL,    
    invoiceno INT(50) NOT NULL,
    invoicedate TIMESTAMP NOT NULL
);";
$conn->query($createtblsaleproductquery);
//trying to create purchase invoice table if not exist
$createtblpurchaseinvoice="CREATE TABLE IF NOT EXISTS purchaseinvoice(
    id INT(50) UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
    invoiceno INT(50) NOT NULL,
    invoicedate TIMESTAMP NOT NULL,
    companyname VARCHAR(200) NOT NULL,
    totalprice DOUBLE(50, 2) NOT NULL,
    discount DOUBLE(50, 2) NOT NULL,
    netprice DOUBLE(50, 2) NOT NULL,
    paid DOUBLE(50, 2) NOT NULL,
    due DOUBLE(50, 2) NOT NULL,
    companyid INT(50) NOT NULL
);";
$conn->query($createtblpurchaseinvoice);
//trying to create purchase product table if not exists
$createtblpurchaseproductquery="CREATE TABLE IF NOT EXISTS purchaseproduct(
    id INT(50) UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
    productname VARCHAR(200) NOT NULL,
    unitprice DOUBLE(50, 2) NOT NULL,
    quantity DOUBLE(50, 2) NOT NULL,
    totalprice DOUBLE(50, 2) NOT NULL,
    productcode INT(50) NOT NULL,
    invoiceno INT(50) NOT NULL,
    invoicedate TIMESTAMP NOT NULL    
);";
$conn->query($createtblpurchaseproductquery);
//trying to create product category table if not exist
$createproductcategoryquery="CREATE TABLE IF NOT EXISTS productcategory(
    id INT(50) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(200),
    remark VARCHAR(400)
);";
$conn->query($createproductcategoryquery);
//trying to create delivery table if not exists
$createdeliveryquery="CREATE TABLE IF NOT EXISTS delivery(
    id INT(50) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    invoiceno INT(50) NOT NULL,
    invoicedate TIMESTAMP NOT NULL,
    customername VARCHAR(200),
    deliveryaddress VARCHAR(200),
    deliverytime TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    netprice DOUBLE(50, 2) NOT NULL,
    confirmation VARCHAR(200)
);";
$conn->query($createdeliveryquery);

//trying to create shop information table
$createshopinfoquery="CREATE TABLE IF NOT EXISTS shopinfo(
    id INT(50) UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
    shopname VARCHAR(200) NOT NULL,
    workdetail VARCHAR(400),
    currency VARCHAR(200) NOT NULL,
    shopaddress VARCHAR(200) NOT NULL,
    mobile VARCHAR(200) NOT NULL,
    email VARCHAR(200),
    website VARCHAR(200),
    animateheader BOOLEAN,
    hidemenufirstload BOOLEAN
);";
$conn->query($createshopinfoquery);
//trying to create bank accounts table
$createbankaccountquery="CREATE TABLE IF NOT EXISTS bankaccount(
    id INT(50) UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
    accountholdername VARCHAR(200) NOT NULL,
    bankname VARCHAR(200) NOT NULL,
    branch VARCHAR(200) NOT NULL,
    accountno VARCHAR(200) NOT NULL,
    balance DOUBLE(50, 2) NOT NULL
);";
$conn->query($createbankaccountquery);
//trying to create transaction categories table
$createtransactioncategory="CREATE TABLE IF NOT EXISTS transactioncategory(
    id INT(50) UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
    categoryname VARCHAR(200) NOT NULL,
    transactiontype VARCHAR(200),
    remark VARCHAR(400)
);";
$conn->query($createtransactioncategory);
//trying to create all report table
$createallreportquery="CREATE TABLE IF NOT EXISTS allreport(
    id INT(50) UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
    cashin DOUBLE(50, 2),
    cashout DOUBLE(50, 2),
    cashbalance DOUBLE(50, 2),
    bankout DOUBLE(50, 2),
    bankin DOUBLE(50, 2),
    bankbalance DOUBLE(50, 2),
    totalsale DOUBLE(50, 2),
    paidsale DOUBLE(50, 2),
    duesale DOUBLE(50, 2),
    totalpurchase DOUBLE(50, 2),
    paidpurchase DOUBLE(50, 2),
    duepurchase DOUBLE(50, 2),
    creditdue DOUBLE(50, 2),
    debitdue DOUBLE(50, 2),
    totalasset DOUBLE(50, 2),
    reportdate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);";
$conn->query($createallreportquery);
//notice table
$conn->query("CREATE TABLE IF NOT EXISTS notice(
    id INT(50) UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
    noticetext VARCHAR(800),
    startdate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    enddate TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);");
//package allocation
$conn->query("SET GLOBAL max_allowed_packet=1073741824;");    
//create admin if not found
//$check=$conn->query();
##########################################      global functions        ##########################################
//parse bool
function parsebool($n){
    if(get_post($n) == 1){
        return 1;
    }else{
        return 0;
    }
}
//mode tester
function mode($mode){
    if(isset($_POST['operationmode']) && $_POST['operationmode'] == $mode){
        return true;
    }else{
        return false;
    }
}
//convert iso date to php readable
function convertiso(){
    $date=get_post('date');
    return date("Y-m-d", strtotime($date));
}
//push transaction
function pushtransaction($date, $person, $amount, $method, $type, $remark){
    $data=$GLOBALS['conn']->prepare("INSERT INTO transaction(transactiondate, relatedperson, transactiontype, transactionmedia, amount, remark) VALUES(?, ?, ?, ?, ?, ?);");
    $data->bind_param('ssssds', $date, $person, $type, $method, $amount, $remark);  
    $data->execute();
}
//generate new id
function getid($tablename){
    $datainfo=$GLOBALS['conn']->query("SELECT invoiceno FROM $tablename ORDER BY id DESC LIMIT 1;");
    $result='';
    if($datainfo->num_rows == 0){
        $result = 1;
    }else{
        $data=$datainfo->fetch_assoc();
        $result = $data['invoiceno'] + 1;
    }
    while(strlen($result) < 10){
        $result = 0 . $result;
    }
    return $result;
    
}
//delete
function dlt($id, $tbl){
    $qry="DELETE FROM {$tbl} WHERE id='{$id}'";
    $GLOBALS['conn']->query($qry);
}

//create content
function detailpage($name, $tablename, $dcolname, $tcolname, $colsize, $ecolname){    
    $selectqry="SELECT * FROM ". $tablename . " ORDER BY id DESC LIMIT 50;";
    $datainfo=$GLOBALS['conn']->query($selectqry);
    //edit text
    $edittext="";
    for($i=0;$i<sizeof($ecolname); $i++){
        $edittext .= $ecolname[$i] . ', ';
    }
    //creating element 
    $elem='<html><head>
    <link rel="stylesheet" href="detail.css"/>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="detail.js"></script>
    </head><body><table><tr>'; 
    //specify limit
    $limit;
    if($tablename == 'saleinvoice' || $tablename == 'purchaseinvoice'){
        $limit=3;
    }else if($tablename == 'allreport'){
        $limit=0;
    }else{
        $limit=2;
    }
    //get show product page info
    $colar;
    $colsize;
    $page=$name;
    $invoice; 
    if($tablename == 'saleinvoice'){
        $colar="Product name, Company, Unit price, Quantity, Total price";
        $colsize="150, 150, 100, 100, 100";
        $shwdcol="";
    }else if($tablename == 'purchaseinvoice'){
        $colar=$colar="Product name, Unit price, Quantity, Total price";
        $colsize="\'30%\', 100, 100, 100";
    }
    //specify 
    $func='parent.edt';
    $iscat=0;
    if($tablename == 'productcategory' || $tablename == 'transactioncategory'){
        $func='parent.parent.edt';
        $iscat=1;
    }
    for($i=0;$i<sizeof($tcolname) + $limit;$i++){
        if($i<sizeof($tcolname)){
            $elem .= '<th width="'. $colsize[$i] .'">'. $tcolname[$i] . '</th>';
        }else if($i==sizeof($tcolname)){
            $elem .= '<th width="30px" style="max-width: 20px; position: aboslute;">D</th>';
        }else if($i==sizeof($tcolname)+1){
            $elem .= '<th width="30px" style="max-width: 20px; position: aboslute;">E</th>';
        }else if($i==sizeof($tcolname)+2){
            $elem .= '<th width="30px" style="max-width: 20px; position: aboslute;">S</th>';
        }
    }
    $elem .='</tr>';
    //element creation ended    
    //inesrting rows
    for($i=0;$i<$datainfo->num_rows;$i++){
        $data=$datainfo->fetch_assoc();
        $elem .= '<tr name="a'. $data['id'] .'">';
        for($j=0;$j<sizeof($dcolname) + $limit;$j++){
            if($j<sizeof($dcolname)){
                $elem .= '<td>' . $data[$dcolname[$j]] . '</td>';
            }else if($j==sizeof($dcolname)){
                $elem .= '<td width="20px" style="max-width: 20px;" name="a'. $data['id'] .'"><button class="deletebutton" onclick="'.  
                "dlt({$data['id']}, '{$tablename}')"  .'"></button></td>';
            }else if($j==sizeof($dcolname)+1){
                $elem .= '<td width="20px" style="max-width: 20px;" name="a'. $data['id'] .'"><button class="editbutton" onclick="' . 
                "$func({$data['id']}, '$tablename', '$name', '$edittext', $iscat)" .'"></button></td>';
            }else if($j==sizeof($dcolname)+2){
                $elem .= '<td width="20px" style="max-width: 20px;" name="a'. $data['id'] .'"><button class="showbutton" onclick="' . 
                "shw('{$colar}', '{$colsize}', '$page', '{$data['invoiceno']}')" .'"></button></td>';
            }
        }
        $elem .= '</tr>';
    }
    $elem .= '</table></body></html>';   
    //rows insertion ended 
    give_file($name, $elem);
}
//give file
function give_file($name, $content){
    $file;  
    $file=fopen($name.'.html', 'w');
    fwrite($file, $content);    
}
//get file
function get_file($name){    
    if(isset($_FILES[$name]) && $_FILES[$name]['tmp_name'] != ''){
        return file_get_contents($_FILES[$name]['tmp_name']);
    }else{
        return '';
    }
}
//data validation
function isvalid($testdata, $limit=0){
    if(get_post($testdata) !== -1 && strlen(get_post($testdata)) > $limit){
        return true;
    }else{
        return false;
    }
}
//name decode
function name_decode($name){
    $encode=explode(" ", $name);
    $decode="";
    for($i=0; $i < count($encode); $i++){
        $decode .= ucfirst($encode[$i]) . " ";      
    }
    return substr($decode, 0, strlen($decode) - 1);
}
//get page index
function getindex($indexname){
    if(isset($_POST['pageindex']) && $_POST['pageindex']===$indexname){
        return true;
    }
}
//get cookie
function get_cookie($name){
    if(isset($_COOKIE[$name])){
        return $_COOKIE[$name];
    }else{
        return -1;
    }
}
//get post value
function get_post($vari){
    if($_SERVER['REQUEST_METHOD']==="POST" && isset($_POST[$vari])){
        return $_POST[$vari];
    }else{
        return -1;
    }
}
//function get session
function get_session($vari){
    if(isset($_SESSION[$vari])){
        return $_SESSION[$vari];
    }else{
        return -1;
    }
}
//set session
function set_session($varname, $var){
    $_SESSION[$varname]=$var;
}
//get type
function type($t){
    if(isset($_POST['type']) && $_POST['type']==$t){
        return true;
    }else{
        return false;
    }
}
//login check
function logged(){   
    $user=get_cookie('c_user');
    $s_id=get_cookie('s_id');
    $check=$GLOBALS['conn']->query("SELECT id FROM c_users WHERE userid='$user' AND sessionid='$s_id';");
    if($check->num_rows>0){
        return true;
    }else{
        return false;
    }
}
##########################################      body        ##########################################

//login check
if(isset($_COOKIE['c_user']) && isset($_COOKIE['s_id'])){
    $logincheckquery="SELECT * FROM c_users WHERE sessionid='{$_COOKIE['s_id']}';";
    $logincheckdata=$conn->query($logincheckquery);    
    $logincheck=$logincheckdata->fetch_assoc();
    if($logincheckdata->num_rows===1 && ($logincheck['expire_date'] > date("Y-m-d H:i:s", time()))){
        $_SESSION['logged']=true;
    }else{        
        $_SESSION['logged']=false;
    }
}
//login page
if(getindex("login")){
    $userid=get_post("userid");
    $loginuserselectquery="SELECT userid, userpassword, register FROM userinfo WHERE userid='{$userid}'";
    $loginuserdatainfo= $conn->query($loginuserselectquery);     
    if($loginuserdatainfo->num_rows===1){
        $loginuserdata=$loginuserdatainfo->fetch_assoc();   
        if(get_post('userid')===$loginuserdata['userid'] && get_post('userpass')===$loginuserdata['userpassword'] && $loginuserdata['register']==1){
            //login success                     
            session_start();
            //check and set cookies
            if(!isset($_COOKIE['s_id']) || !isset($_COOKIE['c_user'])){
                setcookie('c_user', $loginuserdata['userid'], time() + (84600 * 30));
                setcookie('s_id', session_id(), time() + (84600 * 30));
                $_COOKIE['c_user']=get_post('userid');
                $_COOKIE['s_id']=session_id();
                $_SESSION['userid']=$_COOKIE['c_user'];                
                $_SESSION['logged']=true;                
                //db insert
            }else{
                session_destroy();
                session_id($_COOKIE['s_id']);
                session_start();
                setcookie('c_user', $loginuserdata['userid'], time() + (84600 * 30));
                setcookie('s_id', $_COOKIE['s_id'], time() + (84600 * 30));
                //db update
            }

            if(isset($_COOKIE['c_user']) && isset($_COOKIE['s_id'])){
                //check and insert user to current users list
                $cuser=get_post('userid');
                $cuserselectquery="SELECT * FROM c_users WHERE userid='{$cuser}' AND sessionid='{$_COOKIE['s_id']}';";
                $cuserdatainfo=$conn->query($cuserselectquery);                
                if($cuserdatainfo->num_rows>1){
                    $c_usersdeletequery="DELETE FROM c_users WHERE sessionid='{$_COOKIE['s_id']}';";
                    $conn->query($c_usersdeletequery);
                }
                $cuserdatainfo=$conn->query($cuserselectquery);                          
                if($cuserdatainfo->num_rows==0){                                  
                    $c_userinsertquery="INSERT INTO c_users(userid, sessionid, expire_date) VALUES(?, ?, ?);";
                    $cuserinsert=$conn->prepare($c_userinsertquery);
                    $cuserinsert->bind_param("sss", $c_userid, $c_sessionid, $expire_date);                    
                    $c_userid=get_post('userid');
                    $c_sessionid=session_id();
                    $expire_date=date('Y-m-d H:i:s',time() + (84600 * 30));                  
                    $cuserinsert->execute();
                }elseif($cuserdatainfo->num_rows===1){
                    $cuserdata=$cuserdatainfo->fetch_assoc();
                    $expire_date=date('Y-m-d H:i:s',time() + (84600 * 30));
                    $cuserupdatequery="UPDATE c_users SET expire_date='{$expire_date}' WHERE sessionid='{$_COOKIE['s_id']}';";
                    $conn->query($cuserupdatequery);
                }
            }                          
            //navigate to profile
           // echo $expire_date;
            echo 'window.location.replace("profile.html")';
        }else if(get_post('userid')===$loginuserdata['userid'] && get_post('userpass')!==$loginuserdata['userpassword']){           
            echo "1";
        }else if(!$loginuserdata['register']){
            echo "2";
        }
    }else{
        echo "0";
    }
}
//create ac page
if(getindex('createac')){  
  //  echo print_r($_FILES);
    //data validation
    if(isvalid("employeename") && 
        isvalid("userid") &&
        isvalid("employeeaddress") &&
        isvalid("employeemail") && 
        isvalid("birthdate") &&
        isvalid("mobile") && 
        isvalid("gender") &&
        isvalid("employeenid") &&
        isset($_FILES['pp']) &&
        strlen($_FILES['pp']['tmp_name'])>0 &&
        isvalid("employeepass") &&
        isvalid("isemployee")
    ){     
           
        //data validated and now create acc
        $employeename=name_decode(get_post('employeename'));
        $employeeuserid=get_post('userid');
        $employeeaddress=get_post('employeeaddress');
        $employeemail=get_post('employeemail');
        $employeebirthdate=get_post('birthdate');
        $gender=get_post('gender');
        $employeenid=get_post('employeenid');
        $employeepass=get_post('employeepass');
        $file=file_get_contents($_FILES["pp"]["tmp_name"]);  
        $register=false;
        $isemployee=parsebool('isemployee');
        $usermobile=get_post('mobile');
        $createacquery = "INSERT INTO userinfo(username, userid, useraddress, useremail, birthdate, usergender, usernid, userimage, userpassword, register, isemployee, usermobile) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
        $operation=$conn->prepare($createacquery);
        $operation->bind_param("sssssssbsibs",
        $employeename,
        $employeeuserid,
        $employeeaddress,
        $employeemail,
        $employeebirthdate,
        $gender,
        $employeenid,
        $file,
        $employeepass,
        $register,
        $isemployee,
        $usermobile
        );     
         
        $operation->send_long_data(7, $file);
        $operation->execute();                          
        
        echo "window.location.replace('login.html')";   
    }else{
        echo "0";
    }      
}

//user check for create account (if user exist)
if(getindex('isuser')){
    $checkuserid=get_post('checkuserid');
    $checkuserquery="SELECT userid FROM userinfo WHERE userid='{$checkuserid}'";
    $found=$conn->query($checkuserquery);     
    if($found->num_rows>0){
        echo "0";
    }
}
//logout
if(getindex('logout')){
    //delete from c user
    if(isset($_COOKIE['s_id'])){
        $logoutuserdeletequery="DELETE FROM c_users WHERE sessionid='{$_COOKIE['s_id']}';";
        $conn->query($logoutuserdeletequery);
    }
    //delete cookie
    setcookie('c_user', '', 0);
    setcookie('s_id', '', 0);   
    echo "window.parent.location.replace('login.html')";
}
if(logged()){
    //get user info
    if(getindex('getuser')){
        session_id($_COOKIE['s_id']);
        session_start();       
        $user=get_cookie('c_user');
        $getuserquery="SELECT * FROM userinfo WHERE userid='{$user}';";  
        $getuserdata=$conn->query($getuserquery);       
        if($getuserdata->num_rows>0){
            $userdata=$getuserdata->fetch_assoc();
            //get image
            if(type('pp')){
                echo "<img src='data:image/jpeg;base64, ".base64_encode($userdata['userimage'])."' height='100' width='100' >";
            }else if(type('username')){
                echo $userdata['employeename'];
            }else if(type('userid')){
                echo $userdata['userid'];
            }else if(type('nav')){
                $img=base64_encode($userdata['userimage']);
                $username=$userdata['username'];
                $userid=$userdata['userid'];               
                echo "<table><tr>
                <td>
                    <img src='data:image/jpeg;base64, {$img}' height='100' width='100' alt='profile picture'/>
                </td>
                </tr>
                <tr>
                <td>
                    <h5 class='noselect'>{$username}</h5>         
                    <h5 class='noselect'>User ID: {$userid}</h5>
                </td>
                </tr></table>
                ";
            }
        }
    }
    //new product
    if(getindex('newproduct')){
        $productname=get_post('productname');
        $company=get_post('company');
        $category=get_post('category');       
        $purchaseprice=get_post('purchaseprice');
        $profit=get_post('profit');
        $sellprice=get_post('sellprice');
        $productphoto=get_file('productphoto');
        $remark=get_post('remark');
        $stock=0;
        if(mode('new')){
            $insertproductquery="INSERT INTO product(productname, company, category, purchaseprice, profit, sellprice, photo, remark, stock) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?);";
            $insertproduct=$conn->prepare($insertproductquery);        
            $insertproduct->bind_param('sssdddbsi', $productname, $company, $category, $purchaseprice, $profit, $sellprice, $photo, $remark, $stock);        
            $insertproduct->execute(); 
        }else{
            $updatequery="UPDATE product SET productname='$productname', company='$company', category='$category', purchaseprice=$purchaseprice, profit=$profit, sellprice=$sellprice, remark='$remark' WHERE productname='$productname';";  
            $conn->query($updatequery);  
        }
        
    }else if(getindex('newsale')){
        $invoiceno=get_post('invoiceno');
        $date=get_post('invoicedate');
        $customername=get_post('customername');
        $totalprice=get_post('invoicetotalprice');
        $discount=get_post('invoicediscount');
        $netprice=get_post('invoicenetprice');
        $paid=get_post('invoicepaid');
        $due=get_post('invoicedue');
        $customerid=get_post('customerid');

        $insertnewsalequery="INSERT INTO saleinvoice(invoiceno, invoicedate, customername, totalprice, discount, netprice, paid, due, customerid) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?);";
        $insertnewsale=$conn->prepare($insertnewsalequery);       
        $insertnewsale->bind_param('issdddddi', $invoiceno, $invoicedate, $customername, $totalprice, $discount, $netprice, $paid, $due, $customerid);
        $insertnewsale->execute();
        //push transaction 
        pushtransaction($date, $customername, $paid, get_post('paymentmethod'), "Cash in", "Payment recived from sale invoice - Invoice NO: $invoiceno");        
    }else if(getindex('newpurchase')){
        $invoiceno=get_post('invoiceno');
        $date=get_post('invoicedate');
        $companyname=get_post('companyname');
        $totalprice=get_post('invoicetotalprice');
        $discount=get_post('invoicediscount');
        $netprice=get_post('invoicenetprice');
        $paid=get_post('invoicepaid');
        $due=get_post('invoicedue');
        $insertnewpurchasequery="INSERT INTO purchaseinvoice(invoiceno, invoicedate, companyname, totalprice, discount, netprice, paid, due) VALUES(?, ?, ?, ?, ?, ?, ?, ?);";        
        $insertnewpurchase=$conn->prepare($insertnewpurchasequery);           
        $insertnewpurchase->bind_param('issddddd', $invoiceno, $invoicedate, $companyname, $totalprice, $discount, $netprice, $paid, $due);
        $insertnewpurchase->execute();
        //push transaction 
        pushtransaction($date, $companyname, $paid, get_post('paymentmethod'), "Cash out", "Payment paid for purchase invoice - Invoice NO: $invoiceno");        
    }else if(getindex('newtransaction')){
        $transactiondate=get_post('transactiondate');
        $relatedperson=get_post('relatedperson');
        $transactiontype=get_post('transactiontype');
        $transcationmedia=get_post('transactionmedia');
        $amount=get_post('amount');
        $remark=get_post('remark');
        if(mode('new')){
            $inserttransacionquery="INSERT INTO transaction(transactiondate, relatedperson, transactiontype, transactionmedia, amount, remark) VALUES(?, ?, ?, ?, ?, ?);";        
            $inserttransaction=$conn->prepare($inserttransacionquery);
            $inserttransaction->bind_param('ssssds', $transactiondate, $relatedperson, $transactiontype, $transcationmedia, $amount, $remark);
            $inserttransaction->execute();
        }else{
            $id=get_post('id');
            $updatequery="UPDATE transaction SET transactiondate='$transactiondate', relatedperson='$relatedperson', transactiontype='$transactiontype', transactionmedia='$transactionmedia', amount=$amount, remark='$remark' WHERE id=$id;";
            $conn->query($updatequery);
        }                
    }else if(getindex('newcustomer')){
        $shopname=get_post('shopname');
        $ownername=get_post('ownername');
        $address=get_post('address');
        $mobile=get_post('mobile');
        $email=get_post('email');
        $openingdue=get_post('openingdue');
        $remark=get_post('remark');        
        if(mode('new')){
            $insertcustomerquery="INSERT INTO customer(shopname, ownername, shopaddress, mobile, email, due, remark) VALUES(?, ?, ?, ?, ?, ?, ?);";
            $insertcustomer=$conn->prepare($insertcustomerquery);
            $insertcustomer->bind_param('sssssds', $shopname, $ownernam, $address, $mobile, $email, $openingdue, $remark);
            $insertcustomer->execute();
        }else{
            $id=get_post('id');
            $updatequery="UPDATE customer SET shopname='$shopname', ownername='$ownername', shopaddress='$address', mobile='$mobile', email='$email', due='$openingdue', remark='$remark' WHERE id=$id;";
            $conn->query($updatequery);
        }
    }else if(getindex('newemployee')){
        $employeename=get_post('employeename');
        $employeepost=get_post('employeepost');
        $employeeid=get_post('id');
        $birthday=get_post('birthday');
        $mobile=get_post('mobile');
        $gender=get_post('gender');
        $nid=get_post('nid');
        $photo=get_file('photo');
        $remark=get_post('remark');
        if(mode('new')){
            $insertemployeequery="INSERT INTO employee(employeename, post, emplyeeid, birthday, mobile, gender, nid, photo, remark) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?);";
            $insertemployee=$conn->prepare($insertemployeequery);
            $insertemployee->bind_param('ssissssbs', $employeename, $employeepost, $employeeid, $birthday, $mobile, $gender, $nid, $photo, $remark);
            $insertemployee->execute();
        }else{
            $id=get_post('id');
            $updatequery="UPDATE employee SET employeename='$employeename', post='$employeepost', employeeid='$employeeid', birthday='$birthday', mobile='$mobile', gender='$gender', nid='$nid', remark='$remark' WHERE id=$id;";            
            $conn->query($updatequery);
        }
    }else if(getindex('newasset')){
        $assetname=get_post('assetname');
        $price=get_post('price');
        $purchasedate=get_post('purchasedate');
        $purchasedocument=get_file('purchasedocument');
        if(mode('new')){
            $insertassetquery="INSERT INTO asset(assetname, price, purchasedate, purchasedocument) VALUES(?, ?, ?, ?);";        
            $insertasset=$conn->prepare($insertassetquery);       
            $insertasset->bind_param('sdsb', $assetname, $price, $purchasedate, $purchasedocument);
            $insertasset->execute();
        }else{
            $id=get_post('id');
            $updatequery="UPDATE asset SET assetname='$assetname', price=$price, purchasedate='$purchasedate' WHERE id=$id;";            
            $conn->query($updatequery);        
        }

     
    }else if(getindex('saleproduct')){
        $productname=get_post('productname');
        $company=get_post('company');
        $unitprice=get_post('unitprice');
        $quantity=get_post('quantity');
        $totalprice=get_post('totalprice');
        $invoiceno=get_post('invoiceno');
        $invoicedate=get_post('invoicedate');
        $insertsaleproductquery="INSERT INTO saleproduct(productname, company, unitprice, quantity, totalprice, invoiceno, invoicedate) VALUES(?, ?, ?, ?, ?, ?, ?);";
        $insertsaleproduct=$conn->prepare($insertsaleproductquery);
        $insertsaleproduct->bind_param('ssdddis', $productname, $company, $unitprice, $quantity, $totalprice, $invoiceno, $invoicedate);
        $insertsaleproduct->execute();
    }else if(getindex('purchaseproduct')){
        $productname=get_post('productname');        
        $unitprice=get_post('unitprice');
        $quantity=get_post('quantity');
        $totalprice=get_post('totalprice');
        $invoiceno=get_post('invoiceno');
        $invoicedate=get_post('invoicedate');
        $insertpurchaseproductquery="INSERT INTO purchaseproduct(productname, unitprice, quantity, totalprice, invoiceno, invoicedate) VALUES(?, ?, ?, ?, ?, ?);";
        $insertpurchaseproduct=$conn->prepare($insertpurchaseproductquery);  
        $insertpurchaseproduct->bind_param('sdddis', $productname, $unitprice, $quantity, $totalprice, $invoiceno, $invoicedate);      
        $insertpurchaseproduct->execute();
    }else if(getindex('newcompany')){
        $companyname=get_post('companyname');
        $contactperson=get_post('contactperson');
        $officeaddress=get_post('officeaddress');
        $mobile=get_post('mobile');
        $email=get_post('email');
        $openingdue=get_post('openingdue');
        if(mode('new')){
            $insertcompanyquery="INSERT INTO company(companyname, contactperson, officeaddress, mobile, email, due) VALUES(?, ?, ?, ?, ?, ?);";
            $datainfo=$conn->prepare($insertcompanyquery);       
            $datainfo->bind_param('sssssd', $companyname, $contactperson, $officeaddress, $mobile, $email, $openingdue);   
            $datainfo->execute();            
        }else{
            $id=get_post('id');
            $updatequery="UPDATE company SET companyname='$companyname', contactperson='$contactperson', officeaddress='$officeaddress', mobile='$mobile', email='$email', due=$due WHERE id=$id;";            
            $conn->query($updatequery);  
        }
        
    }else if(getindex('newbankaccount')){
        $accountholdername=get_post('accountholdername');
        $bankname=get_post('bankname');
        $branch=get_post('branch');
        $accountno=get_post('accountno');
        $balance=get_post('balance');
        if(mode('new')){
            $insertnewbankaccountquery="INSERT INTO bankaccount(accountholdername, bankname, branch, accountno, balance) VALUES(?, ?, ?, ?, ?);";
            $datainfo=$conn->prepare($insertnewbankaccountquery);
            $datainfo->bind_param('ssssd', $accountholdername, $bankname, $branch, $accountno, $balance);
            $datainfo->execute();
        }else{
            $id=get_post('id');
            $updatequery="UPDATE bankaccount SET accountholdername='$accountholdername', bankname='$bankname', $branch='$branch', accountno='$accountno', b";            
            $conn->query($updatequery);  
        }
        
    }else if(getindex('product')) {
        detailpage('product', 'product', 
        array('productname', 'company', 'category', 'purchaseprice', 'profit', 'sellprice', 'stock', 'photo', 'remark'),
        array('Product name', 'Company', 'Category', 'Purchase price', 'Profit', 'Sell price', 'Stock','Photo', 'Remark'),
        array(200, 150, 100, 50, 50, 50, 50, 50,100, '15%'),
        array('productname', 'company', 'category', 'purchaseprice', 'profit', 'sellprice', 'photo', 'remark')
    );
    }else if(getindex('transaction')){
        detailpage('transaction', 'transaction', 
        array('transactiondate', 'relatedperson', 'transactiontype', 'transactionmedia', 'amount', 'remark'), 
        array('Transasction date', 'Related person/company/shop', 'Type', 'Media', 'Amount', 'Remark'),
        array(150, 250, 100, 100, 100, '30%'),
        array('transactiondate', 'relatedperson', 'transactiontype', 'transactiontype', 'transactionmedia', 'transactionmedia', 'amount', 'remark')
    );
    }else if(getindex('customer')){
        detailpage('customer', 'customer',
        array('shopname', 'ownername', 'shopaddress', 'mobile', 'email'),
        array('Shop name', 'Owner name', 'Address', 'Mobile', 'Email'),
        array(200,150,200,150,'40%'),
        array('shopname', 'ownername', 'shopaddress', 'mobile', 'email', 'openingdue'),
    );
    }else if(getindex('employee')){
        detailpage('employee', 'employee',
        array('employeename', 'post', 'employeeid', 'birthday', 'mobile', 'gender', 'nid', 'photo'),
        array('Employee name', 'POST', 'ID', 'Birthday', 'Mobile', 'Gender', 'NID', 'Photo'),
        array(200, 150, 100, 100, 100, 100, 150 , '20%'),
        array('employeename', 'post', 'employeeid', 'birthday', 'mobile', 'gender', 'gender', 'gender', 'nid', 'photo')
    );        
    }else if(getindex('asset')){
        detailpage('asset', 'asset', 
        array('assetname', 'price', 'purchasedate', 'purchasedocument'),
        array('Asset name', 'Price', 'Purchase date', 'Purchase document'),
        array(250, 100, 150, '40%'),
        array('assetname', 'price', 'purchasedate', 'purchasedocument')
    );
    }else if(getindex('sale')){
        detailpage('sale', 'saleinvoice',
        array('invoiceno', 'invoicedate', 'customername', 'totalprice', 'discount', 'netprice', 'paid', 'due'),
        array('Invoice NO', 'Date', 'Customer name', 'Total price', 'Discount', 'Net price', 'Paid', 'Due'),
        array(100, 150, 200,  100, 100, 100, 100, 100 ,100),
        array('invoiceno', 'invoicedate', 'customername', 'totalprice', 'discount', 'netprice', 'paid', 'due')
    );
    }else if(getindex('purchase')){
        detailpage('purchase', 'purchaseinvoice',
        array('invoiceno', 'invoicedate', 'companyname', 'totalprice', 'discount', 'netprice', 'paid', 'due'),
        array('Invoice NO', 'Date', 'Company name', 'Total price', 'Discount', 'Net price', 'Paid', 'Due'),
        array(50, 150, 200,  100, 100, 100, 100, 100 ,100),
        array('invoiceno', 'invoicedate', 'companyname', 'totalprice', 'discount', 'netprice', 'paid', 'due')
    );
    }else if(getindex('shopinfo')){
        
    }else if(getindex('pendingdelivery')){
        detailpage('pendingdelivery', 'delivery',
        array('invoiceno', 'invoicedate', 'customername', 'deliveryaddress', 'deliverytime', 'netprice'),
        array('Invoice NO', 'Date', 'Customer name', 'Delivery address', 'Delivery time', 'Invoice amount'),   
        array(100, 150, 200, 200, 150, '15%'),
        array('invoiceno', 'invoicedate', 'customername', 'deliveryaddress', 'deliverytime', 'netprice')
    );
    }else if(getindex('confirmeddelivery')){
        detailpage('confirmeddelivery', 'delivery',
        array('invoiceno', 'invoicedate', 'customername', 'deliveryaddress', 'deliverytime', 'netprice'),
        array('Invoice NO', 'Date', 'Customer name', 'Delivery address', 'Delivery time', 'Invoice amount'),        
        array(100, 150, 200, 200, 150, '15%'),
        array('invoiceno', 'invoicedate', 'customername', 'deliveryaddress', 'deliverytime', 'netprice')
    );
    }else if(getindex('pcategory')){        
        detailpage('pcategory', 'productcategory',
        array('category', 'remark'),
        array('Category name', 'Remark'),
        array(300, '70%'),
        array('category', 'remark')
    );
    }else if(getindex('company')){
        detailpage(
            'company', 'company',
            array('companyname', 'officeaddress', 'contactperson', 'mobile', 'email', 'website'),
            array('Company name', 'Office address', 'Contact person', 'Mobile', 'Email', 'Website'),
            array(200, 150, 150, 150, 150, '15%'),
            array('companyname', 'officeaddress', 'contactperson', 'mobile', 'email', 'website')
    );    
    }else if(getindex('bankaccount')){
        detailpage('bankaccount', 'bankaccount',
        array('accountholdername', 'bankname', 'branch', 'accountno', 'balance'),
        array('Account holder name', 'Bank name', 'Branch', 'Account NO', 'Balance'),
        array(250, 200, 200, '20%', 100),
        array('accountholdername', 'bankname', 'branch', 'accountno', 'balance')
    );    
    }else if(getindex('tcategory')){
        detailpage('tcategory', 'transactioncategory',
        array('categoryname', 'transactiontype',  'remark'),
        array('Category name', 'Transaction type', 'Remark'),
        array(400, 150, '50%'),
        array('categoryname', 'transactiontype', 'transactiontype', 'remark'),
    ); 
    }else if(getindex('allreport')){
        detailpage('allreport', 'allreport',
        array('date', 'cashin', 'cashout', 'cashbalance', 'bankin', 'bankout', 'bankbalance', 'totalsale', 'paidsale', 'duesale', 'totalpurchase', 'paidpurchase', 'duepurchase', 'creditdue', 'debitdue', 'totalasset'),
        array('Date', 'Cash in', 'Cash out', 'Cash balance', 'Bank deposit', 'Bank withdraw', 'Bank balance', 'Total sale','Paid sale', 'Due sale', 'Total purcahse', 'Paid purchase', 'Due purchase', 'Credit due', 'Debit due', 'Total asset'),
        array(100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100),
        array('date', 'cashin', 'cashout', 'cashbalance', 'bankin', 'bankout', 'bankbalance', 'totalsale', 'paidsale', 'duesale', 'totalpurchase', 'paidpurchase', 'duepurchase', 'creditdue', 'debitdue', 'totalasset'),
    );
    }else if(getindex('newpcategory')){
        $category=get_post('categoryname');
        $remark=get_post('remark');
        $id=get_post('id');
        if(mode('new')){
            $insertpcategoryquery="INSERT INTO productcategory(category, remark) VALUES(?, ?);";
            $insertproductcategory=$conn->prepare($insertpcategoryquery);
            $insertproductcategory->bind_param('ss',$category, $remark);
            $insertproductcategory->execute();        
        }else{
            $updatequery="UPDATE productcategory SET category='$category', remark='$remark' WHERE id=$id;";
            $conn->query($updatequery);           
        }   
        
    }else if(getindex('newtcategory')){
        $categoryname=get_post('categoryname');
        $transactiontype=get_post('transactiontype');
        $remark=get_post('remark');
        $id=get_post('id');
        if(mode('new')){
            $inserttransactioncategoryqry="INSERT INTO transactioncategory(categoryname, transactiontype, remark) VALUES(?, ?, ?);";
            $datainfo=$conn->prepare($inserttransactioncategoryqry);
            $datainfo->bind_param('sss', $categoryname, $transactiontype, $remark);
            $datainfo->execute();
        }else{
            $updatequery="UPDATE transactioncategory SET categoryname='$categoryname', remark='$remark' WHERE id='$id';";
            $conn->query($updatequery);
        }
    }else if(getindex('dlt')){
        dlt(get_post('id'), get_post('tbl'));
    }else if(getindex('edt')){   
        $tbl=get_post('tbl');
        $dt=get_post('data');  
        $dt=explode(',', $dt);
        $id='';
        $result=array();  
        $qry='';
        if($tbl != 'userinfo'){
            $id=get_post('id');
            $qry="SELECT * FROM $tbl WHERE id=$id;";
        }else{
            $id=$_COOKIE['c_user'];
            $sessionid=$_COOKIE['s_id'];                        
            $checkuser=$conn->query("SELECT id FROM c_users WHERE userid = '$id' AND sessionid = '$sessionid';");          
            if($checkuser->num_rows>0){
                $qry="SELECT * FROM $tbl WHERE userid='$id';";
            }
        }
       
        $datainfo=$conn->query($qry);               
        if($datainfo->num_rows>0){
            $data=$datainfo->fetch_assoc();          
            for($i=0;$i<sizeof($dt);$i++){
                array_push($result, $data["$dt[$i]"]);
            }
            echo implode(', ', $result);
        }
    }else if(getindex('getproduct')){
        $invoiceno=get_post('invoiceno');
        $elem="";
        $dcol;
        if(get_post('page') == 'sale'){    
            $dcol=array('productname', 'company', 'unitprice', 'quantity', 'totalprice');
            
            $datainfo=$conn->query("SELECT * FROM saleproduct WHERE invoiceno={$invoiceno}");
            
            for($i=0;$i<$datainfo->num_rows;$i++){
                $data=$datainfo->fetch_assoc();
                $elem .= "<tr>";
                for($j=0; $j<5;$j++){
                    $elem .="<td>{$data[(string)$dcol[$j]]}</td>";
                }
                $elem .="</tr>";
            }
            echo $elem;
        }else{
            $dcol=array('productname', 'unitprice', 'quantity', 'totalprice');
            
            $datainfo=$conn->query("SELECT * FROM purchaseproduct WHERE invoiceno={$invoiceno}");            

            for($i=0;$i<$datainfo->num_rows;$i++){
                $data=$datainfo->fetch_assoc();
                $elem .= "<tr>";
                for($j=0; $j<4;$j++){
                    $elem .="<td>{$data[(string)$dcol[$j]]}</td>";
                }
                $elem .="</tr>";
            }
            echo $elem;
        }
    }else if(getindex('getauto')){
        $tablename=get_post('tablename');
        $colname=get_post('colname');
        $autoid=get_post('id');
        $datainfo=$conn->query("SELECT {$colname} FROM {$tablename}");
        $elem="<datalist id='auto{$autoid}'>";
        for($i=0;$i<$datainfo->num_rows;$i++){
            $data=$datainfo->fetch_assoc();
            $elem .= "<option value='{$data[$colname]}'/>";
        }
        $elem .="</datalist>";
        echo $elem;    
    }else if(getindex('getc')){
        $value=get_post('value');
        $table=get_post('table');
        $datacol=get_post('datacol');
        $selectcol=get_post('selectcol');
        $datainfo=$conn->query("SELECT $datacol FROM $table WHERE $selectcol='{$value}';");                      
        if($datainfo->num_rows>0){
            $data=$datainfo->fetch_assoc();
            echo $data[$datacol];
        }
    }else if(getindex('minusproduct')){
        $product=explode(", ", get_post('product'));
        $quantity=explode(", ", get_post('quantity'));
        for($i=0;$i<sizeof($product);$i++){
            $datainfo=$conn->query("SELECT stock FROM product WHERE productname='{$product[$i]}';");      
            $data=$datainfo->fetch_assoc();         
            $current=$data['stock'] - (integer)$quantity[$i];
            $conn->query("UPDATE product SET stock={$current} WHERE productname='{$product[$i]}';");
        }
    }else if(getindex('plusproduct')){
        $product=explode(", ", get_post('product'));
        $quantity=explode(", ", get_post('quantity'));
        for($i=0;$i<sizeof($product);$i++){
            $datainfo=$conn->query("SELECT stock FROM product WHERE productname='{$product[$i]}';");
            $data=$datainfo->fetch_assoc();         
            $current=$data['stock'] + $quantity[$i];       
            $conn->query("UPDATE product SET stock={$current} WHERE productname='{$product[$i]}';");
        }
    }else if(getindex('getid')){
        echo getid(get_post('tablename'));
    }else if(getindex('getstock')){
        $productname=get_post('productname');
        $datainfo=$conn->query("SELECT stock from product WHERE productname='{$productname}'");
        $data=$datainfo->fetch_assoc();    
        echo $data['stock'];
    }else if(getindex('getreport')){        
        $date=convertiso();
        //total cash out
        $cashout=$conn->query("SELECT SUM(amount) AS value FROM transaction WHERE transactiontype = 'Cash out' AND transactionmedia = 'Cash' AND transactiondate LIKE '%$date%';");     
        $cashout=$cashout->fetch_assoc();
        $cashout=$cashout['value'];
        //total cash in
        $cashin=$conn->query("SELECT SUM(amount) AS value FROM transaction WHERE transactiontype = 'Cash in' AND transactionmedia = 'Cash' AND transactiondate LIKE '%$date%';");
        $cashin=$cashin->fetch_assoc();
        $cashin=$cashin['value'];
        //total bank out
        $bankout=$conn->query("SELECT SUM(amount) AS value FROM transaction WHERE transactiontype = 'Cash out' AND transactionmedia = 'Bank' AND transactiondate LIKE '%$date%';");
        $bankout=$bankout->fetch_assoc();
        $bankout=$bankout['value'];
        //total bank in
        $bankin=$conn->query("SELECT SUM(amount) AS value FROM transaction WHERE transactiontype = 'Cash in' AND transactionmedia = 'Bank' AND transactiondate LIKE '%$date%';");
        $bankin=$bankin->fetch_assoc();
        $bankin=$bankin['value'];        
        //total out
        $totalout=$cashout+$bankout;
        //total in        
        $totalin=$cashin+$bankin;
        //cash balance
        $cashbalance=$cashin-$cashout;
        //bank balance
        $bankbalance=$conn->query("SELECT SUM(balance) AS value FROM bankaccount;");
        $bankbalance=$bankbalance->fetch_assoc();
        $bankbalance=$bankbalance['value'];
        //total sale
        $totalsale=$conn->query("SELECT SUM(netprice) AS value FROM saleinvoice WHERE invoicedate LIKE '%$date%';");
        $totalsale=$totalsale->fetch_assoc();
        $totalsale=$totalsale['value'];
        //paid sale
        $paidsale=$conn->query("SELECT SUM(paid) AS value FROM saleinvoice WHERE invoicedate LIKE '%$date%';");
        $paidsale=$paidsale->fetch_assoc();
        $paidsale=$paidsale['value'];
        //due sale
        $duesale=$conn->query("SELECT SUM(due)  AS value from saleinvoice WHERE invoicedate LIKE '%$date%';");
        $duesale=$duesale->fetch_assoc();
        $duesale=$duesale['value'];
        //total purchase
        $totalpurchase=$conn->query("SELECT SUM(netprice) AS value FROM purchaseinvoice WHERE invoicedate LIKE '%$date%';");
        $totalpurchase=$totalpurchase->fetch_assoc();
        $totalpurchase=$totalpurchase['value'];
        //paid purcahse
        $paidpurchase=$conn->query("SELECT SUM(paid) AS value FROM purchaseinvoice WHERE invoicedate LIKE '%$date%';");
        $paidpurchase=$paidpurchase->fetch_assoc();
        $paidpurchase=$paidpurchase['value'];
        //due purchase
        $duepurchase=$conn->query("SELECT SUM(due) AS value FROM purchaseinvoice WHERE invoicedate LIKE '%$date%';");
        $duepurchase=$duepurchase->fetch_assoc();
        $duepurcahse=$duepurchase['value'];
        //total asset
        $totalasset=$conn->query("SELECT SUM(price) AS value FROM asset;");
        $totalasset=$totalasset->fetch_assoc();
        $totalasset=$totalasset['value'];
        //credit dues
        $totalcreditdue=$conn->query("SELECT SUM(due) AS value FROM customer;");
        $totalcreditdue=$totalcreditdue->fetch_assoc();
        $totalcreditdue=$totalcreditdue['value'];
        //debit dues
        $totaldebitdue=$conn->query("SELECT SUM(due) AS value FROM company;");
        $totaldebitdue=$totaldebitdue->fetch_assoc();
        $totaldebitdue=$totaldebitdue['value'];
        
        $list='Cash in, Cash out, Cash balance, -, Bank withdraw, Bank Deposit, Bank balance, -, Total sale, 
        Paid, Due, -, Total purchase, Paid, Due, -, Credit due, Debit due, -, Total asset';
        $data="$cashin, $cashout, $cashbalance, -, $bankout, $bankin, $bankbalance, -, $totalsale, $paidsale, 
        $duesale, -, $totalpurchase, $paidpurchase, $duepurcahse, -, $totalcreditdue, $totaldebitdue, -, $totalasset";
        //insert into all record
        
        
        echo $list . ':::' . $data;
    }else if(getindex('savesetting')){
        $datainfo=$conn->query("SELECT * FROM shopinfo;");

        $shopname=get_post('shopname');
        $workdetail=get_post('workdetail');
        $currency=get_post('currency');
        $address=get_post('address');
        $mobile=get_post('mobile');
        $email=get_post('email');
        $website=get_post('website');
        $animateheader=parsebool('animate');
        $hidemenufirstload=parsebool('hidemenu');    
        if($datainfo->num_rows==0){
            //create new            
            $datainfo=$conn->prepare("INSERT INTO shopinfo(shopname, workdetail, currency, shopaddress, mobile, email, website, animateheader, hidemenufirstload) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?);");        
            $datainfo->bind_param('sssssssbb', $shopname, $workdetail, $currency, $address, $mobile, $email, $website, $animateheader, $hidemenufirstload);
            $datainfo->execute();
        }else{
            //update existed setting
            $conn->query("UPDATE shopinfo SET shopname='$shopname', workdetail='$workdetail', currency='$currency', shopaddress='$address', mobile='$mobile', email='$email', website='$website', animateheader='$animateheader', hidemenufirstload='$hidemenufirstload';");
        }
    }else if(getindex('getshopname')){
        $data=$conn->query("SELECT shopname from shopinfo;");
        if($data->num_rows>0){
            $data=$data->fetch_assoc();
            echo $data['shopname'];
        }else{
            echo 'Shop name';
        }
    }else if(getindex('userprofile')){
        $username=get_post('username');
        $userid=get_post('userid');
        $useraddress=get_post('useraddress');
        $useremail=get_post('useremail');
        $usermobile=get_post('usermobile');
        $gender=get_post('gender');
        $birthday=get_post('birthday');
        $nid=get_post('nid');
        $password=get_post('password');
        $cuser=$_COOKIE['c_user'];
        $updatequery="UPDATE userinfo SET username='$username', userid='$userid', useraddress='$useraddress', useremail='$useremail', birthdate='$birthday', usermobile='$usermobile', usergender='$gender', usernid='$nid', userpassword='$password' WHERE userid='$cuser';";
        $conn->query($updatequery);
    }else if(getindex('getdash')){
        $table=get_post('table');
        $col=get_post('col');
        $datecol=get_post('datecol');
        $date=get_post('date');     
        $datainfo="";
        if(strlen($datecol) == 0){
            $datainfo=$conn->query("SELECT SUM($col) AS value FROM $table");
        }else{
            $datainfo=$conn->query("SELECT SUM($col) AS value FROM $table WHERE $datecol='$date';");    
        }  
        echo $conn->error;
        if($datainfo->num_rows>0){
            $datainfo=$datainfo->fetch_assoc();       
            if(isset($datainfo['value'])){
                echo $datainfo["value"];
            }else{
                echo 0;
            }           
        }else{
            echo 0;
        }  
    }else if(getindex('getcurrency')){
        $datainfo=$conn->query("SELECT currency FROM shopinfo;");
        if($datainfo->num_rows>0){
            $datainfo=$datainfo->fetch_assoc();  
            echo $datainfo['currency'];
        }else{
            echo '$';
        }
    }else if(getindex('getnotice')){
        $date=get_post('date');
        $datainfo=$conn->query("SELECT * FROM notice WHERE enddate >= '$date';");     
        echo $conn->error;         
        $date=array();
        $value=array();
        for($i=0;$i<$datainfo->num_rows && $datainfo->num_rows > 0;$i++){
            $data=$datainfo->fetch_assoc();
            array_push($date,  substr($data['startdate'], 0, 10));
            array_push($value, $data['noticetext']);
        }
        echo implode(', ', $date) . ':::' . implode(', ', $value);
    }else if(getindex('newnotice')){
        $startdate=get_post('startdate');
        $enddate=get_post('enddate');
        $noticetext=get_post('noticetext');
        $createnoticequery="INSERT INTO notice(startdate, enddate, noticetext) VALUES(?, ?, ?);";              
        $datainfo=$conn->prepare($createnoticequery);
        $datainfo->bind_param('sss', $startdate, $enddate, $noticetext);
        $datainfo->execute();
    }else if(getindex('getuserforcontrol')){
        $elem='<tr>';
        //set header
        $header=array('User name', 'User ID', 'User post', 'Image');
        for($i=0;$i<sizeof($header)+1;$i++){            
            if($i==sizeof($header)){
                $elem .= "<th>O</th>";
            }else{
                $elem .= '<th>' . $header[$i] . '</th>';
            }
        }
        $elem .= '</tr>';

        $dcol=array('username', 'userid', 'userpost', 'userimage', '');
        $datainfo=$conn->query("SELECT username, userid, userpost, userimage FROM userinfo;");      

        if($datainfo->num_rows>0){
            for($i=0;$i<$datainfo->num_rows;$i++){      
                $data=$datainfo->fetch_assoc();          
                $elem .= '<tr>';                                
                for($j=0;$j<sizeof($dcol);$j++){
                   if($j<3){                                                
                        $elem .= "<td>{$data[$dcol[$j]]}</td>";
                   }else if($j==3){                      
                        $img=base64_encode($data['userimage']);
                        $elem .= "<td><img src='data:image/jpeg; base64, $img' /></td>";
                   }else if($j==4){
                        $elem .= "<td><button class='optionbutton' name='{$data['userid']}'></button></td>";
                   }
                }
                $elem .= '</tr>';
            }
        }
        echo $elem;
    }else if(getindex('checkcheck')){
        $user=get_post('user');
        $dcol=explode(', ', 'register, product, sale, purchase, transaction, bankaccount, company, customer, employee, asset, report, isadmin');
        $datainfo=$conn->query("SELECT * FROM userinfo WHERE userid = '$user';");
        echo $conn->error;
        if($datainfo->num_rows>0){
            $data=$datainfo->fetch_assoc();
            $report=array();
            for($i=0;$i<sizeof($dcol);$i++)array_push($report, $data[$dcol[$i]]);
            echo implode(', ', $report);
        }
    }else if(getindex('updateuserpermission')){
        $user=get_post('user');
        $register=parsebool('register');
        $product=parsebool('product');
        $sale=parsebool('sale');
        $purchase=parsebool('purchase');
        $transaction=parsebool('transaction');
        $bankaccount=parsebool('bankaccount');
        $company=parsebool('company');
        $customer=parsebool('customer');
        $employee=parsebool('employee');
        $asset=parsebool('asset');
        $report=parsebool('report');
        $isadmin=parsebool('isadmin');        
        $conn->query("UPDATE userinfo SET register=$register, product=$product, sale=$sale, purchase=$purchase, transaction=$transaction, bankaccount=$bankaccount, company=$company, customer=$customer, employee=$employee, asset=$asset, report=$report, isadmin=$isadmin WHERE userid='$user';");
    }else if(getindex('deleteuser')){
        $user=get_post('user');
        //check if admin
        $check=$conn->query("SELECT isadmin FROM userinfo WHERE userid='$user';");
        $check=$check->fetch_assoc();
        if($check['isadmin'] == 0){
            $conn->query("DELETE FROM userinfo WHERE userid='$user';");
            echo 1;
        }else{
            echo 0;
        }
        
    }else if((getindex('applypermission'))){
             //check if c user is ok
        $user=$_COOKIE['c_user'];
        $s_id=$_COOKIE['s_id'];

        $is_user=$conn->query("SELECT * FROM c_users WHERE userid='$user' AND sessionid='$s_id';");
        if($is_user->num_rows>0){
            $tcol=explode(', ', 'Product, Sale, Purchase, Transaction, Bank account, Company, Customer, Employee, Asset, Report');
            $dcol=explode(', ', 'product, sale, purchase, transaction, bankaccount, company, customer, employee, asset, report');   
            $resultcol=array();

            $datainfo=$conn->query("SELECT * FROM userinfo WHERE userid='$user';");
            if($datainfo->num_rows>0){
                $data=$datainfo->fetch_assoc();
                for($i=0;$i<sizeof($dcol);$i++)if($data[$dcol[$i]] == 0)array_push($resultcol, $tcol[$i]);
                echo implode(', ', $resultcol);
            }
        }
        
    }else if(getindex('isadmin')){
        $user=$_COOKIE['c_user'];
        $s_id=$_COOKIE['s_id'];
        $info=$conn->query("SELECT id FROM c_users WHERE userid='$user' AND sessionid='$s_id';");
        if($info->num_rows>0){
            $check=$conn->query("SELECT isadmin FROM userinfo WHERE userid='$user';");
            $check=$check->fetch_assoc();
            if($check['isadmin'] == true){
                echo true;
            }else{
                echo false;
            }
        }else{
            echo false;
        }
    }else if(getindex('isuserlogged')){
        if(logged()){
            echo 1;
        }else{
            echo 0;
        }
    }
}


?>