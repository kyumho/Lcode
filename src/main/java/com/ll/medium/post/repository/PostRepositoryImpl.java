package com.ll.medium.post.repository;

import com.ll.medium.post.entity.Post;
import com.ll.medium.post.entity.QPost;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.jpa.impl.JPAQuery;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.ArrayList;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

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

    @Override
    public Page<Post> findAllWithFilters(Pageable pageable, String sortCode, String kwType, String keyword) {
        JPAQuery<Post> query = new JPAQuery<>(em);
        QPost post = QPost.post;

        // 기본 조건: isPublished가 true인 게시물
        query.from(post).where(post.isPublished.isTrue());

        // keyword가 null이 아니고, 빈 문자열이 아닌 경우에만 검색 조건 적용
        if (keyword != null && !keyword.trim().isEmpty()) {
            switch (kwType) {
                case "title":
                    query.where(post.title.containsIgnoreCase(keyword));
                    break;
                case "body":
                    query.where(post.content.containsIgnoreCase(keyword));
                    break;
                case "title,body":
                    query.where(post.title.containsIgnoreCase(keyword)
                            .or(post.content.containsIgnoreCase(keyword)));
                    break;
                case "title,body,author":
                    query.where(post.title.containsIgnoreCase(keyword)
                            .or(post.content.containsIgnoreCase(keyword))
                            .or(post.user.username.containsIgnoreCase(keyword)));
                    break;
            }
        }

        // 정렬 조건 적용
        if (sortCode != null) {
            Sort sort = getSort(sortCode);
            query.orderBy(getOrderSpecifier(sort));
        } else {
            // 정렬 코드가 없을 경우 기본 정렬 (createdAt 내림차순)
            query.orderBy(post.createdAt.desc());
        }

        // 페이지네이션 적용 및 쿼리 실행
        query.offset(pageable.getOffset()).limit(pageable.getPageSize());
        List<Post> posts = query.fetch();
        long total = query.fetchCount();

        return new PageImpl<>(posts, pageable, total);
    }


    private Sort getSort(String sortCode) {
        // 기본 정렬은 생성 날짜 내림차순
        Sort sort = Sort.by("createdAt").descending();

        switch (sortCode) {
            case "hitAsc":
                sort = Sort.by("views").ascending();
                break;
            case "hitDesc":
                sort = Sort.by("views").descending();
                break;
            case "likeAsc":
                // 추천수 오름차순 정렬 로직
                sort = Sort.by("likesCount").ascending();
                break;
            case "likeDesc":
                // 추천수 내림차순 정렬 로직
                sort = Sort.by("likesCount").descending();
                break;
        }
        return sort;
    }

    private OrderSpecifier<?>[] getOrderSpecifier(Sort sort) {
        List<OrderSpecifier<?>> orders = new ArrayList<>();

        if (sort != null) {
            for (Sort.Order order : sort) {
                OrderSpecifier<?> orderSpecifier = toOrderSpecifier(order);
                if (orderSpecifier != null) {
                    orders.add(orderSpecifier);
                }
            }
        }

        return orders.toArray(new OrderSpecifier[0]);
    }

    private OrderSpecifier<?> toOrderSpecifier(Sort.Order order) {
        QPost post = QPost.post;

        switch (order.getProperty()) {
            case "createdAt":
                return order.isAscending() ? post.createdAt.asc() : post.createdAt.desc();
            case "views":
                return order.isAscending() ? post.views.asc() : post.views.desc();
            case "likesCount":
                return order.isAscending() ? post.likesCount.asc() : post.likesCount.desc();
            // 다른 필드에 대한 정렬 규칙 추가
            default:
                return null;
        }
    }

}
