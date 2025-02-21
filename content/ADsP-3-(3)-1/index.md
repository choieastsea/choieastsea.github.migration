---
emoji: 🚀
title: (ADsP) 3과목(데이터 분석) 3장. 정형 데이터 마이닝 (上)
date: '2022-02-20 00:00:00'
author: choieastsea
tags: ADsp, 데이터분석준전문가, 빅데이터, 통계
categories: ADsP
---

본 글은 본인이 '데이터 분석 준전문가' 필기 시험을 준비하면서 개인적으로 작성하는 글이라 일부 이해가 되지 않고 부정확할 수 있음을 밝힙니다. 모두 화이팅^^

# 데이터 마이닝

> 데이터 마이닝의 기초 개념들을 학습한다.
>
> 분석모형 구축과 테스트를 위한 데이터 분할에 대해 학습한다.

## 데이터 마이닝 개요

데이터마이닝(Data Mining)은 방대한 양의 데이터 속에서 숨겨진 규칙, 패턴 등을 찾아내어 예측하거나 의사결정에 활용하는 것을 목적으로 한다. 가설과 검정의 과정이 선택적이라는 점에서 통계분석과 구분된다.

### 데이터 마이닝의 종류

- 데이터 마이닝 방법에 따라... 지도학습 vs 비지도학습

  정답지가 주어지냐에 따라 나뉜다. 독립변수에 따라 종속변수가 있다면 지도학습으로 볼 수 있다.

  | 지도학습                                                     | 비지도학습                                                   |
  | ------------------------------------------------------------ | ------------------------------------------------------------ |
  | 회귀(연속형) : 선형회귀분석, 의사결정나무, SVR, 신경망 모형, 릿지, 라쏘 | 군집 : K-means, SOM, DBSCAN, 병합 군집, 계층 군집<br />연관 : Apriori |
  | 분류(범주형) : 로지스틱 회귀분석, 신경망 모형, 의사결정나무(분류트리모형), k-NN, 앙상블, SVM, 나이브 베이즈 분류 | 차원축소 : PCA, LDA, SVD, MDS                                |

- 데이터 마이닝 분석 목적에 따라... 분류분석 vs 군집분석 vs 연관분석

  - 분류(Classification) 분석 : 지도학습 중 하나로 데이터가 <u>어느 그룹에 속하는지</u> 판별하고자 하는 기법
  - 군집(Clustering) 분석 : 비지도 학습 중 하나로 데이터간 유사성을 측정하여 <u>하나의 그룹으로 묶는 기법</u>
  - 연관(Association) 분석 : 비지도학습 중 하나로 장바구니 분석. 데이터간 연관성을 파악하는 분석

### 데이터 마이닝의 프로세스

목적 정의 → 데이터준비 → 데이터가공 → 데이터 마이닝 기법 적용 → 검증

## 데이터 분할

데이터를 훈련(train), 검정(validation), 평가용(test) 등의 데이터로 분할한다.

### 과적합과 과소적합

데이터가 훈련용 데이터에 의해 너무 많이 설명되면 모델이 복잡해지고 설명이 어려워지며 예측이 힘들어짐→과적합

데이터 부족 문제 등으로 인하여 모델이 너무 단순하여 데이터를 충분히 설명하지 못하게 됨 → 과소적합

### 데이터 분할을 통한 검증(!)

1. 홀드아웃

   전체 데이터를 *랜덤*하게 추출해 학습 데이터와 테스트 데이터로 분리하는 방식.

   보통 학습 데이터는 80%, 테스트 데이터는 20% 혹은 학습 60, 검증 20, 테스트 20으로 분할한다. 검증세트에서 만족할 만한 성능이 나온 하이퍼파라미터를 이용하여 테스트 세트에서 모델의 일반화 성능을 추정한다.

2. k-Fold 교차검증

   전체 데이터셋을 k개의 집단으로 구분한 뒤 <u>k-1개를 훈련용 데이터로, 나머지 1개를 평가용 데이터</u>로 사용하여 이를 종합하여 최종 모델을 구축하는 방법이다. 

   **과소적합 방지**하나, k번의 모델 구축으로 많은 시간 소요

