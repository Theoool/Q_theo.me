---
title: Projects - Anthony Fu
display: Projects
description: List of projects that I am proud of
wrapperClass: 'text-center'
art: dots
projects:
  Demo:
    - name: 'Open Link'
      link: 'https://www.theooo.xyz/'
      desc: '自由，开放，包容的网页书签收藏'
      icon: 'i-carbon:url'
    - name: 'diamond'
      link: 'https://github.com/nuxt/devtools'
      desc: '使用nextjs写的收藏管理项目'
      icon: 'i-logos-nextjs-icon'
    - name: '一刻时光-留言墙'
      link: 'https://yike-nine.vercel.app/'
      desc: '梦开始地方'
      icon: 'i-logos-nuxt-icon saturate-0'
  wexin:
    - name: 'Diapoem'
      link: 'https://github.com/Theoool/Diapoem'
      desc: 'unicloud 微信小程序 诗词阅读'
      icon: 'i-material-symbols:book-4-spark saturate-0'

---

<!-- @layout-full-width -->
<ListProjects :projects="frontmatter.projects" />
