---
emoji: 🚀
title: (ADsP) 1과목(데이터 이해) 1장. 데이터의 이해
date: '2022-01-26 00:00:00'
author: choieastsea
tags: ADsp, 데이터분석준전문가, 빅데이터, 통계
categories: ADsP
---

본 글은 본인이 '데이터 분석 준전문가' 필기 시험을 준비하면서 개인적으로 작성하는 글이라 일부 이해가 되지 않고 부정확할 수 있음을 밝힙니다. 모두 화이팅^^

## 데이터와 정보

### 데이터란

1. 정의

   객관적인 사실을 의미한다.(존재적 특성)

   정보의 근거로 쓰인다.(당위적 특성)

2. 유형

   - 정성적 데이터 vs 정량적 데이터 : 집합으로 표현가능한지x/o (명확한지x/o)
   - 정형 데이터, 비정형 데이터, 반정형 데이터
     - `structured data`(정형 데이터) : csv, 관계형 DB의 table → 틀O, 연산O
     - `semi-structured`(반정형) : json, XML, 센서 데이터 → 틀O, 연산X
     - `unstructured`(비정형) : img, video, 댓글... → 틀X, 연산X

### SECI model(암묵지와 형식지의 상호작용)

좌상단은 암묵지, 우하단은 형식지를 배치한다. 좌상단부터  SECI를 시계방향으로 작성해주면 완성

|      ↗ |         암묵지         |         암묵지          | ↘      |
| -----: | :--------------------: | :---------------------: | :----- |
| 암묵지 | Socialization(공통화)  | Externalization(표출화) | 형식지 |
| 암묵지 | Internaliztion(내면화) |   Combination(연결화)   | 형식지 |
|      ↖ |         형식지         |         형식지          | ↙      |

- 지식(knowlege)은 기록여부에 따라 암묵지와 형식지로 나뉜다.
- 암묵지(`Tacit knowledge`)란 체화된 지식을 의미한다. 예를 들어, 더 높이에서 떨어질수록 아프다는 걸 체득한 것은 암묵지이다.
- 형식지(`Explicit knowledge`)란 형상화된 지식을 의미한다. 예를 들어, 중력가속도가 초당 9.8m정도가 된다는 것은 형식지이다.
- 암묵지(또는 형식지)에서 형식지(또는 암묵지)로 가는 4가지 상호작용에 대한 것이 `SECI model`이다. 지문을 잘 보고 해당하는 상호작용을 고를 수 있을 것이다.

### DIKW pyramid

data에서 wisdom으로 가는 **계층**을 표현한 피라미드

- Data : 의미가 없는 객관적인 사실
- Information : 의미(유용하지 않을 수도 있음)가 도출된 데이터
- Knowledge : 유의미한 정보를 분류하여 내재화(형식지→암묵지)한 것
- Wisdom : 지식의 축적과 아이디어가 결합된 창의적 산물(?ㅋㅋ)



## 데이터베이스

### DB 데이터의 특징 (ISSC모델)

- Integrated data : 데이터가 중복되지 않고 통합되어 있음
- Stored data : 컴퓨터가 접근할 수 있는 곳에 저장되어 있음
- Shared data : 서로 다른 목적의 사용자가 데이터를 공동으로 이용할 수 있음
- Changing data (Operational data) : CRUD 등을 통하여 최신의 정확한 데이터 상태를 유지함

### DB의 다양한 측면

- 정보의 축적 및 전달
- 정보 이용
- 정보 관리
- 정보기술발전
- 경제 산업

### 기업 내부의 DB(용어 암기!)

