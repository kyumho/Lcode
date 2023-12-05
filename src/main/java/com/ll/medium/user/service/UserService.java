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
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RefreshTokenRepository refreshTokenRepository;
    private final EmailService emailService; // 가상의 이메일 서비스
    private final VerificationTokenRepository verificationTokenRepository;

    public User register(UserRegisterDto userRegisterDto) {
        if (userRepository.existsByEmail(userRegisterDto.getEmail())) {
            throw new IllegalArgumentException("이미 가입된 이메일입니다.");
        }

        User user = User.builder()
                .email(userRegisterDto.getEmail())
                .password(passwordEncoder.encode(userRegisterDto.getPassword()))
                .phoneNumber(userRegisterDto.getPhoneNumber())
                .address(userRegisterDto.getAddress())
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

    public RefreshToken findRefreshToken(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("유저가 존재하지 않습니다"));
        return user.getRefreshToken();
    }

    public void saveRefreshToken(String email, String tokenKey) {
        User user = userRepository.findByEmail(email)
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

    public void verifyEmail(User user) {
        user.verifyEmail();
        userRepository.save(user);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public UserInfoDto userToUserDTO(String email) {
        Optional<User> userByEmail = getUserByEmail(email);
        UserInfoDto userDTO = new UserInfoDto();

        if (userByEmail.isPresent()){
            User user = userByEmail.get();
            userDTO.setEmail(user.getEmail());
            userDTO.setAddress(user.getAddress());
            userDTO.setPhoneNumber(user.getPhoneNumber());
            userDTO.setProfileImageUrl(user.getProfilePhotoUrl());
        }
        return userDTO;
    }
}
