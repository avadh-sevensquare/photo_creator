import 'package:flutter/material.dart';

class AppColors {
  static const Color background = Color(0xFF0F1724);
  static const Color accentPurple = Color(0xFF8A5CFF);
  static const Color accentGreen = Color(0xFF2ECC71);
  static const Color textSecondary = Color(0xFF9AA3B2);

  static const List<Color> ctaGradient = [
    Color(0xFF19D3E6),
    Color(0xFFA661FF),
  ];
}

class AppRadii {
  static const double heroRadius = 24.0;
  static const double cardRadius = 20.0;
  static const double miniCardRadius = 20.0;
  static const double pillRadius = 32.0;
  static const double buttonHeight = 64.0;
}

class AppShadows {
  static List<BoxShadow> heroShadow = [
    BoxShadow(
      color: AppColors.accentPurple.withOpacity(0.25),
      blurRadius: 24,
      spreadRadius: 2,
      offset: const Offset(0, 12),
    )
  ];
}

