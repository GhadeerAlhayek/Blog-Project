import ArticleModel from "../model/articale.model.js";



/*********************
 * Create new article
 * POST /api/articles
 ********************/
export const createArticle = async (req, res) => {
  try {
    const { title, content, image_url, published } = req.body;

    const user_id = req.user.id;

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Title and content are required",
      });
    }

    // Create article
    const newArticle = await ArticleModel.create({
      title,
      content,
      image_url,
      user_id,
      published: published === undefined ? true : published,
    });

    res.status(201).json({
      success: true,
      message: "Article created successfully",
      data: {
        article: newArticle,
      },
    });
  } catch (error) {
    console.error("Create article error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create article",
      error: error.message,
    });
  }
};
