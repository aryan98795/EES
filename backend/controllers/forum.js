import ForumPost from "../models/ForumPost.js";

export const createPost = async (req, res) => {
  try {
    const { title, fileUrl, formUrl } = req.body;
    const post = await ForumPost.create({
      title,
      fileUrl,
      formUrl,
    });

    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Post not created",
    });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await ForumPost.find()
      .sort({ createdAt: -1 })
      .select("title fileUrl formUrl createdAt");

    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to fetch posts",
    });
  }
};
