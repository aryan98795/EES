import ForumPost from "../models/ForumPost.js";

export const createPost = async (req, res) => {
  try {
    const { title, fileUrl } = req.body;
    console.log(req.body);
    const post = await ForumPost.create({
      title,
      fileUrl,
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
  const posts = await ForumPost.find()
    .sort({ createdAt: -1 })
    .select("title fileUrl createdAt");

  res.json(posts);
};
