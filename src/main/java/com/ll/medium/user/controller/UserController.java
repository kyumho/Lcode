package com.ll.medium.user.controller;



import com.ll.medium.user.dto.UserInfoDto;
import com.ll.medium.user.dto.UserRegisterDto;
import com.ll.medium.user.entity.User;
import com.ll.medium.user.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/member")
public class UserController {

    private final UserService userService;

    @PostMapping("/join")
    public ResponseEntity<User> join(@Valid @RequestBody UserRegisterDto userRegisterDto) {
        User user = userService.register(userRegisterDto);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @GetMapping("/info")
    public ResponseEntity<UserInfoDto> getUserInfo(@AuthenticationPrincipal UserDetails userDetails) {
        UserInfoDto userInfoDto = userService.userToUserDTO(userDetails.getUsername());
        return ResponseEntity.ok(userInfoDto);
    }

    @GetMapping("/exist/{username}")
    public ResponseEntity<Boolean> checkUserExist(@PathVariable String username) {
        boolean exists = userService.checkUserExist(username);
        return ResponseEntity.ok(exists);
    }
}