3. 붓스트랩(bootstrap)

   신뢰도를 높여 성능을 개선하기 위해 표본을 다시 추출하는 방법의 일종. <u>중복과 복원추출</u>을 허용한다.

   데이터셋의 분포가 고르지 않은 경우에 사용되며 **과적합을 줄이는데** 도움이 됨

4. 계층별 k-겹 교차 검증(Stratified k-fold cross validation)

   불균형 데이터를 분류하는 문제에서 사용됨. k-fold와 비슷하지만, 각 폴드가 갖는 레이블의 분포가 유사하도록 폴드를 추출하여 교차검증을 실시한다.

# 분류분석

> 분류분석을 통한 예측모형을 수립하는 방법을 학습한다.
>
> 다양한 분류분석 방법을 익히고 예측력이 높은 모형으로 개선하는 방법을 학습한다.

분류분석은 회귀분석과 더불어 대표적인 지도학습이다!

## 로지스틱 회귀 분석

회귀분석을 분류에 이용한 방법으로, 독립변수의 선형결합을 이용해 사건의 발생 가능성을 예측하는 분석방법.

ex) 고객을 재구매 고객과 처음 구매한 고객으로 분류

종속변수가 **범주형 변수(명목, 순위)**일 때 사용한다. 종속변수가 보통 두가지의 경우만 되는 이항변수이다.

### 오즈(Odds)

성공할 확률을 P라고 했을 때, **성공할 확률이 실패할 확률의 몇배인지**를 나타내는 값 :  `P/(1-P)`

### 로짓 변환

오즈를 로그 씌워서 <u>정규분포에 비슷한 모양으로 맞추는 변환</u>과정. 이를 통하여 확률 등의 분석이 용이해진다. 이를 종속변수로 하여 선형회귀모형을 만든 것이 로지스틱 회귀분석이다.

### 시그모이드 함수

로짓함수와 역함수 관계로, 로지스틱 회귀분석과 인공신경망 분석에서 활성화 함수로 활용된다. 

### 로지스틱 회귀분석 실습 : glm()함수

mtcars dataset을 이용하여 로지스틱 회귀분석을 해보자. 데이터의 열 중 `vs` 엔진의 종류를 의미하는 0(자동)과 1(수동)의 두가지로 이루어져 있는 범주형 변수이다. 따라서 vs를 종속변수로 하는 로지스틱 회귀분석을 해줄 수 있다. 독립변수는 mpg(연비), am(변속기)로 해주자.

```R
> glm_vs <- glm(data=mtcars, vs~mpg+am, family=binomial)	#binomial 해줘야 로지스틱 회귀분석
> summary(glm_vs)

Call:
glm(formula = vs ~ mpg + am, family = binomial, data = mtcars)

Deviance Residuals: 
     Min        1Q    Median        3Q       Max  
-2.05888  -0.44544  -0.08765   0.33335   1.68405  

Coefficients:
            Estimate Std. Error z value Pr(>|z|)   
(Intercept) -12.7051     4.6252  -2.747  0.00602 **
mpg           0.6809     0.2524   2.698  0.00697 **	#회귀계수 유의함 ->귀무가설(회귀계수가 0이다) 기각
am           -3.0073     1.5995  -1.880  0.06009 . 	#회귀계수 p값이 0.05내는 아님
---
Signif. codes:  0 ‘***’ 0.001 ‘**’ 0.01 ‘*’ 0.05 ‘.’ 0.1 ‘ ’ 1

(Dispersion parameter for binomial family taken to be 1)

    Null deviance: 43.860  on 31  degrees of freedom	#절편만 포함한 모형의 완전모형으로의 이탈도(작을수록 모형에 가깝다)
Residual deviance: 20.646  on 29  degrees of freedom	#독립변수들이 추가된 모형의 이탈도
AIC: 26.646

Number of Fisher Scoring iterations: 6
 
 > 1-pchisq(43.860, df= 31)	#절편만 있는 경우 -> 기각 불가. 완전모형에 가깝다.
[1] 0.06273542
> 1-pchisq(20.646, df=29)	#독립변수 포함된 경우 -> 기각 불가. 완전모형에 가깝다.
[1] 0.8717172
```

만약 독립변수에 의해 종속변수가 완전하게 분리가 가능하다면, 경고문구가 나올 것이다. 이는 분석이 무의미하므로 독립변수를 조정해주도록 하자.

