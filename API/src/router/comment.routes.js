import express from "express";
import {
  createComment,
  getCommentsByArticle,
  getMyComments,
  updateComment,
  deleteComment,
} from "../controller/comment.controller.js";
import {
  authenticate,
  checkCommentOwnership,
} from "../middelwares/auth.middleware.js";

const router = express.Router();

router.get("/article/:articleId", getCommentsByArticle);

router.use(authenticate); // DO NOT MOVE ABOVE THE (router.get("/article/:articleId", getCommentsByArticle);)
//  OR THE SCREEN WILL GO FIREBALLLLLLLLLLLLLLLLLLLL

router.post("/", createComment);
router.get("/my-comments", getMyComments);

router.put("/:id", checkCommentOwnership, updateComment);
router.delete("/:id", checkCommentOwnership, deleteComment);

export default router;

/**
testing using postman : 

1. Create Comment
POST /api/comments
Authorization: Bearer your_token
Content-Type: application/json

{
  "content": "This is a great article!",
  "article_id": 1
}


-----

2. Get Comments for Article
GET /api/comments/article/1


----

3. Get My Comments
GET /api/comments/my-comments
Authorization: Bearer your_token

----

4. Update Comment

PUT /api/comments/1 (the id here is for the comment not hte artical)
Authorization: Bearer your_token
Content-Type: application/json

{
  "content": "Updated comment content"
}

---

5. Delete Comment

DELETE /api/comments/1
Authorization: Bearer your_token


 */
