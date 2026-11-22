"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

export type Language = "vi" | "en";

const translations = {
  vi: {
    // Navigation
    "nav.docs": "Tài liệu",
    "nav.contributors": "Đóng góp",
    "nav.roadmap": "Lộ trình",
    "nav.wallpapers": "Kho hình nền",
    "nav.projects": "Dự án",
    "nav.signIn": "Đăng nhập",
    "nav.account": "Tài khoản",
    "nav.dashboard": "Bảng điều khiển",
    "nav.signOut": "Đăng xuất",
    "nav.lightMode": "Chế độ sáng",
    "nav.darkMode": "Chế độ tối",
    "nav.switchLang": "English",

    // Wallpapers page
    "wallpapers.title": "Kho hình nền",
    "wallpapers.subtitle": "Khám phá các hình nền động do cộng đồng CAPlayground tạo.",
    "wallpapers.loading": "Đang tải danh sách hình nền...",
    "wallpapers.error": "Hiện không thể tải danh sách hình nền. Vui lòng thử lại sau.",

    // Settings Panel
    "settings.title": "Cài đặt trình biên tập",
    "settings.language": "Ngôn ngữ",
    "settings.interfaceDensity": "Mật độ giao diện",
    "settings.default": "Mặc định",
    "settings.defaultDesc": "Khoảng cách và kích thước tiêu chuẩn",
    "settings.compact": "Thu gọn",
    "settings.compactDesc": "Tối ưu diện tích màn hình",
    "settings.snapping": "Bắt dính (Snapping)",
    "settings.snapEdges": "Bắt dính cạnh khung hình",
    "settings.snapLayers": "Bắt dính các lớp khác",
    "settings.snapResize": "Bắt dính khi đổi kích thước",
    "settings.snapRotation": "Bắt dính góc xoay (0°, 90°, 180°, 270°)",
    "settings.sensitivity": "Độ nhạy",
    "settings.reset": "Đặt lại",
    "settings.layerControls": "Điều khiển lớp",
    "settings.showGeometryResize": "Hiện nút đổi kích thước hình học",
    "settings.showAlignButtons": "Hiện nút căn chỉnh",
    "settings.dragSensitivity": "Độ nhạy khi kéo thông số",
    "settings.dragSensitivityDesc": "Điều chỉnh tốc độ thay đổi giá trị khi kéo các ô số trong bảng thuộc tính.",
    "settings.preview": "Xem trước",

    // Mobile Bottom Bar
    "mobile.panels": "Bảng",
    "mobile.canvas": "Khung vẽ",
    "mobile.chooseActiveCA": "Chọn lớp CA đang sửa",
    "mobile.showBackground": "Hiện lớp nền",
    "mobile.background": "Nền (Background)",
    "mobile.backgroundDesc": "Hiển thị phía sau đồng hồ.",
    "mobile.floating": "Nổi (Floating)",
    "mobile.floatingDesc": "Hiển thị phía trước đồng hồ.",

    // Layers & States
    "layers.title": "Các lớp (Layers)",
    "layers.addLayer": "Thêm lớp",
    "layers.textLayer": "Lớp văn bản",
    "layers.basicLayer": "Lớp cơ bản",
    "layers.gradientLayer": "Lớp chuyển sắc",
    "layers.imageLayer": "Lớp hình ảnh…",
    "states.title": "Trạng thái (States)",
    "states.viewAll": "Xem tất cả",
    "states.overview": "Tổng quan chuyển đổi trạng thái",
    "states.available": "Trạng thái hiện có",
    "states.overridesByLayer": "Ghi đè trạng thái theo lớp",

    // Inspector Tabs
    "tab.geometry": "Hình học",
    "tab.compositing": "Hòa trộn",
    "tab.content": "Nội dung",
    "tab.text": "Văn bản",
    "tab.gradient": "Chuyển sắc",
    "tab.image": "Hình ảnh",
    "tab.video": "Video",
    "tab.animations": "Hoạt ảnh",
    "tab.gyro": "Con quay (Gyro)",
    "tab.emitter": "Hệ thống hạt",
    "tab.replicator": "Nhân bản",
    "tab.filters": "Bộ lọc",

    // Export Dialog
    "export.button": "Xuất file",
    "export.back": "Quay lại",
    "export.title": "Xuất dự án",
    "export.description": "Chọn tên tệp, định dạng và giấy phép, sau đó xuất dự án của bạn.",
    "export.fileName": "Tên tệp",
    "export.format": "Định dạng",
    "export.caBundle": "Gói .ca",
    "export.tendies": "Tendies",
    "export.caDesc": "Tải tệp .zip chứa Background.ca và Floating.ca của bạn.",
    "export.tendiesDesc": "Tạo tệp hình nền .tendies tương thích với Nugget và Pocket Poster.",
    "export.successTitle": "Xuất thành công",
    "export.failTitle": "Xuất thất bại",
    "export.caFailDesc": "Không thể xuất tệp .ca. Vui lòng thử lại.",
    "export.tendiesFailDesc": "Không thể xuất tệp .tendies. Vui lòng thử lại.",
  },
  en: {
    // Navigation
    "nav.docs": "Docs",
    "nav.contributors": "Contributors",
    "nav.roadmap": "Roadmap",
    "nav.wallpapers": "Wallpapers",
    "nav.projects": "Projects",
    "nav.signIn": "Sign In",
    "nav.account": "Account",
    "nav.dashboard": "Dashboard",
    "nav.signOut": "Sign out",
    "nav.lightMode": "Light Mode",
    "nav.darkMode": "Dark Mode",
    "nav.switchLang": "Tiếng Việt",

    // Wallpapers page
    "wallpapers.title": "Wallpaper Gallery",
    "wallpapers.subtitle": "Browse wallpapers made by the CAPlayground community.",
    "wallpapers.loading": "Loading wallpapers...",
    "wallpapers.error": "Unable to load wallpapers right now. Please try again later.",

    // Settings Panel
    "settings.title": "Editor Settings",
    "settings.language": "Language",
    "settings.interfaceDensity": "Interface Density",
    "settings.default": "Default",
    "settings.defaultDesc": "Standard spacing and sizes",
    "settings.compact": "Compact",
    "settings.compactDesc": "Maximizes screen real estate",
    "settings.snapping": "Snapping",
    "settings.snapEdges": "Snap to canvas edges",
    "settings.snapLayers": "Snap to other layers",
    "settings.snapResize": "Snap when resizing",
    "settings.snapRotation": "Snap rotation (0°, 90°, 180°, 270°)",
    "settings.sensitivity": "Sensitivity",
    "settings.reset": "Reset",
    "settings.layerControls": "Layer Controls",
    "settings.showGeometryResize": "Show geometry resize buttons",
    "settings.showAlignButtons": "Show align buttons",
    "settings.dragSensitivity": "Drag-to-change sensitivity",
    "settings.dragSensitivityDesc": "Adjusts how fast values change when dragging numeric fields in the inspector.",
    "settings.preview": "Preview",

    // Mobile Bottom Bar
    "mobile.panels": "Panels",
    "mobile.canvas": "Canvas",
    "mobile.chooseActiveCA": "Choose Active CA",
    "mobile.showBackground": "Show background",
    "mobile.background": "Background",
    "mobile.backgroundDesc": "Appears behind the clock.",
    "mobile.floating": "Floating",
    "mobile.floatingDesc": "Appears over the clock.",

    // Layers & States
    "layers.title": "Layers",
    "layers.addLayer": "Add Layer",
    "layers.textLayer": "Text Layer",
    "layers.basicLayer": "Basic Layer",
    "layers.gradientLayer": "Gradient Layer",
    "layers.imageLayer": "Image Layer…",
    "states.title": "States",
    "states.viewAll": "View All",
    "states.overview": "State Transitions Overview",
    "states.available": "Available States",
    "states.overridesByLayer": "State Overrides by Layer",

    // Inspector Tabs
    "tab.geometry": "Geometry",
    "tab.compositing": "Compositing",
    "tab.content": "Content",
    "tab.text": "Text",
    "tab.gradient": "Gradient",
    "tab.image": "Image",
    "tab.video": "Video",
    "tab.animations": "Animations",
    "tab.gyro": "Gyro (Parallax)",
    "tab.emitter": "Emitter",
    "tab.replicator": "Replicator",
    "tab.filters": "Filters",

    // Export Dialog
    "export.button": "Export",
    "export.back": "Back",
    "export.title": "Export",
    "export.description": "Choose a filename, format, and license, then export your project.",
    "export.fileName": "File name",
    "export.format": "Format",
    "export.caBundle": ".ca bundle",
    "export.tendies": "Tendies",
    "export.caDesc": "Download a .zip containing your Background.ca and Floating.ca files.",
    "export.tendiesDesc": "Create a .tendies wallpaper file compatible with Nugget and Pocket Poster.",
    "export.successTitle": "Export successful",
    "export.failTitle": "Export failed",
    "export.caFailDesc": "Failed to export .ca file. Please try again.",
    "export.tendiesFailDesc": "Failed to export tendies file. Please try again.",
  },
} as const;

export type TranslationKey = keyof typeof translations.vi;

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: (key: TranslationKey) => string;
}

const STORAGE_KEY = "caplay_language";

const LanguageContext = createContext<LanguageContextValue>({
  language: "vi",
  setLanguage: () => {},
  toggleLanguage: () => {},
  t: (key) => translations.vi[key],
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("vi");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "en" || saved === "vi") {
        setLanguageState(saved);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      document.documentElement.lang = language;
    } catch {}
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {}
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(language === "vi" ? "en" : "vi");
  }, [language, setLanguage]);

  const t = useCallback(
    (key: TranslationKey) => translations[language][key] ?? translations.en[key] ?? key,
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