mpg의 회귀계수가 0.6809이므로 mpg가 1 증가하면 vs가 0에서 1일 확률이  exp(0.6809) ≒1.98배(98%) 증가한다고 볼 수 있다. 마찬가지로 am의 회기계수를 통하여 am이 1 증가하면 vs=1일 오즈가 exp(-3.0073) ≒ 0.05배, 즉 95% 감소함(0일때에 비해 1이, 자동일때에 비해 수동이)을 확인할 수 있다.

<u>즉, 회귀계수를 통하여 범주형 종속변수가 변할 때 `exp(회기계수)`만큼 변한다는 것을 알 수 있다!!</u>

## 의사결정나무

자료에서 특정 분리 규칙을 찾아내고, 그에 따라 몇 개의 소집단으로 분류하는 분석방법이다.  올바른 분류를 위해서는 상위 노드에서 하위노드로 갈수록 집단 내에 동질성이 커지고, 집단 간 이질성이 커져야한다.

의사결정나무는 종속변수가 **연속형인 회귀트리**, 종속변수가 **이산형인 분류트리**로 구분된다.

### 의사결정나무 특징(!)

| 장점                                                         | 단점                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| - 모델이 직관적이고 해석이 용이<br />- 데이터 정규화 및 단위 변환이 불필요<br />- 전처리 작업 용이<br />- 이산형, 연속형 변수 모두 적용 가능<br />- 데이터의 선형성, 정규성 등의 가정이 불필요<br />- **이상값에 민감하지 않음** | - 독립변수들 사이의 중요도 판단하기 어려움<br />- 분류 **경계선 근처의 자료에 대해 오차**가 큼<br />- **과적합 발생 가능성**이 높음<br />- 분산이 큼→랜덤포레스트는 극복 |

### 분석 과정

1. 성장 : 분리기준과 정지 규칙을 설정하여 트리 성장

   - 분리기준 : 한 그룹 안에 범주가 얼마나 섞여 있는지 나타내는 측도인 불순도를 사용하여 데이터를 분류한다. 다양한 범주의 데이터로 구성되어 있을수록 불순도는 커진다.

   - 지니지수는 불순도를 나타내는 값, 엔트로피 지수는 순수도를 나타내는 값. 순수할수록 좋다.

     지니지수 : $1-\sum{_{i=1}^{n}{p_i}^2}$ : 모든 확률의 제곱의 합의 나머지 확률

     엔트로피지수 : $-\sum_i^c{p_ilog_2p_i}$

   - 정지규칙 : 너무 많은 분리 기준을 갖으면 해석상의 어려움이 발생하므로, 정지규칙을 정하여 <u>더 이상 분리가 일어나지 않도록</u> 정지시킨다.

   - 분리기준은 자료의 종류(범주, 연속)과 방법에 따라 달라진다.

2. 가지치기 : 모형 복잡하면 과적합하므로 적당히 제거함

3. 타당성 평가

   형성된 의사결정트리를 검증용 데이터 등으로 예측 정확도를 평가한다.

4. 해석 및 예측

### 의사결정나무 실습 : rpart()함수로 분류

iris 데이터셋에서 비율을 정한 복원추출을 하여 의사결정나무를 만든 다음, 이를 통하여 실제 데이터값과의 오차를 분석해보자.

train 데이터를 70%, test 데이터를 30%의 비율로 iris에서 추출하고, train 데이터로 의사결정나무를 만든다. 그리고 만들어진 의사결정나무로  test값을 넣어보면서 의사결정나무의 적합성을 평가해보자.

```R
> index <- sample(c(1,2), nrow(iris), replace=T, prob=c(0.7,0.3))
> index	#70%만큼 추출하여 train에 사용하고, 나머지는 검증할 때 사용할 test에 저장한다.
  [1] 2 2 1 1 1 1 1 1 1 2 1 1 1 1 1 1 1 2 1 2 2 1 1 2 1 1 1 1 1 1 2 2 1 1 1 2 1 2 1 1 2 1 1 1 1 1 2
 [48] 1 1 1 2 2 2 1 1 1 2 1 1 1 2 1 2 2 2 2 1 1 2 1 1 1 2 2 1 2 1 1 2 1 1 1 2 1 1 1 1 1 1 1 1 1 2 1
 [95] 1 1 2 1 2 1 1 2 2 1 1 1 2 2 1 2 1 1 2 1 2 2 1 2 1 2 2 2 1 2 1 1 2 2 1 1 1 1 1 1 2 1 1 1 1 1 1
[142] 1 1 1 2 2 2 1 2 2
> train <- iris[index==1,]
> test <- iris[index==2, ]
> result <- rpart(data=train, Species ~.)	#Species를 종속변수로 의사결정나무를 생성한다.
> plot(result, margin=0.3)
> text(result)

```

