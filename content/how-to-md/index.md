---
emoji: 😉
title: 블로그를 위한 Markdown 작성법
date: '2021-09-03 00:00:00'
author: choieastsea
tags: 블로그 github-pages markdown typora readme
categories: 블로그
---

나는 `typora`에디터로 `markdown`을 작성중이다. 툴에 따라 마크다운 문법이 조금씩 다르다고 알고 있다.

`마크다운`은 에디터에서 쉽게 사용할 수 있도록 고안된 방법으로, 읽고 쓰기 편하며 `HTML`로의 변환이 편한 것이 장점이다. 웹사이트를 만들어서 글을 작성한다면, 일일이 HTML코드를 작성하기보다, <u>마크다운으로 작성한 후 HTML로 변환</u>하여 업로드하는 것이 효과적이다.

`Github`나 `Github Pages`를 운영한다면 '~.md'파일을 많이 접하게 될 것이다. 간단하게 문법을 알고 있으면 좋을 것 같아 정리해본다.

markdown을 알기 위해서는 HTML의 간단한 태그들을 알고 있는 것이 좋을 것이다. md 파일이 아무래도 HTML을 고려하고 만들어진 형식이니까...

## HTML

HTML 태그는 그냥 작성하면 된다.

```HTML
<p>안녕하세요</p>
```

<p>안녕하세요</p>

모든 태그를 지원하지는 않는다. 애초에 HTML이 귀찮아서 markdown으로 작성하는 경우가 많은데, 굳이 HTML 문법을 사용할 필요는 많지 않아보인다. 가끔 줄띄우기`<br>`같을 때는 사용해볼 수 있겠다.

이하는 내가 많이 작성하는 순서대로 적어볼 것이다.

## Heading

`HTML`의 `heading`태그에 해당되는 것으로, 주로 제목 등을 작성할 때 사용한다.

h1~h6까지 존재하며 '#'의 개수로 나타낸다.

```markdown
# h1

## h2

### h3

#### h4

...
```

# h1

## h2

### h3

#### h4

...

h2까지는 밑줄선도 만들어주는 것 같아 보인다.

## Code

1. code block

` 세개를 이어붙인 것을 두개 놓고 그 사이에 작성한다.

사용할 언어를 첫 줄에 적어주면, 해당 언어에 맞게 들여쓰기나 색을 적용해준다.

```markdown
​` javascript for(var i in array){ console.log("hello world!"); } ​`
```

```javascript
for (var i in array) {
  console.log('hello world!');
}
```

2. inline code

`를 두개 사용하고 그 사이에 작성하면 크기에 맞게 감싸지는 강조 구문을 만들 수 있다.

```markdown
`<p>This is paragraph</p>`
```

`<p>This is paragraph.</p>`

## Emphasis

나는 `typora`를 사용하므로, `ctrl+u`등의 단축키로 글씨 강조구문을 쓰지만, 한 번 적어나 보자.

\*(asterisk)와 \_(underscore)로 강조를 할 수 있다.

```markdown
이텔릭체: _asterisks_ / _underscore_
볼드체: **asterisks** / **underscore**
취소: ~~(tilde)~~
밑줄: <u>underline</u>
```

이텔릭체: _asterisks_ / _underscore_
볼드체: **asterisks** / **underscore**
취소: ~~(tilde)~~
밑줄: <u>underline</u>

활용하면 중첩도 해볼 수 있겠다.

`***<u>~~이것저것 섞어보기~~</u>***`

**_<u>~~이것저것 섞어보기~~</u>_**

## Links

HTML의 `a tag`에 해당하는 것이다. 하이퍼링크, 혹은 다른 문서로의 이동을 의도하여 사용한다. a tag에 hover시 설명을 보여줄 수도 있다.

```markdown
[이거를 눌러보세요](https://choieastsea.github.io)
자주 사용하는 링크는 변수처럼 두고 사용할 수 있다.
[여기서 검색해보세요][google_link]
[google_link]: https://google.com
[마우스를 올려보세요](https://naver.com '네이버')
```

