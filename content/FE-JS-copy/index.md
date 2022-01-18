---
emoji: 🙄
title: (JS) 얕은복사와 깊은복사(shallow and deep copy) & aliasing
date: '2021-10-24 00:00:00'
author: choieastsea
tags: FE React JavaScript copy
categories: FE
---

# 결론

## 복사

`복사`: 내용은 완전히 같지만, 주소는 완전히 다른 사본을 만들어내는 것

`얕은 복사`: **원본과 참조 공유가 있어** 상황에 따라 문제가 생길 수 있는 복사, depth가 1인 복사

`깊은 복사`: 내용만 같고 모든 원소의 주소는 달라 **원본과 완전히 독립**된 복사

## 복사 판단방법

즉, 모든 원소의 내용은 같으면서 ===의 결과가 false가 나와야(**다른 주소를 참조, 원본과 독립되어있다**는 의미) 깊은 복사가 된 것이다. 

같은 방법을 통하여 복사를 했더라도 **객체의 깊이에 따라 얕은 복사가 될 수도, 깊은 복사가 될 수도** 있다! 

---

# 계기

React.js에서 state(상태)를 다루다보면 `불변성`이라는 속성이 굉장히 중요 하게 여겨진다. 리액트에서 불변성이란, 기존의 값을 직접 수정하지 않으면서 새로운 값을 만들어 내는 것을 의미한다. 새로운 값이라는 것은 **원본과는 완전히 독립된 사본**에서 변형이 이루어진 데이터이며, 이를 위해 깊은 복사의 개념을 익힐 필요를 느끼게 되었다.

# 사전 지식

## Primitive type과 Reference type

