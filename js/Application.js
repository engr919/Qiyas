   
    // USE XMLHttpRequest Object instead if problems
	var QIASWS = "http://87.101.230.11/QiyiasWebServices/";		
	var QIASLocal = "http://192.168.100.110/";
	var ServerPath=QIASLocal;
    var eInfo;
	var otp;
	var sid;	
	var b64String;
	var ids;
	
	function VisitWebSite()
	{
		window.open('http://www.qiyas.sa', '_blank', 'location=yes');
	}
	
		
	function VisitWebSite1()
	{
		window.open('http://www.inteshaar.com/', '_blank', 'location=yes');
	}
	
	function upload()
	{	
		$(document).ready(function()
		{
		var settings = {
			url: "http://87.101.176.65:8080/MobileServletTest/MobileServlet",
			method: "POST",
			allowedTypes:"jpg,png,gif,doc,pdf,zip",
			fileName: "myfile",
			multiple: true,
			onSuccess:function(files,data,xhr)
			{
				$("#status").html("<font color='green'>Upload is success</font>");
				
			},
			onError: function(files,status,errMsg)
			{		
				$("#status").html("<font color='red'>Upload is Failed</font>");
			}
		}
		$("#mulitplefileuploader").uploadFile(settings);

		});
		
		raiseTicket();
	}
	
	function readImage(input) {
			if ( input.files && input.files[0] ) {
				var FR= new FileReader();
				FR.onload = function(e) {
					 $('#img').attr( "src", e.target.result );
					 var b64 = e.target.result;
					 alert(b64);
				};       
				FR.readAsDataURL( input.files[0] );
			}
			
		$("#asd").change(function(){
		readImage( this );
		});
	}
	
	function save(b64){
		b64String = b64;		
	}
	
	function showWait()
	{
		$.mobile.utils.showWaitBox("a", "يرجى الأنتظار ...........");
	}

	function hideWait()
	{
		$.mobile.utils.hideWaitBox();
	}
	
	function raiseTicket()
	{
		readImage(this);
		var radio;
        var accno = $("#accno").val();
        var sidx = $("#sidx").val();		
		var name = $("#name").val();		
		var address = $("#address").val();		
		var mobile_no = $("#mobile_no").val();		
		var phone_no = $("#phone_no").val();
		var ticket_txt = $("#ticket_txt").val();
		
		
		if(sidx != sid)
		{
			alert("رقم الهوية المدخل غير مطابق لرقم الهوية المستخدم في عملية تسجيل الدخول");
			return 0;
		}		
		
		var text0 = document.getElementById('accno').value;//get value from textbox
		var text1 = document.getElementById('sidx').value;//get value from textbox		
		var text2 = document.getElementById('mobile_no').value;//get value from textbox
		
		var regex0 = /^\d{10}$/;//only allow letters (minimum of 1). No whitespace, no symbols, no numbers
		var regex1 = /^\d{10}$/;//only allow letters (minimum of 1). No whitespace, no symbols, no numbers		
		var regex2 = /^\d{10}$/;//only allow letters (minimum of 1). No whitespace, no symbols, no numbers
		
		if(regex0.test(text0) && regex1.test(text1) && regex2.test(text2)){		
		radio = $('#selectmenu3').val();

		if(radio == "" || radio == null || radio == 0)
		{
			alert("يرجى أختيار نوع الأختبار");
			return 0;
		}
		
		if(ticket_txt == "" || ticket_txt == null || ticket_txt == 0)
		{
			alert("يرجى أدخال تفاصيل التذكرة");
			return 0;
		}
		
		if(name == "" || name == null || name == 0)
		{
			alert("يرجى أدخال الأسم");
			return 0;
		}		
		
		var attachment = "";
		
		var url0 = "http://87.101.176.65/NEWWS/JSONP-EndPoint.asmx/CreateTicket";
		
		try{			
			navigator.notification.activityStart();												
			var res0 = GetSingleValueFromWS(url0, "AccNo=" + accno + "&SID=" + sidx + "&name=" + name + "&address=" + address + "&mobile_no=" + mobile_no + "&phone_no=" + phone_no + "&TicketTypeID=" + radio + "&Description=" + ticket_txt + "&attachment=" + b64String);
			navigator.notification.activityStop();			
			document.getElementById("ticket_no").innerHTML = res0;
		}
		catch(ex)
		{
			document.getElementById("ticket_no").innerHTML = "خطأ غير متوقع" + ". رسالة الخطأ: " + ex;
		}
		}

		else		
		{
			alert("يرجى التأكد من أدخال البيانات بشكل صحيح");
			return 0;
		}
	}
	
	function RetriveSID()
	{
		var idm = $("#IDS").val();
		window.localStorage.setItem('ids',idm);
		ids = window.localStorage.getItem('ids');
		
		document.location = "#AccountInfo_Page";	
	}
	
	function uploadPhoto(imageURI) {   

			document.getElementById("myimg").src=imageURI;

            var options = new FileUploadOptions(); 
            options.chunkedMode  = false;
            options.fileKey="recFile"; 
            var imagefilename = imageURI; 
            options.fileName=imagefilename; 
            options.mimeType="image/jpeg"; 

            var ft = new FileTransfer(); 
            ft.upload(imageURI, "http://192.168.2.192/CORS/Service1.asmx/SaveImage", win, fail, options); 
        }
		
		function win(r) { 
            //console.log("Code = " + r.responseCode); 
            //console.log("Response = " + r.response); 
            //alert("Sent = " + r.bytesSent); 
        } 
        function fail(error) { 
         switch (error.code) { 
                    case FileTransferError.FILE_NOT_FOUND_ERR: 
                        alert("Photo file not found"); 
                        break; 
                    case FileTransferError.INVALID_URL_ERR: 
                        alert("Bad Photo URL"); 
                        break; 
                    case FileTransferError.CONNECTION_ERR: 
                        alert("Connection error"); 
                        break; 
                } 
				}


    function LoginToSystem1() {
        var id = $("#ID").val();
		
		var text0 = document.getElementById('ID').value;//get value from textbox				
		var regex0 = /^\d{10}$/;//only allow letters (minimum of 1). No whitespace, no symbols, no numbers

		if(regex0.test(text0)){		
		
		
        var url = ServerPath + "QiyasIntegrationService.asmx/Login";
		window.localStorage.setItem('sid',id);
		sid = window.localStorage.getItem('sid');
        //otp = GetSingleValueFromWS(url, "xID=" + id);
		//alert(sid);
		otp = "1234";
        if (otp == 0 || otp == null || otp == "")
            {
				alert("خطأ في أنشاء كلمة المرور المؤقته");
				return 0;
			}
		document.location = "#LoginPage2";	
		}
		else		
		{
			alert("يرجى أدخال رقم هوية وطنية صحيح");
		}
		}
	
	 function LoginToSystem2() {        
        var xOTP = $("#OTP").val();
		
		var text0 = document.getElementById('OTP').value;//get value from textbox				
		var regex0 = /^\d{4}$/;//only allow letters (minimum of 1). No whitespace, no symbols, no numbers

			if(regex0.test(text0)){		
		
				if (otp == xOTP)
					document.location = "#FunctionsPage";
				else
					alert("كلمة المرور المؤقتة المدخله غير مطابقة");
			}
			else
			{
				alert("يرجى أدخال كلمة المرور المؤقتة والمكونه من اربعة ارقام");
			}
    }
	
	function GetAccountNoWS(vSID, vBD, vMN) {
        //var url = ServerPath + "QiyasIntegrationService.asmx/GetAccountNo";
		var url = ServerPath + "QIAS/Service1.asmx";		
		alert(url);
        var xmlhttp;
		alert("0");
        xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", url, false);
		alert("1");
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		var queryString = "SID=" + vSID + "&BirthYear=" + vBD + "&MobileNo=" + vMN;
        xmlhttp.send(queryString);
		alert(queryString);
		//xmlhttp.send("SID=" + vSID + "&BirthYear=" + vBD + "&MobileNo=" + vMN);
		//xmlhttp.send("SID=1067696912" + "&BirthYear=1406" + "&MobileNo=0500317814");
		alert("2");
        parser = new DOMParser();
        var xmlDoc = parser.parseFromString(xmlhttp.responseText, "text/xml");
        var VI_FromWS = new TAccNo_ResultClassJS();
		alert("3");
        //VI_FromWS.Error_desc = GetValueFromXMLDoc(xmlDoc, "Error_desc");
        //VI_FromWS.AccNo = GetValueFromXMLDoc(xmlDoc, "AccNo");
		
		alert(VI_FromWS.Error_desc);
		alert(VI_FromWS.AccNo);

        return VI_FromWS;

    } // end function

	

	
	function Exit()
	{
		navigator.app.exitApp();
	}



    function GetAccountNo() {	
		//var	timer = setTimeout(show, 0);
		//var	timer = setTimeout(GetAccountNo2, 1);
    }
	
	function Freeing()
	{
		$('#ACC_NO').val('');
		$('#ID').val('');
		$('#OTP').val('');
		$('#BirthYearTXT').val('');
		$('#MobileNoTXT').val('');
		$('#accno').val('');
		$('#ticket_txt').val('');
		
		//document.getElementById('ACC_NO').value = "";		
		//document.getElementById('ID').value = "";
		//document.getElementById('OTP').value = "";				
		//document.getElementById('BirthYearTXT').value = "";
		//document.getElementById('MobileNoTXT').value = "";		
		//document.getElementById('accno').value = "";
		
		//document.getElementById('SID').value = sid;
		$('#SID').val(sid);
		//document.getElementById('sidx').value = sid;
		$('#sidx').val(sid);		
		//document.getElementById('SIDTXT').value = sid;
		$('#SIDTXT').val(sid);
		$('#ACC_NO').val(ids);
		$('#accno').val(ids);		
		
		
		//document.getElementById('SID').value = sid;
		//document.getElementById('sidx').value = sid;				
		//document.getElementById('SIDTXT').value = sid;		
			
		
		document.getElementById('acc_no').innerHTML = "";
		document.getElementById('resx0').innerHTML = "";
		document.getElementById('resx1').innerHTML = "";
		document.getElementById('resx2').innerHTML = "";
		document.getElementById('resx3').innerHTML = "";			
		document.getElementById('ticket_no').innerHTML = "";	
		$("input[type='radio']").attr("checked", false).checkboxradio("refresh");	
		//radio = $('input[type=radio]:checked').val();		
	}
	
			function checkSize(max_img_size)
		{
		    var input = document.getElementById("file");
		    // check for browser support (may need to be modified)
		    if(input.files && input.files.length == 1)
		    {           
		        if (input.files[0].size > max_img_size) 
		        {
		            alert("The file must be less than " + (max_img_size/1024/1024) + "MB");
		            return false;
		        }
		    }
		
		    return true;
		}
	
	function GetAccountNo2() {					
	
        var SID = $("#SIDTXT").val();
        var BirthYear = $('#selectmenu1').val();
		var MobileNo = $("#MobileNoTXT").val();		
		
		var text0 = document.getElementById('SIDTXT').value;//get value from textbox
		//var text1 = document.getElementById('BirthYearTXT').value;//get value from textbox
		var text2 = document.getElementById('MobileNoTXT').value;//get value from textbox			
		
		var regex0 = /^\d{10}$/;//only allow letters (minimum of 1). No whitespace, no symbols, no numbers
		var regex1 = /^\d{4}$/;//only allow letters (minimum of 1). No whitespace, no symbols, no numbers
		var regex2 = /^\d{10}$/;//only allow letters (minimum of 1). No whitespace, no symbols, no numbers

		if(regex0.test(text0) && regex2.test(text2)){			
		
		   //var url = ServerPath + "QiyasIntegrationService.asmx/GetAccountNo";
		var url = "http://87.101.176.65/NEWWS/JSONP-EndPoint.asmx/GetAccountNo";
		//var url = "http://87.101.230.11/QiyiasWebServices/QiyasIntegrationService.asmx/GetAccountNo";
		//var url = "http://87.101.230.11/QiyiasWebServices/QiyasIntegrationService.asmx/AuthenticateAccNo_SID";
        //var acc_no = GetSingleValueFromWS(url, "SID=" + SID + "&BirthYear=" + BirthYear + "&MobileNo=" + MobileNo);		
		try{						
			navigator.notification.activityStart();						
			var acc_no = GetSingleValueFromWS(url, "SID=" + SID + "&BirthYear=" + BirthYear + "&MobileNo=" + MobileNo);
			navigator.notification.activityStop();	
			//document.getElementById('lbl3').innerHTML = "";
			if(acc_no == null || acc_no == "" || acc_no == 0)
			{		
				document.getElementById("acc_no").innerHTML = "خطأ في البيانات المرسلة";
			}
			else
			{
				document.getElementById("acc_no").innerHTML = acc_no;
			} 
		}
		catch(ex)
		{
			document.getElementById("acc_no").innerHTML = "خطأ غير متوقع" + ". رسالة الخطأ: " + ex;
		}
		}

		else		
		{
			alert("يرجى التأكد من أدخال البيانات بشكل صحيح");
		}
    }  
	
	function showPopup(text){
    $.mobile.loading( 'show', {
        text: text,
        textVisible: true,
        textonly: true,
        theme: 'e',
    });
    //window.setTimeout(function(){
        //$.mobile.loading('hide');
    //}, 5000);
}

		function hidePopup()
		{
			$.mobile.loading('hide');
		}

	function GetAccountResult() {
					
		
		var radio;
        var acc_no = $("#ACC_NO").val();
        var sidx = $("#SID").val();			
		
		
		//var checkedValue = $('#checkboxes1').val();
		
		if(sidx != sid)
		{
			alert("رقم الهوية المدخل غير مطابق لرقم الهوية المستخدم في عملية تسجيل الدخول");
			return 0;
		}
		
		//$(".radioClass").each(function() {
        //if($(this).is(':checked'))
		//radio = $(this).val();
		//});
		
		//alert($('input[type=radio]:checked').val());
		
		//alert(radio);
		
		var text0 = document.getElementById('ACC_NO').value;//get value from textbox
		var text1 = document.getElementById('SID').value;//get value from textbox
		
		var regex0 = /^\d{10}$/;//only allow letters (minimum of 1). No whitespace, no symbols, no numbers
		var regex1 = /^\d{10}$/;//only allow letters (minimum of 1). No whitespace, no symbols, no numbers

		if(regex0.test(text0) && regex1.test(text1)){

		radio = $('#selectmenu2').val();

		if(radio == "" || radio == null || radio == 0)
		{
			alert("يرجى أختيار نوع الأختبار");
			return 0;
		}
		
		var url0 = "http://87.101.176.65/NEWWS/JSONP-EndPoint.asmx/GetLastResult";
		var url1 = "http://87.101.176.65/NEWWS/JSONP-EndPoint.asmx/GetLastResultEName";
		var url2 = "http://87.101.176.65/NEWWS/JSONP-EndPoint.asmx/GetMAXResult";
		var url3 = "http://87.101.176.65/NEWWS/JSONP-EndPoint.asmx/GetMAXResultEName";
		
		try{	
			//showWait();
			//alert("1");
			//showPopup("ستظهر لك النتيجة في الجدول السفلي بعد لحظات. يرجى الأنتظار");
			//$.blockUI({ message: '<h1><img src="busy.gif" /> Just a moment...</h1>' });			
		
			navigator.notification.activityStart();
			// Do something that might take a while...			
			var res0 = GetSingleValueFromWS(url0, "AccNo=" + acc_no + "&SID=" + sidx + "&Exam_Group_ID=" + radio);
			var res1 = GetSingleValueFromWS(url1, "AccNo=" + acc_no + "&SID=" + sidx + "&Exam_Group_ID=" + radio);
			var res2 = GetSingleValueFromWS(url2, "AccNo=" + acc_no + "&SID=" + sidx + "&Exam_Group_ID=" + radio);
			var res3 = GetSingleValueFromWS(url3, "AccNo=" + acc_no + "&SID=" + sidx + "&Exam_Group_ID=" + radio);			
			navigator.notification.activityStop();
			//hidePopup();
			//hideWait();
			//$.unblockUI();
			if(res0 == null || res0 == "" || res0 == 0 || res1 == null || res1 == "" || res1 == 0 || res2 == null || res2 == "" || res2 == 0 || res3 == null || res3 == "" || res3 == 0)
			{		
				document.getElementById("resx0").innerHTML = "خطأ في البيانات المرسلة";
				document.getElementById("resx1").innerHTML = "";
				document.getElementById("resx2").innerHTML = "";
				document.getElementById("resx3").innerHTML = "";
			}
			else
			{
				document.getElementById("resx0").innerHTML = res0;
				document.getElementById("resx1").innerHTML = res1;
				document.getElementById("resx2").innerHTML = res2;
				document.getElementById("resx3").innerHTML = res3;
			} 
		}
		catch(ex)
		{
			document.getElementById("resx0").innerHTML = "خطأ غير متوقع" + ". رسالة الخطأ: " + ex;
			document.getElementById("resx1").innerHTML = "";
			document.getElementById("resx2").innerHTML = "";
			document.getElementById("resx3").innerHTML = "";
		}
		}

		else		
		{
			alert("يرجى التأكد من أدخال البيانات بشكل صحيح");
		}
    }    	
