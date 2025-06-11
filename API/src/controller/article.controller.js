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

/*********************
 * Get all articles
 * GET /api/articles
 *********************/
export const getAllArticles = async (req, res) => {
  try {
    const articles = await ArticleModel.getAll();

    res.status(200).json({
      success: true,
      message: "Articles retrieved successfully",
      data: {
        articles,
        count: articles.length,
      },
    });
  } catch (error) {
    console.error("Get all articles error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve articles",
      error: error.message,
    });
  }
};

/***************************
 * Get single article by ID
 * GET /api/articles/:id
 **************************/
export const getArticleById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ID
    if (!id || isNaN(id)) {
      return res.status(400).json({
        success: false,
        message: "Valid article ID is required",
      });
    }

    const article = await ArticleModel.findById(parseInt(id));

    if (!article) {
      return res.status(404).json({
        success: false,
        message: "Article not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Article retrieved successfully",
      data: {
        article,
      },
    });
  } catch (error) {
    console.error("Get article by ID error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve article",
      error: error.message,
    });
  }
};


/*********************************************************
 * Get articles by current user (requires authentication)
 * GET /api/articles/my-articles
 ********************************************************/
export const getMyArticles = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get all articles and filter by user ID manually
    const allArticles = await ArticleModel.getAll();
    const userArticles = allArticles.filter(article => article.user_id === userId);

    res.status(200).json({
      success: true,
      message: "Your articles retrieved successfully",
      data: {
        articles: userArticles,
        count: userArticles.length
      }
    });

  } catch (error) {
    console.error("Get my articles error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve your articles",
      error: error.message
    });
  }
};

/*************************
 * Update article
 * PUT /api/articles/:id
 ************************/
export const updateArticle = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, image_url, published } = req.body;

    // No need to check ownership - middleware already did it!
    const updatedArticle = await ArticleModel.update(id, {
      title,
      content,
      image_url,
      published
    });

    res.status(200).json({
      success: true,
      message: "Article updated successfully",
      data: { article: updatedArticle }
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update article"
    });
  }
};

/*************************
 * Delete article
 * DELETE /api/articles/:id
 ************************/
export const deleteArticle = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await ArticleModel.delete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Article not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Article deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete article"
    });
  }
};