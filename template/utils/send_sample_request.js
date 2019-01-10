define([
  'jquery',
  'lodash'
], function($, _) {

  var initDynamic = function() {
      // Button send
      $(".sample-request-send").off("click");
      $(".sample-request-send").on("click", function(e) {
          e.preventDefault();
          var $root = $(this).parents("article");
          var group = $root.data("group");
          var name = $root.data("name");
          var version = $root.data("version");
          sendSampleRequest(group, name, version, $(this).data("sample-request-type"));
      });

      // Button clear
      $(".sample-request-clear").off("click");
      $(".sample-request-clear").on("click", function(e) {
          e.preventDefault();
          var $root = $(this).parents("article");
          var group = $root.data("group");
          var name = $root.data("name");
          var version = $root.data("version");
          clearSampleRequest(group, name, version);
      });
      var cache_switch=localStorage.apidoc_cache_switch && localStorage.apidoc_cache_switch==1;
      if(cache_switch)
      {
      	
          initInput()
          initDefine()
          initMyBox()
      }
  }; // initDynamic

  function sendSampleRequest(group, name, version, type)
  {
  	  var p = 'article[data-group="' + group + '"][data-name="' + name + '"][data-version="' + version + '"]';
  	  cacheInput(p)

/* �İ汾��ʱ���ݣ�Ϊ�˼��ݣ��ݲ���
  	  var p = 'article[data-group="' + group + '"][data-name="' + name + '"]';
  	  cacheInput(p)
  	  p=p+'[data-version="' + version + '"]'
*/ 
      var $root = $(p);

      // Optional header
      var header = {};
      $root.find(".sample-request-header:checked").each(function(i, element) {
          var group = $(element).data("sample-request-header-group-id");
          $root.find("[data-sample-request-header-group=\"" + group + "\"]").each(function(i, element) {
            var key = $(element).data("sample-request-header-name");
            var value = element.value;
            if ( ! element.optional && element.defaultValue !== '') {
                value = element.defaultValue;
            }
            header[key] = value;
          });
      });


      // create JSON dictionary of parameters
      var param = {};
      var paramType = {};
      $root.find(".sample-request-param:checked").each(function(i, element) {
          var group = $(element).data("sample-request-param-group-id");
          $root.find("[data-sample-request-param-group=\"" + group + "\"]").not(function(){
            return $(this).val() == "" && $(this).is("[data-sample-request-param-optional='true']");
          }).each(function(i, element) {
            var key = $(element).data("sample-request-param-name");
            var value = element.value;
            if ( ! element.optional && element.defaultValue !== '') {
                value = element.defaultValue;
            }
            param[key] = value;
            paramType[key] = $(element).next().text();
          });
      });

      // grab user-inputted URL
      var url = $root.find(".sample-request-url").val();

      // Insert url parameter
      var pattern = pathToRegexp(url, null);
      var matches = pattern.exec(url);
      for (var i = 1; i < matches.length; i++) {
          var key = matches[i].substr(1);
          if (param[key] !== undefined) {
              url = url.replace(matches[i], encodeURIComponent(param[key]));

              // remove URL parameters from list
              delete param[key];
          }
      } // for

      $root.find(".sample-request-response").fadeTo(250, 1);
      $root.find(".sample-request-response-json").html("Loading...");
      refreshScrollSpy();

      _.each( param, function( val, key ) {
          var t = paramType[ key ].toLowerCase();
          if ( t === 'object' || t === 'array' ) {
              try {
                  param[ key ] = JSON.parse( val );
              } catch (e) {
              }
          }
      });

      // send AJAX request, catch success or error callback
      var ajaxRequest = {
          url        : url,
          headers    : header,
          data       : param,
          type       : type.toUpperCase(),
          success    : displaySuccess,
          error      : displayError
      };
      //add by lizhou st
      if(type.toUpperCase().indexOf("JSON")>=0)
      {
      	
        $.extend(ajaxRequest, {
      	  type:"POST",
      	  datType:"JSON",
      	  data:param.JSON__STR,
      	  contentType:"application/json"
        });
        $.extend(ajaxRequest.headers,{headers:{"Access-Control-Allow-Origin": "*"}});
        if(type.toUpperCase()=="JSON2")
        {
        	ajaxRequest.data=JSON.stringify(param)
        }
        else
        {
        	ajaxRequest.data=param.JSON__STR
        }
      }
      else if(type.toUpperCase()=="RSA")
      {
    	 var default_=localStorage.apidoc_default?JSON.parse(localStorage.apidoc_default):{};
    	 /* var encrypt = new JSEncrypt();
          encrypt.setPublicKey(default_['RSA_PublicKey_1']);
          var bizContent = encrypt.encrypt(JSON.stringify(ajaxRequest.data));*/
          
          var p = {content:JSON.stringify(ajaxRequest.data), publicKey:default_['RSA_PublicKey_1']}
            	              	  
          s=$.ajax({url:"http://localhost:8850/encode",data:p,async:false}).responseText;
            	  
          var rs = JSON.parse(s);
          if(rs.code!=0)
          {
            	alert(rs.msg);
          }
          else
          {
             bizContent = rs.data
          }
            	  
          ajaxRequest.data={
        		  bizContent: bizContent
          }
          ajaxRequest.type='POST';
      }

console.log("data:"+JSON.stringify(ajaxRequest.data))

      //add by lizhou ed 
      $.ajax(ajaxRequest);


      function displaySuccess(data, status, jqXHR) {
          var jsonResponse;
          try {
              jsonResponse = JSON.parse(jqXHR.responseText);
              if(jsonResponse && jsonResponse.bizContent && jsonResponse.bizContent!='')
              {
              	//RSA解密
            	  var default_=localStorage.apidoc_default?JSON.parse(localStorage.apidoc_default):{};
            	  
            	  var p = {bizContent:jsonResponse.bizContent, privateKey:default_['RSA_PrivateKey_2']}
            	              	  
            	  s=$.ajax({url:"http://localhost:8850/decode",data:p,async:false}).responseText;
            	  
            	  var rs = JSON.parse(s);
            	  if(rs.code!=0)
            	  {
            	  	alert(rs.msg);
            	  }
            	  else
            	  {
            	　  jsonResponse["bizContent解码"]=JSON.parse(rs.data);
            	  }

                /*  var encrypt = new JSEncrypt();
            	 　 encrypt.setPrivateKey(default_['RSA_PrivateKey_2']);
            	  var content=encrypt.decrypt(jsonResponse.bizContent);
            	  */
            	  
              }
              jsonResponse = JSON.stringify(jsonResponse, null, 4);
          } catch (e) {
              jsonResponse = data;
          }
          $root.find(".sample-request-response-json").html(jsonResponse);
          refreshScrollSpy();
      };

      function displayError(jqXHR, textStatus, error) {
          var message = "Error " + jqXHR.status + ": " + error;
          var jsonResponse;
          try {
              jsonResponse = JSON.parse(jqXHR.responseText);
              jsonResponse = JSON.stringify(jsonResponse, null, 4);
          } catch (e) {
              jsonResponse = escape(jqXHR.responseText);
          }

          if (jsonResponse)
              message += "<br>" + jsonResponse;

          // flicker on previous error to make clear that there is a new response
          if($root.find(".sample-request-response").is(":visible"))
              $root.find(".sample-request-response").fadeTo(1, 0.1);

          $root.find(".sample-request-response").fadeTo(250, 1);
          $root.find(".sample-request-response-json").html(message);
          refreshScrollSpy();
      };
  }

  function clearSampleRequest(group, name, version)
  {
      var $root = $('article[data-group="' + group + '"][data-name="' + name + '"][data-version="' + version + '"]');

      // hide sample response
      $root.find(".sample-request-response-json").html("");
      $root.find(".sample-request-response").hide();

      // reset value of parameters
      $root.find(".sample-request-param").each(function(i, element) {
          element.value = "";
      });

      // restore default URL
      var $urlElement = $root.find(".sample-request-url");
      $urlElement.val($urlElement.prop("defaultValue"));

      refreshScrollSpy();
  }

  function refreshScrollSpy()
  {
      $('[data-spy="scroll"]').each(function () {
          $(this).scrollspy("refresh");
      });
  }

  function escapeHtml(str) {
      var div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
  }

  /**
   * Exports.
   */
  return {
      initDynamic: initDynamic
  };

});
