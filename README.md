#���齱�ֻ��ι���

##��Ϸ����

�û���¼ҳ�棬ϵͳΪ�û����ѡ��9�Źν�ȯ���û�ѡ��һ�Źν����ν�������档�ν���ɲ鿴�����û��ĳ齱�����


##�ӿ�˵��

  

1. ��¼����

    http://localhost:3000/canudiloAu/login.ca?type=login&username=123&department=������&password=123&mobile=123
  [success]
      {"result":true,"error":"","data":{"mobile":"123","username":"123","department":"","password":"******","awardtime":"","awardrank":0,"loginstatus":0}}

    http://localhost:3000/canudiloAu/login.ca?type=login&username=123&department=%E6%8A%80%E6%9C%AF%E9%83%A8&password=123&mobile=123
  [failed]
      {"result":false,"error":"","data":{}}


2. ��ʼ�ν� (�����ѯ9��ID)

    http://localhost:3000/canudiloAu/award.ca?type=getradata&mobile=123
  [success]
      {"result":true,"error":"","data":["sdfwe","xcve","xcve","eews","xcve","dfesc","xccve","xvew","fesfd"]}

    http://localhost:3000/canudiloAu/award.ca?type=getradata&mobile=1234
  [failed]
      {"result":false,"error":"","data":[]}


3. ��ʼ�ν� (��ѯָ��ID�Ľ���)

    http://localhost:3000/canudiloAu/award.ca?type=getadata&mobile=123&id=xcve
  [success]
      {"result":true,"error":"","data":{"id":"2F3FACA6A454222EB3811585B67B64BF","performance":"portal","version":"20160113","level":1,"desc":"һ�Ƚ������ܵ������", "status":0}}

    http://localhost:3000/canudiloAu/award.ca?type=getadata&mobile=123&id=xcveee
  [failed]
      {"result":false,"error":"","data":{}}


4. ��ʼ�ν� (�γ���)

    http://localhost:3000/canudiloAu/award.ca?type=awrad&mobile=123&id=xcve
  [success]
      {"result":true,"error":"","data":{"mobile":"123","username":"123","department":"","password":"******","awardtime":"20160120 13:53:21","awardrank":2,"loginstatus":1}}

    http://localhost:3000/canudiloAu/award.ca?type=awrad&mobile=123&id=xcveee
  [failed]
      {"result":false,"error":"","data":{}}



5. ��ѯ�ѹεĽ���

    http://localhost:3000/canudiloAu/search.ca?type=getallawrad
  [success]
      {"result":true,"error":"","data":[{"username":"123","awardtime":"20160120 13:53:21","awardrank":2},...]}

    http://localhost:3000/canudiloAu/search.ca?type=getallawrad
  [failed]
      {"result":false,"error":"","data":[]}




