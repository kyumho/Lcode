package com.ll.medium.user.service;


import com.ll.medium.user.dto.UserInfoDto;
import com.ll.medium.user.dto.UserRegisterDto;
import com.ll.medium.user.entity.RefreshToken;
import com.ll.medium.user.entity.User;
import com.ll.medium.user.entity.VerificationToken;
import com.ll.medium.user.repository.RefreshTokenRepository;
import com.ll.medium.user.repository.UserRepository;
import com.ll.medium.user.repository.VerificationTokenRepository;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RefreshTokenRepository refreshTokenRepository;
    private final EmailService emailService; // 가상의 이메일 서비스
    private final VerificationTokenRepository verificationTokenRepository;


    @Transactional
    public User register(UserRegisterDto userRegisterDto) {
        if (userRepository.existsByEmail(userRegisterDto.getEmail())) {
            throw new IllegalArgumentException("이미 가입된 이메일입니다.");
        }

        User user = User.builder()
                .username(userRegisterDto.getUsername())
                .password(passwordEncoder.encode(userRegisterDto.getPassword()))
                .email(userRegisterDto.getEmail())
                .address(userRegisterDto.getAddress())
                .addressDetail(userRegisterDto.getAddressDetail())
                .profilePhotoUrl(userRegisterDto.getProfilePictureUrl())
                .createdAt(LocalDateTime.now())
                .role("USER")
                .emailVerified(false)
                .build();

        User savedUser = userRepository.save(user);

        String token = UUID.randomUUID().toString();
        VerificationToken verificationToken = new VerificationToken(token, savedUser);
        verificationTokenRepository.save(verificationToken);
        emailService.sendVerificationEmail(savedUser.getEmail(), token);

        return savedUser;
    }

    public RefreshToken findRefreshToken(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("유저가 존재하지 않습니다"));
        return user.getRefreshToken();
    }

    @Transactional
    public void saveRefreshToken(String username, String tokenKey) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new IllegalArgumentException("유저가 존재하지 않습니다."));

        RefreshToken refreshToken = RefreshToken.builder()
                .keyValue(tokenKey)
                .build();

        refreshTokenRepository.save(refreshToken);

        user = user.toBuilder()
                .refreshToken(refreshToken)
                .build();

        userRepository.save(user);
    }

    @Transactional
    public void verifyEmail(User user) {
        user.verifyEmail();
        userRepository.save(user);
    }

    public User getUserByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("사용자를 찾을 수 없습니다."));
    }

    public UserInfoDto userToUserDTO(String username) {
        User user = getUserByUsername(username);
        UserInfoDto userDTO = new UserInfoDto();

        userDTO.setEmail(user.getEmail());
        userDTO.setAddress(user.getAddress());
        userDTO.setAddressDetail(user.getAddressDetail());
        userDTO.setProfileImageUrl(user.getProfilePhotoUrl());

        return userDTO;
    }
}
