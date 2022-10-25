// gatsby 블로그 기본 설정
module.exports = {
  title: `choieastsea.github.io`,
  description: `choieastsea.github.io`,
  language: `ko`, // `ko`, `en` => currently support versions for Korean and English
  siteUrl: `https://choieastsea.github.io`,
  ogImage: `/og-image.png`, // Path to your in the 'static' folder
  comments: {
    utterances: {
      repo: `choieastsea/choieastsea.github.io`,
    },
  },
  ga: 'UA-162999436-1', // Google Analytics Tracking ID
  author: {
    name: `choieastsea`,
    bio: {
      role: `대학생`,
      description: ['기록하는', '노력하는', '긍정적인'],
      thumbnail: 'sample.png', // Path to the image in the 'asset' folder
    },
    social: {
      github: `https://github.com/choieastsea`,
      linkedIn: `https://www.linkedin.com`,
      email: `choieastsea@gmail.com`,
    },
  },

  // metadata for About Page
  about: {
    timestamps: [
      // =====       [Timestamp Sample and Structure]      =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!) =====
      {
        date: '',
        activity: '',
        links: {
          github: '',
          post: '',
          googlePlay: '',
          appStore: '',
          demo: '',
        },
      },
      // ========================================================
      // ========================================================
      {
        date: '2021.08 ~',
        activity: '개인 블로그 운영',
        links: {
          post: '/',
          github: 'https://github.com/choieastsea/choieastsea.github.io',
          demo: 'https://www.choieastesa.github.io',
        },
      },
    ],

    projects: [
      // =====        [Project Sample and Structure]        =====
      // ===== 🚫 Don't erase this sample (여기 지우지 마세요!)  =====
      {
        title: '',
        description: '',
        techStack: ['', ''],
        thumbnailUrl: '',
        links: {
          post: '',
          github: '',
          googlePlay: '',
          appStore: '',
          demo: '',
        },
      },
      // ========================================================
      // ========================================================
      {
        title: '마라톤 대회 사용자 사이트 개발(2021)',
        description:
          '마라톤 대회의 사용자 사이트를 UI부터 개발까지 진행하였습니다. React.js로 사용자 페이지의 프론트엔드를, Spring boot로 일부 REST API를 개발하였고, css는 Bootstrap을 이용하였습니다. tosspayment npm 모듈을 이용하여 모바일 및 pc환경에서 온라인 결제가 가능하도록 하였습니다.',
        techStack: ['react', 'spring boot'],
        thumbnailUrl: 'blog.png',
        links: {
          post: '/',
          github: 'https://github.com/choieastsea',
          demo: 'http://dcmarathon.or.kr',
        },
      },
      {
        title: '마라톤 대회 유지 보수 및 관리자 사이트 개발(2022)',
        description:
          '마라톤 대회가 대회 방식이 변경됨에 따라 사이트를 보수하였습니다. 관리자 페이지에서 사용자 정보를 수정하거나 접수 처리를 할 수 있게 하고, 엑셀 파일을 통한 단체 접수 신청을 할 수 있도록 구현하였습니다.',
        techStack: ['react', 'spring boot', 'MySQL'],
        thumbnailUrl: 'admin.png',
        links: {
          post: '/',
          github: 'https://github.com/choieastsea',
          demo: 'http://dcmarathon.or.kr',
        },
      },
    ],
  },
};
