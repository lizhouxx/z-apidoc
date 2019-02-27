function sort(arr) {
    var len = arr.length;
    var minIndex, temp;
    for(var i=0; i<len; i++) {
        //先给一个索引号，假设i为最小的数
        minIndex = i;
        //循环遍历，如果i之后有比索引i更小的数，则将索引变为j
        for(var j=i; j<len; j++) {
            if(arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }
        //将i索引的数和j索引的数互换
        temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
    return arr;
}
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