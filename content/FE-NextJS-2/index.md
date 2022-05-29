---
emoji: 😃
title: (React) NextJS 입문해보기 - (2) data fetching, localtunnel 이용하여 공개하기
date: '2022-03-10 00:00:00'
author: choieastsea
tags: FE React JavaScript NextJS fetch localtunnel
categories: FE


---



저번에 이어 Next js를 공부해보자! (공식사이트와 유튜브를 돌아다니며 공부했다) 오늘은 fetch하여 데이터 받아오기와 Next.js에서의 SSR에 대하여 공부해보려고 한다.

# 데이터 가져오기(react )

저번에 공부한 내용으로는 간단하게 정적인 페이지를 만들어 보았는데, 오늘은 동적인 페이지를 만들어보자! index.js에서 영화 api를 가져와서 정보를 보여주도록 하자. 원래 리액트에서 하는 것 처럼, useEffect hook을 사용하여 페이지가 로드될때 데이터를 fetch해올 수 있다. 

```jsx
import Image from "next/image";
import { useEffect, useState } from "react/cjs/react.development";
import SEO from "../components/SEO";

const API_KEY = "API_KEY"; //put personal api key

export default function Home() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
      );
      const { results } = await response.json();
      // console.log(results);
      setMovies(results);
    })();
  }, []);
  return (
    <div>
      <SEO title="home" />
      <h1 className="active title">Home</h1>
      <div className="container">
        {movies.map((movie) => (
          <div key={movie.id} className="item">
            <div className="image-wrapper">
              <Image
                alt={`${movie.poster_path}`}
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                width="200px"
                height="300px"
              />
            </div>
            <h4>{movie.original_title}</h4>
          </div>
        ))}
      </div>
      <style jsx>{`
        .title {
          text-align: center;
        }
        .container {
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          justify-content: space-evenly;
        }
        .item h4 {
          text-align: center;
          max-width: 200px;
        }
        .image-wrapper {
          max-height: 300px;
          overflow: hidden;
          box-shadow: rgba(0, 0, 0, 0.3) 0px 5px 12px;
          border-radius: 1rem;
          transition: transform 0.2s ease-in-out;
        }
        .image-wrapper:hover {
          transform: scale(1.05) translateY(-10px);
        }
      `}</style>
    </div>
  );
}

```

flex로 간단하게 이미지 배치를 하였다. 사진에 hover event도 달아주었고, 결과는 아래와 같다.

<img src="next-image.png" alt="next-image" style="zoom:50%;" />

## + 이미지 태그

그냥 img를 사용하면 Next.js에서 제공하는 `next/Image`가 권장된다는 경고 문구가 나온다. 이는 두가지 케이스로 나뉜다.

1. 로컬 이미지 : public 폴더에다가 넣고 import해주면 된다.

2. url등으로 경로가 설정된 외부 이미지

   `next.config.js`를 건드려줘야 하는데 공식문서에 나온대로만 해놓자. 나는 도메인을 이렇게 적어주었다.
   
   ```javascript
   //next.config.js
   const nextConfig = {
     reactStrictMode: true,
     images: {
       domains: ["image.tmdb.org"],
     },
   };
   
   module.exports = nextConfig;
   ```

그럼 이미지 태그를 html이 아닌 자체 컴포넌트로 사용하는 이유가 무엇일까? Next.js는 사용자의 경험을 매우 중요하게 생각하는데, 이미지의 원본이 다운로드 될 필요가 없다고 판단한다. 이미지는 보면 Chrome의 Network 탭에서 보면 한번에 다운로드되지 않으며, 해당 이미지가 보여질 위치일때(스크롤 위치에 따라) 사전에 정의한 사이즈만큼만 다운로드 되어진다. 이는 로딩시간과 부하를 줄여주는데 큰 도움이 될 것이다.

## 문제점

