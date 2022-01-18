---
emoji: 🙄
title: (React) Hooks (2) useCallback, useMemo
date: '2021-10-22 00:00:00'
author: choieastsea
tags: FE React JavaScript hooks
categories: FE
---

# (React) Hooks (2) useCallback, useMemo

나는 여태까지 useState와 useEffect로만 모든 프로젝트를 진행하였다. 이제 기능구현은 되니까 성능 최적화를 해보도록 하자!

useEffect는 특정 조건(**변수의 값이 바뀌거나 마운트, 언마운트 되었을 때**)에 일어날 행동들(side effects)을 수행하는 Hook이다. 

useCallback은 함수를 memoization시켜놓아 모든 렌더링 시 함수가 재실행되지 않고, 특정 조건시에만 함수를 반환하여 실행도록 한다.

useMemo는 변수를 ~~

배열인자에 들어있는 의존성이 바뀌었을때 실행되는 것은 같지만, useEffect는 안의 내용이 실행되고, useMemo는 안의 변수를 반환하고 useCallback은 안의 함수를 반환한다.