<img src="decisiontree.png" alt="decisiontree" style="zoom:50%;" />

연습 데이터로 만들어진 의사결정트리는 위와 같이 나온다. 이제 미리 추출해놓은 test값으로 의사결정나무를 평가해보자.

```R
> pred <- predict(result, newdata=test, type='class')
> table(condition=test$Species, pred)
            pred
condition    setosa versicolor virginica
  setosa         13          0         0
  versicolor      0         16         2
  virginica       0          2        19
```

위의 의사결정트리로 예측하였을 때, 실제 virginica 종을 versicolor로 잘못 예측한 케이스가 2건 발생함을 알 수 있다.

```R
> result
n= 98 

node), split, n, loss, yval, (yprob)
      * denotes terminal node

1) root 98 61 setosa (0.37755102 0.32653061 0.29591837)  
  2) Petal.Length< 2.6 37  0 setosa (1.00000000 0.00000000 0.00000000) *
  3) Petal.Length>=2.6 61 29 versicolor (0.00000000 0.52459016 0.47540984)  
    6) Petal.Length< 4.9 31  1 versicolor (0.00000000 0.96774194 0.03225806) *
    7) Petal.Length>=4.9 30  2 virginica (0.00000000 0.06666667 0.93333333) *
```

98개(65%)의 train 데이터셋을 위의 기준 노드로 나눠지도록 만든 것을 확인할 수 있다. *가 있는 것은 leaf node라는 뜻이다. 2번 노드를 보면 37개 중 0개가 잘못 분류되었다라는 뜻이다. 3번은 61개중 29개의 versicolor가 잘못 들어왔다는 말이다. 괄호안의 숫자는 각 노드에 해당하는 종속변수(Species)의 비율을 나타낸다.

## 앙상블분석

*여러 개의 모형을 생성 및 조합*하여 예측력이 높은 모형을 만드는 것을 의미한다. 예측력을 높이기 위해 여러 번의 데이터 분할을 통하여 구축된 다수의 모형으로 새로운 모형을 만드는 방법이다. 

결과가 수치형 데이터인 경우에는 값들의 평균을 통해 결과를 예측하고, 범주형 데이터인 경우에는 다수결 방식으로 최종 결과를 예측한다.

### 앙상블분석 종류

1. 배깅(Bootstrap Aggregating)

   여러개의 부트스트랩(**원본 데이터와 같은 크기의 표본을 랜덤복원추출**한 훈련용 샘플 데이터)을 집계하는 알고리즘이다. `bagging()`함수를 이용한다.

2. 부스팅(Boosting)

   이전 모델을 구축한 뒤 다음 모델을 구축할 때 이전 분류기에 의해 잘못 분류된 데이터에 더 큰 **가중치**를 주어 붓스트랩을 구성한다. 여러개의 모델을 구축한다는 점에서 배깅과 유사하지만, <u>배깅은 각 모델이 독립적인데 반해 부스팅은 독립적이지 않다</u>.

   붓스트랩을 재구성하는 과정에서 가중치를 다르게 주어 훈련오차를 빠르게 줄일 수 있어 성능이 배깅보다 뛰어나다고 볼 수 있다.

   `boosting()`함수를 이용한다.

3. 랜덤포레스트(Random Forest )

   서로 상관성이 없는 트리들의 선형결합으로 이루어진 `숲`을 의미한다. 배깅과 유사하나 **배깅에 많은 무작위성을 주는 기법**이다. 붓스트랩을 여러개 복원추출한 뒤, 트리의 모든 마디가 불순도가 제일 적어지는 최적의 분할을 실시한다. 큰 분산을 갖는 의사결정나무의 단점을 보완하여 <u>분산을 감소하고 일반화의 성능을 향상</u>시킬 수 있다. 의사결정나무의 장점인 이상값에 민감하지 않다는 장점도 있다.

   `randomForest()`함수를 이용한다.

## 인공신경망 분석

