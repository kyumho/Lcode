package com.ll.medium.post.service;

import com.ll.medium.like.dto.LikeRequestDto;
import com.ll.medium.like.repository.LikeRepository;
import com.ll.medium.post.dto.PostDetailDto;
import com.ll.medium.post.dto.PostPageDto;
import com.ll.medium.post.dto.PostUpdateDto;
import com.ll.medium.post.entity.Post;
import com.ll.medium.post.exception.PostNotFoundException;
import com.ll.medium.post.repository.PostRepository;
import com.ll.medium.common.dto.ResponseDto;
import com.ll.medium.user.entity.User;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PostService {

    private final PostRepository postRepository;

    @Transactional
    public void save(final Post post) {
        postRepository.save(post);
    }

    public Page<PostPageDto> findAll(Pageable pageable, String sortCode, String kwType, String keyword) {

        // 동적 정렬 및 검색 조건을 처리하는 사용자 정의 메서드를 호출합니다.
        Page<Post> postPage = postRepository.findAllWithFilters(pageable, sortCode, kwType, keyword);

        // 결과를 PostPageDto로 매핑합니다.
        return postPage.map(PostPageDto::entityToDto);
    }


    public Page<PostPageDto> findRecentPosts(int page) {
        List<Post> recentPosts = postRepository.findTop30ByIsPublishedTrueOrderByCreatedAtDesc();

        int start = Math.min(page * 9, recentPosts.size());
        int end = Math.min(start + 9, recentPosts.size());

        List<PostPageDto> pagedPosts = recentPosts.subList(start, end).stream()
                .map(PostPageDto::entityToDto)
                .collect(Collectors.toList());

        return new PageImpl<>(pagedPosts, PageRequest.of(page, 9), recentPosts.size());
    }

    public Page<PostPageDto> getNotPublishedPostsByUser(User user, Pageable pageable) {
        Pageable sortedByCreatedAtDesc = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(),
                Sort.by("createdAt").descending());
        Page<Post> posts = postRepository.findByIsPublishedFalseAndUser(user, sortedByCreatedAtDesc);

        return posts.map(PostPageDto::entityToDto);
    }


    public Page<PostPageDto> getPublishedPostsByUser(User user, Pageable pageable) {
        Pageable sortedByCreatedAtDesc = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(),
                Sort.by("createdAt").descending());
        Page<Post> posts = postRepository.findByIsPublishedTrueAndUser(user, sortedByCreatedAtDesc);

        return posts.map(PostPageDto::entityToDto);
    }


    @Transactional
    public void update(Long postId, PostUpdateDto postUpdateDto) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new PostNotFoundException("해당 게시글이 없습니다. id=" + postId));

        post.update(postUpdateDto.getTitle(), postUpdateDto.getContent(), postUpdateDto.getIsPublished(),
                postUpdateDto.getIsPaid(), postUpdateDto.getGptAnswer());
    }

    @Transactional
    public ResponseDto<PostDetailDto> getPost(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new PostNotFoundException("해당 게시글이 없습니다. id=" + id));

        // 조회수 증가
        post.incrementViews();

        // Post 엔티티를 PostDetailDto로 변환
        PostDetailDto postDetailDto = new PostDetailDto(post);

        return ResponseDto.<PostDetailDto>builder()
                .successMessage("게시글 조회에 성공했습니다.")
                .objectData(postDetailDto).build();
    }

    @Transactional
    public void deletePost(Long id) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new PostNotFoundException("해당 게시글이 없습니다. id=" + id));

        postRepository.delete(post);
    }

}