우리는 Next.js에서 초기의 모습을 html로 만들어서 브라우저로 번들링된 js파일들과 함께 보내온다고 저번에 공부했다. 하지만 useEffect를 사용하면, 브라우저 단에서 외부 서버의 데이터를 fetch해오므로, view page source code를 했을 때, 영화 정보가 나오지 않는 것을 확인할 수 있다. 이 경우, 영화 정보를 보여주는 사이트인데, 이러한 내용이 검색 엔진에 포함되지 않을 확률이 생기게 된다. 이를 서버사이드에서 해주기 위해 우리는 `getServersideProps`함수를 이용할 필요가 있다.

# 서버 사이드 렌더링 : getServersideProps 

서버에서는 초기상태를 빌드하여 브라우저로 보내주는데, 동적 페이지의 경우 다른 서버에서 받아온 정보 또한 초기상태에 포함되어야 하는지 여부에 따라 다양해질 것 같다. 예를 들어 수집될 필요가 없는 외부 정보라면 굳이 서버에 부하를 주지 않고, 브라우저에서 동작하도록 하게 하면 되고, 사이트에 중요한 정보라면 서버단에서 렌더링할 필요가 있다. 이것은 서버사이드렌더링이 일어나길 원하는 페이지에서 `getServersideProps`함수를 오버라이딩해줌으로써 가능하다. 

또한, 컴포넌트는 props로 함수에서 리턴하는 것을 가져올 수 있다. 코드는 아래와 같다.

```jsx
//index.js에 추가

export default function Home({ results }) {...
}

export async function getServerSideProps() {
  //request time에 서버에서 처리하여 default export되는 componenet에게 넘길 내용을 정의한다
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
  );
  const { results } = await response.json();
  return {
    props: { results },
  };
}
```

이렇게 하면 보이는 결과는 똑같지만, view page sources를 해줬을 때 img의 정보가 들어가 있는 것을 확인할 수 있다! 서버에서 요청될때 렌더링하여 브라우저로 보내주기 때문에 그렇다! 그렇다고 해서 모든 내용이 서버에서 렌더링된다면 이는 서버에 부하를 일으킬 것이므로, **적당한 타협이 필요**하다. SSR 방식은 request time에 서버가 페이지를 렌더링하여 응답을 하는 것이다. 만약 정적 사이트의 경우에는 사전에 pre-rendered 되어있고, 모든 유저에게 똑같은 정보를 보내주면 된다. 이는 SSR과 또 다른 의미(static generation)이며, 다음에 자세히 알아보도록 하자.

# +로컬호스트를 오픈하여 테스트해보기 (localtunnel 이용) 

production은 아니지만, 개발 단계에서 간단하게 외부 환경에서 테스트해볼 수 있는 오픈소스가 있다. 좀 느려도 해볼만 하다고 생각한다. 해당 포트에 서버 프로그램이 실행중이라면, 그 포트를 외부에서 접근가능하게 하는데 보안 등 어려운 설정들이 많이 필요한데, `localtunnel`은 정말 간단하게 이를 허용해줄 수 있다. [공식 사이트](https://localtunnel.github.io/www/)를 보면 아주 간단하게 로컬 서버를 외부에 공개할 수 있다. 우선, 글로벌로 `localtunnel`패키지를 설치하고, 해당 로컬 서버의 포트를 열어주면 url이 나오게 된다.

```shell
$ npm install -g localtunnel
$ lt --port 3000
your url is: https://perfect-seahorse-12.loca.lt	
```

이러한 식으로 url이 나오고, 3000번 포트에 서버가 실행되고 있다면, 어디서나 정상적인 접근이 가능할 것이다. (초기 화면이 있는데, 7일마다 버튼만 눌러주면 안나오는 것 같다)

<img src="localtunnel.png" alt="localtunnel" style="zoom:33%;" />

오늘까지 한 코드는 깃허브에 올려놓았다. 다음에는 static generation(SSG), api, production mode, next config에 나오는 주요 속성등을 공부해보도록 하자!