[자바스크립트의 자료형](https://developer.mozilla.org/ko/docs/Web/JavaScript/Data_structures)

자바스크립트에는 `원시타입`(primitive type)과 `참조타입`(reference type)이 존재한다. 원시타입은 값 자체이며 메모리에 바로 저장된다. 참조타입은 원시타입을 제외한 나머지를 저장하는 방식으로, 메모리에 실제 값들이 저장되어 있는 주소가 저장되어있다. 참조타입에서 실제 값들은 Heap 메모리에 저장되어있다.

## 객체의 깊이(depth)

`{abc: 'xyz'}`의 깊이는 1이다.

`{foo:{bar:{baz : 'baa'}}}`의 깊이는 3이다. 

## 대입연산자를 통한 복사 ↔ Aliasing

원시타입에서 다음 결과를 예상해보자.

```jsx
let num1 = 2;
let num2 = num1;
console.log(num1 === num2);
num2 = 4;
console.log(num1);
console.log(num1 === num2);

//true
//2
//false
```
![](https://images.velog.io/images/choieastsea/post/798584e8-7421-4ced-8479-aa6a432fae77/Untitled.png)![](https://images.velog.io/images/choieastsea/post/da95333d-b559-4df9-a728-3c29f9bb2442/Untitled%201.png)

**원시 타입**에서는 대입연산자를 통하여 할당이 된다. 위의 예시처럼 num2의 값을 바꾼다면, num2가 새로운 값을 갖도록 재할당한다고 볼 수 있다. num2의 값이 바뀌었다고 num1의 값도 바뀌지는 않는다.

그렇다면 참조타입에서는 어떨까? 다음 코드의 결과를 예상해보자.

```jsx
let a = [1,2,[1,2,3]];
let b = a;
console.log(a===b);
**b[1] = 4;**
console.log(a);

//true
//[1,4,[1,2,3]]
//true
```
![](https://images.velog.io/images/choieastsea/post/df74b351-8d27-4261-99e1-e98e36b5eae7/Untitled%202.png)
![](https://images.velog.io/images/choieastsea/post/a88e5715-2902-47b6-ba2e-d65ff10c7a70/Untitled%203.png)
하지만, **참조 타입에서는 참조 공유**가 된다. 위에서도 b는 새로운 메모리 공간이 아닌 a와 같은 주소를 공유하게 된다. 그렇게되면 사본인 b를 수정했는데 원본인 a도 바뀌는 것이다.

원시 타입에서는 대입연산자를 통한 복사(깊은 복사)라고 볼 수 있지만, *참조 타입에서 대입연산은 복사라고 볼 수 없다*. 참조타입에서의 대입연산(=)은 copy가 아닌 `aliasing`이다. alias란 `별명`이라는 뜻으로, A와 B가 같은 객체를 가리키는 것을 의미한다. 예컨데, 손흥민과 우리흥은 말(내용)은 다르지만 같은 본질(사람)을 가리킨다. 이때 '우리흥'은 '손흥민'의 alias라고 볼 수 있다.

# ⭐복사란?

이 페이지에서 말하는 `복사`란, aliasing(참조공유)과는 완전 다른 개념이다.('손흥민'과 '우리흥'처럼 같은 객체를 가리키는 것이 아님!) ***외형은(내용은) 완전히 같지만, 본질은(주소는) 완전히 다른 사본*을 만들어내는 것**이 여기서 말하는 복사이다.

참조타입에는 **복사되는 depth(깊이)에 따라** 얕은 복사와 깊은 복사가 존재한다. 각 방법을 익히고 적재적소에 사용하도록 해보자!

## 얕은복사

하나의 depth까지만 복사한다. 따라서 참조공유의 문제가 발생할 수 있다.

객체나 배열의 깊이를 생각하지 않고 1차원적으로 원소들을 복사하여 새로운 변수에 넣어주면 얕은복사이다. 이는 일차원 객체에서는 깊은복사이지만, 깊이가 2 이상인 경우에는 위에서 본 참조공유의 문제(aliasing)을 일으킨다. 

 js에서는 이를 위해 반복문을 이용한 직접 대입, slice 함수, ES6의 spread 연산자 등을 이용할 수 있다.

1. for문

    일일이 객체의 value(배열이라면 원소)를 넣어준다.

```jsx
const friends = ['Anthony', 'Eastsea', 'Jason'];

const shallow_copy = (object) => {
  let new_object = {};
  for (let key in object) {
    new_object[key] = object[key];
  }
  return new_object;
};
const shallow_friends = shallow_copy(friends);
```

2. spread 연산자(전개구문, ...)

```jsx
const friends = ['Anthony', 'Eastsea', 'Jason'];
const shallow_friends_2 = [...friends];
```

직관적이며 기존의 함수들을 포함한 기능들을 사용할 수 있기에 최근에 많이 사용되는 것 같다. 

3. assign 함수, slice 함수

    전개연산자가 있는데 굳이 해볼 필요는 없을 것 같으니 인터넷에서 찾아보도록 하자.

위 코드의 결과로 복사가 잘 되어있을 것이다. 깊이가 1인 객체에 대하여 위 방법은 깊은 복사가 된다고 볼 수 있다!

이제 일차원 배열 말고 다음과 같이 **깊이가 2이상인 객체**에 대하여 위의 복사를 진행해보자. 이름, 나이, 가족 구성원 배열을 갖고 있는 객체를 복사하려고 한다.

```jsx
let origin = {name : 'name', age : 50, family : ['father','mother']};
let shallow_copy = {...origin};

console.log(origin===shallow_copy); //false
console.log(origin.family === shallow_copy.family);//true

//사본의 값을 바꿔보자.
shallow_copy.name = 'another_name';
shallow_copy.family.push('cat');  //참조 공유로 인해 원본도 수정된다.

console.log(shallow_copy);
console.log(origin);
```
![](https://images.velog.io/images/choieastsea/post/d4c1c9b7-ecf0-46dd-91d4-599f15a39040/Untitled%204.png)얕은 복사 직후의 상황
얕은 복사를 하면 1차원적으로는 복사가 이루어졌지만, 깊이가 2인 family배열은 공유하고 있는 상태가 된다. 이 경우 문제 있는 `origin.family===shallow_copy.family`를 하면 true가 나온다.
![](https://images.velog.io/images/choieastsea/post/21b6cf6f-66bc-4566-b0cd-eef19968d35f/Untitled%205.png)이는 참조공유의 문제가 생긴다. 배열의 원소단위로 값만 가져왔지만, *원소가 만약 또 참조 타입인 경우*에 다시 참조를 공유하는 문제가 생기게 되는 것이다. 이와 같이 **참조의 문제가 여전히 남아있는 복사가 얕은 복사이다**.  우리는 이를 떼어내서 완벽하게 독립된 사본을 만들어줄 필요가 있다. 위에서는 간단하게 push해주는 부분을  `shallow_copy.family = shallow_copy.family.concat('cat');`으로 바꿔 새로운 객체를 할당함으로써 문제를 해결할 수 있다.

하지만 이렇게 문제가 생겨 수정하는 것보다, 복사를 할때부터 이러한 참조의 문제를 일으키지 않도록 하고 싶을 때 `깊은복사`를 이용할 수 있다.

## 깊은 복사

깊은 복사를 위해서는 구조적으로 제일 깊숙한 참조타입까지 복사를 진행해주면 되는데, 깊이마다 얕은복사, 재귀함수, 라이브러리, JSON 함수와 같은 방법들이 존재한다.

아래와 같이 바꾸면 깊은 복사에 성공한 것이다. family를 ===한 결과 false가 나올 것이다.
![](https://images.velog.io/images/choieastsea/post/6bca52a9-8858-4455-a729-d9e126aaa506/Untitled%206.png)

1. 깊이마다 얕은 복사 진행

	얕은 복사를 객체의 깊이별로 진행해주면 된다.

```jsx
let origin = {name : 'name', age : 50, family : ['father','mother']};
let deep_copy = { ...origin, family: [...origin.family] };

console.log(origin.family === deep_copy.family);
//false
```

하지만 위의 경우는 깊이가 깊어지면 매우 귀찮아진다. 아래의 예시를 보자.

```jsx
    const object = {
      somewhere: {
        over: {
          the: {
            rainbow: {
              num: 7,
            },
            name: 'name',
          },
          something: 'something',
        },
      },
      last: 'dance',
    };
    //얕은 복사
    const shallow_object = {
      ...object,
    };

    //깊이마다 얕은 복사 진행
    const deep_object = {
      ...object,
      somewhere: {
        ...object.somewhere,
        over: {
          ...object.somewhere.over,
          the: {
            ...object.somewhere.over.the,
            rainbow: {
              ...object.somewhere.over.the.rainbow,
            },
          },
        },
      },
    };

    console.log(
        object.somewhere.over.the.rainbow === shallow_object.somewhere.over.the.rainbow
    );
    //true -> 참조 공유
    console.log(
      object.somewhere.over.the.rainbow === deep_object.somewhere.over.the.rainbow
    );
    //false -> 깊은 복사 성공
```

위는 너무 귀찮으므로, 깊이가 깊어질때에는 아래의 방법을 사용하자.

2. 재귀함수

    재귀적으로 객체의 깊이까지 모두 복사를 해주면 된다. 이는 어느 객체에나 사용할 수 있는 범용적인 방법이 될 것이다.

```jsx
    const deep_copy = (object) => {
      let new_object = {};
      for (let key in object){
        if(typeof object[key] === 'object'){  //if element is object
          new_object[key] = deep_copy(object[key]);
        }
        else{ //not object => primitive type
          new_object[key] = object[key];
        }
      }
      return new_object;
    }
    const deep_object_recursion = deep_copy(object);
    console.log(
      object.somewhere.over.the.rainbow === deep_object_recursion.somewhere.over.the.rainbow
    );
    //false -> 깊은 복사 성공

```

위의 deep_copy 함수를 사용하면 깊이에 제한 없이 깊은 복사를 진행할 수 있다. 재귀적으로 원소의 type이 object이면 한단계 들어가서 복사를 진행하는 방법이다.

3. 라이브러리

    깊은 복사를 해주도록 도와주는 자바스크립트 라이브러리가 있다. lodash, immutable을 찾아보도록 하자.

4. JSON.stringfy, parse 함수

    이는 일종의 hack으로, 성능은 느리지만 간단하게 깊은 복사를 할 수 있는 방법이기도 하다. 원래 `JSON.stringify`는 JSON객체를 string으로 변환시켜주고, `JSON.parse`는 string을 JSON으로 변환시켜주는 메서드이다. 여기서 (객체 → string → 객체)의 방법으로 새로운 복사본을 만들어주면 된다. 아까의 object 예시에 이어서 해보겠다.

```jsx
    const deep_object_json = JSON.parse(JSON.stringify(object));
    console.log(
      object.somewhere.over.the.rainbow === deep_object_json.somewhere.over.the.rainbow
    );
    //false -> 깊은 복사 성공
```

이 방법이 외부 라이브러리를 사용하지 않는다면 가장 간단한 방법이겠으나, 문자열로 바꾼 객체를 다시 객체로 만드는 시간이 많이 든다는 것을 알고 있어야 한다.

# 마무리(복사,alias복습)
![](https://images.velog.io/images/choieastsea/post/a3fad05e-6882-4ab8-8cb4-20be79ad1dd0/Untitled%207.png)

위의 사진에서 a와 b는 같은 객체를 공유하고 있고(참조공유), 이는 **alias의 관계**이다. 반면 c는 a의 2번 인덱스를 공유하고 나머지는 복사가 되었다. 이 경우 c는 a에서 **얕은 복사**가 이루어졌다고 볼 수 있다.(이차원 배열인 a에서 1차원선에서만 복사가 이루어졌기 때문) d는 a와 완전히 데이터는 일치하지만, 그 어느 것도 주소를 공유하지 않는다. 이는 **깊은 복사**가 이루어졌다고 볼 수 있다!

JS에서 *타입이나 객체의 구조에 따라서 같은 방법으로 복사를 하더라도 어떤 것은 얕은 복사일수도 있고, 깊은 복사일 수 있다*. 이를 판단하는 것은 값 비교와 주소비교이다. A를 원본으로 하는 사본 B가 있을때, B의 모든 원소는 A의 모든 원소와 값이 같아야하며 주소는 달라야(===의 결과 false) 깊은복사라고 한다.

## +리액트에서 이를 알아야 하는 이유

React.js에서는 상태의 불변성을 유지시켜줘야하는 이유에 대해서 알아보자. 리액트에서 상태가 변하면 re-rendering을 해줘야하므로, 상태가 변했음을 판단할 수 있어야 한다. 하지만 하나의 상태를 변형해가며 사용한다면(불변성 x) 같은 객체이며 값만 바뀐 것이므로, **상태가 바뀌었는지 확인하는데 더 많은 자원을 소비해야한다**. *따라서 아예 다른 객체를 할당해줌으로써 상태가 바뀌었다고 인식하여 리렌더링*한다*.* 불변성을 유지하며 상태를 변경하는 방법으로는, 깊은 복사를 해준 후 바꿀 부분만 추가로 바꿔주면 된다! 객체의 깊이에 따라 다양한 방법을 사용할 수 있다.