[이거를 눌러보세요](https://choieastsea.github.io)
자주 사용하는 링크는 변수처럼 두고 사용할 수 있다.
[여기서 검색해보세요][google_link]

[google_link]: https://google.com

[마우스를 올려보세요](https://naver.com '네이버')

## Images

물론 나는 그냥 복사해서 붙여넣기 한다. 참고로 `typora`에디터의 환경설정에 들어가면*, 클립보드에서 이미지를 붙여넣기하면 알아서 이미지 디렉토리를 생성*해주는 좋은 기능이 있다.

<img>와 `alt`속성에 대하여 지정해줄 수 있다. 링크와 비슷하지만 앞에 `!`를 붙여준다. alt는 이미지 로드가 안되었을때 적어주는 것이다.

```markdown
![위키백과 로고 사진](https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Wikipedia-logo-v2-ko.svg/1200px-Wikipedia-logo-v2-ko.svg.png)
```

<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Wikipedia-logo-v2-ko.svg/1200px-Wikipedia-logo-v2-ko.svg.png" alt="위키백과 로그 사진" style="zoom:50%;" />

이미지에 링크를 묶어주는 정도의 응용은 HTML을 해봤다면 알 것이다. `<a>`안에 `<img>`를 넣어줬던 것 같다. 한번 해보자.

```markdown
[![위키백과 로고 사진](https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Wikipedia-logo-v2-ko.svg/1200px-Wikipedia-logo-v2-ko.svg.png)](https://google.com)
```

[<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Wikipedia-logo-v2-ko.svg/1200px-Wikipedia-logo-v2-ko.svg.png" alt="위키백과 로고 사진" style="zoom:50%;" />](https://google.com)

이미지는 `HTML tag`를 사용하여 표현할 수도 있다. 이렇게 하면 이미지의 크기나 위치를 쉽게 변경할 수 있다.

```html
<img
  src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Wikipedia-logo-v2-ko.svg/1200px-Wikipedia-logo-v2-ko.svg.png"
  alt="위키백과 로고 사진"
  style="zoom:50%; display: block; margin: 0 auto"
/>
```

style 속성을 추가하여 zoom으로 크기 조절, display: block으로 레이아웃을 바꿀 수 있도록 해주고(inline이라면 가운데 정렬이 힘듬) margin: 0 auto로 가운데 정렬을 해 줄 수 있다.

## BlackQuote

인용문이라고 한다.

`>`를 적당히 사용하여 만들어줄 수 있고, 중첩도 가능하다.

```markdown
> 나는 생각한다.

> 나는 생각한다.
>
> > 고로 존재한다.
```

> 나는 생각한다.

> 나는 생각한다.
>
> > 고로 존재한다.

## Line

수평선을 만들어서 구분선의 역할을 해줄 수 있다.

```markdown
## 가나다

나다가

---

다나가

---
```

## 가나다

나다가

---

다나가

---

하나 정도만 알고 있어도 될 것 같다.

## Table

md 문법으로 절대 작성하지 않을 것 같다...

```markdown
| 가  | 나  | 다  |
| --- | --- | --- |
| 라  | 마  | 바  |
| 사  | 아  | 자  |
| 차  | 카  | 타  |
```

editor를 통한 table insert(기능이 있다면)정도는 할 수 있을 것이다.

| 가  | 나  | 다  |
| --- | --- | --- |
| 라  | 마  | 바  |
| 사  | 아  | 자  |
| 차  | 카  | 타  |

내가 사용하는 마크다운 문법을 간단히 정리해보았다.

다시 말하지만, 마크다운은 표준이 없어 에디터마다 조금씩 다르다. 원하는 기능이 되지 않는다면 `구글링`해보자.

## 마무리

마크다운은 읽고 쓰기에 효율적인 방식이라고 생각한다. 자유자재로 바꾸는 레이아웃을 원하는 것이 아니라면, 다양한 것들을 기록하는데 마크다운은 좋은 방법이 될 수 있을 것이다.
