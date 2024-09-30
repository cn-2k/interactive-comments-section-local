<template>
  <div class="comment-score flex items-center justify-between w-fit sm:items-start sm:mr-4">
    <div class="inline-flex py-1.5 sm:py-2 sm:gap-3 px-2 sm:px-0 justify-center items-center rounded-lg bg-base-light-grayish-blue/15 sm:flex-col">
      <button
        class="flex justify-center text-base-light-grayish-blue hover:text-base-moderate-blue"
        :class="[{ 'text-base-moderate-blue cursor-not-allowed': props.commentLiked }, { 'cursor-not-allowed': props.isMe }]"
        title="Upvote"
        :disabled="props.isMe"
        @click="handleCommentVote('upvote', props.commentId)"
      >
        <UIcon
          name="i-material-symbols-add-rounded"
        />
      </button>
      <span class="w-9 sm:w-10 text-center text-base-moderate-blue font-medium">{{ props.likes }}</span>
      <button
        class="flex justify-center text-base-light-grayish-blue hover:text-base-moderate-blue"
        :class="[{ 'text-base-moderate-blue cursor-not-allowed': props.commentDisliked }, { 'cursor-not-allowed': props.isMe }]"
        title="Down-vote"
        :disabled="props.isMe"
        @click="handleCommentVote('downvote', props.commentId)"
      >
        <UIcon
          name="i-ic-round-minus"
        />
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  isMe: boolean
  commentDisliked: boolean | undefined
  commentLiked: boolean | undefined
  commentId: string
  likes: number
}>()

const {
  handleCommentVote,
} = useComments()
</script>
