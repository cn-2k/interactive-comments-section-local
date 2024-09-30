<template>
  <div
    v-auto-animate
    class="w-full px-5 lg:w-[800px] space-y-4"
  >
    <template v-if="comments?.length">
      <div
        v-for="comment in comments"
        :key="comment.id"
        class="relative flex flex-col"
      >
        <!-- Individual Comment -->
        <CommentItem
          :id="comment.id"
          :name="comment.name"
          :avatar="comment.avatar"
          :date="comment.date"
          :content="comment.content"
          :comment-liked="comment.commentLiked"
          :comment-disliked="comment.commentDisliked"
          :likes="comment.likes"
          :is-me="comment.isMe"
          @delete="() => openDeleteModal(comment)"
        />

        <!-- Replies and Reply area for new replies -->
        <div
          v-auto-animate
          class="pl-8 lg:pl-20 space-y-4 relative"
        >
          <div class="absolute left-2 lg:left-10 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-800 mt-4" />

          <!-- Loop through replies -->
          <CommentItem
            v-for="reply in comment.replies"
            :key="reply.id"
            v-bind="reply"
            is-reply
            @delete="() => openDeleteModal(reply, comment.id)"
          />

          <!-- Reply area for new replies (replying to comment or reply) -->
          <CommentItem
            v-if="replyingToId === comment.id || comment.replies?.some(reply => reply.id === replyingToId)"
            :id="replyingToId"
            :replying-to="replyingName"
            avatar="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
            is-new-comment
            is-replying
            is-me
            is-reply
          />
        </div>
      </div>
    </template>

    <!-- No comments message -->
    <div
      v-if="!comments?.length"
      class="text-gray-400"
    >
      Ainda não há nenhum comentário, seja o primeiro!
    </div>

    <!-- New comment -->
    <CommentItem
      avatar="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
      is-new-comment
      is-me
      @send="sendComment"
    />
  </div>

  <!-- Delete comment dialog -->
  <UModal
    v-model="deleteDialog"
  >
    <div
      class="p-7 flex flex-col gap-6"
    >
      <h1 class="text-xl font-medium text-neutral-dark-blue dark:text-white">
        Delete comment
      </h1>
      <p class="text-neutral-grayish-blue dark:text-white">
        Are you sure you want to delete this comment? This will remove the comment and can't be undone.
      </p>
      <div class="flex gap-3 justify-center">
        <UButton
          label="NO, CANCEL"
          color="base"
          class="bg-neutral-grayish-blue dark:text-white hover:bg-neutral-grayish-blue/50 px-6 py-2.5 transition-colors"
          @click="deleteDialog = false"
        />
        <UButton
          label="YES, DELETE"
          color="base"
          class="bg-base-soft-red dark:text-white hover:bg-base-soft-red/50 px-6 py-2.5 transition-colors"
          @click="confirmDelete"
        />
      </div>
    </div>
  </UModal>
</template>

<script lang="ts" setup>
import CommentItem from "./CommentItem.vue"

const {
  sendComment,
  comments,
  replyingToId,
  replyingName,
  deleteDialog,
  openDeleteModal,
  confirmDelete,
} = useComments()
</script>
