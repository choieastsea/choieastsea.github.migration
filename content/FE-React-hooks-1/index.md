---
emoji: 🙄
title: (React) Hooks (1) useState, useEffect
date: '2021-10-12 00:00:00'
author: choieastsea
tags: FE React JavaScript hooks
categories: FE
---

# (React) Hooks (1) useState, useEffect

Hooks는 함수형 컴포넌트에서 다양한 작업을 할 수 있도록 도와주는 함수이다. 기존에는 class형 컴포넌트에서만 가능했던 기능을 hook을 통하여 functional component에서 사용가능하게 되었으며, 로직을 재사용할 수 있게 되었고, 코드의 이해도를 높일 수 있게 되었다.

보통 hook은 `useState()`, `useEffect()`와 같이 use~로 시작하는 경우가 많고, 리액트에서 제공하는 hook 
뿐만 아니라 customized 하여 사용할 수도 있다. 그 중 가장 기본적인 훅인 `useState`와 `useEffect`에 대하여 알아보자.

# useState

함수형 컴포넌트에서 state(상태)를 바꿔줄 수 있도록 하는 가장 기본적인 Hook이다. `useState`의 인자로는 해당 state의 초깃값을 넣어주며, `[state명, state를 설정하는 setter 함수]`로 구성된 배열을 반환한다. 

## useState 사용법

우선 useState를 import하고 사용해야 한다. 다음 예제를 보도록 하자!

```javascript
//Counter.js
import { useState } from 'react';
const Counter = () => {
  const [value, setValue] = useState(0);

  return (
    <div>
      <p>{value}</p>
      <button onClick={() => setValue(value + 1)}>+1</button>
      <button onClick={() => setValue(value - 1)}>-1</button>
    </div>
  );
};
export default Counter;
```

`const [value, setValue] = useState(0)`를 보면 value라는 이름을 갖고 초깃값이 0인 state와 value를 set해주는 setValue함수를 useState가 리턴하게 된다. 보통 이를 **비구조화 할당**`destructuring assignment`으로 받아서 처리한다. `const value = useState(0).value`...와 같은 결과를 낸다고 볼 수 있다.

setter함수는 보통 이벤트 또는 state가 변경되어야 하는 상황에서 사용된다. 위의 예제에서는 button이 눌리면(onClilck) value를 +1씩 해주거나 -1씩 해주도록 하였다. 여기서 value는 가장 최근의 값을 가져오지만, **asynchronously**하게(비동기적으로) 실행되므로 연속적인 순서를 지켜줘야하는 경우에는 다음의 해결방법이 있을 것이다.

1. useEffect

   해당 state가 바뀜으로써 `side-effect`가 생기게 한다. 이는 순서를 부여할 수 있다는 의미이다.

2. <u>**callback함수 이용**</u>

   위의 setValue를 `setValue((value)=> value +1)`와 같이 인자로 콜백함수를 넣어줄 수 있다. 이는 바로 직전의 value값을 가져와 setter를 수행하는 것으로 동기적으로 실행할 수 있다. 이는 useEffect안에서 *의존성 문제가 발생했을때도 생각할 수 있는 해결책이 될 것*이다.

3. await 키워드 이용

   비동기적인 함수이므로 async~await를 사용하면 동기적으로 이후의 작업을 수행할 수 있을 것이다.

## state가 바뀌면 re-render 된다

state가 바뀌면서 리렌더링이 일어나고 그 이후에 비동기적으로 setState가 반영된다. 따라서, setState() 바로 뒤에 console.log()를 찍어보면 이전 state가 나오는 것을 확인할 수 있다.

# useEffect

Effect Hook을 사용하면 함수 컴포넌트에서 `side effect`를 수행할 수 있다. side effect란, state를 바꿀 때 일어나는 일련의 tasks라고 보면 된다. 예를 들어 위의 예시에서, count를 console에다가 출력해보자. count가 바뀔때마다 console.log를 수행하는 side-effect를 발생시키는 것이므로 **useEffect**를 사용하면 된다! useEffect 역시 import해서 사용해야 한다.

```javascript
//Counter.js
import { useEffect, useState } from "react";
const Counter = () => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    console.log(value);
  }, [value]);
  //value가 바뀔때마다 값이 콘솔에 출력될 것이다.
  return (
    <div>
      <p>{value}</p>
      <button onClick={() => setValue(value + 1)}>+1</button>
      <button onClick={() => setValue(value - 1)}>-1</button>
    </div>
  );
};
export default Counter;

```

useEffect(callback, [state])의 구성으로 되어있는데, [state]는 `의존성배열(deps)`로 관찰할 states의 배열을 넣어주고, callback은 state들이 바뀌거나 마운트,언마운트되면 실행될 side-effect에 대한 함수를 넣어주면 된다.

## useEffect 사용법

1. 마운트시에만 실행

   마운트는 처음으로 컴포넌트가 화면에 보이게 되는 시점을 의미하며, 뒤에 빈 배열을 넘겨주면 된다.

   ```javascript
   useEffect(()=> {
   	console.log('마운트될때만 실행');
   }, []);
   ```

   컴포넌트가 처음 나타날때만 콘솔에 출력되고 이후에는 출력되지 않을 것이다. 컴포넌트의 초기화 등에 사용될 수 있다.

2. 특정 값 업데이트 될때만 실행

   의존성 배열에다가 관찰할 값들을 넣어주면 된다. 배열 안에는 state나 props로 전달받은 값 모두 사용 가능하다. 위의 Counter.js의 예시를 참고하자.

## cleanup function 

컴포넌트가 **언마운트 되기 전이나, 업데이트되기 직전에 작업을 수행**하고 싶다면 콜백함수에서 뒷정리(cleanup)함수를 반환해주면 된다. <u>업데이트 되는 상황에서는 (이전 effect에 대한)clean-up → update → side-effect 순으로 실행되며, 언마운트 되는 상황에서는 clean-up함수가 실행</u>된다.

카운터의 예시에서 언마운트, 마운트를 버튼으로 처리할 수 있도록 추가해보았다.

```javascript
//App.js
import Counter from "./Counter";
import { useState } from "react";
export default function App() {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div className="App">
      <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? "숨기기" : "보이기"}
      </button>
      {isVisible && <Counter />}
    </div>
  );
}

```

```javascript
//Counter.js
import { useEffect, useState } from "react";
const Counter = () => {
  const [value, setValue] = useState(0);
  useEffect(() => {
    console.log("mount or update");
    console.log(value);
    return () => {
      console.log("clean up");
      console.log(value);
    };
  }, [value]);
  return (
    <div>
      <p>{value}</p>
      <button onClick={() => setValue(value + 1)}>+1</button>
      <button onClick={() => setValue(value - 1)}>-1</button>
    </div>
  );
};
export default Counter;

```

![실행화면](../../../cnkspace/dcm20/artifacts/doxsupp/images/useEffect.png)

업데이트가 일어날 때에도 이전 effect에 대한 clean-up이 먼저 일어나고, 업데이트와 side-effect가 실행이 되는 것을 확인할 수 있다.

useEffect hooks은 이외에도 데이터를 fetching하여 가져오는 등 다양하게 사용된다. 이에 대하여 자세하고 어렵게 적어놓은 [글](https://overreacted.io/ko/a-complete-guide-to-useeffect/)을 읽어보도록 하자! 나도 아직 잘 이해가 가지 않는다ㅠ 다음에는 useMemo, useCallback, useRef와 함께 커스텀 훅을 만드는 방법에 대하여 알아보겠다.
