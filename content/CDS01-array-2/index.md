---
emoji: 😬
title: (DS) 자료구조 정리 02- 다양한 종류의 배열 (packed~unpacked, sorted~unsorted)
date: '2022-07-08 00:00:00'
author: choieastsea
tags: DS, Algorithm, array, packed, unpacked, sorted, unsorted
categories: Alg

---

배열은 저번에 공부했듯이 고정된 크기의 연속된 주소에 저장된 자료구조이다. 배열도 저장하는 방법(위치, 정렬)에 따라 크게 4가지로 나눌 수 있다.

# 배열의 종류

- 데이터가 몰려있냐에 따라

  - packed

    배열안의 데이터(의미있는)가 한쪽에 몰려있는 경우이다.

  - unpacked

    배열안의 데이터가 산발적으로 존재하는 경우이다. 빈 공간에는 의미없는 값이나, 특정 값(예를 들어 의미없음을 뜻하는 -1 등)이 들어가 있을 수 있다.

- 데이터가 정렬되어있냐에 따라

  - sorted

    배열안의 데이터가 정렬되어(숫자면 값이 크거나 작은 순서대로) 있다.

  - unsorted

    배열안의 데이터가 정렬되어 있지 않다. (데이터의 크고 작음이 순서에 영향을 미치지 않는다)

두 기준으로 보았을 때 4가지 조합이 존재하는데, 배열에서 가장 중요한 연산인 `Search`, `Insert`, `Delete`를 직접 구현해보면서 각 배열의 특징에 대하여 알아보도록 하자! (단, insert 또는 delete 시 배열 전체의 크기 변화는 없다고 가정) <u>search는 해당 값을 찾는 연산, insert는 해당 값이 없다면 추가하는 연산, delete는 해당 값이 있다면 삭제하는 연산으로, insert와 delete는 항상 search가 선행되어야 할 것</u>이다.

# 1. packed & unsorted

가장 기본적인 형태의 배열이다. 배열의 데이터의 크기가 S라고 했을 때, 데이터는 아래와 같이 저장될 것이다. 1행은 인덱스를 의미하고, 2행은 데이터를 의미하며 S는 4이다.

| 0    | 1    | 2    | 3    | 4    | 5    | 6    | 7    |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| 5    | 3    | 7    | 6    | x    | x    | x    | x    |

- Search

  정렬되어 있지 않으므로 차례대로 찾아야할 것이다. `O(n)`이 걸릴 것이다.

- Insert

  Search하고, insert를 하는데 단순히 끝에 데이터를 넣고 S를 1 증가시키면 될 것이다. 순수 insert 자체는 `O(1)`이 걸리지만, 총 `O(n)`이 걸린다.

- Delete

  만약 값을 찾고 그 값을 x로 지운 후, 뒤의 값들을 하나씩 미루는 방법을 사용한다면 그 자체로 `O(n)`이 걸릴 것이다. 하지만 unsorted array는 데이터에 위치에 대하여 특정한 제약이 없으므로, 단순히 맨 끝의 데이터와 지울 데이터의 위치를 바꾸고 S를 1 감소시켜주면 된다.

  예를 들어, 5를 delete하려고 하면, 0번 인덱스의 5와 마지막 인덱스의 6을 바꿔주고(혹은 6을 0번에만 대입해줘도 됨) s를 줄여주면 된다. delete(5)의 결과는 아래와 같다.

| 0    | 1    | 2    | 3    | 4    | 5    | 6    | 7    |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| 6    | 3    | 7    | 6    | x    | x    | x    | x    |

코드는 아래와 같을 것이다.

```cpp
#include <iostream>

using namespace std;

int A[100];
int S; // size of array
int search(int x)
{
    // A에 x가 있는지 찾는다 없다면 -1 리턴
    for (int i = 0; i < S; i++)
    {
        if (A[i] == x)
        {
            return i;
        }
    }
    return -1;
}
void insert(int x)
{
    // A에 x를 끝에 넣어준다
    A[S] = x;
    S++;
}
void dlte(int loc)
{
    // 해당 위치의 데이터를 마지막 원소와 스왑하고 지운다
    int tmp = A[loc];
    A[loc] = A[S - 1];
    A[S - 1] = tmp;
    S--;
}

int main()
{
    char c;
    int x, res;
    int quit = 0;
    while (!quit)
    {
        cin >> c;
        switch (c)
        {
        case 's':
            cin >> x;
            res = search(x);
            if (res == -1)
            {
                printf("%d not founded\n", x);
            }
            else
            {
                printf("%d founded in %d\n", x, res);
            }
            break;
        case 'i':
            cin >> x;
            res = search(x);
            if (res == -1)
            {
                insert(x);
            }
            break;
        case 'd':
            cin >> x;
            res = search(x);
            if (res != -1)
            {
                dlte(res);
            }
            break;
        case 'q':
            quit = 1;
            break;
        default:
            printf("?");
            break;
        }
        printf("S : %d\n", S);
        for (int i = 0; i < S; i++)
        {
            printf("%3d   ", i);
        }
        printf("\n");
        for (int i = 0; i < S; i++)
        {
            printf("%3d   ", A[i]);
        }
        printf("\n");
    }

    return 0;
}
```

