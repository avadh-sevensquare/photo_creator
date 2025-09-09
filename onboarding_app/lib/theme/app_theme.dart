import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppColors {
  static const Color background = Color(0xFF0F1724);
  static const Color accentPurple = Color(0xFF8A5CFF);
  static const Color accentGreen = Color(0xFF2ECC71);
  static const Color textSecondary = Color(0xFF9AA3B2);

  static const LinearGradient ctaGradient = LinearGradient(
    colors: [Color(0xFF19D3E6), Color(0xFFA661FF)],
  );
}

class AppRadii {
  static const BorderRadius hero = BorderRadius.all(Radius.circular(24));
  static const BorderRadius card = BorderRadius.all(Radius.circular(20));
  static const BorderRadius miniCard = BorderRadius.all(Radius.circular(20));
  static const BorderRadius pill = BorderRadius.all(Radius.circular(999));
}

class AppTheme {
  static ThemeData buildTheme({TextTheme? textTheme}) {
    final base = ThemeData.dark(useMaterial3: true);
    final poppins = GoogleFonts.poppinsTextTheme(textTheme ?? base.textTheme);
    return base.copyWith(
      scaffoldBackgroundColor: AppColors.background,
      textTheme: poppins.copyWith(
        displayLarge: GoogleFonts.poppins(
          fontSize: 34,
          fontWeight: FontWeight.w700,
          color: Colors.white,
        ),
        bodyMedium: (textTheme ?? base.textTheme).bodyMedium?.copyWith(
          fontSize: 16,
          color: AppColors.textSecondary,
        ),
      ),
      colorScheme: base.colorScheme.copyWith(
        primary: Colors.white,
        secondary: AppColors.accentPurple,
      ),
    );
  }
}

