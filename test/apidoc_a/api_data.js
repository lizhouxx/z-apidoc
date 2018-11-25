define({ "api": [
  {
    "type": "",
    "url": ".",
    "title": "PaymentInf",
    "name": "PaymentInf",
    "description": "<p>PaymentInf</p>",
    "version": "1.0.0",
    "group": "common",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>支付信息id</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "charge",
            "description": "<p>金额</p>"
          },
          {
            "group": "Parameter",
            "type": "User",
            "optional": false,
            "field": "user",
            "description": "<p>用户</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user.name",
            "description": "<p>用户名</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user.pwd",
            "description": "<p>密码</p>"
          }
        ]
      }
    },
    "filename": "a/t.java",
    "groupTitle": "common",
    "sampleRequest": [
      {
        "url": "http://localhost:8880."
      }
    ]
  },
  {
    "type": "",
    "url": ".",
    "title": "返回码",
    "name": "common_error_code",
    "version": "1.0.0",
    "group": "common",
    "filename": "a/t.java",
    "groupTitle": "common",
    "sampleRequest": [
      {
        "url": "http://localhost:8880."
      }
    ],
    "error": {
      "fields": {
        "err": [
          {
            "group": "err",
            "optional": false,
            "field": "1000",
            "description": "<p>成功</p>"
          }
        ],
        "common_err": [
          {
            "group": "common_err",
            "optional": false,
            "field": "-1000",
            "description": "<p>失败</p>"
          },
          {
            "group": "common_err",
            "optional": false,
            "field": "200",
            "description": "<p>TOKEN失效</p>"
          },
          {
            "group": "common_err",
            "optional": false,
            "field": "201",
            "description": "<p>TOKEN无效</p>"
          },
          {
            "group": "common_err",
            "optional": false,
            "field": "300",
            "description": "<p>参数异常</p>"
          },
          {
            "group": "common_err",
            "optional": false,
            "field": "400",
            "description": "<p>系统异常</p>"
          }
        ]
      }
    }
  },
  {
    "type": "post",
    "url": "/test/t1",
    "title": "测试1",
    "description": "<p>测试post接口</p>",
    "name": "t1",
    "group": "test",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>主键</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>名字</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "请求样例：",
          "content": "?account=sodlinken&password=11223344&mobile=13739554137&vip=0&recommend=",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "success": [
          {
            "group": "success",
            "type": "String",
            "optional": false,
            "field": "data.addr",
            "description": "<p>地址</p>"
          },
          {
            "group": "success",
            "type": "PaymentInf",
            "optional": false,
            "field": "data.paymentInf",
            "description": "<p><a href=\"#api-common-PaymentInf\">下单支付信息</a></p>"
          },
          {
            "group": "success",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>响应码</p>"
          },
          {
            "group": "success",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>响应信息</p>"
          },
          {
            "group": "success",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>数据</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "返回样例:",
          "content": "{\"code\":\"0\",\"msg\":\"注册成功\"}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "2001",
            "description": "<p>Authorization不能为空</p>"
          },
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "5001",
            "description": "<p>规则不能为空</p>"
          }
        ],
        "err": [
          {
            "group": "err",
            "optional": false,
            "field": "2002",
            "description": "<p>Authorization错误</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "错误响应例子:",
          "content": "{\n  \"code\": 2001,\n  \"msg\": \"必选参数不能为空\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "a/t.java",
    "groupTitle": "test",
    "sampleRequest": [
      {
        "url": "http://localhost:8880/test/t1"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>鉴权信息</p>"
          }
        ]
      }
    }
  },
  {
    "type": "json",
    "url": "/user/detal",
    "title": "测试json",
    "description": "<p>表单填写，提交时转换成json</p>",
    "name": "detal",
    "group": "user",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>主键</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>名字</p>"
          }
        ]
      }
    },
    "filename": "a/t.java",
    "groupTitle": "user",
    "sampleRequest": [
      {
        "url": "http://localhost:8880/user/detal"
      }
    ]
  },
  {
    "type": "json2",
    "url": "/user/get",
    "title": "测试json2",
    "description": "<p>表单填写，提交时转换成json</p>",
    "name": "userGet",
    "group": "user",
    "version": "1.0.1",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "id",
            "defaultValue": "1",
            "description": "<p>主键</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "success": [
          {
            "group": "success",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>响应码</p>"
          }
        ]
      }
    },
    "filename": "a/t.java",
    "groupTitle": "user",
    "sampleRequest": [
      {
        "url": "http://localhost:8880/user/get"
      }
    ]
  },
  {
    "type": "json2",
    "url": "/user/get",
    "title": "测试json2（提交时自动转换成json）",
    "description": "<p>表单填写，提交时转换成json</p>",
    "name": "userGet",
    "group": "user",
    "version": "1.0.0",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>主键</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>名字</p>"
          }
        ]
      }
    },
    "filename": "a/t.java",
    "groupTitle": "user",
    "sampleRequest": [
      {
        "url": "http://localhost:8880/user/get"
      }
    ]
  }
] });
