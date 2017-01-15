(function() {
	
	"use strict"
	var companyId,companyName;
	var headerCss = document.getElementsByTagName('script'),
		path, cssPath, headTitle = "";
	var temp;

	if (location.host == 'localhost:3000') {
		temp = 'cloudwiz/src/';
	} else {
		temp = '';
	}

	for(var i = 0; i < headerCss.length; i++){
	    cssPath = headerCss[i].getAttribute('data-css');
		headTitle = headerCss[i].getAttribute('data-title');
		if(cssPath != null && cssPath != undefined){

			//css路径
			cssPath = '<link rel="stylesheet" href="/css/page/' + cssPath + '.css"/>'
			break;	
		}

	}
	var html = '<!DOCTYPE html>'+
				'<html lang="en">'+
				'<head>'+
					'<meta charset="UTF-8">'+
					'<meta name="viewPort" content="width=device-width, initial-scale=1.0">'+
					'<title>'+headTitle+'</title>'+
					'<link rel="stylesheet" href="/css/common/header.css"/>'
					+cssPath+
					'<script>'+	
						'var MIS = {};'+
						'MIS.STATIC_ROOT = "/js"'+
					'</script>'+
					// '<script src="'+temp+'/js/lib/jquery.js"></script>'+
				'</head>'+
				'<body>';
				
    var headerTpl = function() {

		/*
			<div class="common-header" id="top">
				<nav>
					<ul>
						<li><a class="navs" href="index.html">首页</a></li>
						<li><a class="navs" href="demands.html">需求大厅</a></li>
					</ul>
				</nav>
			</div>
		*/
	};

	var  header = html +'<div class="wrapper">'+ headerTpl.toString().replace(/^[^\/]+\/\*!?/, '').replace(/\*\/[^\/]+$/, '');
	document.write(header);

})();