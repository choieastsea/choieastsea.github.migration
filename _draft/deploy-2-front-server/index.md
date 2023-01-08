---
emoji: 🚀
title: (배포) 웹서비스 배포하기 (2) 프론트 서버 개발
date: '2023-01-01 00:00:00'
author: choieastsea
tags: Web deploy frontend backend
categories: WEB

---

## 프론트엔드 서버 개발

저번 시간에 정한 구조를 기반으로 간단한 웹사이트를 개발하고 배포해보도록 하자.! 오늘은 그중에 프론트엔드 서버부터 만들어보자.

한 문장으로 정리하면 프론트엔드 서버는 `nginx`웹 서버가 url 요청에 대하여 build된 react file의 결과물(html, css, js)를 리턴하도록만 하면 된다. 웹서버의 프록시는 사용하지 않을 할 예정이다.







회원과 관련된 유닛 테스트를 진행하는 프로젝트
참고 : https://5xjin.github.io/blog/react_jwt_router/

https://velog.io/@auddwd19/DRF-Django%EA%B0%80-Password%EB%A5%BC-%EC%83%9D%EC%84%B1%ED%95%98%EB%8A%94-%EB%B0%A9%EB%B2%95

https://velog.io/@duo22088/DRF-JWT-%EC%9D%B8%EC%A6%9D

https://velog.io/@anrun/%EC%95%94%ED%98%B8%ED%99%94-bcrypt%EB%A1%9C-%EC%95%94%ED%98%B8%ED%99%94-%EC%8B%9C%EC%9E%91%ED%95%98%EA%B8%B0





서버 해야할 것

- 회원 가입시 db에 암호화된 pw로 저장
- 로그인 시, 토큰 발급
- 유효한 토큰이 있는 요청에 대하여만 db 접근 허용
- 토큰 refreshing

프론트 해야할 것

- 로그인 성공시 토큰을 쿠키(브라우저의 저장소, 쿠키 또는 웹 스토리지-로컬/세션스토리지 에다가 저장할 수 있음)에 저장
- 쿠키에다가 저장하는 이유는 서버에서 쿠키의 httponly 옵션을 주고 전달하면 브라우저에서 js를 통하여 쿠키 정보 접근 불가하다고 함
- api요청은 토큰을 실어서 보내기

