import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:google_fonts/google_fonts.dart';

import 'theme/app_theme.dart';
import 'onboarding/onboarding_carousel.dart';
import 'home/home_screen.dart';

void main() {
  runApp(const OnboardingApp());
}

class OnboardingApp extends StatelessWidget {
  const OnboardingApp({super.key});

  @override
  Widget build(BuildContext context) {
    final baseTheme = ThemeData(
      colorScheme: const ColorScheme.dark(
        background: AppColors.background,
        primary: Colors.white,
        secondary: AppColors.textSecondary,
      ),
      scaffoldBackgroundColor: AppColors.background,
      useMaterial3: true,
      textTheme: TextTheme(
        displayLarge: GoogleFonts.poppins(
          fontSize: 34,
          fontWeight: FontWeight.w700,
          color: Colors.white,
        ),
        bodyLarge: GoogleFonts.inter(
          fontSize: 16,
          color: AppColors.textSecondary,
        ),
        bodyMedium: GoogleFonts.inter(
          fontSize: 14,
          color: AppColors.textSecondary,
        ),
      ),
    );

    return MultiProvider(
      providers: const [],
      child: MaterialApp(
        debugShowCheckedModeBanner: false,
        title: 'Onboarding Carousel',
        theme: baseTheme,
        home: const HomeScreen(),
      ),
    );
  }
}