# 2. packed & sorted

아래와 같은 형식으로 저장될 것이다. S(배열의 크기)는 4이다.

| 0    | 1    | 2    | 3    | 4    | 5    | 6    | 7    |
| ---- | ---- | ---- | ---- | ---- | ---- | ---- | ---- |
| 3    | 5    | 6    | 7    | x    | x    | x    | x    |

- Search

  Binary Search를 이용하면 `O(log n)`에 찾을 것이다. 빠르다!

- Insert

  데이터에 따라 삽입되는 위치가 정해질 것이다. 이는 이전과 다르게 중간에 삽입한다면 뒤의 데이터들을 하나씩 미뤄야 하므로 `O(n)`의 시간이 걸릴 것이다. insert의 경우에는 값이 없을때, 삽입하는 것이므로 어디에 삽입할지를 search단계에서 파악하는 것이 필요하다. 따라서, 전역변수를 두고 search가 실패했을 경우, insert해야하는 위치를 저장하도록 하면 될 것이다.

- Delete

  역시 삭제한 위치가 생기면 뒤의 데이터들을 하나씩 당겨야 하므로 `O(n)`의 시간이 걸릴 것이다.

코드는 아래와 같을 것이다.

```cpp
#include <iostream>

using namespace std;

int A[100];
int S;   // size of array
int loc; // insert할 위치
int search(int x, int left, int right)
{
    // Recursive Binary search
    int mid = (left + right) / 2;
    if (left > right)
    {
        // loc 위치에서 insert할 예정
        loc = left;
        return -1;
    }
    if (A[mid] == x)
    {
        return mid;
    }
    else if (A[mid] < x)
    {
        // left...mid ... x ...right
        search(x, mid + 1, right);
    }
    else
    {
        // left ... x ... mid ... right
        search(x, left, mid - 1);
    }
}
void insert(int x)
{
    // loc 뒤의 원소들을 한칸씩 미룬다.
    S++;
    for (int i = S; i > loc; i--)
    {
        A[i] = A[i - 1];
    }
    // A에 x를 loc에 넣어준다
    A[loc] = x;
}
void dlte(int loc)
{
    // 해당 위치의 원소 뒤로 한칸씩 당긴다.
    for (int i = loc + 1; i <= S; i++)
    {
        A[i - 1] = A[i];
    }
    S--;
}

int main()
{
    char c;
    int x, res;
    int quit = 0;
    while (!quit)
    {
        cin >> c;
        switch (c)
        {
        case 's':
            cin >> x;
            res = search(x, 0, S - 1);
            if (res == -1)
            {
                printf("%d not founded\n", x);
            }
            else
            {
                printf("%d founded in %d\n", x, res);
            }
            break;
        case 'i':
            cin >> x;
            res = search(x, 0, S - 1);
            if (res == -1)
            {
                insert(x);
            }
            break;
        case 'd':
            cin >> x;
            res = search(x, 0, S - 1);
            if (res != -1)
            {
                dlte(res);
            }
            break;
        case 'q':
            quit = 1;
            break;
        default:
            printf("?");
            break;
        }
        printf("S : %d\n", S);
        for (int i = 0; i < S; i++)
        {
            printf("%3d   ", i);
        }
        printf("\n");
        for (int i = 0; i < S; i++)
        {
            printf("%3d   ", A[i]);
        }
        printf("\n");
    }

    return 0;
}
```

# 3. unpacked & unsorted

unpacked에서는 효율적인 연산을 위하여 해당 위치에 데이터가 있는지 추가로 저장할 필요가 있다. 또한 추가적으로, insert와 delete에서 시간을 절약하기 위해 `free list`와 비슷한 개념을 사용하게 된다. 앞으로 데이터는 아래와 같은 형식으로 저장되거나 업데이트 될 것이다.

1. 해당 위치에 데이터가 있는 경우 : 데이터에는 의미있는 값이 저장된다

2. 해당 위치에 데이터가 없는 경우 : 데이터에 다음 비어있는 공간의 인덱스가 저장된다!

   이렇게 저장해줌으로써, 빈 공간을 `Linked List`처럼 관리할 수 있게 된다. 최초의 빈 공간은 따로 변수로 관리한다.(head의 역할)

- Search

  정렬되어있지 않으므로 선형탐색을 해야한다. `O(n)`의 시간이 걸릴 것이고, 비교하면 packed보다는 (빈 공간 역시 탐색하므로) 더 오래 걸릴 것이다.

- Insert

  해당 데이터가 없다면 빈 공간(데이터가 없는 공간)에 삽입할 것이다. 빈 공간을 탐색하는 것은 `O(n)`만큼 걸리겠지만, 위의 free list 개념을 이용하면, 상수시간에 해결 가능하다.

- Delete

  해당 데이터가 있다면 해당 위치에 데이터가 없다고 표시해준다. 또한, 해당 위치의 데이터는 다음 비어 있는 공간의 인덱스로 저장하도록 한다. 역시 상수시간에 가능하다.

코드는 아래와 같다.

