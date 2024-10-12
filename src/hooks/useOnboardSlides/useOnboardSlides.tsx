import { useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import { mockOnboardingSlides } from './mocks';

const IS_ONBOARDING_PASSED_STORAGE_KEY = 'IS_ONBOARDING_PASSED';

export const useOnboardSlides = () => {
  useEffect(() => {
    const showOnboarding = async () => {
      // Проверка состояния онбординга
      const onboardingPassed = localStorage.getItem(IS_ONBOARDING_PASSED_STORAGE_KEY);

      if (onboardingPassed !== 'confirm') {
        /*
          Модуль 4. Разработка Урок 15. Онбординг #M4L15.
          VKWebAppShowSlidesSheet показывает информационные экраны (слайды),
          которые используются для онбординга пользователя и знакомства с новыми возможностями мини-приложения или игры.
        */
        const showOnboardSlidesResult = await bridge.send(
          'VKWebAppShowSlidesSheet',
          mockOnboardingSlides,
        );

        // Установка состояния онбординга
        localStorage.setItem(IS_ONBOARDING_PASSED_STORAGE_KEY, showOnboardSlidesResult.action);
      }
    };

    void showOnboarding();
  }, []);
};
