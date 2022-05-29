---
emoji: 😬
title: (Alg) 그래프 알고리즘 - Dijkstra와 최단 경로 출력
date: '2022-05-28 00:00:00'
author: choieastsea
tags: DS, Algorithm, Dijkstra, codeforces
categories: Alg
---

Dijkstra(다익스트라) Algorithm은 그래프에서, **한 노드에서 출발하여 다른 노드로 가는 최단 거리**를 구할 때 사용할 수 있는 알고리즘이다. 더 나아가, 출발해서 도착할 때까지의 최단 경로를 구할 수도 있다.

## 문제 설명

input : 첫줄에는 노드갯수와 엣지갯수, 두번째줄부터 엣지 정보(노드 번호 두개와 edge weight)

output : 1번노드에서 n번노드까지의 최단 거리

​	(입력 예시)

```
5 6
1 2 2
2 5 5
2 3 4
1 4 1
4 3 3
3 5 1

```

# 그래프를 표현하는 방법

weighted graph를 표현하는 방법은 크게 두가지로 나눠볼 수 있는데,

1. 노드~노드간의 관계이므로, 노드가 n개일때 n*n matrix를 만들고, cell에 weight를 적는다.

   4번 노드와 3번 노드를 잇는 엣지의 길이가 5이면, `matrix[4][3]=5`와 같이 표현하면 된다. 다만, 이는 두 노드를 잇는 여러 엣지가 존재할 때 구조의 변경이 불가피하다.

2. 한 노드에 인접한 노드에 대하여 (weight, 노드번호)를 모든 노드마다 갖도록 한다. (노드번호, weight)로 저장해도 헷갈리지만 않으면 좋다!

   위와 같은 상황일때, `node_4의 인접노드 : (5, 3번)`와 같이 표현할 수 있다.

2의 방법이 공간적으로 효율적이고 여러 엣지가 존재할 경우도 활용이 가능하다. `c++`에서는 pair와 vector배열을 이용하여 입력에 대하여 인접노드를 추가하는 형태로 표현할 수 있다. 

```c++
#include <bits/stdc++.h>
#include <iostream>

using namespace std;

vector<pair<int, int>> E[100005];
int main(void)
{
    int n, m; // number of nodes, number of edges
    cin >> n >> m;
    for (int i = 0; i < m; i++)
    {
        int from, to, weight;
        cin >> from >> to >> weight;
        E[from].push_back(make_pair(to, weight));
        E[to].push_back(make_pair(from, weight));
    }
   ...
}
```

전역변수 E에 모든 엣지의 정보가 저장되어 있으므로, 이를 탐색하며 최단거리를 구할 수 있다.

# Dijkstra 의사 코드

위와 같이 그래프를 만들고 나서는 다익스트라 알고리즘을 이용하여 그래프를 탐색하며 최단거리를 구할 수 있다.

(1번노드에서 출발하여 n번노드까지의 최단거리를 구하는 다익스트라 알고리즘이라고 가정해보자) 우선 출발지부터 i번 노드까지의 최단거리를 기록하는 `D[i]`가 필요하다. D 배열의 각 원소는 처음에 매우 큰 값으로 세팅하도록 하고, 이후 탐색하면서 더 작은 비용의 거리가 발견된다면 업데이트 되도록 하므로, 큰 값으로 초기화를 해준다.

- 1번노드~1번노드의 거리는 0이므로, 이를 priority queue(이하 pq, 방문할 노드를 엣지의 거리 순으로 저장함)에 저장한다. D[시작노드] = 0 임을 확정짓는다.

  - pq가 비어있을때 까지

  1. pq에서 가장 거리가 짧은 엣지를 찾는다. 노드 번호 : `curNode`, 엣지 길이 : `curDist`

  2. pq에서 해당 엣지(ex. x번 노드까지의 거리)을 제거한다. (방문 처리)

  3. 만약 `D[curNode]`가 `curDist`보다 작지 않은경우, (D[ ] 업데이트 필요)

     1. curNode의 인접한 노드들을 조사하는데...
     2. `D[x]`와 `D[curNode]+curNode~x의 거리`를 비교하여 더 작은 값으로 X 노드까지의 최단거리를 업데이트한다.

     2. 업데이트 되는 경우에는 해당 엣지 정보를 pq에 추가한다.

주의해야할 점은 크게 두가지가 있다.

- 인접한 엣지 중에서 가장 weight가 짧은 것을 추출하는 과정에서, 일반 배열로 저장하는 것(`O(N)`)보다는 PQ로 저장하는 것(`O(log(N))`)이 효율적이다.
- A에서 C까지의 최단경로를 볼 때, 임의의 노드 B에서 A~B + B~C까지의 거리와 A~C의 거리를 비교하고, 더 짧은 것으로 거리를 확정짓는 것이 다익스트라의 핵심이다.

