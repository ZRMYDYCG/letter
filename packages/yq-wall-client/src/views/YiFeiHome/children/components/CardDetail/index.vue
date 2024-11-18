<script setup lang="ts">
import YiCard from '@/components/YiCard/index.vue'
import YiButton from '@/components/YiButton/index.vue'
import { portrait } from '@/utils/data'
const commentList = [
  {
    moment: "2024.06.05",
    id: 1,
    userId: 2,
    message: "让我们一起迎接每一个日出，享受每一次日落，珍惜每一段旅程。因为，这就是生活的真谛。",
    name: "一勺",
    imgUrl: 2
  },
  {
    moment: "2024.06.05",
    id: 2,
    userId: 2,
    message: "你的内心拥有无限的力量，只要相信自己，就没有什么是不可能的。",
    name: "一勺",
    imgUrl: 3
  },
  {
    moment: "2024.06.05",
    id: 3,
    userId: 2,
    message: " 在这个旅程中，我们不是孤单一人。",
    name: "一勺",
    imgUrl: 1
  },
  {
    moment: "2024.06.05",
    id: 4,
    userId: 2,
    message: " 在这个旅程中，我们不是孤单一人。",
    name: "一勺",
    imgUrl: 1
  },
  {
    moment: "2024.06.05",
    id: 5,
    userId: 2,
    message: " 在这个旅程中，我们不是孤单一人。",
    name: "一勺",
    imgUrl: 1
  },
  {
    moment: "2024.06.05",
    id: 6,
    userId: 2,
    message: " 在这个旅程中，我们不是孤单一人。",
    name: "一勺",
    imgUrl: 1
  },
  {
    moment: "2024.06.05",
    id: 7,
    userId: 2,
    message: " 在这个旅程中，我们不是孤单一人。",
    name: "一勺",
    imgUrl: 1
  }
]

const props = defineProps({
  item: {
    type: Object,
    default: {}
  }
})
</script>

<template>
  <div class="card-detail">
    <div class="top">
      <span class="revoke">联系墙主撕掉该便签</span>
      <span class="report">举报</span>
    </div>
    <yi-card class="card-item" :note="item"></yi-card>
    <div class="form">
      <textarea placeholder="请输入评论" class="message"></textarea>
      <div class="send">
        <input placeholder="签名" class="inp"></input>
        <yi-button>确定</yi-button>
      </div>
    </div>
    <p class="title">评论 {{ item.comment }}</p>
    <ul class="comment">
      <template v-for="(item, index) in commentList" :key="index">
        <li class="item">
          <div class="user-head" :style="{ backgroundImage: portrait[item.imgUrl] }"></div>
          <div class="detail">
            <div class="detail-top">
              <span class="name">{{ item.name }}</span>
              <span class="time">{{ item.moment }}</span>
            </div>
            <div class="detail-main">
              {{ item.message }}
            </div>
          </div>
        </li>
      </template>
    </ul>
  </div>
</template>

<style scoped lang="scss">
@font-face {
  font-family: XiaoKeNaiNao;
  src: url("@/assets/fonts/xknn.ttf");
}

.card-detail {
  padding: 0 20px;
  .top {
    padding: 10px;
    .revoke {
      color: $primary-color;
      padding-right: 30px;
      cursor: pointer;
    }
    .report {
      color: $warning-color;
      cursor: pointer;
    }
  }

  .form {
    margin-top: 20px;
    .message {
      background: none;
      border: 1px solid rgba(148, 148, 148, 1);
      resize: none;
      width: 100%;
      padding: 8px;
      font-size: 16px;
      font-family: XiaoKeNaiNao;
    }
    .send {
      display: flex;
      margin-top: 10px;
      justify-content: space-between;
      .inp {
        width: 200px;
        padding: 8px;
        background: none;
        font-family: XiaoKeNaiNao;
        font-weight: 600;
        font-size: 16px;
        border: 1px solid rgba(148, 148, 148, 1);
      }
    }
  }

  .title {
    margin-top: 20px;
    padding-bottom: 30px;
    color: $gray-1;
    font-size: 16px;
    font-weight: 600;
    font-family: XiaoKeNaiNao;
  }

  .comment {
    .item {
      display: flex;
      padding-bottom: 30px;

      .user-head {
        flex: none;
        width: 28px;
        height: 28px;
        border-radius: 14px;
      }
      .detail {
        padding-left: 8px;
        .detail-top {
          display: flex;
          align-items: center;
          .name {
            font-weight: 600;
          }
          .time {
            font-size: 12px;
            padding-left: 4px;
            color: $gray-3;
          }
        }
        .detail-main {
          padding-top: 4px;
        }
      }
    }
  }
}
</style>
