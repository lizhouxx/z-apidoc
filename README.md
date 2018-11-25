定制：cache setting
    1.增加输入参数是json类型的  @api {json} ..  @api {json2} ..
    2.缓存
    3.关联





我用的是windows，linux下也可以
1.安装 node.js
2.安装apidoc
  CMD> npm install apidoc -g
  
  
3.项目目录或子目录下java文件中有如下注释

     
    /**
     * @api {post} /testMe 测试接口
     * @apiDescription  测试一下
     * @apiName testMe
     * @apiGroup test
     * @apiVersion 1.0.0
     * 
     * @apiParam {String} name   名字
     */


4.项目根目录中加apidoc.json文件：
  
{
  "name": "yyb_parks",
  "version": "1.0.0",
  "description": "yyb_parks interface",
  "title": "yyb_parks interface",
  "url" : "http://116.62.190.147:8888",
  "sampleUrl" : "http://116.62.190.147:8888",
  "order":[ 
      "auth",
      "member",
      "test"
]
}
  
5. 命令行执行命令：CMD>  apidoc -i 项目目录 -o 生成目录 [-t 模板]
