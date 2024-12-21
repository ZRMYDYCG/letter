<script lang="ts" setup></script>

<template>
  <NuxtLayout>
    <div>
      <header
        class="fixed left-0 right-0 top-0 z-1000 h-15 flex items-center justify-between bg-black bg-opacity-50 px-5 backdrop-blur-md"
      >
        <div class="h-10 w-10 rounded-full bg-gray-300" />
        <nav class="ml-5 flex flex-grow justify-between">
          <a
            href="#hero"
            class="text-lg text-white no-underline transition-opacity hover:opacity-70"
            >首页</a
          >
          <a
            href="#feature1"
            class="text-lg text-white no-underline transition-opacity hover:opacity-70"
            >AI 朋友</a
          >
          <a
            href="#feature2"
            class="text-lg text-white no-underline transition-opacity hover:opacity-70"
            >数据存储</a
          >
          <a
            href="#feature3"
            class="text-lg text-white no-underline transition-opacity hover:opacity-70"
            >隐私保护</a
          >
        </nav>
      </header>
      <main class="main-content pt-15 flex flex-col items-center">
        <section
          id="hero"
          class="h-screen flex flex-col items-center justify-center bg-black w-full text-white"
        >
          <div class="mb-5 h-50 w-50 bg-gray-300" />
          <h1 class="mb-2 text-4xl">小禾同学</h1>
          <h2 class="text-lg text-gray-400">
            智能、安全、便捷，为您打造个性化的 AI 体验
          </h2>
          <div class="mt-10 flex justify-center">
            <button
              class="mx-2 cursor-pointer border-none bg-none text-lg text-blue-500 transition-opacity hover:opacity-70"
            >
              立即下载
            </button>
            <button
              class="mx-2 cursor-pointer border-none bg-none text-lg text-blue-500 transition-opacity hover:opacity-70"
            >
              了解更多
            </button>
          </div>
        </section>
        <section
          id="feature1"
          class="from-yellow-400 to-yellow-200 bg-gradient-to-r p-10 w-full"
        >
          <h1 class="mb-2 text-3xl">做你的知心 AI 朋友 🥳</h1>
          <h2 class="mb-5 text-lg">主动推荐，自我成长</h2>
          <div class="card-container flex flex-col md:flex-row flex-wrap">
            <div
              class="card mb-5 h-64 w-full md:w-80 rounded-lg bg-gray-700 p-5 text-white md:mr-5"
            >
              <div class="card-subtitle mb-2 text-sm opacity-50">主动推荐</div>
              <div class="card-title text-lg font-bold">
                你好，<br />我是小禾同学～
              </div>
              <div class="card-description mt-2 hidden text-base">
                小禾同学能够根据您当前所处的时间状态和环境，主动为您推荐合适的内容和建议。<br /><br /><span
                  class="text-sm opacity-70"
                  >*所有数据均来自您主动提供，均可在「盒子」中查看</span
                >
              </div>
              <div
                class="absolute bottom-5 right-5 h-8 w-8 flex cursor-pointer items-center justify-center border-2 border-white rounded-full"
              />
            </div>
            <div
              class="card mb-5 h-64 w-full md:w-80 rounded-lg bg-gray-700 p-5 text-white"
            >
              <div class="card-subtitle mb-2 text-sm opacity-50">自我成长</div>
              <div class="card-title text-lg font-bold">结识当下的你</div>
              <div class="card-description mt-2 hidden text-base">
                随着您的使用，小禾同学会不断学习和适应您的习惯和偏好，实现越用越懂你。<br /><br /><span
                  class="text-sm opacity-70"
                  >*所有数据均来自您主动提供，均可在「盒子」中查看</span
                >
              </div>
              <div
                class="absolute bottom-5 right-5 h-8 w-8 flex cursor-pointer items-center justify-center border-2 border-white rounded-full"
              />
            </div>
          </div>
        </section>
        <section
          id="feature2"
          class="from-blue-400 to-blue-200 bg-gradient-to-r p-10 w-full"
        >
          <h1 class="mb-2 text-3xl">你的理想数据存储之境 📦</h1>
          <h2 class="mb-5 text-lg">多维度、多样化、高性能</h2>
          <div class="card-container flex flex-col md:flex-row flex-wrap">
            <div
              class="card mb-5 h-64 w-full md:w-80 rounded-lg bg-gray-700 p-5 text-white md:mr-5"
            >
              <div class="card-subtitle mb-2 text-sm opacity-50">时间线</div>
              <div class="card-title text-lg font-bold">
                数据新维度<br />「时间线」
              </div>
              <div class="card-description mt-2 hidden text-base">
                我们为您的数据创造了「时间」这一新维度，让您可以更直观地查看和管理数据的变化。
              </div>
              <div
                class="absolute bottom-5 right-5 h-8 w-8 flex cursor-pointer items-center justify-center border-2 border-white rounded-full"
              />
            </div>
            <div
              class="card mb-5 h-64 w-full md:w-80 rounded-lg bg-gray-700 p-5 text-white md:mr-5"
            >
              <div class="card-subtitle mb-2 text-sm opacity-50">
                多样数据类别
              </div>
              <div class="card-title text-lg font-bold">
                图、文、网页...<br />全支持
              </div>
              <div class="card-description mt-2 hidden text-base">
                不仅支持文本、图片和网页，盒子中还能存储更多类型的数据，您多样化的存储需求均可满足。
              </div>
              <div
                class="absolute bottom-5 right-5 h-8 w-8 flex cursor-pointer items-center justify-center border-2 border-white rounded-full"
              />
            </div>
            <div
              class="card mb-5 h-64 w-full md:w-80 rounded-lg bg-gray-700 p-5 text-white"
            >
              <div class="card-subtitle mb-2 text-sm opacity-50">优秀性能</div>
              <div class="card-title text-lg font-bold">
                我直接<br />存存存存存
              </div>
              <div class="card-description mt-2 hidden text-base">
                小禾同学采用的数据库架构有很好的横向扩充能力，让您无需担心数据存储过多导致的性能问题。
              </div>
              <div
                class="absolute bottom-5 right-5 h-8 w-8 flex cursor-pointer items-center justify-center border-2 border-white rounded-full"
              />
            </div>
          </div>
        </section>
        <section
          id="feature3"
          class="from-green-400 to-green-200 bg-gradient-to-r p-10 w-full"
        >
          <h1 class="mb-2 text-3xl">你的隐私，小禾守口如瓶 🔒</h1>
          <h2 class="mb-5 text-lg">透明、加密、完整性保护</h2>
          <div class="card-container flex flex-col md:flex-row flex-wrap">
            <div
              class="card mb-5 h-64 w-full md:w-80 rounded-lg bg-gray-700 p-5 text-white md:mr-5"
            >
              <div class="card-subtitle mb-2 text-sm opacity-50">数据透明</div>
              <div class="card-title text-lg font-bold">
                小禾能看到的，<br />你也一定能看得到
              </div>
              <div class="card-description mt-2 hidden text-base">
                通过「盒子」功能，您可以查看与编辑所有您的数据，而小禾同学也是在这里读取与修改所有个性化数据。小禾同学能看到的数据，您也能全部看到，从而确保我们对您数据使用的透明度。
              </div>
              <div
                class="absolute bottom-5 right-5 h-8 w-8 flex cursor-pointer items-center justify-center border-2 border-white rounded-full"
              />
            </div>
            <div
              class="card mb-5 h-64 w-full md:w-80 rounded-lg bg-gray-700 p-5 text-white md:mr-5"
            >
              <div class="card-subtitle mb-2 text-sm opacity-50">数据加密</div>
              <div class="card-title text-lg font-bold">
                小禾说，<br />每条数据都需要上锁
              </div>
              <div class="card-description mt-2 hidden text-base">
                无论是本地还是云端存储的数据，我们都采用标准的AES-256加密技术进行保护，确保您的数据安全。
              </div>
              <div
                class="absolute bottom-5 right-5 h-8 w-8 flex cursor-pointer items-center justify-center border-2 border-white rounded-full"
              />
            </div>
            <div
              class="card mb-5 h-64 w-full md:w-80 rounded-lg bg-gray-700 p-5 text-white"
            >
              <div class="card-subtitle mb-2 text-sm opacity-50">
                完整性校验
              </div>
              <div class="card-title text-lg font-bold">
                小禾还会保护<br />你的数据不被破坏
              </div>
              <div class="card-description mt-2 hidden text-base">
                我们使用HMAC完整性校验技术，防止您的数据被篡改，为您的数据安全提供额外保障。
              </div>
              <div
                class="absolute bottom-5 right-5 h-8 w-8 flex cursor-pointer items-center justify-center border-2 border-white rounded-full"
              />
            </div>
          </div>
        </section>
      </main>
      <footer class="bg-gray-800 p-5 text-center text-sm text-gray-400">
        <p>© 2024-2025, letter. All rights reserved.</p>
        <button
          class="theme-toggle cursor-pointer border-none bg-none text-lg text-white transition-colors hover:text-gray-300"
        >
          🌓
        </button>
      </footer>
    </div>
  </NuxtLayout>
</template>

<style scoped></style>
