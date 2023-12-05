import { authSocialBtnType } from '@/constants/auth';

export default function SocialLoginBtn({ socialType }) {
  const type = authSocialBtnType[socialType];

  return (
    <button
      className={`pt-4 pr-5 pb-4 pl-5 text-center w-full text-white p-3 duration-300 rounded-lg ${type?.color}`}
    >
      {type.title}
    </button>
  );
}