코드는 아래와 같다. 만약 endNode가 추가적으로 필요하다면, 인자에 추가하고 endNode탐색시 종료하면 된다.

```c++
void dijkstra(int startNode)
{
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq; // (weight, nodeNo)
    // startNode PQ에 추가

    pq.push(make_pair(0, startNode));
    d[startNode] = 0;
    while (!pq.empty())
    {
        int curNode = pq.top().second;
        int curDist = pq.top().first;
        // printf("curNode : %d, curDist : %lld\n", curNode, curDist);
        //해당 노드 방문 처리
        pq.pop();
        if (d[curNode] >= curDist)
        {
            for (int i = 0; i < E[curNode].size(); i++)
            {
                //최단 거리 노드의 인접노드
                int nextNode = E[curNode][i].second;
                int nextDist = E[curNode][i].first;
                // printf("nextDist : %lld, nextNode: %d\n", nextDist, nextNode);
                if (d[curNode] + nextDist < d[nextNode])
                {
                    // printf("update needed\n");
                    // update 필요
                    d[nextNode] = d[curNode] + nextDist;
                    // pq push
                    pq.push(make_pair(nextDist, nextNode));
                }
            }
        }
    }
}
```

## 다익스트라에서 경로를 표현하는 방법

위의 코드는 단지 x번 노드부터 n번 노드까지의 최단거리를 의미한다. 따라서, 어떠한 경로를 통하여 갔는지는 추가적인 작업이 필요하다. 이는 최단거리가 업데이트되어 확정되는 순간에 **해당 노드를 방문하기 직전의 노드를 기록하면 된다**! nextNode와 curNode를 통하여 최단거리를 비교하는 과정에서, 업데이트가 일어나면(최단거리 확정이 일어나면) 배열에다가 curNode를 저장하면 될 것이다. 

그렇게 하면 1 -> 4 -> 3 -> 5의 경로로 최단경로가 확정될 때, [0, 1, 0, 5, 0, 3]와 같이 저장될 것이다. 이를 스택에다가 넣어서 출력하면 깔끔하게 나올 것이다. 최종 코드는 다음과 같다. `codeforces 20C`문제에 대한 코드이다.! 결국 다익스트라가 이러한 틀로 구성되니까 참고하면 좋을 것이다.

```c++
#include <bits/stdc++.h>
#include <iostream>

using namespace std;

vector<pair<int, int>> E[100005];
long long d[100005];
int prevNode[100005]; // 최단경로에서 i번째 노드의 이전 노드를 저장

void dijkstra(int startNode, int endNode)
{
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> pq; // (weight, nodeNo)
    // startNode PQ에 추가

    pq.push(make_pair(0, startNode));
    d[startNode] = 0;
    prevNode[startNode] = startNode;
    while (!pq.empty())
    {
        int curNode = pq.top().second;
        int curDist = pq.top().first;
        // printf("curNode : %d, curDist : %lld\n", curNode, curDist);
        //해당 노드 방문 처리
        pq.pop();
        if (d[curNode] >= curDist)
        {
            for (int i = 0; i < E[curNode].size(); i++)
            {
                //최단 거리 노드의 인접노드
                int nextNode = E[curNode][i].second;
                int nextDist = E[curNode][i].first;
                // printf("nextDist : %lld, nextNode: %d\n", nextDist, nextNode);
                if (d[curNode] + nextDist < d[nextNode])
                {
                    // printf("update needed\n");
                    // update 필요
                    d[nextNode] = d[curNode] + nextDist;
                    // for path
                    prevNode[nextNode] = curNode;
                    // pq push
                    pq.push(make_pair(nextDist, nextNode));
                }
            }
        }
    }
}

int main(void)
{
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
    int n, m, from, to, weight; // n : number of nodes, m : number of edges
    cin >> n >> m;
    for (int i = 0; i < m; i++)
    {
        cin >> from >> to >> weight; // 1-based-node
        E[from].push_back(make_pair(weight, to));
        E[to].push_back(make_pair(weight, from));
        // printf("from : %d, to : %d, weight : %lld\n", from, to, weight);
    }
    for (int i = 1; i <= n; i++)
    {
        d[i] = LLONG_MAX;
    }
    dijkstra(1, n);
    if (d[n] == LLONG_MAX)
    {
        // update되지 않았다 -> 경로 없다
        printf("-1\n");
        return 0;
    }
    int c = n;
    stack<int> path;
    while (c != 1)
    {
        // printf("%d ", c);
        path.push(c);
        c = prevNode[c];
    }
    path.push(c);
    while (!path.empty())
    {
        printf("%d ", path.top());
        path.pop();
    }
    printf("\n");
    return 0;
}
```

