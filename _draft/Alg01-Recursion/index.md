---
emoji: 🙄
title: (알고리즘 JS) Recursion
date: '2022-02-14 00:00:00'
author: choieastsea
tags: 자료구조 알고리즘 data-structure algorithm recursion
categories: Algorithms

---

# Recursion(재귀), 재귀적으로 문제 해결하기

자기 자신을 호출하는 함수. 

자바스크립트에서는 A함수 안에서 B함수가 실행이 되면 콜스택(call stack)이라는 곳에 A위에 B가 쌓이게 되며 B가 실행이 된다. B가 종료되면 stack에서 pop되며 스택의 top은 A를 가리키게 되며 A의 나머지가 실행될 것이다.

크롬 개발자 환경에서 다음을 테스트해보자...

https://www.youtube.com/watch?v=QtOF0uMBy7k

콜 스택이 너무 많이 차게 되면 스택이 정해진 양을 넘치게 되는 `stack overflow`에러가 발생할 수 있으므로, `recursion`은 무한 재귀에 빠지지 않도록 설계되어야 한다. 

## 재귀함수의 해석/ 증명

수학적 귀납법을 이용하여 증명할 수 있다.

1. n=0/1 등의 base case에서 해당 함수가 잘 동작함을 보인다.
2. n=k 까지 재귀가 잘 동작한다고 가정한다.
3. n= k가 True임을 기반으로 n=k+1도 True임을 보인다. 따라서 n이 무엇이든지 항상 성립한다!

ex 1) 팩토리얼

ex 2) 피보나치 수열

## 재귀함수 구조

재귀 함수는 보통 다음과 같은 구조를 갖고 있어야 한다.

1. 재귀에서 탈출하게 되는 base case (n=0)존재
2. 모든 경우의 재귀가 결국 base case로 수렴하도록 함

## 재귀함수 설계

- 모든 경우에서 무한루프로 빠지지 않도록 base case를 나눠야 한다.

- 귀납적으로 생각할때, k번째가 된다고 가정하고 진행한다.

- 암묵적인 변수의 경우, 명시적인 변수를 사용하도록 하자.

  ex 1) 순차 검색

  n size 배열에서 특정 원소의 위치를 찾아보자.

  ex 2) 최댓값 찾기 



## 재귀 예시1) 미로 찾기

[백준 2178번](https://www.acmicpc.net/problem/2178)에 있는 미로 찾기 문제를 보자.

## 재귀 예시2) 지뢰 찾기



