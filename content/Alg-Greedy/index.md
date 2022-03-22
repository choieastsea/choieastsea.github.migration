---
emoji: 😬
title: (Alg) Greedy Algorithm. 그리디(탐욕) 기법으로 문제 해결하기
date: '2022-03-19 00:00:00'
author: choieastsea
tags: DS, Algorithm, greedy, codeforces
categories: Alg
---

Greedy 알고리즘의 개념에 대하여 익히고, 문제를 몇개 풀어보는 시간을 가져보자.

# Greedy란

욕심쟁이기법이라고도 한다. 매 과정에서 최적 선택을 고르고, 이것이 곧 전체의 최적 선택이 되는 것을 의미한다.

## Greedy 문제의 증명 방법

문제를 greedy하게 풀어야겠다는 생각이 들면, 보통 문제의 제약 조건 안에서 최적의 선택을 수행하면 된다. 뭔가 그렇게 푸는게 맞을거 같은데, 확신하기 어려운(증명하기 어려운) 경우가 종종 발생하는데, 이는 간단하게 **귀류적으로 생각**하면 된다. A, B, ... , C 중에서 현재 가장 최적의 A를 골랐다고 해보자. 만약 A를 선택하지 않고 다른 B나 C를 선택하였을 경우, A를 선택하였을 경우보다 더 좋은 답을 얻지는 못한다는 것을 보이면 된다. 따라서 A를 선택하는 것이 최적이고, 답이라는 결론을 얻을 수 있다.

# 문제 풀이

## codeforces 734B

