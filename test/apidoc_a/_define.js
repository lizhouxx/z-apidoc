function initDefine()
{
  //内容：去掉一些无用的元素
	$('#api-common .language-html').remove();
	$('#api-common h2').each(function()
	{
		if($(this).html()=='发送示例请求' || $(this).html()=='参数')
		{
			$(this).remove();
		}
	});
	$('#api-common .pull-left h1').each(function()
	{
		$(this).html($(this).html().replace('common - ',' - '))
		if($(this).html()=='common')
		{
			$(this).html('公共返回码');
		}
	});
	$('#api-common form').remove();
	$('#api-common .type').remove();

  //菜单
  $('.nav-list [data-group].nav-header').each(function()
	{
		if(true)return
		var group=$(this).attr('data-group');
	  $('.nav-list [data-group="'+group+'"].nav-header').click(function()
	  {
		  $(this).nextAll('[data-group="'+group+'"].is-new').toggle()
	  })
	});

}