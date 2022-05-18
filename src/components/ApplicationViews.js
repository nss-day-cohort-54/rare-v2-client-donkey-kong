import React from "react"
import { Route } from "react-router-dom"
import { Home } from "./home/Home.js"
import { AllPosts } from "./posts/AllPosts.js"
import { UserList } from "./users/UserList.js"
import { AllTags } from "./tags/AllTags.js"
import { AllCategories } from "./categories/AllCategories"
import { EditTagForm } from "./tags/EditTag.js"
import { User } from "./users/User.js"
import { CreatePosts } from "./posts/CreatePosts.js"
import { MyPosts } from "./posts/MyPosts.js"
import { PostsByUser } from "./posts/PostsByUser.js"
import { SinglePost } from "./posts/SinglePost.js"
import { NewTagForm } from "./tags/CreateTagForm.js"
import { NewCategoryForm } from "./categories/CreateCategoryForm.js"
import { CommentForm } from "./comments/CommentForm.js"

export const ApplicationViews = () => {
  return (
    <>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/posts/all">
        <AllPosts />
      </Route>
      <Route exact path="/users">
        <UserList />
      </Route>
      <Route exact path="/users/:userId(\d+)">
        <User listView={false} />
      </Route>
      <Route exact path="/tags">
        <AllTags />
      </Route>
      <Route exact path="/tags/edit/:tagId(\d+)">
        <EditTagForm />
      </Route>
      <Route exact path="/tags/new">
        <NewTagForm />
      </Route>
      <Route exact path="/newPost">
        <CreatePosts editing={false} />
      </Route>
      <Route exact path="/editPost/:postId(\d+)">
        <CreatePosts editing={true} />
      </Route>
      <Route exact path="/posts/single/:postId(\d+)/commentCreate">
        <CommentForm />
      </Route>
      <Route exact path="/posts/single/:postId(\d+)/commentCreate/:commentId(\d+)">
        <CommentForm />
      </Route>
      <Route exact path="/posts/single/:postId(\d+)">
        <SinglePost />
      </Route>
      <Route exact path="/posts/myPosts">
        <MyPosts />
      </Route>
      <Route exact path="/posts/user/:userId(\d+)">
        <PostsByUser />
      </Route>
      <Route exact path="/categories">
        <AllCategories />
      </Route>
      <Route exact path="/categories/create">
        <NewCategoryForm editing={false} />
      </Route>
      <Route exact path="/categories/edit/:categoryId(\d+)">
        <NewCategoryForm editing={true} />
      </Route>
    </>
  )
}