인간의 뇌를 모방하여 만들어진 학습 및 추론 모형이다.

|      | 내용                                                         |
| ---- | ------------------------------------------------------------ |
| 장점 | 잡음에 민감하게 반응하지 않는다<br />비선형적인 문제를 분석하는데 유용하다<br />패턴인식, 분류, 예측 등의 문제에 효과적이다<br />스스로 가중치를 학습하므로 다양하고 많은 데이터에 효과적이다 |
| 단점 | 모형이 복잡할 경우 학습에 오랜 시간이 소요된다<br />초기 가중치에 따라 전역해가 아닌 지역해로 수렴할 수 있다<br />추정한 가중치의 신뢰도가 낮다<br />결과에 대한 해석이 쉽지 않다<br />은닉층의 수와 은닉 노드의 수를 결정하기가 어렵다 |

### 인공신경망 알고리즘

1. 활성함수 : 노드에 입력되는 값을 바로 다음 함수로 전달하지 않고 <u>비선형 함수인 활성함수</u>에 통과시킨 후 전달한다.

   | 함수명  | 설명                                                         |
   | ------- | ------------------------------------------------------------ |
   | Step    | 기본적인 활성함수로, 0 또는 1을 반환한다.<br />$S(x)=\begin{Bmatrix} 0, & x<0 \\ 1, & x\ge0 \end{Bmatrix}$ |
   | Sigmoid | 로지스틱 회귀분석에서의 계산식과 유사하며, 0과1사이의 값을 반환한다. |
   | Sign    | 기본적인 활성함수로 -1 또는 1을 반환한다.<br />$S(x)=\begin{Bmatrix} -1, & x<0 \\ 1, & x\ge0 \end{Bmatrix}$ |
   | tanh    | 확장된 시그모이드 함수로, 중심값은 0이며 -1~1 사이의 값을 출력한다. |
   | ReLU    | 입력값과 0중에서 큰 값을 반환한다. 최근 딥러닝에서 많이 사용된다.<br />$S(x)=\begin{Bmatrix} 0, & x<0 \\ x, & x\ge0 \end{Bmatrix}$ |
   | Softmax | 출력값이 다범주인 경우에 사용하며 범주에 속할 확률을 반환한다. |

   각 함수의 출력값을 묻는 문제가 출제될 수 있으니, 간단하게 알아두도록 하자.

2. 인경신경망의 계층 구조

   데이터를 입력하는 **입력층**

   데이터를 출력하는 출력층을 갖고 있는 단층신경망

   입력층과 출력층 사이에 보이지 않는 *다수의 은닉충*을 갖을 수 있는 **다층신경망**

   은닉층은 입력층으로부터 값을 전달받아 가중치를 계산한 후 활성함수에 적용하여 결과를 산출하고 출력층으로 보낸다.

3. 인공신경망 학습(역전파 알고리즘)

   인공신경망은 여러 퍼셉트론(신경망)으로 구성, 각 퍼셉트론이 보유한 여러개의 가중치 값의 결정이 중요하다. 

   1. 순전파 알고리즘 : 입력층에서 출력층으로 가중치 값을 찾아감 (오차 발생)

   2. 역전파 알고리즘 : 오차를 줄이고자 출력층에서 입력층 방향으로 거꾸로 찾아 가중치를 새롭게 조정함

      train용 데이터의 자료들에 따라 가중치가 새롭게 조정되는 것을 인공신경망이 학습한다고 표현한다. 한번의 사이클을 1 epoch라하면 특정 epoch에 도달할 때까지 위 작업을 반복한다.

### 인공신경망 종류

1. 단층 퍼셉트론(단층 신경망)

   은닉층을 거치지 않고 바로 출력층과 연결된다. 다수의 입력값을 받아 하나의 출력을 하는데, 이 출력값이 임계값을 넘지 못했을 때 0을, 넘었을 경우 1을 출력한다.

2. 다층 퍼셉트론(다층 신경망)

   단층은 한계가 존재하여 주로 다층 퍼셉트론을 이용한다. 은닉층의 노드가 너무 많으면 과적합, 적으면 과소적합 문제가 발생하므로 적절한 노드의 수를 찾는 것이 중요하다.

   ![출처:코딩의 시작, TCP School](neural_network.png)

