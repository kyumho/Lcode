# Lcode

<hr>

## 1. 프로젝트 개요

<hr>

* **Lcode는 블로그 플랫폼 이다.**
* **본인의 글을 유료화 할 수 있다.**
* **Lcode에 가입 이후에 유료 멤버십에 가입하면 유료글을 볼 수 있다.**
* **멤버십은 유지비용은 달에 2천원이다.**
* **Lcode은 한달에 한번 유료글 작성자에게 조회수를 기준으로 멤버십 수익의 일정부분을 캐시로 정산해준다.**
* **해당 캐시는 사이트내에서 돈처럼 사용가능하고 원할 때 환전할 수 있다.**
* **이번 후반기 미션에서는 멤버십기능, 정산기능을 구현한다.**

## 2. 사용한 기술 스택<hr>

* 업데이트 예정!! 

![img_1.png](백엔드_기술스택.png)

![img_2.png](프론트_기술스택.png)


## 3. 프로젝트 구조

<hr>

## ERD

![img.png](ERD.png)

## 파일 구조

**[프론트엔드]**
```bash
📦src
 ┣ 📂api
 ┣ 📂app
 ┃ ┣ 📂ai
 ┃ ┃ ┗ 📜page.js
 ┃ ┣ 📂api
 ┃ ┃ ┗ 📂confirmPayment
 ┃ ┃ ┃ ┗ 📜route.js
 ┃ ┣ 📂auth
 ┃ ┃ ┣ 📂signin
 ┃ ┃ ┃ ┣ 📂kakao
 ┃ ┃ ┃ ┃ ┗ 📂callback
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.js
 ┃ ┃ ┃ ┗ 📜page.js
 ┃ ┃ ┗ 📂signup
 ┃ ┃ ┃ ┗ 📜page.js
 ┃ ┣ 📂board
 ┃ ┃ ┣ 📂write
 ┃ ┃ ┃ ┣ 📂[id]
 ┃ ┃ ┃ ┃ ┗ 📜page.js
 ┃ ┃ ┃ ┗ 📜page.js
 ┃ ┃ ┣ 📂[id]
 ┃ ┃ ┃ ┗ 📜page.js
 ┃ ┃ ┗ 📜page.js
 ┃ ┣ 📂membership
 ┃ ┃ ┣ 📂fail
 ┃ ┃ ┃ ┗ 📜page.js
 ┃ ┃ ┣ 📂success
 ┃ ┃ ┃ ┗ 📜page.js
 ┃ ┃ ┗ 📜page.js
 ┃ ┣ 📂mypage
 ┃ ┃ ┣ 📂mycomment
 ┃ ┃ ┃ ┗ 📜page.js
 ┃ ┃ ┣ 📂mypost
 ┃ ┃ ┃ ┗ 📜page.js
 ┃ ┃ ┣ 📂myrecommend
 ┃ ┃ ┃ ┗ 📜page.js
 ┃ ┃ ┣ 📂userinfo
 ┃ ┃ ┃ ┣ 📂delete
 ┃ ┃ ┃ ┃ ┗ 📜page.js
 ┃ ┃ ┃ ┣ 📂edit
 ┃ ┃ ┃ ┃ ┗ 📜page.js
 ┃ ┃ ┃ ┗ 📜page.js
 ┃ ┃ ┣ 📜layout.js
 ┃ ┃ ┗ 📜page.js
 ┃ ┣ 📜layout.js
 ┃ ┗ 📜page.js
 ┣ 📂components
 ┃ ┣ 📂auth
 ┃ ┃ ┣ 📜DeleteUser.js
 ┃ ┃ ┣ 📜EditUser.js
 ┃ ┃ ┣ 📜KakaoLogin.js
 ┃ ┃ ┣ 📜KakaoSignInCallback.js
 ┃ ┃ ┣ 📜MyPageUserInfo.js
 ┃ ┃ ┣ 📜SigninForm.js
 ┃ ┃ ┗ 📜SignupForm.js
 ┃ ┣ 📂comment
 ┃ ┃ ┗ 📜Comment.js
 ┃ ┣ 📂membership
 ┃ ┃ ┣ 📜Checkout.js
 ┃ ┃ ┣ 📜MembershipInfo.js
 ┃ ┃ ┗ 📜SuccessPage.js
 ┃ ┣ 📂post
 ┃ ┃ ┣ 📜AllPost.js
 ┃ ┃ ┣ 📜EditPost.js
 ┃ ┃ ┣ 📜LikeButton.js
 ┃ ┃ ┣ 📜MyPost.js
 ┃ ┃ ┣ 📜Pagination.js
 ┃ ┃ ┣ 📜Post.js
 ┃ ┃ ┣ 📜PostDetail.js
 ┃ ┃ ┣ 📜RecentPost.js
 ┃ ┃ ┣ 📜SearchPost.js
 ┃ ┃ ┗ 📜WritePost.js
 ┃ ┗ 📂ui
 ┃ ┃ ┣ 📜Chatbot.js
 ┃ ┃ ┣ 📜CustomToast.js
 ┃ ┃ ┣ 📜Dropdown.js
 ┃ ┃ ┣ 📜MyPageSidebar.js
 ┃ ┃ ┣ 📜Navbar.js
 ┃ ┃ ┗ 📜ProfilePicture.js
 ┣ 📂config
 ┃ ┗ 📜axios-config.js
 ┣ 📂constants
 ┃ ┗ 📜auth.js
 ┣ 📂context
 ┃ ┗ 📜TanStackProvider.js
 ┣ 📂hooks
 ┃ ┗ 📜useUser.js
 ┣ 📂styles
 ┃ ┣ 📜globals.css
 ┃ ┗ 📜toss.css
 ┗ 📂utils
 ┃ ┣ 📜comment.js
 ┃ ┣ 📜openai.js
 ┃ ┣ 📜post.js
 ┃ ┗ 📜regex.js
```
[백엔드]
```bash
📦src
 ┣ 📂main
 ┃ ┣ 📂generated
 ┃ ┃ ┗ 📂com
 ┃ ┃ ┃ ┗ 📂ll
 ┃ ┃ ┃ ┃ ┗ 📂medium
 ┃ ┃ ┃ ┃ ┃ ┣ 📂comment
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜QComment.java
 ┃ ┃ ┃ ┃ ┃ ┣ 📂common
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜QDateEntity.java
 ┃ ┃ ┃ ┃ ┃ ┣ 📂like
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜QLike.java
 ┃ ┃ ┃ ┃ ┃ ┣ 📂post
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜QPost.java
 ┃ ┃ ┃ ┃ ┃ ┣ 📂revenue
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜QRevenue.java
 ┃ ┃ ┃ ┃ ┃ ┗ 📂user
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜QRefreshToken.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜QUser.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜QVerificationToken.java
 ┃ ┣ 📂java
 ┃ ┃ ┗ 📂com
 ┃ ┃ ┃ ┗ 📂ll
 ┃ ┃ ┃ ┃ ┗ 📂medium
 ┃ ┃ ┃ ┃ ┃ ┣ 📂comment
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜CommentController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜CommentDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜CommentSaveDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜CommentUpdateDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜Comment.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜CommentRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜CommentService.java
 ┃ ┃ ┃ ┃ ┃ ┣ 📂common
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂config
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜MonthlyEarningScheduler.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜NotProd.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜SecurityConfig.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜WebConfig.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜CorsCheckController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜HomeController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜SearchController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ErrorResponseDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜ResponseDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜DateEntity.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂exception
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜DataNotFoundException.java
 ┃ ┃ ┃ ┃ ┃ ┣ 📂like
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜LikeController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜LikeRequestDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜LikeStatus.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜LikeStatusDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜Like.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜LikeRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜LikeService.java
 ┃ ┃ ┃ ┃ ┃ ┣ 📂post
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜PostController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜PostDetailDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜PostDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜PostPageDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜PostRequestDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜PostUpdateDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜Post.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜PostRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜PostRepositoryCustom.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜PostRepositoryImpl.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜PostService.java
 ┃ ┃ ┃ ┃ ┃ ┣ 📂revenue
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜Revenue.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜RevenueRepository.java
 ┃ ┃ ┃ ┃ ┃ ┣ 📂user
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂config
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜EmailConfig.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜MailProperties.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜WebClientConfig.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂controller
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜AuthController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜EmailController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜OAuthController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜UserController.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂dto
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜CheckUserExistDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜KakaoCodeDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜KakaoPropertiesDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜KakaoTokenResponseDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜KakaoUserInfoDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜LoginRequestDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜LoginResponseDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜UserInfoDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜UserRegisterDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜UserUpdateDto.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜RefreshToken.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜SocialProvider.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜User.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜UserRole.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜VerificationToken.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂exception
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜UserNotFoundException.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂repository
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜RefreshTokenRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜UserRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜VerificationTokenRepository.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂security
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜JwtAuthenticationFilter.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜JwtTokenUtil.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜UserDetailsServiceImpl.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜UserPrinciple.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂service
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜AuthService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜DevAuthService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜EmailService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜KakaoOAuth2Service.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜ProdAuthService.java
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜UserService.java
 ┃ ┃ ┃ ┃ ┃ ┗ 📜MediumApplication.java
 ┃ ┗ 📂resources
 ┃ ┃ ┣ 📂templates
 ┃ ┃ ┣ 📜application-db.yml
 ┃ ┃ ┣ 📜application-devdb.yml
 ┃ ┃ ┣ 📜application-mail.yml
 ┃ ┃ ┣ 📜application-security.yml
 ┃ ┃ ┗ 📜application.yml
 ┗ 📂test
 ┃ ┗ 📂java
 ┃ ┃ ┗ 📂com
 ┃ ┃ ┃ ┗ 📂ll
 ┃ ┃ ┃ ┃ ┗ 📂medium
 ┃ ┃ ┃ ┃ ┃ ┗ 📂common
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂config
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜MonthlyEarningSchedulerTest.java
```


## 4. 기능


<hr>


### 구현되어 있는 기능.

- [x] **회원 CRUD**
- [x] **게시글 CRUD**
- [x] **댓글 CRUD**
- [x] **결제 기능**
- [x] **유료 멤버십 적용**
- [x] **유료 글 적용**
- [x] **카카오 소셜로그인**
- [x] **마크다운 문법으로 보이게(상세, 리스트)**
- [x] **조회수 기능**
- [x] **추천 기능**
- [x] **검색 기능**
- [x] **멤버쉽 정산 기능**


### 추가 기능

- [x] **GPT 질문 기능**
- [x] **이메일 인증 기능**
- [x] **주소 검색 기능**

## 5. 배포
<hr>

- **프론트엔드 : Vercel, 백엔드: NCP**</br>
- [미디엄 클론 배포 링크](https://www.lionshop.me)
- **테스트용 아이디** : <br>
아이디, 비밀번호 동일!! test1 ~ test50 : 일반 유저 / test51 ~ test100 : 프리미엄 유저<br>
ex) 아이디 : test1 / 비밀번호 : test1
