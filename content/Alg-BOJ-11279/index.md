---
emoji: 😬
title: (Alg) 백준 11279 최대힙 JS
date: '2022-02-19 00:00:00'
author: choieastsea
tags: DS, Algorithm, Heap, JS
categories: Alg

---

이제 백준 문제를 풀어보려고 한다. 최대힙과 관련된 문제이다. 

```markdown
문제 #11279
널리 잘 알려진 자료구조 중 최대 힙이 있다. 최대 힙을 이용하여 다음과 같은 연산을 지원하는 프로그램을 작성하시오.

배열에 자연수 x를 넣는다.
배열에서 가장 큰 값을 출력하고, 그 값을 배열에서 제거한다.
프로그램은 처음에 비어있는 배열에서 시작하게 된다.
```

단순하게 최댓값만 뽑아서 리턴해도 되지만, 최대힙을 사용하라해서 문제에 맞게 다시 구현해보았다.

## 백준에서 JS를 사용하는 방법

백준에서는 node js만 가능하고, 입력을 file system을 통하여 받아야한다. 따라서 기본적으로 `fs`모듈의 `readFileSync("/dev/stdin")`으로 가져오며 이후에 입력에 따라 재가공하면 된다. 나는 로컬에 stdin.txt파일을 만들어서 테스트한 후 제출하였다.

## 최대힙

최대힙은 부모 노드의 값이 자식노드의 값보다 크거나 같은 완전이진트리이다. 0번째 인덱스가 `null`인 배열로 자식과 부모간 인덱스 이동이 가능하므로 간단하게 구현 가능하다. 

```javascript
const fs = require("fs");
const lines = fs.readFileSync("/dev/stdin").toString().trim().split("\n");
// console.log(`lines : ${lines[0]}`);

const MaxHeap = {
  heap_list: [null], //부모와 자식 index 계산을 쉽게하기 위해 첫 인덱스에는 null값을 넣어주어 root index==1이 되도록 함
  swap(a, b) {
    //a번 index와 b번 index 원소 바꿔줌
    [this.heap_list[a], this.heap_list[b]] = [
      this.heap_list[b],
      this.heap_list[a],
    ];
    //tmp로 swap하는게 구조분해보다 빠르긴 하므로 참고하자
  },
  push(element) {
    if (this.heap_list.length === 1) {
      //배열에 값 없는 경우는 그냥 추가
      this.heap_list.push(element);
    } else {
      this.heap_list.push(element);
      this.heapify(this.heap_list.length - 1);
    }
  },
  heapify(currentIndex) {
    //해당 index에서부터 root node까지 올라가면서 적절한 위치에 놔준다
    // console.log(currentIndex);
    const parentIndex = parseInt(currentIndex / 2);
    if (currentIndex > 1) {
      if (this.heap_list[currentIndex] >= this.heap_list[parentIndex]) {
        //max heap 속성 위배하는 경우 swap
        this.swap(currentIndex, parentIndex);
        this.heapify(parentIndex);
      }
    }
    //currentInde 1이하면 그냥 return
  },
  shift() {
    //첫번째 인덱스를 마지막과 바꾼 후, 추출. 루트에서부터 내려오면서 힙 속성 만족시키기
    if (this.heap_list.length > 1) {
      this.swap(1, this.heap_list.length - 1);
      const returnData = this.heap_list.pop();
      this.reverseHeapify(1);
      return returnData;
    } else return 0;
  },
  reverseHeapify(currentIndex) {
    //자식과 현재 노드의 크기를 비교하여 가장 큰 노드를 서브트리의 루트와 바꿔줘야한다.
    let leftChildIndex = currentIndex * 2;
    let rightChildIndex = currentIndex * 2 + 1;
    //인덱스 오바되지 않도록 예외 처리
    if (leftChildIndex > this.heap_list.length - 1) {
      return;
    } else if (leftChildIndex === this.heap_list.length - 1) {
      //right child가 없는 경우
      rightChildIndex -= 1; //leftchild와 일치시켜주자 그냥
    }
    //셋 중 가장 큰 노드 찾기
    let maxInd =
      this.heap_list[leftChildIndex] >= this.heap_list[rightChildIndex]
        ? leftChildIndex
        : rightChildIndex;
    if (this.heap_list[maxInd] >= this.heap_list[currentIndex]) {
      //swap이 유의미해지는 경우.
      //가장 큰 노드와 현재 노드 swqp
      this.swap(maxInd, currentIndex);
      //바뀐 곳에서 다시 reverseHeapify
      this.reverseHeapify(maxInd);
    }
  },
};
const heap = MaxHeap;
const rtn = [];
for (let i = 1; i <= lines[0]; i++) {
  const input = parseInt(lines[i]);
  if (input === 0) {
    //shift max heap
    rtn.push(heap.shift());
  } else {
    //push input to max heap
    heap.push(input);
    // console.log(`input : ${input} / heap : ${heap.heap_list}`);
  }
}
console.log(rtn.join("\n"));
```

런타임에러가 나서 사례를 검색하였는데, console.log()를 여러번 해주지 말고 <u>버퍼에 넣어놨다가 마지막에 출력만 해주니 해결</u>되었다!