- 인하우스DB : 기업 내부의 DB, 이후 ERP(전사 자원 관리)로 확대됨
- OLTP(Online Transaction Processing) 시스템: 기업활동에서 영역별로 구축되던 **단순 자동화 중심의 시스템**, 각각의 거래에 초점. 생산·통합 자동화
- OLAP(Online Analytical Processing) 시스템 : 수집과 공유에서 탈피하여 **분석**이 중심이 되는 시스템, 각각의 데이터가 쌓인 전체 데이터에 초점
- OLTP → OLAP로 전환
- 2000년대 이후 기업의 DB는 CRM(Customer Relationship Management, 고객관계관리)과 SCM(Supply Chain Management,공급망관리)의 밀접한 관계로 변화함
- EAI(Enterprise Application Integration): 기업의 여러 서비스를 중앙에서 관리하여 각 서비스간 연결 루트를 간소화
- KMS(Knowledge Management System, 지식 경영 시스템): 문제해결을 위해 기업이 보유할 수 있는 모든 지식을 통합
- ERP(Enterprise Resource Planning, 경영 자원 통합 관리): 여러 자원 및 업무가 하나로 통합된 시스템으로 재구축하여 업무 효율성 상승
- BI(Business Intelligence): 기업의 의사결정 프로세스. 경영자가 올바른 의사결정을 내릴 수 있도록 기업의 데이터를 분석하는 것이 목적. 데이터를 정리하여 필요로 하는 정보를 정확한 시간에 제공할 수 있는 환경으로 보기도 함
- RTE(Real Time Enterprise); 기업의 정보를 실시간으로 통합 및 전달하여 신속한 대응하도록 함
- DW(Data Warehouse) : 분산된 환경에 흩어진 데이터를 **총체적인 관점**에서 공통의 형식으로 변환해 관리하는 역할
- DM(Data Mart) : DW로부터 추출된 작은 DB로 **특정 목표**를 달성하는데 필요한 데이터 제공하는 역할

### '사회 기반 구조'로서의 DB

| 부문      | 내용                                                         |
| --------- | ------------------------------------------------------------ |
| 물류 부문 | CALS(Commerce At Light Speed): 제품의 라이프사이클 전반에 관련된 데이터를 통합하고 공유·교환하는 경영통합정보시스템<br />PORT-MIS : 항만운영정보시스템<br />KROIS : 철도운영정보시스템 |
| 지리 부문 | GIS(Geographic Information System, 지리정보시스템)<br />LBS(Location-Based Service) : 위치정보서비스<br />SIM(Spatial Information Management) : 공간정보 관리시스템 |
| 교통 부문 | ITS(지능형 교통정보시스템)                                   |
| 의료 부문 | PACS(Picture Archiving and Communications System)<br />U-Health(Ubiquitous-Health) |
| 교육 부문 | NEIS(교육행정정보시스템)                                     |

### DB의 종류

계층형, 네트워크형, 관계형, NoSQL등이 있음. RDB와 NoSQL이 가장 많이 쓰임

| DB    | 설명                                                         | 예시                                                         |
| ----- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| RDB   | 행과 열로 이뤄진 테이블에 데이터 저장.<br />하나의 열은 하나의 속성을 나타내고 같은 속성의 값만 가질 수 있음<br />구조적으로 엑셀과 유사, 정형 데이터를 다루는데 특화 | Oracle,MySQL,MS-SQL,SQLite(open source), MariaDB,<br />Oracle, DB2·Infomix는 객체관계형DB로 오늘날 많은 RDB는 Object Oriented 지원 |
| NoSQL | Not only SQL, Non SQL, Non-relational. 비관계형을 의미<br />RDB의 SQL을 보완 및 개선한 비관계형 DB<br />비정형, 대용량 데이터 분석 및 분산처리에 용이 | - Document-Oriented : CouchDB, MongoDB...<br />- Key-value DB: Dynamo(Amazon), Redis, Riak...<br />- Column-oriented DB : Bigtable(Google), Cassandra ... |

+DBMS의 종류

- 계층형 DBMS : 부모자식 관계, 데이터 중복 문제가 발생하기 쉽다
- 네트워크형 DBMS : 그물 형태, 중복 문제는 없으나 구조 복잡
- 분산형 DBMS : 분산된 여러개를 하나의 DB로 인식
- 객체지향 DBMS : 복잡한 비정형 데이터라도 원하는 방식으로 표현가능

1과목은 많은 용어를 익히는데에 집중하도록 하자!

