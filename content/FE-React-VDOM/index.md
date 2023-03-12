---
emoji: 🙄
title: (React) Virtual DOM에 대하여 알아보자
date: '2023-03-12 00:00:00'
author: choieastsea
tags: FE React JavaScript virtualdom VDOM
categories: FE
---



기존 브라우저의 DOM 트리를 어떻게 처리하는지 간단하게 알아보고, react의 Virtual DOM이 어떤 방법으로 개선하려고 했는지 알아보도록 하자. (일부 정확하지 않을 수 있음)

### 브라우저에서 페이지를 보여주는 과정

기존 브라우저에서 html, css, js, 각종 정적인 파일들로 구성된 페이지를 보여주는 아주 개략적인 과정은 다음과 같다.

우선, HTTP 프로토콜을 통한 리소스 요청 등(url을 입력한다던가, 특정 버튼을 누른다던가)에 의하여 서버로부터 위의 파일들을 받는다.

브라우저는 렌더링엔진(ex. Gecko, webkit 등 브라우저마다 상이)의 html parser를 이용하여 HTML tag에 각각 대응이 되는 `DOM`(Document Object Model) tree를 만든다. 또한 CSS parser를 이용하여 `CSSOM`(CSS Object Model) tree를 만들고 이를 합쳐 `render tree`를 만든다. 파싱이 다 되고 나서야 render tree를 만드는 것은 아니고 되는대로(네트워크를 통해 전송받아 파싱이 되는대로, 등...) 만들어서 사용자에게 보여주는 것이라고 한다.([출처](https://d2.naver.com/helloworld/59361)) render tree는 DOM tree와 1:1로 대응되지는 않는다. 

렌더 트리를 만드는 과정을 `attach`(스타일 포함한 객체로 변환)라고 한다. 이후,  `layout`(px단위로 정확한 위치 계산, `reflow`)의 과정 이후에 `paint`(그리기)를 하여 사용자가 보게 되는 것이다. 이 과정은 항상 정해진 것은 아니고, 각 엔진별로 캐싱, 최적화 등의 과정을 통하여 다르게 진행될 것이다.

script 태그를 마주치는 경우에는 렌더링엔진에서 자바스크립트 엔진(ex. v8)으로 스위칭되어 자바스크립트 코드를 실행하게 된다. 해당 태그의 코드가 모두 실행된다면 다시 렌더링엔진이 컨텍스트를 가져가게 된다. 만약 자바스크립트 등에 의하여 화면의 변경이 이루어진다면, reflow, repaint의 과정을 거치게 된다.

> 브라우저가 웹페이지를 그리는 방법
>
> [fetch] -> HTML/CSS/JS -> [parsing] -> DOM + CSSOM ->[attach]-> Render tree -> [layout/reflow] -> [(re)paint]

#### 만약 리렌더링되는 경우에는?

JS에서 DOM element를 건드리는 경우에는, 바꿔야 할 부분을 sub tree로 하는 DOM tree를 다시 만들고, re-paint하는데 까지의 과정이 필요하다. 모든 요소가 그려진 후 브라우저에서 일부 변경이 생길 경우엔, 해당 렌더러와 그 자식의 배치과정과 repaint 메서드가 발생한다. 

만약, 위의 과정에서 비교적 시간이 오래 걸리는 reflow, repaint를 줄일 수 있다면 좋겠지만 이는 어려운 일이다. 요즘 같이 복잡한 웹서비스에서는 더 많은 리렌더링 연산이 요구된다. 이에 리액트에서는 `Virtual DOM`으로 성능을 개선하고자 한다.



### Virtual DOM(in react)

경량화, 추상화된 DOM이라고도 볼 수 있는 가상돔(Virtual DOM, VDOM)은 브라우저의 리렌더링 횟수를 줄이기 위해 **최종적으로 리렌더링해야할 노드들을 기록하였다가 한번에 렌더링하도록 한다**. 여러 layout과 paint 연산 대신 <u>하나의(그치만 무거운) layout과 paint 연산을 수행</u>하도록 하여 속도를 어느정도 개선한 것이다. 리렌더링이 매우 자주 일어나는 웹서비스에서는 VDOM이 더 유리할 가능성이 높다.

React 공식 홈페이지에서는 VDOM을 `이상적인 또는 “가상”적인 표현을 메모리에 저장하고 ReactDOM과 같은 라이브러리에 의해 “실제” DOM과 동기화하는 프로그래밍 개념`이라고 정의한다. DOM에서 필요한 정보들만으로 추상화되어 있고, js 객체로 구성된 VDOM은 2개의 상태(과거 시점, 업데이트 시점)를 비교하여 리렌더링을 진행한다.

> VDOM은 기존의 많은 리렌더링 연산을 한번의 리렌더링으로(batch 단위로) 업데이트한다.

#### 리렌더링 in VDOM (reconciliation)

리액트에서는 VDOM에서 어떤 노드가 변하였는지 알기 위해 비교(diffing)의 과정을 갖는다. 만약 모든 노드들의 값, 속성이 바뀌었는지 파악한다면 매우 많은 시간이 걸릴 것이지만, 리액트는 비교를 해야할 것들을 최소화하여 이 시간을 단축하였다. (<u>컴포넌트의 이름을 비교하고, list 등에 key로 비교하는</u> 등)

리액트에서 리렌더링이 발생하는 과정에 대하여 좀 더 공부해보자.

우선, 해당 컴포넌트의 **state가 변경이 된다**. useState hook의 setter로 업데이트 하였다면 해당 컴포넌트가 `rendering queue`로 들어간다. React는 `Object.is()`와 같은 비교 알고리즘으로 state가 진짜로 변경되었는지 여부를 판단할수 있게 된다. [출처](https://ko.reactjs.org/docs/hooks-reference.html)

VDOM의 루트노드부터 렌더링을 해야하는지 판단하는데, 이를 `rendering pass`라고 부른다. 이때는 해당 컴포넌트가 rendering queue에 있다면 렌더링해준다. 렌더링된다면, 해당 컴포넌트의 자식 컴포넌트가 리턴되는 형식이며 이는 재귀적으로 수행된다. 그러나 이전과 값이 동일한 참조이고, 렌더링을 해야하는 다른 이유가 없다면 리액트는 컴포넌트에 대한 렌더링 결과를 버리고 렌더링 패스를 벗어난다고 한다. [출처](https://yceffort.kr/2022/04/deep-dive-in-react-rendering)

따라서, 아래와 같이 버튼을 눌렀을 때 1을 더해주는 코드는 state가 변경이 된 것 처럼 보여도 해당 시점에 렌더링이 되지 않을 것이다.

```javascript
	const [me, setMe] = useState({name: 'hong', age: 25});
	...
	const onPlusAge = (e) => {
    const after_change = me;
    after_change.age += 1;
    console.log(Object.is(me, after_change)); // true
    setMe(after_change); // re-render X!
  };
```

따라서 불변성 지키며(다른 주소를 할당해야 함) state를 set해줘야 한다. **헷갈리면 Object.is()로 비교해보자.**

++ (참고) useEffect는 그리기를 완료한 **후** 발생한다고 한다.

> 리액트의 리렌더링에서 알아야할 것
>
> - state 변경은 불변적으로 수행해준다. setState가 다 해주는 것은 아니다
> - 리렌더링된다면 재귀적으로 자식 컴포넌트도 리렌더링 된다.

리렌더링이 된다고 해서, 항상 다시 paint가 일어나는 것은 아니고 위에서 말한 reconciliation의 과정을 거쳐 실제 DOM에 적용을 하는 것으로 이해하면 될 것 같다.

### 결론

리액트에서 VDOM은 항상 빠르다고 볼 수 없지만, Diffing과 batch update의 과정(필요한 노드들만 한번에 업데이트 하는 과정)을 통하여 DOM을 직접 제어하는 것보다는 빠를 확률이 높다고 볼 수 있다.

