---
emoji: 🙄
title: (Django) 장고 api 서버를 이용한 프로젝트 [0-시작]
date: '2022-04-11 00:00:00'
author: choieastsea
tags: BE Django React Project
categories: BE

---

## 계기

방학동안 서비스를 운영하기 위해 api 서버로 장고를 사용하였다.

우리 서비스에서 장고를 사용한 가장 큰 이유는, 비스니스 로직에서 필요한 라이브러리가 파이썬에서만 사용가능했기 때문이다. 물론, 해당 역할을 별개의 서버로 분리하는 방법도 가능하지만, 장고는 복잡한 설정 없이 **admin page**를 구현할 수 있으므로 시간 단축에도 용이할 것 같아 선택하였다.

풀스택으로 단기간에 완성해야 하는 입장이였으므로 정리를 할 필요를 느껴, 장고를 다시 복기해보려고 한다. 또한, 장고에서 REST 서버를 위한 많은 클래스와 기능이 제공되는 DRF를 도입하여 많은 것들을 개선해보도록 하자.

## 간략한 소개

이 프로젝트에서는 간단한 **회원제 쇼핑몰 페이지**를 만들어보며 장고에 대하여 정리해보고자 한다.

서버는 api server로, `django`를 이용하여 구축할 예정이고, 프론트엔드는 `React js`로 간단하게 만들어볼 예정이다.!

- 서버 코드 링크 : https://github.com/choieastsea/market-guri-django
- 프론트 코드 링크 : https://github.com/choieastsea/market-guri-react

각각 포스트별로 커밋을 해놨으니, 커밋을 따라오는 것도 도움이 될 것이다.

## 전제

- 파이썬 코드를 읽을 줄 안다. 
- 서버의 역할을 대략 알고 있다. 
- front end와 back end 서버 사이에서 rest api를 이용해본 적이 있다.
- postman 등의 api플랫폼을 사용해 본 경험이 있다.

## 개발 환경

- Django 4.X
- DRF 3.X
- Python 3.10.X
- node v19.X

## 계획

- (1) 설계 및 기획 : 정기 구독이 가능한 쇼핑몰 웹서비스 '마켓 구리' -> db 설계 & api 설계
- (2) Django란
- (3) Django model
- (4) DB (migration)
- (5) Serializer / Django ORM 사용법 (queryset)
- (6) DRF CBV
- (7) 전체적인 구조 복습. 브라우저와의 연결
- (8) user / custom user -> login, signup
- (9) CSRF
- (10) session (Authentication) + CBV에 적용
- (11) custom permission + CBV에 적용
- (12) item model 고도화
- (13) admin 기본
- (14) 배포를 위한 설정 (settings, collectstatic, https)
- (15) admin to S3 (collectstatic)
- (16) ckeditor in admin

프론트는 기능별(서버에 의존적인)로 커밋을 남겨놓아 이후 다른 서버 프레임워크에서도 적용하기 쉽도록 구현해보고자 한다.

4월안에 정리해보는 것을 목표로 열심히 해보자. (공부하는 단계이므로 틀린 내용이 있을 수 있음)