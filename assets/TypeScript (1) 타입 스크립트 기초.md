# TypeScript (1) 타입 스크립트 기초

타입스크립트를 컴파일하면 자바스크립트파일이 됨.

자바스크립트는 엄격한 규칙이 없어서 많은 사람들이 사용하기도 하였지만, 이는 프로젝트가 커질수록 버그의 가능성이 올라간다.

typescript is superset of javascript. 예측 가능하고 읽기 쉬운 코드를 만들기 위한 업그레이드 버전과 같다고 생각 할 수 있을 듯

타입스크립트를 통하여 예측가능하고 읽기 쉬운 코드 등으로 자바스크립트를 더 잘 사용할 수 있게 된다.

`yarn init`으로 노드 프로젝트 초기화

`yarn global add typescript`로 설치 완료

`tsconfig.json` 파일 생성 후 작성

`index.ts`파일 생성 후 기본 내용 작성

terminal에서 `tsc`실행하여 `index.js.map`과 `index.js` 파일 생성

package.json에 yarn start 자동화 내용 설정 추가해줌

```json
  "scripts" : {
    "start" : "node index.js",
    "prestart" : "tsc"
  }
```

`yarn start`로 tsc -> node index.js 실행하여 실행하는 것을 확인

Node.js는 Typescript를 이해하지 못하기에 일반적인 JavaScript 코드로 컴파일 하는 작업이 필요하고 tsc 명령어로 수행 가능하다.