### 인공신경망 실습(neuralnet:: neuralnet&predict 이용)

iris 데이터셋을 이용하여 인공신경망을 구현해보자. `neuralnet` 패키지를 이용한다.

```R
> library(neuralnet)
> index <- sample(c(1,2), nrow(iris), replace=T, prob= c(0.7,0.3))	#7:3의 비율로 iris에서 데이터를 복원추출하여 연습과 검증용으로 사용할 것이다.
> train <- iris[index==1 ,]
> test <- iris[index==2,]
# hidden = c(4,4) : hidden layer 4개가 각각 hidden node 4개를 가짐
# stepmax : 훈련 수행 최대 횟수
> result <- neuralnet(data=train, Species ~. , hidden=c(4,4), stepmax=1e7)
> pred <- predict(result, newdata = test)
> plot(result)
```

![neuralnet_plot](neuralnet_plot.png)

위와같이 나오는 것을 알 수 있다. 4개의 은닉노드를 갖는 4개의 은닉층을 거쳐 출력변수인 Species에게 가는 인공신경망이다.

이제 이 결과가 맞나 검증해보도록 하자. 우선 pred를 출력해보고, 이를 test에 맞게 바꿔주자.

```R
> head(pred, 5)
        [,1]          [,2]         [,3]
6  0.9999899 -3.155724e-05 1.319032e-05
7  0.9999899 -3.155724e-05 1.319032e-05
9  0.9999899 -3.155724e-05 1.319032e-05
12 0.9999899 -3.155724e-05 1.319032e-05
14 0.9999899 -3.155724e-05 1.319032e-05
# predict 결과, 제일 높은 값의 열로 활성화 될 것이다.
# 1열, 2열, 3열은 각각 setosa, versicolor, virginica 이므로 이에 맞게 라벨링을 해주자.
> predicted_class <- c()	# 가장 큰 열의 Species를 이름으로 바꿔준다.
> for(i in 1: nrow(test)){}
> for(i in 1: nrow(test)){
+ loc <- which.max(pred[i, ])
+ if(loc ==1){
+     predicted_class <- c(predicted_class, 'setosa')
+ }else if(loc ==2){
+     predicted_class <- c(predicted_class, 'versicolor')
+ }else{
+     predicted_class <- c(predicted_class, 'virginica')
+ }
+ }
# test의 Species와 predict된 결과를 비교
> table(condition=test$Species, predicted_class)
            predicted_class
condition    setosa versicolor virginica
  setosa         13          0         0
  versicolor      0         16         1
  virginica       0          2        16
```

오차가 3개 있긴 하지만, 대체적으로 잘 나오는 것을 확인할 수 있다.

## 나이브베이즈 분류

### 베이즈 이론(Bayes Theorem)

통계학에서 확률은 크게 **빈도 확률**과 **베이지안 확률**로 구분된다. 빈도확률은 객관적으로 베이지안은 주관적으로 확률을 해석한다.

베이즈 정리에서 확률은 '주장 혹은 믿음의 신뢰도'로 나타난다. 베이즈 이론을 '두 확률변수의 사전확률과 사후 확률 사이의 관계를 나타내는 정리'라고도 한다.

### 나이브 베이즈 분류

베이즈 정리를 기반으로 한 <u>지도학습</u> 모델로 스팸 메일 필터링, 텍스트 분류 등에 사용할 수 있다.

## k-NN(k-Nearest Neighbor) 알고리즘

분류분석에 속하지만 군집의 특성도 있어 준 지도학습으로 분류하기도 한다.

k-nn은 정답 라벨이 없는 새로운 데이터를 입력 받았을 때 그 데이터로부터 가장 가까이에 있는 데이터의 정답 라벨을 확인하여 새로운 데이터의 정답 라벨을 결정한다. k는 주변 데이터의 수를 의미하는데, 최적의 k를 찾는 것이 관건이다. 보통 총 데이터들의 제곱근 값을 k로 한다.

## SVM(Support Vector Machine, 서포트벡터머신)

지도학습에 주로 이용되며 분류 성능이 뛰어 분류분석에 활용도가 높다. 가장 높은 마진을 가져가는 방향으로 분류한다. 마진이 클수록 학습에 사용하지 않는 새로운 데이터가 들어오더라도 분류를 잘 할 가능성이 높기 때문이다. SVM은 초평면을 이용하여 카테고리를 나누어 비확률적 이진 선형모델을 만든다.

