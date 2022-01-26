# TypeScript (1) 타입 스크립트 기초

타입스크립트를 컴파일하면 자바스크립트파일이 됨.

자바스크립트는 엄격한 규칙이 없어서 많은 사람들이 사용하기도 하였지만, 이는 프로젝트가 커질수록 버그의 가능성이 올라간다.

typescript is superset of javascript. 예측 가능하고 읽기 쉬운 코드를 만들기 위한 업그레이드 버전과 같다고 생각 할 수 있을 듯

타입스크립트를 통하여 예측가능하고 읽기 쉬운 코드 등으로 자바스크립트를 더 잘 사용할 수 있게 된다.

[여기서](https://www.typescriptlang.org/play) 타입스크립트를 실행해볼 수 있으니, 일단은 환경설정 없이 타입스크립트를 경험해보자!

```javascript
console.log("hello typescript");

interface Human {
    name : string,
    age: number, 
    gender: string
};

const person = {
    name: "Choieastsea",
    age: 24,
    gender: "male"
};

const sayHi = (person : Human): string => { //object를 parameter로 사용할 때, interface를 사용할 수 있다.
    //u can put '?' after param' name when you want optional params.
    const {name, age, gender} = person;
    return `Hello ${name}, you are ${age} old, you are a ${gender}`;
};

console.log(sayHi(person));
```

