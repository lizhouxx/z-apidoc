���ƣ�
    1.�������������json���͵�  @api {json} ..  @api {json2} ..
    2.����
    3.����





���õ���windows��linux��Ҳ����
1.��װ node.js
2.��װapidoc
  CMD> npm install apidoc -g
  
  
3.��ĿĿ¼����Ŀ¼��java�ļ���������ע��

     
    /**
     * @api {post} /testMe ���Խӿ�
     * @apiDescription  ����һ��
     * @apiName testMe
     * @apiGroup test
     * @apiVersion 1.0.0
     * 
     * @apiParam {String} name   ����
     */


4.��Ŀ��Ŀ¼�м�apidoc.json�ļ���
  
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
  
5. ������ִ�����CMD>  apidoc -i ��ĿĿ¼ -o ����Ŀ¼ [-t ģ��]
