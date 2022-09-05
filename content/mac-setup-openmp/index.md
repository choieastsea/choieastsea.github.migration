---
emoji: 😉
title: m1 mac에서 병렬프로그래밍을 위해 openmp 설치하기
date: '2022-09-05 00:00:00'
author: choieastsea
tags: openmp mac m1 gcc g++ homebrew
categories: 블로그

---

병렬프로그래밍 수업을 위해 `openmp`를 mac os에 설치해야하는데, 헷갈려서 정리해놓는다. clang이 아닌 gcc로 실습환경을 구성하려고 한다.(mac의 gcc도 clang 계열이지만, 여기서는 몇가지 이유로 gcc로 진행한다) `brew`로 설치하였고, 이것은 필수이다.!

1. gcc 설치 및 버전 확인

   나는 c++로 진행하였기에 gcc가 아닌 g++로 진행하였다.

   ```bash
   brew install gcc
   brew info gcc
   ```

   brew info 명령어로 gcc 컴파일러의 버전정보를 얻을 수 있다.

2. openmp 실행 방법

   우선, 소스코드에 `#pragma omp parallel`이 main 함수 안에 선언되어 있어야 한다. 나는 다음과 같이 적어주었다.

   ```c++
   #include <iostream>
   
   int main(){
   #pragma omp parallel
   std::cout<< "Hello World!\n";
   }
   ```

   그리고 컴파일 할 때, `-fopenmp` 옵션을 주면 되는데, 여기서 버전정보를 알 필요가 있다. 버전에 맞게 다음과 같이 컴파일해준다.

   ```bash
   g++-12 test.cpp -fopenmp -o test
   ```

3. 최종 확인

   실행~

   ```bash
   ./test 
   Hello World!
   Hello World!
   Hello World!
   Hello World!
   Hello World!
   Hello World!
   Hello World!
   Hello World!
   ```

   실행환경의 Thread 수만큼 Hello World가 찍혀서 나오는 것을 볼 수 있다. 이러면 openmp환경이 세팅되었다고 보면 될 것 같다.

   ![Screen Shot 2022-09-05 at 10.31.39](/Users/eastsea/dev/vs_code_workspace/choieastsea.github.io/content/mac-setup-openmp/m1pro.png)

   나의 경우, m1 pro칩이 들어간 mac book pro를 사용중인데, 8코어 8쓰레드인 걸 지금 알았다... ㅎ