## 분류 모형 성과 평가(!)

여러 분류 기법을 적용해보고 가장 예측력이 좋은 모델을 최종 모델로 선정하기 위해 평가 기준이 필요하다.

### 오분류표와 평가지표 : 계산할 줄 알아야함

실제값과 예측치의 값에 대한 옳고 그름을 오분류표에 나타낸다. 실제집단은 test 데이터에서 얻고, 예측집단은 train 데이터에서 얻는 것이라고 생각할 수 있다.

|                                     | Positive 예측          | Negative 예측 | 합계                                |
| ----------------------------------- | ---------------------- | ------------- | ----------------------------------- |
| Positive 실제                       | TP                     | FN            | 민감도(재현율)<br />TP/(TP+FN)      |
| Negative 실제                       | FP                     | TN            | 특이도<br />TN/(FP+TN)              |
| 오분류율<br />(FN+FP)/(TP+FN_FP+TN) | 정밀도<br />TP/(TP+FP) |               | 정분류율<br />(TP+TN)/(TP+FN+FP+TN) |

셀의 값이 AB라고 했을때 의미하는 것은 다음과 같다.

A: 정답 여부(실제값과 일치하는지의 여부) → T/F로 표현함

B: 예측값(**예측집단의 값**) → P/N으로 표현함

- 평가지표(주관식으로 나올 수 있음!)

  - 정분류율 = **정확도**(Accuracy) : 전체 관측지 중 올바르게(T) 예측한 비율

  - **오분류율**(Error rate) : 전체 관측지 중 잘못(F) 예측한 비율

  - **민감도 = 재현율**(Sensitivity) : 실제 T중 올바르게 T를 찾은 비율 → 모형의 완정성을 평가하는 지표

  - **특이도**(Specificity) : 실제 F 중 올바르게 F를 찾은 비율

  - **정밀도**(Precision) : 예측 T중 올바르게 T를 찾은 비율

  - **F1 Score** : 정밀도와 재현율의 조화평균 값 → 값이 높을수록 좋다

    $F1 score = \frac{2*Precision*Recall}{Precision+Recall}$

  - **거짓 긍정률**(FPR : False Positive Rate) : 실제 N인 값 중 P로 잘못 분류한 비율

    $1-\frac{TN}{FP+TN} = \frac{FP}{FP+TN}$

  정확도~오분류율/ 민감도(재현율)~특이도/ 정밀도/F1 Score/ 거짓긍정률 을 짝지어서 알고 있도록 하자.

###  ROC(Receiver Operating Characteristic Curve) 커브

분류분석모형의 평가를 쉽게 비교할 수 있도록 시각화한 그래프이다.

x축은 <u>FPR(1-특이도)</u>값을, y축은 <u>TPR(민감도)</u> 값을 갖는 그래프이다. 이진분류(0/1)모형의 성능을 평가하기 위해 사용된다. 축은 모두 0~1 사이에 존재할 것이다.

ROC 커브의 아래 면적을 나타내는 AUROC(Area Under ROC)값이 1에 가까울수록 모형의 성능이 우수하며, 0.5에 가까울수록 랜덤에 가까운 좋지 못한 모형이다.

### 이익도표(Lift Chart)

역시 모델의 성능을 판단하기 위해 작성한 표이다. 이득곡선(Gain Curve),혹은 이득도표(Gain Chart)라고도 한다.

목표범주에 속할 확률을 내림차순으로 정렬하여 몇 개의 구간으로 나누어 각 구간에서의 성능을 판단하고 랜덤 모델보다 얼마나 더 뛰어난 성능을 보이는지를 판단한다. 0부터 1까지의 값을 갖고, 0.5이하는 cut-off하며 1이 가장 좋다. 

### 향상도 곡선(Lift Curve)

랜덤모델과 비교하여 해당 모델의 성과가 얼마나 향상되었는지 구간별로 파악하기 위한 그래프이다. 좋은 모델일수록 큰 값에서 시작하여 급격히 감소한다.



지도학습에 속하는 분류분석의 종류에 대하여 파악하고 각 분석 방법의 장단점과 특이점을 파악하도록 하자. 그리고 모형의 성능을 평가하는 척도 또한 계산하는 것까지 공부하도록 하자.