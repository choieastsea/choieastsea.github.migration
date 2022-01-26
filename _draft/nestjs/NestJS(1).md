# NestJS(1) Nest Js란? Hello world

NestJS는 nodejs위의 express를 통하여 움직이는 backend framework이다. 이는 일정한 규칙을 만들어 그 위에서 프로그래밍할 수 있도록 해준다. 기존의 자유도가 높은 노드의 서버프로그래밍에 비해 정해진 방법을 이용할 수 있다는 의미로 볼 수 있다. 

프레임워크의 자유도가 높을수록 다양한 방법의 접근이 가능하겠지만, 소통과 문제해결의 공유에 어려움이 있을 수 있다. 나 역시, 서버 프로그래밍을 거의 해본 적이 없기에 Nest js와 같은 프레임워크의 규칙 위에서 배우면서 코딩해보려고 한다.

Requirements: typescript, node js

깔고 controller.spec.ts 는 지우고 한번 시작해보자

npm run start:dev



main.ts에서 프로젝트가 시작한다.

@module은 하나의 역할을 하는 어플리케이션이라고 볼 수 있다. 

@controller는 url에 대한 것을 처리한다 express의 router라고 볼 수 있다. app.get와 비슷

@service