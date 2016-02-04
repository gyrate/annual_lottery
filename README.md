#年会抽奖手机刮刮乐

##游戏介绍

用户登录页面，系统为用户随机选择9张刮奖券，用户选择一张刮奖，刮奖结果保存。刮奖后可查看其它用户的抽奖结果。


##接口说明

  

1. 登录请求

    http://localhost:3000/canudiloAu/login.ca?type=login&username=123&department=技术部&password=123&mobile=123
  [success]
      {"result":true,"error":"","data":{"mobile":"123","username":"123","department":"","password":"******","awardtime":"","awardrank":0,"loginstatus":0}}

    http://localhost:3000/canudiloAu/login.ca?type=login&username=123&department=%E6%8A%80%E6%9C%AF%E9%83%A8&password=123&mobile=123
  [failed]
      {"result":false,"error":"","data":{}}


2. 开始刮奖 (随机查询9个ID)

    http://localhost:3000/canudiloAu/award.ca?type=getradata&mobile=123
  [success]
      {"result":true,"error":"","data":["sdfwe","xcve","xcve","eews","xcve","dfesc","xccve","xvew","fesfd"]}

    http://localhost:3000/canudiloAu/award.ca?type=getradata&mobile=1234
  [failed]
      {"result":false,"error":"","data":[]}


3. 开始刮奖 (查询指定ID的奖项)

    http://localhost:3000/canudiloAu/award.ca?type=getadata&mobile=123&id=xcve
  [success]
      {"result":true,"error":"","data":{"id":"2F3FACA6A454222EB3811585B67B64BF","performance":"portal","version":"20160113","level":1,"desc":"一等奖，佳能单反相机", "status":0}}

    http://localhost:3000/canudiloAu/award.ca?type=getadata&mobile=123&id=xcveee
  [failed]
      {"result":false,"error":"","data":{}}


4. 开始刮奖 (刮出奖)

    http://localhost:3000/canudiloAu/award.ca?type=awrad&mobile=123&id=xcve
  [success]
      {"result":true,"error":"","data":{"mobile":"123","username":"123","department":"","password":"******","awardtime":"20160120 13:53:21","awardrank":2,"loginstatus":1}}

    http://localhost:3000/canudiloAu/award.ca?type=awrad&mobile=123&id=xcveee
  [failed]
      {"result":false,"error":"","data":{}}



5. 查询已刮的奖项

    http://localhost:3000/canudiloAu/search.ca?type=getallawrad
  [success]
      {"result":true,"error":"","data":[{"username":"123","awardtime":"20160120 13:53:21","awardrank":2},...]}

    http://localhost:3000/canudiloAu/search.ca?type=getallawrad
  [failed]
      {"result":false,"error":"","data":[]}




