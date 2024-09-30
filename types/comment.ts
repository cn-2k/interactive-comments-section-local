export interface CommentProps {
  id: any
  name?: string
  avatar?: string
  date?: any
  content?: string
  isReply?: boolean
  isReplying?: boolean
  replies?: CommentProps[]
  parentId?: any
  likes?: number
  commentLiked?: boolean
  commentDisliked?: boolean
  isMe?: boolean
  isNewComment?: boolean
  replyingTo?: any
}
