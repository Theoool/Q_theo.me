<template>
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <title>Theo @ antfu.me</title>
    <path
      d="M46.1438 41.1245C47.1438 32.6245 40.841 29.2545 33.341 38.0027C21.341 52 37.341 63 43.8251 46.6245C45.781 43.1245 46.1438 38.0027 46.1438 38.0027C45.5227 43.2757 44.3251 45.6045 44.3251 49.6245C44.3251 55.1245 46.8251 57.6245 51.8252 49.6245C57.8252 41.1245 67.9722 28.1245 69.8251 17.6245C71.3251 9.12447 68.3252 4.12447 62.3252 16.1245C56.3252 28.1245 48.3701 61.2691 50.3409 79.5C52.3409 98 61.8252 94.6245 59.8252 77.6245C58.2252 64.0245 49.6751 44.1245 45.1751 35.1245C47.5085 40.2911 53.3252 50.6245 62.3252 55.1245"
      stroke="black"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<style scoped>
@media (prefers-reduced-motion) {
  path {
    animation: none !important;
    stroke-dasharray: unset !important;
  }
}
@media print {
  path {
    animation: none !important;
    stroke-dasharray: unset !important;
  }
}
@keyframes grow {
  0% {
    stroke-dashoffset: 1px;
    stroke-dasharray: 0 350px;
    opacity: 0;
  }
  10% {
    opacity: 1;
    transform: translate(0, 1%);
  }
  20% {
    transform: translate(0, 0);
  }
  40% {
    stroke-dasharray: 350px 0;
  }
  85% {
    stroke-dasharray: 350px 0;
  }
  95%,
  to {
    stroke-dasharray: 0 350px;
  }
}
path {
  stroke-dashoffset: 1px;
  stroke-dasharray: 350px 0;
  animation: grow 10s ease forwards infinite;
  transform-origin: center;
  stroke: #303030;
  animation-delay: 0s;
}
.dark path {
  stroke: #fdfdfd;
}
</style>
