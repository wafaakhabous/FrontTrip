import React from 'react';

const BlogPostForm = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-offset-1 col-md-10 col-sm-12">
          <div className="blog-single-post-thumb"></div>
    <div className="blog-comment-form">
      <h3>Post a Blog</h3>
      <form action="#" method="post">
        <input type="text" className="form-control" placeholder="Title" name="title" required />
        <textarea name="content" rows="5" className="form-control" id="content" placeholder="Blog Content" required></textarea>
        <div className="col-md-3 col-sm-4">
          <input name="submit" type="submit" className="form-control" id="submit" value="Post Your Blog" />
        </div>
      </form>
    </div>
    </div>
        </div>
      </div>
  );
};

export default BlogPostForm;
