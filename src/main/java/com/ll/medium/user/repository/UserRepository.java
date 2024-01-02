package com.ll.medium.user.repository;


import com.ll.medium.user.entity.User;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    Optional<User> findByUsername(String username);

    boolean existsByEmail(String email);

    // 'PAID' 역할을 가진 사용자 수를 세는 메서드
    int countByRole(String role);
}
