import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:provider/provider.dart';

import 'theme/app_theme.dart';
import 'onboarding/onboarding_carousel.dart';
import 'onboarding/onboarding_state.dart';

void main() {
  runApp(const OnboardingApp());
}

class OnboardingApp extends StatelessWidget {
  const OnboardingApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => OnboardingState()),
      ],
      child: MaterialApp(
        debugShowCheckedModeBanner: false,
        title: 'Onboarding',
        theme: AppTheme.buildTheme(
          textTheme: GoogleFonts.interTextTheme(),
        ),
        home: const OnboardingCarousel(),
      ),
    );
  }
}
