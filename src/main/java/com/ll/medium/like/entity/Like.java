package com.ll.medium.like.entity;

import com.ll.medium.post.entity.Post;
import com.ll.medium.user.entity.User;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "`like`") // 엔티티 이름을 SQL 예약어로부터 이스케이프
public class Like {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post post;

    private boolean liked;

    public Like(User user, Post post, boolean liked) {
        this.user = user;
        this.post = post;
        this.liked = liked;
    }

    // 비즈니스 메서드
    public void toggleLiked() {
        this.liked = !this.liked;
    }

    // 접근자 메서드
    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public Post getPost() {
        return post;
    }

    public boolean isLiked() {
        return liked;
    }
}