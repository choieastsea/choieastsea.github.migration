---
emoji: 😬
title: (Alg) Prefix Sum 부분합 문제 해결하기
date: '2022-03-14 00:00:00'
author: choieastsea
tags: DS, Algorithm, Prefix, codeforces
categories: Alg
---

prefix sum은 자주 등장하는 주제이고, 알고 있으면 매우 유용하다. 개념에 대하여 익히고, 문제를 몇개 풀어보는 시간을 가져보자.

# Prefix sum 이란

숫자형 데이터로 이루어진 배열에서, 현재까지의 원소들의 합을 의미한다.

예를 들어, a = [1,3,-5,2,7]의 prefix sum array를 구하면 P= [1,4,-1,1,8] 이다. **누적합**이라고 보면 편할 것이다! Prefix sum 배열을 앞으로 P라고 부르겠다.

## prefix sum을 이용하여 구간합 구하기

몇가지의 특징이 있는데, 우선 **P의 마지막 원소는 배열 원소의 총합**이라는 것이다. 

또한 구간의 합을 구할때, P를 이용하여 다음과 같이 구할 수 있다. a[3]~a[7]까지의 합은 P[7]-P[2]와 같다. 굳이 공식화 하자면, **summation from a[i] to a[j] = P[j]- P[i-1]** 라고 할 수 있겠다. 이는 구간의 합을 O(1)에 구할 수 있는 매우 좋은 방법이다! 물론 초기화하는데 O(n)이 걸리긴 하지만, 한번 구하고 반복적으로 구간의 합을 구한다면 훨씬 좋은 성능을 낼 것이다.

마지막으로, **a[i] = P[i] - P[i-1]**임을 알 수 있다. 외울 필요 없이 자연스럽게 알 수 있다.

## prefix sum array O(n) 시간에 초기화 하기

처음 P를 초기화 할때 나는 아래와 같이 했었다.

```cpp
int a[] = {1, 2, 3, 4, -5, 0, 3};
int p[7] = {0};
for (int i = 0; i < 7; i++)
{
    int sumI = 0;
    for (int j = 0; j <= i; j++)
    {
        sumI += a[j];
    }
    p[i] = sumI;
}
```

이는 P[i]가 a[0]부터 a[i]까지 더한 값이라는 특성을 이용하여 구한 것인데, O(n^2)시간이 걸린다는 단점이 있다. 따라서 prefix sum의 특징 중 마지막 수식에서 점화식을 유도해볼 수 있다. 

P[i] = P[i-1] + a[i] 임을 이용하여 초기화 하는 것이다. 단, 여기서는 i가 1이상이여야 하므로 <u>배열을 1번 인덱스부터 채우는 것이 편하다</u>.

```cpp
int a[] = {0, 1, 2, 3, 4, -5, 0, 3};
int p[7] = {0};
for (int i = 1; i <= 7; i++)
{
    p[i] = p[i - 1] + a[i];
}
```

이는 O(n)시간으로 prefix sum array를 초기화시켜줄 수 있으므로 알고 있으면 좋을 것이다! 

이제, prefix sum을 이용한 문제를 3개 정도 풀어보자. prefix sum을 이용하는지 판단하는 근거는 "누적합" 혹은 "연속된 구간의 합"이라고 보면 되겠다. c++ 실력이 낮아 공부하면서 풀어보았다.

# 문제 풀이

## codeforces 1003C

