package com.ll.medium.common.config;

import com.ll.medium.post.entity.Post;
import com.ll.medium.post.repository.PostRepository;
import com.ll.medium.user.entity.User;
import com.ll.medium.user.repository.UserRepository;
import java.util.stream.IntStream;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Profile("!prod")
public class NotProd implements ApplicationRunner {

    private final PostRepository postRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(ApplicationArguments args) throws Exception {
        if (userRepository.count() == 0) {

            IntStream.rangeClosed(1, 100).forEach(i -> {
                User testUser = User
                        .builder()
                        .username("test" + i)
                        .password(passwordEncoder.encode("test" + i))
                        .email("test" + i + "@test.com")
                        .address("서울특별시" + i)
                        .addressDetail("강남구" + i)
                        .isPaid(true)
                        .emailVerified(true)
                        .build();

                userRepository.save(testUser);

                Post post = Post.builder()
                        .title("Title " + i)
                        .content("Content " + i)
                        .user(testUser)
                        .isPublished(true)
                        .build();

                postRepository.save(post);
            });
        }
    }
}
