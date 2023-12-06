package com.ll.medium.board.service;

import static java.util.stream.Stream.builder;

import com.ll.medium.board.dto.PostRequestDto;
import com.ll.medium.board.entity.Post;
import com.ll.medium.board.repository.PostRepository;
import com.ll.medium.common.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class PostService {

    private final PostRepository postRepository;

    @Transactional
    public void save(PostRequestDto postRequestDto) {

        Post post = Post.builder()
                .title(postRequestDto.getTitle())
                .content(postRequestDto.getContent())
                .build();

        postRepository.save(post);
    }


}