[C,Intense Heat](https://codeforces.com/problemset/problem/1003/C)

문제를 요약하면 다음과 같다.

- input : n(총 데이터 수), k(연속된 구간의 최소 길이), sequence of temperature

- output : 최고의 평균을 갖는 구간의 평균 온도

구간의 평균은 곧 구간의 합, prefix sum과 관련이 있다. 최대 합을 갖는 구간을 찾으려면, 단순하게 P[i]-P[j] (단, i-j는 k보다 커야함)를 해보면서 평균깂이 최대인 구간을 찾으면 될 것 같다.

for문은 아래와 같이 생각한다.

1. 구간 길이 k : 1~k까지의 평균, 2~k+1까지의 평균

2. 구간 길이 k+1 : 1~k+1까지의 평균, ...

   ...

n-k+1. 구간 길이 n : 1~n까지의 평균

-> i. 구간 길이 i : 1~i까지의 평균, 2~i+1까지의 평균, ... **j ~ i+j-1**까지의 평균, ... n-i+1 ~ n까지의 평균

코드는 다음과 같다.

```cpp
#include <iostream>
#include <bits/stdc++.h>

using namespace std;

int main()
{
    int n, k;
    cin >> n >> k;
    int *temp_arr = new int[n + 1];
    int *P = new int[n + 1];
    // initialize Prefix sum array
    P[0] = 0;
    for (int i = 1; i <= n; i++)
    {
        cin >> temp_arr[i];
        P[i] = P[i - 1] + temp_arr[i];
    }
    double answer = 0.0;
    for (int i = k; i <= n; i++)
    {
        for (int j = 1; j <= n - i + 1; j++)
        {
            answer = max(answer, (double)(P[i + j - 1] - P[j - 1]) / (double)(i));
        }
    }
    cout.precision(10);
    cout << answer << endl;
    delete[] temp_arr;
    delete[] P;
    return 0;
}
```

단순하게 출력하였더니 정밀도의 문제가 생겨, cout.precision(10)으로 정밀도를 높여서 하니 해결되었다. 

## codeforces 466C

[C.Number of Ways](https://codeforces.com/contest/466/problem/C)

배열이 있는데, 이를 합이 같은 세 개의 구간으로 나눌 수 있는지 여부를 판단하고 그 경우의 수를 세는 문제이다. 각 구간은 최소 한개 이상의 원소를 갖고 있어야 한다.

- input : n(배열의 길이), 배열 원소(각 원소는 int 범위보다 크니까 주의)
- output : count(합이 같은 세개의 구간의 수)

우선 세 구간의 합이 같다는 말은 전체합은 3의 배수라는 것이다. 그럼 아래와 같이 세면 될 것 같다.

1. P[n]이 3*t인지 확인
2. P[x]가 t인지 확인
3. 1&2&P[y]가 2*t인 곳 있을때마다 count +=1

하지만, 위와 같이 하면 2중 loop를 돌게 되는데 시간 초과 오류가 나온다... 따라서 아래와 같은 방법도 있다고 한다.

1. P[n]이 3*t인지 확인
2. P[x]가 2*t이면, 그 앞의 P[x]가 t인 지점들을 모두 카운트해주기

주의할 점은 배열의 합이 0이 되는 경우가 문제가 될 수 있다. [0, 1, -1, 0]과 같이,

코드는 아래와 같다. 전 문제와 다르게 동적 할당을 하면 시간이 더 오래걸리는 것 같아, 정적 배열로 선언하였다.

```cpp
#include <iostream>
#include <bits/stdc++.h>

using namespace std;

int main()
{
    long long n, a[500000], P[500000];
    cin >> n;
    P[0] = 0;
    for (long long i = 1; i <= n; i++)
    {
        cin >> a[i];
        P[i] = P[i - 1] + a[i];
    }
    long long count = 0;
    if (P[n] % 3 == 0)
    {
        long long total3 = P[n] / 3;
        long long countOf1 = 0;
        for (long long i = 1; i < n; i++)
        {
            if (P[i] == 2 * total3)
            {
                count += countOf1;
            }
            if (P[i] == total3)
            {
                countOf1++;
            }
        }
    }
    cout << count << endl;
    return 0;
}
```



## codeforces 1285B

[B. Just Eat It!](https://codeforces.com/contest/1285/problem/B)

복잡하지만 다음과 같다.

Yasser라는 사람과 Adel이 각자 정수형 배열에서 점수를 매겨 Yasser가 이기는지, 아닌지를 보이면 된다.

- Yasser : 배열 모든 원소의 합으로 점수 매김

- Adel: 배열 원소의 구간합으로 점수를 매김(단, 모든 원소의 합은 안됨)

자연수가 아닌 정수 배열이므로, Adel이 이기는 경우도 존재할 것이다. 주의할 점은 Adel이 모든 원소의 합을 구하면 안된다는 점인데, 그럼 Yasser가 항상 이길 수 없기 때문이므로 예외처리를 해줘야 할 것 같다.

- input : t(test case), n(length of array), array_1, ... , array_t
- output: 각 케이스 별 YES / NO 출력

(n과 각 배열은 int 범위를 넘어갈 수 있으니 주의한다) Yasser의 score는 전체 배열의 합이므로 P[n]과 같고, Adel은 나올 수 있는 최대의 점수를 Yasser과 비교하면 된다. 하지만, P[i]-P[j]를 돌리면 O(n^2)이 걸리므로 다른 아이디어를 적용해야한다. **따라서 O(n)으로 하기 위해, 단순 for문으로 P[i]를 탐색하면서 P[i]에서 여태까지 P중 최솟값을 빼주면 P[i]에서 끝나는 조각 중 가장 큰 점수가 된다**. 이를 Yasser의 score와 비교해주면 될 것이다.

하지만, 전제에 의해 조각이 전체가 되면 안되므로 이를 처리해줘야 하는데 두가지 방법이 있다.

1. P[1]에서 끝나는 조각... P[n-1]로 끝나는 조각의 최대합 을 구하고, P[2]~P[n]까지 조각 중 최대 값을 또 구한다.
2. P[1]~P[n]까지 순차탐색하는데, P[1]이 가장 작고 P[n]에서 끝나는 경우(즉, 전체인 경우)는 인정하지 않는다.

1번은 탐색을 2번해야하고, 2번은 한번의 탐색에 한가지 예외를 붙여주는 것이라 2번으로 구현해보았다.

코드는 다음과 같다.

```cpp
#include <iostream>
#include <bits/stdc++.h>

using namespace std;

int main()
{
    int test_case;
    long long n;
    cin >> test_case;
    while (test_case--)
    {
        cin >> n;
        long long score_arr[100001];
        long long P[100001]; // prefix sum array
        // initialize Prefix sum array
        P[0] = 0;
        for (int i = 1; i <= n; i++)
        {
            cin >> score_arr[i];
            P[i] = P[i - 1] + score_arr[i];
        }

        long long yasser_score = P[n];
        int ans = 1;
        long long min_of_p = 0;
        int min_index = 0;
        long long *Adel_comb = new long long[n + 1];
        for (int i = 1; i <= n; i++)
        {
            if (min_index == 0 && i == n)
            { //조각이 전체인 경우. 이 경우는 문제 조건에 의하여 불가능.
                continue;
            }
            Adel_comb[i] = P[i] - min_of_p; // i에서 끝나는 조각 중 가장 합이 큰 조각의 점수
            if (min_of_p >= P[i])
            { // 더 작은 값 있다면 업데이트
                min_index = i;
                min_of_p = P[i];
            }
            // cout << i << "에서 끝나는 최대 조각의 합: " << Adel_comb[i] << ", yasser : " << yasser_score << endl;
            if (Adel_comb[i] >= yasser_score)
            {
                ans = 0;
                break;
            }
        }
        if (ans == 1)
        {
            cout << "YES" << endl;
        }
        else
            cout << "NO" << endl;
    }

    return 0;
}
```

결론은 배열에서 구간의 합을 반복적으로 구하는 문제가 나온다면 Prefix sum 배열을 초기화 해놓고 사용할 생각을 하면 될 것 같다. 하지만, O(n^2)이 시간 초과가 되는 경우, **O(n)으로 줄일 수 있는 아이디어를 생각하는 것이 더 중요**할 것 같다. 아래의 두 문제는 O(n^2)으로 제출시 시간초과가 발생하였고, 아래와 같이 해결할 수 있었다.

1. 순차적인 조건이 2가지(A→B) 있는 경우, A가 충족될때 B를 구할 수도 있지만, B가 충족될때 A를 모두 포함해주는 방법도 있다.
2. 차의 최대는 최대- 최소이므로, 각 엔트리별로 돌면서 최솟값을 빼주는 방향으로 시간을 줄일 수 있었다.

난 이런 것들을 생각해낼 수 없겠지...🤣