[B. Anton and Digits](https://codeforces.com/problemset/problem/734/B)

2,3,5,6이 적혀 있는 카드들이 있을 때, 여기서 32와 256을 만들려고 한다. 이 카드들로 만들수 있는 조합 중 가장 그 합이 큰 수를 구하면 되는 것이다.

- input : (순서대로) k2 k3 k5 k6 (kn은 n의 카드 갯수) 
- output : maximum sum of 32 and 256

256의 갯수를 a, 32의 갯수를 b라고 했을 때 합은 `256*a+32*b`임을 알 수 있다. 합이 최대가 되기 위해서는 a가 커야한다. 따라서, 256을 최대한 많이 만드는 방법으로 greedy하게 진행한다. 256과 32가 만들어질 때 공통적으로 필요한 숫자는 2인데, 2는 최대한 256에게 붙어서 만들어져야 한다. 그 이유는 2가 하나 있고 256또는 32를 만들 수 있다고 가정했을 때, 256이 32보다 더 크므로 합이 최대가 되기 위해 32를 고르면 256을 고르는 것 보다 합이 작아지기 때문이다. 따라서 코드는 다음과 같다.

```cpp
#include <iostream>
#include <bits/stdc++.h>

using namespace std;

int main()
{
    int k2, k3, k5, k6;
    cin >> k2 >> k3 >> k5 >> k6;
    int a = min(min(k2, k5), k6);
    k2 -= a; // k2>=0
    int b = min(k2, k3);
    cout << 256 * a + 32 * b << endl;
    return 0;
}
```



## codeforces 158B

[B.Taxi](https://codeforces.com/problemset/problem/158/B)

1명에서 4명 사이의 그룹을 이루고 있는 아이들이 있다. 이 아이들이 4인승 택시를 타려고 하는데, 같은 그룹은 무조건 한 택시에 타도록 하는 최소 택시 수를 구하는 문제이다.

- input : n(그룹의 수) / s1 s2 ... sn(1~4명 사이의 그룹 리스트)
- output : 필요한 최소의 택시 수

4인승 택시를 가장 적게 타려면, 택시에 최대한 인원을 4명을 맞춰서 타야한다. 만약, 그러지 않고 인원을 줄여서 타면 택시의 수가 더 늘어날 수 밖에 없기 때문이다. 따라서, 아래와 같이 이용하면 될 것이다.

- 4명의 경우 한 그룹이 택시 한대를 차지
- 3명의 경우, 1명 그룹과 택시 한대를 차지
  - 위 결과, 3명 그룹이 남는 경우 : 한자리를 비운채로 3명이서 택시 한대를 차지한다.
  - 위 결과, 1명 그룹이 남는 경우 : 다음 단계 진행한다.
- 2명 그룹 둘이서 택시 한대를 차지
  - 2명 그룹이 남지 않는 경우(k2가 짝수) : 다음 단계 진행한다.
  - 2명 그룹이 하나 남는 경우 : 1명 그룹을 최대 2팀 더 태워 택시 한대를 차지한다.
- 1명 그룹이 남은 경우 : 4명당 한 대의 택시를 차지한다. 마지막에 1~3명이 남는다면, 택시 한대를 추가적으로 차지한다.

좀 귀찮긴 하지만, 위의 경우를 모두 생각할 필요가 있다. c라는 배열을 만들어서, i번째 인덱스에 i명 그룹의 수가 되도록 초기화를 해준 후 진행하였다. 코드는 아래와 같다.

```cpp
#include <iostream>
#include <bits/stdc++.h>

using namespace std;

int main()
{
    int n;
    int c[] = {0, 0, 0, 0, 0};
    int k;
    cin >> n;
    for (int i = 0; i < n; i++)
    {
        cin >> k;
        c[k] += 1;
    }
    int taxi_count = 0;
  	// 4명이서 택시 하나
  	taxi_count += c[4];
  	// 3명 + 1명이서 택시 하나
    taxi_count += c[3];
    c[1] -= min(c[3], c[1]);
  	// 2명끼리 택시 하나
    taxi_count += c[2] / 2;
    c[2] %= 2;
    // 2명 + 1명 + 1명
    if (c[2] == 1)
    {
        taxi_count++;
        c[1] -= 2; //일단 줄이고 생각해도 됨
    }
    //나머지 1명이서 
    if (c[1] > 0)
    {
        taxi_count += c[1] / 4;
        c[1] %= 4;
        if (c[1] > 0)
        {
            taxi_count ++;
        }
    }
    cout << taxi_count << endl;
    return 0;
}
```



## codeforces 160A

[A.Twins](https://codeforces.com/problemset/problem/160/A)

동전이 n개 있고, 각 동전에는 숫자가 적혀있다. 만약, 쌍둥이와 이 동전들을 나눠가지려고 할 때, 내가 더 많은 값의 동전을 가져가는 최소의 동전의 수를 묻는 문제이다.

- input : n(number of coins)/ a1  a2  ...   an (동전에 적혀있는 숫자)
- output : 절반 초과를 차지하기 위한 최소한의 동전 숫자

a1부터 for 루프로 더해가며 절반 초과가 되는 최초의 i를 발견하면 될 것 같지만, 이는 옳지 않다. 왜냐하면 그거보다 더 적은 조합으로 동전의 합을 더 크게 할 수 있기 때문이다. 따라서 동전의 <u>값어치에 따라 정렬(sort)을 하고, 큰 값어치의 동전부터 하나씩 가져가면서 절반 초과가 되는 지점을 찾는</u> 것이 맞다. n이 100 이하이므로, a라는 정적배열을 생성하여 동전의 값들을 기록하도록 하였다.

```cpp
#include <iostream>
#include <bits/stdc++.h>

using namespace std;

int main()
{
    int n, total = 0;
    cin >> n;
    int a[100];	//동전 배열
    for (int i = 0; i < n; i++)
    {
        cin >> a[i];
        total += a[i];
    }
    sort(a, a + n);
    int count = 0;
    int sum = 0;
    int std = total / 2;
    for (int i = n - 1; i >= 0; i--)
    {
        count++;
        if (sum + a[i] > std)
        {
            break;
        }
        else
        {
            sum += a[i];
        }
    }
    cout << count << endl;
    return 0;
}
```

# 결론

greedy는 문제의 추가적인 제약 조건을 잘 살피고 풀도록 하자. 현재 선택하는 최적에 대한 확신이 없을 때에는, 차선이나 다른 방안을 선택했을 때 더 좋아지지 않는다는 것을 보임으로써 확신을 가질 수 있다.

