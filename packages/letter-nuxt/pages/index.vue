<script lang="ts" setup></script>

<template>
  <NuxtLayout>
    <main class="main-content pt-15 flex flex-col items-center">
      <section
        id="hero"
        class="h-screen flex flex-col items-center justify-center bg-black w-full text-white"
      >
        <div class="mb-5 h-50 w-50 bg-gray-300" />
        <h1 class="mb-2 text-4xl">Letter 留言墙</h1>
        <h2 class="text-lg text-gray-400">
          分享你的心得，留下你的祝福，记录每一个瞬间
        </h2>
        <div class="mt-10 flex justify-center">
          <button
            class="mx-2 cursor-pointer border-none bg-none text-lg text-blue-500 transition-opacity hover:opacity-70"
          >
            立即留言
          </button>
          <button
            class="mx-2 cursor-pointer border-none bg-none text-lg text-blue-500 transition-opacity hover:opacity-70"
          >
            查看历史留言
          </button>
        </div>
      </section>
      <section
        id="feature1"
        class="from-yellow-400 to-yellow-200 bg-gradient-to-r p-10 w-full"
      >
        <h1 class="mb-2 text-3xl">分享你的想法 📝</h1>
        <h2 class="mb-5 text-lg">记录心声，传递温暖</h2>
        <div class="card-container flex flex-col md:flex-row flex-wrap">
          <div
            class="card mb-5 h-64 w-full md:w-80 rounded-lg bg-gray-700 p-5 text-white md:mr-5"
          >
            <div class="card-subtitle mb-2 text-sm opacity-50">分享心得</div>
            <div class="card-title text-lg font-bold">
              在这里留下你对生活的感悟！
            </div>
            <div class="card-description mt-2 hidden text-base">
              用户可以在留言墙上分享他们的故事和体验，鼓励他人进步。<br /><br /><span
                class="text-sm opacity-70"
                >*所有数据均来自用户主动提交，欢迎在「历史记录」中查看</span
              >
            </div>
            <div
              class="absolute bottom-5 right-5 h-8 w-8 flex cursor-pointer items-center justify-center border-2 border-white rounded-full"
            />
          </div>
          <div
            class="card mb-5 h-64 w-full md:w-80 rounded-lg bg-gray-700 p-5 text-white"
          >
            <div class="card-subtitle mb-2 text-sm opacity-50">共同成长</div>
            <div class="card-title text-lg font-bold">与朋友共享经历</div>
            <div class="card-description mt-2 hidden text-base">
              随着留言的累积，大家能够更深入地了解彼此，拉近心与心的距离。<br /><br /><span
                class="text-sm opacity-70"
                >*所有留言均可在「历史记录」中查看</span
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
        <h1 class="mb-2 text-3xl">你的历史留言 📜</h1>
        <h2 class="mb-5 text-lg">记录每个珍贵的瞬间</h2>
        <div class="card-container flex flex-col md:flex-row flex-wrap">
          <div
            class="card mb-5 h-64 w-full md:w-80 rounded-lg bg-gray-700 p-5 text-white md:mr-5"
          >
            <div class="card-subtitle mb-2 text-sm opacity-50">历史存档</div>
            <div class="card-title text-lg font-bold">所有留言一网打尽</div>
            <div class="card-description mt-2 hidden text-base">
              我们为您的留言创建了历史存档，让您随时查看和管理过往的分享。
            </div>
            <div
              class="absolute bottom-5 right-5 h-8 w-8 flex cursor-pointer items-center justify-center border-2 border-white rounded-full"
            />
          </div>
          <div
            class="card mb-5 h-64 w-full md:w-80 rounded-lg bg-gray-700 p-5 text-white md:mr-5"
          >
            <div class="card-subtitle mb-2 text-sm opacity-50">随时回顾</div>
            <div class="card-title text-lg font-bold">
              留言珍藏<br />永不遗忘
            </div>
            <div class="card-description mt-2 hidden text-base">
              留言历史将永远保存，让您能够在未来的某天回顾那些珍贵的瞬间。
            </div>
            <div
              class="absolute bottom-5 right-5 h-8 w-8 flex cursor-pointer items-center justify-center border-2 border-white rounded-full"
            />
          </div>
          <div
            class="card mb-5 h-64 w-full md:w-80 rounded-lg bg-gray-700 p-5 text-white"
          >
            <div class="card-subtitle mb-2 text-sm opacity-50">轻松管理</div>
            <div class="card-title text-lg font-bold">
              我们保障<br />你的方便与安全
            </div>
            <div class="card-description mt-2 hidden text-base">
              您可以轻松编辑和删除自己的留言，保护您的隐私和数据安全。
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
        <h1 class="mb-2 text-3xl">保护你的隐私 🔒</h1>
        <h2 class="mb-5 text-lg">数据安全，绝不泄露</h2>
        <div class="card-container flex flex-col md:flex-row flex-wrap">
          <div
            class="card mb-5 h-64 w-full md:w-80 rounded-lg bg-gray-700 p-5 text-white md:mr-5"
          >
            <div class="card-subtitle mb-2 text-sm opacity-50">透明管理</div>
            <div class="card-title text-lg font-bold">
              你能看见的一切<br />
              我们都能保障
            </div>
            <div class="card-description mt-2 hidden text-base">
              您可以随时查看和管理所有留言，确保数据的透明使用。
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
              我们用心<br />守护每一条信息
            </div>
            <div class="card-description mt-2 hidden text-base">
              所有留言数据均采用加密技术，确保您信息的安全与私密。
            </div>
            <div
              class="absolute bottom-5 right-5 h-8 w-8 flex cursor-pointer items-center justify-center border-2 border-white rounded-full"
            />
          </div>
          <div
            class="card mb-5 h-64 w-full md:w-80 rounded-lg bg-gray-700 p-5 text-white"
          >
            <div class="card-subtitle mb-2 text-sm opacity-50">完整性保护</div>
            <div class="card-title text-lg font-bold">
              我们保证<br />您的数据不被篡改
            </div>
            <div class="card-description mt-2 hidden text-base">
              采用完整性校验技术，确保您的每一条留言都不会被恶意修改。
            </div>
            <div
              class="absolute bottom-5 right-5 h-8 w-8 flex cursor-pointer items-center justify-center border-2 border-white rounded-full"
            />
          </div>
        </div>
      </section>
    </main>
  </NuxtLayout>
</template>

<style scoped></style>
