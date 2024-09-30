import { ref } from "vue"
import { useStorage } from "@vueuse/core"
import type { CommentProps } from "~/types/comment"

const replyingToId = ref<string>("")
const replyingName = ref<string | undefined>("")

const defaultComments: CommentProps[] = [
  {
    id: "y123",
    avatar: "https://flowbite.com/docs/images/people/profile-picture-4.jpg",
    content: "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
    date: new Date(),
    name: "amyrobson",
    likes: 12,
    isNewComment: false,
    isReply: false,
    commentDisliked: false,
    commentLiked: false,
  },
  {
    id: "y1234",
    avatar: "https://flowbite.com/docs/images/people/profile-picture-3.jpg",
    content: "Woah, your project look awesome! How long have you been coding for? I'm still new, but think I want to dive into React as well soon. Perhaps you can give me an insight on where I can learn React? Thanks!",
    date: new Date(),
    name: "maxblagun",
    likes: 5,
    commentDisliked: false,
    commentLiked: false,
    replies: [
      {
        id: "y54634",
        avatar: "https://flowbite.com/docs/images/people/profile-picture-2.jpg",
        content: "If you're still new, I'd recommend focusing on the fundamentals of HTML, CSS, and JS before considering React. It's very tempting to jump ahead but lay a solid foundation first.",
        date: new Date(),
        name: "ramsesmiron",
        likes: 4,
        isReply: true,
        commentDisliked: false,
        commentLiked: false,
      },
    ],
  },
]

const comments = useStorage<CommentProps[]>("comments", defaultComments)

export function useComments() {
  const deleteDialog = ref<boolean>(false)
  const commentToDelete = ref<{ comment: CommentProps, parentId?: number } | null>(null)

  function findParentComment(commentId: any): CommentProps | null {
    return comments.value.find(c =>
      c.id === commentId || (c.replies?.some(reply => reply.id === commentId)),
    ) || null
  }

  function handleReply(comment: CommentProps) {
    replyingToId.value = comment.id
    replyingName.value = comment.name
  }

  function handleCancelReply() {
    replyingToId.value = ""
  }

  function sendComment(comment: CommentProps) {
    // Busca o comentário pai ou o comentário com a resposta
    const parentComment = findParentComment(replyingToId.value)

    if (parentComment) {
      // Adiciona a nova resposta no array de replies do comentário pai
      parentComment.replies = parentComment.replies || []
      parentComment.replies.push({
        ...comment,
        isReply: true,
        isNewComment: false,
      })
      replyingToId.value = ""
    }
    else {
      // Se não houver pai, adiciona o comentário como principal
      comments.value.push(comment)
    }
  }

  function updateComment(item: CommentProps) {
    comments.value = comments.value.map((comment) => {
      if (comment.id === item.id) {
        return { ...comment, content: item.content, date: item.date }
      }
      else if (comment.replies) {
        comment.replies = comment.replies.map((reply) => {
          if (reply.id === item.id) {
            return { ...reply, content: item.content, date: item.date }
          }
          return reply
        })
      }
      return comment
    })
  }

  function handleDelete(comment: CommentProps, parentId?: number) {
    if (parentId) {
      const parentComment = comments.value.find(c => c.id === parentId)
      if (parentComment && parentComment.replies) {
        parentComment.replies = parentComment.replies.filter(r => r.id !== comment.id)
      }
    }
    else {
      comments.value = comments.value.filter(c => c.id !== comment.id)
    }
  }

  function openDeleteModal(comment: CommentProps, parentId?: number) {
    commentToDelete.value = { comment, parentId }
    deleteDialog.value = true
  }

  function confirmDelete() {
    if (commentToDelete.value) {
      const { comment, parentId } = commentToDelete.value
      handleDelete(comment, parentId)
      deleteDialog.value = false
      commentToDelete.value = null
    }
  }

  function applyVote(comment: CommentProps, flag: string) {
    if (flag === "upvote") {
      if (!comment.commentLiked) {
        comment.likes = (comment.likes || 0) + 1
        comment.commentLiked = true
        comment.commentDisliked = false
      }
    }
    else if (flag === "downvote") {
      if (!comment.commentDisliked) {
        comment.likes = (comment.likes || 0) - 1
        comment.commentDisliked = true
        comment.commentLiked = false
      }
    }
  }

  function handleCommentVote(flag: string, commentId: string) {
    comments.value = comments.value.map((comment) => {
      if (comment.id === commentId) {
        applyVote(comment, flag)
      }
      else if (comment.replies) {
        comment.replies = comment.replies.map((reply) => {
          if (reply.id === commentId) {
            applyVote(reply, flag)
          }
          return reply
        })
      }
      return comment
    })
  }

  return {
    comments,
    replyingToId,
    replyingName,
    deleteDialog,
    findParentComment,
    handleReply,
    sendComment,
    updateComment,
    handleCommentVote,
    confirmDelete,
    openDeleteModal,
    handleCancelReply,
  }
}
