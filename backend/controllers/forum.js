import ForumPost from "../models/ForumPost";

export const createPost = async (req, res) => {
  try {
    const { title, fileUrl } = req.body;
    const post = await ForumPost.create({
      title: title,
      fileUrl: fileUrl,
      postedBy: req.user._id,
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(401).json({
      message: "Post not created",
    });
  }
};

export const getPosts = async (req, res) => {
  const posts = await ForumPost.find()
    .sort({ createrAt: -1 })
    .select("title fileUrl createdAt");
  res.json(posts);
};
