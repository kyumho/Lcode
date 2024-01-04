package com.ll.medium.user.service;


import com.ll.medium.common.dto.ResponseDto;
import com.ll.medium.user.dto.UserInfoDto;
import com.ll.medium.user.dto.UserRegisterDto;
import com.ll.medium.user.dto.UserUpdateDto;
import com.ll.medium.user.entity.RefreshToken;
import com.ll.medium.user.entity.User;
import com.ll.medium.user.entity.VerificationToken;
import com.ll.medium.user.exception.UserNotFoundException;
import com.ll.medium.user.repository.RefreshTokenRepository;
import com.ll.medium.user.repository.UserRepository;
import com.ll.medium.user.repository.VerificationTokenRepository;
import java.time.LocalDateTime;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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
                .isPaid(false)  // 가입 시 무료 회원
                .emailVerified(false)
                .build();

        User savedUser = userRepository.save(user);

        String token = UUID.randomUUID().toString();
        VerificationToken verificationToken = new VerificationToken(token, savedUser);
        verificationTokenRepository.save(verificationToken);
        emailService.sendVerificationEmail(savedUser.getEmail(), token);

        return savedUser;
    }

    @Transactional
    public ResponseDto<UserUpdateDto> update(String username, UserUpdateDto userUpdateDto) {
        User user = userRepository.findByUsername(username).orElseThrow(()
                -> new UserNotFoundException("사용자를 찾을 수 없습니다."));

        user.updateUser(
                passwordEncoder.encode(userUpdateDto.getPassword()),
                userUpdateDto.getAddress(),
                userUpdateDto.getAddressDetail()
        );

        return ResponseDto.<UserUpdateDto>builder()
                .successMessage("유저 정보 수정에 성공했습니다.")
                .objectData(userUpdateDto).build();
    }

    @Transactional
    public ResponseDto<?> delete(User user) {
        userRepository.delete(user);
        return ResponseDto.builder()
                .successMessage("유저 정보 삭제에 성공했습니다.")
                .build();
    }

    public RefreshToken findRefreshToken(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("유저가 존재하지 않습니다"));
        return user.getRefreshToken();
    }

    @Transactional
    public void saveRefreshToken(String username, String tokenKey) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("유저가 존재하지 않습니다."));

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

    public boolean checkUserExist(String username) {
        return userRepository.findByUsername(username).isPresent();
    }

    public UserInfoDto userToUserDTO(User user) {

        UserInfoDto userDTO = new UserInfoDto();

        userDTO.setId(user.getId());
        userDTO.setUsername(user.getUsername());
        userDTO.setEmail(user.getEmail());
        userDTO.setAddress(user.getAddress());
        userDTO.setAddressDetail(user.getAddressDetail());
        userDTO.setProfileImageUrl(user.getProfilePhotoUrl());
        userDTO.setCash(user.getCash());
        userDTO.setRole(user.getRole());

        return userDTO;
    }

    public void save(User user) {
        userRepository.save(user);
    }
}
