
    /**
     * @api {json} /user/detal 测试json
     * @apiDescription  表单填写，提交时转换成json
     * @apiName detal
     * @apiGroup user
     * @apiVersion 1.0.0
     * 
     * @apiParam {String}  id  主键
     * @apiParam {String} name  名字
     */
  
    /**
     * @api {json2} /user/get 测试json2（提交时自动转换成json）
     * @apiDescription  表单填写，提交时转换成json
     * @apiName userGet
     * @apiGroup user
     * @apiVersion 1.0.0
     * 
     * @apiParam {String}  id  主键
     * @apiParam {String} name  名字
     */
  
  
  
    /**
     * @api {json2} /user/get 测试json2
     * @apiDescription  表单填写，提交时转换成json
     * @apiName userGet
     * @apiGroup user
     * @apiVersion 1.0.1
     * 
     * @apiParam {String} [id=1]  主键
     * @apiSuccess (success) {String}  code     响应码
     */





  /**
     * @apiDefine auth_a_succ_msg 全局配置auth鉴权请求头和成功响应信息
     * 
     * @apiHeader  {String}  Authorization 鉴权信息
     * @apiSuccess (success) {String}  code     响应码
     * @apiSuccess (success) {String}  msg      响应信息
     * @apiSuccess (success) {String}  data      数据
     */
     
    /**
     * @apiDefine ATTEND_EMPTY_ID
     * @apiError 5001 规则不能为空
     */
     

    /**
     * @api {post} /test/t1 测试1
     * @apiDescription  测试post接口
     * @apiName t1
     * @apiGroup test
     * @apiVersion 1.0.0
     * 
     * @apiParam {String}  id  主键
     * @apiParam {String} name   名字
     * @apiUse auth_a_succ_msg
     * @apiSuccess (success) {String}  data.addr  地址
     * @apiSuccess (success) {PaymentInf}   data.paymentInf   <a href="#api-common-PaymentInf">下单支付信息</a>
     * @apiError 2001 Authorization不能为空
     * @apiUse ATTEND_EMPTY_ID
     * @apiError (err) 2002 Authorization错误
     * 
     * @apiParamExample {json} 请求样例：
     *                ?account=sodlinken&password=11223344&mobile=13739554137&vip=0&recommend=
     * @apiSuccessExample {json} 返回样例:
     *                {"code":"0","msg":"注册成功"}
     * @apiErrorExample 错误响应例子:
     *     {
     *       "code": 2001,
     *       "msg": "必选参数不能为空"
     *     }
     */

  
========================================================== 自定义
   


/**
 * @api . PaymentInf
 * @apiName PaymentInf
 * @apiDescription  PaymentInf
 * @apiVersion 1.0.0
 * @apiGroup common
 * 
 * @apiParam {String}   id  支付信息id
 * @apiParam {String}   charge  金额
 * @apiParam {User}   user  用户
 * @apiParam {String}   user.name  用户名
 * @apiParam {String}   user.pwd  密码
*/


    /**
     * @api . 返回码
     * @apiName common error code
     * @apiVersion 1.0.0
     * @apiGroup common
     * @apiUse error_msg
     *
     */
    /**
     * @apiDefine error_msg 失败响应信息
     * @apiError (err) 1000 成功
     * @apiError (common_err) -1000 失败
     * @apiError (common_err) 200 TOKEN失效
     * @apiError (common_err) 201 TOKEN无效
     * @apiError (common_err) 300 参数异常
     * @apiError (common_err) 400 系统异常
     */