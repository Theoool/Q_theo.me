<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="path1"
    viewBox="0 0 100 100"
    fill="none"
  >
    <path
      className="{styles.path}"
      d="M1.94992 20.3867C14.0304 10.9833 29.3486 0.858419 45.5786 2.63453C75.1309 5.86856 58.0309 45.0356 49.3255 59.735C48.1492 61.7212 46.8543 63.6357 45.5543 65.5432C44.673 66.8365 43.1964 67.8049 42.7411 69.3022C42.67 69.5364 42.878 69.782 43.02 69.9813C44.1632 71.5853 45.6157 72.9512 46.779 74.5406C52.8781 82.8734 53.9862 91.6823 53.3876 102.042C52.7631 112.851 49.6693 128.317 46.8639 138.71C44.9177 145.92 41.6564 155.409 37.8423 162.186C35.7359 165.929 30.6643 174.049 25.3527 174.081C19.1313 174.12 16.0223 163.998 14.9973 159.688C12.4354 148.915 13.7283 137.667 16.2341 127.045C17.9642 119.712 19.9866 113.298 23.5824 106.686C25.7897 102.627 28.5115 97.85 33.5255 96.6338C42.7667 94.3923 50.206 106.624 54.2364 112.446C57.0103 116.453 59.3945 120.715 61.9727 124.851C64.3053 128.592 70.1739 139.521 74.9473 142.7C83.5986 148.461 88.7827 127.263 89.7893 124.305C99.6785 95.2491 105.075 64.8403 111.955 35.0104"

      strokeLinecap="round"
    />
  </svg>
</template>

<style scoped>
@media (prefers-reduced-motion) {
  .path1 {
    animation: none !important;
    stroke-dasharray: unset !important;
  }
}
@media print {
  .path1 {
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
.path1 {
  stroke-dashoffset: 1px;
  stroke-dasharray: 350px 0;
  animation: grow 10s ease forwards infinite;
  transform-origin: center;
  stroke: #303030;
  animation-delay: 0s;
}
.dark .path1 {
  stroke: #fdfdfd;
}
</style>
