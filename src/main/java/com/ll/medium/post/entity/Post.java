package com.ll.medium.post.entity;


import static jakarta.persistence.FetchType.LAZY;
import static jakarta.persistence.GenerationType.IDENTITY;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.ll.medium.common.entity.DateEntity;
import com.ll.medium.user.entity.User;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;


@Builder
@Getter
@AllArgsConstructor(access = AccessLevel.PROTECTED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString(callSuper = true)
@Entity
public class Post extends DateEntity {
    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    @Column(columnDefinition = "LONGTEXT")
    private String title;

    @Column(columnDefinition = "LONGTEXT")
    private String content;

    @Column(columnDefinition = "LONGTEXT")
    private String gptAnswer;

    @Builder.Default
    private Long views = 0L;

    @Builder.Default
    private int likesCount = 0;

    @Column(name = "is_published")
    private Boolean isPublished;

    @Builder.Default
    private Boolean isPaid = false;

    @ManyToOne(fetch = LAZY)
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonBackReference
    private User user;

    public void incrementViews() {
        this.views++;
    }

    public void incrementLikesCount() {
        this.likesCount++;
    }

    public void decrementLikesCount() {
        this.likesCount--;
    }

    public void update(String title, String content, boolean isPublished,boolean isPaid, String gptAnswer) {
        this.title = title;
        this.content = content;
        this.isPublished = isPublished;
        this.isPaid = isPaid;
        this.gptAnswer = gptAnswer;
    }

}
