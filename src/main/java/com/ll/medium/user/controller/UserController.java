package com.ll.medium.user.controller;



import com.ll.medium.common.dto.ResponseDto;
import com.ll.medium.user.dto.UserInfoDto;
import com.ll.medium.user.dto.UserRegisterDto;
import com.ll.medium.user.dto.UserUpdateDto;
import com.ll.medium.user.entity.User;
import com.ll.medium.user.security.UserPrinciple;
import com.ll.medium.user.service.AuthService;
import com.ll.medium.user.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/v1/member")
public class UserController {

    private final UserService userService;
    private final AuthService authService;

    @PostMapping("/join")
    public ResponseEntity<User> join(@Valid @RequestBody UserRegisterDto userRegisterDto) {
        User user = userService.register(userRegisterDto);
        return new ResponseEntity<>(user, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<?> update(@AuthenticationPrincipal UserDetails userDetails, @RequestBody UserUpdateDto userUpdateDto) {
        ResponseDto<UserUpdateDto> response = userService.update(userDetails.getUsername(), userUpdateDto);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> delete(@AuthenticationPrincipal UserPrinciple userPrinciple, HttpServletRequest request, HttpServletResponse response) {
        User user = userPrinciple.getUser();
        ResponseDto<?> res = userService.delete(user);
        authService.deleteCookie(request, response);
        return ResponseEntity.ok(res);
    }

    @GetMapping("/info")
    public ResponseEntity<UserInfoDto> getUserInfo(@AuthenticationPrincipal UserPrinciple  userPrinciple) {
        User user = userPrinciple.getUser();
        UserInfoDto userInfoDto = userService.userToUserDTO(user);
        return ResponseEntity.ok(userInfoDto);
    }

    @GetMapping("/exist/{username}")
    public ResponseEntity<Boolean> checkUserExist(@PathVariable String username) {
        boolean exists = userService.checkUserExist(username);
        return ResponseEntity.ok(exists);
    }
}
