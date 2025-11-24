'use client';

import React, { createContext, useContext } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

type Language = 'ru' | 'hy';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  ru: {
    'groom.name': 'Ваник',
    'bride.name': 'Мари',
    'date': 'Дектембери 19',
    'groom.house': '1-й переулок ул. Вардана Аджемяна, 2/1',
    'bride.house': 'Село Джрвеж, 10-я улица, 3',
    'church': 'Григор Лусаворич',
    'groom.house.time': '12:00',
    'bride.house.time': '13:30',
    'church.time': '14:30',
    'restaurant.time': '17:00',
    'groom.house.title': 'Дом жениха',
    'bride.house.title': 'Дом невесты',
    'church.title': 'Церковь',
    'restaurant.title': 'Ресторан',
    'restaurant.location': 'Ресторан',
    'invitation.title': 'Приглашение на свадьбу',
    'timeline.title': 'Программа дня',
    'gallery.title': 'Наши фотографии',
    'open.map': 'Открыть карту',
    'wishing.hero': 'Мы будем счастливы видеть вас на нашей свадьбе',
    'wishing.hero.subtitle': 'Ваше присутствие сделает наш день особенным',
    'wishing.footer.main': 'С любовью и благодарностью',
    'wishing.footer.subtitle': 'Мы с нетерпением ждем встречи с вами в этот особенный день',
    'wishing.footer.closing': 'С уважением, Ваник и Мари',
  },
  hy: {
    'groom.name': 'Վանիկ',
    'bride.name': 'Մարի',
    'date': 'Դեկտեմբերի 19',
    'groom.house': '1-ին նրբանցք Վարդան Աճեմյանի փող., 2/1',
    'bride.house': 'Ջրվեժ գյուղ, 10-րդ փողոց, 3',
    'church': 'Գրիգոր Լուսավորիչ',
    'groom.house.time': '12:00',
    'bride.house.time': '13:30',
    'church.time': '14:30',
    'restaurant.time': '17:00',
    'groom.house.title': 'Փեսայի տուն',
    'bride.house.title': 'Հարսի տուն',
    'church.title': 'Եկեղեցի',
    'restaurant.title': 'Ռեստորան',
    'restaurant.location': 'Ռեստորան',
    'invitation.title': 'Հարսանիքի հրավեր',
    'timeline.title': 'Օրվա ծրագիր',
    'gallery.title': 'Մեր լուսանկարները',
    'open.map': 'Բացել քարտեզը',
    'wishing.hero': 'Մենք երջանիկ կլինենք տեսնել ձեզ մեր հարսանիքին',
    'wishing.hero.subtitle': 'Ձեր ներկայությունը կդարձնի մեր օրը հատուկ',
    'wishing.footer.main': 'Սիրով և երախտագիտությամբ',
    'wishing.footer.subtitle': 'Մենք անհամբեր սպասում ենք ձեզ տեսնել այս հատուկ օրը',
    'wishing.footer.closing': 'Հարգանքով, Վանիկ և Մարի',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const langParam = searchParams.get('lang') as Language | null;
  const language: Language = (langParam === 'ru' || langParam === 'hy') ? langParam : 'hy';

  const setLanguage = (lang: Language) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('lang', lang);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.ru] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
