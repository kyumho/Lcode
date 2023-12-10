package com.ll.medium.post.repository;

import com.ll.medium.post.entity.Post;
import com.ll.medium.post.entity.QPost;
import com.querydsl.jpa.impl.JPAQuery;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.List;

public class PostRepositoryImpl implements PostRepositoryCustom {

    @PersistenceContext
    private EntityManager em;

    @Override
    public List<Post> findTop30ByIsPublishedTrueOrderByCreatedAtDesc() {
        JPAQuery<Post> query = new JPAQuery<>(em);
        QPost post = QPost.post;  // QPost는 QueryDSL에서 자동으로 생성해주는 클래스입니다.

        return query
                .select(post)
                .from(post)
                .where(post.isPublished.isTrue())
                .orderBy(post.createdAt.desc())
                .limit(30)
                .fetch();
    }

}
