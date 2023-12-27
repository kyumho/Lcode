package com.ll.medium.post.repository;

import com.ll.medium.post.entity.Post;
import java.util.List;

public interface PostRepositoryCustom {
    List<Post> findTop30ByIsPublishedTrueOrderByCreatedAtDesc();
}
