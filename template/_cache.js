function initMyBox()
{
	
  if(localStorage.apidoc_myBox_flag && localStorage.apidoc_myBox_flag==1)
  {
    $('#myBox').css({position:'fixed',top:'20px',right:'100px','z-index':'1000',display:'block'})
  }
	      
  initDofillBox();
  initSampleUrlBox();
  
  //菜单初始时也定位
  hashGroup(location.hash)
  
}
function hashGroup(hash)
{

	  var sub=$('.nav-list-item[href="'+hash+'"]');
	  if(sub.size()==0) sub=$('.nav-list-item.nav-header [href="'+hash+'"]');
	  var nav=$('.sidenav.nav.nav-list.list')
	  nav.scrollTop(nav.scrollTop() + sub.offset().top - nav.offset().top);
}

function initSampleUrlBox()
{
	var flag=localStorage.apidoc_urlFag?localStorage.apidoc_urlFag:'sampleUrl'
	var s='<br>'
	for(i in myProject)
  {
  	 if(i.indexOf('sampleUrl')==0)
  	 {
  	 	//console.log('--',myProject[i])
       s+='<br><div class="box box-'+i+'" title="'+myProject[i]+'"><input type="radio" '+(i==flag?'checked="true"':"")+' value="'+myProject[i]+'" id="'+i+'" name="sampleUrl"><label for="'+i+'"><span></span></label><label for="'+i+'"></label></div>';
  
    	}///sampleUrl
  }
  $('#myBox').append(s);
  
  
	$("[name=sampleUrl]").click(function(){
		var flag=localStorage.apidoc_urlFag?localStorage.apidoc_urlFag:'sampleUrl'

		var old_ = $('#'+flag).val();
		var new_=$(this).val()
		flag=$(this).attr('id')
		$('.sample-request-url').each(function(){
			var first_url=$('#sampleUrl').val()
			var url=$(this).val()
			url=url.replace(first_url,new_)
			url=url.replace(old_,new_)
			$(this).val(url)
			localStorage.apidoc_urlFag=flag
			initInput()
		})
	});
	$("[name=sampleUrl]:checked").trigger('click')
  
}
function initDofillBox()
{
		    var do_fill=localStorage.apidoc_do_fill;
	      if(do_fill && do_fill==1)
	      {
	      	$('.box-do_fill input').attr('checked',true)
	      }
	      $('.box-do_fill input').change(function(){
	      	 if($(this).is(':checked')) {
	      	 	   localStorage.apidoc_do_fill=1
	      	 }
	      	 else
	      	 	{
	      	 	   localStorage.apidoc_do_fill=0
	      	 	}
	      })
	      

  //输入时同名参数同步填值
	$("[data-sample-request-param-name],[data-sample-request-header-name]").keyup(function(){
		
		    var do_fill=localStorage.apidoc_do_fill;
	      if(!do_fill || do_fill==0) return;
    	  
    	  var name=$(this).attr('data-sample-request-param-name');
    	  if(!name)name=$(this).attr('data-sample-request-header-name');
    	  
    	  if(name=='JSON__STR') return;
    	  
    	  $in_=$("[data-sample-request-param-name='"+name+"'],[data-sample-request-header-name='"+name+"']");

    	  if(do_fill==1)
    	  {
    	  	$in_.val(this.value)
    	  }
    	  else if(do_fill==2)
    	  {
    	  	$in_.each(function()
    	  	{
    	  		if($(this).val()=='')
    	  		  $(this).val(this.value)
    	  	});
    	  }
	})
	
	
	$("[data-sample-request-param-name],[data-sample-request-header-name]").change(function(){
		$(this).trigger('keyup')
	});
}

//发送请求时按输入框id缓存
//p：选择单个接口（article元素）
function cacheInput(p) {
    var info={};
    $(p+" [data-sample-request-param-name],[data-sample-request-header-name]").each(function()
    {
    	  if(this.id && this.id!='' && this.value!='')
    	  {
    	  	if(this.tagName=='INPUT')
    	  	{
            if(this.type=='text'){
                info[this.id]={"type":"text","value":this.value}
            }
    	  	}
    	  	else if(this.tagName=='TEXTAREA')
    	    {
            info[this.id]={"type":"textarea","value":this.value}
    	    }
    	  }
    })
    
    inputCacheEle(p,info)
}


function inputCacheEle(p,info)
{
	var j=inputCacheJson()

	if(j)
	{
    j[p]=info;
    inputCacheJson(j)
	}
	else
	{
			return j[p];
	}
}

function inputCacheStr(val)
{
  var urlFag=localStorage.apidoc_urlFag?localStorage.apidoc_urlFag:'sampleUrl'

	if(val)
	{
    	localStorage['apidoc_'+urlFag]=val
  }
  else
  {
  	return localStorage['apidoc_'+urlFag];
  }
}
function inputCacheJson(val)
{
  var urlFag=localStorage.apidoc_urlFag?localStorage.apidoc_urlFag:'sampleUrl'

	if(val)
	{
			var j=val?JSON.stringify(val):val;
    	localStorage['apidoc_'+urlFag]=j
	}
	else
	{
		//兼容
    if(localStorage.apidoc_history && !localStorage.apidoc_sampleUrl)
    {
    	localStorage['apidoc_'+urlFag]=localStorage.apidoc_history;
    }
    console.log(localStorage['apidoc_'+urlFag])
    var j = localStorage['apidoc_'+urlFag]?localStorage['apidoc_'+urlFag]:'{}'
	  return JSON.parse(j)

	}
}
//刷新页面按默认值和缓存 初始化

function initInput()
{
	 $("[data-sample-request-param-name],[data-sample-request-header-name]").val('')
    var j=inputCacheJson();
    var default_=localStorage.apidoc_default?JSON.parse(localStorage.apidoc_default):{};

    for(p in j){
    	  var info=j[p]
    	  for(id in info)
    	  {
    	  	var $in_=$(p+' #'+id)
    	  	var type=info[id].type
    	  	var value=info[id].value
    	  	
    	  	if(type=='text')
    	  	{
    	  		$in_.val(value)
    	  	}
    	  	/*
    	  	else if(type=='radio')
    	  	{
    	  			$in_.attr('checked','checked')
    	    }
    	  	else if(type=='checkbox')
    	  	{
    	  			$in_.attr('checked','checked')
    	    }
    	    */
    	  	else if(type=='textarea')
    	  	{
    	  			$in_.val(value)
    	    }
    	    
    	  }
    }
    
    for(name in default_)
    {
        setByRequestName(name,default_[name])
    }
  
}
function setByRequestName(name,value)
{
    	  $in_=$("[data-sample-request-param-name='"+name+"'],[data-sample-request-header-name='"+name+"']");
    
    	  if(value)
    	  {
    	  	$in_.each(function(){
    	  		if($(this).val()=='')$(this).val(value)
    	  	});
    	  }
}
	function isJson(v) {
    if (typeof v == 'string') {
        try {
            var obj=JSON.parse(v);
            if(typeof obj == 'object' && obj ){
                return true;
            }else{
                return false;
            }
        } catch(e) {
            return false;
        }
    }
    else if(typeof v == 'number')
    {
    	return false
    }
    else if(typeof v == 'object')
    {
    	return true
    }
}
	